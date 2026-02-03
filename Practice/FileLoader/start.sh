#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║     FILE_UPLOAD.SYS - 安装向导            ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# 检查Node.js是否已安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未检测到Node.js"
    echo "请先安装Node.js (https://nodejs.org/)"
    exit 1
fi

echo "✓ Node.js版本: $(node -v)"
echo "✓ npm版本: $(npm -v)"
echo ""

# 检查依赖是否已安装
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
    echo ""
fi

echo "✓ 依赖安装完成"
echo ""
echo "╔════════════════════════════════════════════╗"
echo "║     启动服务器                            ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# 启动服务器
npm start
