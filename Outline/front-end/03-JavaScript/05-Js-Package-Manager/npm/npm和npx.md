# npm 和 npx 和 npm exec

## npm

- npm 要么在 package.json 的 scripts 中配置
- 要么全局安装，全局安装后可以在任何地方使用
- 要么直接定位到包的位置执行

```js
// scripts 或写完整路径
npm run dev
```

```js
// 全局安装
npm i -g webpack
webpack
```

```js
// 定位
./node_modules/.bin/webpack
```

---

## npx

- 执行本地已安装的包

有了 npx 的话，可以直接执行命令，npx 会自动去 node_modules/.bin 查找

```js
// 直接执行
npx webpack
```

- 临时执行未安装的包（最大亮点！）：用完即删

---

## npm exec

- npm 会 开启一个新的 shell 子进程，这个 shell 的环境变量 PATH 中已经包含了 ./node_modules/.bin/。

- 原理：自动在 PATH 中添加了`./node_modules/.bin:/usr/local/bin:/usr/bin:/bin`
