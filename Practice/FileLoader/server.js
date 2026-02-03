const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// 解析JSON请求体
app.use(express.json({ limit: '50mb' })); // 增加限制以支持Base64

// 确保uploads和chunks目录存在
const uploadsDir = path.join(__dirname, 'uploads');
const chunksDir = path.join(__dirname, 'chunks');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

if (!fs.existsSync(chunksDir)) {
  fs.mkdirSync(chunksDir);
}

// 配置multer存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 提高到100MB以支持分片上传
});

// 静态文件服务
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// ==================== 方式1: Base64上传 ====================
app.post('/upload-base64', (req, res) => {
  try {
    const { filename, data, size, type } = req.body;

    if (!filename || !data) {
      return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    // 解析Base64数据
    // data格式: data:image/png;base64,iVBORw0KG...
    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: 'Base64格式错误' });
    }

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // 生成唯一文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const savedFilename = uniqueSuffix + '-' + filename;
    const filepath = path.join(uploadsDir, savedFilename);

    // 写入文件
    fs.writeFileSync(filepath, buffer);

    console.log(`✓ Base64上传成功: ${filename} (${(size / 1024).toFixed(2)} KB)`);

    res.json({
      success: true,
      message: 'Base64文件上传成功',
      file: {
        originalName: filename,
        filename: savedFilename,
        size: size,
        path: `/uploads/${savedFilename}`
      }
    });
  } catch (error) {
    console.error('Base64上传错误:', error);
    res.status(500).json({ success: false, message: '服务器错误: ' + error.message });
  }
});

// ==================== 方式2: 分片上传 ====================
app.post('/upload-chunk', upload.single('chunk'), (req, res) => {
  try {
    const { chunkIndex, totalChunks, fileId, filename } = req.body;
    const chunk = req.file;

    if (!chunk) {
      return res.status(400).json({ success: false, message: '没有接收到分片数据' });
    }

    // 创建文件专属的分片目录
    const fileChunksDir = path.join(chunksDir, fileId);
    if (!fs.existsSync(fileChunksDir)) {
      fs.mkdirSync(fileChunksDir, { recursive: true });
    }

    // 保存分片文件
    const chunkPath = path.join(fileChunksDir, `chunk-${chunkIndex}`);
    fs.renameSync(chunk.path, chunkPath);

    console.log(`✓ 接收分片 ${parseInt(chunkIndex) + 1}/${totalChunks}: ${filename}`);

    res.json({
      success: true,
      message: '分片上传成功',
      chunkIndex: chunkIndex
    });
  } catch (error) {
    console.error('分片上传错误:', error);
    res.status(500).json({ success: false, message: '分片上传失败: ' + error.message });
  }
});

