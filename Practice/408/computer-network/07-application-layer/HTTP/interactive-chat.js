// 引入 readline 模块用于处理用户输入
const readline = require('readline');

// 创建 readline 接口用于接收用户输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 聊天历史记录
let messages = [];

// 递归函数，持续接收用户输入
function askQuestion() {
  rl.question('您: ', async (userInput) => {
    // 如果用户输入 'exit'，则退出程序
    if (userInput.toLowerCase() === 'exit') {
      rl.close();
      return;
    }
    
    // 添加用户消息到历史记录
    messages.push({ role: "user", content: userInput });
    
    try {
      // 发送请求到 AI
      console.log('AI正在思考中...');
      
      const response = await fetch("http://192.168.10.106:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen:7b",
          messages: messages,
          stream: false,
        }),
      });
      // 解析响应体为 JSON 格式
      const data = await response.json();
      const aiResponse = data.message.content;
      
      // 添加AI响应到历史记录
      messages.push({ role: "assistant", content: aiResponse });
      
      // 显示AI响应
      console.log(`AI: ${aiResponse}\n`);
      
      // 继续询问下一个问题
      askQuestion();
    } catch (error) {
      console.error('错误:', error);
      console.log('抱歉，发生了错误，请稍后再试。\n');
      // 继续询问下一个问题
      askQuestion();
    }
  });
}

// 启动程序
console.log('AI聊天助手已启动！输入 "exit" 退出程序。\n');
askQuestion();