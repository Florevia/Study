// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];

  // startIndex: 告诉下一层，你只能从 nums 的第几位开始选
  // 比如 startIndex = 1，代表只能选 nums[1] 及其后面的数
  const backtrack = (path, startIndex) => {
    // 【1. 收集结果】
    // 不需要判断长度，进入递归的每一个节点都是一个合法的子集
    res.push([...path]);

    // 【2. 遍历选择】
    // 注意：这里 i 从 startIndex 开始，而不是从 0 开始！
    // 这就是“不回头”的关键
    for (let i = startIndex; i < nums.length; i++) {
      // 做选择
      path.push(nums[i]);

      // 递归
      // 关键点：传给下一层的是 i + 1
      // 表示下一层只能从当前这个数的“后面”开始选
      backtrack(path, i + 1);

      // 撤销选择 (回溯)
      path.pop();
    }
  };

  backtrack([], 0);
  return res;
};
