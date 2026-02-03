/**
 * WebSocket 协作编辑器 - 客户端
 * 实现实时文档协作、光标同步、冲突处理
 */

// ==================== 全局变量 ====================
let ws = null; // WebSocket 连接对象
let quill = null; // Quill 编辑器实例
let currentUser = {
  id: null,
  name: null,
  color: null
}; // 当前用户信息
let remoteCursors = new Map(); // 存储其他用户的光标 { userId: { element, range } }
let remoteSelections = new Map(); // 存储其他用户的选区
let isLocalChange = false; // 标记是否为本地修改（防止循环更新）

// ==================== WebSocket 连接管理 ====================

/**
 * 初始化 WebSocket 连接
 */
function initWebSocket() {
  // 构建 WebSocket URL（使用当前页面的主机名）
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}`;

  ws = new WebSocket(wsUrl);

  // 连接打开事件
  ws.onopen = () => {
    console.log('✅ WebSocket 连接成功');
    updateConnectionStatus('已连接', true);
  };

  // 接收服务器消息
  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      handleServerMessage(message);
    } catch (error) {
      console.error('❌ 解析服务器消息失败:', error);
    }
  };

  // 连接关闭事件
  ws.onclose = () => {
    console.log('❌ WebSocket 连接关闭');
    updateConnectionStatus('已断开', false);

    // 5秒后尝试重连
    setTimeout(() => {
      console.log('🔄 尝试重新连接...');
      initWebSocket();
    }, 5000);
  };

  // 连接错误事件
  ws.onerror = (error) => {
    console.error('❌ WebSocket 错误:', error);
    updateConnectionStatus('连接错误', false);
  };
}

/**
 * 发送消息到服务器
 * @param {Object} message - 要发送的消息对象
 */
function sendMessage(message) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.warn('⚠️ WebSocket 未连接，无法发送消息');
  }
}

/**
 * 处理服务器消息
 * @param {Object} message - 服务器发送的消息
 */
function handleServerMessage(message) {
  switch (message.type) {
    case 'init':
      // 初始化：接收用户信息和文档内容
      handleInit(message.data);
      break;

    case 'text-change':
      // 文档内容变更
      handleTextChange(message.data);
      break;

    case 'cursor-change':
      // 光标位置变更
      handleCursorChange(message.data);
      break;

    case 'selection-change':
      // 选区变更
      handleSelectionChange(message.data);
      break;

    case 'user-join':
      // 新用户加入
      handleUserJoin(message.data);
      break;

    case 'user-leave':
      // 用户离开
      handleUserLeave(message.data);
      break;

    default:
      console.log('❓ 未知消息类型:', message.type);
  }
}

// ==================== 消息处理函数 ====================

/**
 * 处理初始化消息
 */
function handleInit(data) {
  console.log('🎉 收到初始化数据:', data);

  // 保存当前用户信息
  currentUser.id = data.userId;
  currentUser.name = data.userName;
  currentUser.color = data.userColor;

  // 更新UI显示用户信息
  document.getElementById('userName').textContent = data.userName;
  document.getElementById('userColor').style.backgroundColor = data.userColor;

  // 初始化编辑器内容
  if (data.document && quill) {
    isLocalChange = true; // 标记为本地修改，避免触发 text-change 事件
    quill.setContents(data.document);
    isLocalChange = false;
  }

  // 更新在线用户列表
  updateOnlineUsers(data.onlineUsers);
}

/**
 * 处理文档内容变更
 */
function handleTextChange(data) {
  console.log('📝 收到文档变更:', data);

  if (quill && data.delta) {
    // 标记为远程修改，避免触发本地 text-change 事件
    isLocalChange = true;

    // 应用 Delta 变更到编辑器
    quill.updateContents(data.delta);

    isLocalChange = false;
  }
}

/**
 * 处理光标位置变更
 */
function handleCursorChange(data) {
  if (!data.range || data.userId === currentUser.id) {
    return; // 忽略自己的光标
  }

  // 如果光标为null，移除该用户的光标
  if (data.range === null || data.range.length > 0) {
    removeRemoteCursor(data.userId);
    return;
  }

  // 更新或创建远程光标
  updateRemoteCursor(data.userId, data.userName, data.userColor, data.range);
}

/**
 * 处理选区变更
 */
function handleSelectionChange(data) {
  if (!data.range || data.userId === currentUser.id) {
    return; // 忽略自己的选区
  }

  // 如果没有选区或长度为0，移除选区高亮
  if (data.range === null || data.range.length === 0) {
    removeRemoteSelection(data.userId);
    return;
  }

  // 更新或创建远程选区
  updateRemoteSelection(data.userId, data.userColor, data.range);
}

/**
 * 处理新用户加入
 */
function handleUserJoin(data) {
  console.log('👋 新用户加入:', data.user.name);
  updateOnlineUsers(data.onlineUsers);

  // 可以添加提示消息
  showNotification(`${data.user.name} 加入了协作`);
}

/**
 * 处理用户离开
 */
function handleUserLeave(data) {
  console.log('👋 用户离开:', data.userName);

  // 移除该用户的光标和选区
  removeRemoteCursor(data.userId);
  removeRemoteSelection(data.userId);

  // 更新在线用户列表
  updateOnlineUsers(data.onlineUsers);

  // 显示提示
  showNotification(`${data.userName} 离开了协作`);
}

// ==================== Quill 编辑器初始化 ====================

/**
 * 初始化 Quill 编辑器
 */
function initQuillEditor() {
  // 配置工具栏
  const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ];

  // 创建编辑器实例
  quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: '开始输入内容...'
  });

  // 监听文本变更事件
  quill.on('text-change', (delta, oldDelta, source) => {
    // 只处理用户的输入，忽略API调用（远程更新）
    if (source === 'user' && !isLocalChange) {
      console.log('✏️ 本地文档变更:', delta);

      // 发送变更到服务器
      sendMessage({
        type: 'text-change',
        delta: delta,
        document: quill.getContents(), // 发送完整文档内容
        source: source
      });
    }
  });

  // 监听选区变更事件（光标移动或文本选择）
  quill.on('selection-change', (range, oldRange, source) => {
    if (source === 'user') {
      if (range) {
        if (range.length === 0) {
          // 光标移动（没有选中文本）
          sendMessage({
            type: 'cursor-change',
            range: range
          });

          // 移除本地选区显示
          removeRemoteSelection(currentUser.id);
        } else {
          // 选中了文本
          sendMessage({
            type: 'selection-change',
            range: range
          });
        }
      } else {
        // 失去焦点
        sendMessage({
          type: 'cursor-change',
          range: null
        });
      }
    }
  });

  console.log('✅ Quill 编辑器初始化完成');
}

// ==================== 远程光标和选区管理 ====================

/**
 * 更新或创建远程用户的光标
 */
function updateRemoteCursor(userId, userName, userColor, range) {
  // 移除旧光标
  removeRemoteCursor(userId);

  if (!range || range.length > 0) {
    return; // 如果是选区，不显示光标
  }

  // 获取光标在编辑器中的位置
  const bounds = quill.getBounds(range.index);
  if (!bounds) return;

  // 创建光标元素
  const cursor = document.createElement('div');
  cursor.className = 'remote-cursor';
  cursor.style.color = userColor;
  cursor.style.left = bounds.left + 'px';
  cursor.style.top = bounds.top + 'px';
  cursor.style.height = bounds.height + 'px';

  // 创建光标标签（显示用户名）
  const label = document.createElement('div');
  label.className = 'remote-cursor-label';
  label.textContent = userName;
  cursor.appendChild(label);

  // 添加到编辑器
  const editorContainer = document.querySelector('.ql-editor');
  editorContainer.appendChild(cursor);

  // 保存光标引用
  remoteCursors.set(userId, { element: cursor, range });
}

/**
 * 移除远程用户的光标
 */
function removeRemoteCursor(userId) {
  const cursor = remoteCursors.get(userId);
  if (cursor && cursor.element) {
    cursor.element.remove();
    remoteCursors.delete(userId);
  }
}

/**
 * 更新或创建远程用户的选区
 */
function updateRemoteSelection(userId, userColor, range) {
  // 移除旧选区
  removeRemoteSelection(userId);

  if (!range || range.length === 0) {
    return;
  }

  // 获取选区的边界
  const bounds = quill.getBounds(range.index, range.length);
  if (!bounds) return;

  // 创建选区元素
  const selection = document.createElement('div');
  selection.className = 'remote-selection';
  selection.style.color = userColor;
  selection.style.left = bounds.left + 'px';
  selection.style.top = bounds.top + 'px';
  selection.style.width = bounds.width + 'px';
  selection.style.height = bounds.height + 'px';

  // 添加到编辑器
  const editorContainer = document.querySelector('.ql-editor');
  editorContainer.appendChild(selection);

  // 保存选区引用
  remoteSelections.set(userId, selection);
}

/**
 * 移除远程用户的选区
 */
function removeRemoteSelection(userId) {
  const selection = remoteSelections.get(userId);
  if (selection) {
    selection.remove();
    remoteSelections.delete(userId);
  }
}

// ==================== UI 更新函数 ====================

/**
 * 更新连接状态显示
 */
function updateConnectionStatus(status, isConnected) {
  const statusElement = document.getElementById('connectionStatus');
  const indicatorElement = document.getElementById('statusIndicator');

  statusElement.textContent = status;

  if (isConnected) {
    indicatorElement.classList.remove('disconnected');
  } else {
    indicatorElement.classList.add('disconnected');
  }
}

/**
 * 更新在线用户列表
 */
function updateOnlineUsers(users) {
  const usersListElement = document.getElementById('usersList');
  const onlineCountElement = document.getElementById('onlineCount');

  // 更新在线人数
  onlineCountElement.textContent = users.length;

  // 清空列表
  usersListElement.innerHTML = '';

  // 渲染用户列表
  users.forEach(user => {
    const userChip = document.createElement('div');
    userChip.className = 'user-chip';

    const colorDot = document.createElement('div');
    colorDot.className = 'user-chip-color';
    colorDot.style.backgroundColor = user.color;

    const userName = document.createElement('span');
    userName.textContent = user.name;

    // 标记当前用户
    if (user.id === currentUser.id) {
      userName.textContent += ' (你)';
      userChip.style.fontWeight = '600';
    }

    userChip.appendChild(colorDot);
    userChip.appendChild(userName);
    usersListElement.appendChild(userChip);
  });
}

/**
 * 显示通知消息
 */
function showNotification(message) {
  console.log('📢', message);
  // 可以在这里添加 toast 通知组件
}

// ==================== 页面加载初始化 ====================

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 初始化协作编辑器...');

  // 1. 初始化 Quill 编辑器
  initQuillEditor();

  // 2. 建立 WebSocket 连接
  initWebSocket();

  console.log('✅ 初始化完成');
});

// 页面卸载时清理资源
window.addEventListener('beforeunload', () => {
  if (ws) {
    ws.close();
  }
});
