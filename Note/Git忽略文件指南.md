# Git 忽略文件指南

### 1. 依赖目录

```
node_modules/
bower_components/
vendor/
```

### 2. 构建输出目录

```
dist/
build/
out/
target/
```

### 3. 日志文件

```
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### 4. 环境配置文件

```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

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

### 6. 临时文件

```
*.tmp
*.temp
.cache/
.sass-cache/
```

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

### 8. 测试覆盖率报告

```
coverage/
.nyc_output/
```

### 9. 文档生成目录

```
docs/_build/
.jekyll/
_site/
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