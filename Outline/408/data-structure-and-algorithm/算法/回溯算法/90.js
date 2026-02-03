// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的 子集（幂集）。
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

var subsetsWithDup = function (nums) {
  const res = [];
  // 1. 必须排序，这是去重的前提
  nums.sort((a, b) => a - b);

  const backrec = (path, startIndex) => {
    res.push([...path]);

    for (let i = startIndex; i < nums.length; i++) {
      // 2. 剪枝去重的核心逻辑
      // i > startIndex 保证了我们同层不选重复的，但可以选下一层重复的
      if (i > startIndex && nums[i] === nums[i - 1]) {
        continue;
      }

      path.push(nums[i]);
      backrec(path, i + 1);
      path.pop();
    }
  };
  backrec([], 0);
  return res;
};
