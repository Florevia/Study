const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const askQuestion = async
// while (true) {
//    rl.question("> ", (input) => {
//   console.log(input)
// })

//   rl.close()

// }
function doSomething() {
  rl.question("请输入:", (input) => {
    if (input === "exit") {
    rl.close();
    return;
  };
    console.log("你的输入是：", input);
    doSomething();
  });
}
doSomething();

// let count = 1
// function print() {
//   if (count > 100) return //递归出口
//   console.log(count)
//   count++
//   print()
// }

// print()
