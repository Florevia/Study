// 引入 readline 模块用于处理用户输入
const readline = require("readline");
// 创建 readline 接口，用于从标准输入读取用户输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function doSomething() {
  rl.question("请输入:", (input) => {
    //递归出口
    if (input === "exit") { 
    rl.close();
    return;
  };
    console.log("你的输入是：", input);
    doSomething();
  });
}
doSomething();

