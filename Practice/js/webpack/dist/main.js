(() => {
  "use strict";
  var n = {
      63: (n, t, o) => {
        o.d(t, { A: () => u });
        var r = o(601),
          c = o.n(r),
          e = o(314),
          a = o.n(e)()(c());
        a.push([
          n.id,
          ".c {\n  height: 300px;\n  background-color: pink;\n}",
          "",
        ]);
        const u = a;
      },
      262: (n, t) => {
        t.A = (n, t) => {
          const o = n.__vccOpts || n;
          for (const [n, r] of t) o[n] = r;
          return o;
        };
      },
      314: (n) => {
        n.exports = function (n) {
          var t = [];
          return (
            (t.toString = function () {
              return this.map(function (t) {
                var o = "",
                  r = void 0 !== t[5];
                return (
                  t[4] && (o += "@supports (".concat(t[4], ") {")),
                  t[2] && (o += "@media ".concat(t[2], " {")),
                  r &&
                    (o += "@layer".concat(
                      t[5].length > 0 ? " ".concat(t[5]) : "",
                      " {"
                    )),
                  (o += n(t)),
                  r && (o += "}"),
                  t[2] && (o += "}"),
                  t[4] && (o += "}"),
                  o
                );
              }).join("");
            }),
            (t.i = function (n, o, r, c, e) {
              "string" == typeof n && (n = [[null, n, void 0]]);
              var a = {};
              if (r)
                for (var u = 0; u < this.length; u++) {
                  var i = this[u][0];
                  null != i && (a[i] = !0);
                }
              for (var s = 0; s < n.length; s++) {
                var l = [].concat(n[s]);
                (r && a[l[0]]) ||
                  (void 0 !== e &&
                    (void 0 === l[5] ||
                      (l[1] = "@layer"
                        .concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {")
                        .concat(l[1], "}")),
                    (l[5] = e)),
                  o &&
                    (l[2]
                      ? ((l[1] = "@media "
                          .concat(l[2], " {")
                          .concat(l[1], "}")),
                        (l[2] = o))
                      : (l[2] = o)),
                  c &&
                    (l[4]
                      ? ((l[1] = "@supports ("
                          .concat(l[4], ") {")
                          .concat(l[1], "}")),
                        (l[4] = c))
                      : (l[4] = "".concat(c))),
                  t.push(l));
              }
            }),
            t
          );
        };
      },
      601: (n) => {
        n.exports = function (n) {
          return n[1];
        };
      },
    },
    t = {};
  function o(r) {
    var c = t[r];
    if (void 0 !== c) return c.exports;
    var e = (t[r] = { id: r, exports: {} });
    return n[r](e, e.exports, o), e.exports;
  }
  (o.n = (n) => {
    var t = n && n.__esModule ? () => n.default : () => n;
    return o.d(t, { a: t }), t;
  }),
    (o.d = (n, t) => {
      for (var r in t)
        o.o(t, r) &&
          !o.o(n, r) &&
          Object.defineProperty(n, r, { enumerable: !0, get: t[r] });
    }),
    (o.o = (n, t) => Object.prototype.hasOwnProperty.call(n, t));
  const r = {},
    c = (0, o(262).A)(r, [
      [
        "render",
        function (n, t, o, r, c, e) {
          return null;
        },
      ],
    ]);
  var e = o(63);
  const a = {
    add: function (n, t) {
      return n + t;
    },
    sub: function (n, t) {
      return n - t;
    },
  };
  console.log(e.A), a.add(3, 4), console.log(c), console.log(a);
})();
