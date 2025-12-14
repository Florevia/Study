# npm

## 安装 / 卸载

- npm init
  - 交互式创建 package.json
  - 初始化一个vue项目：npm init vue@latest
    - 等同于 npm create vue@latest 或者 npx create-vue@latest
- npm create vite(create-vite) 
  - 创建一个基于 Vite 的 Vue 项目
- npm init -y：使用默认值快速生成 package.json。
- npm install <pkg> --save-dev 或 npm i -D <pkg>：安装为开发依赖
- npm uninstall <pkg> 或 npm remove <pkg>：移除依赖。

  
## 运行脚本

- `npm run <script>`：运行自定义脚本
- 可执行文件路径 + 子命令 （底层原理）

## 安全 / 依赖管理

- npm outdated：查看过时的包（本地 vs registry）。
- npm update：更新包到符合 package.json 范围内的最高版本。

## 辅助与信息

- npm help 或 npm help <command>：获取帮助。
- npx <cmd>：运行 npm 包中的可执行文件（若本地不存在，会临时下载并运行）。常用于一次性执行工具（例如 npx create-react-app my-app）。