# unit-test

测试 最小可测试单元

- 一个函数
- 一个方法
- 一个类的某个行为
- 一个组件（前端中常见）

```js
//sum.js
export default function sum(a, b) {
  return a + b;
}

// sum.test.js
import sum from "./sum";
test("should return the sum of two numbers", () => {
  expect(sum(1, 2)).toBe(3);
});
```

## 浏览器环境模拟

jsdom

```js
//jest.config.js
module.exports = {
  testEnvironment: "jsdom", // 指定测试环境为 jsdom
};
```

```zsh
npx jest sum.test.js
```
