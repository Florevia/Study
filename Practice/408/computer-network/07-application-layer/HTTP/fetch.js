// 拿到自己的 IP
// fetch("https://httpbin.org/ip")
//   .then((res) => res.text())
//   .then((data) => console.log(data));

// GET 一个简单 JSON
// fetch("https://httpbin.org/json")
//   .then(res => console>log(res))
//   .catch(err => console.log(err))

// 带查询参数的 GET
// fetch("https://httpbin.org/get?foo=bar&x=1")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// 带查询参数的 GET
// const params = new URLSearchParams({ foo: "bar", x: 1 }).toString();
// console.log(params);
// fetch(`https://httpbin.org/get?${params}`)
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// 中文参数编码

// const obj = {
//   q : encodeURIComponent("你好 世界")
// }
// const str = new URLSearchParams(obj).toString()
// console.log(str)
// fetch(`https://httpbin.org/get?${str}`)
//   .then(res => res.json())
//   .then(data => console.log(data))

//URLSearchParams 多对适合

// User-Agent 练习

// fetch("http://192.168.10.106:11434/api/generate", {
//   method: "post",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({model: "qwen:7b", prompt: "我昨天吃了什么？", stream: false})
// })
// .then(res => res.json())
//   // .then(res => console.log(res))
//   .then(data => console.log(data.response))
const messages = [{ role: "user", content: "我昨天吃了什么？" }]

fetch("http://192.168.10.106:11434/api/chat", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "qwen:7b",
    messages,
    stream: false,
  }),
})
  .then((res) => res.json())
  // .then(res => console.log(res))
  .then((data) => console.log(data.message));
