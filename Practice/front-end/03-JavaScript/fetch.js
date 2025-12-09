
//引入fs模块和path模块
const fs = require("fs");
const path = require("path");
//定义ls工具
const ls = {
  name: "ls",
  description: "list files",
  parameters: {
    type: "object",
    properties: {
      dir: { type: "string" },
    },
  },
};
//定义pwd工具
 const pwd = {
  name: "pwd",
  description: "print working directory",
  parameters: {
    type: "object",
    properties: {
      dir: {type: "string"}
    },
  }
 }
//定义lsFn
function lsFn({ dir }) {
  fs.readdirSync(process.cwd(), (err, files) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log("当前目录下的文件有：",files);
    return files
  })
}

//定义pwdFn
function pwdFn(dir) {
  return 
}
//定义工具数组
const tools = [];
tools.push(ls);
//定义历史记录数组
let history = [];

// 提问
const message = {
  role: "user",
  parts: [{ text: "src目录下有哪些文件？" }],
};
history.push(message);

async function ask() {
  return fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": "AIzaSyBPUVJBlG8b9PmAf5PS2NJI98GWjzN-Fck",
      },
      body: JSON.stringify({
        contents: history,
        tools: [
          {
            functionDeclarations: tools,
          },
        ],
      }),
    }
  );
}

try {
  const res = await ask();
  const data = await res.json(); // 等待响应体解析完成
  console.log(data);
  const modelMessage = data.candidates[0].content;
  history.push(modelMessage);

  if (modelMessage.parts[0].functionCall) {
    const dirArr = lsFn(modelMessage.parts[0].functionCall.args.dir);
    const message = {
      role: "model",
      parts: [{ functionResponse: { name: "ls", response: {
        result: dirArr
      } } }],
    };
    history.push(message);
  }

  try {
    const res1 = await ask();
    const data = await res1.json(); // 等待响应体解析完成
    const modelMessage = data.candidates[0].content;
    history.push(modelMessage);
    console.log(modelMessage);
  } catch (err) {
    console.log(err);
  }
  // const message = {
  //   role: "user",
  //   parts: [{ text: "src目录下有哪些文件？" }],
  // };
  // history.push(message);
  // try {
  //   const res1 = await ask();
  //   const data = await res1.json(); // 等待响应体解析完成
  //   const modelMessage = data.candidates[0].content;
  //   history.push(modelMessage);
  // } catch (err) {
  //   console.log(err);
  // }
} catch (err) {
  console.log(err);
}
// 模型回答

//   // 你继续提问
//   const nextMessage = {
//     role: "user",
//     parts: [{ text: "查看第一个文件的内容!" }],
//   };
//   history.push(nextMessage);
//   fetch(
//     "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
//     {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         "x-goog-api-key": "AIzaSyBPUVJBlG8b9PmAf5PS2NJI98GWjzN-Fck",
//       },
//       body: JSON.stringify({
//         contents: history,
//         tools: [
//           {
//             functionDeclarations: tools,
//           },
//         ],
//       }),
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       // 模型回答
//       const modelMessage = data.candidates[0].content;
//       history.push(modelMessage);
//     })
//     .catch((err) => console.log(err));
// })
// .catch((err) => console.log(err));
