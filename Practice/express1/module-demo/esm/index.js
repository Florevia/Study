import { count, increment } from "./lib.js";

console.log("ESM Start: count is", count);
increment(); // 尝试修改内部值
console.log("ESM End:   count is", count); // 外部的值变了，因为是引用
