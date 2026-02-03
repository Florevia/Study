# Git 提交规范配置指南

本文档详细介绍了本项目使用的 Git 提交规范工具链及其配置。通过规范化提交信息，我们可以自动生成变更日志（Changelog），并确保团队协作的一致性。

## 1. 工具链概览

本项目集成了以下工具来强制执行代码质量和提交规范：

| 工具                | 版本 | 作用                         | 配置文件               |
| ------------------- | ---- | ---------------------------- | ---------------------- |
| **Husky**           | 9.x  | Git 钩子管理 (Git Hooks)     | `.husky/` 目录         |
| **lint-staged**     | 16.x | 只对暂存区文件运行 Lint      | `package.json` 配置    |
| **Commitizen**      | 4.x  | 交互式生成符合规范的提交信息 | `package.json` 配置    |
| **cz-customizable** | 7.x  | 自定义 Commitizen 的提示文案 | `.cz.config.js`        |
| **@commitlint/cli** | 20.x | 校验提交信息是否符合规范     | `commitlint.config.js` |

---

## 2. 快速开始

### 2.1 安装依赖

如果这是新环境，请先安装项目依赖：

```bash
npm install
```

### 2.2 提交代码流程

**不要**直接使用 `git commit -m "..."`，而是使用以下命令启动交互式提交界面：

```bash
npm run commit
```

按提示选择提交类型（如 `feat`, `fix`）、影响范围（Scope）、简短描述等。

---

## 3. 详细配置说明

### 3.1 package.json 配置

项目中已配置好相关脚本和工具引用：

```json
{
  "scripts": {
    "commit": "cz",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,vue}": ["eslint --fix"],
    "*.{js,jsx,vue,css,scss,json,md}": ["prettier --write"]
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": ".cz.config.js"
    }
  }
}
```

### 3.2 Commitlint 配置 (`commitlint.config.js`)

定义了允许的提交类型（Type），遵循 Conventional Commits 规范。

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复Bug
        'docs', // 文档变更
        'style', // 代码格式(不影响功能，例如空格、分号等格式修正)
        'refactor', // 代码重构(不包括 bug 修复、功能新增)
        'perf', // 性能优化
        'test', // 添加测试
        'build', // 构建流程、外部依赖变更 (如 gulp, npm)
        'ci', // CI 配置、脚本变更 (如 Travis, Circle)
        'chore', // 其他修改 (不修改 src 或 test 的修改构建过程或辅助工具的变动)
        'revert', // 回退
      ],
    ],
    // subject 大小写不做校验
    'subject-case': [0],
  },
}
```

### 3.3 CZ 自定义配置 (`.cz.config.js`)

汉化了交互式提示，使提交过程更友好。

```javascript
export default {
  // 可选类型配置
  types: [
    { value: 'feat', name: 'feat:     ✨ 新功能' },
    { value: 'fix', name: 'fix:      🐛 修复Bug' },
    // ... 其他类型
  ],
  // 交互提示信息
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    // ...
  },
  skipQuestions: ['body', 'breaking', 'footer'],
  subjectLimit: 100,
}
```

### 3.4 Husky 钩子 (`.husky/`)

#### pre-commit

在提交通过前触发，运行 `lint-staged` 以确保提交的代码经过了 ESLint 和 Prettier 处理。

```bash
npx lint-staged
```

#### commit-msg

在提交信息生成后触发，运行 `commitlint` 验证提交信息格式。

```bash
npx --no-install commitlint --edit $1
```

---

## 4. 常见问题 (Troubleshooting)

### 4.1 `command not found: husky` 或 Hooks 不生效

如果发现 Git 钩子没有触发，通常是因为 `prepare` 脚本没有运行过。
请运行：

```bash
npm run prepare
```

或者手动初始化：

```bash
npx husky init
```

### 4.2 提交被拒绝 (Commit Rejected)

如果看到类似以下的错误：

```
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
```

说明提交信息格式不正确。请**务必**使用 `npm run commit` 来生成规范的提交信息，或者严格遵守 `type(scope): subject` 的格式（如 `feat(users): add login function`）。

### 4.3 绕过检查 (不推荐)

在极特殊情况（如紧急修复 CI 问题且不需要 lint）下，可以使用 `-n` 或 `--no-verify` 跳过钩子，但请慎用：

```bash
git commit -m "fix: urgent fix" -n
```

---

> [!IMPORTANT]
> 保持 `.config.js` 文件的 `export default` 语法与 `package.json` 中的 `"type": "module"` 一致。如果是 CommonJS 项目，请使用 `module.exports`。本项目已启用 ESM。
