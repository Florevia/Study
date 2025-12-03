# npm

## 安装 / 卸载

- npm init：交互式创建 package.json。
- npm init -y：使用默认值快速生成 package.json。
- npm install / npm i：安装 package.json 中的依赖（开发+生产）。
  - --registry <url>：指定 registry。
- npm install <pkg>：在当前项目安装包并写入 package.json 的 - dependencies（若没有 --no-save）。
  - 例：npm i lodash
- npm install <pkg> --save-dev 或 npm i -D <pkg>：安装为开发依- 赖（devDependencies）。
  - 例：npm i -D jest
- npm uninstall <pkg> 或 npm remove <pkg>：移除依赖。
  - 例：npm uninstall lodash
- npm install -g <pkg>：全局安装（命令行工具类包）。
  - 例：npm i -g serve
  
## 运行脚本

- `npm run <script>`：运行自定义脚本
- 可执行文件路径 + 子命令 （底层原理）

## 安全 / 依赖管理

- npm outdated：查看过时的包（本地 vs registry）。
- npm update：更新包到符合 package.json 范围内的最高版本。
- npm audit：检查已知安全问题。
- npm audit fix：尝试自动修复安全问题；npm audit fix --force 强- 制升级（可能破坏兼容）。
- npm ci：用于 CI 环境，基于 package-lock.json 完全重装（更快、更可重复）。注意：会删除 node_modules 并且要求存在 package-lock.json。
- 
## 发布 / 账户

- npm login：登录 npm（发布前需要）。
- npm publish：将包发布到 npm registry（注意版本号、access 设置）。
- npm whoami：查看当前登录账号。

## 辅助与信息

- npm ls [pkg]：列出已安装依赖树，npm ls lodash 查看某包位置。
- npm view <pkg> [field]：查看注册表上的包信息。例：npm view - react version。
- npm help 或 npm help <command>：获取帮助。
- npx <cmd>：运行 npm 包中的可执行文件（若本地不存在，会临时下载并运行）。常用于一次性执行工具（例如 npx create-react-app my-app）。