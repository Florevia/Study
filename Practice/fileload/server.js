const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// ===== 静态文件服务 =====
// 提供前端页面（HTML、CSS、JS）
app.use(express.static(__dirname));

// ===== 文件下载目录 =====
const DOWNLOAD_DIR = path.join(__dirname, 'files');

// 确保下载目录存在
if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// ===== API: 获取文件列表 =====
app.get('/api/files', (req, res) => {
    try {
        const files = fs.readdirSync(DOWNLOAD_DIR);

        const fileList = files.map(filename => {
            const filePath = path.join(DOWNLOAD_DIR, filename);
            const stats = fs.statSync(filePath);

            // 获取文件扩展名并转换为大写类型
            const ext = path.extname(filename).slice(1).toUpperCase();

            return {
                name: filename,
                size: stats.size,
                type: ext || 'FILE',
                url: `/download/${encodeURIComponent(filename)}`
            };
        });

        res.json(fileList);
    } catch (error) {
        console.error('读取文件列表失败:', error);
        res.status(500).json({ error: '读取文件列表失败' });
    }
});

// ===== 文件下载接口 =====
// 方式1: 使用 res.download() - 最简单的方式
app.get('/download/:filename', (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(DOWNLOAD_DIR, filename);

    // 安全检查：防止路径遍历攻击
    if (!filePath.startsWith(DOWNLOAD_DIR)) {
        return res.status(403).json({ error: '非法的文件路径' });
    }

    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: '文件不存在' });
    }

    // 下载文件（自动设置正确的 Content-Type 和 Content-Disposition）
    res.download(filePath, filename, (err) => {
        if (err) {
            console.error('文件下载失败:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: '文件下载失败' });
            }
        }
    });
});

// ===== 文件下载接口（流式传输）=====
// 方式2: 使用 stream - 适合大文件
app.get('/download-stream/:filename', (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(DOWNLOAD_DIR, filename);

    // 安全检查
    if (!filePath.startsWith(DOWNLOAD_DIR)) {
        return res.status(403).json({ error: '非法的文件路径' });
    }

    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: '文件不存在' });
    }

    // 获取文件信息
    const stat = fs.statSync(filePath);

    // 设置响应头
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
    res.setHeader('Content-Length', stat.size);

    // 创建可读流并传输到响应
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (err) => {
        console.error('文件读取失败:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: '文件读取失败' });
        }
    });

    fileStream.pipe(res);
});

// ===== 启动服务器 =====
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║   文件下载服务已启动！                            ║
║                                                   ║
║   访问地址: http://localhost:${PORT}                 ║
║   文件目录: ${DOWNLOAD_DIR}       ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
    `);
});
