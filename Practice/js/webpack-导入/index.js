// 命名导入
import { add } from "./add.js";
// 默认导入
import sub from "./sub.js"; //aaa
import v from "./v.vue";
import "./c.css";

const calculate = {
  add: add,
  sub: sub,
};

console.log(c);

calculate.add(3, 4);

console.log(v);

console.log(calculate);
