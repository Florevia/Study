/**
 * WebSocket 文档协作服务器
 * 功能：处理多用户实时协作编辑
 */

const express = require('express');
const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = 3000;

// 提供静态文件服务
app.use(express.static(path.join(__dirname, '../public')));

// 启动 HTTP 服务器
const server = app.listen(PORT, () => {
  console.log(`🚀 服务器启动成功！访问 http://localhost:${PORT}`);
});

// 创建 WebSocket 服务器
const wss = new WebSocketServer({ server });

// 存储所有连接的客户端信息
const clients = new Map();

// 存储文档的当前内容（简单的内存存储，生产环境应使用数据库）
let documentContent = {
  ops: [{ insert: '欢迎使用协作编辑器！开始输入内容...\n' }]
};

// 用户颜色池（用于区分不同用户的光标）
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
];

let colorIndex = 0;

/**
 * 为新用户分配颜色
 */
function getNextColor() {
  const color = COLORS[colorIndex % COLORS.length];
  colorIndex++;
  return color;
}

/**
 * 广播消息给所有客户端（除了发送者）
 * @param {WebSocket} sender - 发送消息的客户端
 * @param {Object} message - 要广播的消息对象
 */
function broadcast(sender, message) {
  const messageStr = JSON.stringify(message);
  clients.forEach((client, ws) => {
    if (ws !== sender && ws.readyState === ws.OPEN) {
      ws.send(messageStr);
    }
  });
}

/**
 * 广播消息给所有客户端（包括发送者）
 * @param {Object} message - 要广播的消息对象
 */
function broadcastToAll(message) {
  const messageStr = JSON.stringify(message);
  clients.forEach((client, ws) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(messageStr);
    }
  });
}

/**
 * 获取所有在线用户信息
 */
function getOnlineUsers() {
  return Array.from(clients.values()).map(client => ({
    id: client.id,
    name: client.name,
    color: client.color
  }));
}

// 处理 WebSocket 连接
wss.on('connection', (ws) => {
  // 为新用户生成唯一 ID 和分配颜色
  const userId = uuidv4();
  const userColor = getNextColor();
  const userName = `用户${clients.size + 1}`;

  // 存储客户端信息
  clients.set(ws, {
    id: userId,
    name: userName,
    color: userColor,
    cursor: null // 光标位置
  });

  console.log(`✅ 新用户连接: ${userName} (${userId})`);
  console.log(`📊 当前在线人数: ${clients.size}`);

  // 发送初始化数据给新用户
  ws.send(JSON.stringify({
    type: 'init',
    data: {
      userId,
      userName,
      userColor,
      document: documentContent,
      onlineUsers: getOnlineUsers()
    }
  }));

  // 通知其他用户有新用户加入
  broadcast(ws, {
    type: 'user-join',
    data: {
      user: {
        id: userId,
        name: userName,
        color: userColor
      },
      onlineUsers: getOnlineUsers()
    }
  });

  // 处理客户端消息
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const clientInfo = clients.get(ws);

      switch (data.type) {
        case 'text-change':
          /**
           * 处理文档内容变更
           * data.delta: Quill Delta 格式的变更数据
           * data.source: 变更来源（'user' 或 'api'）
           */
          if (data.delta && data.source === 'user') {
            // 更新服务器端的文档内容（简化处理，生产环境需要 OT 算法）
            documentContent = data.document;

            // 广播变更给其他用户
            broadcast(ws, {
              type: 'text-change',
              data: {
                userId: clientInfo.id,
                delta: data.delta,
                userName: clientInfo.name
              }
            });
          }
          break;

        case 'cursor-change':
          /**
           * 处理光标位置变更
           * data.range: 光标的范围 { index, length }
           */
          clientInfo.cursor = data.range;

          // 广播光标位置给其他用户
          broadcast(ws, {
            type: 'cursor-change',
            data: {
              userId: clientInfo.id,
              userName: clientInfo.name,
              userColor: clientInfo.color,
              range: data.range
            }
          });
          break;

        case 'selection-change':
          /**
           * 处理选区变更（用户选中文本时）
           * data.range: 选区范围 { index, length }
           */
          broadcast(ws, {
            type: 'selection-change',
            data: {
              userId: clientInfo.id,
              userName: clientInfo.name,
              userColor: clientInfo.color,
              range: data.range
            }
          });
          break;

        default:
          console.log('❓ 未知消息类型:', data.type);
      }
    } catch (error) {
      console.error('❌ 处理消息错误:', error);
    }
  });

  // 处理连接关闭
  ws.on('close', () => {
    const clientInfo = clients.get(ws);
    if (clientInfo) {
      console.log(`❌ 用户断开连接: ${clientInfo.name} (${clientInfo.id})`);

      // 从客户端列表中移除
      clients.delete(ws);

      console.log(`📊 当前在线人数: ${clients.size}`);

      // 通知其他用户该用户已离线
      broadcastToAll({
        type: 'user-leave',
        data: {
          userId: clientInfo.id,
          userName: clientInfo.name,
          onlineUsers: getOnlineUsers()
        }
      });
    }
  });

  // 处理连接错误
  ws.on('error', (error) => {
    console.error('❌ WebSocket 错误:', error);
  });

  // 心跳检测（每30秒）
  const pingInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.ping();
    } else {
      clearInterval(pingInterval);
    }
  }, 30000);

  ws.on('pong', () => {
    // 客户端响应心跳
  });
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('🛑 服务器正在关闭...');
  wss.close(() => {
    server.close(() => {
      console.log('✅ 服务器已关闭');
      process.exit(0);
    });
  });
});
