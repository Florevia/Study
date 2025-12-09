# Git 忽略文件指南

## 概述

在使用 Git 进行版本控制时，有些文件不应该被提交到仓库中。这些文件通常包括临时文件、依赖项、个人配置、构建输出等。忽略这些文件可以：

1. 减小仓库体积
2. 避免冲突
3. 保护敏感信息
4. 保持仓库整洁

## 应该忽略的文件类型

### 1. 依赖目录

```
node_modules/
bower_components/
vendor/
```

**原因**：这些目录包含项目依赖的第三方库，可以通过 `package.json` 或其他包管理文件重新安装。

### 2. 构建输出目录

```
dist/
build/
out/
target/
```

**原因**：这些目录包含编译后的代码，可以从源代码重新生成。

### 3. 日志文件

```
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**原因**：日志文件记录运行时信息，对其他开发者无用，且会不断增长。

### 4. 环境配置文件

```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

**原因**：这些文件包含敏感信息（如 API 密钥、数据库密码等），不应该提交到公共仓库。

### 5. IDE/编辑器配置文件

```
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
Thumbs.db
```

**原因**：这些是个人编辑器配置，不应该强制给团队其他成员。

### 6. 临时文件

```
*.tmp
*.temp
.cache/
.sass-cache/
```

**原因**：临时文件在构建或运行过程中生成，不需要版本控制。

### 7. 操作系统生成的文件

```
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```

**原因**：这些是操作系统自动生成的文件，对项目没有实际价值。

### 8. 测试覆盖率报告

```
coverage/
.nyc_output/
```

**原因**：测试覆盖率报告可以在本地生成，不需要提交到仓库。

### 9. 包管理器锁定文件（可选）

```
package-lock.json
yarn.lock
pnpm-lock.yaml
```

**注意**：这些文件是否应该提交存在争议。在团队开发中，建议提交以确保所有开发者使用相同版本的依赖。

### 10. 文档生成目录

```
docs/_build/
.jekyll/
_site/
```

**原因**：这些目录包含生成的文档，可以从源文件重新生成。

## 通用 .gitignore 模板

### 前端项目

```gitignore
# 依赖
node_modules/
bower_components/

# 构建输出
dist/
build/

# 环境变量
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# 日志
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# 运行时数据
pids
*.pid
*.seed
*.pid.lock

# 覆盖率目录
coverage/
.nyc_output/

# 编辑器和IDE
.vscode/
.idea/
*.swp
*.swo
*~

# 操作系统
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# 临时文件
*.tmp
*.temp
.cache/

# 可选：包管理器锁定文件
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

### Node.js 项目

```gitignore
# 依赖
node_modules/
jspm_packages/

# 构建输出
build/
dist/

# 测试
coverage/
.nyc_output/

# Grunt 中间和输出目录
.grunt

# Bower 依赖目录
bower_components

# node-waf 配置
.lock-wscript

# 编译的二进制插件
build/Release

# 依赖目录
node_modules/
jspm_packages/

# TypeScript 缓存
*.tsbuildinfo

# 可选的 npm 缓存目录
.npm

# 可选的 eslint 缓存
.eslintcache

# Microbundle 缓存
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# 可选的 REPL 历史
.node_repl_history

# yarn v2 的输出
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*
```

### Python 项目

```gitignore
# 字节码文件
__pycache__/
*.py[cod]
*$py.class

# 分发/打包
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
*.manifest
*.spec

# 单元测试/覆盖率报告
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/

# 环境
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# 操作系统
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```

## 特殊情况处理

### 1. 部分忽略文件

如果您想忽略某个目录中的大部分文件，但保留某些特定文件，可以使用 `!` 前缀：

```gitignore
# 忽略所有 .txt 文件
*.txt

# 但保留 important.txt
!important.txt

# 忽略 config 目录下的所有文件
config/

# 但保留 config/prod.json
!config/prod.json
```

### 2. 仅忽略未跟踪的文件

如果某些文件已经被跟踪，但您想从现在开始忽略它们：

```bash
# 从 Git 中移除文件，但保留本地文件
git rm --cached filename

# 或者对整个目录
git rm -r --cached directory/
```

### 3. 全局 .gitignore

您可以设置一个全局 .gitignore 文件，应用于所有 Git 仓库：

```bash
git config --global core.excludesfile ~/.gitignore_global
```

然后在 `~/.gitignore_global` 中添加通用忽略规则。

## 最佳实践

1. **项目特定的 .gitignore**：每个项目都应该有自己的 .gitignore 文件
2. **尽早设置**：在项目开始时就设置好 .gitignore，避免意外提交不需要的文件
3. **定期检查**：定期检查是否有不应该提交的文件被意外提交
4. **使用模板**：可以使用 [gitignore.io](https://www.gitignore.io/) 生成特定技术栈的 .gitignore 文件
5. **敏感信息**：永远不要将 API 密钥、密码等敏感信息提交到仓库

## 总结

忽略适当的文件可以保持仓库整洁、减小体积、避免冲突，并保护敏感信息。根据您的项目类型和技术栈，选择合适的 .gitignore 规则，并在项目开始时就设置好这些规则。