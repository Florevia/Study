# WebSocket 实时文档协作编辑器

一个基于 WebSocket 的实时多人协作文档编辑系统，支持光标同步、选区高亮、冲突处理等功能。

## 功能特性

### 核心功能
- ✅ **实时多人协作**：多个用户可同时编辑同一文档
- ✅ **光标同步**：实时显示其他用户的光标位置
- ✅ **选区高亮**：高亮显示其他用户选中的文本
- ✅ **冲突处理**：使用 Quill Delta 增量更新机制处理并发编辑
- ✅ **用户识别**：为每个用户分配唯一颜色和名称
- ✅ **在线状态**：实时显示当前在线用户列表
- ✅ **自动重连**：WebSocket 断开后自动尝试重连
- ✅ **富文本编辑**：支持标题、加粗、颜色、列表等格式

## 技术栈

### 服务端
- **Node.js** - JavaScript 运行环境
- **Express** - Web 服务器框架
- **ws** - 轻量级 WebSocket 库
- **uuid** - 生成唯一用户 ID

### 客户端
- **Quill.js** - 富文本编辑器
- **原生 WebSocket API** - 实时通信
- **HTML5 + CSS3** - 现代化界面

### 协作算法
- **Operational Transformation (OT)** - 操作转换算法思想
- **Quill Delta** - 文档变更的 Delta 格式，用于增量更新

## 项目结构

```
websocket/
├── src/
│   └── server.js          # WebSocket 服务器（处理连接、消息广播）
├── public/
│   ├── index.html         # 客户端页面
│   └── app.js             # 客户端逻辑（编辑器、WebSocket 客户端）
├── package.json           # 项目配置和依赖
└── README.md              # 说明文档
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动服务器

```bash
pnpm start
# 或者
pnpm run dev
```

服务器将在 `http://localhost:3000` 启动。

### 3. 打开浏览器

在浏览器中访问 `http://localhost:3000`。

### 4. 测试协作功能

**方法 1：** 在多个浏览器窗口/标签页中打开同一 URL
**方法 2：** 在不同设备上访问（需确保在同一局域网）

开始输入内容，你会看到：
- 每个用户有不同的颜色标识
- 其他用户的光标实时显示
- 文本变更立即同步到所有用户

## 核心实现原理

### 1. WebSocket 连接管理

**服务器端** (`src/server.js`):
```javascript
// 存储所有连接的客户端
const clients = new Map();

// 处理新连接
wss.on('connection', (ws) => {
  // 为用户分配 ID 和颜色
  const userId = uuidv4();
  const userColor = getNextColor();

  // 存储客户端信息
  clients.set(ws, { id, name, color, cursor });

  // 发送初始化数据（用户信息、文档内容）
  ws.send(JSON.stringify({ type: 'init', data: {...} }));
});
```

**客户端** (`public/app.js`):
```javascript
// 建立 WebSocket 连接
const ws = new WebSocket(wsUrl);

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  handleServerMessage(message); // 根据消息类型分发处理
};
```

### 2. 文档同步机制

**客户端编辑触发**:
```javascript
quill.on('text-change', (delta, oldDelta, source) => {
  if (source === 'user') {
    // 发送 Delta 变更到服务器
    sendMessage({
      type: 'text-change',
      delta: delta,
      document: quill.getContents()
    });
  }
});
```

**服务器广播变更**:
```javascript
case 'text-change':
  // 更新服务器的文档副本
  documentContent = data.document;

  // 广播给其他所有用户
  broadcast(sender, {
    type: 'text-change',
    data: { userId, delta }
  });
```

**其他客户端接收并应用**:
```javascript
function handleTextChange(data) {
  // 应用 Delta 增量更新
  quill.updateContents(data.delta);
}
```

### 3. 光标同步

**发送光标位置**:
```javascript
quill.on('selection-change', (range) => {
  if (range && range.length === 0) {
    // 光标移动（无选区）
    sendMessage({ type: 'cursor-change', range });
  }
});
```

**显示远程光标**:
```javascript
function updateRemoteCursor(userId, userName, color, range) {
  // 获取光标在编辑器中的坐标
  const bounds = quill.getBounds(range.index);

  // 创建光标 DOM 元素
  const cursor = document.createElement('div');
  cursor.className = 'remote-cursor';
  cursor.style.left = bounds.left + 'px';
  cursor.style.top = bounds.top + 'px';

  // 添加到编辑器
  editorContainer.appendChild(cursor);
}
```

### 4. 冲突处理策略

本项目使用 **Last-Write-Wins (最后写入获胜)** 结合 **Quill Delta** 的方式：

1. **Delta 格式**：Quill 的变更采用操作序列表示（插入、删除、保留）
2. **增量更新**：只传输变更部分，而非整个文档
3. **服务器协调**：服务器维护文档的最新状态
4. **顺序应用**：客户端按顺序应用服务器广播的 Delta

**示例**：
```javascript
// 用户 A 在位置 0 插入 "Hello"
{ ops: [{ insert: "Hello" }] }

// 用户 B 在位置 5 插入 " World"
{ ops: [{ retain: 5 }, { insert: " World" }] }

// 最终文档："Hello World"
```

