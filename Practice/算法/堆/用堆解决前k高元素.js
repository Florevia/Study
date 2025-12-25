class MyMinHeap {
  constructor() {
    this.heap = [];
  }
  // 获取父节点
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  // 获取左子节点
  getLeftIndex(index) {
    return index * 2 + 1;
  }
  // 获取右子节点
  getRightIndex(index) {
    return index * 2 + 2;
  }
  // 交换
  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }
  // 上浮
  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex][1] > this.heap[index][1]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  // 下沉
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    let small = index;
    if (
      leftIndex < this.heap.length &&
      this.heap[leftIndex][1] < this.heap[small][1]
    ) {
      small = leftIndex;
    }
    if (
      rightIndex < this.heap.length &&
      this.heap[rightIndex][1] < this.heap[small][1]
    ) {
      small = rightIndex;
    }
    if (small !== index) {
      this.swap(small, index);
      this.shiftDown(small);
    }
  }
  // 插入
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  // 删除堆顶
  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
    return top;
  }
  // 获取堆顶
  peek() {
    return this.heap[0];
  }
  // 获取堆的大小
  size() {
    return this.heap.length;
  }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  const arr = Array.from(map).sort((a, b) => b[1] - a[1]);
  const heap = new MyMinHeap();
  arr.forEach(([n, val]) => {
    heap.insert([n, val]);
    if (heap.size() > k) {
      heap.pop();
    }
  });
  console.log(heap);
  console.log(heap.heap);
  const list = Array.from(heap.heap).map((n) => n[0]);
  return list;
};
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
