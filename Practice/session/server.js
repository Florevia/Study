const express = require('express');
const session = require('express-session');

const app = express();

// 配置session中间件
app.use(session({
  secret: 'my-secret-key',        // 用于加密session的密钥
  resave: false,                  // 不强制保存未修改的session
  saveUninitialized: false,       // 不保存未初始化的session
  cookie: {
    maxAge: 1000 * 60 * 30        // session有效期30分钟
  }
}));

// 解析JSON请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由1: 登录 - 创建session
app.post('/login', (req, res) => {
  const { username } = req.body;

  // 将用户信息存储在session中
  req.session.user = {
    username: username,
    loginTime: new Date()
  };

  res.json({
    success: true,
    message: '登录成功',
    sessionID: req.sessionID
  });
});

// 路由2: 查看当前session
app.get('/profile', (req, res) => {
  // 检查session中是否有用户信息
  if (req.session.user) {
    res.json({
      isLoggedIn: true,
      user: req.session.user,
      sessionID: req.sessionID
    });
  } else {
    res.json({
      isLoggedIn: false,
      message: '未登录'
    });
  }
});

// 路由3: 访问计数器 - 演示session存储数据
app.get('/count', (req, res) => {
  // 如果session中没有count，初始化为0
  if (!req.session.count) {
    req.session.count = 0;
  }

  // 访问次数加1
  req.session.count++;

  res.json({
    message: `你已经访问了${req.session.count}次`,
    count: req.session.count
  });
});

// 路由4: 登出 - 销毁session
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ success: false, message: '登出失败' });
    } else {
      res.json({ success: true, message: '登出成功' });
    }
  });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('\n测试方法:');
  console.log('1. 登录: curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d \'{"username":"张三"}\'');
  console.log('2. 查看信息: curl http://localhost:3000/profile');
  console.log('3. 访问计数: curl http://localhost:3000/count');
  console.log('4. 登出: curl -X POST http://localhost:3000/logout');
});
