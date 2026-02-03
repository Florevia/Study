# 文件下载系统

一个简单、优雅的文件下载系统，使用 Node.js + Express 后端和原生 JavaScript 前端实现。

## 📋 目录结构

```
fileload/
├── index.html          # 前端页面
├── style.css           # 样式文件
├── script.js           # 前端 JavaScript
├── server.js           # 后端服务器
├── package.json        # 项目配置
├── files/              # 文件存储目录
│   ├── test-document.txt
│   ├── sample-data.csv
│   ├── sample-code.js
│   ├── README.md
│   ├── config.json
│   └── sample-image.jpg
└── README.md           # 本文件
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
npm start
```

### 3. 访问应用

打开浏览器访问：`http://localhost:3000`

## 📦 功能特性

- ✅ 文件列表展示
- ✅ 文件大小自动格式化（B/KB/MB/GB）
- ✅ 文件类型识别和图标显示
- ✅ 一键下载功能
- ✅ 响应式设计，支持移动端
- ✅ 日式简约风格 UI

## 🔧 技术栈

### 前端
- HTML5
- CSS3（Grid 布局、CSS 变量、动画）
- 原生 JavaScript（ES6+）

### 后端
- Node.js
- Express.js

## 📖 实现原理

### 一、前端文件下载的常见方式

#### 1. **使用 `<a>` 标签的 download 属性**（本项目使用）

```javascript
function downloadFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
}
```

**优点**：
- 最简单直接
- 浏览器原生支持
- 自动处理文件名

**缺点**：
- 仅适用于同源文件
- 跨域文件会打开新标签页而非下载

**适用场景**：同源文件下载

---

#### 2. **使用 Blob 和 URL.createObjectURL()**

```javascript
async function downloadFile(url, filename) {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(blobUrl);
}
```

**优点**：
- 支持跨域下载
- 可以在下载前处理文件数据
- 可以显示下载进度

**缺点**：
- 需要将整个文件加载到内存
- 不适合大文件

**适用场景**：跨域文件、需要处理的小文件

---

#### 3. **使用 FileSaver.js 库**

```javascript
import { saveAs } from 'file-saver';

async function downloadFile(url, filename) {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, filename);
}
```

**优点**：
- 兼容性好（支持旧浏览器）
- API 简单
- 自动处理各种边界情况

**缺点**：
- 需要引入第三方库

**适用场景**：需要兼容旧浏览器的项目

---

### 二、后端文件下载的实现方式

#### 1. **使用 `res.download()`**（本项目使用）

```javascript
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'files', req.params.filename);
    res.download(filePath, req.params.filename);
});
```

**优点**：
- 最简单的方式
- Express 自动设置正确的响应头
- 自动处理错误

**工作原理**：
1. 读取文件
2. 设置 `Content-Disposition: attachment; filename="xxx"`
3. 设置 `Content-Type` 为正确的 MIME 类型
4. 发送文件内容

---

#### 2. **使用 Stream 流式传输**

```javascript
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'files', req.params.filename);
    const stat = fs.statSync(filePath);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', stat.size);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});
```

**优点**：
- 内存效率高（流式传输）
- 适合大文件
- 支持断点续传（配合 Range 头）

**工作原理**：
1. 创建文件读取流
2. 设置响应头
3. 将文件流 pipe 到响应流
4. 边读边发送，不占用大量内存

---

#### 3. **使用 `res.sendFile()`**

```javascript
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'files', req.params.filename);
    res.sendFile(filePath);
});
```

**注意**：`sendFile()` 默认是在浏览器中打开文件，而不是下载。要实现下载需要手动设置响应头：

```javascript
res.setHeader('Content-Disposition', 'attachment');
res.sendFile(filePath);
```

---

### 三、关键技术点说明

#### 1. **Content-Disposition 响应头**

```
Content-Disposition: attachment; filename="example.pdf"
```