// 合并分片
app.post('/merge-chunks', (req, res) => {
  try {
    const { fileId, filename, totalChunks } = req.body;

    const fileChunksDir = path.join(chunksDir, fileId);

    if (!fs.existsSync(fileChunksDir)) {
      return res.status(400).json({ success: false, message: '找不到分片文件' });
    }

    // 生成最终文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const finalFilename = uniqueSuffix + '-' + filename;
    const finalPath = path.join(uploadsDir, finalFilename);

    // 创建写入流
    const writeStream = fs.createWriteStream(finalPath);

    // 按顺序合并分片
    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(fileChunksDir, `chunk-${i}`);

      if (!fs.existsSync(chunkPath)) {
        writeStream.close();
        return res.status(400).json({
          success: false,
          message: `分片 ${i} 丢失`
        });
      }

      const chunkBuffer = fs.readFileSync(chunkPath);
      writeStream.write(chunkBuffer);
    }

    writeStream.end();

    // 等待写入完成
    writeStream.on('finish', () => {
      // 删除分片目录
      fs.rmSync(fileChunksDir, { recursive: true, force: true });

      const stats = fs.statSync(finalPath);
      console.log(`✓ 分片合并成功: ${filename} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

      res.json({
        success: true,
        message: '文件合并成功',
        file: {
          originalName: filename,
          filename: finalFilename,
          size: stats.size,
          path: `/uploads/${finalFilename}`
        }
      });
    });

    writeStream.on('error', (error) => {
      console.error('合并错误:', error);
      res.status(500).json({ success: false, message: '文件合并失败' });
    });
  } catch (error) {
    console.error('合并分片错误:', error);
    res.status(500).json({ success: false, message: '合并失败: ' + error.message });
  }
});

// ==================== 方式3: Ajax异步上传 ====================
app.post('/upload-ajax', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: '没有文件被上传' });
  }

  console.log(`✓ Ajax上传成功: ${req.file.originalname} (${(req.file.size / 1024).toFixed(2)} KB)`);

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

// ==================== 方式4: 传统表单上传 ====================
app.post('/upload-form', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('没有文件被上传');
  }

  console.log(`✓ 传统表单上传成功: ${req.file.originalname} (${(req.file.size / 1024).toFixed(2)} KB)`);

  // 返回美化的HTML页面
  res.send(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>上传成功 - FILE_UPLOAD.SYS</title>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Syne:wght@700&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'IBM Plex Mono', monospace;
          background: #0a0e27;
          color: #e0e6ff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          width: 100%;
          background: rgba(10, 14, 39, 0.8);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
        }
        h1 {
          font-family: 'Syne', sans-serif;
          font-size: 2em;
          color: #00ff88;
          margin-bottom: 10px;
        }
        .status {
          font-size: 14px;
          color: #00ff88;
          margin-bottom: 30px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .info {
          background: rgba(0, 0, 0, 0.3);
          border-left: 3px solid #00ff88;
          padding: 20px;
          margin-bottom: 30px;
          border-radius: 4px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .label {
          color: #8892b0;
          font-size: 13px;
        }
        .value {
          color: #e0e6ff;
          font-size: 13px;
          font-weight: 600;
        }
        .btn {
          display: inline-block;
          padding: 12px 30px;
          background: #00ff88;
          color: #0a0e27;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s;
          font-size: 13px;
        }
        .btn:hover {
          box-shadow: 0 10px 30px rgba(0, 255, 136, 0.4);
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✓ 上传成功</h1>
        <div class="status">Upload Complete</div>

        <div class="info">
          <div class="info-row">
            <span class="label">文件名</span>
            <span class="value">${req.file.originalname}</span>
          </div>
          <div class="info-row">
            <span class="label">文件大小</span>
            <span class="value">${(req.file.size / 1024).toFixed(2)} KB</span>
          </div>
          <div class="info-row">
            <span class="label">保存位置</span>
            <span class="value">${req.file.filename}</span>
          </div>
          <div class="info-row">
            <span class="label">上传协议</span>
            <span class="value">FORM_SUBMIT</span>
          </div>
        </div>

        <a href="/" class="btn">返回首页</a>
      </div>
    </body>
    </html>
  `);
});

// ==================== 多文件上传（额外功能） ====================
app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: '没有文件被上传' });
  }

  const files = req.files.map(file => ({
    originalName: file.originalname,
    filename: file.filename,
    size: file.size,
    path: `/uploads/${file.filename}`
  }));

  console.log(`✓ 多文件上传成功: ${req.files.length}个文件`);

  res.json({
    success: true,
    message: `成功上传 ${req.files.length} 个文件`,
    files: files
  });
});

// ==================== 启动服务器 ====================
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   FILE_UPLOAD.SYS - Server Running        ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 服务器地址: http://localhost:${PORT}`);
  console.log(`📁 上传目录: ${uploadsDir}`);
  console.log(`🧩 分片目录: ${chunksDir}`);
  console.log('');
  console.log('支持的上传方式:');
  console.log('  1️⃣  Base64编码   - /upload-base64');
  console.log('  2️⃣  分片上传     - /upload-chunk + /merge-chunks');
  console.log('  3️⃣  Ajax异步     - /upload-ajax');
  console.log('  4️⃣  传统表单     - /upload-form');
  console.log('');
});
