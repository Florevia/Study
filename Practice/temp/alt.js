const a = { var: 1}
const b = { var: 2}
const c = { var: 3}
const d = { var: 4}


a.next = b
b.next = c
c.next = d



//添加

const e = { var: 5 }
c.next = e
e.next = d

//删除

b.next = e


let p = a 
while (p) {
  console.log(p.var)
  p = p.next
}