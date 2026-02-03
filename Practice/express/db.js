const mysql = require("mysql2/promise");

// 创建连接池 连接池的配置
const pool = mysql.createPool({
  host: "39.101.76.177", // 数据库地址
  user: "root", // 数据库用户名
  port: 3306, // 数据库端口
  password: "12345678", // 数据库密码
  database: "express_crud_demo", // 数据库名称
  waitForConnections: true, // 等待连接
  connectionLimit: 10, // 连接数
  maxIdle: 10, // 最大空闲连接数
  idleTimeout: 60000, // 空闲连接超时时间
  queueLimit: 0, // 连接队列限制
  enableKeepAlive: true, // 启用keep-alive
  keepAliveInitialDelay: 0, // keep-alive初始延迟
});

async function initializeDatabase() {
  try {
    // 创建一个临时连接，不指定数据库
    const tempConnection = await mysql.createConnection({
      host: "39.101.76.177",
      user: "root",
      port: 3306,
      password: "12345678",
    });
    // 如果不存在则创建数据库
    await tempConnection.query(
      `CREATE DATABASE IF NOT EXISTS express_crud_demo`
    );
    // 关闭临时连接
    await tempConnection.end();

    console.log("Database 'express_crud_demo' ensured.");
  } catch (err) {
    console.error("Error ensuring database exists:", err);
  }
}

module.exports = {
  pool,
  initializeDatabase,
};
