// 示例 JavaScript 代码文件
function hello(name) {
    console.log(`你好, ${name}!`);
}

class FileDownloader {
    constructor(url) {
        this.url = url;
    }

    async download() {
        const response = await fetch(this.url);
        const blob = await response.blob();
        return blob;
    }
}

module.exports = { hello, FileDownloader };
