Array.prototype.mergeSort = function () {
  const rec = (arr) => {
    // 递归终止条件
    if (arr.length <= 1) return arr;
    // 1. 分：从中间分成两半
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length); // 左闭又开
    // 2. 治：递归排序左右两半
    const orderLeft = rec(left);
    const orderRight = rec(right);
    // 3. 合：合并两个有序数组
    return merge(orderLeft, orderRight);
  };
  // 合并两个有序数组
  function merge(left, right) {
    const res = []; // ✅ 每次合并创建新数组
    while (left.length || right.length) {
      if (left.length && right.length) {
        if (left[0] < right[0]) {
          res.push(left.shift());
        } else {
          res.push(right.shift());
        }
      } else if (left.length) {
        res.push(left.shift());
      } else if (right.length) {
        res.push(right.shift());
      }
    }
    return res;
  }
  rec(this).forEach((item, index) => (this[index] = item));
};
// 测试
const arr = [5, 4, 7, 2, 9];
arr.mergeSort();
console.log(arr);
