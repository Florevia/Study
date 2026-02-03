# 📁 FILE_UPLOAD.SYS

一个具有赛博朋克风格的现代化文件上传系统，展示四种不同的文件上传实现方式。

![License](https://img.shields.io/badge/license-MIT-00ff88)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-00f0ff)
![Express](https://img.shields.io/badge/express-4.x-ff00ff)

---

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

打开浏览器访问 `http://localhost:3000`

---

## 🎨 设计特色

### Cyber-Brutalist 美学
- 深色主题配合霓虹色调（青色、品红、黄色、绿色）
- 网格背景与扫描线动画效果
- 终端风格的等宽字体（IBM Plex Mono）
- 现代化的显示字体（Syne）
- 卡片悬停发光效果
- 流畅的动画过渡

### 响应式设计
- 移动端友好的自适应布局
- 优化的触摸交互体验

---

## 📦 四种上传方式

### 1️⃣ Base64 编码上传

**协议**: `DATA_URI`
**端点**: `POST /upload-base64`

#### 原理
将文件转换为Base64字符串后以JSON格式上传到服务器。

#### 特点
- ✅ 无需FormData
- ✅ 可直接嵌入JSON
- ✅ 适合小文件（建议<1MB）
- ⚠️ 体积膨胀约33%

#### 前端实现
```javascript
const reader = new FileReader();

reader.onload = function(e) {
  const base64Data = e.target.result; // data:image/png;base64,iVBORw0KG...

  fetch('/upload-base64', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      data: base64Data,
      size: file.size,
      type: file.type
    })
  });
};

reader.readAsDataURL(file);
```

#### 服务器实现
```javascript
app.post('/upload-base64', (req, res) => {
  const { filename, data } = req.body;

  // 解析Base64数据
  const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');

  // 保存文件
  fs.writeFileSync(filepath, buffer);
});
```

#### 适用场景
- 头像上传
- 图标、Logo上传
- 需要嵌入JSON的API
- 小图片预览

---

### 2️⃣ 分片上传

**协议**: `CHUNKED_TRANSFER`
**端点**: `POST /upload-chunk` + `POST /merge-chunks`

#### 原理
将大文件切分成多个小片段（chunks），逐个上传后在服务器端合并。

#### 特点
- ✅ 支持大文件（>100MB）
- ✅ 断点续传机制
- ✅ 可并发上传分片
- ✅ 实时分片进度显示
- ✅ 网络失败可重试

#### 前端实现
```javascript
const chunkSize = 1024 * 1024; // 1MB per chunk
const totalChunks = Math.ceil(file.size / chunkSize);
const fileId = Date.now() + '-' + file.name;

function uploadNextChunk(currentChunk) {
  const start = currentChunk * chunkSize;
  const end = Math.min(start + chunkSize, file.size);
  const chunk = file.slice(start, end);

  const formData = new FormData();
  formData.append('chunk', chunk);
  formData.append('chunkIndex', currentChunk);
  formData.append('totalChunks', totalChunks);
  formData.append('fileId', fileId);
  formData.append('filename', file.name);

  fetch('/upload-chunk', {
    method: 'POST',
    body: formData
  })
  .then(() => uploadNextChunk(currentChunk + 1));
}

// 所有分片上传完成后，通知服务器合并
function mergeChunks() {
  fetch('/merge-chunks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId, filename, totalChunks })
  });
}
```

#### 服务器实现
```javascript
// 接收分片
app.post('/upload-chunk', upload.single('chunk'), (req, res) => {
  const { chunkIndex, fileId } = req.body;
  const chunkPath = path.join(chunksDir, fileId, `chunk-${chunkIndex}`);

  fs.renameSync(req.file.path, chunkPath);
  res.json({ success: true });
});

// 合并分片
app.post('/merge-chunks', (req, res) => {
  const { fileId, filename, totalChunks } = req.body;
  const writeStream = fs.createWriteStream(finalPath);

  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(chunksDir, fileId, `chunk-${i}`);
    const chunkBuffer = fs.readFileSync(chunkPath);
    writeStream.write(chunkBuffer);
  }

  writeStream.end();
});
```

#### 适用场景
- 视频文件上传
- 大型压缩包
- 高清图片批量上传
- 需要断点续传的场景

---

### 3️⃣ Ajax 异步上传

**协议**: `XHR_ASYNC`
**端点**: `POST /upload-ajax`

#### 原理
使用XMLHttpRequest配合FormData进行异步上传，支持进度监听。

#### 特点
- ✅ 页面无刷新
- ✅ 实时进度反馈
- ✅ 最常用的方案
- ✅ 兼容性好

#### 前端实现
```javascript
const formData = new FormData();
formData.append('file', file);

const xhr = new XMLHttpRequest();

// 监听上传进度
xhr.upload.addEventListener('progress', function(e) {
  if (e.lengthComputable) {
    const percent = Math.round((e.loaded / e.total) * 100);
    console.log('进度:', percent + '%');
  }
});

// 监听上传完成
xhr.addEventListener('load', function() {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    console.log('上传成功:', response);
  }
});

xhr.open('POST', '/upload-ajax');
xhr.send(formData);
```

#### 服务器实现
```javascript
app.post('/upload-ajax', upload.single('file'), (req, res) => {
  res.json({
    success: true,
    message: '文件上传成功',
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      path: `/uploads/${req.file.filename}`
    }
  });
});
```

#### 适用场景
- 大部分Web应用
- 需要进度条的场景
- 表单文件上传
- 个人资料上传

---

### 4️⃣ 传统表单上传

**协议**: `FORM_SUBMIT`
**端点**: `POST /upload-form`

#### 原理
使用HTML原生表单的multipart/form-data编码提交。

#### 特点
- ✅ 零JavaScript依赖
- ✅ 浏览器原生支持
- ✅ 实现最简单
- ⚠️ 页面会跳转刷新

#### 前端实现
```html
<form action="/upload-form" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" required>
  <button type="submit">上传文件</button>
</form>
```

#### 服务器实现
```javascript
app.post('/upload-form', upload.single('file'), (req, res) => {
  // 返回HTML页面
  res.send(`
    <h1>上传成功</h1>
    <p>文件名: ${req.file.originalname}</p>
    <p>大小: ${req.file.size} bytes</p>
  `);
});
```

#### 适用场景
- 简单的后台管理系统
- 不需要实时反馈的场景
- 兼容老旧浏览器
- 快速原型开发

---

## 🔧 技术栈

### 前端
- 原生HTML5 / CSS3 / JavaScript
- Google Fonts (IBM Plex Mono, Syne)
- FileReader API
- XMLHttpRequest / Fetch API
- Blob.slice() for chunking

### 后端
- Node.js (>=14.0.0)
- Express.js 4.x
- Multer (文件上传中间件)
- File System (fs模块)

---

## 📂 项目结构

```
FileLoader/
├── server.js                 # Express服务器
├── package.json              # 项目配置
├── public/
│   └── index.html           # 前端页面（四种上传方式）
├── uploads/                 # 上传文件保存目录
├── chunks/                  # 分片临时存储目录
└── README.md                # 项目文档
```

---

## ⚙️ 配置说明

### 修改文件大小限制

在 `server.js` 中:

```javascript
// Base64上传限制
app.use(express.json({ limit: '50mb' }));

// Multer上传限制
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});
```

### 修改分片大小

在 `public/index.html` 中:

```javascript
const chunkSize = 1024 * 1024; // 1MB per chunk
// 可以调整为 2MB, 5MB 等
```

### 添加文件类型限制

```javascript
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // 只允许图片
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件！'));
    }
  }
});
```

---

## 🎯 对比表格

| 特性 | Base64 | 分片上传 | Ajax | 传统表单 |
|------|--------|---------|------|---------|
| **页面刷新** | ✗ | ✗ | ✗ | ✓ |
| **进度条** | ✓ | ✓ | ✓ | ✗ |
| **大文件支持** | ✗ | ✓✓✓ | ✓ | ✓ |
| **断点续传** | ✗ | ✓ | ✗ | ✗ |
| **实现复杂度** | 简单 | 复杂 | 中等 | 极简 |
| **网络效率** | 差 | 优 | 良 | 良 |
| **兼容性** | 现代浏览器 | 现代浏览器 | 所有浏览器 | 所有浏览器 |
| **适合文件大小** | <1MB | >10MB | 任意 | 任意 |

---

## 🔐 安全建议

1. **验证文件类型**
   - 不要仅依赖扩展名
   - 检查MIME类型
   - 使用magic number验证

2. **限制文件大小**
   - 防止恶意上传大文件
   - 根据业务需求设置合理限制

3. **重命名文件**
   - 避免文件名冲突
   - 防止路径穿越攻击
   - 使用时间戳+随机数

4. **病毒扫描**
   - 对上传文件进行安全检查
   - 集成ClamAV等杀毒引擎

5. **访问控制**
   - 限制谁可以上传
   - 限制谁可以访问已上传文件
   - 实现身份验证和授权

6. **存储安全**
   - 上传目录与代码目录分离
   - 设置适当的文件权限
   - 考虑使用云存储（OSS, S3等）

---

## 📚 学习要点

通过这个项目，你将学会：

### 前端技能
1. ✅ 理解FileReader API和Base64编码
2. ✅ 掌握Blob.slice()进行文件分片
3. ✅ 使用XMLHttpRequest监听上传进度
4. ✅ 理解FormData的使用方法
5. ✅ 实现拖拽上传功能
6. ✅ CSS动画和现代化UI设计

### 后端技能
1. ✅ Express中间件的使用
2. ✅ Multer配置和文件处理
3. ✅ Node.js文件系统操作
4. ✅ 流式处理大文件
5. ✅ 分片文件合并算法
6. ✅ RESTful API设计

### 核心概念
1. ✅ multipart/form-data编码格式
2. ✅ Base64编码原理和应用
3. ✅ 分片上传和断点续传机制
4. ✅ 异步上传vs同步上传
5. ✅ 文件上传的安全性

---

## 🚧 扩展功能

可以尝试添加以下功能：

- [ ] 图片裁剪和压缩
- [ ] 多文件批量上传
- [ ] 拖拽上传支持
- [ ] 上传队列管理
- [ ] 文件预览（PDF、视频、音频）
- [ ] 云存储集成（阿里云OSS、腾讯云COS、AWS S3）
- [ ] WebSocket实时进度推送
- [ ] 上传历史记录
- [ ] 文件去重（MD5校验）
- [ ] 图片水印添加

---

## 🐛 常见问题

### Q1: Base64上传失败？
**A**: 检查以下几点：
- 文件是否超过1MB（Base64会膨胀33%）
- 服务器JSON body限制是否足够大
- Base64字符串格式是否正确

### Q2: 分片上传合并失败？
**A**: 可能原因：
- 分片丢失或顺序错误
- 磁盘空间不足
- 文件权限问题
- 检查服务器日志

### Q3: Ajax上传没有进度？
**A**: 确保使用了正确的事件：
```javascript
xhr.upload.addEventListener('progress', ...);  // 正确
xhr.addEventListener('progress', ...);         // 错误
```

### Q4: 传统表单上传后页面空白？
**A**: 服务器需要返回HTML响应，而不是JSON。

### Q5: 如何支持多文件上传？
**A**:
前端：
```html
<input type="file" multiple>
```
后端：
```javascript
upload.array('files', 10)  // 最多10个文件
```

---

## 📝 API文档

### POST /upload-base64
上传Base64编码的文件

**请求体**:
```json
{
  "filename": "example.png",
  "data": "data:image/png;base64,iVBORw0KGgoA...",
  "size": 12345,
  "type": "image/png"
}
```

**响应**:
```json
{
  "success": true,
  "message": "Base64文件上传成功",
  "file": {
    "originalName": "example.png",
    "filename": "1234567890-example.png",
    "size": 12345,
    "path": "/uploads/1234567890-example.png"
  }
}
```

### POST /upload-chunk
上传文件分片

**请求体** (FormData):
- `chunk`: Blob对象
- `chunkIndex`: 分片索引（从0开始）
- `totalChunks`: 总分片数
- `fileId`: 文件唯一标识
- `filename`: 原始文件名

**响应**:
```json
{
  "success": true,
  "message": "分片上传成功",
  "chunkIndex": 0
}
```

### POST /merge-chunks
合并所有分片

**请求体**:
```json
{
  "fileId": "1234567890-example.zip",
  "filename": "example.zip",
  "totalChunks": 10
}
```

**响应**:
```json
{
  "success": true,
  "message": "文件合并成功",
  "file": {
    "originalName": "example.zip",
    "filename": "1234567890-example.zip",
    "size": 10485760,
    "path": "/uploads/1234567890-example.zip"
  }
}
```

### POST /upload-ajax
Ajax异步上传

**请求体** (FormData):
- `file`: File对象

**响应**:
```json
{
  "success": true,
  "message": "文件上传成功",
  "file": {
    "originalName": "example.pdf",
    "filename": "1234567890-example.pdf",
    "size": 54321,
    "path": "/uploads/1234567890-example.pdf"
  }
}
```

### POST /upload-form
传统表单上传

**请求体** (multipart/form-data):
- `file`: 文件字段

**响应**: HTML页面

---

## 📄 许可证

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

## 🙏 致谢

- [Express.js](https://expressjs.com/) - 快速的Node.js Web框架
- [Multer](https://github.com/expressjs/multer) - 优秀的文件上传中间件
- [Google Fonts](https://fonts.google.com/) - IBM Plex Mono 和 Syne 字体

---

**Built with ❤️ for learning file upload techniques**
