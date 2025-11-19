### 输出题1

```js
const p = Promise.resolve("start");

const p1 = p.then(res => {
  console.log("step1:", res);
  throw new Error("step1 error");
});

const p2 = p1.then(res => {
  console.log("step2:", res);
  return "step2 done";
});

const p3 = p2.catch(err => {
  console.log("catch p2:", err.message);
  return "from catch";
});

setTimeout(() => {
  console.log("log p1:", p1);
  console.log("log p2:", p2);
  console.log("log p3:", p3);
}, 0);
```

	1.	控制台的输出顺序和内容是什么？
	2.	最终：
		p1 的状态和值/原因？
		p2 的状态和值/原因？
		p3 的状态和值？
    
    重点考你：throw 之后，下一个 then / catch 状态是怎么被“传染”的？

### 输出题2

```js
//下面代码的输出结果是什么
 const pro1 = new Promise((resolve, reject) => {
   setTimeout(() => {
     resolve(1)
   }, 1000)
 })

 const pro2 = pro1.catch((data) => {
   console.log(data)
   return data + 1
 })

 const pro3 = pro2.then((data) => {
   console.log(data)
 })

 console.log(pro1, pro2, pro3)

 setTimeout(() => {
   console.log(pro1, pro2, pro3)
 }, 2000)
```

### 输出题3

```js
//下面代码的输出结果是什么
 new Promise((resolve, reject) => {
 throw new Error(1)
 })
 .then((res) => {
   console.log(res)
   return new Error('2')
 })
 .catch((err) => {
   throw err
   return 3 //注意这里！
 })
 .then((res) => {
   console.log(res)
 })
```

### 输出题4

```js
//下面代码的输出结果是什么
 const promise1 = new Promise((resolve, reject) => {
   setTimeout(() => {
     reject()
   }, 1000)
 

 const promise2 = promise1.catch(() => {
   return 2
 

 console.log('promise1', promise1)
 console.log('promise2', promise

 setTimeout(() => {
   console.log('promise1', promise1)
   console.log('promise2', promise2)
 }, 2000);
```

### 输出题5

```js
 async function m() {
  console.log(8);
  const n = await 1;
  console.log(n);
 }

(async () => {
  await m();
  console.log(2);
})()
console.log(3);
```
  
### 输出题6

```js
async function m1() {
      return 1
}
async function m2() {
  const n = await m1()
  console.log(n)
  return 2
}
async function m3() {
  const n = m2()
  console.log(n)
  return 3
}
m3().then((n) => {
  console.log(n)
})
m3()
console.log(4)
```

### 判断对错7

下面每一句请判断 对 / 错，并简单写一下理由（自己对自己解释即可）：

1. then 返回的一定是一个新的 Promise。
2. 如果 then 的回调里 return undefined，那这个 then 返回的Promise 状态是 rejected。
3. 如果 then 的回调里 return 一个 Promise，那这个 then 返的 Promise 会“跟随”这个 Promise 的状态。
4. 如果 then 的回调里抛异常（throw），那么 then 返回的Promise 会变成 rejected。
5. 如果 then 的回调里什么都不写（连 return 都没有），那返回的Promise 的值是 undefined。

### 输出题8

```js
Promise.resolve(1)
  .then(2)     
  //如果 onFulfilled 或 onRejected 不是函数，就会被忽略，相当于没传，这时值会原样透传
  .then(Promise.resolve(3))
  .then(console.log);
```

### 考点：
- async 函数本质上返回 Promise
- await 会把后面的代码丢到微任务队列里
- 不 await 的时候，async 函数里就是普通同步代码
- .then 也是微任务

### 输出题9

```js
async function fn() {
  console.log(1);
  return 2;
}

fn().then(res => {
  console.log(res);
});

console.log(3);
```
### 输出题10

```js
var a;

var b = new Promise((resolve, reject) => {
  console.log('promise1');
  setTimeout(() => {
    resolve();
  }, 1000);
})
  .then(() => {
    console.log('promise2');
  })
  .then(() => {
    console.log('promise3');
  })
  .then(() => {
    console.log('promise4');
  });

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log('after1');
  await a;
  resolve(true);
  console.log('after2');
});

console.log('end');
```

### 输出题11

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  const p = new Promise(resolve => resolve(3));
  p.then(result => console.log(result));
}, 0);

const p = new Promise(resolve => {
  setTimeout(() => {
    console.log(4);
  }, 0);
  resolve(5);
});

p.then(result => console.log(result));

const p2 = new Promise(resolve => resolve(6));
p2.then(result => console.log(result));

console.log(7);
```