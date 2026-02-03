<script setup>
import { ref, nextTick } from "vue";

const query = ref("");
const messages = ref([]);
const isLoading = ref(false);
const chatContainer = ref(null);
// 用于检测输入法组合状态（中文、日文等输入法）
const isComposing = ref(false);

const API_BASE = "";

const sendMessage = async () => {
  const userQuery = query.value.trim();
  if (!userQuery || isLoading.value) return;

  // 添加用户消息
  messages.value.push({
    role: "user",
    content: userQuery,
  });

  query.value = "";
  isLoading.value = true;

  // 滚动到底部
  await nextTick();
  scrollToBottom();

  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userQuery }),
    });

    const data = await response.json();

    if (data.success) {
      messages.value.push({
        role: "assistant",
        content: data.answer,
        sources: data.sources,
      });
    } else {
      messages.value.push({
        role: "assistant",
        content: "抱歉，处理您的请求时出现错误。",
        isError: true,
      });
    }
  } catch (error) {
    console.error("Chat error:", error);
    messages.value.push({
      role: "assistant",
      content: "网络连接失败，请检查后端服务是否启动。",
      isError: true,
    });
  } finally {
    isLoading.value = false;
    await nextTick();
    scrollToBottom();
  }
};

const scrollToBottom = () => {
  // 使用 setTimeout 确保 DOM 完全渲染后再滚动
  // nextTick 只保证 Vue 的响应式更新完成，但浏览器的重绘可能还未完成
  setTimeout(() => {
    if (chatContainer.value) {
      // 使用 scrollTo 方法确保滚动到底部
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight,
        behavior: "smooth",
      });
    }
  }, 100);
};

// 处理键盘事件，支持中文输入法
const handleKeydown = (e) => {
  // 如果正在输入法组合中（如中文拼音、日文假名等），不触发发送
  if (isComposing.value) return;

  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

// 输入法开始组合（开始输入中文拼音等）
const handleCompositionStart = () => {
  isComposing.value = true;
};

// 输入法组合结束（选择了中文字符等）
const handleCompositionEnd = () => {
  isComposing.value = false;
};
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">🤖 RAG 智能问答</h1>
      <p class="app-subtitle">基于 Vue 文档的 AI 助手</p>
    </header>

    <main class="main-content">
      <!-- 欢迎界面 -->
      <div v-if="messages.length === 0" class="welcome-container">
        <div class="welcome-icon">💬</div>
        <h2 class="welcome-title">有什么可以帮助您的？</h2>
        <p class="welcome-description">
          我是基于 Vue 文档训练的 AI 助手，您可以向我询问任何关于 Vue 的问题。
        </p>
      </div>

      <!-- 聊天消息 -->
      <div v-else ref="chatContainer" class="chat-container">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="[
            'message',
            msg.role === 'user' ? 'message-user' : 'message-assistant',
          ]"
        >
          <div class="message-content">{{ msg.content }}</div>

          <!-- 来源引用 -->
          <div v-if="msg.sources && msg.sources.length" class="message-sources">
            <div class="sources-title">📚 参考来源</div>
            <div
              v-for="(source, i) in msg.sources.slice(0, 3)"
              :key="i"
              class="source-item"
            >
              {{ source.slice(0, 150) }}{{ source.length > 150 ? "..." : "" }}
            </div>
          </div>
        </div>

        <!-- 加载中 -->
        <div v-if="isLoading" class="loading-dots">
          <div class="loading-dot"></div>
          <div class="loading-dot"></div>
          <div class="loading-dot"></div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="input-container">
        <div class="input-wrapper">
          <input
            v-model="query"
            type="text"
            class="chat-input"
            placeholder="输入您的问题..."
            @keydown="handleKeydown"
            @compositionstart="handleCompositionStart"
            @compositionend="handleCompositionEnd"
            :disabled="isLoading"
          />
          <button
            class="send-button"
            @click="sendMessage"
            :disabled="!query.trim() || isLoading"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