对于更复杂的场景（如 Google Docs），可使用：
- **Operational Transformation (OT)** - 操作转换
- **CRDT (Conflict-free Replicated Data Type)** - 无冲突复制数据类型

## 消息协议

所有消息均为 JSON 格式，通过 WebSocket 传输。

### 客户端 → 服务器

| 消息类型 | 说明 | 数据字段 |
|---------|------|---------|
| `text-change` | 文档内容变更 | `delta`, `document`, `source` |
| `cursor-change` | 光标位置变更 | `range` ({ index, length }) |
| `selection-change` | 选区变更 | `range` |

### 服务器 → 客户端

| 消息类型 | 说明 | 数据字段 |
|---------|------|---------|
| `init` | 初始化数据 | `userId`, `userName`, `userColor`, `document`, `onlineUsers` |
| `text-change` | 文档变更广播 | `userId`, `userName`, `delta` |
| `cursor-change` | 光标位置广播 | `userId`, `userName`, `userColor`, `range` |
| `selection-change` | 选区变更广播 | `userId`, `userName`, `userColor`, `range` |
| `user-join` | 新用户加入 | `user`, `onlineUsers` |
| `user-leave` | 用户离开 | `userId`, `userName`, `onlineUsers` |

## 关键代码解析

### 服务器端广播机制

```javascript
/**
 * 广播消息给所有客户端（除了发送者）
 */
function broadcast(sender, message) {
  const messageStr = JSON.stringify(message);
  clients.forEach((client, ws) => {
    if (ws !== sender && ws.readyState === ws.OPEN) {
      ws.send(messageStr); // 发送给除发送者外的所有客户端
    }
  });
}
```

### 防止循环更新

```javascript
// 标记变量，防止远程更新触发本地事件
let isLocalChange = false;

// 接收远程更新时
function handleTextChange(data) {
  isLocalChange = true;         // 标记为远程修改
  quill.updateContents(delta);  // 应用变更
  isLocalChange = false;        // 恢复标记
}

// 监听本地编辑
quill.on('text-change', (delta, oldDelta, source) => {
  if (source === 'user' && !isLocalChange) {
    // 只处理真正的用户输入
    sendMessage({ type: 'text-change', delta });
  }
});
```

## 扩展建议

### 生产环境优化

1. **数据持久化**
   - 使用 Redis 或数据库存储文档内容
   - 添加文档版本历史记录

2. **性能优化**
   - 使用消息队列（如 RabbitMQ）处理高并发
   - 添加 Delta 压缩和批处理
   - 实现 WebSocket 连接池

3. **安全性**
   - 添加用户身份验证（JWT）
   - 实现权限控制（读/写权限）
   - 防止 XSS 和注入攻击

4. **OT 算法**
   - 集成完整的 OT 库（如 ShareJS、Yjs）
   - 处理复杂的并发冲突场景

5. **监控与日志**
   - 添加日志系统（Winston, Bunyan）
   - 监控 WebSocket 连接状态
   - 错误追踪和报警

### 功能增强

- 📁 多文档支持（房间/频道机制）
- 💬 内置聊天功能
- 📷 图片粘贴和上传
- 🎨 自定义主题
- 📱 移动端适配
- 🔍 历史版本查看和恢复
- 👥 用户权限管理
- 📤 导出为 PDF/Word

## 常见问题

### Q1: 多个用户同时编辑同一位置会发生什么？

使用 Quill Delta 机制，服务器会按顺序应用所有变更。由于采用"最后写入获胜"策略，后到达的编辑会覆盖先到达的。对于更复杂的冲突解决，建议使用 OT 或 CRDT 算法。

### Q2: 如何处理大文档的性能问题？

- 使用 Delta 增量更新而非全量同步
- 限制文档大小或分页加载
- 实现延迟加载和虚拟滚动
- 压缩 WebSocket 消息

### Q3: WebSocket 断开后会丢失数据吗？

当前实现会在断开后尝试重连。建议：
- 在客户端实现本地缓存（LocalStorage）
- 服务器端持久化文档到数据库
- 添加离线编辑功能

### Q4: 如何扩展到多文档/多房间？

修改服务器端代码，为每个文档维护独立的客户端列表：

```javascript
const rooms = new Map(); // { roomId: { clients, document } }

// 加入房间
ws.on('message', (message) => {
  const { type, roomId } = JSON.parse(message);
  if (type === 'join-room') {
    if (!rooms.has(roomId)) {
      rooms.set(roomId, { clients: new Map(), document: {} });
    }
    rooms.get(roomId).clients.set(ws, userInfo);
  }
});
```

## 学习资源

- [WebSocket MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
- [Quill.js 官方文档](https://quilljs.com/)
- [Operational Transformation 原理](https://operational-transformation.github.io/)
- [CRDT 介绍](https://crdt.tech/)

## 许可证

MIT License

## 作者

lilin - [GitHub](https://github.com/lilin)

---

**祝你学习愉快！如有问题，欢迎提 Issue 或 PR。**
