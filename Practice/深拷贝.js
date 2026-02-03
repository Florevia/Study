function myCLoneDeep(target, map = new WeakMap()) {
  // 1. 基本类型直接返回
  if (target === null || typeof target !== "object") return target;

  // 2. 处理 Date 和 RegExp
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);

  // 3. 处理循环引用
  if (map.has(target)) return map.get(target); //返回之前的副本

  // 4. 初始化副本
  // 技巧：用 constructor 保证类型一致
  const clone = new target.constructor();

  // 5. 处理 Array 和 Object
  for (const key in target) {
    // 保证是自有属性
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      clone[key] = myCLoneDeep(target[key], map);
    }
  }

  return clone;
}

// 测试
const obj = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
  },
};
const cloneObj = myCLoneDeep(obj);
console.log(cloneObj);
cloneObj.b.c = 100;
console.log(obj.b.c);
