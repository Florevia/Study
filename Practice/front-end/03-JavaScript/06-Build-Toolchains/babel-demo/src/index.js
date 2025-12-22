const a = (a, b, c, d) => {
  console.log(a + b);
  console.log(c * d);
};

a(3, 5);

const obj = {
  o: [3, 4],
  p: [8, 9],
};

const { o, p } = obj;
a(...o, ...p);

class Person {
  username;
  age;

  constructor(user, age) {
    this.username = user;
    this.age = age;
  }

  sing() {
    console.log(this.username);
  }
}

const person = new Person("lilin", 18);

person.sing();
console.log(person.username);
