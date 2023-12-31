!(function a(o, s, u) {
  function c(t, e) {
    if (!s[t]) {
      if (!o[t]) {
        var r = "function" == typeof require && require;
        if (!e && r) return r(t, !0);
        if (l) return l(t, !0);
        var n = new Error("Cannot find module '" + t + "'");
        throw ((n.code = "MODULE_NOT_FOUND"), n);
      }
      var i = (s[t] = { exports: {} });
      o[t][0].call(
        i.exports,
        function (e) {
          return c(o[t][1][e] || e);
        },
        i,
        i.exports,
        a,
        o,
        s,
        u
      );
    }
    return s[t].exports;
  }
  for (
    var l = "function" == typeof require && require, e = 0;
    e < u.length;
    e++
  )
    c(u[e]);
  return c;
})(
  {
    1: [
      function (e, t, r) {
        "use strict";
        var n = window.mc4wp || {},
          i = e("./forms/forms.js");
        function a(e, t) {
          i.trigger(t[0].id + "." + e, t), i.trigger(e, t);
        }
        function o(e, n) {
          document.addEventListener(
            e,
            function (e) {
              if (e.target) {
                var t = e.target,
                  r = !1;
                "string" == typeof t.className &&
                  (r = -1 < t.className.indexOf("mc4wp-form")),
                  r ||
                    "function" != typeof t.matches ||
                    (r = t.matches(".mc4wp-form *")),
                  r && n.call(e, e);
              }
            },
            !0
          );
        }
        if (
          (e("./forms/conditional-elements.js"),
          o("submit", function (e) {
            var t = i.getByElement(e.target);
            e.defaultPrevented || i.trigger(t.id + ".submit", [t, e]),
              e.defaultPrevented || i.trigger("submit", [t, e]);
          }),
          o("focus", function (e) {
            var t = i.getByElement(e.target);
            t.started || (a("started", [t, e]), (t.started = !0));
          }),
          o("change", function (e) {
            a("change", [i.getByElement(e.target), e]);
          }),
          n.listeners)
        ) {
          for (var s = n.listeners, u = 0; u < s.length; u++)
            i.on(s[u].event, s[u].callback);
          delete n.listeners;
        }
        (n.forms = i), (window.mc4wp = n);
      },
      { "./forms/conditional-elements.js": 2, "./forms/forms.js": 4 },
    ],
    2: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          for (
            var t = !!e.getAttribute("data-show-if"),
              r = t
                ? e.getAttribute("data-show-if").split(":")
                : e.getAttribute("data-hide-if").split(":"),
              n = r[0],
              i = (1 < r.length ? r[1] : "*").split("|"),
              a = (function (e, t) {
                for (
                  var r = [],
                    n = e.querySelectorAll(
                      'input[name="' +
                        t +
                        '"],select[name="' +
                        t +
                        '"],textarea[name="' +
                        t +
                        '"]'
                    ),
                    i = 0;
                  i < n.length;
                  i++
                ) {
                  var a = n[i];
                  (("radio" !== a.type && "checkbox" !== a.type) ||
                    a.checked) &&
                    r.push(a.value);
                }
                return r;
              })(
                (function (e) {
                  for (var t = e; t.parentElement; )
                    if ("FORM" === (t = t.parentElement).tagName) return t;
                  return null;
                })(e),
                n
              ),
              o = !1,
              s = 0;
            s < a.length;
            s++
          ) {
            var u = a[s];
            if (
              (o = -1 < i.indexOf(u) || (-1 < i.indexOf("*") && 0 < u.length))
            )
              break;
          }
          e.style.display = t ? (o ? "" : "none") : o ? "none" : "";
          var c = e.querySelectorAll("input,select,textarea");
          [].forEach.call(c, function (e) {
            (o || t) &&
              e.getAttribute("data-was-required") &&
              ((e.required = !0), e.removeAttribute("data-was-required")),
              (o && t) ||
                !e.required ||
                (e.setAttribute("data-was-required", "true"),
                (e.required = !1));
          });
        }
        function i() {
          var e = document.querySelectorAll(
            ".mc4wp-form [data-show-if],.mc4wp-form [data-hide-if]"
          );
          [].forEach.call(e, n);
        }
        function a(e) {
          if (
            e.target &&
            e.target.form &&
            !(e.target.form.className.indexOf("mc4wp-form") < 0)
          ) {
            var t = e.target.form.querySelectorAll(
              "[data-show-if],[data-hide-if]"
            );
            [].forEach.call(t, n);
          }
        }
        document.addEventListener("keyup", a, !0),
          document.addEventListener("change", a, !0),
          document.addEventListener("mc4wp-refresh", i, !0),
          window.addEventListener("load", i),
          i();
      },
      {},
    ],
    3: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          (this.id = e),
            (this.element = t || document.createElement("form")),
            (this.name =
              this.element.getAttribute("data-name") || "Form #" + this.id),
            (this.errors = []),
            (this.started = !1);
        }
        var i = e("form-serialize"),
          a = e("populate.js");
        (n.prototype.setData = function (e) {
          try {
            a(this.element, e);
          } catch (e) {
            console.error(e);
          }
        }),
          (n.prototype.getData = function () {
            return i(this.element, { hash: !0, empty: !0 });
          }),
          (n.prototype.getSerializedData = function () {
            return i(this.element, { hash: !1, empty: !0 });
          }),
          (n.prototype.setResponse = function (e) {
            this.element.querySelector(".mc4wp-response").innerHTML = e;
          }),
          (n.prototype.reset = function () {
            this.setResponse(""),
              (this.element.querySelector(".mc4wp-form-fields").style.display =
                ""),
              this.element.reset();
          }),
          (t.exports = n);
      },
      { "form-serialize": 5, "populate.js": 6 },
    ],
    4: [
      function (e, t, r) {
        "use strict";
        var n = e("./form.js"),
          i = [],
          a = {};
        function o(e, t) {
          (a[e] = a[e] || []),
            a[e].forEach(function (e) {
              return e.apply(null, t);
            });
        }
        function s(e, t) {
          t = t || parseInt(e.getAttribute("data-id")) || 0;
          var r = new n(t, e);
          return i.push(r), r;
        }
        t.exports = {
          get: function (e) {
            e = parseInt(e);
            for (var t = 0; t < i.length; t++) if (i[t].id === e) return i[t];
            return s(document.querySelector(".mc4wp-form-" + e), e);
          },
          getByElement: function (e) {
            for (var t = e.form || e, r = 0; r < i.length; r++)
              if (i[r].element === t) return i[r];
            return s(t);
          },
          on: function (e, t) {
            (a[e] = a[e] || []), a[e].push(t);
          },
          off: function (e, t) {
            (a[e] = a[e] || []),
              (a[e] = a[e].filter(function (e) {
                return e !== t;
              }));
          },
          trigger: function (e, t) {
            "submit" === e || 0 < e.indexOf(".submit")
              ? o(e, t)
              : window.setTimeout(function () {
                  o(e, t);
                }, 1);
          },
        };
      },
      { "./form.js": 3 },
    ],
    5: [
      function (e, t, r) {
        var v = /^(?:submit|button|image|reset|file)$/i,
          g = /^(?:input|select|textarea|keygen)/i,
          i = /(\[[^\[\]]*\])/g;
        function y(e, t, r) {
          if (t.match(i)) {
            !(function e(t, r, n) {
              if (0 === r.length) return (t = n);
              var i = r.shift(),
                a = i.match(/^\[(.+?)\]$/);
              if ("[]" === i)
                return (
                  (t = t || []),
                  Array.isArray(t)
                    ? t.push(e(null, r, n))
                    : ((t._values = t._values || []),
                      t._values.push(e(null, r, n))),
                  t
                );
              if (a) {
                var o = a[1],
                  s = +o;
                isNaN(s)
                  ? ((t = t || {})[o] = e(t[o], r, n))
                  : ((t = t || [])[s] = e(t[s], r, n));
              } else t[i] = e(t[i], r, n);
              return t;
            })(
              e,
              (function (e) {
                var t = [],
                  r = new RegExp(i),
                  n = /^([^\[\]]*)/.exec(e);
                for (n[1] && t.push(n[1]); null !== (n = r.exec(e)); )
                  t.push(n[1]);
                return t;
              })(t),
              r
            );
          } else {
            var n = e[t];
            n ? (Array.isArray(n) || (e[t] = [n]), e[t].push(r)) : (e[t] = r);
          }
          return e;
        }
        function w(e, t, r) {
          return (
            (r = r.replace(/(\r)?\n/g, "\r\n")),
            (r = (r = encodeURIComponent(r)).replace(/%20/g, "+")),
            e + (e ? "&" : "") + encodeURIComponent(t) + "=" + r
          );
        }
        t.exports = function (e, t) {
          "object" != typeof t
            ? (t = { hash: !!t })
            : void 0 === t.hash && (t.hash = !0);
          for (
            var r = t.hash ? {} : "",
              n = t.serializer || (t.hash ? y : w),
              i = e && e.elements ? e.elements : [],
              a = Object.create(null),
              o = 0;
            o < i.length;
            ++o
          ) {
            var s = i[o];
            if (
              (t.disabled || !s.disabled) &&
              s.name &&
              g.test(s.nodeName) &&
              !v.test(s.type)
            ) {
              var u = s.name,
                c = s.value;
              if (
                (("checkbox" !== s.type && "radio" !== s.type) ||
                  s.checked ||
                  (c = void 0),
                t.empty)
              ) {
                if (
                  ("checkbox" !== s.type || s.checked || (c = ""),
                  "radio" === s.type &&
                    (a[s.name] || s.checked
                      ? s.checked && (a[s.name] = !0)
                      : (a[s.name] = !1)),
                  null == c && "radio" == s.type)
                )
                  continue;
              } else if (!c) continue;
              if ("select-multiple" !== s.type) r = n(r, u, c);
              else {
                c = [];
                for (var l = s.options, f = !1, m = 0; m < l.length; ++m) {
                  var d = l[m],
                    p = t.empty && !d.value,
                    h = d.value || p;
                  d.selected &&
                    h &&
                    ((f = !0),
                    (r =
                      t.hash && "[]" !== u.slice(u.length - 2)
                        ? n(r, u + "[]", d.value)
                        : n(r, u, d.value)));
                }
                !f && t.empty && (r = n(r, u, ""));
              }
            }
          }
          if (t.empty) for (var u in a) a[u] || (r = n(r, u, ""));
          return r;
        };
      },
      {},
    ],
    6: [
      function (e, t, r) {
        void 0 !== t &&
          t.exports &&
          (t.exports = function e(t, r, n) {
            for (var i in r)
              if (r.hasOwnProperty(i)) {
                var a = i,
                  o = r[i];
                if (
                  (void 0 === o && (o = ""),
                  null === o && (o = ""),
                  void 0 !== n && (a = n + "[" + i + "]"),
                  o.constructor === Array)
                )
                  a += "[]";
                else if ("object" == typeof o) {
                  e(t, o, a);
                  continue;
                }
                var s = t.elements.namedItem(a);
                if (s)
                  switch (s.type || s[0].type) {
                    default:
                      s.value = o;
                      break;
                    case "radio":
                    case "checkbox":
                      for (
                        var u = o.constructor === Array ? o : [o], c = 0;
                        c < s.length;
                        c++
                      )
                        s[c].checked = -1 < u.indexOf(s[c].value);
                      break;
                    case "select-multiple":
                      u = o.constructor === Array ? o : [o];
                      for (var l = 0; l < s.options.length; l++)
                        s.options[l].selected =
                          -1 < u.indexOf(s.options[l].value);
                      break;
                    case "select":
                    case "select-one":
                      s.value = o.toString() || o;
                      break;
                    case "date":
                      s.value = new Date(o).toISOString().split("T")[0];
                  }
              }
          });
      },
      {},
    ],
  },
  {},
  [1]
);
//# sourceMappingURL=forms.min.js.map
