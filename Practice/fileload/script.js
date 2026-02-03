// ===== 模拟文件数据 =====
// 实际应用中，这些数据应该从后端 API 获取
const mockFiles = [
    {
        name: 'project-report.pdf',
        size: 2457600, // 2.4 MB
        type: 'PDF',
        url: '/download/project-report.pdf'
    },
    {
        name: 'presentation.pptx',
        size: 5242880, // 5 MB
        type: 'PPTX',
        url: '/download/presentation.pptx'
    },
    {
        name: 'data-analysis.xlsx',
        size: 1048576, // 1 MB
        type: 'XLSX',
        url: '/download/data-analysis.xlsx'
    },
    {
        name: 'meeting-notes.docx',
        size: 524288, // 512 KB
        type: 'DOCX',
        url: '/download/meeting-notes.docx'
    },
    {
        name: 'source-code.zip',
        size: 15728640, // 15 MB
        type: 'ZIP',
        url: '/download/source-code.zip'
    },
    {
        name: 'tutorial-video.mp4',
        size: 52428800, // 50 MB
        type: 'MP4',
        url: '/download/tutorial-video.mp4'
    }
];

// ===== 工具函数：格式化文件大小 =====
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// ===== 工具函数：获取文件类型图标 =====
function getFileIcon(type) {
    const icons = {
        'PDF': `
            <svg viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="9" y1="15" x2="15" y2="15"></line>
                <line x1="9" y1="18" x2="15" y2="18"></line>
            </svg>
        `,
        'PPTX': `
            <svg viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
            </svg>
        `,
        'XLSX': `
            <svg viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="8" y1="13" x2="16" y2="13"></line>
                <line x1="8" y1="17" x2="16" y2="17"></line>
                <line x1="12" y1="9" x2="12" y2="21"></line>
            </svg>
        `,
        'DOCX': `
            <svg viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
        `,
        'ZIP': `
            <svg viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
        `,
        'MP4': `
            <svg viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
        `,
        'default': `
            <svg viewBox="0 0 24 24">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
        `
    };

    return icons[type] || icons['default'];
}

// ===== 创建文件卡片元素 =====
function createFileCard(file, index) {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.style.animationDelay = `${index * 0.08}s`;

    card.innerHTML = `
        <div class="file-icon">
            ${getFileIcon(file.type)}
        </div>
        <div class="file-info">
            <h3 class="file-name">${file.name}</h3>
            <div class="file-meta">
                <span class="file-size">${formatFileSize(file.size)}</span>
                <span class="file-type">${file.type}</span>
            </div>
        </div>
        <button class="download-btn" onclick="downloadFile('${file.url}', '${file.name}')">
            <span>下载文件</span>
        </button>
    `;

    return card;
}

// ===== 下载文件函数 =====
function downloadFile(url, filename) {
    // 方法1: 使用 <a> 标签下载（适用于同源文件）
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`开始下载: ${filename}`);
}

// ===== 从后端 API 获取文件列表 =====
async function fetchFileList() {
    try {
        // 实际应用中，这里应该调用后端 API
        const response = await fetch('/api/files');
        const files = await response.json();
        return files;
    } catch (error) {
        console.log('使用模拟数据（后端服务未启动）');
        // 如果后端未启动，使用模拟数据
        return mockFiles;
    }
}

// ===== 渲染文件列表 =====
async function renderFileList() {
    const filesGrid = document.getElementById('filesGrid');

    // 显示加载状态
    filesGrid.innerHTML = '<div class="loading">正在加载文件列表...</div>';

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        // 获取文件列表
        const files = await fetchFileList();

        // 清空加载状态
        filesGrid.innerHTML = '';

        // 渲染文件卡片
        if (files.length === 0) {
            filesGrid.innerHTML = '<div class="loading">暂无可下载文件</div>';
        } else {
            files.forEach((file, index) => {
                const card = createFileCard(file, index);
                filesGrid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('加载文件列表失败:', error);
        filesGrid.innerHTML = '<div class="loading">加载失败，请刷新页面重试</div>';
    }
}

// ===== 页面初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    renderFileList();
});
