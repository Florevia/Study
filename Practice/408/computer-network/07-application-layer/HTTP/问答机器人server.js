// 引入 readline 模块用于处理用户输入
const readline = require("readline");
// // 创建 readline 接口，用于从标准输入读取用户输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 聊天历史记录
let history_messages = [
  //   {
  //     role: "system",
  //     content: "你是一个翻译专家，你能把我提问的中文，翻译为英文。",
  //   },
];
// 递归函数，持续接收用户输入
function askQuestion() {
  rl.question(">", (input) => {
    // 如果用户输入 'exit'，则退出程序
    if (input === "exit") {
      rl.close();
      return;
    }
    // 添加用户消息到历史记录
    history_messages.push({
      role: "user",
      content: `Yo Qwen
      <email>${input}</email>
      给我这个邮件内容润色，让它更礼貌，但是不要改变任何内容。`,
    });
    // 发送请求到 AI 模型
    fetch("http://192.168.10.104:11434/api/chat", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      // 发送请求体
      body: JSON.stringify({ // JSON
        model: "qwen:7b",
        messages: history_messages,
        stream: false,
      }),
    })
    // 处理响应
      .then((res) => res.json()) // 解析 JSON 响应
      .then((data) => {
        // 检查响应是否包含错误
        if (data.error) {
          console.error("Error:", data.error);
          return;
        }
        // 检查响应是否包含消息
        if (!data.message) {
          console.error("Error: 响应中缺少消息字段");
          return;
        }
        //有消息，添加消息到历史记录
        history_messages.push(data.message);
        console.log(data.message.content);
        console.log("history:", history_messages);
        // 递归调用 askQuestion 函数，继续接收用户输入
        askQuestion();
      });
  });
}

askQuestion();
