// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

var permute = function (nums) {
  const res = [];

  const backtrack = (path) => {
    // 递归结束条件：3 个盒子都填满
    if (path.length === nums.length) {
      res.push([...path]); // 保存下来（浅拷贝）
      return; // 这里的任务完成了，退回去
    }

    // 遍历选择出路
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];

      // 如果这条路走过，就不能再走了，跳过
      if (path.includes(num)) {
        continue;
      }

      // 1. 选择走哪条路
      path.push(num);

      // 2. 递归（下一个路口做选择）
      backtrack(path);

      // 3. 【回溯 / 撤销】（反悔，上个选择重新选）
      path.pop();
    }
  };

  backtrack([]);
  return res;
};

// 测试代码
console.log(permute([1, 2, 3]));
