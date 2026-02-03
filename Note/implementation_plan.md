# Git 提交规范工具链配置指南

## 工具链概览

| 工具                | 版本 | 作用           | 配置文件                |
| ------------------- | ---- | -------------- | ----------------------- |
| **Husky**           | 9.x  | Git 钩子管理   | `.husky/` 目录          |
| **lint-staged**     | 16.x | 只检查暂存文件 | `lint-staged.config.js` |
| **Commitizen**      | 4.x  | 交互式提交信息 | [package.json]          |
| **cz-customizable** | 7.x  | 自定义提交提示 | `.cz-config.js`         |
| **@commitlint/cli** | 19.x | 提交信息校验   | [commitlint.config.js]  |

---

## Proposed Changes

### Step 1: 安装依赖

```bash
# 安装所有工具
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional commitizen cz-customizable
```

### Step 2: 初始化 Husky

```bash
# Husky 9.x 使用 init 命令初始化
npx husky init
```

这会自动：

- 创建 `.husky/` 目录
- 创建 [.husky/pre-commit]钩子文件
- 在 [package.json] 添加 `"prepare": "husky"` 脚本

### Step 3: 配置钩子文件

#### [MODIFY] [pre-commit]

```bash
npx lint-staged
```

#### [NEW] [commit-msg]

```bash
npx --no-install commitlint --edit $1
```

---

### Step 4: 创建配置文件

#### [NEW] [lint-staged.config.js]

```javascript
export default {
  // 对 JS/Vue 文件运行 ESLint
  "*.{js,jsx,vue}": ["eslint --fix"],
  // 对多种文件运行 Prettier
  "*.{js,jsx,vue,css,scss,json,md}": ["prettier --write"],
};
```

#### [NEW] [commitlint.config.js]

```javascript
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // type 类型定义
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复Bug
        "docs", // 文档变更
        "style", // 代码格式
        "refactor", // 代码重构
        "perf", // 性能优化
        "test", // 添加测试
        "build", // 构建/依赖变更
        "ci", // CI配置
        "chore", // 其他修改
        "revert", // 回退
      ],
    ],
    // subject 大小写不做校验
    "subject-case": [0],
  },
};
```

#### [NEW] [.cz-config.js]

```javascript
export default {
  // 可选类型
  types: [
    { value: "feat", name: "feat:     ✨ 新功能" },
    { value: "fix", name: "fix:      🐛 修复Bug" },
    { value: "docs", name: "docs:     📝 文档变更" },
    { value: "style", name: "style:    💄 代码格式(不影响功能)" },
    { value: "refactor", name: "refactor: ♻️  代码重构" },
    { value: "perf", name: "perf:     ⚡️ 性能优化" },
    { value: "test", name: "test:     ✅ 添加测试" },
    { value: "build", name: "build:    📦 构建/依赖变更" },
    { value: "ci", name: "ci:       👷 CI配置" },
    { value: "chore", name: "chore:    🔧 其他修改" },
    { value: "revert", name: "revert:   ⏪ 回退" },
  ],

  // 消息步骤
  messages: {
    type: "请选择提交类型:",
    scope: "请输入修改范围(可选):",
    customScope: "请输入修改范围:",
    subject: "请简要描述提交(必填):",
    body: "请输入详细描述(可选):",
    breaking: "列出任何破坏性变更(可选):",
    footer: "请输入要关闭的issue(可选):",
    confirmCommit: "确认使用以上信息提交?(y/n)",
  },

  // 跳过的步骤
  skipQuestions: ["body", "breaking", "footer"],

  // 主题长度限制
  subjectLimit: 100,
};
```

---

### Step 5: 配置 package.json

在 [package.json] 中添加以下配置：

```json
{
  "scripts": {
    "commit": "cz",
    "prepare": "husky"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": ".cz-config.js"
    }
  }
}
```

> [!IMPORTANT]
> 如果项目 [package.json] 中有 `"type": "module"`，所有 [.config.js] 文件都使用 `export default` 语法。

---

## Verification Plan

### 手动测试

1. **测试 lint-staged**：修改一个 [.js] 或 `.vue` 文件，添加一些格式问题，然后运行：

   ```bash
   git add .
   npx lint-staged
   ```

   预期：文件被自动格式化

2. **测试 commitizen**：运行交互式提交：

   ```bash
   npm run commit
   ```

   预期：出现中文提示选择提交类型

3. **测试 commitlint**：尝试一个不符合规范的提交：

   ```bash
   git commit -m "bad commit message"
   ```

   预期：提交被拒绝，显示错误信息

4. **测试正确提交**：
   ```bash
   git commit -m "feat: 添加测试功能"
   ```
   预期：提交成功

---

## 文件结构总览

```
项目根目录/
├── .husky/
│   ├── pre-commit          # 提交前运行 lint-staged
│   └── commit-msg          # 验证提交信息格式
├── .cz-config.js           # Commitizen 中文配置
├── commitlint.config.js    # Commitlint 规则配置
├── lint-staged.config.js   # lint-staged 配置
└── package.json            # 包含 scripts 和 config
```
