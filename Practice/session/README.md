# Session 最简示例

## 什么是Session?

Session是服务器端的状态存储机制，用于在多个请求之间保持用户状态。

**工作原理：**
1. 客户端第一次访问时，服务器创建session，生成唯一的sessionID
2. 服务器将sessionID通过Cookie发送给客户端
3. 客户端后续请求自动携带Cookie（包含sessionID）
4. 服务器根据sessionID找到对应的session数据

## 安装依赖

```bash
npm install
```

## 启动服务器

```bash
npm start
```

## 核心概念演示

### 1. 登录（创建session）
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"张三"}' \
  -c cookies.txt
```
**说明：** `-c cookies.txt` 保存Cookie到文件

### 2. 查看用户信息（使用session）
```bash
curl http://localhost:3000/profile -b cookies.txt
```
**说明：** `-b cookies.txt` 发送之前保存的Cookie

### 3. 访问计数（session存储数据）
```bash
curl http://localhost:3000/count -b cookies.txt
```
多次访问，count会递增

### 4. 登出（销毁session）
```bash
curl -X POST http://localhost:3000/logout -b cookies.txt
```

## 核心代码解释

### 配置session
```javascript
app.use(session({
  secret: 'my-secret-key',     // 密钥，用于加密sessionID
  resave: false,               // session没修改不重新保存
  saveUninitialized: false,    // 未初始化的session不保存
  cookie: { maxAge: 1800000 }  // Cookie有效期（毫秒）
}));
```

### 存储数据到session
```javascript
req.session.user = { username: '张三' };
req.session.count = 1;
```

### 读取session数据
```javascript
const user = req.session.user;
const count = req.session.count;
```

### 销毁session
```javascript
req.session.destroy(callback);
```

## 关键点

1. **Session存储在服务器端**，客户端只保存sessionID
2. **默认存储在内存**，服务器重启会丢失（生产环境使用Redis等持久化存储）
3. **自动管理Cookie**，express-session会自动处理Cookie的读写
4. **每个客户端独立**，不同用户有不同的session
