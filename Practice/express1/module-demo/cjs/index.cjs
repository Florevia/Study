const { count, increment } = require("./lib.cjs");

console.log("CJS Start: count is", count);
increment(); // 尝试修改内部值
console.log("CJS End:   count is", count); // 外部的值没变，因为是拷贝
