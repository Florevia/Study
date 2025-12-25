import { test, expect } from "vitest";

test("测试1+1是2", () => {
  expect(1 + 1).toBe(2);
});

// function flatten(arr: any[]): any[] {
//   const newArr: any[] = [];
//   arr.forEach((item) => {
//     if (Array.isArray(item)) {
//       newArr.push(...flatten(item));
//     } else {
//       newArr.push(item);
//     }
//   });
//   return newArr;
// }
function flatten(arr: any[]): any[] {
  const newArr: any[] = [];
  const stack: any[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    stack.push(arr[i]);
  }
  while (stack.length > 0) {
    const n = stack.pop();
    if (Array.isArray(n)) {
      const m = n.reverse();
      stack.push(...m);
    } else {
      newArr.push(n);
    }
  }
  return newArr;
}

test("拍平数组", () => {
  expect(
    flatten([
      [1, 2],
      [2, 3, [4, 5]],
    ])
  ).toEqual([1, 2, 2, 3, 4, 5]);
});

test("排序方式2724", () => {
  expect(sortBy([5, 4, 1, 2, 3], (a, b) => a - b)).toEqual([1, 2, 2, 3, 4, 5]);
});
