const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let history_messages = [
  //   {
  //     role: "system",
  //     content: "你是一个翻译专家，你能把我提问的中文，翻译为英文。",
  //   },
];
function askQuestion() {
  rl.question(">", (input) => {
    if (input === "exit") {
      rl.close();
      return;
    }
    history_messages.push({
      role: "user",
      content: `Yo Qwen
      <email>${input}</email>
      给我这个邮件内容润色，让它更礼貌，但是不要改变任何内容。`,
    });
    fetch("http://192.168.10.104:11434/api/chat", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen:7b",
        messages: history_messages,
        stream: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        history_messages.push(data.message);
        console.log(data.message.content);
        console.log();
        console.log("history:", history_messages);
        askQuestion();
      });
  });
}

askQuestion();
