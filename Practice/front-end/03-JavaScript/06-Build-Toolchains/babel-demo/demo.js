"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      "value" in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function _defineProperty(e, r, t) {
  return (
    (r = _toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
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
let Person = /*#__PURE__*/ (function () {
  function Person(user, age) {
    _classCallCheck(this, Person);
    _defineProperty(this, "username", void 0);
    _defineProperty(this, "age", void 0);
    this.username = user;
    this.age = age;
  }
  return _createClass(Person, [
    {
      key: "sing",
      value: function sing() {
        console.log(this.username);
      },
    },
  ]);
})();
const person = new Person("lilin", 18);
person.sing();
console.log(person.username);
