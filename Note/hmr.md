# hot module replacement 热模块替换

应用运行时，无需刷新页面就能替换、添加或删除模块

## 核心原理

- 文件监听 - Webpack 监听文件变化
- 增量编译 - 只重新构建受影响的模块 + 其依赖链路，其余尽量复用缓存结果
- WebSocket 通信 - 实时推送更新通知
- 模块替换 - 无刷新替换运行时模块
- 状态保留 - 保持应用状态不变

## 流程

保存文件 → 监听到变化 → 重新编译 → 生成补丁 → 通知浏览器 → 浏览器拉补丁 → 能接住就局部替换，接不住就刷新

## 原理

### 服务端监听文件变化

- Webpack 的 watch 模式入口是：
  `compiler.watch(watchOptions, handler)`

- 它背后会交给专门的监听层（Webpack 5 常见是 watchpack）来做：
  - 监听 文件依赖（fileDependencies）
  - 监听 目录依赖（contextDependencies）
  - 监听 缺失依赖（missingDependencies： import 但文件不存在，后来创建也能触发）
- 文件变化不会强行打断当前编译：先让这轮跑完，再补一轮（更稳定）。
- aggregateTimeout 会做“聚合/防抖”：你连按保存不会触发 N 次编译

```js
// 伪代码：Watching 的核心思想
let running = false;
let invalid = false;

watchpack.watch(deps, () => {
  invalid = true; // 这次构建结果“过期”
  if (!running) rebuild(); // 不在构建中就直接重建
});

function rebuild() {
  running = true;
  invalid = false;

  compiler.run(() => {
    running = false;
    if (invalid) rebuild(); // 构建期间又变了 -> 再来一轮
  });
}
```

### 增量编译

- 缓存 + 失效范围控制

```js
// 伪代码：构建模块时先查缓存
async function buildModule(module) {
  const cacheKey = module.resource + module.buildInfoHash;

  const cached = await cache.get(cacheKey);
  if (cached) return cached; // ✅ 直接复用

  const result = await runLoadersAndParse(module); // ❗ 真正耗时
  await cache.set(cacheKey, result);
  return result;
}
```

### WebSocket 通信

webpack-dev-server 会在浏览器和服务器之间建立一个长连接（WebSocket / SockJS 体系），编译结束后会推送类似事件：

- hash：新构建的 hash
- ok：编译完成且没错误，可以更新
- warnings / errors：告知编译问题（并可能阻止 HMR 应用）

```js
// 伪代码：

// 服务端
compiler.hooks.done.tap("DevServerPush", (stats) => {
  ws.broadcast({ type: "hash", data: stats.hash });
  ws.broadcast({ type: "ok" });
});

// 客户端
socket.onmessage = (msg) => {
  if (msg.type === "hash") currentHash = msg.data;
  if (msg.type === "ok") tryApplyHMR(currentHash);
};
```

### 模块替换

- 当客户端收到 ok 后，会做两件事（核心）：
  - 拉 更新清单（hot-update manifest）
  - 拉 更新补丁 chunk（hot-update chunk）
- 然后运行 Webpack HMR runtime 的 apply 逻辑，执行：
  - dispose：卸载旧模块（给你机会保存状态、清理副作用）
  - apply：把新模块工厂函数替换进模块表
  - accept：调用你写的 module.hot.accept(...) 回调，重新执行渲染/挂载

```js
async function tryApplyHMR(hash) {
  const manifest = await fetch(`/${hash}.hot-update.json`).then((r) =>
    r.json()
  );

  // 拉取更新 chunk（里面会把新模块定义注入 runtime）
  for (const chunkId of Object.keys(manifest.c)) {
    await import(`/${chunkId}.${hash}.hot-update.js`);
  }

  // 应用更新：触发 dispose / accept
  __webpack_require__.hmrApply();
}
```

你改的模块 没有任何 accept 边界 接住它
=> runtime 会沿着依赖链往上找“谁 accept 了我”，找不到就只能 reload（或报错）

```js
// 接住更新
module.hot.accept("./render", () => {
  const next = require("./render");
  next.render();
});
```
