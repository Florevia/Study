# vue3响应式原理：

- 通过Proxy拦截对象中任意属性的变化，增删改查
- 通过Relect对原对象的属性进行操作

```js

//声明对哪个对象进行代理
const per = new Proxy(person, {
  //get()用于拦截对象属性的读取,参数是target:原对象,prop:属性
  get(target, prop) {
    console.log("我读取了target身上的prop属性"); //响应式
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log("我设置了target身上的prop属性");
    return Reflect.set(target, prop, value);
  },
  deleteProperty(target, prop) {
    console.log("我删除了target身上的prop属性");
    return Reflect.deleteProperty(target, prop);
  }
});
```