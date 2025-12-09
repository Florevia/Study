# pnpm

## 流程

```zsh
# 安装 pnpm 命令行工具
npm install -g pnpm
# 初始化项目
pnpm init
# 安装依赖
pnpm install
# 运行项目
pnpm run dev
```
## 其他命令

- `pnpm add <package>`：安装依赖
- `pnpm remove <package>`：移除依赖
- `pnpm run <script>`：运行项目中的脚本
- `pnpm outdated`：检查依赖是否有更新
- `pnpm update`：更新依赖
- `pnpm cache clean`：清除缓存

## 配置文件

pnpm 配置文件是 `pnpm-lock.yaml`，可以在其中配置 pnpm 的行为。

## 其他注意事项

- pnpm 不支持全局安装依赖，所有依赖都要在项目中安装。
- pnpm 不支持 `npm install --save-dev` 这样的命令，所有依赖都要在 `devDependencies` 中配置。
- pnpm 不支持 `npm run` 这样的命令，所有脚本都要在 `scripts` 中配置。