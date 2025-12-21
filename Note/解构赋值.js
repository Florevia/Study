// const arr = [10, 20, 30, 40, 50]

// TODO: 用解构把：
// a = 10, c = 30, last = [40, 50]
//  const [a, , c, ...last] = arr
//  console.log(a, c, last)

//  const arr = [1];

// TODO: 用数组解构赋值：
// x 取第一个元素
// y 没有对应位置，用默认值 100
// z 也没有对应位置，用默认值 200

// const [x, y = 100, z = 200] =arr;
// console.log(x, y, z)

// const arr = [1, [2, 3, [4, 5]]]

// TODO: 用一行解构语句拿到：
// a = 1
// b = 2
// c = 3
// d = 4
// e = 5

// const [a, [b, c, [d, e]]] = arr
// console.log(a, b, c, d, e)


// const user = {
//   id: 1,
//   name: 'Alice',
//   age: 20
// }

// // TODO: 用对象解构：
// // 把 name 解构成变量 username
// // age 解构成变量 userAge

// // 重命名变量
// const {name: username, age: userAge} = user;
// console.log(username, userAge)


// const data = {
//   user: {
//     name: 'Bob',
//     address: {
//       city: 'Shanghai',
//       zip: '200000'
//     }
//   }
// }

// // TODO: 用解构拿到：
// // name  -> 变量 name
// // city  -> 变量 city
// // zip   -> 变量 zipcode   （注意：变量名要叫 zipcode）
// const {user: {name, address: {city, zip: zipcode}}} = data;
// console.log(name, city, zipcode)

// const res = {
//   code: 0,
//   data: {
//     list: [
//       { id: 1, title: 'A' },
//       { id: 2, title: 'B' },
//       { id: 3, title: 'C' }
//     ]
//   }
// }

// // TODO: 用解构拿到：
// // 第一个元素的 title -> 变量 firstTitle
// // 第三个元素的 id    -> 变量 thirdId
// const {data: {list: [{id, title: firstTitle}, ,{id: thirdId, title}]}} = res
// console.log(firstTitle, thirdId)

// TODO: 补完这个函数的参数解构
function printUser( {id, name, address: {city}} ) {
  console.log(id, name, city)
}

const user = {
  id: 1,
  name: 'Alice',
  address: {
    city: 'Beijing'
  }
}

printUser(user)
// 要求：打印出
// 1 'Alice' 'Beijing'
