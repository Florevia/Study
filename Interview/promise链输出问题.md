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