- `attachment`：告诉浏览器下载文件而非在浏览器中打开
- `inline`：在浏览器中打开（如 PDF、图片）
- `filename`：指定下载后的文件名

#### 2. **Content-Type 响应头**

常见 MIME 类型：
- `application/pdf` - PDF 文件
- `application/zip` - ZIP 压缩包
- `text/plain` - 文本文件
- `image/jpeg` - JPEG 图片
- `application/octet-stream` - 二进制流（通用下载）

#### 3. **安全性考虑**

```javascript
// 防止路径遍历攻击
const requestedPath = path.join(DOWNLOAD_DIR, filename);
if (!requestedPath.startsWith(DOWNLOAD_DIR)) {
    return res.status(403).send('Forbidden');
}
```

防止用户通过 `../../` 等方式访问系统其他文件。

---

## 🎨 UI 设计特点

- **日式简约风格**：使用温暖的自然色调（米色、棕色）
- **Serif 字体**：使用 Lora 和 Noto Serif SC 营造优雅感
- **卡片式布局**：使用 CSS Grid 实现响应式网格
- **微动画**：悬停效果、加载动画、渐入动画
- **留白设计**：充足的空间让界面更舒适

## 📝 自定义配置

### 修改端口

编辑 `server.js`:

```javascript
const PORT = 3000; // 改为你想要的端口
```

### 修改文件存储目录

编辑 `server.js`:

```javascript
const DOWNLOAD_DIR = path.join(__dirname, 'files'); // 改为你的目录
```

### 添加更多文件

直接将文件复制到 `files/` 目录即可，刷新页面自动显示。

## 🔍 API 接口

### 获取文件列表

```
GET /api/files
```

响应示例：

```json
[
    {
        "name": "example.pdf",
        "size": 1024000,
        "type": "PDF",
        "url": "/download/example.pdf"
    }
]
```

### 下载文件

```
GET /download/:filename
```

## 🛠️ 开发模式

使用 nodemon 实现热重载：

```bash
npm install -g nodemon
npm run dev
```

## 📚 扩展功能建议

- [ ] 文件上传功能
- [ ] 文件搜索和过滤
- [ ] 文件预览（图片、PDF）
- [ ] 用户认证和权限管理
- [ ] 下载统计和日志
- [ ] 文件分类和标签
- [ ] 批量下载（打包为 ZIP）
- [ ] 断点续传支持

## ⚠️ 注意事项

1. **生产环境部署**：
   - 使用 HTTPS
   - 添加文件大小限制
   - 实现访问控制
   - 添加日志记录
   - 使用专业的静态文件服务（如 Nginx）

2. **性能优化**：
   - 大文件使用流式传输
   - 启用 gzip 压缩
   - 添加缓存策略
   - 使用 CDN

3. **安全性**：
   - 验证文件类型
   - 限制文件大小
   - 防止路径遍历攻击
   - 添加速率限制

## 📄 许可证

MIT License

## 🙋 常见问题

### Q: 为什么下载的文件名是乱码？

A: 确保后端设置了正确的 `Content-Disposition` 头，并对文件名进行 URL 编码：

```javascript
res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
```

### Q: 如何支持大文件下载？

A: 使用流式传输（Stream）而不是一次性读取整个文件到内存：

```javascript
const fileStream = fs.createReadStream(filePath);
fileStream.pipe(res);
```

### Q: 如何实现下载进度显示？

A: 前端使用 `fetch` API 配合 `ReadableStream`：

```javascript
const response = await fetch(url);
const reader = response.body.getReader();
const contentLength = +response.headers.get('Content-Length');

let receivedLength = 0;
while(true) {
    const {done, value} = await reader.read();
    if (done) break;

    receivedLength += value.length;
    const progress = (receivedLength / contentLength) * 100;
    console.log(`下载进度: ${progress}%`);
}
```

---

**创建时间**: 2026-01-10
**作者**: Claude Code
**版本**: 1.0.0
