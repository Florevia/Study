# Linux Curl 命令详解笔记

`curl` (Client URL) 是一个功能强大的命令行工具，用于通过网络传输数据。它支持众多的协议（HTTP, HTTPS, FTP, FTPS 等），是开发人员测试 API、调试网络请求和下载文件的首选工具。

## 1. 核心参数拆解 (基于脚本实例)

在脚本中常见的 `curl` 调用方式如下：

```bash
curl \
-X POST \
-H "Content-Type: application/json" \
"https://api.example.com/v1/resource" \
-d '@request.json'
```

### 关键参数解析

- `-X <METHOD>` (或 `--request`)

  - 作用: 指定与服务器通信时使用的 HTTP 请求方法

- `-H <HEADER>` (或 `--header`)

  - 作用: 添加自定义的 HTTP 请求头。可以多次使用该参数添加多个头。
  - 示例:
    - `-H "Content-Type: application/json"` (指定发送数据格式)
    - `-H "Authorization: Bearer <token>"` (身份认证)

- `-d <DATA>` (或 `--data`)

  - 作用: 发送 HTTP POST 请求体数据。
  - 特殊用法 `@`:
    - `-d '@filename'`: 当参数以 `@` 开头时，`curl` 会读取**文件内容**作为数据发送。
    - `-d '{"key": "value"}'`: 直接发送字符串数据。

## 2. 高频常用参数速查表

| 参数            | 简写 | 作用                                                       | 典型场景                          |
| :-------------- | :--- | :--------------------------------------------------------- | :-------------------------------- |
| `--verbose`     | `-v` | **详细模式**。显示请求/响应的完整过程（握手、Header 等）。 | 调试网络连接、排查 API 错误       |
| `--output`      | `-o` | **保存为文件**。将响应输出到指定文件名。                   | `curl -o result.json https://...` |
| `--remote-name` | `-O` | **按原名保存**。使用 URL 中的文件名进行保存。              | `curl -O https://.../image.png`   |
| `--location`    | `-L` | **跟随重定向**。自动跳转到 301/302 指向的新 URL。          | 访问短链接或发生重定向的页面      |
| `--include`     | `-i` | **包含响应头**。在输出中同时显示 Header 和 Body。          | 查看服务器返回的状态码和头信息    |
| `--insecure`    | `-k` | **忽略证书验证**。允许连接不安全的 SSL（如自签名证书）。   | 本地开发环境测试 HTTPS            |
| `--user`        | `-u` | **Basic 认证**。格式为 `user:password`。                   | 访问需要基础认证的 API            |

## 4. 实用技巧：格式化 JSON 输出

`curl` 默认返回的 JSON 数据是未格式化的单行文本，难以阅读。通常配合 `jq` 工具使用：

```bash
# 需要先安装 jq (例如: brew install jq)
curl https://api.example.com/data | jq
```
