# useIntersectionObserver 钩子函数

函数签名
```js
useIntersectionObserver(
  target,      // 参数1：要观察的元素
  callback,    // 参数2：回调函数
  options?     // 参数3：可选配置
)
```
```js
const { stop } = useIntersectionObserver(
  box3.value,
  (entries) => {
    // entries 是数组
    const entry = entries[0]  // 获取第一个元素
    
    console.log('完整的 entry 对象：', entry)
    console.log('是否可见：', entry.isIntersecting)
    console.log('可见比例：', entry.intersectionRatio)
    console.log('目标元素：', entry.target)
    
    if (entry.isIntersecting) {
      console.log('进入视野了')
      stop()  // 停止观察
    }
  }
)
```