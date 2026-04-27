(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports$1) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports$1.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports$1.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports$1.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports$1.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports$1.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports$1.unstable_now());
    }, b);
  }
  exports$1.unstable_IdlePriority = 5;
  exports$1.unstable_ImmediatePriority = 1;
  exports$1.unstable_LowPriority = 4;
  exports$1.unstable_NormalPriority = 3;
  exports$1.unstable_Profiling = null;
  exports$1.unstable_UserBlockingPriority = 2;
  exports$1.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports$1.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports$1.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports$1.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports$1.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports$1.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_pauseExecution = function() {
  };
  exports$1.unstable_requestPaint = function() {
  };
  exports$1.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_scheduleCallback = function(a, b, c) {
    var d = exports$1.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports$1.unstable_shouldYield = M2;
  exports$1.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f2[h]) {
              var k2 = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c) return Xb(e), a;
        if (f2 === d) return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c) e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c = Nh(a, b, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e);
}
function jj(a, b, c, d, e, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      wj(b, false, e, c, f2);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e);
      X = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l2) {
      W(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f2(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f2, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f2, g, h, k2) {
  a = new al(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f2, g, h, k2) {
  a = bl(c, d, true, a, e, f2, g, h, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f2), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
const GENERATED_QUESTIONS_BY_SUBJECT = {
  chinese: [
    {
      id: "g-cn-1",
      subject: "语文",
      type: "quantifier",
      prompt: "下列量词搭配正确的是？",
      options: ["一头牛", "一条桌子", "一把月亮", "一座铅笔"],
      answer: "一头牛",
      explanation: "“头”常用来搭配牛、猪等动物。",
      level: "小学基础题"
    },
    {
      id: "g-cn-2",
      subject: "语文",
      type: "synonym",
      prompt: "“立刻”更接近下面哪个词？",
      options: ["马上", "很久", "一起", "后来"],
      answer: "马上",
      explanation: "“立刻”和“马上”意思接近。",
      level: "小学基础题"
    },
    {
      id: "g-cn-3",
      subject: "语文",
      type: "punctuation",
      prompt: "表示一句话说完了，通常用哪个标点？",
      options: ["。", "，", "、", "："],
      answer: "。",
      explanation: "陈述句结束一般用句号。",
      level: "小学送分题"
    },
    {
      id: "g-cn-4",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“两个黄鹂鸣翠柳”的下一句是？",
      options: ["一行白鹭上青天", "更上一层楼", "疑是地上霜", "天涯若比邻"],
      answer: "一行白鹭上青天",
      explanation: "这两句出自杜甫《绝句》。",
      level: "小学送分题"
    },
    {
      id: "g-cn-5",
      subject: "语文",
      type: "word-meaning",
      prompt: "“诚实”更接近下面哪种意思？",
      options: ["不说假话", "动作很快", "非常热闹", "天气很冷"],
      answer: "不说假话",
      explanation: "“诚实”指真实、不说假话。",
      level: "小学基础题"
    },
    {
      id: "g-cn-6",
      subject: "语文",
      type: "sentence-order",
      prompt: "下列句子更通顺的是？",
      options: ["我今天去学校上学。", "学校上学我今天去。", "今天学校我上学去。", "去我今天上学学校。"],
      answer: "我今天去学校上学。",
      explanation: "这句话语序完整自然。",
      level: "小学基础题"
    },
    {
      id: "g-cn-7",
      subject: "语文",
      type: "literature-work",
      prompt: "“守株待兔”这个故事出自哪一类内容？",
      options: ["寓言故事", "数学题", "天气预报", "实验报告"],
      answer: "寓言故事",
      explanation: "“守株待兔”是常见寓言故事。",
      level: "小学常识题"
    },
    {
      id: "g-cn-8",
      subject: "语文",
      type: "rhetoric",
      prompt: "“弯弯的月亮像小船”用了什么修辞？",
      options: ["比喻", "夸张", "排比", "设问"],
      answer: "比喻",
      explanation: "这句话把月亮比作小船。",
      level: "小学基础题"
    },
    {
      id: "g-cn-9",
      subject: "语文",
      type: "antonym",
      prompt: "“勇敢”的反义词更接近哪个词？",
      options: ["胆小", "热闹", "整齐", "明亮"],
      answer: "胆小",
      explanation: "“勇敢”和“胆小”意思相反。",
      level: "小学基础题"
    },
    {
      id: "g-cn-10",
      subject: "语文",
      type: "quantifier",
      prompt: "下列搭配正确的是？",
      options: ["一只小鸟", "一条苹果", "一朵铅笔", "一把大海"],
      answer: "一只小鸟",
      explanation: "“只”常用来搭配鸟、猫等小动物。",
      level: "小学送分题"
    },
    {
      id: "g-cn-11",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“春种一粒粟”的下一句是？",
      options: ["秋收万颗子", "粒粒皆辛苦", "更上一层楼", "低头思故乡"],
      answer: "秋收万颗子",
      explanation: "这两句出自《悯农》。",
      level: "小学送分题"
    },
    {
      id: "g-cn-12",
      subject: "语文",
      type: "punctuation",
      prompt: "表示一句话中间停顿，常用哪个标点？",
      options: ["，", "？", "！", "。"],
      answer: "，",
      explanation: "逗号常表示句子中间的停顿。",
      level: "小学基础题"
    },
    {
      id: "g-cn-13",
      subject: "语文",
      type: "literature-person",
      prompt: "“孙悟空”出自哪部作品？",
      options: ["《西游记》", "《水浒传》", "《红楼梦》", "《三国演义》"],
      answer: "《西游记》",
      explanation: "孙悟空是《西游记》中的经典人物。",
      level: "小学常识题"
    },
    {
      id: "g-cn-14",
      subject: "语文",
      type: "synonym",
      prompt: "“美丽”更接近下面哪个词？",
      options: ["漂亮", "寒冷", "安静", "困难"],
      answer: "漂亮",
      explanation: "“美丽”和“漂亮”意思接近。",
      level: "小学基础题"
    },
    {
      id: "g-cn-15",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“远上寒山石径斜”的下一句是？",
      options: ["白云生处有人家", "粒粒皆辛苦", "孤舟蓑笠翁", "春风吹又生"],
      answer: "白云生处有人家",
      explanation: "这两句出自杜牧《山行》。",
      level: "小学常识题"
    },
    {
      id: "g-cn-16",
      subject: "语文",
      type: "word-meaning",
      prompt: "“节约”更接近下面哪种意思？",
      options: ["不浪费", "跑得快", "声音大", "很难过"],
      answer: "不浪费",
      explanation: "“节约”表示爱惜、不浪费。",
      level: "小学基础题"
    },
    {
      id: "g-cn-17",
      subject: "语文",
      type: "punctuation",
      prompt: "表示很惊讶或感叹时，常用哪个标点？",
      options: ["！", "，", "。", "、"],
      answer: "！",
      explanation: "感叹句结尾常用感叹号。",
      level: "小学送分题"
    },
    {
      id: "g-cn-18",
      subject: "语文",
      type: "antonym",
      prompt: "“前进”的反义词更接近哪个词？",
      options: ["后退", "奔跑", "抬头", "跳跃"],
      answer: "后退",
      explanation: "“前进”和“后退”意思相反。",
      level: "小学基础题"
    },
    {
      id: "g-cn-19",
      subject: "语文",
      type: "literature-author",
      prompt: "《望庐山瀑布》的作者是？",
      options: ["李白", "杜甫", "白居易", "王安石"],
      answer: "李白",
      explanation: "《望庐山瀑布》是李白的作品。",
      level: "小学常识题"
    },
    {
      id: "g-cn-20",
      subject: "语文",
      type: "punctuation",
      prompt: "列举几个并列事物时，词语之间常用哪个标点？",
      options: ["顿号", "句号", "问号", "叹号"],
      answer: "顿号",
      explanation: "并列词语之间常用顿号。",
      level: "小学基础题"
    },
    {
      id: "g-cn-21",
      subject: "语文",
      type: "literature-author",
      prompt: "《陋室铭》的作者是？",
      options: ["刘禹锡", "王维", "苏轼", "陶渊明"],
      answer: "刘禹锡",
      explanation: "《陋室铭》是刘禹锡的作品。",
      level: "初中常识题"
    },
    {
      id: "g-cn-22",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“海日生残夜”的下一句是？",
      options: ["江春入旧年", "长河落日圆", "月涌大江流", "山山唯落晖"],
      answer: "江春入旧年",
      explanation: "这两句出自王湾《次北固山下》。",
      level: "初中基础题"
    },
    {
      id: "g-cn-23",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“余”常表示什么？",
      options: ["我", "你", "他", "他们"],
      answer: "我",
      explanation: "文言文里“余”常用来表示“我”。",
      level: "初中基础题"
    },
    {
      id: "g-cn-24",
      subject: "语文",
      type: "rhetoric",
      prompt: "“盼望着，盼望着，东风来了”主要运用了什么手法？",
      options: ["反复", "对偶", "设问", "借代"],
      answer: "反复",
      explanation: "重复同样词语，属于反复手法。",
      level: "初中基础题"
    },
    {
      id: "g-cn-25",
      subject: "语文",
      type: "word-meaning",
      prompt: "“不言而喻”更接近下面哪种意思？",
      options: ["不用说就能明白", "说了也听不懂", "特别喜欢说话", "非常难以理解"],
      answer: "不用说就能明白",
      explanation: "“不言而喻”指道理明显，不说也能明白。",
      level: "初中基础题"
    },
    {
      id: "g-cn-26",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“尔”常表示什么？",
      options: ["你", "我", "他", "它们"],
      answer: "你",
      explanation: "文言文里“尔”常表示“你”。",
      level: "初中基础题"
    },
    {
      id: "g-cn-27",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“几处早莺争暖树”的下一句是？",
      options: ["谁家新燕啄春泥", "江春入旧年", "一览众山小", "月有阴晴圆缺"],
      answer: "谁家新燕啄春泥",
      explanation: "这两句出自白居易《钱塘湖春行》。",
      level: "初中基础题"
    },
    {
      id: "g-cn-28",
      subject: "语文",
      type: "literature-work",
      prompt: "《朝花夕拾》的作者是？",
      options: ["鲁迅", "老舍", "朱自清", "冰心"],
      answer: "鲁迅",
      explanation: "《朝花夕拾》是鲁迅的散文集。",
      level: "初中常识题"
    },
    {
      id: "g-cn-29",
      subject: "语文",
      type: "rhetoric",
      prompt: "“燕子去了，有再来的时候；杨柳枯了，有再青的时候”主要运用了什么手法？",
      options: ["排比", "借代", "反问", "对比"],
      answer: "排比",
      explanation: "结构相近、语气连贯，属于排比。",
      level: "初中基础题"
    },
    {
      id: "g-cn-30",
      subject: "语文",
      type: "word-meaning",
      prompt: "“豁然开朗”更接近下面哪种意思？",
      options: ["一下子明白过来", "天气变暗", "心情更差", "说话变少"],
      answer: "一下子明白过来",
      explanation: "“豁然开朗”常形容一下子明白了或开阔了。",
      level: "初中基础题"
    },
    {
      id: "g-cn-31",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“之”在“学而时习之”里更接近什么用法？",
      options: ["代词，代学过的内容", "表示地点", "表示时间", "表示否定"],
      answer: "代词，代学过的内容",
      explanation: "这里的“之”代指前面学过的知识。",
      level: "初中基础题"
    },
    {
      id: "g-cn-32",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“会当凌绝顶”的下一句是？",
      options: ["一览众山小", "山山唯落晖", "江春入旧年", "浅草才能没马蹄"],
      answer: "一览众山小",
      explanation: "这两句出自杜甫《望岳》。",
      level: "初中送分题"
    },
    {
      id: "g-cn-33",
      subject: "语文",
      type: "literature-work",
      prompt: "《藤野先生》出自哪部作品集？",
      options: ["《朝花夕拾》", "《呐喊》", "《彷徨》", "《野草》"],
      answer: "《朝花夕拾》",
      explanation: "《藤野先生》收录于《朝花夕拾》。",
      level: "初中常识题"
    },
    {
      id: "g-cn-34",
      subject: "语文",
      type: "rhetoric",
      prompt: "“山朗润起来了，水涨起来了，太阳的脸红起来了”主要用了什么手法？",
      options: ["拟人", "借代", "设问", "反问"],
      answer: "拟人",
      explanation: "把太阳写成有“脸”的样子，属于拟人。",
      level: "初中基础题"
    },
    {
      id: "g-cn-35",
      subject: "语文",
      type: "word-meaning",
      prompt: "“销声匿迹”更接近下面哪种意思？",
      options: ["隐藏起来不再出现", "说话更多了", "声音变大了", "走得很快"],
      answer: "隐藏起来不再出现",
      explanation: "“销声匿迹”指隐藏起来，不再公开露面。",
      level: "初中基础题"
    },
    {
      id: "g-cn-36",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“乃”在“乃不知有汉”里更接近什么含义？",
      options: ["竟然", "于是", "你", "才刚"],
      answer: "竟然",
      explanation: "这里的“乃”有“竟然、居然”的意思。",
      level: "初中基础题"
    },
    {
      id: "g-cn-37",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“乱花渐欲迷人眼”的下一句是？",
      options: ["浅草才能没马蹄", "江春入旧年", "草色入帘青", "悠然见南山"],
      answer: "浅草才能没马蹄",
      explanation: "这两句出自白居易《钱塘湖春行》。",
      level: "初中基础题"
    },
    {
      id: "g-cn-38",
      subject: "语文",
      type: "literature-work",
      prompt: "《背影》的作者是？",
      options: ["朱自清", "鲁迅", "老舍", "巴金"],
      answer: "朱自清",
      explanation: "《背影》是朱自清的经典散文。",
      level: "初中常识题"
    },
    {
      id: "g-cn-39",
      subject: "语文",
      type: "rhetoric",
      prompt: "“盼望着，盼望着”连续重复同一词语，主要属于什么手法？",
      options: ["反复", "借代", "夸张", "设问"],
      answer: "反复",
      explanation: "连续重复词语以加强语气，属于反复。",
      level: "初中基础题"
    },
    {
      id: "g-cn-40",
      subject: "语文",
      type: "word-meaning",
      prompt: "“相得益彰”更接近下面哪种意思？",
      options: ["互相配合更好", "互相争吵更凶", "彼此毫无关系", "完全一模一样"],
      answer: "互相配合更好",
      explanation: "“相得益彰”指互相帮助、映衬，效果更好。",
      level: "初中基础题"
    },
    {
      id: "g-cn-41",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“天生我材必有用”的下一句是？",
      options: ["千金散尽还复来", "长风破浪会有时", "直挂云帆济沧海", "将进酒，杯莫停"],
      answer: "千金散尽还复来",
      explanation: "这两句出自李白《将进酒》。",
      level: "高中送分题"
    },
    {
      id: "g-cn-42",
      subject: "语文",
      type: "culture",
      prompt: "“六艺”中不包括下面哪一项？",
      options: ["礼", "乐", "射", "诗"],
      answer: "诗",
      explanation: "古代“六艺”通常指礼、乐、射、御、书、数。",
      level: "高中常识题"
    },
    {
      id: "g-cn-43",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“沧海一粟”更接近下面哪种意思？",
      options: ["非常渺小", "非常危险", "非常热闹", "非常整齐"],
      answer: "非常渺小",
      explanation: "“沧海一粟”比喻非常渺小。",
      level: "高中基础题"
    },
    {
      id: "g-cn-44",
      subject: "语文",
      type: "rhetoric",
      prompt: "“问君能有几多愁？恰似一江春水向东流”主要运用了什么修辞？",
      options: ["比喻", "借代", "反复", "设问"],
      answer: "比喻",
      explanation: "把愁绪比作江水，属于比喻。",
      level: "高中基础题"
    },
    {
      id: "g-cn-45",
      subject: "语文",
      type: "literature-work",
      prompt: "《林黛玉进贾府》节选自哪部作品？",
      options: ["《红楼梦》", "《儒林外史》", "《西游记》", "《聊斋志异》"],
      answer: "《红楼梦》",
      explanation: "《林黛玉进贾府》节选自《红楼梦》。",
      level: "高中常识题"
    },
    {
      id: "g-cn-46",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“长风破浪会有时”的下一句是？",
      options: ["直挂云帆济沧海", "千金散尽还复来", "一览众山小", "只是当时已惘然"],
      answer: "直挂云帆济沧海",
      explanation: "这两句出自李白《行路难》。",
      level: "高中送分题"
    },
    {
      id: "g-cn-47",
      subject: "语文",
      type: "culture",
      prompt: "“四书”中不包括下面哪一部？",
      options: ["《大学》", "《中庸》", "《论语》", "《春秋》"],
      answer: "《春秋》",
      explanation: "“四书”通常指《大学》《中庸》《论语》《孟子》。",
      level: "高中常识题"
    },
    {
      id: "g-cn-48",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“妄自菲薄”更接近下面哪种意思？",
      options: ["过分看轻自己", "过分夸奖自己", "做事非常草率", "说话非常直接"],
      answer: "过分看轻自己",
      explanation: "“妄自菲薄”指过分看轻自己。",
      level: "高中基础题"
    },
    {
      id: "g-cn-49",
      subject: "语文",
      type: "rhetoric",
      prompt: "“大弦嘈嘈如急雨，小弦切切如私语”主要运用了什么修辞？",
      options: ["比喻", "借代", "夸张", "反问"],
      answer: "比喻",
      explanation: "把声音比作急雨、私语，属于比喻。",
      level: "高中基础题"
    },
    {
      id: "g-cn-50",
      subject: "语文",
      type: "literature-work",
      prompt: "《祝福》中的主要人物祥林嫂出自谁的作品？",
      options: ["鲁迅", "巴金", "老舍", "曹禺"],
      answer: "鲁迅",
      explanation: "《祝福》是鲁迅的小说。",
      level: "高中常识题"
    },
    {
      id: "g-cn-51",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“此情可待成追忆”的下一句是？",
      options: ["只是当时已惘然", "一览众山小", "江春入旧年", "草色入帘青"],
      answer: "只是当时已惘然",
      explanation: "这两句出自李商隐《锦瑟》。",
      level: "高中基础题"
    },
    {
      id: "g-cn-52",
      subject: "语文",
      type: "culture",
      prompt: "“五经”中不包括下面哪一部？",
      options: ["《诗》", "《书》", "《礼》", "《左传》"],
      answer: "《左传》",
      explanation: "“五经”通常指《诗》《书》《礼》《易》《春秋》。",
      level: "高中常识题"
    },
    {
      id: "g-cn-53",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“缘木求鱼”更接近下面哪种意思？",
      options: ["方法不对，达不到目的", "做事很快", "非常勇敢", "特别高兴"],
      answer: "方法不对，达不到目的",
      explanation: "“缘木求鱼”比喻方向或方法错误，不可能达到目的。",
      level: "高中基础题"
    },
    {
      id: "g-cn-54",
      subject: "语文",
      type: "rhetoric",
      prompt: "“问君能有几多愁？”这句本身更接近什么句式？",
      options: ["设问", "陈述", "祈使", "说明"],
      answer: "设问",
      explanation: "先提出问题，再自答，属于设问。",
      level: "高中基础题"
    },
    {
      id: "g-cn-55",
      subject: "语文",
      type: "literature-work",
      prompt: "《边城》的作者是？",
      options: ["沈从文", "巴金", "曹禺", "郁达夫"],
      answer: "沈从文",
      explanation: "《边城》是沈从文的代表作之一。",
      level: "高中常识题"
    },
    {
      id: "g-cn-56",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“同是天涯沦落人”的下一句是？",
      options: ["相逢何必曾相识", "只是当时已惘然", "一览众山小", "长风破浪会有时"],
      answer: "相逢何必曾相识",
      explanation: "这两句出自白居易《琵琶行》。",
      level: "高中送分题"
    },
    {
      id: "g-cn-57",
      subject: "语文",
      type: "culture",
      prompt: "“三曹”通常指曹操、曹丕和谁？",
      options: ["曹植", "曹雪芹", "曹刿", "曹参"],
      answer: "曹植",
      explanation: "“三曹”通常指曹操、曹丕、曹植。",
      level: "高中常识题"
    },
    {
      id: "g-cn-58",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“首当其冲”更接近下面哪种意思？",
      options: ["最先受到冲击", "第一个取得成功", "最先开始冲锋", "最先到达终点"],
      answer: "最先受到冲击",
      explanation: "“首当其冲”常指最先受到攻击或遭遇灾难。",
      level: "高中基础题"
    },
    {
      id: "g-cn-59",
      subject: "语文",
      type: "rhetoric",
      prompt: "“主人下马客在船”更接近哪种修辞手法？",
      options: ["互文", "借代", "夸张", "设问"],
      answer: "互文",
      explanation: "这句常作互文理解，意思是主人和客人都下马来到船边。",
      level: "高中基础题"
    },
    {
      id: "g-cn-60",
      subject: "语文",
      type: "literature-work",
      prompt: "《雷雨》的作者是？",
      options: ["曹禺", "巴金", "茅盾", "鲁迅"],
      answer: "曹禺",
      explanation: "《雷雨》是曹禺的代表作。",
      level: "高中常识题"
    },
    {
      id: "g-cn-61",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“人生自古谁无死”的下一句是？",
      options: ["留取丹心照汗青", "一览众山小", "长风破浪会有时", "只是当时已惘然"],
      answer: "留取丹心照汗青",
      explanation: "这两句出自文天祥《过零丁洋》。",
      level: "大学送分题"
    },
    {
      id: "g-cn-62",
      subject: "语文",
      type: "culture",
      prompt: "“汗青”在古代常借指什么？",
      options: ["史册", "天空", "竹林", "战场"],
      answer: "史册",
      explanation: "“汗青”常借指史册、史书。",
      level: "大学常识题"
    },
    {
      id: "g-cn-63",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“不可理喻”更接近下面哪种意思？",
      options: ["无法讲道理", "非常有条理", "十分容易理解", "特别善于分析"],
      answer: "无法讲道理",
      explanation: "“不可理喻”指无法跟他讲道理。",
      level: "大学基础题"
    },
    {
      id: "g-cn-64",
      subject: "语文",
      type: "literature-work",
      prompt: "《阿Q正传》的作者是？",
      options: ["鲁迅", "巴金", "茅盾", "沈从文"],
      answer: "鲁迅",
      explanation: "《阿Q正传》是鲁迅的小说。",
      level: "大学送分题"
    },
    {
      id: "g-cn-65",
      subject: "语文",
      type: "rhetoric",
      prompt: "“大珠小珠落玉盘”主要运用了什么修辞？",
      options: ["比喻", "设问", "借代", "反问"],
      answer: "比喻",
      explanation: "把声音比作珠落玉盘，属于比喻。",
      level: "大学基础题"
    },
    {
      id: "g-cn-66",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“先天下之忧而忧”的下一句是？",
      options: ["后天下之乐而乐", "只是当时已惘然", "直挂云帆济沧海", "一览众山小"],
      answer: "后天下之乐而乐",
      explanation: "这两句出自范仲淹《岳阳楼记》。",
      level: "大学送分题"
    },
    {
      id: "g-cn-67",
      subject: "语文",
      type: "culture",
      prompt: "“而立之年”通常指多少岁？",
      options: ["20 岁", "30 岁", "40 岁", "50 岁"],
      answer: "30 岁",
      explanation: "“三十而立”，所以“而立之年”通常指 30 岁。",
      level: "大学常识题"
    },
    {
      id: "g-cn-68",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“望其项背”更接近下面哪种意思？",
      options: ["赶得上或比得上", "远远落后", "非常失望", "回头张望"],
      answer: "赶得上或比得上",
      explanation: "“望其项背”常表示赶得上或可以相比。",
      level: "大学基础题"
    },
    {
      id: "g-cn-69",
      subject: "语文",
      type: "literature-work",
      prompt: "《荷塘月色》的作者是？",
      options: ["朱自清", "郁达夫", "老舍", "闻一多"],
      answer: "朱自清",
      explanation: "《荷塘月色》是朱自清的散文名篇。",
      level: "大学送分题"
    },
    {
      id: "g-cn-70",
      subject: "语文",
      type: "rhetoric",
      prompt: "“问苍茫大地，谁主沉浮？”更接近哪种修辞或句式？",
      options: ["设问", "借代", "排比", "对偶"],
      answer: "设问",
      explanation: "先提出问题，再引出下文，属于设问。",
      level: "大学基础题"
    },
    {
      id: "g-cn-71",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“其”在“其皆出于此乎”里更接近什么用法？",
      options: ["表推测语气", "表示地点", "表示否定", "表示时间"],
      answer: "表推测语气",
      explanation: "这里的“其”常作语气副词理解，表示推测。",
      level: "大学基础题"
    },
    {
      id: "g-cn-72",
      subject: "语文",
      type: "literature-work",
      prompt: "“横眉冷对千夫指，俯首甘为孺子牛”更常和谁联系在一起？",
      options: ["鲁迅", "老舍", "巴金", "茅盾"],
      answer: "鲁迅",
      explanation: "这句名言通常和鲁迅联系在一起。",
      level: "大学常识题"
    },
    {
      id: "g-cn-73",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“不刊之论”更接近下面哪种意思？",
      options: ["不能改动的精当言论", "不值得发表的观点", "不能阅读的文章", "没有结论的议论"],
      answer: "不能改动的精当言论",
      explanation: "“不刊之论”指内容精当、不可磨灭的言论。",
      level: "大学基础题"
    },
    {
      id: "g-cn-74",
      subject: "语文",
      type: "rhetoric",
      prompt: "“无边落木萧萧下，不尽长江滚滚来”更突出的修辞效果是什么？",
      options: ["对偶", "借代", "设问", "反问"],
      answer: "对偶",
      explanation: "上下句结构整齐、词性相对，具有明显对偶特点。",
      level: "大学基础题"
    },
    {
      id: "g-cn-75",
      subject: "语文",
      type: "poem-title",
      prompt: "“安得广厦千万间，大庇天下寒士俱欢颜”出自哪篇作品？",
      options: ["《茅屋为秋风所破歌》", "《岳阳楼记》", "《前赤壁赋》", "《登高》"],
      answer: "《茅屋为秋风所破歌》",
      explanation: "这句名句出自杜甫《茅屋为秋风所破歌》。",
      level: "大学基础题"
    },
    {
      id: "g-cn-76",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“若”在“若夫霪雨霏霏”里更接近什么含义？",
      options: ["像、至于", "你", "如果", "这样的人"],
      answer: "像、至于",
      explanation: "这里的“若夫”常作发语词理解，可近似看作“至于”或“像那”。",
      level: "大学基础题"
    },
    {
      id: "g-cn-77",
      subject: "语文",
      type: "culture",
      prompt: "“不惑之年”通常指多少岁？",
      options: ["30 岁", "40 岁", "50 岁", "60 岁"],
      answer: "40 岁",
      explanation: "“四十而不惑”，所以“不惑之年”通常指 40 岁。",
      level: "大学常识题"
    },
    {
      id: "g-cn-78",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“差强人意”更接近下面哪种意思？",
      options: ["大体上还能让人满意", "完全不能接受", "特别强迫别人同意", "非常出人意料地差"],
      answer: "大体上还能让人满意",
      explanation: "“差强人意”常表示大体上还能使人满意。",
      level: "大学基础题"
    },
    {
      id: "g-cn-79",
      subject: "语文",
      type: "literature-work",
      prompt: "《子夜》的作者是？",
      options: ["茅盾", "巴金", "鲁迅", "沈从文"],
      answer: "茅盾",
      explanation: "《子夜》是茅盾的长篇小说。",
      level: "大学常识题"
    },
    {
      id: "g-cn-80",
      subject: "语文",
      type: "rhetoric",
      prompt: "“千呼万唤始出来”更突出的修辞效果更接近什么？",
      options: ["夸张", "设问", "借代", "对偶"],
      answer: "夸张",
      explanation: "这里通过“千呼万唤”强化表现，具有夸张效果。",
      level: "大学基础题"
    },
    {
      id: "g-cn-81",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“焉”在“积土成山，风雨兴焉”里更接近什么含义？",
      options: ["于此、从这里", "怎么", "哪里", "什么"],
      answer: "于此、从这里",
      explanation: "这里的“焉”常可理解为“于此、从这里”。",
      level: "大学基础题"
    },
    {
      id: "g-cn-82",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“万人空巷”更接近下面哪种意思？",
      options: ["家家户户的人都出来了", "街上一个人都没有", "大家都关门睡觉", "巷子特别宽"],
      answer: "家家户户的人都出来了",
      explanation: "“万人空巷”常形容庆祝、欢迎等盛况，大家都从家里出来了。",
      level: "大学基础题"
    },
    {
      id: "g-cn-83",
      subject: "语文",
      type: "literature-style",
      prompt: "《边城》更接近下面哪种文学体裁？",
      options: ["小说", "戏剧", "诗歌", "书信"],
      answer: "小说",
      explanation: "《边城》是沈从文的小说作品。",
      level: "大学基础题"
    },
    {
      id: "g-cn-84",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“诚”在“此诚危急存亡之秋也”里更接近什么含义？",
      options: ["的确、确实", "诚实", "请你", "假如"],
      answer: "的确、确实",
      explanation: "这里的“诚”常表示“的确、确实”。",
      level: "大学基础题"
    },
    {
      id: "g-cn-85",
      subject: "语文",
      type: "literature-style",
      prompt: "《再别康桥》更接近下面哪种文学体裁？",
      options: ["诗歌", "戏剧", "小说", "议论文"],
      answer: "诗歌",
      explanation: "《再别康桥》是徐志摩的诗歌作品。",
      level: "大学基础题"
    },
    {
      id: "g-cn-86",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“登堂入室”更接近下面哪种意思？",
      options: ["学问或技能达到更高水平", "进入屋子里参观", "做事没有分寸", "突然闯进别人家"],
      answer: "学问或技能达到更高水平",
      explanation: "“登堂入室”常比喻学问或技能由浅入深，达到较高境界。",
      level: "大学基础题"
    },
    {
      id: "g-cn-87",
      subject: "语文",
      type: "literature-style",
      prompt: "《窦娥冤》更接近下面哪种文学体裁？",
      options: ["戏曲", "散文", "小说", "书信"],
      answer: "戏曲",
      explanation: "《窦娥冤》是元杂剧代表作品之一。",
      level: "大学常识题"
    },
    {
      id: "g-cn-88",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“盖”在“盖将自其变者而观之”里更接近什么含义？",
      options: ["大概、句首发语词", "遮盖", "建筑", "原来如此"],
      answer: "大概、句首发语词",
      explanation: "这里的“盖”常作句首发语词理解，可近似看作“大概”。",
      level: "大学基础题"
    },
    {
      id: "g-cn-89",
      subject: "语文",
      type: "culture",
      prompt: "“知天命之年”通常指多少岁？",
      options: ["40 岁", "50 岁", "60 岁", "70 岁"],
      answer: "50 岁",
      explanation: "“五十而知天命”，所以“知天命之年”通常指 50 岁。",
      level: "大学常识题"
    },
    {
      id: "g-cn-90",
      subject: "语文",
      type: "literature-work",
      prompt: "《呐喊》属于哪一类作品集？",
      options: ["小说集", "诗集", "散文集", "戏剧集"],
      answer: "小说集",
      explanation: "《呐喊》是鲁迅的小说集。",
      level: "大学基础题"
    },
    {
      id: "g-cn-91",
      subject: "语文",
      type: "quote-source",
      prompt: "“先天下之忧而忧，后天下之乐而乐”出自哪篇作品？",
      options: ["《岳阳楼记》", "《醉翁亭记》", "《师说》", "《陋室铭》"],
      answer: "《岳阳楼记》",
      explanation: "这句名句出自范仲淹的《岳阳楼记》。",
      level: "大学基础题"
    },
    {
      id: "g-cn-92",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文里“之”在“学而时习之”中更接近什么作用？",
      options: ["代词", "连词", "语气词", "量词"],
      answer: "代词",
      explanation: "这里的“之”代指学过的内容，作用更接近代词。",
      level: "大学基础题"
    },
    {
      id: "g-cn-93",
      subject: "语文",
      type: "idiom-usage",
      prompt: "下列更适合形容“文章内容丰富、气势大”的成语是？",
      options: ["洋洋洒洒", "空穴来风", "差强人意", "目无全牛"],
      answer: "洋洋洒洒",
      explanation: "“洋洋洒洒”常形容文章或谈话丰富明快、连续不断。",
      level: "大学常识题"
    },
    {
      id: "g-cn-94",
      subject: "语文",
      type: "literary-school",
      prompt: "李白的诗歌风格通常更接近下列哪一项？",
      options: ["浪漫主义", "现实主义", "自然主义", "象征主义"],
      answer: "浪漫主义",
      explanation: "李白诗歌想象丰富、气势奔放，常被归为浪漫主义风格。",
      level: "大学基础题"
    },
    {
      id: "g-cn-95",
      subject: "语文",
      type: "poetry-understanding",
      prompt: "“海内存知己，天涯若比邻”主要表达了什么？",
      options: ["友情深厚不因距离而淡", "思乡心切", "山水优美", "仕途失意"],
      answer: "友情深厚不因距离而淡",
      explanation: "这两句主要写真挚友情可以超越空间距离。",
      level: "大学基础题"
    },
    {
      id: "g-cn-96",
      subject: "语文",
      type: "expression-style",
      prompt: "“他认真地记下了老师的话。”这句话的表达方式更接近哪一项？",
      options: ["记叙", "议论", "说明", "抒情"],
      answer: "记叙",
      explanation: "这句话是在叙述人物的动作过程，更接近记叙。",
      level: "初中送分题"
    },
    {
      id: "g-cn-97",
      subject: "语文",
      type: "classical-word",
      prompt: "文言文中“走”在古代更接近下面哪种意思？",
      options: ["跑", "行走", "离开", "跟随"],
      answer: "跑",
      explanation: "古汉语里的“走”常表示跑。",
      level: "初中基础题"
    },
    {
      id: "g-cn-98",
      subject: "语文",
      type: "sentence-error",
      prompt: "下列句子有语病的一项是？",
      options: ["我们按时完成了作业。", "他把教室打扫得很干净。", "通过努力，使我的成绩提高了。", "同学们正在认真听课。"],
      answer: "通过努力，使我的成绩提高了。",
      explanation: "这句缺少明确主语，属于常见病句。",
      level: "初中基础题"
    },
    {
      id: "g-cn-99",
      subject: "语文",
      type: "quote-source",
      prompt: "“长风破浪会有时”出自谁的诗句？",
      options: ["李白", "杜甫", "白居易", "王维"],
      answer: "李白",
      explanation: "这句出自李白《行路难》。",
      level: "高中常识题"
    },
    {
      id: "g-cn-100",
      subject: "语文",
      type: "culture",
      prompt: "“四书”中不包括下列哪一项？",
      options: ["《诗经》", "《大学》", "《中庸》", "《论语》"],
      answer: "《诗经》",
      explanation: "《诗经》属于“五经”，不在“四书”之中。",
      level: "高中基础题"
    },
    {
      id: "g-cn-101",
      subject: "语文",
      type: "poetry-emotion",
      prompt: "“夕阳西下，断肠人在天涯”主要表达了什么情感？",
      options: ["思乡伤感", "豪迈喜悦", "轻松愉快", "愤怒不平"],
      answer: "思乡伤感",
      explanation: "这句常用来表达漂泊在外的孤独和思乡之情。",
      level: "高中基础题"
    },
    {
      id: "g-cn-102",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文里“而”在“学而不思则罔”中更接近什么作用？",
      options: ["连词", "代词", "量词", "助词"],
      answer: "连词",
      explanation: "这里的“而”用来连接前后内容，作用更接近连词。",
      level: "大学基础题"
    },
    {
      id: "g-cn-103",
      subject: "语文",
      type: "literary-school",
      prompt: "杜甫的诗歌风格通常更接近哪一项？",
      options: ["现实主义", "浪漫主义", "魔幻主义", "未来主义"],
      answer: "现实主义",
      explanation: "杜甫作品常关注现实，被认为更接近现实主义风格。",
      level: "大学基础题"
    },
    {
      id: "g-cn-104",
      subject: "语文",
      type: "idiom-usage",
      prompt: "下列更适合形容“做事刚开始就取得好成绩”的成语是？",
      options: ["旗开得胜", "南辕北辙", "望梅止渴", "守株待兔"],
      answer: "旗开得胜",
      explanation: "“旗开得胜”常形容一开始就取得成功。",
      level: "大学常识题"
    },
    {
      id: "g-cn-105",
      subject: "语文",
      type: "literature-work",
      prompt: "《边城》的作者是谁？",
      options: ["沈从文", "鲁迅", "老舍", "巴金"],
      answer: "沈从文",
      explanation: "《边城》是沈从文的代表作之一。",
      level: "大学基础题"
    },
    {
      id: "g-cn-106",
      subject: "语文",
      type: "classical-word",
      prompt: "文言文中“妻子”更接近下面哪种意思？",
      options: ["妻子和儿女", "只有妻子", "已婚女子", "夫妻关系"],
      answer: "妻子和儿女",
      explanation: "古汉语中的“妻子”常指妻子和子女。",
      level: "初中基础题"
    },
    {
      id: "g-cn-107",
      subject: "语文",
      type: "sentence-link",
      prompt: "下列句子表达最连贯的一项是？",
      options: ["天黑了，我们赶快回家。", "我们回家，天黑了赶快。", "赶快天黑了，我们回家。", "回家我们，赶快天黑了。"],
      answer: "天黑了，我们赶快回家。",
      explanation: "这句语序自然，前后逻辑也更顺。",
      level: "初中送分题"
    },
    {
      id: "g-cn-108",
      subject: "语文",
      type: "writer-work",
      prompt: "《藤野先生》与哪位作家关系最密切？",
      options: ["鲁迅", "朱自清", "冰心", "巴金"],
      answer: "鲁迅",
      explanation: "《藤野先生》是鲁迅的散文名篇。",
      level: "初中常识题"
    },
    {
      id: "g-cn-109",
      subject: "语文",
      type: "rhetoric",
      prompt: "“山朗润起来了，水涨起来了，太阳的脸红起来了”主要用了什么修辞？",
      options: ["拟人", "夸张", "排比", "设问"],
      answer: "拟人",
      explanation: "把太阳写成有“脸”，属于拟人手法。",
      level: "初中基础题"
    },
    {
      id: "g-cn-110",
      subject: "语文",
      type: "sentence-error",
      prompt: "下列没有语病的一项是？",
      options: ["他养成了认真写字。", "通过活动，让同学们更团结了。", "我们要提高保护环境的意识。", "大家讨论并听取了他的发言。"],
      answer: "我们要提高保护环境的意识。",
      explanation: "这一句结构完整，搭配也正确。",
      level: "初中基础题"
    },
    {
      id: "g-cn-111",
      subject: "语文",
      type: "quote-source",
      prompt: "“无可奈何花落去，似曾相识燕归来”出自谁的词？",
      options: ["晏殊", "苏轼", "辛弃疾", "李清照"],
      answer: "晏殊",
      explanation: "这句出自晏殊《浣溪沙》。",
      level: "高中常识题"
    },
    {
      id: "g-cn-112",
      subject: "语文",
      type: "poetry-emotion",
      prompt: "“安得广厦千万间，大庇天下寒士俱欢颜”主要体现了什么情怀？",
      options: ["忧国忧民", "儿女情长", "田园闲适", "建功立业"],
      answer: "忧国忧民",
      explanation: "诗句表达了对百姓疾苦的深切关怀。",
      level: "高中基础题"
    },
    {
      id: "g-cn-113",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“屡试不爽”更接近下面哪种意思？",
      options: ["多次验证都没有差错", "考试总是不及格", "心情一直不好", "做事拖拖拉拉"],
      answer: "多次验证都没有差错",
      explanation: "“屡试不爽”指多次试验都没有差错。",
      level: "高中基础题"
    },
    {
      id: "g-cn-114",
      subject: "语文",
      type: "culture",
      prompt: "“黔驴技穷”里的“黔”通常是今天哪里的大致旧称？",
      options: ["贵州", "云南", "广西", "四川"],
      answer: "贵州",
      explanation: "“黔”是贵州的旧称之一。",
      level: "高中常识题"
    },
    {
      id: "g-cn-115",
      subject: "语文",
      type: "argument",
      prompt: "用事实来证明观点，最接近哪种论证方法？",
      options: ["举例论证", "比喻论证", "对比论证", "引用论证"],
      answer: "举例论证",
      explanation: "列举具体事实来证明观点，属于举例论证。",
      level: "高中送分题"
    },
    {
      id: "g-cn-116",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“以”在“可以一战”里更接近什么作用？",
      options: ["凭借", "因为", "把", "来"],
      answer: "凭借",
      explanation: "这里的“以”更接近“凭借”的意思。",
      level: "大学基础题"
    },
    {
      id: "g-cn-117",
      subject: "语文",
      type: "literary-school",
      prompt: "《狂人日记》在中国现代文学史上更接近哪种开创意义？",
      options: ["白话小说开端", "格律诗典范", "戏曲高峰", "骈文代表"],
      answer: "白话小说开端",
      explanation: "《狂人日记》常被看作中国现代白话小说的重要开端。",
      level: "大学常识题"
    },
    {
      id: "g-cn-118",
      subject: "语文",
      type: "idiom-usage",
      prompt: "下列更适合形容“看问题不全面”的成语是？",
      options: ["一叶障目", "如鱼得水", "雪中送炭", "入木三分"],
      answer: "一叶障目",
      explanation: "“一叶障目”常比喻被局部现象遮住，不能看清全局。",
      level: "大学基础题"
    },
    {
      id: "g-cn-119",
      subject: "语文",
      type: "literature-work",
      prompt: "《雷雨》属于哪种文学体裁？",
      options: ["话剧", "小说", "词", "散文"],
      answer: "话剧",
      explanation: "《雷雨》是曹禺的话剧代表作。",
      level: "大学送分题"
    },
    {
      id: "g-cn-120",
      subject: "语文",
      type: "quote-source",
      prompt: "“师者，所以传道受业解惑也”出自哪篇文章？",
      options: ["《师说》", "《马说》", "《劝学》", "《出师表》"],
      answer: "《师说》",
      explanation: "这句名言出自韩愈《师说》。",
      level: "大学基础题"
    },
    {
      id: "g-cn-121",
      subject: "语文",
      type: "synonym",
      prompt: "“帮助”更接近下面哪个词？",
      options: ["协助", "拒绝", "责怪", "等待"],
      answer: "协助",
      explanation: "“帮助”和“协助”意思接近。",
      level: "小学基础题"
    },
    {
      id: "g-cn-122",
      subject: "语文",
      type: "antonym",
      prompt: "“炎热”的反义词更接近哪个词？",
      options: ["寒冷", "温暖", "明亮", "安静"],
      answer: "寒冷",
      explanation: "“炎热”和“寒冷”意思相反。",
      level: "小学基础题"
    },
    {
      id: "g-cn-123",
      subject: "语文",
      type: "quantifier",
      prompt: "下列量词搭配正确的是哪一项？",
      options: ["一匹马", "一条书", "一座铅笔", "一把天空"],
      answer: "一匹马",
      explanation: "“匹”常用来搭配马。",
      level: "小学送分题"
    },
    {
      id: "g-cn-124",
      subject: "语文",
      type: "punctuation",
      prompt: "表示一句话还没有说完，常用什么标点？",
      options: ["逗号", "句号", "书名号", "顿号"],
      answer: "逗号",
      explanation: "句子中间停顿时常用逗号。",
      level: "小学送分题"
    },
    {
      id: "g-cn-125",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“白日依山尽”的下一句是？",
      options: ["黄河入海流", "更上一层楼", "疑是地上霜", "春风吹又生"],
      answer: "黄河入海流",
      explanation: "这两句出自《登鹳雀楼》。",
      level: "小学送分题"
    },
    {
      id: "g-cn-126",
      subject: "语文",
      type: "rhetoric",
      prompt: "“春风像妈妈的手”用了什么修辞？",
      options: ["比喻", "设问", "反问", "夸张"],
      answer: "比喻",
      explanation: "把春风比作妈妈的手，属于比喻。",
      level: "小学基础题"
    },
    {
      id: "g-cn-127",
      subject: "语文",
      type: "word-meaning",
      prompt: "“勤劳”更接近下面哪种意思？",
      options: ["爱劳动", "很安静", "跑得快", "很生气"],
      answer: "爱劳动",
      explanation: "“勤劳”指肯劳动、不偷懒。",
      level: "小学基础题"
    },
    {
      id: "g-cn-128",
      subject: "语文",
      type: "literature-person",
      prompt: "“哪吒闹海”里的哪吒更接近哪类人物？",
      options: ["神话人物", "数学家", "诗人", "画家"],
      answer: "神话人物",
      explanation: "哪吒是常见的神话人物。",
      level: "小学常识题"
    },
    {
      id: "g-cn-129",
      subject: "语文",
      type: "sentence-order",
      prompt: "下列句子语序更自然的是？",
      options: ["小鸟在树上唱歌。", "唱歌小鸟在树上。", "树上在小鸟唱歌。", "在唱歌树上小鸟。"],
      answer: "小鸟在树上唱歌。",
      explanation: "这句话语序自然，表达完整。",
      level: "小学基础题"
    },
    {
      id: "g-cn-130",
      subject: "语文",
      type: "literature-author",
      prompt: "《望庐山瀑布》的作者是谁？",
      options: ["李白", "杜甫", "白居易", "苏轼"],
      answer: "李白",
      explanation: "《望庐山瀑布》是李白的作品。",
      level: "小学常识题"
    },
    {
      id: "g-cn-131",
      subject: "语文",
      type: "classical-word",
      prompt: "文言文中“汤”更接近下面哪种意思？",
      options: ["热水", "米汤", "食物", "药材"],
      answer: "热水",
      explanation: "古汉语里的“汤”常指热水。",
      level: "初中基础题"
    },
    {
      id: "g-cn-132",
      subject: "语文",
      type: "sentence-link",
      prompt: "下列句子衔接更自然的一项是？",
      options: ["因为下雨了，所以比赛改在室内进行。", "所以比赛改在室内进行，因为下雨了。", "比赛改在室内进行，所以因为下雨了。", "下雨了比赛改在因为室内进行。"],
      answer: "因为下雨了，所以比赛改在室内进行。",
      explanation: "这句因果关系清楚，语序也自然。",
      level: "初中基础题"
    },
    {
      id: "g-cn-133",
      subject: "语文",
      type: "sentence-link",
      prompt: "下列句子连接最自然的是？",
      options: ["下雨了，所以我们留在教室里。", "我们留在教室里，所以下雨了。", "所以下雨了，我们留在教室里。", "留在教室里，我们所以下雨了。"],
      answer: "下雨了，所以我们留在教室里。",
      explanation: "前因后果关系清楚。",
      level: "初中送分题"
    },
    {
      id: "g-cn-134",
      subject: "语文",
      type: "writer-work",
      prompt: "《背影》与哪位作家关系最密切？",
      options: ["朱自清", "鲁迅", "老舍", "冰心"],
      answer: "朱自清",
      explanation: "《背影》是朱自清的散文名篇。",
      level: "初中常识题"
    },
    {
      id: "g-cn-135",
      subject: "语文",
      type: "rhetoric",
      prompt: "“盼望着，盼望着，东风来了”主要用了什么修辞？",
      options: ["反复", "借代", "夸张", "顶真"],
      answer: "反复",
      explanation: "词语重复出现，属于反复。",
      level: "初中基础题"
    },
    {
      id: "g-cn-136",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“茅塞顿开”更接近下面哪种意思？",
      options: ["一下子明白过来", "路突然变宽", "心情很难过", "动作特别快"],
      answer: "一下子明白过来",
      explanation: "“茅塞顿开”常比喻一下子明白过来。",
      level: "初中基础题"
    },
    {
      id: "g-cn-137",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“沉舟侧畔千帆过”的下一句是？",
      options: ["病树前头万木春", "长风破浪会有时", "蜡炬成灰泪始干", "欲穷千里目"],
      answer: "病树前头万木春",
      explanation: "这两句常一起出现。",
      level: "初中基础题"
    },
    {
      id: "g-cn-138",
      subject: "语文",
      type: "classical-word",
      prompt: "文言文中“去”更接近下面哪种意思？",
      options: ["距离", "离开", "前往", "舍弃"],
      answer: "距离",
      explanation: "古汉语里的“去”常表示距离。",
      level: "初中基础题"
    },
    {
      id: "g-cn-139",
      subject: "语文",
      type: "expression-style",
      prompt: "“太阳慢慢升起来了，照亮了村庄。”这句话的表达方式更接近哪一项？",
      options: ["记叙", "议论", "说明", "抒情"],
      answer: "记叙",
      explanation: "这句话是在叙述景象的发展过程，更接近记叙。",
      level: "初中基础题"
    },
    {
      id: "g-cn-140",
      subject: "语文",
      type: "writer-work",
      prompt: "《从百草园到三味书屋》是哪位作家的作品？",
      options: ["鲁迅", "巴金", "老舍", "茅盾"],
      answer: "鲁迅",
      explanation: "这篇散文出自鲁迅。",
      level: "初中常识题"
    },
    {
      id: "g-cn-141",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“张冠李戴”更接近下面哪种意思？",
      options: ["弄错对象", "动作很快", "衣服很多", "非常紧张"],
      answer: "弄错对象",
      explanation: "“张冠李戴”常指把人物或事情弄错。",
      level: "初中基础题"
    },
    {
      id: "g-cn-142",
      subject: "语文",
      type: "expression",
      prompt: "记叙文中写“时间、地点、人物、事情经过”，主要是在做什么？",
      options: ["交代事件", "提出论点", "说明原理", "抒发议论"],
      answer: "交代事件",
      explanation: "这些内容主要用于交代事件的基本情况。",
      level: "初中送分题"
    },
    {
      id: "g-cn-143",
      subject: "语文",
      type: "classical-word",
      prompt: "文言文里“兵”常见的意思更接近哪一项？",
      options: ["兵器或军队", "士兵帽子", "战争地点", "命令"],
      answer: "兵器或军队",
      explanation: "“兵”在文言文中常指兵器或军队。",
      level: "初中基础题"
    },
    {
      id: "g-cn-144",
      subject: "语文",
      type: "rhetoric",
      prompt: "“那点薄雪好像忽然害了羞，微微露出点粉色”用了什么修辞？",
      options: ["拟人", "排比", "设问", "借代"],
      answer: "拟人",
      explanation: "把雪写成会害羞，属于拟人。",
      level: "初中基础题"
    },
    {
      id: "g-cn-145",
      subject: "语文",
      type: "famous-person",
      prompt: "“三顾茅庐”的故事主要和谁有关？",
      options: ["刘备", "项羽", "曹操", "岳飞"],
      answer: "刘备",
      explanation: "“三顾茅庐”主要写刘备请诸葛亮出山。",
      level: "初中常识题"
    },
    {
      id: "g-cn-146",
      subject: "语文",
      type: "famous-line-source",
      prompt: "“海内存知己，天涯若比邻”出自哪位诗人？",
      options: ["王勃", "李白", "杜甫", "白居易"],
      answer: "王勃",
      explanation: "这两句出自王勃《送杜少府之任蜀州》。",
      level: "初中基础题"
    },
    {
      id: "g-cn-147",
      subject: "语文",
      type: "sentence-link",
      prompt: "下列句子衔接更恰当的是？",
      options: ["因为努力练习，所以他进步很快。", "所以他进步很快，因为努力练习。", "他进步很快，因为所以练习。", "因为进步很快，所以努力练习。"],
      answer: "因为努力练习，所以他进步很快。",
      explanation: "前因后果关系表达最清楚。",
      level: "初中送分题"
    },
    {
      id: "g-cn-148",
      subject: "语文",
      type: "word-meaning",
      prompt: "“迁客骚人”里的“迁客”更接近下面哪类人？",
      options: ["被贬谪的官员", "外出游玩的客人", "商旅行人", "读书人"],
      answer: "被贬谪的官员",
      explanation: "“迁客”常指被贬谪到外地的官员。",
      level: "初中基础题"
    },
    {
      id: "g-cn-149",
      subject: "语文",
      type: "writer-work",
      prompt: "《桃花源记》的作者是谁？",
      options: ["陶渊明", "王维", "韩愈", "苏轼"],
      answer: "陶渊明",
      explanation: "《桃花源记》是陶渊明的名篇。",
      level: "初中常识题"
    },
    {
      id: "g-cn-150",
      subject: "语文",
      type: "expression",
      prompt: "说明文主要以什么为主要目的？",
      options: ["介绍事物或事理", "塑造人物形象", "抒发个人情感", "讲述传奇故事"],
      answer: "介绍事物或事理",
      explanation: "说明文主要用于介绍事物特点或说明道理。",
      level: "初中送分题"
    },
    {
      id: "g-cn-151",
      subject: "语文",
      type: "classical-word",
      prompt: "文言文中“顾”在“元方入门不顾”里更接近什么？",
      options: ["回头看", "照顾", "顾客", "考虑"],
      answer: "回头看",
      explanation: "这里的“顾”更接近“回头看”。",
      level: "初中基础题"
    },
    {
      id: "g-cn-152",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“历历在目”更接近下面哪种意思？",
      options: ["看得清清楚楚", "走得很快", "听得很认真", "记得很辛苦"],
      answer: "看得清清楚楚",
      explanation: "“历历在目”形容看得很清楚。",
      level: "初中基础题"
    },
    {
      id: "g-cn-153",
      subject: "语文",
      type: "culture",
      prompt: "“三曹”通常不包括下列哪一位？",
      options: ["曹植", "曹丕", "曹操", "曹雪芹"],
      answer: "曹雪芹",
      explanation: "“三曹”通常指曹操、曹丕、曹植。",
      level: "高中常识题"
    },
    {
      id: "g-cn-154",
      subject: "语文",
      type: "poetry-emotion",
      prompt: "“国破山河在，城春草木深”主要表达了什么情感？",
      options: ["忧国伤时", "闲适喜悦", "羁旅行役", "儿女情长"],
      answer: "忧国伤时",
      explanation: "诗句表达了战乱中的忧国伤时之情。",
      level: "高中基础题"
    },
    {
      id: "g-cn-155",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“不胫而走”更接近下面哪种意思？",
      options: ["消息迅速传播", "走路不稳", "腿脚不方便", "事情无法进行"],
      answer: "消息迅速传播",
      explanation: "“不胫而走”常形容消息传播很快。",
      level: "高中基础题"
    },
    {
      id: "g-cn-156",
      subject: "语文",
      type: "quote-source",
      prompt: "“采菊东篱下，悠然见南山”出自谁的作品？",
      options: ["陶渊明", "王维", "孟浩然", "李白"],
      answer: "陶渊明",
      explanation: "这句诗出自陶渊明的作品。",
      level: "高中常识题"
    },
    {
      id: "g-cn-157",
      subject: "语文",
      type: "argument",
      prompt: "引用名人名言来证明观点，最接近哪种论证方法？",
      options: ["引用论证", "比喻论证", "举例论证", "对比论证"],
      answer: "引用论证",
      explanation: "借助名言来证明观点，属于引用论证。",
      level: "高中送分题"
    },
    {
      id: "g-cn-158",
      subject: "语文",
      type: "classical-word",
      prompt: "文言文中“走送之”里的“走”更接近什么？",
      options: ["跑", "走路", "离开", "赶路"],
      answer: "跑",
      explanation: "这里的“走”是“跑”的意思。",
      level: "高中基础题"
    },
    {
      id: "g-cn-159",
      subject: "语文",
      type: "poetry-emotion",
      prompt: "“问君能有几多愁，恰似一江春水向东流”主要写什么？",
      options: ["愁绪深重", "豪情万丈", "山水优美", "友谊真挚"],
      answer: "愁绪深重",
      explanation: "这句词主要表达绵长深重的愁绪。",
      level: "高中基础题"
    },
    {
      id: "g-cn-160",
      subject: "语文",
      type: "literature-work",
      prompt: "《阿房宫赋》的作者是谁？",
      options: ["杜牧", "韩愈", "柳宗元", "王安石"],
      answer: "杜牧",
      explanation: "《阿房宫赋》是杜牧的名篇。",
      level: "高中常识题"
    },
    {
      id: "g-cn-161",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“安土重迁”更接近下面哪种意思？",
      options: ["留恋故土，不愿迁移", "很重视搬家", "喜欢到处旅行", "做事很保守"],
      answer: "留恋故土，不愿迁移",
      explanation: "“安土重迁”常指留恋故土，不轻易搬迁。",
      level: "高中基础题"
    },
    {
      id: "g-cn-162",
      subject: "语文",
      type: "culture",
      prompt: "“乐府双璧”通常指《孔雀东南飞》和哪一部作品？",
      options: ["《木兰诗》", "《离骚》", "《短歌行》", "《长歌行》"],
      answer: "《木兰诗》",
      explanation: "“乐府双璧”通常指《孔雀东南飞》和《木兰诗》。",
      level: "高中常识题"
    },
    {
      id: "g-cn-163",
      subject: "语文",
      type: "argument",
      prompt: "把两种事物放在一起比较来证明观点，最接近哪种论证方法？",
      options: ["对比论证", "举例论证", "引用论证", "比喻论证"],
      answer: "对比论证",
      explanation: "通过比较差异来证明观点，属于对比论证。",
      level: "高中送分题"
    },
    {
      id: "g-cn-164",
      subject: "语文",
      type: "classical-word",
      prompt: "文言文中“谢”在“长跪而谢之”里更接近什么？",
      options: ["道歉", "感谢", "推辞", "告别"],
      answer: "道歉",
      explanation: "这里的“谢”更接近道歉、认错之意。",
      level: "高中基础题"
    },
    {
      id: "g-cn-165",
      subject: "语文",
      type: "poetry-emotion",
      prompt: "“念天地之悠悠，独怆然而涕下”主要表达了什么情感？",
      options: ["孤独感伤", "轻松喜悦", "愤怒不平", "思乡怀人"],
      answer: "孤独感伤",
      explanation: "诗句表达了面对天地时的孤独和感伤。",
      level: "高中基础题"
    },
    {
      id: "g-cn-166",
      subject: "语文",
      type: "literature-work",
      prompt: "《滕王阁序》的作者是谁？",
      options: ["王勃", "杨炯", "骆宾王", "卢照邻"],
      answer: "王勃",
      explanation: "《滕王阁序》是王勃的代表作。",
      level: "高中常识题"
    },
    {
      id: "g-cn-167",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“筚路蓝缕”更接近下面哪种意思？",
      options: ["创业艰辛", "穿着华丽", "道路遥远", "心情悲伤"],
      answer: "创业艰辛",
      explanation: "“筚路蓝缕”常用来形容创业的艰辛。",
      level: "高中基础题"
    },
    {
      id: "g-cn-168",
      subject: "语文",
      type: "quote-source",
      prompt: "“路漫漫其修远兮，吾将上下而求索”出自哪部作品？",
      options: ["《离骚》", "《九歌》", "《木兰诗》", "《归去来兮辞》"],
      answer: "《离骚》",
      explanation: "这句名句出自屈原《离骚》。",
      level: "高中基础题"
    },
    {
      id: "g-cn-169",
      subject: "语文",
      type: "argument",
      prompt: "把抽象道理说得生动形象，最接近哪种论证方法？",
      options: ["比喻论证", "引用论证", "举例论证", "归纳论证"],
      answer: "比喻论证",
      explanation: "把道理比作具体事物，属于比喻论证。",
      level: "高中送分题"
    },
    {
      id: "g-cn-170",
      subject: "语文",
      type: "classical-word",
      prompt: "文言文中“狱”更接近下面哪种意思？",
      options: ["案件", "牢房", "审判者", "刑具"],
      answer: "案件",
      explanation: "文言文中的“狱”常指案件。",
      level: "高中基础题"
    },
    {
      id: "g-cn-171",
      subject: "语文",
      type: "poetry-emotion",
      prompt: "“羌管悠悠霜满地，人不寐，将军白发征夫泪”主要写什么情感？",
      options: ["边塞愁苦", "田园闲适", "恋爱甜蜜", "节日喜庆"],
      answer: "边塞愁苦",
      explanation: "词句主要写边塞生活中的愁苦与苍凉。",
      level: "高中基础题"
    },
    {
      id: "g-cn-172",
      subject: "语文",
      type: "literature-work",
      prompt: "《赤壁赋》的作者是谁？",
      options: ["苏轼", "欧阳修", "王安石", "曾巩"],
      answer: "苏轼",
      explanation: "《赤壁赋》是苏轼的名篇。",
      level: "高中常识题"
    },
    {
      id: "g-cn-173",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“罚不当罪”更接近下面哪种意思？",
      options: ["处罚过重或不恰当", "奖励很多", "法律严明", "有罪不罚"],
      answer: "处罚过重或不恰当",
      explanation: "“罚不当罪”指处罚和罪行不相称。",
      level: "高中基础题"
    },
    {
      id: "g-cn-174",
      subject: "语文",
      type: "culture",
      prompt: "“初唐四杰”通常不包括下列哪一位？",
      options: ["白居易", "王勃", "杨炯", "骆宾王"],
      answer: "白居易",
      explanation: "“初唐四杰”不包括白居易。",
      level: "高中常识题"
    },
    {
      id: "g-cn-175",
      subject: "语文",
      type: "classical-chinese",
      prompt: "文言文中“因”在“因利乘便”里更接近什么？",
      options: ["凭借", "因为", "于是", "沿着"],
      answer: "凭借",
      explanation: "这里的“因”更接近“凭借”。",
      level: "大学基础题"
    },
    {
      id: "g-cn-176",
      subject: "语文",
      type: "literature-style",
      prompt: "《子夜》更接近哪种文学体裁？",
      options: ["长篇小说", "话剧", "词", "笔记小说"],
      answer: "长篇小说",
      explanation: "《子夜》是茅盾的长篇小说。",
      level: "大学常识题"
    },
    {
      id: "g-cn-177",
      subject: "语文",
      type: "idiom-usage",
      prompt: "下列更适合形容“说话做事前后不一致”的成语是？",
      options: ["自相矛盾", "锲而不舍", "高屋建瓴", "一针见血"],
      answer: "自相矛盾",
      explanation: "“自相矛盾”指前后说法或做法互相冲突。",
      level: "大学基础题"
    },
    {
      id: "g-cn-178",
      subject: "语文",
      type: "quote-source",
      prompt: "“吾生也有涯，而知也无涯”出自哪部典籍？",
      options: ["《庄子》", "《论语》", "《孟子》", "《韩非子》"],
      answer: "《庄子》",
      explanation: "这句名言出自《庄子》。",
      level: "大学基础题"
    },
    {
      id: "g-cn-179",
      subject: "语文",
      type: "culture",
      prompt: "“伯仲叔季”中“伯”通常表示兄弟排行中的哪一位？",
      options: ["老大", "老二", "老三", "最小"],
      answer: "老大",
      explanation: "“伯仲叔季”里“伯”通常指排行老大。",
      level: "大学常识题"
    },
    {
      id: "g-cn-180",
      subject: "语文",
      type: "literature-work",
      prompt: "《家》的作者是谁？",
      options: ["巴金", "老舍", "鲁迅", "沈从文"],
      answer: "巴金",
      explanation: "《家》是巴金的代表作之一。",
      level: "大学送分题"
    }
  ],
  math: [
    {
      id: "g-ma-1",
      subject: "数学",
      type: "clock-reading",
      prompt: "分针指向12，时针指向3，这时是几点？",
      options: ["3点", "6点", "9点", "12点"],
      answer: "3点",
      explanation: "分针指12表示整点，时针指3就是3点。",
      level: "小学送分题"
    },
    {
      id: "g-ma-2",
      subject: "数学",
      type: "unit-conversion",
      prompt: "1米等于多少厘米？",
      options: ["10厘米", "100厘米", "1000厘米", "1厘米"],
      answer: "100厘米",
      explanation: "1米等于100厘米。",
      level: "小学送分题"
    },
    {
      id: "g-ma-3",
      subject: "数学",
      type: "fraction-compare",
      prompt: "下面哪个分数更大？",
      options: ["1/2", "1/4", "1/8", "1/10"],
      answer: "1/2",
      explanation: "分子相同为1时，分母越小，这个分数越大。",
      level: "小学基础题"
    },
    {
      id: "g-ma-4",
      subject: "数学",
      type: "average",
      prompt: "3个数分别是2、4、6，它们的平均数是？",
      options: ["3", "4", "5", "6"],
      answer: "4",
      explanation: "先求和得12，再除以3，结果是4。",
      level: "小学基础题"
    },
    {
      id: "g-ma-5",
      subject: "数学",
      type: "perimeter",
      prompt: "边长是4厘米的正方形，周长是多少厘米？",
      options: ["8", "12", "16", "20"],
      answer: "16",
      explanation: "正方形周长等于边长乘4。",
      level: "小学基础题"
    },
    {
      id: "g-ma-6",
      subject: "数学",
      type: "decimal",
      prompt: "下面哪个数是小数？",
      options: ["3.5", "35", "三十五", "3/5"],
      answer: "3.5",
      explanation: "带有小数点的数是小数。",
      level: "小学送分题"
    },
    {
      id: "g-ma-7",
      subject: "数学",
      type: "ratio",
      prompt: "一个班男生和女生人数相同，男生和女生的人数比是？",
      options: ["1:1", "1:2", "2:1", "2:2:1"],
      answer: "1:1",
      explanation: "人数相同，最简比就是1:1。",
      level: "小学基础题"
    },
    {
      id: "g-ma-8",
      subject: "数学",
      type: "shape",
      prompt: "下面哪种图形没有角？",
      options: ["圆", "三角形", "长方形", "正方形"],
      answer: "圆",
      explanation: "圆没有角，其余几个图形都有角。",
      level: "小学送分题"
    },
    {
      id: "g-ma-9",
      subject: "数学",
      type: "clock-half",
      prompt: "半小时有多少分钟？",
      options: ["15 分钟", "30 分钟", "45 分钟", "60 分钟"],
      answer: "30 分钟",
      explanation: "半小时也就是 30 分钟。",
      level: "小学送分题"
    },
    {
      id: "g-ma-10",
      subject: "数学",
      type: "shape-sides",
      prompt: "正方形有几条边？",
      options: ["2 条", "3 条", "4 条", "5 条"],
      answer: "4 条",
      explanation: "正方形由四条边围成，所以有 4 条边。",
      level: "小学送分题"
    },
    {
      id: "g-ma-11",
      subject: "数学",
      type: "area",
      prompt: "长方形长 5 厘米、宽 3 厘米，面积是多少平方厘米？",
      options: ["8", "15", "16", "20"],
      answer: "15",
      explanation: "长方形面积等于长乘宽，5 × 3 = 15。",
      level: "小学基础题"
    },
    {
      id: "g-ma-12",
      subject: "数学",
      type: "clock-half",
      prompt: "“8点半”更接近下面哪种写法？",
      options: ["8:30", "8:15", "8:45", "9:30"],
      answer: "8:30",
      explanation: "“半”表示 30 分，所以是 8:30。",
      level: "小学基础题"
    },
    {
      id: "g-ma-13",
      subject: "数学",
      type: "unit-weight",
      prompt: "下面更适合用“千克”作单位的是？",
      options: ["一袋大米", "一支铅笔", "一块橡皮", "一张纸"],
      answer: "一袋大米",
      explanation: "较重的物体更常用千克作单位。",
      level: "小学常识题"
    },
    {
      id: "g-ma-14",
      subject: "数学",
      type: "division",
      prompt: "18 个苹果平均分给 3 个小朋友，每人几个？",
      options: ["5", "6", "7", "8"],
      answer: "6",
      explanation: "18 ÷ 3 = 6。",
      level: "小学基础题"
    },
    {
      id: "g-ma-15",
      subject: "数学",
      type: "digit-order",
      prompt: "下面哪个数最大？",
      options: ["398", "403", "389", "399"],
      answer: "403",
      explanation: "比较这几个数的大小，403 最大。",
      level: "小学基础题"
    },
    {
      id: "g-ma-16",
      subject: "数学",
      type: "perimeter",
      prompt: "长方形长 6 厘米、宽 2 厘米，周长是多少厘米？",
      options: ["8", "12", "16", "24"],
      answer: "16",
      explanation: "周长等于 (6 + 2) × 2 = 16。",
      level: "小学基础题"
    },
    {
      id: "g-ma-17",
      subject: "数学",
      type: "fraction-compare",
      prompt: "下面哪个分数最小？",
      options: ["1/3", "1/5", "1/2", "1/4"],
      answer: "1/5",
      explanation: "分子都为 1 时，分母越大，分数越小。",
      level: "小学基础题"
    },
    {
      id: "g-ma-18",
      subject: "数学",
      type: "money-compare",
      prompt: "3 元 5 角写成小数是多少？",
      options: ["3.05 元", "3.5 元", "35 元", "0.35 元"],
      answer: "3.5 元",
      explanation: "5 角就是 0.5 元，所以 3 元 5 角是 3.5 元。",
      level: "小学送分题"
    },
    {
      id: "g-ma-19",
      subject: "数学",
      type: "average",
      prompt: "5、5、8 这三个数的平均数是？",
      options: ["5", "6", "7", "8"],
      answer: "6",
      explanation: "先求和得 18，再除以 3，结果是 6。",
      level: "小学基础题"
    },
    {
      id: "g-ma-20",
      subject: "数学",
      type: "shape-angle",
      prompt: "三角形有几个角？",
      options: ["2 个", "3 个", "4 个", "5 个"],
      answer: "3 个",
      explanation: "三角形有 3 个角。",
      level: "小学送分题"
    },
    {
      id: "g-ma-21",
      subject: "数学",
      type: "integer-operation",
      prompt: "(-3) + 5 等于多少？",
      options: ["2", "-2", "8", "-8"],
      answer: "2",
      explanation: "负三加五，结果是二。",
      level: "初中送分题"
    },
    {
      id: "g-ma-22",
      subject: "数学",
      type: "equation",
      prompt: "如果 2x = 10，那么 x 等于多少？",
      options: ["3", "4", "5", "6"],
      answer: "5",
      explanation: "方程两边同时除以 2，得到 x = 5。",
      level: "初中送分题"
    },
    {
      id: "g-ma-23",
      subject: "数学",
      type: "power",
      prompt: "2 的 3 次方等于多少？",
      options: ["5", "6", "8", "9"],
      answer: "8",
      explanation: "2 的 3 次方就是 2×2×2 = 8。",
      level: "初中基础题"
    },
    {
      id: "g-ma-24",
      subject: "数学",
      type: "triangle-angle",
      prompt: "三角形内角和一共是多少度？",
      options: ["90°", "180°", "270°", "360°"],
      answer: "180°",
      explanation: "任意三角形的内角和都是 180°。",
      level: "初中送分题"
    },
    {
      id: "g-ma-25",
      subject: "数学",
      type: "probability",
      prompt: "一个袋子里只有 3 个红球和 1 个蓝球，任取 1 个，更可能取到什么颜色？",
      options: ["红色", "蓝色", "一样可能", "无法判断"],
      answer: "红色",
      explanation: "红球数量更多，所以取到红球的可能性更大。",
      level: "初中基础题"
    },
    {
      id: "g-ma-26",
      subject: "数学",
      type: "integer-operation",
      prompt: "(-6) ÷ 2 等于多少？",
      options: ["-3", "3", "-8", "8"],
      answer: "-3",
      explanation: "负数除以正数，结果是负数，6 ÷ 2 = 3。",
      level: "初中送分题"
    },
    {
      id: "g-ma-27",
      subject: "数学",
      type: "equation",
      prompt: "如果 x + 7 = 12，那么 x 等于多少？",
      options: ["3", "4", "5", "6"],
      answer: "5",
      explanation: "12 减去 7，得到 x = 5。",
      level: "初中送分题"
    },
    {
      id: "g-ma-28",
      subject: "数学",
      type: "monomial",
      prompt: "3a + 2a 等于多少？",
      options: ["5a", "6a", "5a2", "a5"],
      answer: "5a",
      explanation: "同类项可以合并，3a + 2a = 5a。",
      level: "初中基础题"
    },
    {
      id: "g-ma-29",
      subject: "数学",
      type: "geometry",
      prompt: "两条平行线被第三条直线所截，同位角通常怎样？",
      options: ["相等", "互补", "互余", "不确定"],
      answer: "相等",
      explanation: "平行线被截时，同位角相等。",
      level: "初中基础题"
    },
    {
      id: "g-ma-30",
      subject: "数学",
      type: "statistics",
      prompt: "一组数据是 2、3、3、5，众数是哪个数？",
      options: ["2", "3", "4", "5"],
      answer: "3",
      explanation: "出现次数最多的数是 3，所以众数是 3。",
      level: "初中基础题"
    },
    {
      id: "g-ma-31",
      subject: "数学",
      type: "integer-operation",
      prompt: "(-4) × (-2) 等于多少？",
      options: ["-8", "8", "-6", "6"],
      answer: "8",
      explanation: "两个负数相乘，结果为正，4×2=8。",
      level: "初中送分题"
    },
    {
      id: "g-ma-32",
      subject: "数学",
      type: "bar-chart",
      prompt: "看条形统计图时，最长的条通常表示什么？",
      options: ["数量最多", "数量最少", "没有数量", "无法判断"],
      answer: "数量最多",
      explanation: "在条形统计图中，条越长通常表示对应的数量越多。",
      level: "初中送分题"
    },
    {
      id: "g-ma-33",
      subject: "数学",
      type: "monomial",
      prompt: "4b - b 等于多少？",
      options: ["3b", "4", "b3", "5b"],
      answer: "3b",
      explanation: "同类项可以合并，4b - b = 3b。",
      level: "初中基础题"
    },
    {
      id: "g-ma-34",
      subject: "数学",
      type: "geometry",
      prompt: "长方形的对角线通常怎样？",
      options: ["相等", "互相垂直", "一定不等", "一定平行"],
      answer: "相等",
      explanation: "长方形两条对角线长度相等。",
      level: "初中基础题"
    },
    {
      id: "g-ma-35",
      subject: "数学",
      type: "statistics",
      prompt: "一组数 1、2、3、4、5 的平均数是多少？",
      options: ["2", "2.5", "3", "3.5"],
      answer: "3",
      explanation: "总和为 15，除以 5，平均数是 3。",
      level: "初中基础题"
    },
    {
      id: "g-ma-36",
      subject: "数学",
      type: "triangle-angle-sum",
      prompt: "三角形内角和等于多少度？",
      options: ["90 度", "120 度", "180 度", "360 度"],
      answer: "180 度",
      explanation: "三角形的内角和恒等于 180 度。",
      level: "初中送分题"
    },
    {
      id: "g-ma-37",
      subject: "数学",
      type: "equation",
      prompt: "如果 x - 4 = 9，那么 x 等于多少？",
      options: ["5", "11", "13", "36"],
      answer: "13",
      explanation: "方程两边同时加 4，得到 x = 13。",
      level: "初中送分题"
    },
    {
      id: "g-ma-38",
      subject: "数学",
      type: "monomial",
      prompt: "2y + 5y 等于多少？",
      options: ["7y", "10y", "7", "y7"],
      answer: "7y",
      explanation: "同类项相加，2y + 5y = 7y。",
      level: "初中基础题"
    },
    {
      id: "g-ma-39",
      subject: "数学",
      type: "geometry",
      prompt: "正方形的四个角都是多少度？",
      options: ["45°", "60°", "90°", "120°"],
      answer: "90°",
      explanation: "正方形四个角都是直角。",
      level: "初中送分题"
    },
    {
      id: "g-ma-40",
      subject: "数学",
      type: "statistics",
      prompt: "一组数据中出现次数最多的数叫做什么？",
      options: ["平均数", "众数", "中位数", "方差"],
      answer: "众数",
      explanation: "众数就是一组数据里出现次数最多的数。",
      level: "初中基础题"
    },
    {
      id: "g-ma-41",
      subject: "数学",
      type: "set",
      prompt: "空集通常记作什么？",
      options: ["∅", "∞", "π", "△"],
      answer: "∅",
      explanation: "空集通常记作 ∅。",
      level: "高中送分题"
    },
    {
      id: "g-ma-42",
      subject: "数学",
      type: "function",
      prompt: "函数 y = 2x + 1 中，当 x = 1 时，y 等于多少？",
      options: ["1", "2", "3", "4"],
      answer: "3",
      explanation: "把 x = 1 代入，得到 y = 2×1 + 1 = 3。",
      level: "高中送分题"
    },
    {
      id: "g-ma-43",
      subject: "数学",
      type: "exponent-equation",
      prompt: "若 2^x = 8，那么 x 等于多少？",
      options: ["2", "3", "4", "8"],
      answer: "3",
      explanation: "因为 2^3 = 8，所以 x = 3。",
      level: "高中送分题"
    },
    {
      id: "g-ma-44",
      subject: "数学",
      type: "vector",
      prompt: "两个向量方向相同，长度也相同，通常可以认为它们怎样？",
      options: ["相等", "相反", "垂直", "无法比较"],
      answer: "相等",
      explanation: "方向和长度都相同的向量通常视为相等向量。",
      level: "高中基础题"
    },
    {
      id: "g-ma-45",
      subject: "数学",
      type: "probability",
      prompt: "掷一枚普通硬币一次，出现正面的概率是多少？",
      options: ["1/4", "1/3", "1/2", "1"],
      answer: "1/2",
      explanation: "硬币两面机会相同，出现正面的概率是 1/2。",
      level: "高中送分题"
    },
    {
      id: "g-ma-46",
      subject: "数学",
      type: "set",
      prompt: "集合 {1,2,3} 中一共有多少个元素？",
      options: ["1", "2", "3", "4"],
      answer: "3",
      explanation: "这个集合中有 1、2、3 三个不同元素。",
      level: "高中送分题"
    },
    {
      id: "g-ma-47",
      subject: "数学",
      type: "function",
      prompt: "函数 y = x^2 中，当 x = 2 时，y 等于多少？",
      options: ["2", "4", "6", "8"],
      answer: "4",
      explanation: "把 x = 2 代入，得到 y = 2^2 = 4。",
      level: "高中送分题"
    },
    {
      id: "g-ma-48",
      subject: "数学",
      type: "coordinate-plane",
      prompt: "点 A(2, 3) 位于第几象限？",
      options: ["第一象限", "第二象限", "第三象限", "第四象限"],
      answer: "第一象限",
      explanation: "横坐标和纵坐标都大于 0，在第一象限。",
      level: "高中送分题"
    },
    {
      id: "g-ma-49",
      subject: "数学",
      type: "vector",
      prompt: "零向量的长度通常是多少？",
      options: ["0", "1", "无法确定", "无穷大"],
      answer: "0",
      explanation: "零向量的模为 0。",
      level: "高中基础题"
    },
    {
      id: "g-ma-50",
      subject: "数学",
      type: "probability",
      prompt: "一个袋子里有 4 个白球、1 个黑球，任取 1 个，取到白球的概率是多少？",
      options: ["1/5", "2/5", "4/5", "1"],
      answer: "4/5",
      explanation: "一共 5 个球，白球有 4 个，所以概率是 4/5。",
      level: "高中基础题"
    },
    {
      id: "g-ma-51",
      subject: "数学",
      type: "set",
      prompt: "集合 {a, b, c} 与集合 {c, b, a} 的关系更接近什么？",
      options: ["相等", "不相等", "互补", "互斥"],
      answer: "相等",
      explanation: "集合中的元素顺序不影响集合本身。",
      level: "高中基础题"
    },
    {
      id: "g-ma-52",
      subject: "数学",
      type: "function",
      prompt: "函数 y = 3x 中，当 x = 2 时，y 等于多少？",
      options: ["3", "5", "6", "9"],
      answer: "6",
      explanation: "把 x = 2 代入，得到 y = 3×2 = 6。",
      level: "高中送分题"
    },
    {
      id: "g-ma-53",
      subject: "数学",
      type: "set-cardinality",
      prompt: "集合 {2, 4, 6} 中共有几个元素？",
      options: ["2", "3", "4", "6"],
      answer: "3",
      explanation: "集合里有 2、4、6 三个不同元素。",
      level: "高中送分题"
    },
    {
      id: "g-ma-54",
      subject: "数学",
      type: "vector",
      prompt: "向量的两个基本要素通常是什么？",
      options: ["大小和方向", "颜色和长度", "面积和周长", "质量和速度"],
      answer: "大小和方向",
      explanation: "向量通常由大小和方向两个要素确定。",
      level: "高中基础题"
    },
    {
      id: "g-ma-55",
      subject: "数学",
      type: "probability",
      prompt: "掷一个普通骰子一次，出现 6 点的概率是多少？",
      options: ["1/3", "1/4", "1/5", "1/6"],
      answer: "1/6",
      explanation: "骰子有 6 个等可能结果，出现 6 点的概率是 1/6。",
      level: "高中送分题"
    },
    {
      id: "g-ma-56",
      subject: "数学",
      type: "set",
      prompt: "如果元素 a 属于集合 A，通常记作什么？",
      options: ["a∈A", "a⊂A", "A∈a", "A⊂a"],
      answer: "a∈A",
      explanation: "元素属于集合，通常记作 a∈A。",
      level: "高中送分题"
    },
    {
      id: "g-ma-57",
      subject: "数学",
      type: "function",
      prompt: "函数 y = x + 2 中，当 x = 3 时，y 等于多少？",
      options: ["3", "4", "5", "6"],
      answer: "5",
      explanation: "把 x = 3 代入，得到 y = 3 + 2 = 5。",
      level: "高中送分题"
    },
    {
      id: "g-ma-58",
      subject: "数学",
      type: "function-trend",
      prompt: "一次函数 y = 3x + 2 中，x 增大时，y 通常怎样变化？",
      options: ["增大", "减小", "不变", "先增大后减小"],
      answer: "增大",
      explanation: "一次函数的系数 3 大于 0，所以 x 增大时 y 也增大。",
      level: "高中送分题"
    },
    {
      id: "g-ma-59",
      subject: "数学",
      type: "vector",
      prompt: "向量 a 与向量 -a 的关系更接近什么？",
      options: ["大小相等、方向相反", "大小和方向都相同", "互相垂直", "无法比较"],
      answer: "大小相等、方向相反",
      explanation: "向量 a 与 -a 长度相同，方向相反。",
      level: "高中基础题"
    },
    {
      id: "g-ma-60",
      subject: "数学",
      type: "probability",
      prompt: "从 1 到 10 的整数中任取 1 个，取到偶数的概率是多少？",
      options: ["1/5", "2/5", "1/2", "3/5"],
      answer: "1/2",
      explanation: "1 到 10 中有 5 个偶数，共 10 个数，所以概率是 5/10 = 1/2。",
      level: "高中基础题"
    },
    {
      id: "g-ma-61",
      subject: "数学",
      type: "function",
      prompt: "函数 y = x + 1 中，当 x = 4 时，y 等于多少？",
      options: ["3", "4", "5", "6"],
      answer: "5",
      explanation: "把 x = 4 代入，得到 y = 4 + 1 = 5。",
      level: "大学送分题"
    },
    {
      id: "g-ma-62",
      subject: "数学",
      type: "derivative",
      prompt: "函数 y = x^2 的导函数是？",
      options: ["x", "2x", "x^2", "2"],
      answer: "2x",
      explanation: "x^2 求导得到 2x。",
      level: "大学基础题"
    },
    {
      id: "g-ma-63",
      subject: "数学",
      type: "set",
      prompt: "“∈” 符号通常表示什么？",
      options: ["属于", "包含于", "大于", "约等于"],
      answer: "属于",
      explanation: "元素属于集合，通常用“∈”表示。",
      level: "大学送分题"
    },
    {
      id: "g-ma-64",
      subject: "数学",
      type: "probability",
      prompt: "掷一个普通骰子一次，出现偶数的概率是多少？",
      options: ["1/3", "1/2", "2/3", "5/6"],
      answer: "1/2",
      explanation: "骰子共有 6 面，偶数有 2、4、6 三面，所以概率是 3/6 = 1/2。",
      level: "大学送分题"
    },
    {
      id: "g-ma-65",
      subject: "数学",
      type: "vector",
      prompt: "向量的模更接近表示什么？",
      options: ["向量的长度", "向量的方向", "向量的颜色", "向量的个数"],
      answer: "向量的长度",
      explanation: "向量的模就是向量的长度。",
      level: "大学基础题"
    },
    {
      id: "g-ma-66",
      subject: "数学",
      type: "function",
      prompt: "函数 y = 2x - 1 中，当 x = 3 时，y 等于多少？",
      options: ["3", "4", "5", "6"],
      answer: "5",
      explanation: "把 x = 3 代入，得到 y = 2×3 - 1 = 5。",
      level: "大学送分题"
    },
    {
      id: "g-ma-67",
      subject: "数学",
      type: "derivative",
      prompt: "常数函数 y = 5 的导数是多少？",
      options: ["0", "1", "5", "不存在"],
      answer: "0",
      explanation: "常数函数的导数为 0。",
      level: "大学基础题"
    },
    {
      id: "g-ma-68",
      subject: "数学",
      type: "set",
      prompt: "如果 A 包含于 B，通常记作什么？",
      options: ["A⊂B", "A∈B", "B∈A", "A>B"],
      answer: "A⊂B",
      explanation: "集合 A 包含于集合 B，常记作 A⊂B。",
      level: "大学送分题"
    },
    {
      id: "g-ma-69",
      subject: "数学",
      type: "probability",
      prompt: "从 1 到 5 的整数中任取 1 个，取到奇数的概率是多少？",
      options: ["1/5", "2/5", "3/5", "4/5"],
      answer: "3/5",
      explanation: "1 到 5 中奇数有 1、3、5 共 3 个，所以概率是 3/5。",
      level: "大学送分题"
    },
    {
      id: "g-ma-70",
      subject: "数学",
      type: "vector",
      prompt: "两个零向量通常可以认为怎样？",
      options: ["相等", "相反", "垂直", "无法比较"],
      answer: "相等",
      explanation: "所有零向量通常都视为相等。",
      level: "大学基础题"
    },
    {
      id: "g-ma-71",
      subject: "数学",
      type: "set-subset",
      prompt: "若集合 A 的所有元素都属于 B，那么 A 与 B 的关系通常是？",
      options: ["A 是 B 的子集", "A 是 B 的并集", "A 是 B 的补集", "A 属于 B"],
      answer: "A 是 B 的子集",
      explanation: "如果 A 中每个元素都属于 B，就说明 A 是 B 的子集。",
      level: "大学基础题"
    },
    {
      id: "g-ma-72",
      subject: "数学",
      type: "limit",
      prompt: "当 x 趋近于 0 时，常数函数 y = 5 的极限是多少？",
      options: ["0", "1", "5", "不存在"],
      answer: "5",
      explanation: "常数函数在任意点附近的极限都等于这个常数。",
      level: "大学基础题"
    },
    {
      id: "g-ma-73",
      subject: "数学",
      type: "matrix-entry-count",
      prompt: "一个 2×2 矩阵里通常有几个元素？",
      options: ["2", "4", "6", "8"],
      answer: "4",
      explanation: "2 行 2 列，共 4 个位置，所以有 4 个元素。",
      level: "大学送分题"
    },
    {
      id: "g-ma-74",
      subject: "数学",
      type: "set",
      prompt: "全集 U 中不属于集合 A 的元素所成的集合，通常叫做 A 的什么？",
      options: ["补集", "交集", "并集", "子集"],
      answer: "补集",
      explanation: "在全集背景下，不属于 A 的元素构成 A 的补集。",
      level: "大学基础题"
    },
    {
      id: "g-ma-75",
      subject: "数学",
      type: "probability",
      prompt: "从 1 到 4 的整数中任取 1 个，取到大于 2 的数的概率是多少？",
      options: ["1/4", "1/2", "3/4", "1"],
      answer: "1/2",
      explanation: "大于 2 的数有 3 和 4，共 2 个，概率是 2/4 = 1/2。",
      level: "大学送分题"
    },
    {
      id: "g-ma-76",
      subject: "数学",
      type: "function",
      prompt: "函数 y = 2x + 3 中，当 x = 0 时，y 等于多少？",
      options: ["0", "2", "3", "5"],
      answer: "3",
      explanation: "把 x = 0 代入，得到 y = 2×0 + 3 = 3。",
      level: "大学送分题"
    },
    {
      id: "g-ma-77",
      subject: "数学",
      type: "derivative",
      prompt: "函数 y = 2x 的导数是多少？",
      options: ["0", "1", "2", "2x"],
      answer: "2",
      explanation: "一次函数 y = 2x 的导数为 2。",
      level: "大学基础题"
    },
    {
      id: "g-ma-78",
      subject: "数学",
      type: "limit",
      prompt: "当 x 趋近于 2 时，函数 y = x 的极限是多少？",
      options: ["0", "1", "2", "不存在"],
      answer: "2",
      explanation: "函数 y = x 在 x 趋近于 2 时，极限就是 2。",
      level: "大学基础题"
    },
    {
      id: "g-ma-79",
      subject: "数学",
      type: "complex-real-part",
      prompt: "复数 3 + 2i 的实部是多少？",
      options: ["2", "3", "5", "i"],
      answer: "3",
      explanation: "复数 a + bi 的实部是 a，所以这里是 3。",
      level: "大学送分题"
    },
    {
      id: "g-ma-80",
      subject: "数学",
      type: "set",
      prompt: "集合 A 与集合 B 中共同拥有的元素组成的集合，通常叫做什么？",
      options: ["交集", "并集", "补集", "子集"],
      answer: "交集",
      explanation: "共同拥有的元素组成的集合通常叫交集。",
      level: "大学基础题"
    },
    {
      id: "g-ma-81",
      subject: "数学",
      type: "limit",
      prompt: "当 x 趋近于 1 时，函数 y = x + 2 的极限是多少？",
      options: ["1", "2", "3", "不存在"],
      answer: "3",
      explanation: "把 x 趋近于 1 代入，函数值趋近于 3。",
      level: "大学基础题"
    },
    {
      id: "g-ma-82",
      subject: "数学",
      type: "trigonometry",
      prompt: "tan 45° 等于多少？",
      options: ["0", "1", "√2/2", "√3"],
      answer: "1",
      explanation: "常见特殊角中，tan 45° = 1。",
      level: "大学送分题"
    },
    {
      id: "g-ma-83",
      subject: "数学",
      type: "complex-number",
      prompt: "虚数单位 i 满足什么关系？",
      options: ["i^2 = -1", "i = 0", "i^2 = 1", "i > 1"],
      answer: "i^2 = -1",
      explanation: "复数中常规定义虚数单位 i 满足 i^2 = -1。",
      level: "大学基础题"
    },
    {
      id: "g-ma-84",
      subject: "数学",
      type: "integral",
      prompt: "不定积分更接近下面哪种运算的逆过程？",
      options: ["求导", "求极限", "解方程", "集合并集"],
      answer: "求导",
      explanation: "积分通常可看作求导的逆过程之一。",
      level: "大学基础题"
    },
    {
      id: "g-ma-85",
      subject: "数学",
      type: "vector-zero",
      prompt: "零向量的长度通常是？",
      options: ["0", "1", "无穷", "不确定"],
      answer: "0",
      explanation: "零向量的模等于 0。",
      level: "大学基础题"
    },
    {
      id: "g-ma-86",
      subject: "数学",
      type: "integral",
      prompt: "函数 y = x 的一个原函数更接近下面哪一个？",
      options: ["x^2/2", "2x", "x+1", "1/x"],
      answer: "x^2/2",
      explanation: "x^2/2 求导可得 x。",
      level: "大学基础题"
    },
    {
      id: "g-ma-87",
      subject: "数学",
      type: "complex-number",
      prompt: "复数 2 - 3i 的虚部是多少？",
      options: ["-3", "2", "3", "i"],
      answer: "-3",
      explanation: "复数 a + bi 中，虚部是 b，所以这里虚部是 -3。",
      level: "大学基础题"
    },
    {
      id: "g-ma-88",
      subject: "数学",
      type: "integral",
      prompt: "函数 y = 3 的一个原函数更接近下面哪一个？",
      options: ["3x", "x^3", "3/x", "0"],
      answer: "3x",
      explanation: "3x 求导得到 3。",
      level: "大学基础题"
    },
    {
      id: "g-ma-89",
      subject: "数学",
      type: "probability-coin",
      prompt: "抛一枚硬币一次，正面朝上的概率通常是多少？",
      options: ["0", "1/4", "1/2", "1"],
      answer: "1/2",
      explanation: "正反两面机会相同，所以正面朝上的概率通常是 1/2。",
      level: "大学送分题"
    },
    {
      id: "g-ma-90",
      subject: "数学",
      type: "limit",
      prompt: "当 x 趋近于 0 时，函数 y = x^2 的极限是多少？",
      options: ["0", "1", "2", "不存在"],
      answer: "0",
      explanation: "x 趋近于 0 时，x^2 也趋近于 0。",
      level: "大学基础题"
    },
    {
      id: "g-ma-91",
      subject: "数学",
      type: "set-notation",
      prompt: "符号“∈”通常表示什么？",
      options: ["属于", "包含于", "并集", "交集"],
      answer: "属于",
      explanation: "a ∈ A 表示元素 a 属于集合 A。",
      level: "大学送分题"
    },
    {
      id: "g-ma-92",
      subject: "数学",
      type: "function",
      prompt: "函数 y = 2x + 1 是哪一类常见函数？",
      options: ["一次函数", "二次函数", "指数函数", "反比例函数"],
      answer: "一次函数",
      explanation: "y = 2x + 1 符合一次函数 y = kx + b 的形式。",
      level: "大学送分题"
    },
    {
      id: "g-ma-93",
      subject: "数学",
      type: "matrix",
      prompt: "矩阵最接近下列哪种理解？",
      options: ["按行列排成的数表", "一条数轴", "一个角", "一段函数图像"],
      answer: "按行列排成的数表",
      explanation: "矩阵可以直观理解为按行和列排列起来的数表。",
      level: "大学基础题"
    },
    {
      id: "g-ma-94",
      subject: "数学",
      type: "probability",
      prompt: "掷一次普通骰子，出现偶数的概率是多少？",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: "1/2",
      explanation: "偶数有 2、4、6 三种，共 3 种结果，所以概率是 3/6。",
      level: "大学基础题"
    },
    {
      id: "g-ma-95",
      subject: "数学",
      type: "space-coordinate",
      prompt: "空间中通常用几个坐标来确定一个点的位置？",
      options: ["1 个", "2 个", "3 个", "4 个"],
      answer: "3 个",
      explanation: "空间直角坐标系通常用 x、y、z 三个坐标表示位置。",
      level: "大学送分题"
    },
    {
      id: "g-ma-96",
      subject: "数学",
      type: "equation",
      prompt: "方程 2x = 8 的解是几？",
      options: ["2", "4", "6", "8"],
      answer: "4",
      explanation: "两边同时除以 2，可得 x = 4。",
      level: "初中送分题"
    },
    {
      id: "g-ma-97",
      subject: "数学",
      type: "algebra",
      prompt: "3a + 2a 合并同类项后等于什么？",
      options: ["5a", "6a", "5a²", "a"],
      answer: "5a",
      explanation: "同类项系数相加，3a + 2a = 5a。",
      level: "初中送分题"
    },
    {
      id: "g-ma-98",
      subject: "数学",
      type: "probability",
      prompt: "抛一次硬币，出现正面的概率是多少？",
      options: ["1/4", "1/3", "1/2", "1"],
      answer: "1/2",
      explanation: "正反两面机会相同，所以概率是 1/2。",
      level: "初中基础题"
    },
    {
      id: "g-ma-99",
      subject: "数学",
      type: "set",
      prompt: "若 a 属于集合 A，通常记作什么？",
      options: ["a∈A", "a⊂A", "A∈a", "A⊂a"],
      answer: "a∈A",
      explanation: "元素属于集合，常写作 a∈A。",
      level: "高中送分题"
    },
    {
      id: "g-ma-100",
      subject: "数学",
      type: "function-image",
      prompt: "二次函数图像通常更接近下列哪种形状？",
      options: ["抛物线", "直线", "圆", "双曲线"],
      answer: "抛物线",
      explanation: "常见二次函数图像是抛物线。",
      level: "高中基础题"
    },
    {
      id: "g-ma-101",
      subject: "数学",
      type: "logarithm",
      prompt: "若 log2 8 = x，那么 x 等于多少？",
      options: ["2", "3", "4", "8"],
      answer: "3",
      explanation: "因为 2 的 3 次方等于 8，所以 log2 8 = 3。",
      level: "高中基础题"
    },
    {
      id: "g-ma-102",
      subject: "数学",
      type: "vector",
      prompt: "向量最少包含哪两个基本要素？",
      options: ["大小和方向", "长度和颜色", "面积和体积", "速度和时间"],
      answer: "大小和方向",
      explanation: "向量和数量最大的不同，就是它同时有大小和方向。",
      level: "大学基础题"
    },
    {
      id: "g-ma-103",
      subject: "数学",
      type: "matrix",
      prompt: "2×3 矩阵表示什么？",
      options: ["2 行 3 列", "2 列 3 行", "有 2 个数字", "有 3 个数字"],
      answer: "2 行 3 列",
      explanation: "矩阵的写法通常是“行 × 列”。",
      level: "大学送分题"
    },
    {
      id: "g-ma-104",
      subject: "数学",
      type: "limit",
      prompt: "当 x 趋近于 1 时，y = x 的极限是多少？",
      options: ["0", "1", "2", "不存在"],
      answer: "1",
      explanation: "函数 y = x 在 x 趋近于 1 时，函数值也趋近于 1。",
      level: "大学送分题"
    },
    {
      id: "g-ma-105",
      subject: "数学",
      type: "complex-number",
      prompt: "复数 5 - i 的虚部是多少？",
      options: ["-1", "1", "5", "i"],
      answer: "-1",
      explanation: "复数 a + bi 的虚部是 b，这里 b = -1。",
      level: "大学基础题"
    },
    {
      id: "g-ma-106",
      subject: "数学",
      type: "algebra",
      prompt: "若 x = 3，那么 2x + 1 等于多少？",
      options: ["5", "6", "7", "8"],
      answer: "7",
      explanation: "把 x = 3 代入，2×3 + 1 = 7。",
      level: "初中送分题"
    },
    {
      id: "g-ma-107",
      subject: "数学",
      type: "geometry",
      prompt: "一个三角形内角和是多少度？",
      options: ["90°", "180°", "270°", "360°"],
      answer: "180°",
      explanation: "三角形内角和恒为 180°。",
      level: "初中送分题"
    },
    {
      id: "g-ma-108",
      subject: "数学",
      type: "statistics",
      prompt: "数据 2，4，6 的平均数是多少？",
      options: ["3", "4", "5", "6"],
      answer: "4",
      explanation: "先求和得 12，再除以 3，结果是 4。",
      level: "初中基础题"
    },
    {
      id: "g-ma-109",
      subject: "数学",
      type: "probability",
      prompt: "一个袋子里只有红球和蓝球各 1 个，随机摸 1 个红球的概率是多少？",
      options: ["1/4", "1/3", "1/2", "1"],
      answer: "1/2",
      explanation: "两种结果机会相同，所以概率是 1/2。",
      level: "初中基础题"
    },
    {
      id: "g-ma-110",
      subject: "数学",
      type: "geometry",
      prompt: "平行线被一条直线所截时，同位角通常有什么关系？",
      options: ["相等", "互补", "互余", "无法确定"],
      answer: "相等",
      explanation: "平行线中的同位角通常相等。",
      level: "初中基础题"
    },
    {
      id: "g-ma-111",
      subject: "数学",
      type: "function",
      prompt: "函数 y = x² 属于哪一类常见函数？",
      options: ["二次函数", "一次函数", "指数函数", "反比例函数"],
      answer: "二次函数",
      explanation: "y = x² 是最典型的二次函数形式。",
      level: "高中送分题"
    },
    {
      id: "g-ma-112",
      subject: "数学",
      type: "inequality",
      prompt: "若 a > b，那么 a - b 与 0 的关系更接近哪一项？",
      options: ["大于 0", "小于 0", "等于 0", "无法判断"],
      answer: "大于 0",
      explanation: "较大的数减去较小的数，结果大于 0。",
      level: "高中送分题"
    },
    {
      id: "g-ma-113",
      subject: "数学",
      type: "trigonometry",
      prompt: "tan 45° 等于多少？",
      options: ["0", "1", "√3", "2"],
      answer: "1",
      explanation: "常见特殊角中，tan 45° = 1。",
      level: "高中基础题"
    },
    {
      id: "g-ma-114",
      subject: "数学",
      type: "sequence",
      prompt: "等差数列中，相邻两项的差通常怎样？",
      options: ["保持不变", "越来越大", "越来越小", "一定为 0"],
      answer: "保持不变",
      explanation: "等差数列最基本的特征就是公差不变。",
      level: "高中基础题"
    },
    {
      id: "g-ma-115",
      subject: "数学",
      type: "vector",
      prompt: "两个向量方向相同且长度相等，通常可以认为它们怎样？",
      options: ["相等", "相反", "垂直", "无关"],
      answer: "相等",
      explanation: "向量大小和方向都相同，就可以认为是相等向量。",
      level: "高中基础题"
    },
    {
      id: "g-ma-116",
      subject: "数学",
      type: "set-notation",
      prompt: "符号“⊂”通常更接近表示什么？",
      options: ["包含于", "属于", "并集", "交集"],
      answer: "包含于",
      explanation: "A ⊂ B 通常表示 A 是 B 的子集。",
      level: "大学送分题"
    },
    {
      id: "g-ma-117",
      subject: "数学",
      type: "derivative",
      prompt: "导数最接近描述函数图像在某点的什么？",
      options: ["变化快慢", "颜色深浅", "面积大小", "对称方式"],
      answer: "变化快慢",
      explanation: "导数常用来刻画函数在某点附近变化的快慢。",
      level: "大学基础题"
    },
    {
      id: "g-ma-118",
      subject: "数学",
      type: "integral",
      prompt: "定积分在直观上常和什么更有关？",
      options: ["面积", "角度", "概率必为 1", "颜色"],
      answer: "面积",
      explanation: "定积分在直观上常与曲线下方的面积相关。",
      level: "大学基础题"
    },
    {
      id: "g-ma-119",
      subject: "数学",
      type: "complex-number",
      prompt: "复数 1 + 0i 在直观上更接近什么数？",
      options: ["实数 1", "虚数 i", "不存在", "负数 -1"],
      answer: "实数 1",
      explanation: "虚部为 0 的复数可看作实数。",
      level: "大学送分题"
    },
    {
      id: "g-ma-120",
      subject: "数学",
      type: "matrix",
      prompt: "矩阵中位于第 2 行第 1 列的元素，通常先看哪个序号？",
      options: ["行", "列", "都不看", "随机看"],
      answer: "行",
      explanation: "矩阵元素通常按“先行后列”的顺序描述。",
      level: "大学基础题"
    },
    {
      id: "g-ma-121",
      subject: "数学",
      type: "compare-decimal",
      prompt: "0.8、0.08、0.18、0.81 中，哪个数最大？",
      options: ["0.8", "0.08", "0.18", "0.81"],
      answer: "0.81",
      explanation: "先比整数部分，都为 0，再比十分位和百分位，0.81 最大。",
      level: "小学送分题"
    },
    {
      id: "g-ma-122",
      subject: "数学",
      type: "number-pattern",
      prompt: "数列 2，4，6，8，下一项更可能是多少？",
      options: ["9", "10", "11", "12"],
      answer: "10",
      explanation: "每次都加 2，所以下一项是 10。",
      level: "小学送分题"
    },
    {
      id: "g-ma-123",
      subject: "数学",
      type: "equation-fill",
      prompt: "□ + 18 = 45，那么 □ 里应填多少？",
      options: ["17", "27", "37", "53"],
      answer: "27",
      explanation: "45 减去 18 等于 27，所以 □ = 27。",
      level: "小学送分题"
    },
    {
      id: "g-ma-124",
      subject: "数学",
      type: "division",
      prompt: "56 ÷ 8 等于多少？",
      options: ["6", "7", "8", "9"],
      answer: "7",
      explanation: "56 除以 8 等于 7。",
      level: "小学送分题"
    },
    {
      id: "g-ma-125",
      subject: "数学",
      type: "table-read",
      prompt: "表格里有 6 人，又来 4 人，现在共有多少人？",
      options: ["8 人", "9 人", "10 人", "11 人"],
      answer: "10 人",
      explanation: "6 人加 4 人等于 10 人。",
      level: "小学基础题"
    },
    {
      id: "g-ma-126",
      subject: "数学",
      type: "fraction",
      prompt: "1/3 和 1/5 比较，哪个更大？",
      options: ["1/3", "1/5", "一样大", "无法比较"],
      answer: "1/3",
      explanation: "同分子分数里，分母越小分数越大。",
      level: "小学基础题"
    },
    {
      id: "g-ma-127",
      subject: "数学",
      type: "time",
      prompt: "时针指向 8，分针指向 12，这时是几点？",
      options: ["7 点", "8 点", "9 点", "12 点"],
      answer: "8 点",
      explanation: "分针指向 12 表示整点。",
      level: "小学送分题"
    },
    {
      id: "g-ma-128",
      subject: "数学",
      type: "geometry",
      prompt: "正方形有几条边？",
      options: ["3", "4", "5", "6"],
      answer: "4",
      explanation: "正方形有 4 条边。",
      level: "小学送分题"
    },
    {
      id: "g-ma-129",
      subject: "数学",
      type: "perimeter",
      prompt: "边长为 3 厘米的正方形，周长是多少？",
      options: ["6 厘米", "9 厘米", "12 厘米", "16 厘米"],
      answer: "12 厘米",
      explanation: "正方形周长等于边长乘 4。",
      level: "小学基础题"
    },
    {
      id: "g-ma-130",
      subject: "数学",
      type: "average",
      prompt: "5、7、9 的平均数是多少？",
      options: ["6", "7", "8", "9"],
      answer: "7",
      explanation: "三数和为 21，再除以 3，得 7。",
      level: "小学基础题"
    },
    {
      id: "g-ma-131",
      subject: "数学",
      type: "equation",
      prompt: "方程 x + 6 = 15 的解是多少？",
      options: ["7", "8", "9", "10"],
      answer: "9",
      explanation: "15 减 6，得 x = 9。",
      level: "初中送分题"
    },
    {
      id: "g-ma-132",
      subject: "数学",
      type: "algebra",
      prompt: "4b - b 合并同类项后等于什么？",
      options: ["3b", "4b²", "b", "5b"],
      answer: "3b",
      explanation: "4b - b = 3b。",
      level: "初中送分题"
    },
    {
      id: "g-ma-133",
      subject: "数学",
      type: "algebra",
      prompt: "若 a = 2，b = 3，则 a + b 等于多少？",
      options: ["4", "5", "6", "7"],
      answer: "5",
      explanation: "把数值代入可得 2 + 3 = 5。",
      level: "初中送分题"
    },
    {
      id: "g-ma-134",
      subject: "数学",
      type: "statistics",
      prompt: "数据 3、3、5、7 中，众数是哪一个？",
      options: ["3", "5", "7", "没有"],
      answer: "3",
      explanation: "3 出现次数最多，是众数。",
      level: "初中基础题"
    },
    {
      id: "g-ma-135",
      subject: "数学",
      type: "statistics",
      prompt: "数据 1、2、3、4、5 的中位数是多少？",
      options: ["2", "3", "4", "5"],
      answer: "3",
      explanation: "按大小规律排好后，中间的数是 3。",
      level: "初中基础题"
    },
    {
      id: "g-ma-136",
      subject: "数学",
      type: "geometry",
      prompt: "直角三角形中一定有几个直角？",
      options: ["1 个", "2 个", "3 个", "没有"],
      answer: "1 个",
      explanation: "直角三角形一定有且只有一个直角。",
      level: "初中送分题"
    },
    {
      id: "g-ma-137",
      subject: "数学",
      type: "probability",
      prompt: "一个袋子里有白球 3 个、黑球 1 个，摸到黑球的概率是多少？",
      options: ["1/4", "1/3", "1/2", "3/4"],
      answer: "1/4",
      explanation: "总共有 4 个球，其中黑球 1 个。",
      level: "初中基础题"
    },
    {
      id: "g-ma-138",
      subject: "数学",
      type: "geometry",
      prompt: "长方形有几组对边平行？",
      options: ["1 组", "2 组", "3 组", "4 组"],
      answer: "2 组",
      explanation: "长方形的两组对边分别平行。",
      level: "初中基础题"
    },
    {
      id: "g-ma-139",
      subject: "数学",
      type: "equation",
      prompt: "2x - 3 = 7 时，x 等于多少？",
      options: ["4", "5", "6", "7"],
      answer: "5",
      explanation: "先加 3 得 10，再除以 2，x = 5。",
      level: "初中基础题"
    },
    {
      id: "g-ma-140",
      subject: "数学",
      type: "geometry",
      prompt: "平角等于多少度？",
      options: ["90°", "120°", "180°", "360°"],
      answer: "180°",
      explanation: "平角是 180°。",
      level: "初中送分题"
    },
    {
      id: "g-ma-141",
      subject: "数学",
      type: "line-angle",
      prompt: "两条直线相交形成的对顶角通常是什么关系？",
      options: ["相等", "互余", "互补", "不确定"],
      answer: "相等",
      explanation: "两条直线相交时形成的对顶角通常相等。",
      level: "初中送分题"
    },
    {
      id: "g-ma-142",
      subject: "数学",
      type: "geometry",
      prompt: "三角形按角分类，不包括下列哪一种？",
      options: ["圆形三角形", "锐角三角形", "直角三角形", "钝角三角形"],
      answer: "圆形三角形",
      explanation: "三角形没有“圆形三角形”这种说法。",
      level: "初中常识题"
    },
    {
      id: "g-ma-143",
      subject: "数学",
      type: "statistics",
      prompt: "平均数最接近表示一组数据的什么？",
      options: ["总体平均水平", "最大值", "最小值", "中间位置"],
      answer: "总体平均水平",
      explanation: "平均数能反映一组数据的大致平均水平。",
      level: "初中送分题"
    },
    {
      id: "g-ma-144",
      subject: "数学",
      type: "probability",
      prompt: "从 1 到 10 中随机选一个整数，选到偶数的概率是多少？",
      options: ["1/5", "2/5", "1/2", "3/5"],
      answer: "1/2",
      explanation: "偶数共有 5 个，总数 10 个。",
      level: "初中基础题"
    },
    {
      id: "g-ma-145",
      subject: "数学",
      type: "geometry",
      prompt: "菱形的四条边通常有什么关系？",
      options: ["都相等", "只有两条相等", "都不相等", "只有相邻边相等"],
      answer: "都相等",
      explanation: "菱形的四条边长度相等。",
      level: "初中基础题"
    },
    {
      id: "g-ma-146",
      subject: "数学",
      type: "equation",
      prompt: "x/4 = 3 时，x 等于多少？",
      options: ["7", "8", "10", "12"],
      answer: "12",
      explanation: "两边同时乘以 4，得 x = 12。",
      level: "初中基础题"
    },
    {
      id: "g-ma-147",
      subject: "数学",
      type: "algebra",
      prompt: "若 m = 1，n = 4，则 2m + n 等于多少？",
      options: ["4", "5", "6", "7"],
      answer: "6",
      explanation: "2×1 + 4 = 6。",
      level: "初中送分题"
    },
    {
      id: "g-ma-148",
      subject: "数学",
      type: "geometry",
      prompt: "两条直线相交形成的对顶角通常怎样？",
      options: ["相等", "互余", "互补", "无法判断"],
      answer: "相等",
      explanation: "对顶角通常相等。",
      level: "初中基础题"
    },
    {
      id: "g-ma-149",
      subject: "数学",
      type: "probability",
      prompt: "掷一次骰子，点数大于 4 的概率是多少？",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: "1/3",
      explanation: "大于 4 的点数有 5 和 6 两种，共 2/6。",
      level: "初中基础题"
    },
    {
      id: "g-ma-150",
      subject: "数学",
      type: "geometry",
      prompt: "等腰三角形最明显的特征之一是什么？",
      options: ["有两条边相等", "三条边都相等", "一定有直角", "一定是钝角"],
      answer: "有两条边相等",
      explanation: "等腰三角形有两条边相等。",
      level: "初中送分题"
    },
    {
      id: "g-ma-151",
      subject: "数学",
      type: "statistics",
      prompt: "条形统计图更适合突出什么？",
      options: ["数量多少", "角度大小", "路线远近", "颜色深浅"],
      answer: "数量多少",
      explanation: "条形统计图适合比较不同类别的数量。",
      level: "初中送分题"
    },
    {
      id: "g-ma-152",
      subject: "数学",
      type: "probability-basic",
      prompt: "袋子里有 3 个红球、1 个白球，摸出 1 个白球的概率是多少？",
      options: ["1/4", "1/3", "1/2", "3/4"],
      answer: "1/4",
      explanation: "一共 4 个球，其中白球有 1 个，所以概率是 1/4。",
      level: "初中送分题"
    },
    {
      id: "g-ma-153",
      subject: "数学",
      type: "set",
      prompt: "集合中的元素通常有什么特点？",
      options: ["确定性", "随意性", "模糊性", "无限变化"],
      answer: "确定性",
      explanation: "集合里的元素是否属于该集合通常是确定的。",
      level: "高中送分题"
    },
    {
      id: "g-ma-154",
      subject: "数学",
      type: "function",
      prompt: "函数中自变量变化时，因变量通常会怎样？",
      options: ["随之确定变化", "完全不变", "一定增大", "一定减小"],
      answer: "随之确定变化",
      explanation: "函数的基本特点是因变量随自变量确定变化。",
      level: "高中送分题"
    },
    {
      id: "g-ma-155",
      subject: "数学",
      type: "function-image",
      prompt: "一次函数图像通常更接近哪种形状？",
      options: ["直线", "抛物线", "圆", "波浪线"],
      answer: "直线",
      explanation: "一次函数的图像通常是直线。",
      level: "高中送分题"
    },
    {
      id: "g-ma-156",
      subject: "数学",
      type: "inequality",
      prompt: "若 x > 2，则 x + 3 与 5 的关系更接近哪一项？",
      options: ["大于 5", "小于 5", "等于 5", "无法判断"],
      answer: "大于 5",
      explanation: "不等式两边同加 3，关系不变。",
      level: "高中基础题"
    },
    {
      id: "g-ma-157",
      subject: "数学",
      type: "coordinate-axis",
      prompt: "点 (0, -3) 在哪里？",
      options: ["x 轴上", "y 轴上", "第一象限", "第四象限"],
      answer: "y 轴上",
      explanation: "横坐标是 0，点就在 y 轴上。",
      level: "高中基础题"
    },
    {
      id: "g-ma-158",
      subject: "数学",
      type: "trigonometry",
      prompt: "cos 90° 等于多少？",
      options: ["0", "1", "-1", "1/2"],
      answer: "0",
      explanation: "常见特殊角中，cos 90° = 0。",
      level: "高中送分题"
    },
    {
      id: "g-ma-159",
      subject: "数学",
      type: "vector",
      prompt: "数量和向量最大的区别之一是什么？",
      options: ["向量有方向", "数量更长", "向量一定更大", "数量不能计算"],
      answer: "向量有方向",
      explanation: "向量除了大小，还有方向。",
      level: "高中基础题"
    },
    {
      id: "g-ma-160",
      subject: "数学",
      type: "probability",
      prompt: "概率的取值范围通常是？",
      options: ["0 到 1", "-1 到 1", "1 到 10", "任意实数"],
      answer: "0 到 1",
      explanation: "概率通常在 0 和 1 之间。",
      level: "高中送分题"
    },
    {
      id: "g-ma-161",
      subject: "数学",
      type: "set-notation",
      prompt: "集合“属于”常用哪个符号表示？",
      options: ["∈", "∅", "∩", "∪"],
      answer: "∈",
      explanation: "“属于”通常用符号 ∈ 表示。",
      level: "高中送分题"
    },
    {
      id: "g-ma-162",
      subject: "数学",
      type: "function",
      prompt: "在 y = 3x 中，当 x 增大时，y 通常会怎样？",
      options: ["增大", "减小", "不变", "先增后减"],
      answer: "增大",
      explanation: "x 增大时，3x 也会增大。",
      level: "高中基础题"
    },
    {
      id: "g-ma-163",
      subject: "数学",
      type: "inequality",
      prompt: "若 a < b，那么 b - a 与 0 的关系更接近哪项？",
      options: ["大于 0", "小于 0", "等于 0", "无法判断"],
      answer: "大于 0",
      explanation: "较大的数减较小的数，结果大于 0。",
      level: "高中送分题"
    },
    {
      id: "g-ma-164",
      subject: "数学",
      type: "sequence",
      prompt: "等比数列中，相邻两项的比通常怎样？",
      options: ["保持不变", "越来越大", "越来越小", "一定为 0"],
      answer: "保持不变",
      explanation: "等比数列的公比不变。",
      level: "高中基础题"
    },
    {
      id: "g-ma-165",
      subject: "数学",
      type: "trigonometry",
      prompt: "sin 30° 等于多少？",
      options: ["1/2", "1", "0", "√3"],
      answer: "1/2",
      explanation: "常见特殊角中，sin 30° = 1/2。",
      level: "高中送分题"
    },
    {
      id: "g-ma-166",
      subject: "数学",
      type: "vector",
      prompt: "零向量最接近哪种特点？",
      options: ["长度为 0", "方向最多", "一定向上", "一定向右"],
      answer: "长度为 0",
      explanation: "零向量的长度为 0。",
      level: "高中基础题"
    },
    {
      id: "g-ma-167",
      subject: "数学",
      type: "probability",
      prompt: "不可能事件的概率通常是多少？",
      options: ["0", "1", "1/2", "2"],
      answer: "0",
      explanation: "不可能事件的概率通常是 0。",
      level: "高中送分题"
    },
    {
      id: "g-ma-168",
      subject: "数学",
      type: "set",
      prompt: "若 A 中所有元素都属于 B，则 A 与 B 的关系更接近哪一项？",
      options: ["A 是 B 的子集", "A 属于 B", "B 属于 A", "A 与 B 相等"],
      answer: "A 是 B 的子集",
      explanation: "A 中元素都在 B 中，说明 A 是 B 的子集。",
      level: "高中基础题"
    },
    {
      id: "g-ma-169",
      subject: "数学",
      type: "function-image",
      prompt: "函数图像上一个点的横坐标通常表示什么？",
      options: ["自变量", "因变量", "斜率", "截距"],
      answer: "自变量",
      explanation: "横坐标通常表示自变量。",
      level: "高中送分题"
    },
    {
      id: "g-ma-170",
      subject: "数学",
      type: "inequality",
      prompt: "若 x ≥ 0，那么 x² 与 0 的关系更接近哪项？",
      options: ["大于等于 0", "小于 0", "一定等于 0", "无法判断"],
      answer: "大于等于 0",
      explanation: "实数平方不会小于 0。",
      level: "高中基础题"
    },
    {
      id: "g-ma-171",
      subject: "数学",
      type: "trigonometry",
      prompt: "在直角三角形中，正弦值最接近哪种比？",
      options: ["对边比斜边", "邻边比斜边", "对边比邻边", "斜边比对边"],
      answer: "对边比斜边",
      explanation: "正弦通常是对边与斜边的比。",
      level: "高中基础题"
    },
    {
      id: "g-ma-172",
      subject: "数学",
      type: "inequality-relation",
      prompt: "若 a > b，那么 a + 2 和 b + 2 的大小关系是？",
      options: ["a + 2 > b + 2", "a + 2 < b + 2", "a + 2 = b + 2", "无法确定"],
      answer: "a + 2 > b + 2",
      explanation: "不等式两边同时加同一个数，大小关系不变。",
      level: "高中送分题"
    },
    {
      id: "g-ma-173",
      subject: "数学",
      type: "vector",
      prompt: "向量平移后，通常不变的是什么？",
      options: ["大小和方向", "起点位置", "终点位置", "颜色"],
      answer: "大小和方向",
      explanation: "平移向量不会改变其大小和方向。",
      level: "高中基础题"
    },
    {
      id: "g-ma-174",
      subject: "数学",
      type: "probability",
      prompt: "必然事件的概率通常是多少？",
      options: ["1", "0", "1/2", "2"],
      answer: "1",
      explanation: "必然事件的概率通常是 1。",
      level: "高中送分题"
    },
    {
      id: "g-ma-175",
      subject: "数学",
      type: "set-notation",
      prompt: "符号“∪”通常表示什么？",
      options: ["并集", "交集", "属于", "子集"],
      answer: "并集",
      explanation: "“∪”通常表示并集。",
      level: "大学送分题"
    },
    {
      id: "g-ma-176",
      subject: "数学",
      type: "set-notation",
      prompt: "符号“∩”通常表示什么？",
      options: ["交集", "并集", "属于", "子集"],
      answer: "交集",
      explanation: "“∩”通常表示交集。",
      level: "大学送分题"
    },
    {
      id: "g-ma-177",
      subject: "数学",
      type: "derivative",
      prompt: "函数图像某点切线越陡，通常说明该点附近变化怎样？",
      options: ["更快", "更慢", "停止变化", "一定向下"],
      answer: "更快",
      explanation: "切线越陡，通常说明变化越快。",
      level: "大学基础题"
    },
    {
      id: "g-ma-178",
      subject: "数学",
      type: "integral",
      prompt: "常数函数 y = 0 在区间上的定积分结果更接近多少？",
      options: ["0", "1", "-1", "不确定"],
      answer: "0",
      explanation: "函数值恒为 0 时，面积直观上也是 0。",
      level: "大学基础题"
    },
    {
      id: "g-ma-179",
      subject: "数学",
      type: "complex-number",
      prompt: "复数中的 i 满足哪一项？",
      options: ["i² = -1", "i² = 1", "i = 0", "i > 1"],
      answer: "i² = -1",
      explanation: "虚数单位 i 满足 i² = -1。",
      level: "大学送分题"
    },
    {
      id: "g-ma-180",
      subject: "数学",
      type: "matrix",
      prompt: "单位矩阵最突出的特点之一是什么？",
      options: ["主对角线为 1", "所有元素都相等", "所有元素都为 0", "只有一行"],
      answer: "主对角线为 1",
      explanation: "单位矩阵通常主对角线为 1，其余位置为 0。",
      level: "大学基础题"
    }
  ],
  english: [
    {
      id: "g-en-1",
      subject: "英语",
      type: "family-member",
      prompt: "“mother”的中文意思是？",
      options: ["妈妈", "爸爸", "姐姐", "奶奶"],
      answer: "妈妈",
      explanation: "mother 表示“妈妈”。",
      level: "小学送分题"
    },
    {
      id: "g-en-2",
      subject: "英语",
      type: "color-word",
      prompt: "Which word means “黄色”？",
      options: ["yellow", "purple", "white", "black"],
      answer: "yellow",
      explanation: "yellow 表示“黄色”。",
      level: "小学送分题"
    },
    {
      id: "g-en-3",
      subject: "英语",
      type: "time-expression",
      prompt: "“7:00”更接近下面哪种说法？",
      options: ["seven o’clock", "seven apples", "seven books", "seven dogs"],
      answer: "seven o’clock",
      explanation: "整点时间常说 seven o’clock。",
      level: "小学基础题"
    },
    {
      id: "g-en-4",
      subject: "英语",
      type: "daily-dialogue",
      prompt: "老师进教室时，学生常说哪一句？",
      options: ["Good morning, teacher.", "Good night.", "See you.", "Sorry."],
      answer: "Good morning, teacher.",
      explanation: "早上见到老师，常说 Good morning, teacher.",
      level: "小学基础题"
    },
    {
      id: "g-en-5",
      subject: "英语",
      type: "body-part",
      prompt: "“hand”的中文意思是？",
      options: ["手", "脚", "头", "眼睛"],
      answer: "手",
      explanation: "hand 表示“手”。",
      level: "小学送分题"
    },
    {
      id: "g-en-6",
      subject: "英语",
      type: "classroom-command",
      prompt: "老师说 “Sit down.” 时，你应该怎么做？",
      options: ["坐下", "起立", "开门", "跑步"],
      answer: "坐下",
      explanation: "Sit down 的意思是“坐下”。",
      level: "小学基础题"
    },
    {
      id: "g-en-7",
      subject: "英语",
      type: "traffic-word",
      prompt: "“bus”的中文意思是？",
      options: ["公交车", "自行车", "轮船", "飞机"],
      answer: "公交车",
      explanation: "bus 表示“公交车”。",
      level: "小学送分题"
    },
    {
      id: "g-en-8",
      subject: "英语",
      type: "season-word",
      prompt: "Which word means “春天”？",
      options: ["spring", "summer", "autumn", "winter"],
      answer: "spring",
      explanation: "spring 表示“春天”。",
      level: "小学基础题"
    },
    {
      id: "g-en-9",
      subject: "英语",
      type: "position-word",
      prompt: "Which word means “在……下面”？",
      options: ["under", "on", "in", "near"],
      answer: "under",
      explanation: "under 表示“在……下面”。",
      level: "小学基础题"
    },
    {
      id: "g-en-10",
      subject: "英语",
      type: "school-word",
      prompt: "“desk”的中文意思是？",
      options: ["课桌", "黑板", "书包", "教室"],
      answer: "课桌",
      explanation: "desk 表示“课桌”或“书桌”。",
      level: "小学送分题"
    },
    {
      id: "g-en-11",
      subject: "英语",
      type: "number-word",
      prompt: "Which word means “十”？",
      options: ["ten", "two", "five", "nine"],
      answer: "ten",
      explanation: "ten 表示“十”。",
      level: "小学送分题"
    },
    {
      id: "g-en-12",
      subject: "英语",
      type: "weather-word",
      prompt: "“下雨的”对应哪个单词？",
      options: ["rainy", "sunny", "cloudy", "snowy"],
      answer: "rainy",
      explanation: "rainy 表示“下雨的”。",
      level: "小学基础题"
    },
    {
      id: "g-en-13",
      subject: "英语",
      type: "family-member",
      prompt: "“brother”的中文意思是？",
      options: ["哥哥或弟弟", "姐姐或妹妹", "妈妈", "老师"],
      answer: "哥哥或弟弟",
      explanation: "brother 表示“哥哥或弟弟”。",
      level: "小学基础题"
    },
    {
      id: "g-en-14",
      subject: "英语",
      type: "daily-dialogue",
      prompt: "别人对你说 “Thank you.”，更合适的回答是？",
      options: ["You are welcome.", "Good night.", "Sit down.", "Fine, thank you."],
      answer: "You are welcome.",
      explanation: "You are welcome. 常用于回应感谢。",
      level: "小学基础题"
    },
    {
      id: "g-en-15",
      subject: "英语",
      type: "animal-word",
      prompt: "“bird”的中文意思是？",
      options: ["鸟", "鱼", "猫", "马"],
      answer: "鸟",
      explanation: "bird 表示“鸟”。",
      level: "小学送分题"
    },
    {
      id: "g-en-16",
      subject: "英语",
      type: "color-word",
      prompt: "Which word means “绿色”？",
      options: ["green", "red", "pink", "orange"],
      answer: "green",
      explanation: "green 表示“绿色”。",
      level: "小学送分题"
    },
    {
      id: "g-en-17",
      subject: "英语",
      type: "school-scene",
      prompt: "“blackboard”的中文意思是？",
      options: ["黑板", "铅笔", "操场", "校门"],
      answer: "黑板",
      explanation: "blackboard 表示“黑板”。",
      level: "小学基础题"
    },
    {
      id: "g-en-18",
      subject: "英语",
      type: "weather-word",
      prompt: "Which word means “晴朗的”？",
      options: ["sunny", "rainy", "windy", "snowy"],
      answer: "sunny",
      explanation: "sunny 表示“晴朗的”。",
      level: "小学基础题"
    },
    {
      id: "g-en-19",
      subject: "英语",
      type: "position-word",
      prompt: "The ball is ___ the desk. 球在桌子上面。",
      options: ["on", "in", "under", "behind"],
      answer: "on",
      explanation: "on 表示“在……上面”。",
      level: "小学基础题"
    },
    {
      id: "g-en-20",
      subject: "英语",
      type: "daily-dialogue",
      prompt: "晚上要睡觉前，常说哪一句？",
      options: ["Good night.", "Good morning.", "See you.", "Thank you."],
      answer: "Good night.",
      explanation: "睡前或晚上分别时常说 Good night.",
      level: "小学送分题"
    },
    {
      id: "g-en-21",
      subject: "英语",
      type: "be-verb",
      prompt: "He ___ my classmate.",
      options: ["am", "is", "are", "be"],
      answer: "is",
      explanation: "主语是 He，be 动词用 is。",
      level: "初中送分题"
    },
    {
      id: "g-en-22",
      subject: "英语",
      type: "present-simple",
      prompt: "She usually ___ to school by bike.",
      options: ["go", "goes", "going", "went"],
      answer: "goes",
      explanation: "主语是 She，一般现在时动词常用第三人称单数形式 goes。",
      level: "初中基础题"
    },
    {
      id: "g-en-23",
      subject: "英语",
      type: "frequency",
      prompt: "Which word means “总是”？",
      options: ["always", "never", "sometimes", "once"],
      answer: "always",
      explanation: "always 表示“总是”。",
      level: "初中基础题"
    },
    {
      id: "g-en-24",
      subject: "英语",
      type: "reading",
      prompt: "Tom is twelve. He is a student. What is Tom?",
      options: ["A student", "A teacher", "A doctor", "A driver"],
      answer: "A student",
      explanation: "题目中已经明确说 He is a student.",
      level: "初中送分题"
    },
    {
      id: "g-en-25",
      subject: "英语",
      type: "dialogue",
      prompt: "“How often do you exercise?” 更接近下面哪种意思？",
      options: ["你多久锻炼一次？", "你在哪里锻炼？", "你什么时候睡觉？", "你为什么锻炼？"],
      answer: "你多久锻炼一次？",
      explanation: "How often 用来询问频率。",
      level: "初中基础题"
    },
    {
      id: "g-en-26",
      subject: "英语",
      type: "present-simple-negative",
      prompt: "He ___ like milk.",
      options: ["do not", "does not", "is not", "not"],
      answer: "does not",
      explanation: "主语是 He，一般现在时否定常用 does not。",
      level: "初中基础题"
    },
    {
      id: "g-en-27",
      subject: "英语",
      type: "preposition-time",
      prompt: "We have breakfast ___ seven o’clock.",
      options: ["at", "in", "on", "for"],
      answer: "at",
      explanation: "具体时刻前常用介词 at。",
      level: "初中基础题"
    },
    {
      id: "g-en-28",
      subject: "英语",
      type: "reading",
      prompt: "Lucy is from China. Where is Lucy from?",
      options: ["China", "England", "Japan", "America"],
      answer: "China",
      explanation: "题目里已经直接给出 Lucy is from China.",
      level: "初中送分题"
    },
    {
      id: "g-en-29",
      subject: "英语",
      type: "dialogue",
      prompt: "“What does your father do?” 更接近下面哪种意思？",
      options: ["你爸爸是做什么工作的？", "你爸爸在哪里？", "你爸爸几点起床？", "你爸爸喜欢什么？"],
      answer: "你爸爸是做什么工作的？",
      explanation: "What does ... do? 常用来询问职业。",
      level: "初中基础题"
    },
    {
      id: "g-en-30",
      subject: "英语",
      type: "frequency",
      prompt: "Which word means “从不”？",
      options: ["never", "always", "often", "usually"],
      answer: "never",
      explanation: "never 表示“从不”。",
      level: "初中基础题"
    },
    {
      id: "g-en-31",
      subject: "英语",
      type: "be-verb",
      prompt: "They ___ in the classroom now.",
      options: ["is", "am", "are", "be"],
      answer: "are",
      explanation: "主语是 They，be 动词用 are。",
      level: "初中送分题"
    },
    {
      id: "g-en-32",
      subject: "英语",
      type: "present-simple",
      prompt: "My mother ___ TV every evening.",
      options: ["watch", "watches", "watching", "watched"],
      answer: "watches",
      explanation: "主语是 My mother，一般现在时用 watches。",
      level: "初中基础题"
    },
    {
      id: "g-en-33",
      subject: "英语",
      type: "reading",
      prompt: "Kate likes music and she can sing well. What can Kate do?",
      options: ["Sing well", "Play basketball", "Drive a car", "Cook dinner"],
      answer: "Sing well",
      explanation: "题目直接说 she can sing well.",
      level: "初中送分题"
    },
    {
      id: "g-en-34",
      subject: "英语",
      type: "dialogue",
      prompt: "“What time do you go to school?” 更接近下面哪种意思？",
      options: ["你几点去上学？", "你在哪里上学？", "你为什么上学？", "你和谁去上学？"],
      answer: "你几点去上学？",
      explanation: "What time 用来询问具体时间。",
      level: "初中基础题"
    },
    {
      id: "g-en-35",
      subject: "英语",
      type: "frequency",
      prompt: "Which word means “有时”？",
      options: ["sometimes", "always", "never", "daily"],
      answer: "sometimes",
      explanation: "sometimes 表示“有时”。",
      level: "初中基础题"
    },
    {
      id: "g-en-36",
      subject: "英语",
      type: "be-verb",
      prompt: "I ___ a student.",
      options: ["is", "am", "are", "be"],
      answer: "am",
      explanation: "主语是 I，be 动词用 am。",
      level: "初中送分题"
    },
    {
      id: "g-en-37",
      subject: "英语",
      type: "present-simple",
      prompt: "They often ___ football after school.",
      options: ["play", "plays", "playing", "played"],
      answer: "play",
      explanation: "主语是 They，一般现在时动词用原形 play。",
      level: "初中基础题"
    },
    {
      id: "g-en-38",
      subject: "英语",
      type: "reading",
      prompt: "Jim gets up at six every day. When does Jim get up?",
      options: ["At six.", "At seven.", "At five.", "At eight."],
      answer: "At six.",
      explanation: "题目直接说 Jim gets up at six every day.",
      level: "初中送分题"
    },
    {
      id: "g-en-39",
      subject: "英语",
      type: "dialogue",
      prompt: "“Where are you from?” 更接近下面哪种意思？",
      options: ["你来自哪里？", "你在做什么？", "你多大了？", "你几点起床？"],
      answer: "你来自哪里？",
      explanation: "Where ... from? 常用来询问来自哪里。",
      level: "初中基础题"
    },
    {
      id: "g-en-40",
      subject: "英语",
      type: "frequency",
      prompt: "Which word means “经常”？",
      options: ["often", "never", "once", "tomorrow"],
      answer: "often",
      explanation: "often 表示“经常”。",
      level: "初中基础题"
    },
    {
      id: "g-en-41",
      subject: "英语",
      type: "tense",
      prompt: "She ___ her homework yesterday.",
      options: ["do", "does", "did", "doing"],
      answer: "did",
      explanation: "yesterday 提示一般过去时，用 did。",
      level: "高中送分题"
    },
    {
      id: "g-en-42",
      subject: "英语",
      type: "passive",
      prompt: "The classroom ___ every day.",
      options: ["clean", "cleans", "is cleaned", "cleaning"],
      answer: "is cleaned",
      explanation: "主语是教室，被打扫要用被动语态 is cleaned。",
      level: "高中基础题"
    },
    {
      id: "g-en-43",
      subject: "英语",
      type: "phrase",
      prompt: "Which phrase means “擅长于”？",
      options: ["be good at", "be afraid of", "look after", "come from"],
      answer: "be good at",
      explanation: "be good at 表示“擅长于”。",
      level: "高中送分题"
    },
    {
      id: "g-en-44",
      subject: "英语",
      type: "reading",
      prompt: "Tom was tired, so he went to bed early. Why did Tom go to bed early?",
      options: ["Because he was tired.", "Because he was hungry.", "Because he was late.", "Because he was angry."],
      answer: "Because he was tired.",
      explanation: "题目中直接说明了原因：he was tired。",
      level: "高中送分题"
    },
    {
      id: "g-en-45",
      subject: "英语",
      type: "dialogue",
      prompt: "“Would you like some tea?” 更接近下面哪种意思？",
      options: ["你想喝点茶吗？", "你会泡茶吗？", "你在哪里买茶？", "你什么时候喝茶？"],
      answer: "你想喝点茶吗？",
      explanation: "Would you like ...? 常用于礼貌提出邀请或询问。",
      level: "高中基础题"
    },
    {
      id: "g-en-46",
      subject: "英语",
      type: "tense",
      prompt: "They ___ in Beijing last year.",
      options: ["live", "lived", "living", "lives"],
      answer: "lived",
      explanation: "last year 提示一般过去时，用 lived。",
      level: "高中送分题"
    },
    {
      id: "g-en-47",
      subject: "英语",
      type: "passive",
      prompt: "English ___ in many countries.",
      options: ["speak", "speaks", "is spoken", "spoken"],
      answer: "is spoken",
      explanation: "英语被很多国家使用，要用被动语态 is spoken。",
      level: "高中基础题"
    },
    {
      id: "g-en-48",
      subject: "英语",
      type: "phrase",
      prompt: "Which phrase means “照顾”？",
      options: ["look after", "look for", "look at", "look up"],
      answer: "look after",
      explanation: "look after 表示“照顾”。",
      level: "高中送分题"
    },
    {
      id: "g-en-49",
      subject: "英语",
      type: "reading",
      prompt: "Mary was ill, so she stayed at home. Why did Mary stay at home?",
      options: ["Because she was ill.", "Because she was busy.", "Because she was late.", "Because she was tired."],
      answer: "Because she was ill.",
      explanation: "题目直接说明了原因：she was ill。",
      level: "高中送分题"
    },
    {
      id: "g-en-50",
      subject: "英语",
      type: "dialogue",
      prompt: "“Could you help me?” 更接近下面哪种意思？",
      options: ["你能帮我一下吗？", "你想见我吗？", "你认识我吗？", "你在找我吗？"],
      answer: "你能帮我一下吗？",
      explanation: "Could you ...? 常用于礼貌请求帮助。",
      level: "高中基础题"
    },
    {
      id: "g-en-51",
      subject: "英语",
      type: "tense",
      prompt: "He ___ to school every day.",
      options: ["go", "goes", "went", "going"],
      answer: "goes",
      explanation: "every day 提示一般现在时，主语是 He，用 goes。",
      level: "高中送分题"
    },
    {
      id: "g-en-52",
      subject: "英语",
      type: "passive",
      prompt: "The book ___ by many students.",
      options: ["read", "reads", "is read", "reading"],
      answer: "is read",
      explanation: "书被很多学生阅读，要用被动语态 is read。",
      level: "高中基础题"
    },
    {
      id: "g-en-53",
      subject: "英语",
      type: "phrase",
      prompt: "Which phrase means “寻找”？",
      options: ["look for", "look after", "look at", "look like"],
      answer: "look for",
      explanation: "look for 表示“寻找”。",
      level: "高中送分题"
    },
    {
      id: "g-en-54",
      subject: "英语",
      type: "reading",
      prompt: "Jack is hungry, so he wants some bread. What does Jack want?",
      options: ["Some bread", "Some water", "A bike", "A book"],
      answer: "Some bread",
      explanation: "题目中直接说 he wants some bread。",
      level: "高中送分题"
    },
    {
      id: "g-en-55",
      subject: "英语",
      type: "dialogue",
      prompt: "“May I come in?” 更接近下面哪种意思？",
      options: ["我可以进来吗？", "我可以出去吗？", "你能来吗？", "你想进去吗？"],
      answer: "我可以进来吗？",
      explanation: "May I ...? 常用来礼貌征求允许。",
      level: "高中基础题"
    },
    {
      id: "g-en-56",
      subject: "英语",
      type: "tense",
      prompt: "We ___ a movie tomorrow.",
      options: ["watch", "watched", "will watch", "watching"],
      answer: "will watch",
      explanation: "tomorrow 提示一般将来时，常用 will watch。",
      level: "高中送分题"
    },
    {
      id: "g-en-57",
      subject: "英语",
      type: "passive",
      prompt: "The work ___ tomorrow.",
      options: ["finish", "finishes", "will be finished", "finished"],
      answer: "will be finished",
      explanation: "工作将被完成，要用一般将来时的被动语态 will be finished。",
      level: "高中基础题"
    },
    {
      id: "g-en-58",
      subject: "英语",
      type: "phrase",
      prompt: "Which phrase means “放弃”？",
      options: ["give up", "give out", "give away", "give back"],
      answer: "give up",
      explanation: "give up 表示“放弃”。",
      level: "高中送分题"
    },
    {
      id: "g-en-59",
      subject: "英语",
      type: "reading",
      prompt: "Lucy studied hard, so she passed the exam. What happened to Lucy?",
      options: ["She passed the exam.", "She failed the exam.", "She missed the exam.", "She left school."],
      answer: "She passed the exam.",
      explanation: "题目已经直接说 she passed the exam。",
      level: "高中送分题"
    },
    {
      id: "g-en-60",
      subject: "英语",
      type: "dialogue",
      prompt: "“What do you think of the movie?” 更接近下面哪种意思？",
      options: ["你觉得这部电影怎么样？", "你什么时候看电影？", "你和谁去看电影？", "你为什么不看电影？"],
      answer: "你觉得这部电影怎么样？",
      explanation: "What do you think of ...? 常用于询问看法。",
      level: "高中基础题"
    },
    {
      id: "g-en-61",
      subject: "英语",
      type: "tense",
      prompt: "I ___ this book last week.",
      options: ["buy", "buys", "bought", "buying"],
      answer: "bought",
      explanation: "last week 提示一般过去时，buy 的过去式是 bought。",
      level: "大学送分题"
    },
    {
      id: "g-en-62",
      subject: "英语",
      type: "passive",
      prompt: "The letter ___ yesterday.",
      options: ["send", "sent", "was sent", "is sent"],
      answer: "was sent",
      explanation: "yesterday 提示一般过去时，被动语态用 was sent。",
      level: "大学基础题"
    },
    {
      id: "g-en-63",
      subject: "英语",
      type: "phrase",
      prompt: "Which phrase means “由……组成”？",
      options: ["be made up of", "be interested in", "be good at", "be afraid of"],
      answer: "be made up of",
      explanation: "be made up of 表示“由……组成”。",
      level: "大学基础题"
    },
    {
      id: "g-en-64",
      subject: "英语",
      type: "reading",
      prompt: "Anna was busy, so she didn’t go with us. Why didn’t Anna go with us?",
      options: ["Because she was busy.", "Because she was sick.", "Because she was angry.", "Because she was late."],
      answer: "Because she was busy.",
      explanation: "题目直接给出了原因：she was busy。",
      level: "大学送分题"
    },
    {
      id: "g-en-65",
      subject: "英语",
      type: "dialogue",
      prompt: "“Would you mind opening the window?” 更接近下面哪种意思？",
      options: ["你介意把窗户打开吗？", "你想关窗吗？", "你会修窗吗？", "你什么时候擦窗？"],
      answer: "你介意把窗户打开吗？",
      explanation: "Would you mind ...? 常用于委婉请求。",
      level: "大学基础题"
    },
    {
      id: "g-en-66",
      subject: "英语",
      type: "tense",
      prompt: "She ___ in Shanghai since 2020.",
      options: ["lives", "lived", "has lived", "living"],
      answer: "has lived",
      explanation: "since 2020 常提示现在完成时，用 has lived。",
      level: "大学基础题"
    },
    {
      id: "g-en-67",
      subject: "英语",
      type: "passive",
      prompt: "The problem ___ soon.",
      options: ["solve", "solves", "will solve", "will be solved"],
      answer: "will be solved",
      explanation: "问题将被解决，要用一般将来时的被动语态 will be solved。",
      level: "大学基础题"
    },
    {
      id: "g-en-68",
      subject: "英语",
      type: "phrase",
      prompt: "Which phrase means “依赖，取决于”？",
      options: ["depend on", "wait for", "laugh at", "talk about"],
      answer: "depend on",
      explanation: "depend on 表示“依赖，取决于”。",
      level: "大学基础题"
    },
    {
      id: "g-en-69",
      subject: "英语",
      type: "reading",
      prompt: "The meeting was canceled because of the rain. Why was the meeting canceled?",
      options: ["Because of the rain.", "Because of the wind.", "Because of the snow.", "Because of the traffic."],
      answer: "Because of the rain.",
      explanation: "题目中已经直接给出了原因。",
      level: "大学送分题"
    },
    {
      id: "g-en-70",
      subject: "英语",
      type: "dialogue",
      prompt: "“Do you mind if I sit here?” 更接近下面哪种意思？",
      options: ["我坐这里你介意吗？", "你为什么坐这里？", "你能坐这里吗？", "我什么时候坐这里？"],
      answer: "我坐这里你介意吗？",
      explanation: "Do you mind if ...? 常用于礼貌征求对方意见。",
      level: "大学基础题"
    },
    {
      id: "g-en-71",
      subject: "英语",
      type: "modal",
      prompt: "You ___ wear a seat belt when driving.",
      options: ["should", "would", "could", "might"],
      answer: "should",
      explanation: "这里表示建议或应当，常用 should。",
      level: "大学基础题"
    },
    {
      id: "g-en-72",
      subject: "英语",
      type: "nonfinite",
      prompt: "I want ___ English well.",
      options: ["learn", "to learn", "learned", "learning"],
      answer: "to learn",
      explanation: "want 后常接不定式 to do。",
      level: "大学基础题"
    },
    {
      id: "g-en-73",
      subject: "英语",
      type: "phrase",
      prompt: "Which phrase means “由……导致”？",
      options: ["result in", "look after", "agree with", "wait for"],
      answer: "result in",
      explanation: "result in 表示“导致”。",
      level: "大学基础题"
    },
    {
      id: "g-en-74",
      subject: "英语",
      type: "reading",
      prompt: "The train was late, so we arrived after noon. When did we arrive?",
      options: ["After noon", "Before noon", "At midnight", "At sunrise"],
      answer: "After noon",
      explanation: "题目直接说 we arrived after noon。",
      level: "大学送分题"
    },
    {
      id: "g-en-75",
      subject: "英语",
      type: "dialogue",
      prompt: "“I’m afraid I can’t go with you.” 更接近下面哪种意思？",
      options: ["恐怕我不能和你一起去", "我不怕和你一起去", "我想立刻和你走", "我愿意替你去"],
      answer: "恐怕我不能和你一起去",
      explanation: "I’m afraid ... 常用于委婉表达遗憾或拒绝。",
      level: "大学基础题"
    },
    {
      id: "g-en-76",
      subject: "英语",
      type: "modal",
      prompt: "You ___ finish your homework before going out.",
      options: ["must", "might", "would", "could"],
      answer: "must",
      explanation: "这里表示必须，常用 must。",
      level: "大学基础题"
    },
    {
      id: "g-en-77",
      subject: "英语",
      type: "nonfinite",
      prompt: "It is important ___ English every day.",
      options: ["read", "to read", "reading", "reads"],
      answer: "to read",
      explanation: "It is important to do ... 是常见结构。",
      level: "大学基础题"
    },
    {
      id: "g-en-78",
      subject: "英语",
      type: "phrase",
      prompt: "Which phrase means “习惯于”？",
      options: ["be used to", "be proud of", "be worried about", "be tired of"],
      answer: "be used to",
      explanation: "be used to 常表示“习惯于”。",
      level: "大学基础题"
    },
    {
      id: "g-en-79",
      subject: "英语",
      type: "reading",
      prompt: "Peter missed the bus, so he was late for class. Why was Peter late?",
      options: ["Because he missed the bus.", "Because he got up early.", "Because he finished homework.", "Because he took a taxi."],
      answer: "Because he missed the bus.",
      explanation: "题目已经给出了原因：he missed the bus。",
      level: "大学送分题"
    },
    {
      id: "g-en-80",
      subject: "英语",
      type: "dialogue",
      prompt: "“It doesn’t matter.” 更接近下面哪种意思？",
      options: ["没关系", "太重要了", "我不同意", "我不明白"],
      answer: "没关系",
      explanation: "It doesn’t matter. 常表示“没关系”。",
      level: "大学送分题"
    },
    {
      id: "g-en-81",
      subject: "英语",
      type: "connector",
      prompt: "Which word is often used to show a result?",
      options: ["therefore", "although", "unless", "during"],
      answer: "therefore",
      explanation: "therefore 常用来表示结果，意思接近“因此”。",
      level: "大学基础题"
    },
    {
      id: "g-en-82",
      subject: "英语",
      type: "academic-expression",
      prompt: "Which phrase is closer to “总之”？",
      options: ["in conclusion", "in danger", "in public", "in time"],
      answer: "in conclusion",
      explanation: "in conclusion 常用于总结，意思接近“总之”。",
      level: "大学基础题"
    },
    {
      id: "g-en-83",
      subject: "英语",
      type: "connector",
      prompt: "Which word is often used to show contrast?",
      options: ["however", "therefore", "besides", "because"],
      answer: "however",
      explanation: "however 常用来表示转折或对比。",
      level: "大学基础题"
    },
    {
      id: "g-en-84",
      subject: "英语",
      type: "academic-expression",
      prompt: "Which phrase is closer to “例如”？",
      options: ["for example", "as a result", "in fact", "at last"],
      answer: "for example",
      explanation: "for example 常用于举例说明。",
      level: "大学送分题"
    },
    {
      id: "g-en-85",
      subject: "英语",
      type: "connector",
      prompt: "Which word is often used to add another point?",
      options: ["moreover", "however", "instead", "although"],
      answer: "moreover",
      explanation: "moreover 常用于进一步补充观点，意思接近“此外”。",
      level: "大学基础题"
    },
    {
      id: "g-en-86",
      subject: "英语",
      type: "academic-expression",
      prompt: "Which phrase is closer to “换句话说”？",
      options: ["in other words", "as a result", "at present", "by the way"],
      answer: "in other words",
      explanation: "in other words 常表示“换句话说”。",
      level: "大学基础题"
    },
    {
      id: "g-en-87",
      subject: "英语",
      type: "connector",
      prompt: "Which word is often used to show a reason?",
      options: ["because", "however", "therefore", "meanwhile"],
      answer: "because",
      explanation: "because 常用来引导原因。",
      level: "大学基础题"
    },
    {
      id: "g-en-88",
      subject: "英语",
      type: "academic-expression",
      prompt: "Which phrase is closer to “首先”？",
      options: ["first of all", "on the contrary", "in fact", "as usual"],
      answer: "first of all",
      explanation: "first of all 常用于列举时表示“首先”。",
      level: "大学送分题"
    },
    {
      id: "g-en-89",
      subject: "英语",
      type: "modal",
      prompt: "You ___ smoke here. It is not allowed.",
      options: ["mustn’t", "needn’t", "wouldn’t", "shouldn’t have"],
      answer: "mustn’t",
      explanation: "mustn’t 表示禁止，不允许。",
      level: "大学基础题"
    },
    {
      id: "g-en-90",
      subject: "英语",
      type: "nonfinite",
      prompt: "He decided ___ earlier the next day.",
      options: ["leave", "to leave", "leaving", "left"],
      answer: "to leave",
      explanation: "decide 后常接不定式 to do。",
      level: "大学基础题"
    },
    {
      id: "g-en-91",
      subject: "英语",
      type: "tone-purpose",
      prompt: "Which phrase is often used to show personal opinion in formal writing?",
      options: ["in my view", "at the station", "on the wall", "for two days"],
      answer: "in my view",
      explanation: "`in my view` is often used to introduce an opinion politely.",
      level: "大学基础题"
    },
    {
      id: "g-en-92",
      subject: "英语",
      type: "fixed-expression",
      prompt: "Which phrase is closer to “按时” ?",
      options: ["on time", "at once", "in time", "for a time"],
      answer: "on time",
      explanation: "on time 表示“按时、准时”。",
      level: "大学送分题"
    },
    {
      id: "g-en-93",
      subject: "英语",
      type: "modal",
      prompt: "You ___ finish your homework before dinner. It is necessary.",
      options: ["must", "may", "could", "might"],
      answer: "must",
      explanation: "must 可表示“必须”，强调必要性。",
      level: "大学基础题"
    },
    {
      id: "g-en-94",
      subject: "英语",
      type: "paragraph-order",
      prompt: "Which word is more suitable to introduce a contrast in writing?",
      options: ["however", "therefore", "besides", "finally"],
      answer: "however",
      explanation: "`however` is commonly used to introduce a contrast.",
      level: "大学送分题"
    },
    {
      id: "g-en-95",
      subject: "英语",
      type: "nonfinite",
      prompt: "She hopes ___ abroad one day.",
      options: ["study", "to study", "studying", "studied"],
      answer: "to study",
      explanation: "hope 后常接不定式 to do。",
      level: "大学基础题"
    },
    {
      id: "g-en-96",
      subject: "英语",
      type: "be-verb",
      prompt: "She ___ a student.",
      options: ["is", "are", "am", "be"],
      answer: "is",
      explanation: "主语是 she，be 动词通常用 is。",
      level: "初中送分题"
    },
    {
      id: "g-en-97",
      subject: "英语",
      type: "past-tense",
      prompt: "Yesterday we ___ to the park.",
      options: ["go", "goes", "went", "going"],
      answer: "went",
      explanation: "yesterday 提示用一般过去时，go 的过去式是 went。",
      level: "初中基础题"
    },
    {
      id: "g-en-98",
      subject: "英语",
      type: "preposition",
      prompt: "The book is ___ the desk.",
      options: ["on", "at", "from", "with"],
      answer: "on",
      explanation: "表示“在桌子上”，通常用 on。",
      level: "初中送分题"
    },
    {
      id: "g-en-99",
      subject: "英语",
      type: "passive",
      prompt: "These books ___ by the library every year.",
      options: ["are checked", "checked", "checks", "are checking"],
      answer: "are checked",
      explanation: "这里表示“这些书被检查”，常用被动语态 are checked。",
      level: "高中基础题"
    },
    {
      id: "g-en-100",
      subject: "英语",
      type: "clause",
      prompt: "I know ___ he is right.",
      options: ["that", "what", "where", "who"],
      answer: "that",
      explanation: "that 可引导宾语从句。",
      level: "高中基础题"
    },
    {
      id: "g-en-101",
      subject: "英语",
      type: "reading",
      prompt: "If a passage is mainly about healthy food, its topic is about ___.",
      options: ["diet", "weather", "travel", "music"],
      answer: "diet",
      explanation: "healthy food 的主题更接近 diet。",
      level: "高中常识题"
    },
    {
      id: "g-en-102",
      subject: "英语",
      type: "connector",
      prompt: "Which word is often used to add a similar idea?",
      options: ["besides", "however", "unless", "instead"],
      answer: "besides",
      explanation: "besides 常用来补充相近信息，意思接近“此外”。",
      level: "大学基础题"
    },
    {
      id: "g-en-103",
      subject: "英语",
      type: "fixed-expression",
      prompt: "Which phrase is closer to “做决定” ?",
      options: ["make a decision", "take a lesson", "have a seat", "keep a diary"],
      answer: "make a decision",
      explanation: "make a decision 表示“做决定”。",
      level: "大学送分题"
    },
    {
      id: "g-en-104",
      subject: "英语",
      type: "modal",
      prompt: "May I come in? 这句话更接近什么语气？",
      options: ["礼貌请求", "强烈命令", "否定判断", "过去推测"],
      answer: "礼貌请求",
      explanation: "May I ...? 常用于礼貌请求许可。",
      level: "大学基础题"
    },
    {
      id: "g-en-105",
      subject: "英语",
      type: "academic-expression",
      prompt: "Which phrase is closer to “总的来说” ?",
      options: ["in general", "by chance", "at night", "for free"],
      answer: "in general",
      explanation: "in general 常表示“总的来说、通常而言”。",
      level: "大学基础题"
    },
    {
      id: "g-en-106",
      subject: "英语",
      type: "be-verb",
      prompt: "They ___ my friends.",
      options: ["am", "is", "are", "be"],
      answer: "are",
      explanation: "主语是 they，be 动词通常用 are。",
      level: "初中送分题"
    },
    {
      id: "g-en-107",
      subject: "英语",
      type: "present-simple",
      prompt: "My father ___ to work by bus.",
      options: ["go", "goes", "going", "went"],
      answer: "goes",
      explanation: "主语是第三人称单数，通常用 goes。",
      level: "初中基础题"
    },
    {
      id: "g-en-108",
      subject: "英语",
      type: "preposition",
      prompt: "The cat is ___ the chair.",
      options: ["under", "from", "for", "with"],
      answer: "under",
      explanation: "表示“在椅子下面”，通常用 under。",
      level: "初中送分题"
    },
    {
      id: "g-en-109",
      subject: "英语",
      type: "fixed-expression",
      prompt: "“What about you?” is closer to which meaning?",
      options: ["你呢？", "你好吗？", "你去哪儿？", "你为什么？"],
      answer: "你呢？",
      explanation: "What about you? 常用来询问对方的情况或看法。",
      level: "初中基础题"
    },
    {
      id: "g-en-110",
      subject: "英语",
      type: "reading",
      prompt: "If Tom is 14 years old, he is a ___.",
      options: ["teenager", "doctor", "driver", "baby"],
      answer: "teenager",
      explanation: "14 years old is within the teenage years.",
      level: "初中常识题"
    },
    {
      id: "g-en-111",
      subject: "英语",
      type: "passive",
      prompt: "The window ___ by the cleaner every morning.",
      options: ["is opened", "opens", "opened", "is opening"],
      answer: "is opened",
      explanation: "这里表示“窗户被打开”，常用被动语态 is opened。",
      level: "高中基础题"
    },
    {
      id: "g-en-112",
      subject: "英语",
      type: "clause",
      prompt: "I don’t know ___ she will come.",
      options: ["whether", "which", "whom", "whose"],
      answer: "whether",
      explanation: "whether 常用于引导“是否”意义的从句。",
      level: "高中基础题"
    },
    {
      id: "g-en-113",
      subject: "英语",
      type: "vocabulary",
      prompt: "Which word is closer to “机会” ?",
      options: ["chance", "choice", "change", "charge"],
      answer: "chance",
      explanation: "chance 常表示“机会”。",
      level: "高中送分题"
    },
    {
      id: "g-en-114",
      subject: "英语",
      type: "reading",
      prompt: "If an article is about saving water, its topic is closer to ___.",
      options: ["environment", "music", "sports", "history"],
      answer: "environment",
      explanation: "saving water is closely related to the environment.",
      level: "高中常识题"
    },
    {
      id: "g-en-115",
      subject: "英语",
      type: "nonfinite",
      prompt: "It is important ___ enough sleep.",
      options: ["get", "to get", "getting", "got"],
      answer: "to get",
      explanation: "It is important to do... 是常见句型。",
      level: "高中基础题"
    },
    {
      id: "g-en-116",
      subject: "英语",
      type: "connector",
      prompt: "Which word is often used to show a choice between two things?",
      options: ["either", "however", "because", "during"],
      answer: "either",
      explanation: "either 常出现在 two choices 的结构中。",
      level: "大学基础题"
    },
    {
      id: "g-en-117",
      subject: "英语",
      type: "fixed-expression",
      prompt: "Which phrase is closer to “取得进步” ?",
      options: ["make progress", "keep silent", "take notes", "make trouble"],
      answer: "make progress",
      explanation: "make progress 表示“取得进步”。",
      level: "大学送分题"
    },
    {
      id: "g-en-118",
      subject: "英语",
      type: "modal",
      prompt: "You ___ hand in the report today. The teacher said it is required.",
      options: ["must", "might", "could", "would"],
      answer: "must",
      explanation: "must 表示“必须”，符合题意。",
      level: "大学基础题"
    },
    {
      id: "g-en-119",
      subject: "英语",
      type: "academic-expression",
      prompt: "Which phrase is closer to “另一方面” ?",
      options: ["on the other hand", "for example", "in time", "of course"],
      answer: "on the other hand",
      explanation: "on the other hand 常表示“另一方面”。",
      level: "大学基础题"
    },
    {
      id: "g-en-120",
      subject: "英语",
      type: "polite-expression",
      prompt: "Which sentence is more polite when asking someone to close the door?",
      options: ["Could you close the door?", "Close the door.", "You close the door.", "Door close now."],
      answer: "Could you close the door?",
      explanation: "Could you ...? is a common polite request pattern.",
      level: "大学常识题"
    },
    {
      id: "g-en-121",
      subject: "英语",
      type: "family-member",
      prompt: "Which word means “叔叔” ?",
      options: ["uncle", "aunt", "brother", "cousin"],
      answer: "uncle",
      explanation: "uncle means “叔叔、舅舅、伯伯”等。",
      level: "小学送分题"
    },
    {
      id: "g-en-122",
      subject: "英语",
      type: "classroom-command",
      prompt: "Which instruction means “请打开书”？",
      options: ["Open your book.", "Close your eyes.", "Stand up.", "Sit down."],
      answer: "Open your book.",
      explanation: "`Open your book.` means “请打开书”。",
      level: "小学送分题"
    },
    {
      id: "g-en-123",
      subject: "英语",
      type: "number-word",
      prompt: "Which word means “十五” ?",
      options: ["fifteen", "fifty", "fourteen", "sixteen"],
      answer: "fifteen",
      explanation: "fifteen means “十五”。",
      level: "小学送分题"
    },
    {
      id: "g-en-124",
      subject: "英语",
      type: "animal-word",
      prompt: "Which word means “兔子” ?",
      options: ["rabbit", "tiger", "horse", "monkey"],
      answer: "rabbit",
      explanation: "rabbit means “兔子”。",
      level: "小学送分题"
    },
    {
      id: "g-en-125",
      subject: "英语",
      type: "school-word",
      prompt: "Which word is used for “老师” ?",
      options: ["teacher", "farmer", "driver", "doctor"],
      answer: "teacher",
      explanation: "teacher means “老师”。",
      level: "小学送分题"
    },
    {
      id: "g-en-126",
      subject: "英语",
      type: "weather-word",
      prompt: "Which word means “下雨的” ?",
      options: ["rainy", "sunny", "windy", "cloudy"],
      answer: "rainy",
      explanation: "rainy means “下雨的”。",
      level: "小学基础题"
    },
    {
      id: "g-en-127",
      subject: "英语",
      type: "direction-word",
      prompt: "Which word means “左边” ?",
      options: ["left", "right", "up", "down"],
      answer: "left",
      explanation: "left means “左边”。",
      level: "小学送分题"
    },
    {
      id: "g-en-128",
      subject: "英语",
      type: "greeting",
      prompt: "What do you usually say in the morning?",
      options: ["Good morning.", "Good night.", "Goodbye.", "Sorry."],
      answer: "Good morning.",
      explanation: "Good morning. is used in the morning.",
      level: "小学送分题"
    },
    {
      id: "g-en-129",
      subject: "英语",
      type: "action-word",
      prompt: "Which word means “跑” ?",
      options: ["run", "read", "draw", "sing"],
      answer: "run",
      explanation: "run means “跑”。",
      level: "小学基础题"
    },
    {
      id: "g-en-130",
      subject: "英语",
      type: "daily-dialogue",
      prompt: "When someone says “Thank you.”, you can say ___.",
      options: ["You’re welcome.", "Goodbye.", "See you.", "Excuse me."],
      answer: "You’re welcome.",
      explanation: "You’re welcome. is a common reply to thanks.",
      level: "小学基础题"
    },
    {
      id: "g-en-131",
      subject: "英语",
      type: "be-verb",
      prompt: "I ___ happy today.",
      options: ["am", "is", "are", "be"],
      answer: "am",
      explanation: "主语是 I，be 动词通常用 am。",
      level: "初中送分题"
    },
    {
      id: "g-en-132",
      subject: "英语",
      type: "present-simple",
      prompt: "He ___ English every day.",
      options: ["study", "studies", "studied", "studying"],
      answer: "studies",
      explanation: "第三人称单数主语后通常用 studies。",
      level: "初中基础题"
    },
    {
      id: "g-en-133",
      subject: "英语",
      type: "past-tense",
      prompt: "Last night we ___ a movie.",
      options: ["watch", "watched", "watches", "watching"],
      answer: "watched",
      explanation: "Last night 提示用一般过去时。",
      level: "初中基础题"
    },
    {
      id: "g-en-134",
      subject: "英语",
      type: "time-expression",
      prompt: "Which phrase means “在周末” ?",
      options: ["on weekends", "in school", "at home", "for lunch"],
      answer: "on weekends",
      explanation: "on weekends means “在周末”。",
      level: "初中送分题"
    },
    {
      id: "g-en-135",
      subject: "英语",
      type: "position-word",
      prompt: "Which word means “在……之间” ?",
      options: ["between", "behind", "under", "across"],
      answer: "between",
      explanation: "`between` means “在……之间”。",
      level: "初中送分题"
    },
    {
      id: "g-en-136",
      subject: "英语",
      type: "job-word",
      prompt: "A person who teaches students is a ___.",
      options: ["teacher", "farmer", "pilot", "cook"],
      answer: "teacher",
      explanation: "A teacher teaches students.",
      level: "初中送分题"
    },
    {
      id: "g-en-137",
      subject: "英语",
      type: "reading",
      prompt: "Lucy is in the classroom. Where is Lucy?",
      options: ["In the classroom.", "At the zoo.", "In the park.", "At home."],
      answer: "In the classroom.",
      explanation: "The sentence already tells us where Lucy is.",
      level: "初中送分题"
    },
    {
      id: "g-en-138",
      subject: "英语",
      type: "preposition",
      prompt: "The picture is ___ the wall.",
      options: ["on", "for", "from", "into"],
      answer: "on",
      explanation: "on the wall is the common expression.",
      level: "初中基础题"
    },
    {
      id: "g-en-139",
      subject: "英语",
      type: "fixed-expression",
      prompt: "“How old are you?” is used to ask about ___.",
      options: ["age", "name", "job", "hobby"],
      answer: "age",
      explanation: "How old are you? asks about age.",
      level: "初中送分题"
    },
    {
      id: "g-en-140",
      subject: "英语",
      type: "dialogue",
      prompt: "“See you tomorrow.” is closer to which meaning?",
      options: ["明天见。", "谢谢你。", "晚上好。", "没关系。"],
      answer: "明天见。",
      explanation: "See you tomorrow. means “明天见”。",
      level: "初中送分题"
    },
    {
      id: "g-en-141",
      subject: "英语",
      type: "reading",
      prompt: "If a student likes science, he may enjoy ___.",
      options: ["physics", "sleeping", "traffic", "shopping"],
      answer: "physics",
      explanation: "physics is a science subject.",
      level: "初中常识题"
    },
    {
      id: "g-en-142",
      subject: "英语",
      type: "present-simple-negative",
      prompt: "She ___ like coffee.",
      options: ["doesn’t", "don’t", "isn’t", "not"],
      answer: "doesn’t",
      explanation: "第三人称单数否定常用 doesn’t。",
      level: "初中基础题"
    },
    {
      id: "g-en-143",
      subject: "英语",
      type: "be-verb",
      prompt: "We ___ in the same class.",
      options: ["are", "is", "am", "be"],
      answer: "are",
      explanation: "主语是 we，be 动词通常用 are。",
      level: "初中送分题"
    },
    {
      id: "g-en-144",
      subject: "英语",
      type: "past-tense",
      prompt: "He ___ home late yesterday.",
      options: ["arrive", "arrived", "arrives", "arriving"],
      answer: "arrived",
      explanation: "yesterday 提示用过去式 arrived。",
      level: "初中基础题"
    },
    {
      id: "g-en-145",
      subject: "英语",
      type: "preposition",
      prompt: "The library is ___ the bank and the school.",
      options: ["between", "under", "with", "after"],
      answer: "between",
      explanation: "between is used for two things.",
      level: "初中基础题"
    },
    {
      id: "g-en-146",
      subject: "英语",
      type: "reading",
      prompt: "If the notice says “No smoking”, people should ___.",
      options: ["stop smoking", "smoke more", "open the window", "leave early"],
      answer: "stop smoking",
      explanation: "No smoking means people should not smoke.",
      level: "初中常识题"
    },
    {
      id: "g-en-147",
      subject: "英语",
      type: "fixed-expression",
      prompt: "Which phrase is closer to “起床” ?",
      options: ["get up", "sit down", "go out", "look for"],
      answer: "get up",
      explanation: "get up means “起床”。",
      level: "初中送分题"
    },
    {
      id: "g-en-148",
      subject: "英语",
      type: "dialogue",
      prompt: "“Can I help you?” is often used in a ___.",
      options: ["shop", "classroom only", "bus stop only", "playground only"],
      answer: "shop",
      explanation: "Can I help you? is common in shops.",
      level: "初中常识题"
    },
    {
      id: "g-en-149",
      subject: "英语",
      type: "time-expression",
      prompt: "Which phrase means “半小时”？",
      options: ["half an hour", "an hour", "a day", "a week"],
      answer: "half an hour",
      explanation: "`half an hour` means “半小时”。",
      level: "初中送分题"
    },
    {
      id: "g-en-150",
      subject: "英语",
      type: "present-simple",
      prompt: "My parents ___ TV after dinner.",
      options: ["watch", "watches", "watched", "watching"],
      answer: "watch",
      explanation: "主语是复数 parents，通常用 watch。",
      level: "初中基础题"
    },
    {
      id: "g-en-151",
      subject: "英语",
      type: "time-expression",
      prompt: "Which phrase means “在八点” ?",
      options: ["at eight", "on eight", "in eight", "from eight"],
      answer: "at eight",
      explanation: "具体时刻前常用 at。",
      level: "初中送分题"
    },
    {
      id: "g-en-152",
      subject: "英语",
      type: "reading",
      prompt: "If Amy is my mother’s daughter, Amy may be my ___.",
      options: ["sister", "teacher", "cousin", "doctor"],
      answer: "sister",
      explanation: "mother’s daughter may be my sister.",
      level: "初中基础题"
    },
    {
      id: "g-en-153",
      subject: "英语",
      type: "tense",
      prompt: "Look! The boy ___ basketball now.",
      options: ["is playing", "played", "plays", "play"],
      answer: "is playing",
      explanation: "Look! 和 now 常提示现在进行时。",
      level: "高中基础题"
    },
    {
      id: "g-en-154",
      subject: "英语",
      type: "passive",
      prompt: "The letters ___ every afternoon.",
      options: ["are sent", "send", "sent", "are sending"],
      answer: "are sent",
      explanation: "这里表示“信件被寄出”，用被动语态。",
      level: "高中基础题"
    },
    {
      id: "g-en-155",
      subject: "英语",
      type: "clause",
      prompt: "I think ___ he is honest.",
      options: ["that", "who", "where", "when"],
      answer: "that",
      explanation: "that 常用来引导宾语从句。",
      level: "高中送分题"
    },
    {
      id: "g-en-156",
      subject: "英语",
      type: "vocabulary",
      prompt: "Which word is closer to “成功” ?",
      options: ["success", "surprise", "silence", "service"],
      answer: "success",
      explanation: "success means “成功”。",
      level: "高中送分题"
    },
    {
      id: "g-en-157",
      subject: "英语",
      type: "reading",
      prompt: "If a text tells you how to save energy, it is likely about ___.",
      options: ["environment", "fashion", "traffic rules", "painting"],
      answer: "environment",
      explanation: "saving energy is closely related to the environment.",
      level: "高中常识题"
    },
    {
      id: "g-en-158",
      subject: "英语",
      type: "nonfinite",
      prompt: "She wants ___ a nurse in the future.",
      options: ["to be", "be", "being", "been"],
      answer: "to be",
      explanation: "want 后常接不定式 to do。",
      level: "高中基础题"
    },
    {
      id: "g-en-159",
      subject: "英语",
      type: "fixed-expression",
      prompt: "Which phrase is closer to “事实上” ?",
      options: ["in fact", "at first", "by train", "at least"],
      answer: "in fact",
      explanation: "in fact means “事实上”。",
      level: "高中送分题"
    },
    {
      id: "g-en-160",
      subject: "英语",
      type: "connector",
      prompt: "Which word is often used to show a condition?",
      options: ["if", "therefore", "however", "besides"],
      answer: "if",
      explanation: "if is often used to show a condition.",
      level: "高中基础题"
    },
    {
      id: "g-en-161",
      subject: "英语",
      type: "tense",
      prompt: "By 2025, they ___ the bridge.",
      options: ["will finish", "will have finished", "finished", "are finishing"],
      answer: "will have finished",
      explanation: "By + future time often fits future perfect better.",
      level: "高中基础题"
    },
    {
      id: "g-en-162",
      subject: "英语",
      type: "passive",
      prompt: "English songs ___ by many young people.",
      options: ["are loved", "love", "loved", "are loving"],
      answer: "are loved",
      explanation: "这里表示“被喜爱”，常用被动语态。",
      level: "高中基础题"
    },
    {
      id: "g-en-163",
      subject: "英语",
      type: "clause",
      prompt: "This is the place ___ I was born.",
      options: ["where", "which", "what", "whose"],
      answer: "where",
      explanation: "where 可引导表示地点的定语从句。",
      level: "高中基础题"
    },
    {
      id: "g-en-164",
      subject: "英语",
      type: "vocabulary",
      prompt: "Which word is closer to “传统的” ?",
      options: ["traditional", "national", "natural", "personal"],
      answer: "traditional",
      explanation: "traditional means “传统的”。",
      level: "高中送分题"
    },
    {
      id: "g-en-165",
      subject: "英语",
      type: "reading",
      prompt: "If a passage tells students to exercise, eat well and sleep enough, its main idea is about ___.",
      options: ["healthy lifestyle", "school history", "city traffic", "movie reviews"],
      answer: "healthy lifestyle",
      explanation: "Those details point to a healthy lifestyle.",
      level: "高中常识题"
    },
    {
      id: "g-en-166",
      subject: "英语",
      type: "nonfinite",
      prompt: "The best way ___ English is to read more.",
      options: ["to learn", "learn", "learning", "learned"],
      answer: "to learn",
      explanation: "The best way to do... is a common pattern.",
      level: "高中基础题"
    },
    {
      id: "g-en-167",
      subject: "英语",
      type: "fixed-expression",
      prompt: "Which phrase is closer to “做笔记” ?",
      options: ["take notes", "give up", "put off", "turn on"],
      answer: "take notes",
      explanation: "take notes means “做笔记”。",
      level: "高中送分题"
    },
    {
      id: "g-en-168",
      subject: "英语",
      type: "connector",
      prompt: "Which word is often used to show time happening at the same time?",
      options: ["meanwhile", "however", "therefore", "unless"],
      answer: "meanwhile",
      explanation: "meanwhile is often used to show something happening at the same time.",
      level: "高中基础题"
    },
    {
      id: "g-en-169",
      subject: "英语",
      type: "tense",
      prompt: "She ___ here since 2020.",
      options: ["has worked", "worked", "works", "is working"],
      answer: "has worked",
      explanation: "since 2020 often matches present perfect.",
      level: "高中基础题"
    },
    {
      id: "g-en-170",
      subject: "英语",
      type: "passive",
      prompt: "The bridge ___ last year.",
      options: ["was built", "builds", "is built", "building"],
      answer: "was built",
      explanation: "last year 提示过去时，被建造要用被动。",
      level: "高中基础题"
    },
    {
      id: "g-en-171",
      subject: "英语",
      type: "connector",
      prompt: "Which word is often used to show a different choice?",
      options: ["instead", "because", "therefore", "moreover"],
      answer: "instead",
      explanation: "instead is often used to show a different choice or option.",
      level: "高中基础题"
    },
    {
      id: "g-en-172",
      subject: "英语",
      type: "reading",
      prompt: "If an ad says “Buy one, get one free”, it mainly tells people about ___.",
      options: ["a sale", "a school rule", "a weather report", "a science fact"],
      answer: "a sale",
      explanation: "That sentence is a common sales message.",
      level: "高中常识题"
    },
    {
      id: "g-en-173",
      subject: "英语",
      type: "vocabulary",
      prompt: "Which word is closer to “责任” ?",
      options: ["responsibility", "response", "resource", "result"],
      answer: "responsibility",
      explanation: "responsibility means “责任”。",
      level: "高中基础题"
    },
    {
      id: "g-en-174",
      subject: "英语",
      type: "nonfinite",
      prompt: "He is too young ___ alone.",
      options: ["to travel", "travel", "traveling", "traveled"],
      answer: "to travel",
      explanation: "too ... to do is a common structure.",
      level: "高中基础题"
    },
    {
      id: "g-en-175",
      subject: "英语",
      type: "connector",
      prompt: "Which word is closer to “否则” ?",
      options: ["otherwise", "meanwhile", "besides", "already"],
      answer: "otherwise",
      explanation: "otherwise means “否则”。",
      level: "大学基础题"
    },
    {
      id: "g-en-176",
      subject: "英语",
      type: "academic-expression",
      prompt: "Which phrase is closer to “结果” ?",
      options: ["as a result", "by the way", "after all", "at once"],
      answer: "as a result",
      explanation: "as a result means “结果、因此”。",
      level: "大学基础题"
    },
    {
      id: "g-en-177",
      subject: "英语",
      type: "fixed-expression",
      prompt: "Which phrase is closer to “尽力” ?",
      options: ["do one’s best", "take a break", "lose one’s way", "make a call"],
      answer: "do one’s best",
      explanation: "do one’s best means “尽力”。",
      level: "大学送分题"
    },
    {
      id: "g-en-178",
      subject: "英语",
      type: "modal",
      prompt: "You ___ be careful when driving in the rain.",
      options: ["should", "might not", "would have", "used to"],
      answer: "should",
      explanation: "should is often used for advice.",
      level: "大学基础题"
    },
    {
      id: "g-en-179",
      subject: "英语",
      type: "polite-expression",
      prompt: "Which sentence is more polite when asking for directions?",
      options: ["Could you tell me the way?", "Tell me the way.", "You tell me now.", "Say road."],
      answer: "Could you tell me the way?",
      explanation: "Could you ...? is a polite way to ask.",
      level: "大学常识题"
    },
    {
      id: "g-en-180",
      subject: "英语",
      type: "academic-expression",
      prompt: "Which phrase is closer to “简而言之” ?",
      options: ["in short", "at midnight", "on purpose", "for a while"],
      answer: "in short",
      explanation: "in short means “简而言之”。",
      level: "大学基础题"
    }
  ],
  physics: [
    {
      id: "g-ph-1",
      subject: "物理",
      type: "float-sink",
      prompt: "木头放进水里通常会怎样？",
      options: ["浮起来", "马上融化", "立刻消失", "一定沉到底"],
      answer: "浮起来",
      explanation: "木头密度通常比水小，所以更容易浮起来。",
      level: "小学基础题"
    },
    {
      id: "g-ph-2",
      subject: "物理",
      type: "thermal-expansion",
      prompt: "夏天电线看起来更松一些，和下面哪种现象更接近？",
      options: ["热胀冷缩", "光沿直线传播", "磁铁吸铁", "声音传播"],
      answer: "热胀冷缩",
      explanation: "温度升高后，物体长度可能略微变大。",
      level: "小学常识题"
    },
    {
      id: "g-ph-3",
      subject: "物理",
      type: "conductor",
      prompt: "下面哪种材料更容易导电？",
      options: ["铜丝", "橡皮", "木头", "塑料尺"],
      answer: "铜丝",
      explanation: "金属铜容易导电。",
      level: "小学基础题"
    },
    {
      id: "g-ph-4",
      subject: "物理",
      type: "light-reflection",
      prompt: "我们能从镜子里看到自己，主要和什么现象有关？",
      options: ["光的反射", "声音变大", "空气流动", "物体下落"],
      answer: "光的反射",
      explanation: "镜子能反射光，所以我们能看到自己。",
      level: "小学基础题"
    },
    {
      id: "g-ph-5",
      subject: "物理",
      type: "magnet",
      prompt: "下面哪样东西最容易被磁铁吸住？",
      options: ["铁钉", "纸片", "木块", "塑料瓶"],
      answer: "铁钉",
      explanation: "磁铁容易吸引铁制物品。",
      level: "小学送分题"
    },
    {
      id: "g-ph-6",
      subject: "物理",
      type: "speed",
      prompt: "同样的路程下，谁用时更短谁就怎样？",
      options: ["更快", "更慢", "更轻", "更热"],
      answer: "更快",
      explanation: "路程一样，用时越短，速度越快。",
      level: "小学基础题"
    },
    {
      id: "g-ph-7",
      subject: "物理",
      type: "circuit",
      prompt: "让小灯泡亮起来，最少需要哪两样东西？",
      options: ["电池和灯泡", "水杯和纸", "绳子和尺子", "石头和木头"],
      answer: "电池和灯泡",
      explanation: "简单电路里常见的基本元件有电池和灯泡。",
      level: "小学常识题"
    },
    {
      id: "g-ph-8",
      subject: "物理",
      type: "shadow",
      prompt: "晴天站在太阳下会出现什么？",
      options: ["影子", "彩虹一定出现", "声音消失", "空气变成水"],
      answer: "影子",
      explanation: "光被物体挡住后，背光一侧会形成影子。",
      level: "小学送分题"
    },
    {
      id: "g-ph-9",
      subject: "物理",
      type: "magnet",
      prompt: "下面哪种物体最容易被磁铁吸住？",
      options: ["回形针", "橡皮", "木块", "塑料勺"],
      answer: "回形针",
      explanation: "回形针通常是铁制品，容易被磁铁吸引。",
      level: "小学送分题"
    },
    {
      id: "g-ph-10",
      subject: "物理",
      type: "temperature-sense",
      prompt: "冬天摸到金属门把手会觉得更冷，和下面哪种说法更接近？",
      options: ["金属传热快", "金属会发光", "金属会漂浮", "金属没有重量"],
      answer: "金属传热快",
      explanation: "金属传热较快，所以手会更明显感觉到冷。",
      level: "小学常识题"
    },
    {
      id: "g-ph-11",
      subject: "物理",
      type: "speed-comparison",
      prompt: "同样 1 分钟，谁走得更快？",
      options: ["走 50 米的人", "走 20 米的人", "走 10 米的人", "三人一样快"],
      answer: "走 50 米的人",
      explanation: "时间相同，走得越远，速度越快。",
      level: "小学基础题"
    },
    {
      id: "g-ph-12",
      subject: "物理",
      type: "insulator",
      prompt: "下面哪种材料通常不容易导电？",
      options: ["塑料", "铜丝", "铁钉", "铝片"],
      answer: "塑料",
      explanation: "塑料常作绝缘材料使用。",
      level: "小学基础题"
    },
    {
      id: "g-ph-13",
      subject: "物理",
      type: "light-source",
      prompt: "下面哪样东西本身能发光？",
      options: ["电灯", "月亮", "桌子", "书本"],
      answer: "电灯",
      explanation: "电灯本身能发光，月亮主要是反射太阳光。",
      level: "小学基础题"
    },
    {
      id: "g-ph-14",
      subject: "物理",
      type: "float-sink",
      prompt: "把石头放进水里，通常会怎样？",
      options: ["沉下去", "浮起来", "变成气体", "变成木头"],
      answer: "沉下去",
      explanation: "石头通常会沉入水中。",
      level: "小学送分题"
    },
    {
      id: "g-ph-15",
      subject: "物理",
      type: "magnet",
      prompt: "磁铁最不容易吸住下面哪样东西？",
      options: ["木块", "铁钉", "回形针", "铁片"],
      answer: "木块",
      explanation: "木块通常不会被磁铁吸引。",
      level: "小学送分题"
    },
    {
      id: "g-ph-16",
      subject: "物理",
      type: "light-shadow",
      prompt: "灯光被手挡住后，墙上容易出现什么？",
      options: ["影子", "彩虹", "雪花", "声音"],
      answer: "影子",
      explanation: "光被物体挡住后会形成影子。",
      level: "小学基础题"
    },
    {
      id: "g-ph-17",
      subject: "物理",
      type: "tool-time",
      prompt: "跑步比赛计时更常用什么工具？",
      options: ["秒表", "放大镜", "量筒", "温度计"],
      answer: "秒表",
      explanation: "秒表适合用来计时。",
      level: "小学常识题"
    },
    {
      id: "g-ph-18",
      subject: "物理",
      type: "heat-expansion",
      prompt: "天气变热时，空气中的温度通常会怎样？",
      options: ["升高", "降低", "消失", "结冰"],
      answer: "升高",
      explanation: "天气变热时，温度通常会升高。",
      level: "小学送分题"
    },
    {
      id: "g-ph-19",
      subject: "物理",
      type: "conductor",
      prompt: "下面哪样东西更适合做导线材料？",
      options: ["铜", "纸", "木头", "橡皮"],
      answer: "铜",
      explanation: "铜导电性好，常被用作导线材料。",
      level: "小学常识题"
    },
    {
      id: "g-ph-20",
      subject: "物理",
      type: "speed-comparison",
      prompt: "同样走 30 秒，谁更慢？",
      options: ["走 15 米的人", "走 40 米的人", "走 60 米的人", "走 70 米的人"],
      answer: "走 15 米的人",
      explanation: "时间相同，走得越少，速度越慢。",
      level: "小学基础题"
    },
    {
      id: "g-ph-21",
      subject: "物理",
      type: "speed-formula",
      prompt: "速度通常可以表示为？",
      options: ["路程÷时间", "时间÷路程", "质量×体积", "压强÷面积"],
      answer: "路程÷时间",
      explanation: "速度等于路程除以时间。",
      level: "初中送分题"
    },
    {
      id: "g-ph-22",
      subject: "物理",
      type: "density",
      prompt: "体积相同的铁块和木块，通常哪个更重？",
      options: ["铁块", "木块", "一样重", "无法判断"],
      answer: "铁块",
      explanation: "通常铁的密度比木头大，所以同体积下更重。",
      level: "初中基础题"
    },
    {
      id: "g-ph-23",
      subject: "物理",
      type: "pressure",
      prompt: "刀刃做得很薄，主要是为了怎样？",
      options: ["增大压强", "减小重力", "增加体积", "减少速度"],
      answer: "增大压强",
      explanation: "受力面积更小，压强更大，更容易切开物体。",
      level: "初中基础题"
    },
    {
      id: "g-ph-24",
      subject: "物理",
      type: "circuit",
      prompt: "家里电灯和开关通常应该怎样连接才方便控制？",
      options: ["开关串联在电路中", "开关并联在灯两端", "只接一根线", "不用开关也能控制"],
      answer: "开关串联在电路中",
      explanation: "开关串联在电路中，断开或闭合时才能控制电流通断。",
      level: "初中基础题"
    },
    {
      id: "g-ph-25",
      subject: "物理",
      type: "reflection",
      prompt: "入射光线、反射光线和法线通常在什么关系中？",
      options: ["在同一平面内", "互相垂直", "互相平行", "毫无关系"],
      answer: "在同一平面内",
      explanation: "光的反射规律里，这三者在同一平面内。",
      level: "初中基础题"
    },
    {
      id: "g-ph-26",
      subject: "物理",
      type: "speed-calculation",
      prompt: "物体 5 秒走了 20 米，它的速度是多少？",
      options: ["2 米/秒", "4 米/秒", "5 米/秒", "25 米/秒"],
      answer: "4 米/秒",
      explanation: "速度 = 路程 ÷ 时间 = 20 ÷ 5 = 4 米/秒。",
      level: "初中送分题"
    },
    {
      id: "g-ph-27",
      subject: "物理",
      type: "density",
      prompt: "把同体积的木块和铁块放在手上，通常感觉哪个更重？",
      options: ["铁块", "木块", "一样重", "无法比较"],
      answer: "铁块",
      explanation: "通常铁的密度比木头大，所以同体积下更重。",
      level: "初中基础题"
    },
    {
      id: "g-ph-28",
      subject: "物理",
      type: "pressure",
      prompt: "书包带做得较宽，主要是为了怎样？",
      options: ["减小压强", "增大压强", "减小重力", "增大速度"],
      answer: "减小压强",
      explanation: "受力面积增大后，压强会减小，背起来更舒服。",
      level: "初中基础题"
    },
    {
      id: "g-ph-29",
      subject: "物理",
      type: "circuit",
      prompt: "小灯泡不亮时，下面哪种情况最可能导致电路不通？",
      options: ["开关断开", "导线连接好", "电池有电", "灯泡完好"],
      answer: "开关断开",
      explanation: "开关断开时，电路不闭合，电流不能通过。",
      level: "初中送分题"
    },
    {
      id: "g-ph-30",
      subject: "物理",
      type: "reflection",
      prompt: "平面镜成像时，像和物体大小通常怎样？",
      options: ["相等", "像更大", "像更小", "一定变化"],
      answer: "相等",
      explanation: "平面镜所成的像与物体大小相等。",
      level: "初中基础题"
    },
    {
      id: "g-ph-31",
      subject: "物理",
      type: "speed-formula",
      prompt: "已知速度和时间，求路程时通常用什么关系？",
      options: ["路程 = 速度 × 时间", "路程 = 速度 ÷ 时间", "路程 = 时间 ÷ 速度", "路程 = 质量 × 速度"],
      answer: "路程 = 速度 × 时间",
      explanation: "路程、速度、时间三者关系里，路程 = 速度 × 时间。",
      level: "初中送分题"
    },
    {
      id: "g-ph-32",
      subject: "物理",
      type: "density",
      prompt: "密度的常见含义更接近下面哪种说法？",
      options: ["单位体积某种物质的质量", "物体运动的快慢", "受力面积大小", "光传播的速度"],
      answer: "单位体积某种物质的质量",
      explanation: "密度表示单位体积内物质的质量。",
      level: "初中基础题"
    },
    {
      id: "g-ph-33",
      subject: "物理",
      type: "pressure",
      prompt: "人在雪地上穿雪鞋，主要是为了怎样？",
      options: ["减小压强", "增大压强", "减小速度", "增大重力"],
      answer: "减小压强",
      explanation: "雪鞋增大受力面积，从而减小压强，不容易陷下去。",
      level: "初中基础题"
    },
    {
      id: "g-ph-34",
      subject: "物理",
      type: "circuit",
      prompt: "串联电路中，一个灯泡坏了，另一个通常会怎样？",
      options: ["也不亮", "更亮", "颜色变红", "一定爆炸"],
      answer: "也不亮",
      explanation: "串联电路中一个元件断开，整个电路都不通。",
      level: "初中基础题"
    },
    {
      id: "g-ph-35",
      subject: "物理",
      type: "reflection",
      prompt: "我们从平面镜里看到自己的像，像通常在镜子的哪一侧？",
      options: ["镜后", "镜前", "镜面上", "镜框里"],
      answer: "镜后",
      explanation: "平面镜成的是虚像，通常看起来在镜后。",
      level: "初中基础题"
    },
    {
      id: "g-ph-36",
      subject: "物理",
      type: "speed-calculation",
      prompt: "一辆车 10 秒行驶了 50 米，它的速度是多少？",
      options: ["3 米/秒", "4 米/秒", "5 米/秒", "6 米/秒"],
      answer: "5 米/秒",
      explanation: "速度 = 路程 ÷ 时间 = 50 ÷ 10 = 5 米/秒。",
      level: "初中送分题"
    },
    {
      id: "g-ph-37",
      subject: "物理",
      type: "density",
      prompt: "下列对密度的理解更正确的是？",
      options: ["同种物质一般有固定密度", "物体越大密度一定越大", "越重密度一定越大", "只有液体有密度"],
      answer: "同种物质一般有固定密度",
      explanation: "在一定条件下，同种物质通常有相对固定的密度。",
      level: "初中基础题"
    },
    {
      id: "g-ph-38",
      subject: "物理",
      type: "pressure",
      prompt: "压强大小规律更接近下面哪种说法？",
      options: ["受力面积越小，压强可能越大", "面积越大，压强一定越大", "压力越小，压强一定越大", "压强和面积无关"],
      answer: "受力面积越小，压强可能越大",
      explanation: "压力一定时，受力面积越小，压强越大。",
      level: "初中基础题"
    },
    {
      id: "g-ph-39",
      subject: "物理",
      type: "circuit",
      prompt: "并联电路中，一个支路断开，其他支路通常会怎样？",
      options: ["仍可能正常工作", "一定全部熄灭", "电源立刻消失", "导线全部烧坏"],
      answer: "仍可能正常工作",
      explanation: "并联电路各支路相对独立，一个支路断开不一定影响其他支路。",
      level: "初中基础题"
    },
    {
      id: "g-ph-40",
      subject: "物理",
      type: "reflection",
      prompt: "平面镜成像时，像到镜面的距离与物到镜面的距离通常怎样？",
      options: ["相等", "像更远", "像更近", "不确定"],
      answer: "相等",
      explanation: "平面镜成像时，像距等于物距。",
      level: "初中基础题"
    },
    {
      id: "g-ph-41",
      subject: "物理",
      type: "newton-law",
      prompt: "物体如果不受外力作用，将更接近哪种状态？",
      options: ["保持静止或匀速直线运动", "一定停止", "一定加速", "一定转弯"],
      answer: "保持静止或匀速直线运动",
      explanation: "这是牛顿第一定律的基本内容。",
      level: "高中送分题"
    },
    {
      id: "g-ph-42",
      subject: "物理",
      type: "power",
      prompt: "功率更接近表示什么？",
      options: ["做功快慢", "受力大小", "路程远近", "温度高低"],
      answer: "做功快慢",
      explanation: "功率表示单位时间内做功多少，反映做功快慢。",
      level: "高中基础题"
    },
    {
      id: "g-ph-43",
      subject: "物理",
      type: "electricity",
      prompt: "电流的常用单位是？",
      options: ["安培", "伏特", "欧姆", "瓦特"],
      answer: "安培",
      explanation: "安培是电流单位。",
      level: "高中送分题"
    },
    {
      id: "g-ph-44",
      subject: "物理",
      type: "lens",
      prompt: "凸透镜对平行光通常有什么作用？",
      options: ["会聚", "发散", "完全吸收", "不发生变化"],
      answer: "会聚",
      explanation: "凸透镜通常对平行光有会聚作用。",
      level: "高中基础题"
    },
    {
      id: "g-ph-45",
      subject: "物理",
      type: "energy",
      prompt: "电灯发光时，电能主要转化为哪两种能？",
      options: ["光能和内能", "机械能和势能", "风能和水能", "核能和化学能"],
      answer: "光能和内能",
      explanation: "电灯工作时，电能主要转化为光能和内能。",
      level: "高中基础题"
    },
    {
      id: "g-ph-46",
      subject: "物理",
      type: "newton-law",
      prompt: "惯性更接近物体的什么性质？",
      options: ["保持原来运动状态的性质", "发光能力", "导电能力", "传热能力"],
      answer: "保持原来运动状态的性质",
      explanation: "惯性是物体保持原来运动状态不变的性质。",
      level: "高中基础题"
    },
    {
      id: "g-ph-47",
      subject: "物理",
      type: "power",
      prompt: "功率的常用单位是？",
      options: ["瓦特", "安培", "伏特", "欧姆"],
      answer: "瓦特",
      explanation: "瓦特是功率单位。",
      level: "高中送分题"
    },
    {
      id: "g-ph-48",
      subject: "物理",
      type: "electricity",
      prompt: "电压的常用单位是？",
      options: ["安培", "伏特", "欧姆", "焦耳"],
      answer: "伏特",
      explanation: "伏特是电压单位。",
      level: "高中送分题"
    },
    {
      id: "g-ph-49",
      subject: "物理",
      type: "lens",
      prompt: "照相机镜头通常利用哪种透镜成像？",
      options: ["凸透镜", "凹透镜", "平面镜", "三棱镜"],
      answer: "凸透镜",
      explanation: "照相机镜头通常利用凸透镜成像。",
      level: "高中基础题"
    },
    {
      id: "g-ph-50",
      subject: "物理",
      type: "energy",
      prompt: "水电站发电时，水的机械能最终主要转化为哪种能？",
      options: ["电能", "化学能", "核能", "风能"],
      answer: "电能",
      explanation: "水电站利用水的机械能带动发电机，最终转化为电能。",
      level: "高中基础题"
    },
    {
      id: "g-ph-51",
      subject: "物理",
      type: "newton-law",
      prompt: "惯性大小通常和物体的什么更相关？",
      options: ["质量", "颜色", "温度", "形状"],
      answer: "质量",
      explanation: "通常质量越大，惯性越大。",
      level: "高中基础题"
    },
    {
      id: "g-ph-52",
      subject: "物理",
      type: "power",
      prompt: "做功相同的情况下，用时越短，功率通常怎样？",
      options: ["越大", "越小", "不变", "变成零"],
      answer: "越大",
      explanation: "功率表示做功快慢，同样功下用时越短，功率越大。",
      level: "高中基础题"
    },
    {
      id: "g-ph-53",
      subject: "物理",
      type: "electricity",
      prompt: "电阻的常用单位是？",
      options: ["欧姆", "伏特", "安培", "瓦特"],
      answer: "欧姆",
      explanation: "欧姆是电阻单位。",
      level: "高中送分题"
    },
    {
      id: "g-ph-54",
      subject: "物理",
      type: "lens",
      prompt: "放大镜更常利用哪种透镜？",
      options: ["凸透镜", "凹透镜", "平面镜", "反光镜"],
      answer: "凸透镜",
      explanation: "放大镜通常利用凸透镜成像。",
      level: "高中送分题"
    },
    {
      id: "g-ph-55",
      subject: "物理",
      type: "energy",
      prompt: "电风扇工作时，电能主要转化为哪种能？",
      options: ["机械能", "核能", "光能", "势能"],
      answer: "机械能",
      explanation: "电风扇主要把电能转化为扇叶转动的机械能。",
      level: "高中基础题"
    },
    {
      id: "g-ph-56",
      subject: "物理",
      type: "newton-law",
      prompt: "物体运动状态改变，通常说明它怎样？",
      options: ["受到了外力作用", "一定没有受力", "质量消失了", "温度不变了"],
      answer: "受到了外力作用",
      explanation: "运动状态改变通常意味着物体受到了外力作用。",
      level: "高中基础题"
    },
    {
      id: "g-ph-57",
      subject: "物理",
      type: "power",
      prompt: "功率公式更接近下面哪一个？",
      options: ["功÷时间", "时间÷功", "功×时间", "速度÷时间"],
      answer: "功÷时间",
      explanation: "功率等于单位时间内所做的功，即功÷时间。",
      level: "高中送分题"
    },
    {
      id: "g-ph-58",
      subject: "物理",
      type: "electricity",
      prompt: "家庭电路常见电压更接近多少？",
      options: ["12V", "36V", "110V", "220V"],
      answer: "220V",
      explanation: "常见家庭电路电压约为 220V。",
      level: "高中常识题"
    },
    {
      id: "g-ph-59",
      subject: "物理",
      type: "lens",
      prompt: "近视眼镜通常更接近哪种透镜？",
      options: ["凹透镜", "凸透镜", "平面镜", "三棱镜"],
      answer: "凹透镜",
      explanation: "近视眼镜通常使用凹透镜矫正。",
      level: "高中基础题"
    },
    {
      id: "g-ph-60",
      subject: "物理",
      type: "energy",
      prompt: "太阳能热水器工作时，太阳能主要转化为哪种能？",
      options: ["内能", "核能", "电能", "势能"],
      answer: "内能",
      explanation: "太阳能热水器主要把太阳能转化为水的内能。",
      level: "高中基础题"
    },
    {
      id: "g-ph-61",
      subject: "物理",
      type: "mechanics",
      prompt: "质量一定时，力越大，物体加速度通常怎样？",
      options: ["越大", "越小", "不变", "变成零"],
      answer: "越大",
      explanation: "在质量一定时，受力越大，加速度通常越大。",
      level: "大学基础题"
    },
    {
      id: "g-ph-62",
      subject: "物理",
      type: "power",
      prompt: "功率的物理意义更接近什么？",
      options: ["单位时间内做功多少", "单位距离内受力多少", "单位面积内压力多少", "单位体积内质量多少"],
      answer: "单位时间内做功多少",
      explanation: "功率表示单位时间内做功的多少。",
      level: "大学送分题"
    },
    {
      id: "g-ph-63",
      subject: "物理",
      type: "electricity",
      prompt: "电流通过导体时，通常说明导体中有什么在定向移动？",
      options: ["电荷", "光子", "声波", "热量"],
      answer: "电荷",
      explanation: "电流本质上是电荷的定向移动。",
      level: "大学基础题"
    },
    {
      id: "g-ph-64",
      subject: "物理",
      type: "optics",
      prompt: "光在真空中的传播速度通常约为多少？",
      options: ["3×10^8 m/s", "3×10^6 m/s", "3×10^4 m/s", "3×10^2 m/s"],
      answer: "3×10^8 m/s",
      explanation: "光在真空中的速度通常约为 3×10^8 m/s。",
      level: "大学常识题"
    },
    {
      id: "g-ph-65",
      subject: "物理",
      type: "energy",
      prompt: "能量既不会凭空产生，也不会凭空消失，这更接近什么规律？",
      options: ["能量守恒", "牛顿第一定律", "欧姆定律", "阿基米德原理"],
      answer: "能量守恒",
      explanation: "这是能量守恒思想的基本表述。",
      level: "大学送分题"
    },
    {
      id: "g-ph-66",
      subject: "物理",
      type: "mechanics",
      prompt: "速度变化意味着物体的什么发生了变化？",
      options: ["运动状态", "质量", "颜色", "体积"],
      answer: "运动状态",
      explanation: "速度大小或方向变化，都说明运动状态发生了变化。",
      level: "大学送分题"
    },
    {
      id: "g-ph-67",
      subject: "物理",
      type: "power",
      prompt: "已知功和时间，求功率时通常用哪个关系？",
      options: ["功率 = 功 ÷ 时间", "功率 = 时间 ÷ 功", "功率 = 功 × 时间", "功率 = 力 ÷ 路程"],
      answer: "功率 = 功 ÷ 时间",
      explanation: "功率表示单位时间内做功多少，通常用功÷时间求得。",
      level: "大学送分题"
    },
    {
      id: "g-ph-68",
      subject: "物理",
      type: "electricity",
      prompt: "欧姆定律更接近下面哪个关系？",
      options: ["I = U/R", "U = IR^2", "R = UI", "P = UIR"],
      answer: "I = U/R",
      explanation: "欧姆定律的常见表达式为 I = U/R。",
      level: "大学基础题"
    },
    {
      id: "g-ph-69",
      subject: "物理",
      type: "optics",
      prompt: "近视眼形成的原因更接近什么？",
      options: ["像成在视网膜前", "像成在视网膜后", "没有成像", "视网膜不接受光"],
      answer: "像成在视网膜前",
      explanation: "近视眼常表现为平行光成像落在视网膜前。",
      level: "大学基础题"
    },
    {
      id: "g-ph-70",
      subject: "物理",
      type: "energy",
      prompt: "机械能通常由哪两部分组成？",
      options: ["动能和势能", "电能和热能", "光能和声能", "化学能和核能"],
      answer: "动能和势能",
      explanation: "机械能通常由动能和势能组成。",
      level: "大学基础题"
    },
    {
      id: "g-ph-71",
      subject: "物理",
      type: "mechanics",
      prompt: "匀速直线运动表示物体的什么保持不变？",
      options: ["速度大小和方向", "位置", "质量", "体积"],
      answer: "速度大小和方向",
      explanation: "匀速直线运动表示速度大小和方向都保持不变。",
      level: "大学送分题"
    },
    {
      id: "g-ph-72",
      subject: "物理",
      type: "power",
      prompt: "1 千瓦等于多少瓦？",
      options: ["10 瓦", "100 瓦", "1000 瓦", "10000 瓦"],
      answer: "1000 瓦",
      explanation: "1 千瓦 = 1000 瓦。",
      level: "大学送分题"
    },
    {
      id: "g-ph-73",
      subject: "物理",
      type: "electricity",
      prompt: "电功率的常见公式更接近下面哪个？",
      options: ["P = UI", "P = U/I", "P = I/R", "P = R/U"],
      answer: "P = UI",
      explanation: "电功率常见计算公式之一是 P = UI。",
      level: "大学基础题"
    },
    {
      id: "g-ph-74",
      subject: "物理",
      type: "optics",
      prompt: "声音在真空中通常怎样传播？",
      options: ["不能传播", "传播更快", "传播更慢", "只在高温下传播"],
      answer: "不能传播",
      explanation: "声音传播需要介质，真空中通常不能传播。",
      level: "大学送分题"
    },
    {
      id: "g-ph-75",
      subject: "物理",
      type: "energy",
      prompt: "自由落体过程中，若不计空气阻力，重力势能主要转化为什么？",
      options: ["动能", "电能", "化学能", "核能"],
      answer: "动能",
      explanation: "自由下落时，重力势能主要转化为动能。",
      level: "大学基础题"
    },
    {
      id: "g-ph-76",
      subject: "物理",
      type: "mechanics",
      prompt: "速度是矢量还是标量？",
      options: ["矢量", "标量", "既不是也不是", "看情况变化"],
      answer: "矢量",
      explanation: "速度既有大小也有方向，所以属于矢量。",
      level: "大学基础题"
    },
    {
      id: "g-ph-77",
      subject: "物理",
      type: "power",
      prompt: "1 焦耳/秒更接近哪个物理单位？",
      options: ["1 瓦", "1 安培", "1 伏特", "1 欧姆"],
      answer: "1 瓦",
      explanation: "1 焦耳/秒等于 1 瓦。",
      level: "大学送分题"
    },
    {
      id: "g-ph-78",
      subject: "物理",
      type: "electricity",
      prompt: "导体两端有电压时，若电路闭合，更可能产生什么？",
      options: ["电流", "声波", "磁铁", "彩虹"],
      answer: "电流",
      explanation: "导体两端有电压且电路闭合时，更可能形成电流。",
      level: "大学基础题"
    },
    {
      id: "g-ph-79",
      subject: "物理",
      type: "optics",
      prompt: "白光通过三棱镜后分成多种颜色，这种现象更接近什么？",
      options: ["色散", "反射", "折返", "静电感应"],
      answer: "色散",
      explanation: "白光经三棱镜分解成多种颜色，通常称为色散。",
      level: "大学常识题"
    },
    {
      id: "g-ph-80",
      subject: "物理",
      type: "energy",
      prompt: "电池供电时，化学能最终主要转化成什么形式的能供外电路使用？",
      options: ["电能", "核能", "光能", "势能"],
      answer: "电能",
      explanation: "电池放电时，化学能主要转化为电能。",
      level: "大学基础题"
    },
    {
      id: "g-ph-81",
      subject: "物理",
      type: "heat",
      prompt: "温度升高时，分子热运动通常会怎样？",
      options: ["更剧烈", "更缓慢", "完全停止", "方向统一不变"],
      answer: "更剧烈",
      explanation: "温度升高时，分子热运动通常会更剧烈。",
      level: "大学基础题"
    },
    {
      id: "g-ph-82",
      subject: "物理",
      type: "wave-sound",
      prompt: "声音的音调高低主要和什么更相关？",
      options: ["频率", "响度", "传播距离", "材料颜色"],
      answer: "频率",
      explanation: "声音音调高低通常主要和频率有关。",
      level: "大学基础题"
    },
    {
      id: "g-ph-83",
      subject: "物理",
      type: "electromagnetism",
      prompt: "通电导线周围通常会出现什么？",
      options: ["磁场", "冰层", "真空", "彩虹"],
      answer: "磁场",
      explanation: "通电导线周围通常会产生磁场。",
      level: "大学基础题"
    },
    {
      id: "g-ph-84",
      subject: "物理",
      type: "heat",
      prompt: "热量通常会自发地从哪里传向哪里？",
      options: ["高温物体传向低温物体", "低温物体传向高温物体", "只在真空中传播", "只在液体中传播"],
      answer: "高温物体传向低温物体",
      explanation: "热传递通常自发地从高温物体传向低温物体。",
      level: "大学基础题"
    },
    {
      id: "g-ph-85",
      subject: "物理",
      type: "electromagnetism",
      prompt: "电磁波在真空中通常能否传播？",
      options: ["能", "不能", "只有高温下能", "只有低温下能"],
      answer: "能",
      explanation: "电磁波通常可以在真空中传播。",
      level: "大学基础题"
    },
    {
      id: "g-ph-86",
      subject: "物理",
      type: "heat",
      prompt: "比热容更接近描述物质的什么特性？",
      options: ["升高单位温度所需吸热本领", "导电能力", "反光能力", "颜色深浅"],
      answer: "升高单位温度所需吸热本领",
      explanation: "比热容反映物质温度变化时吸放热的特性。",
      level: "大学基础题"
    },
    {
      id: "g-ph-87",
      subject: "物理",
      type: "electromagnetism",
      prompt: "发电机工作时更接近利用了什么现象？",
      options: ["电磁感应", "光的折射", "热传导", "惯性"],
      answer: "电磁感应",
      explanation: "发电机工作通常与电磁感应现象有关。",
      level: "大学基础题"
    },
    {
      id: "g-ph-88",
      subject: "物理",
      type: "heat",
      prompt: "水的比热容较大，这更接近说明什么？",
      options: ["升温和降温都较慢", "一定导电", "一定透明", "一定更轻"],
      answer: "升温和降温都较慢",
      explanation: "比热容较大通常意味着吸收或放出相同热量时温度变化较慢。",
      level: "大学基础题"
    },
    {
      id: "g-ph-89",
      subject: "物理",
      type: "wave-sound",
      prompt: "声音在空气中的传播通常属于哪种形式？",
      options: ["机械波", "电磁波", "光波", "静止波"],
      answer: "机械波",
      explanation: "声音传播需要介质，通常属于机械波。",
      level: "大学基础题"
    },
    {
      id: "g-ph-90",
      subject: "物理",
      type: "units",
      prompt: "1 千米等于多少米？",
      options: ["10 米", "100 米", "1000 米", "10000 米"],
      answer: "1000 米",
      explanation: "1 千米 = 1000 米。",
      level: "大学送分题"
    },
    {
      id: "g-ph-91",
      subject: "物理",
      type: "heat",
      prompt: "冬天摸到金属比木头更凉，主要是因为金属怎样？",
      options: ["导热更快", "更轻", "更软", "更透明"],
      answer: "导热更快",
      explanation: "金属导热较快，会更快带走手上的热量，所以感觉更凉。",
      level: "大学基础题"
    },
    {
      id: "g-ph-92",
      subject: "物理",
      type: "wave-sound",
      prompt: "声音在真空中通常能不能传播？",
      options: ["不能", "能", "只在高温下能", "只在低温下能"],
      answer: "不能",
      explanation: "声音传播需要介质，真空中通常不能传播声音。",
      level: "大学送分题"
    },
    {
      id: "g-ph-93",
      subject: "物理",
      type: "electromagnetism",
      prompt: "通电线圈周围通常会产生什么？",
      options: ["磁场", "真空", "影子", "蒸汽"],
      answer: "磁场",
      explanation: "电流周围通常伴随磁场，这是电磁现象的基础。",
      level: "大学基础题"
    },
    {
      id: "g-ph-94",
      subject: "物理",
      type: "units",
      prompt: "电流的常用单位是哪个？",
      options: ["安培", "伏特", "欧姆", "瓦特"],
      answer: "安培",
      explanation: "安培是电流的常用单位。",
      level: "大学送分题"
    },
    {
      id: "g-ph-95",
      subject: "物理",
      type: "mechanics",
      prompt: "物体保持原来运动状态不变的性质更接近什么？",
      options: ["惯性", "浮力", "压强", "折射"],
      answer: "惯性",
      explanation: "物体总想保持原来状态不变，这种性质叫惯性。",
      level: "大学基础题"
    },
    {
      id: "g-ph-96",
      subject: "物理",
      type: "pressure",
      prompt: "刀刃做得比较薄，主要是为了怎样？",
      options: ["增大压强", "减小质量", "减少摩擦", "增大体积"],
      answer: "增大压强",
      explanation: "受力面积变小，压强会增大，更容易切开物体。",
      level: "初中基础题"
    },
    {
      id: "g-ph-97",
      subject: "物理",
      type: "circuit",
      prompt: "闭合开关后小灯泡发光，说明电路怎样？",
      options: ["接通了", "断开了", "短路了", "没有电源"],
      answer: "接通了",
      explanation: "灯泡发光通常说明电路已经接通。",
      level: "初中送分题"
    },
    {
      id: "g-ph-98",
      subject: "物理",
      type: "mirror",
      prompt: "平面镜成的像通常是怎样的？",
      options: ["正立的虚像", "倒立的实像", "放大的实像", "缩小的虚像"],
      answer: "正立的虚像",
      explanation: "平面镜成像通常是正立、等大的虚像。",
      level: "初中基础题"
    },
    {
      id: "g-ph-99",
      subject: "物理",
      type: "power",
      prompt: "电功率的常用单位是哪一个？",
      options: ["瓦特", "安培", "伏特", "欧姆"],
      answer: "瓦特",
      explanation: "瓦特是功率的常用单位。",
      level: "高中送分题"
    },
    {
      id: "g-ph-100",
      subject: "物理",
      type: "ohm-law",
      prompt: "在电压一定时，电阻变大，电流通常会怎样？",
      options: ["变小", "变大", "不变", "先变小后变大"],
      answer: "变小",
      explanation: "按欧姆定律直觉，电阻变大时电流会变小。",
      level: "高中基础题"
    },
    {
      id: "g-ph-101",
      subject: "物理",
      type: "lens",
      prompt: "照相机镜头更接近利用了哪种光学元件？",
      options: ["凸透镜", "凹透镜", "平面镜", "潜望镜"],
      answer: "凸透镜",
      explanation: "照相机镜头通常以凸透镜成像原理为基础。",
      level: "高中基础题"
    },
    {
      id: "g-ph-102",
      subject: "物理",
      type: "heat",
      prompt: "海边白天和夜晚温差较小，常和哪一点更有关？",
      options: ["水的比热容较大", "水一定更轻", "水一定导电", "水没有重力"],
      answer: "水的比热容较大",
      explanation: "水的比热容较大，升温和降温都相对较慢。",
      level: "大学基础题"
    },
    {
      id: "g-ph-103",
      subject: "物理",
      type: "electromagnetism",
      prompt: "电动机工作时主要把什么能转化成机械运动？",
      options: ["电能", "光能", "核能", "风能"],
      answer: "电能",
      explanation: "电动机通常把电能转化为机械能。",
      level: "大学送分题"
    },
    {
      id: "g-ph-104",
      subject: "物理",
      type: "wave-sound",
      prompt: "声音音调的高低通常和什么更有关？",
      options: ["频率", "颜色", "质量", "形状"],
      answer: "频率",
      explanation: "频率越高，通常音调越高。",
      level: "大学基础题"
    },
    {
      id: "g-ph-105",
      subject: "物理",
      type: "units",
      prompt: "电压的常用单位是哪一个？",
      options: ["伏特", "安培", "瓦特", "牛顿"],
      answer: "伏特",
      explanation: "伏特是电压的常用单位。",
      level: "大学送分题"
    },
    {
      id: "g-ph-106",
      subject: "物理",
      type: "speed",
      prompt: "速度最接近表示什么？",
      options: ["单位时间内通过的路程", "物体的质量", "物体的温度", "物体的颜色"],
      answer: "单位时间内通过的路程",
      explanation: "速度可以直观理解为单位时间内通过的路程。",
      level: "初中送分题"
    },
    {
      id: "g-ph-107",
      subject: "物理",
      type: "density",
      prompt: "密度公式更接近下面哪一项？",
      options: ["质量÷体积", "体积÷质量", "路程÷时间", "力÷面积"],
      answer: "质量÷体积",
      explanation: "密度通常用质量除以体积来表示。",
      level: "初中基础题"
    },
    {
      id: "g-ph-108",
      subject: "物理",
      type: "reflection",
      prompt: "平静水面能看到倒影，主要和哪种现象有关？",
      options: ["反射", "折射", "蒸发", "熔化"],
      answer: "反射",
      explanation: "倒影主要与光的反射现象有关。",
      level: "初中送分题"
    },
    {
      id: "g-ph-109",
      subject: "物理",
      type: "circuit",
      prompt: "串联电路中，一个用电器断开后，其他用电器通常会怎样？",
      options: ["一起不工作", "更亮", "更暗但还工作", "完全不受影响"],
      answer: "一起不工作",
      explanation: "串联电路中任一处断开，整个电路都会断开。",
      level: "初中基础题"
    },
    {
      id: "g-ph-110",
      subject: "物理",
      type: "heat-transfer",
      prompt: "把热水倒进冷杯子里，杯子慢慢变热，主要和哪种方式有关？",
      options: ["热传递", "磁化", "折射", "凝固"],
      answer: "热传递",
      explanation: "热量会从高温物体传向低温物体。",
      level: "初中基础题"
    },
    {
      id: "g-ph-111",
      subject: "物理",
      type: "newton-law",
      prompt: "汽车突然刹车时，人容易向前倾，更接近哪种原因？",
      options: ["惯性", "浮力", "压强", "折射"],
      answer: "惯性",
      explanation: "人原来处于运动状态，刹车时由于惯性会继续向前。",
      level: "高中送分题"
    },
    {
      id: "g-ph-112",
      subject: "物理",
      type: "work-power",
      prompt: "做功快慢更接近由什么来描述？",
      options: ["功率", "速度", "质量", "密度"],
      answer: "功率",
      explanation: "功率常用来描述做功的快慢。",
      level: "高中送分题"
    },
    {
      id: "g-ph-113",
      subject: "物理",
      type: "electricity",
      prompt: "电流通过导体时，导体可能会发热，这更接近哪种效应？",
      options: ["电流热效应", "光的折射", "磁悬浮", "声波反射"],
      answer: "电流热效应",
      explanation: "电流通过导体会发热，是常见的电流热效应。",
      level: "高中基础题"
    },
    {
      id: "g-ph-114",
      subject: "物理",
      type: "lens",
      prompt: "放大镜更接近哪种光学元件？",
      options: ["凸透镜", "凹透镜", "平面镜", "潜望镜"],
      answer: "凸透镜",
      explanation: "放大镜通常利用凸透镜成像。",
      level: "高中送分题"
    },
    {
      id: "g-ph-115",
      subject: "物理",
      type: "energy",
      prompt: "高处的石头具有更明显的哪种能量？",
      options: ["重力势能", "电能", "核能", "声能"],
      answer: "重力势能",
      explanation: "位置越高，通常重力势能越明显。",
      level: "高中基础题"
    },
    {
      id: "g-ph-116",
      subject: "物理",
      type: "mechanics",
      prompt: "动量最接近同时与哪两个量有关？",
      options: ["质量和速度", "体积和温度", "密度和颜色", "面积和压强"],
      answer: "质量和速度",
      explanation: "动量常和物体质量与速度有关。",
      level: "大学基础题"
    },
    {
      id: "g-ph-117",
      subject: "物理",
      type: "electromagnetism",
      prompt: "电铃工作时，通常利用了哪类装置？",
      options: ["电磁铁", "凸透镜", "滑轮", "定滑轮"],
      answer: "电磁铁",
      explanation: "电铃等装置通常会利用电磁铁原理。",
      level: "大学送分题"
    },
    {
      id: "g-ph-118",
      subject: "物理",
      type: "wave-sound",
      prompt: "超声波和普通声波相比，更突出的特点通常是？",
      options: ["频率更高", "一定更慢", "一定更弱", "一定不能反射"],
      answer: "频率更高",
      explanation: "超声波的一个显著特点就是频率高于普通可听声波。",
      level: "大学基础题"
    },
    {
      id: "g-ph-119",
      subject: "物理",
      type: "heat",
      prompt: "物体吸收热量后，温度会不会一定升高？",
      options: ["不一定", "一定会", "一定不会", "只在冬天会"],
      answer: "不一定",
      explanation: "有些情况下热量会用于状态变化，温度不一定立刻升高。",
      level: "大学基础题"
    },
    {
      id: "g-ph-120",
      subject: "物理",
      type: "units",
      prompt: "功的常用单位是哪一个？",
      options: ["焦耳", "安培", "伏特", "特斯拉"],
      answer: "焦耳",
      explanation: "焦耳是功和能量的常用单位。",
      level: "大学送分题"
    },
    {
      id: "g-ph-121",
      subject: "物理",
      type: "temperature",
      prompt: "冰块摸起来很冷，最直接和什么有关？",
      options: ["温度较低", "质量较大", "颜色较白", "形状规则"],
      answer: "温度较低",
      explanation: "冷热感觉最直接和温度有关。",
      level: "小学送分题"
    },
    {
      id: "g-ph-122",
      subject: "物理",
      type: "light-shadow",
      prompt: "白天能看到影子，主要和什么有关？",
      options: ["光沿直线传播", "声音传播", "热传递", "磁铁吸引"],
      answer: "光沿直线传播",
      explanation: "影子的形成和光沿直线传播有关。",
      level: "小学基础题"
    },
    {
      id: "g-ph-123",
      subject: "物理",
      type: "float-sink",
      prompt: "乒乓球放入水中通常会怎样？",
      options: ["浮起来", "沉到底", "融化", "消失"],
      answer: "浮起来",
      explanation: "乒乓球通常会浮在水面。",
      level: "小学送分题"
    },
    {
      id: "g-ph-124",
      subject: "物理",
      type: "magnet",
      prompt: "下列更容易被磁铁吸引的是哪一项？",
      options: ["铁钉", "木块", "塑料尺", "纸片"],
      answer: "铁钉",
      explanation: "磁铁更容易吸引铁制物体。",
      level: "小学送分题"
    },
    {
      id: "g-ph-125",
      subject: "物理",
      type: "electricity",
      prompt: "电池和小灯泡连成通路后，小灯泡通常会怎样？",
      options: ["发光", "结冰", "变重", "消失"],
      answer: "发光",
      explanation: "电路接通后，小灯泡通常会发光。",
      level: "小学送分题"
    },
    {
      id: "g-ph-126",
      subject: "物理",
      type: "measure",
      prompt: "测量长度常用什么工具？",
      options: ["尺子", "温度计", "天平", "秒表"],
      answer: "尺子",
      explanation: "尺子是常见的长度测量工具。",
      level: "小学送分题"
    },
    {
      id: "g-ph-127",
      subject: "物理",
      type: "speed",
      prompt: "“跑得快”更接近描述物体的什么？",
      options: ["速度", "质量", "体积", "温度"],
      answer: "速度",
      explanation: "快慢通常和速度有关。",
      level: "小学基础题"
    },
    {
      id: "g-ph-128",
      subject: "物理",
      type: "heat",
      prompt: "太阳晒久了地面变热，最直接和什么有关？",
      options: ["吸收热量", "变成液体", "产生磁性", "变轻"],
      answer: "吸收热量",
      explanation: "地面吸收太阳能后会变热。",
      level: "小学常识题"
    },
    {
      id: "g-ph-129",
      subject: "物理",
      type: "conductor",
      prompt: "金属勺子通常更接近哪类材料？",
      options: ["导体", "绝缘体", "液体", "气体"],
      answer: "导体",
      explanation: "金属通常是导体。",
      level: "小学基础题"
    },
    {
      id: "g-ph-130",
      subject: "物理",
      type: "simple-machine",
      prompt: "跷跷板更接近利用了哪种简单机械？",
      options: ["杠杆", "滑轮", "斜面", "轮轴"],
      answer: "杠杆",
      explanation: "跷跷板是杠杆的生活实例。",
      level: "小学常识题"
    },
    {
      id: "g-ph-131",
      subject: "物理",
      type: "speed",
      prompt: "速度单位 m/s 读作什么？",
      options: ["米每秒", "秒每米", "米每分", "千米每秒"],
      answer: "米每秒",
      explanation: "m/s 通常读作米每秒。",
      level: "初中送分题"
    },
    {
      id: "g-ph-132",
      subject: "物理",
      type: "density",
      prompt: "同体积的铁和木头相比，通常谁更重？",
      options: ["铁", "木头", "一样重", "无法判断"],
      answer: "铁",
      explanation: "铁的密度通常更大。",
      level: "初中基础题"
    },
    {
      id: "g-ph-133",
      subject: "物理",
      type: "pressure",
      prompt: "受力面积越小，在压力相同时压强通常会怎样？",
      options: ["变大", "变小", "不变", "先大后小"],
      answer: "变大",
      explanation: "受力面积越小，压强通常越大。",
      level: "初中基础题"
    },
    {
      id: "g-ph-134",
      subject: "物理",
      type: "circuit",
      prompt: "并联电路中，一个支路断开后，其他支路通常会怎样？",
      options: ["仍可工作", "全部停止", "一定更亮", "一定短路"],
      answer: "仍可工作",
      explanation: "并联电路中其他支路通常不受一个支路断开的影响。",
      level: "初中基础题"
    },
    {
      id: "g-ph-135",
      subject: "物理",
      type: "reflection",
      prompt: "入射角增大时，反射角通常会怎样？",
      options: ["也增大", "减小", "不变", "变成零"],
      answer: "也增大",
      explanation: "光的反射中，反射角通常等于入射角。",
      level: "初中基础题"
    },
    {
      id: "g-ph-136",
      subject: "物理",
      type: "heat-transfer",
      prompt: "把金属勺放进热汤里，勺柄变热主要和什么有关？",
      options: ["热传导", "光反射", "磁化", "蒸发"],
      answer: "热传导",
      explanation: "热量沿勺子传递，属于热传导。",
      level: "初中基础题"
    },
    {
      id: "g-ph-137",
      subject: "物理",
      type: "mirror",
      prompt: "平面镜里的像和物体大小通常怎样？",
      options: ["相等", "更大", "更小", "时大时小"],
      answer: "相等",
      explanation: "平面镜成像通常等大。",
      level: "初中送分题"
    },
    {
      id: "g-ph-138",
      subject: "物理",
      type: "circuit",
      prompt: "下列哪一项更可能是绝缘体？",
      options: ["橡胶", "铜丝", "铁片", "铝箔"],
      answer: "橡胶",
      explanation: "橡胶通常是绝缘体。",
      level: "初中送分题"
    },
    {
      id: "g-ph-139",
      subject: "物理",
      type: "pressure",
      prompt: "人走在雪地上容易下陷，改穿雪鞋后不易下陷，主要因为雪鞋怎样？",
      options: ["增大受力面积", "减小重力", "增大摩擦", "减小体积"],
      answer: "增大受力面积",
      explanation: "受力面积增大，压强会减小。",
      level: "初中基础题"
    },
    {
      id: "g-ph-140",
      subject: "物理",
      type: "density",
      prompt: "水结成冰后，密度通常怎样变化？",
      options: ["变小", "变大", "不变", "先大后小"],
      answer: "变小",
      explanation: "冰的密度通常比水小。",
      level: "初中基础题"
    },
    {
      id: "g-ph-141",
      subject: "物理",
      type: "measure",
      prompt: "测量时间长短常用什么工具？",
      options: ["秒表", "刻度尺", "量筒", "天平"],
      answer: "秒表",
      explanation: "秒表常用来测量时间。",
      level: "初中送分题"
    },
    {
      id: "g-ph-142",
      subject: "物理",
      type: "float-sink",
      prompt: "轮船能浮在水面上，主要和什么有关？",
      options: ["受到浮力", "一定更轻", "没有重力", "一定是金属"],
      answer: "受到浮力",
      explanation: "轮船浮起主要和浮力有关。",
      level: "初中基础题"
    },
    {
      id: "g-ph-143",
      subject: "物理",
      type: "reflection",
      prompt: "潜望镜主要利用了什么现象？",
      options: ["光的反射", "光的色散", "光的干涉", "热传递"],
      answer: "光的反射",
      explanation: "潜望镜主要利用镜面对光的反射。",
      level: "初中常识题"
    },
    {
      id: "g-ph-144",
      subject: "物理",
      type: "heat-transfer",
      prompt: "冬天用热水袋取暖，热量最终会从哪里传向哪里？",
      options: ["从热水袋传向人体", "从人体传向热水袋", "双向完全相同", "不会传递"],
      answer: "从热水袋传向人体",
      explanation: "热量通常从高温物体传向低温物体。",
      level: "初中基础题"
    },
    {
      id: "g-ph-145",
      subject: "物理",
      type: "speed",
      prompt: "已知路程和时间，最容易求出什么量？",
      options: ["速度", "质量", "密度", "功率"],
      answer: "速度",
      explanation: "速度常由路程除以时间得到。",
      level: "初中送分题"
    },
    {
      id: "g-ph-146",
      subject: "物理",
      type: "pressure",
      prompt: "针尖很细更容易扎入物体，主要因为压强怎样？",
      options: ["更大", "更小", "不变", "等于零"],
      answer: "更大",
      explanation: "针尖受力面积小，压强大。",
      level: "初中基础题"
    },
    {
      id: "g-ph-147",
      subject: "物理",
      type: "mirror",
      prompt: "照镜子时看到自己左右相反，更接近哪种成像特点？",
      options: ["镜面对称", "实像放大", "颜色改变", "焦点成像"],
      answer: "镜面对称",
      explanation: "平面镜成像常表现出镜面对称特点。",
      level: "初中常识题"
    },
    {
      id: "g-ph-148",
      subject: "物理",
      type: "circuit",
      prompt: "开关在电路中的主要作用更接近哪一项？",
      options: ["控制通断", "增大电压", "测量电流", "提供电能"],
      answer: "控制通断",
      explanation: "开关主要用于控制电路的通断。",
      level: "初中送分题"
    },
    {
      id: "g-ph-149",
      subject: "物理",
      type: "density",
      prompt: "同质量的棉花和铁相比，通常谁体积更大？",
      options: ["棉花", "铁", "一样大", "无法判断"],
      answer: "棉花",
      explanation: "棉花密度更小，同质量下体积通常更大。",
      level: "初中基础题"
    },
    {
      id: "g-ph-150",
      subject: "物理",
      type: "heat-transfer",
      prompt: "烧水时壶口冒出的“白气”更接近什么？",
      options: ["小水滴", "氧气", "烟尘", "火焰"],
      answer: "小水滴",
      explanation: "“白气”通常是水蒸气遇冷形成的小水滴。",
      level: "初中基础题"
    },
    {
      id: "g-ph-151",
      subject: "物理",
      type: "newton-law",
      prompt: "静止的物体若不受外力作用，通常会怎样？",
      options: ["继续静止", "一定运动", "越来越快", "自动转弯"],
      answer: "继续静止",
      explanation: "这符合惯性规律的直观理解。",
      level: "高中送分题"
    },
    {
      id: "g-ph-152",
      subject: "物理",
      type: "work-power",
      prompt: "做功多少最接近和什么有关？",
      options: ["力和距离", "颜色和形状", "体积和质量", "温度和时间"],
      answer: "力和距离",
      explanation: "功的多少常和力及其作用距离有关。",
      level: "高中基础题"
    },
    {
      id: "g-ph-153",
      subject: "物理",
      type: "electricity",
      prompt: "电压在电路中更接近起什么作用？",
      options: ["推动电流形成", "测量电阻", "表示功率", "产生质量"],
      answer: "推动电流形成",
      explanation: "电压可直观理解为形成电流的“推动作用”。",
      level: "高中基础题"
    },
    {
      id: "g-ph-154",
      subject: "物理",
      type: "ohm-law",
      prompt: "欧姆定律中，电流 I 与电压 U、 电阻 R 的关系更接近哪一项？",
      options: ["I = U/R", "I = U×R", "U = I/R", "R = U×I"],
      answer: "I = U/R",
      explanation: "欧姆定律常写作 I = U/R。",
      level: "高中送分题"
    },
    {
      id: "g-ph-155",
      subject: "物理",
      type: "lens",
      prompt: "近视镜片更接近哪种透镜？",
      options: ["凹透镜", "凸透镜", "平面镜", "三棱镜"],
      answer: "凹透镜",
      explanation: "近视镜通常使用凹透镜。",
      level: "高中基础题"
    },
    {
      id: "g-ph-156",
      subject: "物理",
      type: "energy",
      prompt: "拉开的弓通常具有更明显的哪种能量？",
      options: ["弹性势能", "核能", "声能", "电能"],
      answer: "弹性势能",
      explanation: "拉开的弓储存了弹性势能。",
      level: "高中基础题"
    },
    {
      id: "g-ph-157",
      subject: "物理",
      type: "newton-law",
      prompt: "物体运动状态发生改变，通常说明什么？",
      options: ["受到了外力", "一定没有力", "质量变了", "颜色变了"],
      answer: "受到了外力",
      explanation: "运动状态改变通常和外力作用有关。",
      level: "高中基础题"
    },
    {
      id: "g-ph-158",
      subject: "物理",
      type: "work-power",
      prompt: "功率越大，通常表示做功怎样？",
      options: ["越快", "越慢", "越少", "一定为零"],
      answer: "越快",
      explanation: "功率大通常表示做功快。",
      level: "高中送分题"
    },
    {
      id: "g-ph-159",
      subject: "物理",
      type: "electricity",
      prompt: "家庭电路中电灯和电视通常采用哪种连接方式？",
      options: ["并联", "串联", "都可以", "无法判断"],
      answer: "并联",
      explanation: "家庭电路中的用电器通常并联。",
      level: "高中基础题"
    },
    {
      id: "g-ph-160",
      subject: "物理",
      type: "ohm-law",
      prompt: "在电阻一定时，电压变大，电流通常会怎样？",
      options: ["变大", "变小", "不变", "变成零"],
      answer: "变大",
      explanation: "电阻一定时，电流随电压增大而增大。",
      level: "高中基础题"
    },
    {
      id: "g-ph-161",
      subject: "物理",
      type: "lens",
      prompt: "投影仪成像更接近利用了哪种元件？",
      options: ["凸透镜", "凹透镜", "平面镜", "电磁铁"],
      answer: "凸透镜",
      explanation: "投影仪成像常利用凸透镜。",
      level: "高中常识题"
    },
    {
      id: "g-ph-162",
      subject: "物理",
      type: "energy",
      prompt: "发电站发出的电能常常来自其他能量的转化，这体现了什么？",
      options: ["能量转化", "能量消失", "质量消失", "颜色变化"],
      answer: "能量转化",
      explanation: "发电过程体现了不同形式能量之间的转化。",
      level: "高中送分题"
    },
    {
      id: "g-ph-163",
      subject: "物理",
      type: "newton-law",
      prompt: "系安全带主要是为了在紧急刹车时减小什么带来的伤害？",
      options: ["惯性", "浮力", "压强", "热量"],
      answer: "惯性",
      explanation: "安全带主要是为了减小惯性带来的危险。",
      level: "高中常识题"
    },
    {
      id: "g-ph-164",
      subject: "物理",
      type: "work-power",
      prompt: "同样时间里做的功越多，功率通常怎样？",
      options: ["越大", "越小", "不变", "无法判断"],
      answer: "越大",
      explanation: "相同时间里做功越多，功率越大。",
      level: "高中基础题"
    },
    {
      id: "g-ph-165",
      subject: "物理",
      type: "electricity",
      prompt: "电路中电流的方向通常规定为什么？",
      options: ["正电荷定向移动方向", "电子移动方向", "磁场方向", "导线弯曲方向"],
      answer: "正电荷定向移动方向",
      explanation: "电流方向通常规定为正电荷定向移动方向。",
      level: "高中基础题"
    },
    {
      id: "g-ph-166",
      subject: "物理",
      type: "mechanics",
      prompt: "动量变化通常和什么更直接有关？",
      options: ["受力作用", "颜色变化", "体积变化", "状态变化"],
      answer: "受力作用",
      explanation: "动量变化通常与受力作用有关。",
      level: "大学基础题"
    },
    {
      id: "g-ph-167",
      subject: "物理",
      type: "electromagnetism",
      prompt: "发电机和电动机都与哪类现象关系密切？",
      options: ["电磁现象", "热胀冷缩", "蒸发凝固", "光的色散"],
      answer: "电磁现象",
      explanation: "它们都与电和磁之间的关系密切相关。",
      level: "高中基础题"
    },
    {
      id: "g-ph-168",
      subject: "物理",
      type: "wave-sound",
      prompt: "回声现象更接近和什么有关？",
      options: ["声波反射", "声波消失", "光波折射", "磁场变化"],
      answer: "声波反射",
      explanation: "回声是声波反射形成的。",
      level: "高中送分题"
    },
    {
      id: "g-ph-169",
      subject: "物理",
      type: "heat",
      prompt: "比热容较大的物质，在吸收相同热量时温度通常怎样？",
      options: ["升高较慢", "升高较快", "一定不变", "一定下降"],
      answer: "升高较慢",
      explanation: "比热容越大，吸收相同热量时温度变化通常越慢。",
      level: "大学基础题"
    },
    {
      id: "g-ph-170",
      subject: "物理",
      type: "units",
      prompt: "电阻的常用单位是哪一个？",
      options: ["欧姆", "焦耳", "牛顿", "帕斯卡"],
      answer: "欧姆",
      explanation: "欧姆是电阻的常用单位。",
      level: "初中送分题"
    },
    {
      id: "g-ph-171",
      subject: "物理",
      type: "mechanics",
      prompt: "冲量最接近和哪两个量有关？",
      options: ["力和时间", "质量和体积", "距离和面积", "电压和电流"],
      answer: "力和时间",
      explanation: "冲量常与力的大小和作用时间有关。",
      level: "大学基础题"
    },
    {
      id: "g-ph-172",
      subject: "物理",
      type: "electromagnetism",
      prompt: "磁场对通电导线通常会产生什么？",
      options: ["力的作用", "温度恒定", "质量消失", "颜色改变"],
      answer: "力的作用",
      explanation: "通电导线在磁场中通常会受到力的作用。",
      level: "大学基础题"
    },
    {
      id: "g-ph-173",
      subject: "物理",
      type: "wave-sound",
      prompt: "声波传播通常需要什么？",
      options: ["介质", "真空", "磁铁", "光源"],
      answer: "介质",
      explanation: "声波传播通常需要介质。",
      level: "大学送分题"
    },
    {
      id: "g-ph-174",
      subject: "物理",
      type: "heat",
      prompt: "晶体熔化时，温度最常见的变化是？",
      options: ["保持不变", "持续升高", "持续降低", "先升后降"],
      answer: "保持不变",
      explanation: "晶体熔化时温度常保持不变。",
      level: "大学基础题"
    },
    {
      id: "g-ph-175",
      subject: "物理",
      type: "units",
      prompt: "压强的常用单位是哪一个？",
      options: ["帕斯卡", "焦耳", "瓦特", "特斯拉"],
      answer: "帕斯卡",
      explanation: "帕斯卡是压强的常用单位。",
      level: "初中送分题"
    },
    {
      id: "g-ph-176",
      subject: "物理",
      type: "newton-law",
      prompt: "匀速直线运动的物体在水平方向所受合力更接近哪项？",
      options: ["接近 0", "一定很大", "一定向前", "一定向后"],
      answer: "接近 0",
      explanation: "匀速直线运动时，水平方向合力通常接近 0。",
      level: "高中基础题"
    },
    {
      id: "g-ph-177",
      subject: "物理",
      type: "work-power",
      prompt: "机械效率通常会不会超过 100%？",
      options: ["不会", "会", "只在高温时会", "只在真空中会"],
      answer: "不会",
      explanation: "机械效率通常不会超过 100%。",
      level: "高中基础题"
    },
    {
      id: "g-ph-178",
      subject: "物理",
      type: "electricity",
      prompt: "家庭电路中保险装置的主要作用更接近哪项？",
      options: ["保护电路安全", "增大电流", "储存电能", "发出光"],
      answer: "保护电路安全",
      explanation: "保险装置主要用于保护电路安全。",
      level: "高中基础题"
    },
    {
      id: "g-ph-179",
      subject: "物理",
      type: "lens",
      prompt: "照相机拍照时，底片或感光元件上形成的像更接近哪项？",
      options: ["倒立实像", "正立虚像", "正立实像", "倒立虚像"],
      answer: "倒立实像",
      explanation: "照相机成像通常是倒立实像。",
      level: "高中基础题"
    },
    {
      id: "g-ph-180",
      subject: "物理",
      type: "energy",
      prompt: "物体运动得越快，通常它的动能会怎样？",
      options: ["更大", "更小", "不变", "一定为零"],
      answer: "更大",
      explanation: "速度越大，动能通常越大。",
      level: "高中基础题"
    }
  ],
  chemistry: [
    {
      id: "g-ch-1",
      subject: "化学",
      type: "dissolve-salt",
      prompt: "食盐放进水里搅一搅后慢慢看不见了，这叫？",
      options: ["溶解", "燃烧", "生锈", "凝固"],
      answer: "溶解",
      explanation: "食盐分散到水中，这种现象叫溶解。",
      level: "小学基础题"
    },
    {
      id: "g-ch-2",
      subject: "化学",
      type: "mixture-separation",
      prompt: "把米里的小石子挑出来，更接近下面哪种做法？",
      options: ["混合后再分离", "点火燃烧", "加热成气体", "变成金属"],
      answer: "混合后再分离",
      explanation: "米和石子混在一起后，可以再分开。",
      level: "小学基础题"
    },
    {
      id: "g-ch-3",
      subject: "化学",
      type: "material-change",
      prompt: "纸被点燃后变成灰，这说明什么？",
      options: ["物质发生了变化", "完全没变化", "只是变得更湿", "变成了玻璃"],
      answer: "物质发生了变化",
      explanation: "燃烧后出现新物质，说明发生了变化。",
      level: "小学基础题"
    },
    {
      id: "g-ch-4",
      subject: "化学",
      type: "recycle",
      prompt: "喝完的塑料瓶更合适放进哪类垃圾？",
      options: ["可回收物", "厨余垃圾", "有害垃圾", "其他说不清"],
      answer: "可回收物",
      explanation: "常见塑料瓶通常属于可回收物。",
      level: "小学常识题"
    },
    {
      id: "g-ch-5",
      subject: "化学",
      type: "combustion",
      prompt: "东西能燃烧，通常离不开空气中的什么？",
      options: ["氧气", "泥土", "沙子", "木头"],
      answer: "氧气",
      explanation: "燃烧通常需要氧气参与。",
      level: "小学常识题"
    },
    {
      id: "g-ch-6",
      subject: "化学",
      type: "state-change",
      prompt: "冰块放在桌上慢慢变成水，这属于？",
      options: ["融化", "生锈", "燃烧", "爆炸"],
      answer: "融化",
      explanation: "冰受热后会融化成水。",
      level: "小学送分题"
    },
    {
      id: "g-ch-7",
      subject: "化学",
      type: "gas-common",
      prompt: "人和动物呼吸都离不开空气中的什么？",
      options: ["氧气", "铁", "泥土", "盐"],
      answer: "氧气",
      explanation: "氧气是呼吸过程中很重要的气体。",
      level: "小学送分题"
    },
    {
      id: "g-ch-8",
      subject: "化学",
      type: "acid-base-common",
      prompt: "下面哪样东西吃起来通常是酸的？",
      options: ["柠檬", "馒头", "白糖", "米饭"],
      answer: "柠檬",
      explanation: "柠檬有明显酸味。",
      level: "小学基础题"
    },
    {
      id: "g-ch-9",
      subject: "化学",
      type: "mixture",
      prompt: "把沙子和绿豆倒在一起后，它们属于什么状态？",
      options: ["混合在一起", "已经溶解", "变成气体", "发生燃烧"],
      answer: "混合在一起",
      explanation: "沙子和绿豆只是混在一起，没有溶解。",
      level: "小学基础题"
    },
    {
      id: "g-ch-10",
      subject: "化学",
      type: "separation",
      prompt: "想把水里的沙子分出来，下面哪种思路更接近？",
      options: ["过滤", "燃烧", "发光", "冷冻成铁"],
      answer: "过滤",
      explanation: "沙子不溶于水，常可通过过滤分开。",
      level: "小学常识题"
    },
    {
      id: "g-ch-11",
      subject: "化学",
      type: "combustion",
      prompt: "纸张着火后，最明显会出现什么？",
      options: ["发热发光", "变成冰块", "变成铁钉", "完全不变"],
      answer: "发热发光",
      explanation: "燃烧时常伴随发热、发光现象。",
      level: "小学基础题"
    },
    {
      id: "g-ch-12",
      subject: "化学",
      type: "recycle",
      prompt: "废旧报纸更适合放进哪类垃圾？",
      options: ["可回收物", "厨余垃圾", "有害垃圾", "厕所垃圾"],
      answer: "可回收物",
      explanation: "废旧纸张通常属于可回收物。",
      level: "小学常识题"
    },
    {
      id: "g-ch-13",
      subject: "化学",
      type: "state-change",
      prompt: "水放进冰箱冷冻后会变成什么？",
      options: ["冰", "火", "空气", "木头"],
      answer: "冰",
      explanation: "水在较低温度下会凝固成冰。",
      level: "小学送分题"
    },
    {
      id: "g-ch-14",
      subject: "化学",
      type: "material-class",
      prompt: "下面哪种物品更像金属材料？",
      options: ["铝勺", "橡皮擦", "塑料杯", "纸盒"],
      answer: "铝勺",
      explanation: "铝勺属于金属材料制品。",
      level: "小学送分题"
    },
    {
      id: "g-ch-15",
      subject: "化学",
      type: "dissolve",
      prompt: "白糖和食盐放进水里，哪种说法更对？",
      options: ["都能溶于水", "都不能溶于水", "只有沙子能溶于水", "只有石头能溶于水"],
      answer: "都能溶于水",
      explanation: "白糖和食盐都能溶于水。",
      level: "小学基础题"
    },
    {
      id: "g-ch-16",
      subject: "化学",
      type: "state",
      prompt: "空气更接近下面哪一种状态？",
      options: ["气体", "液体", "固体", "金属"],
      answer: "气体",
      explanation: "空气通常属于气体。",
      level: "小学送分题"
    },
    {
      id: "g-ch-17",
      subject: "化学",
      type: "combustion",
      prompt: "蜡烛点燃后最明显会出现什么现象？",
      options: ["发光发热", "结冰", "变成泥土", "变成石头"],
      answer: "发光发热",
      explanation: "蜡烛燃烧时会发光发热。",
      level: "小学基础题"
    },
    {
      id: "g-ch-18",
      subject: "化学",
      type: "recycle",
      prompt: "废旧易拉罐更适合放在哪类垃圾里？",
      options: ["可回收物", "厨余垃圾", "有害垃圾", "厕所垃圾"],
      answer: "可回收物",
      explanation: "易拉罐通常属于可回收物。",
      level: "小学常识题"
    },
    {
      id: "g-ch-19",
      subject: "化学",
      type: "separation",
      prompt: "想把米中的小石子挑出来，最接近哪种做法？",
      options: ["分离混合物", "点火燃烧", "加水溶解", "冷冻成冰"],
      answer: "分离混合物",
      explanation: "把混在一起的不同物体分开，属于分离混合物。",
      level: "小学基础题"
    },
    {
      id: "g-ch-20",
      subject: "化学",
      type: "state-change",
      prompt: "烧水时看到壶口冒“白气”，更接近哪种现象？",
      options: ["水发生状态变化", "铁生锈", "木头燃烧", "塑料融化成金属"],
      answer: "水发生状态变化",
      explanation: "加热时水会变成水蒸气，属于状态变化。",
      level: "小学基础题"
    },
    {
      id: "g-ch-21",
      subject: "化学",
      type: "symbol",
      prompt: "元素符号 Fe 表示什么元素？",
      options: ["铁", "铜", "氧", "氢"],
      answer: "铁",
      explanation: "Fe 是铁元素的符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-22",
      subject: "化学",
      type: "formula",
      prompt: "二氧化碳的化学式是？",
      options: ["CO2", "O2", "H2O", "NaCl"],
      answer: "CO2",
      explanation: "二氧化碳写作 CO2。",
      level: "初中送分题"
    },
    {
      id: "g-ch-23",
      subject: "化学",
      type: "acid-base",
      prompt: "下列哪种物质更接近碱？",
      options: ["氢氧化钠", "盐酸", "食盐", "氧气"],
      answer: "氢氧化钠",
      explanation: "氢氧化钠是常见碱。",
      level: "初中基础题"
    },
    {
      id: "g-ch-24",
      subject: "化学",
      type: "chemical-change",
      prompt: "下列哪种现象更能说明生成了新物质？",
      options: ["铁生锈", "冰融化", "玻璃碎了", "木头被切开"],
      answer: "铁生锈",
      explanation: "铁生锈后生成铁锈，属于化学变化。",
      level: "初中基础题"
    },
    {
      id: "g-ch-25",
      subject: "化学",
      type: "experiment",
      prompt: "把带火星的木条伸入氧气中，通常会怎样？",
      options: ["复燃", "立刻熄灭", "没有变化", "变成蓝色"],
      answer: "复燃",
      explanation: "氧气能支持燃烧，带火星木条在氧气中通常会复燃。",
      level: "初中基础题"
    },
    {
      id: "g-ch-26",
      subject: "化学",
      type: "symbol",
      prompt: "元素符号 O 表示什么元素？",
      options: ["氧", "氢", "氮", "铁"],
      answer: "氧",
      explanation: "O 是氧元素的符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-27",
      subject: "化学",
      type: "formula",
      prompt: "氯化钠的化学式是？",
      options: ["NaCl", "HCl", "NaOH", "CO2"],
      answer: "NaCl",
      explanation: "氯化钠写作 NaCl。",
      level: "初中送分题"
    },
    {
      id: "g-ch-28",
      subject: "化学",
      type: "acid-base",
      prompt: "下列哪种物质更接近酸？",
      options: ["盐酸", "氢氧化钠", "氧气", "铁"],
      answer: "盐酸",
      explanation: "盐酸是常见酸。",
      level: "初中基础题"
    },
    {
      id: "g-ch-29",
      subject: "化学",
      type: "gas-common",
      prompt: "植物进行光合作用时，会放出哪种气体？",
      options: ["氧气", "氮气", "水蒸气", "氢气"],
      answer: "氧气",
      explanation: "植物光合作用过程中会释放氧气。",
      level: "初中送分题"
    },
    {
      id: "g-ch-30",
      subject: "化学",
      type: "experiment",
      prompt: "把二氧化碳通入澄清石灰水，通常会看到什么？",
      options: ["变浑浊", "变红色", "冒蓝火", "完全无变化"],
      answer: "变浑浊",
      explanation: "二氧化碳能使澄清石灰水变浑浊。",
      level: "初中基础题"
    },
    {
      id: "g-ch-31",
      subject: "化学",
      type: "symbol",
      prompt: "元素符号 H 表示什么元素？",
      options: ["氢", "氦", "汞", "银"],
      answer: "氢",
      explanation: "H 是氢元素的符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-32",
      subject: "化学",
      type: "experiment",
      prompt: "实验室里常用哪种仪器夹持试管进行加热？",
      options: ["试管夹", "量筒", "漏斗", "玻璃棒"],
      answer: "试管夹",
      explanation: "加热试管时，常用试管夹夹持试管。",
      level: "初中送分题"
    },
    {
      id: "g-ch-33",
      subject: "化学",
      type: "acid-base",
      prompt: "下列哪种物质更接近盐？",
      options: ["氯化钠", "盐酸", "氢氧化钠", "氧气"],
      answer: "氯化钠",
      explanation: "氯化钠属于盐类。",
      level: "初中基础题"
    },
    {
      id: "g-ch-34",
      subject: "化学",
      type: "chemical-change",
      prompt: "铁钉放久了生锈，最主要和空气中的什么有关？",
      options: ["氧气和水", "氮气和阳光", "二氧化碳和纸张", "氢气和木头"],
      answer: "氧气和水",
      explanation: "铁生锈通常和氧气、水共同作用有关。",
      level: "初中基础题"
    },
    {
      id: "g-ch-35",
      subject: "化学",
      type: "experiment",
      prompt: "把燃着的木条伸入二氧化碳中，通常会怎样？",
      options: ["熄灭", "燃得更旺", "变蓝色", "发生爆炸"],
      answer: "熄灭",
      explanation: "二氧化碳通常不能支持燃烧，所以木条会熄灭。",
      level: "初中基础题"
    },
    {
      id: "g-ch-36",
      subject: "化学",
      type: "symbol",
      prompt: "元素符号 N 表示什么元素？",
      options: ["氮", "钠", "镍", "氖"],
      answer: "氮",
      explanation: "N 是氮元素的符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-37",
      subject: "化学",
      type: "formula",
      prompt: "氢气的化学式是？",
      options: ["H2", "H", "O2", "CO"],
      answer: "H2",
      explanation: "常见氢气由氢分子组成，写作 H2。",
      level: "初中送分题"
    },
    {
      id: "g-ch-38",
      subject: "化学",
      type: "acid-base",
      prompt: "下列哪种物质更接近碱性？",
      options: ["氢氧化钙", "盐酸", "二氧化碳", "氧气"],
      answer: "氢氧化钙",
      explanation: "氢氧化钙属于碱。",
      level: "初中基础题"
    },
    {
      id: "g-ch-39",
      subject: "化学",
      type: "chemical-change",
      prompt: "下列哪种变化更可能生成新物质？",
      options: ["木柴燃烧", "冰块融化", "纸被撕碎", "玻璃打破"],
      answer: "木柴燃烧",
      explanation: "燃烧会生成新物质，属于化学变化。",
      level: "初中送分题"
    },
    {
      id: "g-ch-40",
      subject: "化学",
      type: "experiment",
      prompt: "氧气最重要的化学性质之一是？",
      options: ["支持燃烧", "使木条立刻结冰", "让铁钉变轻", "使水变甜"],
      answer: "支持燃烧",
      explanation: "氧气本身不燃烧，但能支持燃烧。",
      level: "初中基础题"
    },
    {
      id: "g-ch-41",
      subject: "化学",
      type: "classification",
      prompt: "下列哪种物质属于单质？",
      options: ["氧气", "二氧化碳", "氯化钠", "氢氧化钠"],
      answer: "氧气",
      explanation: "氧气由同一种元素组成，属于单质。",
      level: "高中送分题"
    },
    {
      id: "g-ch-42",
      subject: "化学",
      type: "particle",
      prompt: "保持水的化学性质的最小粒子更接近什么？",
      options: ["水分子", "氢原子", "氧原子", "电子"],
      answer: "水分子",
      explanation: "保持物质化学性质的最小粒子通常是分子、原子或离子；对水来说是水分子。",
      level: "高中基础题"
    },
    {
      id: "g-ch-43",
      subject: "化学",
      type: "redox",
      prompt: "物质得到氧的过程通常更接近什么？",
      options: ["氧化", "还原", "中和", "蒸发"],
      answer: "氧化",
      explanation: "从得氧失氧的角度看，得氧通常属于氧化。",
      level: "高中基础题"
    },
    {
      id: "g-ch-44",
      subject: "化学",
      type: "experiment",
      prompt: "实验室加热试管时，试管口通常应怎样放置？",
      options: ["不要对着人", "正对着自己", "对着同学", "朝上垂直对眼睛"],
      answer: "不要对着人",
      explanation: "加热试管时，试管口不能对着人，避免液体飞溅伤人。",
      level: "高中常识题"
    },
    {
      id: "g-ch-45",
      subject: "化学",
      type: "chemical-language",
      prompt: "2H2O 中前面的数字 2 表示什么？",
      options: ["2 个水分子", "2 个氢原子", "2 个氧原子", "水的相对分子质量"],
      answer: "2 个水分子",
      explanation: "化学式前面的系数表示分子个数，2H2O 表示 2 个水分子。",
      level: "高中基础题"
    },
    {
      id: "g-ch-46",
      subject: "化学",
      type: "classification",
      prompt: "下列哪种物质属于化合物？",
      options: ["水", "氧气", "铁", "氮气"],
      answer: "水",
      explanation: "水由两种元素组成，属于化合物。",
      level: "高中送分题"
    },
    {
      id: "g-ch-47",
      subject: "化学",
      type: "particle",
      prompt: "构成氯化钠这类物质的微粒更接近什么？",
      options: ["离子", "原子团", "电子云", "光子"],
      answer: "离子",
      explanation: "氯化钠属于离子化合物，主要由离子构成。",
      level: "高中基础题"
    },
    {
      id: "g-ch-48",
      subject: "化学",
      type: "redox",
      prompt: "物质失去氧的过程通常更接近什么？",
      options: ["还原", "氧化", "蒸发", "升华"],
      answer: "还原",
      explanation: "从得氧失氧的角度看，失去氧通常属于还原。",
      level: "高中基础题"
    },
    {
      id: "g-ch-49",
      subject: "化学",
      type: "experiment",
      prompt: "闻气体气味时，更安全的做法是什么？",
      options: ["用手轻轻扇闻", "把鼻子直接凑近", "大口猛吸", "对着同学闻"],
      answer: "用手轻轻扇闻",
      explanation: "实验中闻气味通常采用轻轻扇闻法，更安全。",
      level: "高中常识题"
    },
    {
      id: "g-ch-50",
      subject: "化学",
      type: "chemical-language",
      prompt: "化学方程式里 “+” 号通常表示什么？",
      options: ["反应物或生成物之间并列", "一定加热", "一定有沉淀", "一定要点燃"],
      answer: "反应物或生成物之间并列",
      explanation: "化学方程式里 “+” 常表示几种物质并列存在。",
      level: "高中基础题"
    },
    {
      id: "g-ch-51",
      subject: "化学",
      type: "classification",
      prompt: "下列哪种物质属于混合物？",
      options: ["空气", "氧气", "蒸馏水", "铜"],
      answer: "空气",
      explanation: "空气由多种气体组成，属于混合物。",
      level: "高中送分题"
    },
    {
      id: "g-ch-52",
      subject: "化学",
      type: "particle",
      prompt: "化学变化中的最小粒子通常不会变成什么？",
      options: ["电子以外的神秘物质", "原子重新组合的结果", "新物质中的粒子", "参与反应的微粒"],
      answer: "电子以外的神秘物质",
      explanation: "化学变化遵循微粒观，不会凭空出现所谓神秘物质。",
      level: "高中基础题"
    },
    {
      id: "g-ch-53",
      subject: "化学",
      type: "redox",
      prompt: "从化合价变化角度看，化合价升高通常更接近什么过程？",
      options: ["氧化", "还原", "中和", "结晶"],
      answer: "氧化",
      explanation: "化合价升高通常对应氧化过程。",
      level: "高中基础题"
    },
    {
      id: "g-ch-54",
      subject: "化学",
      type: "experiment",
      prompt: "稀释浓硫酸时，更安全的操作是什么？",
      options: ["把酸慢慢倒入水中", "把水快速倒入酸中", "同时倒入两个容器", "先加热再混合"],
      answer: "把酸慢慢倒入水中",
      explanation: "稀释浓硫酸时要把酸慢慢倒入水中，并不断搅拌。",
      level: "高中常识题"
    },
    {
      id: "g-ch-55",
      subject: "化学",
      type: "chemical-language",
      prompt: "化学方程式里的箭头通常表示什么？",
      options: ["反应生成", "必须加热", "必须点燃", "一定有沉淀"],
      answer: "反应生成",
      explanation: "箭头通常表示反应生成新的物质。",
      level: "高中基础题"
    },
    {
      id: "g-ch-56",
      subject: "化学",
      type: "classification",
      prompt: "下列哪种物质属于氧化物？",
      options: ["二氧化碳", "氢气", "食盐", "铁"],
      answer: "二氧化碳",
      explanation: "二氧化碳由两种元素组成，且其中一种是氧，属于氧化物。",
      level: "高中送分题"
    },
    {
      id: "g-ch-57",
      subject: "化学",
      type: "particle",
      prompt: "原子中带正电的微粒通常是什么？",
      options: ["质子", "电子", "中子", "分子"],
      answer: "质子",
      explanation: "质子带正电，电子带负电，中子不带电。",
      level: "高中基础题"
    },
    {
      id: "g-ch-58",
      subject: "化学",
      type: "redox",
      prompt: "从得失电子角度看，失电子通常更接近什么过程？",
      options: ["氧化", "还原", "蒸发", "中和"],
      answer: "氧化",
      explanation: "从得失电子角度看，失电子通常属于氧化。",
      level: "高中基础题"
    },
    {
      id: "g-ch-59",
      subject: "化学",
      type: "experiment",
      prompt: "实验结束后，剩余药品通常应该怎样处理？",
      options: ["按要求处理，不随意倒回原瓶", "全部倒回原瓶", "直接扔桌上", "带回家保存"],
      answer: "按要求处理，不随意倒回原瓶",
      explanation: "实验剩余药品一般不能随意倒回原瓶，要按实验要求处理。",
      level: "高中常识题"
    },
    {
      id: "g-ch-60",
      subject: "化学",
      type: "chemical-language",
      prompt: "化学式 H2 中右下角数字 2 表示什么？",
      options: ["一个氢分子由两个氢原子构成", "有两个氢分子", "氢的相对原子质量是2", "氢带两个正电"],
      answer: "一个氢分子由两个氢原子构成",
      explanation: "化学式右下角数字表示一个分子中原子的个数。",
      level: "高中基础题"
    },
    {
      id: "g-ch-61",
      subject: "化学",
      type: "formula",
      prompt: "NaOH 表示哪种物质？",
      options: ["氢氧化钠", "氯化钠", "硫酸", "碳酸钠"],
      answer: "氢氧化钠",
      explanation: "NaOH 表示氢氧化钠。",
      level: "大学送分题"
    },
    {
      id: "g-ch-62",
      subject: "化学",
      type: "classification",
      prompt: "下列哪种物质属于碱？",
      options: ["氢氧化钠", "盐酸", "二氧化碳", "氯化钠"],
      answer: "氢氧化钠",
      explanation: "氢氧化钠属于碱。",
      level: "大学送分题"
    },
    {
      id: "g-ch-63",
      subject: "化学",
      type: "particle",
      prompt: "分子、原子、离子这些微粒的共同点更接近什么？",
      options: ["都可构成物质", "都一定带电", "都能单独存在于任何物质中", "都只有一种大小"],
      answer: "都可构成物质",
      explanation: "分子、原子、离子都可以作为构成物质的微粒。",
      level: "大学基础题"
    },
    {
      id: "g-ch-64",
      subject: "化学",
      type: "experiment",
      prompt: "实验中如果不慎把酸液溅到皮肤上，通常应先怎样处理？",
      options: ["立即用大量清水冲洗", "直接擦掉就行", "先加热", "先盖住不管"],
      answer: "立即用大量清水冲洗",
      explanation: "酸液接触皮肤时，通常应立即用大量清水冲洗。",
      level: "大学常识题"
    },
    {
      id: "g-ch-65",
      subject: "化学",
      type: "redox",
      prompt: "从得失电子角度看，得到电子通常更接近什么过程？",
      options: ["还原", "氧化", "蒸发", "升华"],
      answer: "还原",
      explanation: "从得失电子角度看，得到电子通常属于还原。",
      level: "大学基础题"
    },
    {
      id: "g-ch-66",
      subject: "化学",
      type: "formula",
      prompt: "HCl 表示哪种物质？",
      options: ["氯化氢", "氢氧化钠", "盐酸钠", "氢气"],
      answer: "氯化氢",
      explanation: "HCl 表示氯化氢，水溶液常叫盐酸。",
      level: "大学送分题"
    },
    {
      id: "g-ch-67",
      subject: "化学",
      type: "classification",
      prompt: "下列哪种物质属于酸？",
      options: ["盐酸", "氢氧化钠", "氯化钠", "氧气"],
      answer: "盐酸",
      explanation: "盐酸属于酸。",
      level: "大学送分题"
    },
    {
      id: "g-ch-68",
      subject: "化学",
      type: "particle",
      prompt: "电子通常带什么电？",
      options: ["负电", "正电", "不带电", "有时正有时负"],
      answer: "负电",
      explanation: "电子通常带负电。",
      level: "大学送分题"
    },
    {
      id: "g-ch-69",
      subject: "化学",
      type: "experiment",
      prompt: "实验室加热液体时，试管内液体体积通常不应超过试管容积的多少？",
      options: ["1/3", "1/2", "2/3", "全部装满"],
      answer: "1/3",
      explanation: "加热试管时，液体体积通常不超过试管容积的 1/3。",
      level: "大学常识题"
    },
    {
      id: "g-ch-70",
      subject: "化学",
      type: "redox",
      prompt: "氧化还原反应的本质更接近什么？",
      options: ["电子转移", "温度升高", "颜色变化", "气味变化"],
      answer: "电子转移",
      explanation: "氧化还原反应的本质通常与电子转移有关。",
      level: "大学基础题"
    },
    {
      id: "g-ch-71",
      subject: "化学",
      type: "formula",
      prompt: "CO2 表示哪种物质？",
      options: ["二氧化碳", "一氧化碳", "氧气", "碳酸"],
      answer: "二氧化碳",
      explanation: "CO2 表示二氧化碳。",
      level: "大学送分题"
    },
    {
      id: "g-ch-72",
      subject: "化学",
      type: "classification",
      prompt: "下列哪种物质属于盐？",
      options: ["氯化钠", "盐酸", "氢氧化钠", "氢气"],
      answer: "氯化钠",
      explanation: "氯化钠属于盐。",
      level: "大学送分题"
    },
    {
      id: "g-ch-73",
      subject: "化学",
      type: "particle",
      prompt: "中子通常带什么电？",
      options: ["不带电", "正电", "负电", "有时正有时负"],
      answer: "不带电",
      explanation: "中子通常不带电。",
      level: "大学送分题"
    },
    {
      id: "g-ch-74",
      subject: "化学",
      type: "experiment",
      prompt: "量取液体体积时，更常使用什么仪器？",
      options: ["量筒", "烧杯", "酒精灯", "试管夹"],
      answer: "量筒",
      explanation: "量取液体体积通常更常使用量筒。",
      level: "大学常识题"
    },
    {
      id: "g-ch-75",
      subject: "化学",
      type: "redox",
      prompt: "氧化剂在反应中通常更接近什么变化？",
      options: ["自身被还原", "自身被氧化", "一定不变", "一定升华"],
      answer: "自身被还原",
      explanation: "氧化剂使别的物质被氧化，同时自身通常被还原。",
      level: "大学基础题"
    },
    {
      id: "g-ch-76",
      subject: "化学",
      type: "formula",
      prompt: "CaCO3 表示哪种常见物质的主要成分？",
      options: ["碳酸钙", "氢氧化钙", "氯化钙", "碳酸氢钙"],
      answer: "碳酸钙",
      explanation: "CaCO3 表示碳酸钙。",
      level: "大学送分题"
    },
    {
      id: "g-ch-77",
      subject: "化学",
      type: "classification",
      prompt: "下列哪种物质属于纯净物？",
      options: ["蒸馏水", "空气", "矿泉水", "食盐水"],
      answer: "蒸馏水",
      explanation: "蒸馏水通常只含一种物质，属于纯净物。",
      level: "大学基础题"
    },
    {
      id: "g-ch-78",
      subject: "化学",
      type: "particle",
      prompt: "原子核主要由哪两种微粒构成？",
      options: ["质子和中子", "电子和中子", "电子和质子", "分子和原子"],
      answer: "质子和中子",
      explanation: "原子核主要由质子和中子构成。",
      level: "大学送分题"
    },
    {
      id: "g-ch-79",
      subject: "化学",
      type: "ph",
      prompt: "pH 小于 7 的溶液通常更接近什么？",
      options: ["酸性", "碱性", "中性", "一定无色"],
      answer: "酸性",
      explanation: "通常 pH 小于 7 的溶液显酸性。",
      level: "大学基础题"
    },
    {
      id: "g-ch-80",
      subject: "化学",
      type: "equation",
      prompt: "化学方程式配平主要遵循哪条基本思想？",
      options: ["反应前后原子种类和数目守恒", "温度一定升高", "颜色一定变化", "必须有沉淀生成"],
      answer: "反应前后原子种类和数目守恒",
      explanation: "化学方程式配平通常遵循原子守恒思想。",
      level: "大学基础题"
    },
    {
      id: "g-ch-81",
      subject: "化学",
      type: "ph",
      prompt: "pH 等于 7 的溶液通常更接近什么？",
      options: ["中性", "酸性", "碱性", "一定有颜色"],
      answer: "中性",
      explanation: "通常 pH 等于 7 的溶液更接近中性。",
      level: "大学基础题"
    },
    {
      id: "g-ch-82",
      subject: "化学",
      type: "organic",
      prompt: "下列哪种物质更接近有机物？",
      options: ["甲烷", "氧气", "氯化钠", "铜"],
      answer: "甲烷",
      explanation: "甲烷属于常见有机物。",
      level: "大学基础题"
    },
    {
      id: "g-ch-83",
      subject: "化学",
      type: "equilibrium",
      prompt: "化学平衡状态下，反应通常怎样？",
      options: ["正逆反应仍在进行且速率相等", "反应完全停止", "只有正反应继续", "只有逆反应继续"],
      answer: "正逆反应仍在进行且速率相等",
      explanation: "化学平衡时，正逆反应通常仍在进行，但速率相等。",
      level: "大学基础题"
    },
    {
      id: "g-ch-84",
      subject: "化学",
      type: "experiment-error",
      prompt: "量筒读数时，视线通常应怎样？",
      options: ["与液面凹液面最低处保持水平", "从上往下斜着看", "从下往上看", "站远一点看就行"],
      answer: "与液面凹液面最低处保持水平",
      explanation: "量筒读数时，视线通常要与凹液面最低处保持水平。",
      level: "大学基础题"
    },
    {
      id: "g-ch-85",
      subject: "化学",
      type: "equilibrium",
      prompt: "化学平衡建立后，体系中各物质的浓度通常怎样？",
      options: ["保持恒定", "全部变成零", "一定持续增大", "一定持续减小"],
      answer: "保持恒定",
      explanation: "平衡状态下，各物质浓度通常保持恒定。",
      level: "大学基础题"
    },
    {
      id: "g-ch-86",
      subject: "化学",
      type: "experiment-error",
      prompt: "配制溶液时若俯视容量瓶刻度线读数，实际浓度通常会怎样？",
      options: ["偏大", "偏小", "不变", "一定为零"],
      answer: "偏大",
      explanation: "俯视读数会使实际加水量偏少，因此溶液浓度通常偏大。",
      level: "大学基础题"
    },
    {
      id: "g-ch-87",
      subject: "化学",
      type: "organic",
      prompt: "下列哪种物质更接近烃类？",
      options: ["乙烷", "氯化钠", "氢氧化钠", "二氧化碳"],
      answer: "乙烷",
      explanation: "乙烷属于由碳、氢组成的烃类。",
      level: "大学基础题"
    },
    {
      id: "g-ch-88",
      subject: "化学",
      type: "equilibrium",
      prompt: "增大某反应物浓度后，平衡体系通常会怎样调整？",
      options: ["向消耗该反应物的方向移动", "完全停止反应", "一定向左移动", "一定不变"],
      answer: "向消耗该反应物的方向移动",
      explanation: "按平衡移动直觉，体系通常会朝减弱该改变的方向调整。",
      level: "大学基础题"
    },
    {
      id: "g-ch-89",
      subject: "化学",
      type: "ph",
      prompt: "pH 大于 7 的溶液通常更接近什么？",
      options: ["碱性", "酸性", "中性", "一定透明"],
      answer: "碱性",
      explanation: "通常 pH 大于 7 的溶液更接近碱性。",
      level: "大学基础题"
    },
    {
      id: "g-ch-90",
      subject: "化学",
      type: "experiment-error",
      prompt: "滴定实验中，锥形瓶一般能不能用待测液再润洗一遍？",
      options: ["一般不需要", "必须反复润洗", "只能用浓酸润洗", "必须烘干到发红"],
      answer: "一般不需要",
      explanation: "滴定实验中，锥形瓶通常不需要再用待测液润洗，以免引入额外误差。",
      level: "大学基础题"
    },
    {
      id: "g-ch-91",
      subject: "化学",
      type: "ph",
      prompt: "肥皂水通常更接近下列哪种性质？",
      options: ["碱性", "酸性", "中性", "一定无色"],
      answer: "碱性",
      explanation: "肥皂水通常更接近碱性。",
      level: "大学常识题"
    },
    {
      id: "g-ch-92",
      subject: "化学",
      type: "equilibrium",
      prompt: "升高温度后，化学平衡体系会不会一定“不变”？",
      options: ["不会", "会", "只在酸中会", "只在碱中会"],
      answer: "不会",
      explanation: "温度改变通常会打破原平衡，体系往往会重新调整。",
      level: "大学基础题"
    },
    {
      id: "g-ch-93",
      subject: "化学",
      type: "organic",
      prompt: "酒精更接近下列哪一类物质？",
      options: ["有机物", "单质", "金属", "盐"],
      answer: "有机物",
      explanation: "酒精通常归入有机物。",
      level: "大学送分题"
    },
    {
      id: "g-ch-94",
      subject: "化学",
      type: "experiment-error",
      prompt: "给试管中的液体加热时，试管口一般应怎样放？",
      options: ["不要朝向自己或他人", "必须朝向自己", "必须完全竖直向上", "塞紧后再加热"],
      answer: "不要朝向自己或他人",
      explanation: "加热试管时，试管口不要朝向自己或他人，避免液体喷出造成危险。",
      level: "大学常识题"
    },
    {
      id: "g-ch-95",
      subject: "化学",
      type: "equation",
      prompt: "化学方程式里的“→”更接近表示什么？",
      options: ["反应生成关系", "温度大小", "质量单位", "颜色变化"],
      answer: "反应生成关系",
      explanation: "化学方程式中的箭头常用来表示反应物生成产物。",
      level: "大学送分题"
    },
    {
      id: "g-ch-96",
      subject: "化学",
      type: "element-symbol",
      prompt: "元素符号 Na 表示什么元素？",
      options: ["钠", "氮", "钙", "镁"],
      answer: "钠",
      explanation: "Na 是钠元素的化学符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-97",
      subject: "化学",
      type: "common-gas",
      prompt: "能支持燃烧的常见气体通常是哪个？",
      options: ["氧气", "氮气", "二氧化碳", "水蒸气"],
      answer: "氧气",
      explanation: "氧气能支持燃烧，是常见基础知识。",
      level: "初中送分题"
    },
    {
      id: "g-ch-98",
      subject: "化学",
      type: "experiment-safety",
      prompt: "闻气体气味时，通常应该怎样做？",
      options: ["用手轻轻扇闻", "把鼻子凑近猛闻", "直接吸入", "闭眼靠近"],
      answer: "用手轻轻扇闻",
      explanation: "实验室闻气体气味时，通常采用轻轻扇闻的方法。",
      level: "初中基础题"
    },
    {
      id: "g-ch-99",
      subject: "化学",
      type: "ion",
      prompt: "Na⁺ 表示什么离子？",
      options: ["钠离子", "钠原子", "氯离子", "氢离子"],
      answer: "钠离子",
      explanation: "Na⁺ 表示带一个正电荷的钠离子。",
      level: "高中送分题"
    },
    {
      id: "g-ch-100",
      subject: "化学",
      type: "redox",
      prompt: "物质跟氧发生反应，通常更接近什么过程？",
      options: ["氧化", "还原", "蒸发", "升华"],
      answer: "氧化",
      explanation: "与氧发生反应，通常更接近氧化过程。",
      level: "高中基础题"
    },
    {
      id: "g-ch-101",
      subject: "化学",
      type: "experiment-rule",
      prompt: "取用药品后，多余药品通常应怎样处理？",
      options: ["按规范处理，不放回原瓶", "立刻倒回原瓶", "随手倒进水槽", "带回家保存"],
      answer: "按规范处理，不放回原瓶",
      explanation: "实验中多余药品通常不能倒回原瓶，避免污染。",
      level: "高中基础题"
    },
    {
      id: "g-ch-102",
      subject: "化学",
      type: "ph",
      prompt: "柠檬汁通常更接近哪种性质？",
      options: ["酸性", "碱性", "中性", "一定无味"],
      answer: "酸性",
      explanation: "柠檬汁通常显酸性。",
      level: "大学常识题"
    },
    {
      id: "g-ch-103",
      subject: "化学",
      type: "organic",
      prompt: "甲烷更接近下列哪类物质？",
      options: ["有机物", "金属单质", "盐", "氧化物"],
      answer: "有机物",
      explanation: "甲烷属于常见有机物。",
      level: "大学基础题"
    },
    {
      id: "g-ch-104",
      subject: "化学",
      type: "equilibrium",
      prompt: "化学平衡达到后，反应体系通常是什么状态？",
      options: ["动态平衡", "完全停止", "一定放热", "一定变色"],
      answer: "动态平衡",
      explanation: "达到平衡后，正逆反应通常仍在进行，但整体保持稳定。",
      level: "大学基础题"
    },
    {
      id: "g-ch-105",
      subject: "化学",
      type: "experiment-error",
      prompt: "量筒读数时若视线偏高，读出的体积通常会怎样？",
      options: ["偏大", "偏小", "不变", "一定为零"],
      answer: "偏大",
      explanation: "视线偏高时，读数通常会偏大。",
      level: "大学基础题"
    },
    {
      id: "g-ch-106",
      subject: "化学",
      type: "acid-base",
      prompt: "食醋通常更接近哪种性质？",
      options: ["酸性", "碱性", "中性", "金属性"],
      answer: "酸性",
      explanation: "食醋通常显酸性。",
      level: "初中送分题"
    },
    {
      id: "g-ch-107",
      subject: "化学",
      type: "symbol",
      prompt: "元素符号 Ca 表示什么元素？",
      options: ["钙", "碳", "铜", "氯"],
      answer: "钙",
      explanation: "Ca 是钙元素的化学符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-108",
      subject: "化学",
      type: "experiment-rule",
      prompt: "做实验时，药品标签一般应该朝向哪里更便于观察？",
      options: ["朝向手心", "朝向桌面", "朝向窗外", "随便放"],
      answer: "朝向手心",
      explanation: "这样更便于观察，也能减少药液流到标签上的风险。",
      level: "初中基础题"
    },
    {
      id: "g-ch-109",
      subject: "化学",
      type: "classification",
      prompt: "二氧化碳更接近下列哪类物质？",
      options: ["氧化物", "单质", "金属", "合金"],
      answer: "氧化物",
      explanation: "二氧化碳由碳和氧组成，属于氧化物。",
      level: "初中基础题"
    },
    {
      id: "g-ch-110",
      subject: "化学",
      type: "experiment-safety",
      prompt: "酒精灯熄灭时，通常应怎样做？",
      options: ["用灯帽盖灭", "用嘴吹灭", "加水灭火", "用手扇灭"],
      answer: "用灯帽盖灭",
      explanation: "酒精灯通常应用灯帽盖灭，不宜直接吹灭。",
      level: "初中基础题"
    },
    {
      id: "g-ch-111",
      subject: "化学",
      type: "particle",
      prompt: "原子通常由原子核和什么组成？",
      options: ["电子", "离子", "分子", "质子群"],
      answer: "电子",
      explanation: "原子通常由原子核和核外电子组成。",
      level: "高中送分题"
    },
    {
      id: "g-ch-112",
      subject: "化学",
      type: "equation",
      prompt: "化学方程式配平后，反应前后通常保持不变的是什么？",
      options: ["原子种类和数目", "颜色一定相同", "温度一定相同", "状态一定相同"],
      answer: "原子种类和数目",
      explanation: "配平方程式体现的就是原子守恒思想。",
      level: "高中基础题"
    },
    {
      id: "g-ch-113",
      subject: "化学",
      type: "redox",
      prompt: "得电子的过程更接近下面哪一项？",
      options: ["还原", "氧化", "升华", "蒸发"],
      answer: "还原",
      explanation: "从电子得失角度看，得电子通常属于还原。",
      level: "高中基础题"
    },
    {
      id: "g-ch-114",
      subject: "化学",
      type: "ion",
      prompt: "Cl⁻ 表示什么离子？",
      options: ["氯离子", "氯原子", "钙离子", "氢离子"],
      answer: "氯离子",
      explanation: "Cl⁻ 表示带一个负电荷的氯离子。",
      level: "高中送分题"
    },
    {
      id: "g-ch-115",
      subject: "化学",
      type: "experiment",
      prompt: "过滤操作中，用来分离不溶性固体和液体的常见材料是什么？",
      options: ["滤纸", "铜丝", "酒精灯", "量筒"],
      answer: "滤纸",
      explanation: "过滤时常借助漏斗和滤纸来分离固液。",
      level: "高中基础题"
    },
    {
      id: "g-ch-116",
      subject: "化学",
      type: "ph",
      prompt: "纯水通常更接近下面哪种 pH 状态？",
      options: ["接近 7", "接近 1", "接近 14", "一定大于 7"],
      answer: "接近 7",
      explanation: "纯水通常更接近中性，pH 接近 7。",
      level: "大学送分题"
    },
    {
      id: "g-ch-117",
      subject: "化学",
      type: "organic",
      prompt: "乙醇更接近哪类有机物中的常见代表？",
      options: ["醇类", "烃类", "盐类", "氧化物"],
      answer: "醇类",
      explanation: "乙醇是最常见的醇类物质之一。",
      level: "大学基础题"
    },
    {
      id: "g-ch-118",
      subject: "化学",
      type: "equilibrium",
      prompt: "化学平衡建立后，正逆反应速率通常怎样？",
      options: ["相等", "都为零", "正反应更大", "逆反应更大"],
      answer: "相等",
      explanation: "动态平衡中，正逆反应速率通常相等。",
      level: "大学基础题"
    },
    {
      id: "g-ch-119",
      subject: "化学",
      type: "experiment-error",
      prompt: "滴定结束判断终点时，通常看什么变化最直接？",
      options: ["指示剂颜色", "烧杯大小", "室温高低", "玻璃厚度"],
      answer: "指示剂颜色",
      explanation: "滴定终点通常借助指示剂颜色变化来判断。",
      level: "大学基础题"
    },
    {
      id: "g-ch-120",
      subject: "化学",
      type: "equation",
      prompt: "书写化学方程式时，反应物一般写在箭头的哪一侧？",
      options: ["左侧", "右侧", "上下都行", "必须写在中间"],
      answer: "左侧",
      explanation: "常规写法中，反应物通常写在箭头左侧，生成物写在右侧。",
      level: "大学送分题"
    },
    {
      id: "g-ch-121",
      subject: "化学",
      type: "state",
      prompt: "空气通常更接近哪种状态的物质？",
      options: ["气体", "液体", "固体", "金属"],
      answer: "气体",
      explanation: "空气通常属于气体。",
      level: "小学送分题"
    },
    {
      id: "g-ch-122",
      subject: "化学",
      type: "dissolve",
      prompt: "白糖放进水里慢慢看不见了，这种现象更接近什么？",
      options: ["溶解", "燃烧", "凝固", "生锈"],
      answer: "溶解",
      explanation: "白糖在水中慢慢分散开，属于溶解。",
      level: "小学基础题"
    },
    {
      id: "g-ch-123",
      subject: "化学",
      type: "material-change",
      prompt: "蜡烛点燃后变短，最直接说明什么？",
      options: ["发生了变化", "完全没变", "变成金属", "一定变冷"],
      answer: "发生了变化",
      explanation: "蜡烛燃烧后出现明显变化。",
      level: "小学基础题"
    },
    {
      id: "g-ch-124",
      subject: "化学",
      type: "material",
      prompt: "下列哪一项更接近液体？",
      options: ["牛奶", "石头", "空气", "木头"],
      answer: "牛奶",
      explanation: "牛奶通常属于液体。",
      level: "小学送分题"
    },
    {
      id: "g-ch-125",
      subject: "化学",
      type: "separation",
      prompt: "把沙子和大米分开，更接近哪种做法？",
      options: ["分离", "燃烧", "蒸发", "凝结"],
      answer: "分离",
      explanation: "两种物质混在一起后可以再分离。",
      level: "小学常识题"
    },
    {
      id: "g-ch-126",
      subject: "化学",
      type: "burning",
      prompt: "纸张点燃后最明显的现象之一是什么？",
      options: ["变成灰", "变成水", "变成铁", "完全不变"],
      answer: "变成灰",
      explanation: "纸燃烧后通常会留下灰烬。",
      level: "小学常识题"
    },
    {
      id: "g-ch-127",
      subject: "化学",
      type: "kitchen",
      prompt: "食盐通常更接近哪类厨房材料？",
      options: ["调味品", "金属工具", "燃料", "玻璃器皿"],
      answer: "调味品",
      explanation: "食盐是常见调味品。",
      level: "小学送分题"
    },
    {
      id: "g-ch-128",
      subject: "化学",
      type: "observation",
      prompt: "看到水烧开时冒泡，这最接近哪类现象？",
      options: ["物态变化", "磁铁吸引", "光反射", "电路闭合"],
      answer: "物态变化",
      explanation: "烧开时水会发生物态变化。",
      level: "小学基础题"
    },
    {
      id: "g-ch-129",
      subject: "化学",
      type: "lab-tool",
      prompt: "观察细小现象时更适合使用什么？",
      options: ["放大镜", "足球", "桌布", "水壶"],
      answer: "放大镜",
      explanation: "放大镜更适合观察细小现象。",
      level: "小学常识题"
    },
    {
      id: "g-ch-130",
      subject: "化学",
      type: "taste",
      prompt: "柠檬通常更接近什么味道？",
      options: ["酸", "甜", "苦", "辣"],
      answer: "酸",
      explanation: "柠檬通常有明显酸味。",
      level: "小学送分题"
    },
    {
      id: "g-ch-131",
      subject: "化学",
      type: "acid-base",
      prompt: "小苏打溶液通常更接近哪种性质？",
      options: ["碱性", "酸性", "金属性", "放射性"],
      answer: "碱性",
      explanation: "小苏打溶液通常更接近碱性。",
      level: "初中基础题"
    },
    {
      id: "g-ch-132",
      subject: "化学",
      type: "symbol",
      prompt: "元素符号 C 表示什么元素？",
      options: ["碳", "钙", "铜", "氯"],
      answer: "碳",
      explanation: "C 是碳元素的符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-133",
      subject: "化学",
      type: "gas",
      prompt: "二氧化碳通常会使澄清石灰水怎样？",
      options: ["变浑浊", "变成蓝色", "发光", "结冰"],
      answer: "变浑浊",
      explanation: "二氧化碳常使澄清石灰水变浑浊。",
      level: "初中基础题"
    },
    {
      id: "g-ch-134",
      subject: "化学",
      type: "experiment-safety",
      prompt: "实验时不小心碰到腐蚀性液体，通常应先怎样处理？",
      options: ["立即用大量清水冲洗", "继续实验", "用纸擦一下就行", "先闻一闻"],
      answer: "立即用大量清水冲洗",
      explanation: "接触腐蚀性液体时通常先大量清水冲洗。",
      level: "初中常识题"
    },
    {
      id: "g-ch-135",
      subject: "化学",
      type: "classification",
      prompt: "氧气更接近下列哪类物质？",
      options: ["单质", "混合物", "盐", "合金"],
      answer: "单质",
      explanation: "氧气由一种元素组成，属于单质。",
      level: "初中基础题"
    },
    {
      id: "g-ch-136",
      subject: "化学",
      type: "experiment",
      prompt: "量取液体体积时常用哪种仪器？",
      options: ["量筒", "酒精灯", "铁架台", "蒸发皿"],
      answer: "量筒",
      explanation: "量筒常用于量取液体体积。",
      level: "初中送分题"
    },
    {
      id: "g-ch-137",
      subject: "化学",
      type: "symbol",
      prompt: "元素符号 Zn 表示什么元素？",
      options: ["锌", "铁", "银", "氯"],
      answer: "锌",
      explanation: "Zn 是锌元素的符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-138",
      subject: "化学",
      type: "acid-base",
      prompt: "肥皂水碰到石蕊试液时更可能让蓝色更明显，这更接近什么性质？",
      options: ["碱性", "酸性", "中性", "气体"],
      answer: "碱性",
      explanation: "肥皂水通常更接近碱性。",
      level: "初中基础题"
    },
    {
      id: "g-ch-139",
      subject: "化学",
      type: "gas",
      prompt: "植物进行光合作用时会释放哪种常见气体？",
      options: ["氧气", "氢气", "氯气", "二氧化硫"],
      answer: "氧气",
      explanation: "植物光合作用会释放氧气。",
      level: "初中常识题"
    },
    {
      id: "g-ch-140",
      subject: "化学",
      type: "experiment-safety",
      prompt: "加热试管时，试管口为什么不要朝向别人？",
      options: ["防止液体喷出伤人", "防止颜色变化", "为了更快加热", "为了更容易读数"],
      answer: "防止液体喷出伤人",
      explanation: "这样做主要是为了安全。",
      level: "初中常识题"
    },
    {
      id: "g-ch-141",
      subject: "化学",
      type: "classification",
      prompt: "食盐水更接近哪一类？",
      options: ["混合物", "单质", "金属", "氧化物"],
      answer: "混合物",
      explanation: "食盐水由多种成分组成，属于混合物。",
      level: "初中基础题"
    },
    {
      id: "g-ch-142",
      subject: "化学",
      type: "experiment",
      prompt: "蒸发操作中，通常用来盛放液体加热的是哪种仪器？",
      options: ["蒸发皿", "量筒", "漏斗", "试管夹"],
      answer: "蒸发皿",
      explanation: "蒸发皿常用于蒸发液体。",
      level: "初中基础题"
    },
    {
      id: "g-ch-143",
      subject: "化学",
      type: "symbol",
      prompt: "元素符号 Mg 表示什么元素？",
      options: ["镁", "锰", "汞", "氯"],
      answer: "镁",
      explanation: "Mg 是镁元素的符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-144",
      subject: "化学",
      type: "acid-base",
      prompt: "胃液通常更接近哪种性质？",
      options: ["酸性", "碱性", "中性", "一定有颜色"],
      answer: "酸性",
      explanation: "胃液通常更接近酸性。",
      level: "初中常识题"
    },
    {
      id: "g-ch-145",
      subject: "化学",
      type: "gas",
      prompt: "氢气最明显的一个特点之一是什么？",
      options: ["容易燃烧", "一定有颜色", "一定有毒", "一定有味道"],
      answer: "容易燃烧",
      explanation: "氢气是一种可燃性气体。",
      level: "初中基础题"
    },
    {
      id: "g-ch-146",
      subject: "化学",
      type: "experiment-safety",
      prompt: "实验室中的药品能不能随便品尝？",
      options: ["不能", "能", "只要一点点就行", "加热后可以"],
      answer: "不能",
      explanation: "实验室药品不能随便品尝。",
      level: "初中送分题"
    },
    {
      id: "g-ch-147",
      subject: "化学",
      type: "classification",
      prompt: "蒸馏水更接近下列哪一类？",
      options: ["纯净物", "混合物", "合金", "盐"],
      answer: "纯净物",
      explanation: "蒸馏水通常更接近纯净物。",
      level: "初中基础题"
    },
    {
      id: "g-ch-148",
      subject: "化学",
      type: "experiment",
      prompt: "漏斗在实验里最常见的用途之一是什么？",
      options: ["过滤或转移液体", "加热药品", "称量质量", "测量温度"],
      answer: "过滤或转移液体",
      explanation: "漏斗常用于过滤和转移液体。",
      level: "初中基础题"
    },
    {
      id: "g-ch-149",
      subject: "化学",
      type: "symbol",
      prompt: "元素符号 Al 表示什么元素？",
      options: ["铝", "银", "氩", "金"],
      answer: "铝",
      explanation: "Al 是铝元素的符号。",
      level: "初中送分题"
    },
    {
      id: "g-ch-150",
      subject: "化学",
      type: "acid-base",
      prompt: "石灰水通常更接近哪种性质？",
      options: ["碱性", "酸性", "中性", "一定无色"],
      answer: "碱性",
      explanation: "石灰水通常更接近碱性。",
      level: "初中基础题"
    },
    {
      id: "g-ch-151",
      subject: "化学",
      type: "particle",
      prompt: "分子、原子和离子都属于哪一类研究对象？",
      options: ["微粒", "仪器", "金属", "材料"],
      answer: "微粒",
      explanation: "它们都属于构成物质的微粒。",
      level: "高中送分题"
    },
    {
      id: "g-ch-152",
      subject: "化学",
      type: "equation",
      prompt: "书写化学方程式时，通常要遵守什么思想？",
      options: ["原子守恒", "颜色守恒", "体积守恒", "温度守恒"],
      answer: "原子守恒",
      explanation: "化学方程式的配平体现原子守恒。",
      level: "高中基础题"
    },
    {
      id: "g-ch-153",
      subject: "化学",
      type: "redox",
      prompt: "失电子的过程更接近哪一项？",
      options: ["氧化", "还原", "蒸发", "凝固"],
      answer: "氧化",
      explanation: "从电子得失角度看，失电子通常属于氧化。",
      level: "高中基础题"
    },
    {
      id: "g-ch-154",
      subject: "化学",
      type: "ion",
      prompt: "H⁺ 表示什么离子？",
      options: ["氢离子", "氢原子", "氦离子", "钠离子"],
      answer: "氢离子",
      explanation: "H⁺ 表示氢离子。",
      level: "高中送分题"
    },
    {
      id: "g-ch-155",
      subject: "化学",
      type: "reaction",
      prompt: "铁生锈在本质上更接近哪类过程？",
      options: ["氧化过程", "还原过程", "升华过程", "中和过程"],
      answer: "氧化过程",
      explanation: "铁生锈在本质上更接近氧化过程。",
      level: "高中基础题"
    },
    {
      id: "g-ch-156",
      subject: "化学",
      type: "experiment-rule",
      prompt: "倾倒液体药品时，瓶塞通常怎样放更合适？",
      options: ["倒放在桌面上方的手里或拿着", "随手放桌上", "扔掉", "放回药液里"],
      answer: "倒放在桌面上方的手里或拿着",
      explanation: "这样更能避免污染。",
      level: "高中基础题"
    },
    {
      id: "g-ch-157",
      subject: "化学",
      type: "particle",
      prompt: "原子核通常由什么构成？",
      options: ["质子和中子", "电子和质子", "电子和中子", "分子和原子"],
      answer: "质子和中子",
      explanation: "原子核通常由质子和中子构成。",
      level: "高中送分题"
    },
    {
      id: "g-ch-158",
      subject: "化学",
      type: "equation",
      prompt: "化学方程式中“+”更接近表示什么？",
      options: ["反应物之间并列", "温度升高", "产生沉淀", "颜色变化"],
      answer: "反应物之间并列",
      explanation: "“+”常用来连接多个反应物或生成物。",
      level: "高中基础题"
    },
    {
      id: "g-ch-159",
      subject: "化学",
      type: "redox",
      prompt: "氧化剂在反应中通常会怎样变化？",
      options: ["自身被还原", "自身被氧化", "一定不变", "一定升温"],
      answer: "自身被还原",
      explanation: "氧化剂使别的物质被氧化，同时自身通常被还原。",
      level: "高中基础题"
    },
    {
      id: "g-ch-160",
      subject: "化学",
      type: "ion",
      prompt: "Ca²⁺ 表示什么离子？",
      options: ["钙离子", "钙原子", "铜离子", "碳离子"],
      answer: "钙离子",
      explanation: "Ca²⁺ 表示带两个正电荷的钙离子。",
      level: "高中送分题"
    },
    {
      id: "g-ch-161",
      subject: "化学",
      type: "reaction",
      prompt: "酸和碱反应通常更接近哪类反应？",
      options: ["中和反应", "分解反应", "置换反应", "氧化反应"],
      answer: "中和反应",
      explanation: "酸和碱反应通常更接近中和反应。",
      level: "高中基础题"
    },
    {
      id: "g-ch-162",
      subject: "化学",
      type: "experiment-rule",
      prompt: "称量药品时，通常不能直接把药品放在哪个仪器盘面上？",
      options: ["托盘天平托盘", "药匙", "滤纸", "烧杯"],
      answer: "托盘天平托盘",
      explanation: "通常需要垫纸或器皿，避免污染和腐蚀。",
      level: "高中常识题"
    },
    {
      id: "g-ch-163",
      subject: "化学",
      type: "particle",
      prompt: "离子与原子的一个明显区别是什么？",
      options: ["离子带电", "离子一定更大", "离子一定有颜色", "离子不能存在"],
      answer: "离子带电",
      explanation: "离子和原子的明显区别之一是离子带电。",
      level: "高中基础题"
    },
    {
      id: "g-ch-164",
      subject: "化学",
      type: "equation",
      prompt: "化学方程式配平后，说明反应前后什么守恒？",
      options: ["原子总数", "颜色数量", "温度高低", "物质状态"],
      answer: "原子总数",
      explanation: "配平后体现的是原子种类和数目守恒。",
      level: "高中基础题"
    },
    {
      id: "g-ch-165",
      subject: "化学",
      type: "redox",
      prompt: "铜在空气中长期放置表面变化，通常也和什么过程有关？",
      options: ["氧化", "蒸发", "熔化", "结晶"],
      answer: "氧化",
      explanation: "金属表面变化常和氧化有关。",
      level: "高中基础题"
    },
    {
      id: "g-ch-166",
      subject: "化学",
      type: "ph",
      prompt: "pH 越小，溶液通常越接近什么？",
      options: ["酸性更强", "碱性更强", "中性更强", "一定无色"],
      answer: "酸性更强",
      explanation: "一般来说 pH 越小，酸性越强。",
      level: "大学基础题"
    },
    {
      id: "g-ch-167",
      subject: "化学",
      type: "organic",
      prompt: "甲醇和乙醇都更接近哪一类有机物？",
      options: ["醇类", "盐类", "氧化物", "合金"],
      answer: "醇类",
      explanation: "甲醇和乙醇都属于醇类。",
      level: "大学基础题"
    },
    {
      id: "g-ch-168",
      subject: "化学",
      type: "equilibrium",
      prompt: "平衡体系受到条件改变后通常会怎样？",
      options: ["重新调整", "永远不变", "立刻停止反应", "一定爆炸"],
      answer: "重新调整",
      explanation: "平衡体系通常会随条件改变而重新调整。",
      level: "大学基础题"
    },
    {
      id: "g-ch-169",
      subject: "化学",
      type: "experiment-error",
      prompt: "滴定时若终点判断过晚，结果通常更容易怎样？",
      options: ["偏大", "偏小", "不变", "一定为零"],
      answer: "偏大",
      explanation: "终点判断过晚，读数通常会偏大。",
      level: "大学基础题"
    },
    {
      id: "g-ch-170",
      subject: "化学",
      type: "equation",
      prompt: "写离子方程式时，通常更关注哪一类微粒？",
      options: ["实际参加反应的离子", "所有观赏粒子", "颜色粒子", "气味粒子"],
      answer: "实际参加反应的离子",
      explanation: "离子方程式主要写参加反应的离子。",
      level: "大学基础题"
    },
    {
      id: "g-ch-171",
      subject: "化学",
      type: "ph",
      prompt: "氢氧化钠溶液通常更接近什么 pH 特点？",
      options: ["大于 7", "小于 7", "等于 7", "一定为 0"],
      answer: "大于 7",
      explanation: "氢氧化钠溶液通常显碱性，pH 大于 7。",
      level: "初中基础题"
    },
    {
      id: "g-ch-172",
      subject: "化学",
      type: "organic",
      prompt: "有机物最常见地与哪种元素关系密切？",
      options: ["碳", "铁", "钙", "铝"],
      answer: "碳",
      explanation: "有机物通常与碳元素关系密切。",
      level: "高中送分题"
    },
    {
      id: "g-ch-173",
      subject: "化学",
      type: "equilibrium",
      prompt: "平衡状态下，正逆反应是不是都在进行？",
      options: ["是", "不是", "只有正反应进行", "只有逆反应进行"],
      answer: "是",
      explanation: "平衡是动态平衡，正逆反应通常都在进行。",
      level: "高中基础题"
    },
    {
      id: "g-ch-174",
      subject: "化学",
      type: "experiment-error",
      prompt: "容量瓶定容时若液面低于刻度线，通常应怎样？",
      options: ["继续加水到刻度线", "倒掉重来", "立即加热", "不再处理"],
      answer: "继续加水到刻度线",
      explanation: "定容时应使液面与刻度线相切。",
      level: "大学基础题"
    },
    {
      id: "g-ch-175",
      subject: "化学",
      type: "equation",
      prompt: "化学方程式中生成物通常写在箭头哪侧？",
      options: ["右侧", "左侧", "上方", "下方"],
      answer: "右侧",
      explanation: "常规写法中生成物通常写在箭头右侧。",
      level: "初中送分题"
    },
    {
      id: "g-ch-176",
      subject: "化学",
      type: "reaction",
      prompt: "铁丝在氧气中燃烧时，通常会看到什么现象？",
      options: ["火星四射", "立刻融化成水", "完全没有变化", "变成气球"],
      answer: "火星四射",
      explanation: "铁丝在氧气中燃烧常伴随火星四射现象。",
      level: "高中基础题"
    },
    {
      id: "g-ch-177",
      subject: "化学",
      type: "particle",
      prompt: "电子通常带什么电？",
      options: ["负电", "正电", "不带电", "有时正有时负"],
      answer: "负电",
      explanation: "电子通常带负电。",
      level: "高中送分题"
    },
    {
      id: "g-ch-178",
      subject: "化学",
      type: "reaction",
      prompt: "中和反应后生成物通常更接近哪两类物质？",
      options: ["盐和水", "氧气和水", "金属和气体", "酸和碱"],
      answer: "盐和水",
      explanation: "中和反应生成物通常更接近盐和水。",
      level: "高中基础题"
    },
    {
      id: "g-ch-179",
      subject: "化学",
      type: "ion",
      prompt: "SO4²⁻ 更接近哪种微粒？",
      options: ["离子", "原子", "分子", "单质"],
      answer: "离子",
      explanation: "SO4²⁻ 是带电微粒，更接近离子。",
      level: "高中基础题"
    },
    {
      id: "g-ch-180",
      subject: "化学",
      type: "experiment-rule",
      prompt: "用试纸测溶液性质时，通常不直接把试纸伸进试剂瓶里，主要是为了什么？",
      options: ["防止污染药品", "让颜色更深", "更快反应", "减少蒸发"],
      answer: "防止污染药品",
      explanation: "这样做主要是为了防止污染原试剂。",
      level: "高中基础题"
    }
  ]
};
const SUBJECTS = [
  {
    key: "chinese",
    name: "语文",
    short: "语",
    description: "字词、古诗、成语和基础阅读。"
  },
  {
    key: "math",
    name: "数学",
    short: "数",
    description: "小学阶段的计算、图形、单位和应用题。"
  },
  {
    key: "english",
    name: "英语",
    short: "英",
    description: "字母、单词、简单句型和日常表达。"
  },
  {
    key: "physics",
    name: "物理",
    short: "物",
    description: "偏生活常识的启蒙物理题。"
  },
  {
    key: "chemistry",
    name: "化学",
    short: "化",
    description: "偏生活常识的启蒙化学题。"
  }
];
const BASE_QUESTIONS_BY_SUBJECT = {
  chinese: [
    {
      id: "cn-1",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“床前明月光”的下一句是？",
      options: ["疑是地上霜", "举头望明月", "低头思故乡", "处处闻啼鸟"],
      answer: "疑是地上霜",
      explanation: "这两句出自李白《静夜思》。",
      level: "小学送分题"
    },
    {
      id: "cn-2",
      subject: "语文",
      type: "poem-title",
      prompt: "“春眠不觉晓”出自哪首诗？",
      options: ["《春晓》", "《咏柳》", "《悯农》", "《江雪》"],
      answer: "《春晓》",
      explanation: "“春眠不觉晓”出自孟浩然《春晓》。",
      level: "小学送分题"
    },
    {
      id: "cn-3",
      subject: "语文",
      type: "language-spelling",
      prompt: "下列哪个词语书写正确？",
      options: ["迫不急待", "一如既往", "穿流不息", "再接再励"],
      answer: "一如既往",
      explanation: "其余几个都是常见错别字。",
      level: "小学基础题"
    },
    {
      id: "cn-4",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“专心致志”更接近下面哪种意思？",
      options: ["非常专注", "非常着急", "非常伤心", "非常热闹"],
      answer: "非常专注",
      explanation: "“专心致志”形容做事非常认真专注。",
      level: "小学基础题"
    },
    {
      id: "cn-5",
      subject: "语文",
      type: "literature-author",
      prompt: "《西游记》的作者通常认为是？",
      options: ["吴承恩", "曹雪芹", "施耐庵", "罗贯中"],
      answer: "吴承恩",
      explanation: "《西游记》作者通常认为是吴承恩。",
      level: "小学常识题"
    },
    {
      id: "cn-6",
      subject: "语文",
      type: "literature-dynasty",
      prompt: "“司马光砸缸”中的司马光是哪个朝代的人？",
      options: ["唐朝", "宋朝", "元朝", "明朝"],
      answer: "宋朝",
      explanation: "司马光是北宋人。",
      level: "小学常识题"
    },
    {
      id: "cn-7",
      subject: "语文",
      type: "rhetoric",
      prompt: "下列哪句话用了比喻？",
      options: ["风停了", "他跑得很快", "阳光像金子一样洒下来", "大家都笑了"],
      answer: "阳光像金子一样洒下来",
      explanation: "这句话把阳光比作金子。",
      level: "小学基础题"
    },
    {
      id: "cn-8",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“海内存知己”的下一句是？",
      options: ["天涯若比邻", "低头思故乡", "月是故乡明", "独钓寒江雪"],
      answer: "天涯若比邻",
      explanation: "这两句是常见古诗名句。",
      level: "小学送分题"
    },
    {
      id: "cn-9",
      subject: "语文",
      type: "idiom-truth",
      prompt: "“亡羊补牢”告诉我们什么道理？",
      options: ["做错事后及时补救还不晚", "遇事要逃跑", "做事不能认真", "东西坏了就不要管"],
      answer: "做错事后及时补救还不晚",
      explanation: "这个成语强调及时补救。",
      level: "小学基础题"
    },
    {
      id: "cn-10",
      subject: "语文",
      type: "literature-person",
      prompt: "鲁迅的原名是？",
      options: ["周树人", "周作人", "郭沫若", "老舍"],
      answer: "周树人",
      explanation: "鲁迅原名周树人。",
      level: "小学常识题"
    },
    {
      id: "cn-11",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“谁知盘中餐”的下一句是？",
      options: ["粒粒皆辛苦", "处处闻啼鸟", "更上一层楼", "疑是地上霜"],
      answer: "粒粒皆辛苦",
      explanation: "这两句出自《悯农》。",
      level: "小学送分题"
    },
    {
      id: "cn-12",
      subject: "语文",
      type: "idiom-meaning",
      prompt: "“画蛇添足”比喻什么？",
      options: ["做了多余的事", "画画很好看", "动作很快", "心里很高兴"],
      answer: "做了多余的事",
      explanation: "这个成语比喻做了多余的事，反而不恰当。",
      level: "小学基础题"
    },
    {
      id: "cn-13",
      subject: "语文",
      type: "literature-author",
      prompt: "《静夜思》的作者是？",
      options: ["李白", "杜甫", "白居易", "王维"],
      answer: "李白",
      explanation: "《静夜思》是李白的作品。",
      level: "小学送分题"
    },
    {
      id: "cn-14",
      subject: "语文",
      type: "antonym",
      prompt: "下列哪组是反义词？",
      options: ["高和矮", "高和大", "红和亮", "跑和跳"],
      answer: "高和矮",
      explanation: "“高”和“矮”意思相反。",
      level: "小学基础题"
    },
    {
      id: "cn-15",
      subject: "语文",
      type: "scene-letter",
      prompt: "写信给老师，开头的称呼通常应该写什么？",
      options: ["老师您好", "哈哈", "天气不错", "今天真累"],
      answer: "老师您好",
      explanation: "书信开头一般先写合适的称呼。",
      level: "小学基础题"
    },
    {
      id: "cn-16",
      subject: "语文",
      type: "poem-next-line",
      prompt: "“欲穷千里目”的下一句是？",
      options: ["更上一层楼", "处处闻啼鸟", "千里共婵娟", "独钓寒江雪"],
      answer: "更上一层楼",
      explanation: "这两句出自《登鹳雀楼》。",
      level: "小学送分题"
    },
    {
      id: "cn-17",
      subject: "语文",
      type: "idiom-scene",
      prompt: "“雪中送炭”比喻什么？",
      options: ["在别人需要时给予帮助", "冬天送衣服", "天气很冷", "把雪扫干净"],
      answer: "在别人需要时给予帮助",
      explanation: "这个成语比喻在别人急需时给予帮助。",
      level: "小学基础题"
    },
    {
      id: "cn-18",
      subject: "语文",
      type: "literature-story",
      prompt: "《草船借箭》的故事和谁有关？",
      options: ["诸葛亮", "孙悟空", "岳飞", "司马光"],
      answer: "诸葛亮",
      explanation: "草船借箭是和诸葛亮有关的经典故事。",
      level: "小学常识题"
    },
    {
      id: "cn-19",
      subject: "语文",
      type: "emotion-word",
      prompt: "下列哪个词语表示“很高兴”？",
      options: ["开心", "寒冷", "安静", "迟到"],
      answer: "开心",
      explanation: "“开心”表示心情很高兴。",
      level: "小学送分题"
    },
    {
      id: "cn-20",
      subject: "语文",
      type: "punctuation",
      prompt: "在句子结尾表示疑问，通常用什么标点？",
      options: ["句号", "逗号", "问号", "顿号"],
      answer: "问号",
      explanation: "表示疑问时，句末通常用问号。",
      level: "小学基础题"
    }
  ],
  math: [
    {
      id: "ma-1",
      subject: "数学",
      type: "addition-within-100",
      prompt: "18 + 7 等于多少？",
      options: ["23", "24", "25", "26"],
      answer: "25",
      explanation: "18 再加 7，结果是 25。",
      level: "小学送分题"
    },
    {
      id: "ma-2",
      subject: "数学",
      type: "multiplication-basic",
      prompt: "6 × 7 等于多少？",
      options: ["42", "36", "48", "49"],
      answer: "42",
      explanation: "乘法口诀：六七四十二。",
      level: "小学送分题"
    },
    {
      id: "ma-3",
      subject: "数学",
      type: "time-hour-minute",
      prompt: "1 小时等于多少分钟？",
      options: ["30", "60", "90", "100"],
      answer: "60",
      explanation: "1 小时 = 60 分钟。",
      level: "小学送分题"
    },
    {
      id: "ma-4",
      subject: "数学",
      type: "unit-kilometer-meter",
      prompt: "1 千米等于多少米？",
      options: ["100", "500", "1000", "10000"],
      answer: "1000",
      explanation: "1 千米 = 1000 米。",
      level: "小学送分题"
    },
    {
      id: "ma-5",
      subject: "数学",
      type: "shape-square-side",
      prompt: "正方形的四条边长度都怎样？",
      options: ["都相等", "只有两条相等", "都不相等", "不一定"],
      answer: "都相等",
      explanation: "正方形的四条边一样长。",
      level: "小学送分题"
    },
    {
      id: "ma-6",
      subject: "数学",
      type: "area-rectangle",
      prompt: "长方形的面积公式是？",
      options: ["长 + 宽", "长 × 宽", "长 × 2 + 宽 × 2", "长 ÷ 宽"],
      answer: "长 × 宽",
      explanation: "长方形面积 = 长 × 宽。",
      level: "小学基础题"
    },
    {
      id: "ma-7",
      subject: "数学",
      type: "fraction-part",
      prompt: "把一个蛋糕平均分成 4 份，拿走 1 份，是几分之几？",
      options: ["1/2", "1/3", "1/4", "1/5"],
      answer: "1/4",
      explanation: "平均分成 4 份，取 1 份，就是四分之一。",
      level: "小学送分题"
    },
    {
      id: "ma-8",
      subject: "数学",
      type: "equation-addition",
      prompt: "如果 □ + 9 = 15，那么 □ 里应该填几？",
      options: ["4", "5", "6", "7"],
      answer: "6",
      explanation: "15 减去 9，得到 6。",
      level: "小学基础题"
    },
    {
      id: "ma-9",
      subject: "数学",
      type: "money-multiplication",
      prompt: "一本本子 4 元，买 3 本一共多少元？",
      options: ["7", "8", "12", "16"],
      answer: "12",
      explanation: "4 × 3 = 12。",
      level: "小学送分题"
    },
    {
      id: "ma-10",
      subject: "数学",
      type: "word-problem-subtraction",
      prompt: "小明有 12 支铅笔，送给同学 5 支，还剩多少支？",
      options: ["5", "6", "7", "8"],
      answer: "7",
      explanation: "12 - 5 = 7。",
      level: "小学送分题"
    },
    {
      id: "ma-11",
      subject: "数学",
      type: "average-basic",
      prompt: "4、6、8 这三个数的平均数是多少？",
      options: ["5", "6", "7", "8"],
      answer: "6",
      explanation: "先求和 18，再除以 3，结果是 6。",
      level: "小学基础题"
    },
    {
      id: "ma-12",
      subject: "数学",
      type: "compare-largest",
      prompt: "下面哪个数最大？",
      options: ["89", "98", "79", "88"],
      answer: "98",
      explanation: "比较十位数，9 最大，所以 98 最大。",
      level: "小学送分题"
    },
    {
      id: "ma-13",
      subject: "数学",
      type: "shape-square-angle",
      prompt: "一个正方形有几个角？",
      options: ["2 个", "3 个", "4 个", "5 个"],
      answer: "4 个",
      explanation: "正方形有 4 个角。",
      level: "小学送分题"
    },
    {
      id: "ma-14",
      subject: "数学",
      type: "unit-meter-centimeter",
      prompt: "1 米 = 100 厘米，那么 3 米等于多少厘米？",
      options: ["30", "300", "3000", "30000"],
      answer: "300",
      explanation: "3 个 100 厘米就是 300 厘米。",
      level: "小学基础题"
    },
    {
      id: "ma-15",
      subject: "数学",
      type: "clock-grid",
      prompt: "钟面上分针走一大格，表示几分钟？",
      options: ["1 分钟", "5 分钟", "10 分钟", "30 分钟"],
      answer: "5 分钟",
      explanation: "钟面每一大格表示 5 分钟。",
      level: "小学基础题"
    },
    {
      id: "ma-16",
      subject: "数学",
      type: "subtraction-within-100",
      prompt: "45 - 18 等于多少？",
      options: ["27", "26", "28", "29"],
      answer: "27",
      explanation: "45 减去 18，结果是 27。",
      level: "小学基础题"
    },
    {
      id: "ma-17",
      subject: "数学",
      type: "fraction-meaning",
      prompt: "3/4 表示什么？",
      options: ["平均分成 4 份取 3 份", "平均分成 3 份取 4 份", "3 个整体", "4 个整体"],
      answer: "平均分成 4 份取 3 份",
      explanation: "分母 4 表示平均分成 4 份，分子 3 表示取其中 3 份。",
      level: "小学基础题"
    },
    {
      id: "ma-18",
      subject: "数学",
      type: "percentage-half",
      prompt: "50% 更接近下面哪个说法？",
      options: ["一半", "全部", "三分之一", "四分之一"],
      answer: "一半",
      explanation: "50% 就是一半。",
      level: "小学基础题"
    },
    {
      id: "ma-19",
      subject: "数学",
      type: "equation-subtraction",
      prompt: "如果 □ - 8 = 9，那么 □ 是多少？",
      options: ["15", "16", "17", "18"],
      answer: "17",
      explanation: "9 加上 8，得到 17。",
      level: "小学基础题"
    },
    {
      id: "ma-20",
      subject: "数学",
      type: "word-problem-division",
      prompt: "一盒彩笔有 24 支，平均分给 4 个小朋友，每人几支？",
      options: ["4", "5", "6", "8"],
      answer: "6",
      explanation: "24 ÷ 4 = 6。",
      level: "小学送分题"
    }
  ],
  english: [
    {
      id: "en-1",
      subject: "英语",
      type: "word-fruit",
      prompt: "“apple”的中文意思是？",
      options: ["苹果", "香蕉", "橘子", "梨"],
      answer: "苹果",
      explanation: "apple 表示“苹果”。",
      level: "小学送分题"
    },
    {
      id: "en-2",
      subject: "英语",
      type: "polite-expression",
      prompt: "别人帮助了你，你最常说哪一句？",
      options: ["Sorry", "Hello", "Thanks", "Please"],
      answer: "Thanks",
      explanation: "别人帮助你后，常用 Thanks 表示感谢。",
      level: "小学基础题"
    },
    {
      id: "en-3",
      subject: "英语",
      type: "antonym-word",
      prompt: "“big”的反义词是？",
      options: ["small", "long", "tall", "hot"],
      answer: "small",
      explanation: "big 是“大”，small 是“小”，两者意思相反。",
      level: "小学基础题"
    },
    {
      id: "en-4",
      subject: "英语",
      type: "greeting-time",
      prompt: "“Good morning”通常在什么时候说？",
      options: ["早上", "中午", "晚上", "半夜"],
      answer: "早上",
      explanation: "Good morning 表示“早上好”。",
      level: "小学送分题"
    },
    {
      id: "en-5",
      subject: "英语",
      type: "word-nature",
      prompt: "“water”的中文意思是？",
      options: ["水", "火", "土", "风"],
      answer: "水",
      explanation: "water 表示“水”。",
      level: "小学送分题"
    },
    {
      id: "en-6",
      subject: "英语",
      type: "weather-sentence",
      prompt: "Which sentence means “今天很热”？",
      options: ["It is hot today.", "It is cold today.", "It is rainy today.", "It is windy today."],
      answer: "It is hot today.",
      explanation: "It is hot today. 的意思是“今天很热”。",
      level: "小学基础题"
    },
    {
      id: "en-7",
      subject: "英语",
      type: "word-weekday",
      prompt: "一周上学的第一天通常是星期几？",
      options: ["Sunday", "Friday", "Monday", "Saturday"],
      answer: "Monday",
      explanation: "Monday 表示“星期一”。",
      level: "小学基础题"
    },
    {
      id: "en-8",
      subject: "英语",
      type: "dialogue-reply",
      prompt: "别人问你 “How are you?”，更合适的回答是？",
      options: ["Thank you.", "I am fine.", "Good night.", "See you."],
      answer: "I am fine.",
      explanation: "I am fine. 常用来回答“How are you?”。",
      level: "小学基础题"
    },
    {
      id: "en-9",
      subject: "英语",
      type: "word-job",
      prompt: "“teacher”的中文意思是？",
      options: ["老师", "医生", "司机", "警察"],
      answer: "老师",
      explanation: "teacher 表示“老师”。",
      level: "小学送分题"
    },
    {
      id: "en-10",
      subject: "英语",
      type: "classroom-object",
      prompt: "Which one do we use to write on the blackboard?",
      options: ["Chalk", "Desk", "Window", "Schoolbag"],
      answer: "Chalk",
      explanation: "Chalk means “粉笔”，用来在黑板上写字。",
      level: "小学基础题"
    },
    {
      id: "en-11",
      subject: "英语",
      type: "word-school",
      prompt: "“book”的中文意思是？",
      options: ["书", "钢笔", "尺子", "书包"],
      answer: "书",
      explanation: "book 表示“书”。",
      level: "小学送分题"
    },
    {
      id: "en-12",
      subject: "英语",
      type: "word-color-red",
      prompt: "下列哪个单词表示“红色”？",
      options: ["red", "blue", "green", "black"],
      answer: "red",
      explanation: "red 表示“红色”。",
      level: "小学送分题"
    },
    {
      id: "en-13",
      subject: "英语",
      type: "spelling",
      prompt: "Which word is spelled correctly?",
      options: ["aple", "appel", "apple", "aplpe"],
      answer: "apple",
      explanation: "apple 是正确拼写。",
      level: "小学基础题"
    },
    {
      id: "en-14",
      subject: "英语",
      type: "good-night-scene",
      prompt: "“Good night”通常在什么时候说？",
      options: ["睡前", "早读时", "上课前", "升旗时"],
      answer: "睡前",
      explanation: "Good night 常在晚上分别或睡前说。",
      level: "小学基础题"
    },
    {
      id: "en-15",
      subject: "英语",
      type: "word-animal-dog",
      prompt: "“dog”的中文意思是？",
      options: ["狗", "猫", "鸟", "鱼"],
      answer: "狗",
      explanation: "dog 表示“狗”。",
      level: "小学送分题"
    },
    {
      id: "en-16",
      subject: "英语",
      type: "word-animal-cat",
      prompt: "“cat”的中文意思是？",
      options: ["猫", "狗", "兔子", "老虎"],
      answer: "猫",
      explanation: "cat 表示“猫”。",
      level: "小学送分题"
    },
    {
      id: "en-17",
      subject: "英语",
      type: "position-word",
      prompt: "The cat is ___ the box. 猫在盒子里面。",
      options: ["in", "on", "under", "behind"],
      answer: "in",
      explanation: "in 表示“在……里面”。",
      level: "小学基础题"
    },
    {
      id: "en-18",
      subject: "英语",
      type: "farewell-expression",
      prompt: "放学和同学分别时，更常说哪一句？",
      options: ["See you", "Thank you", "Good morning", "Sorry"],
      answer: "See you",
      explanation: "See you 常用于告别时，意思是“再见”。",
      level: "小学基础题"
    },
    {
      id: "en-19",
      subject: "英语",
      type: "word-color-blue",
      prompt: "下列哪个单词表示“蓝色”？",
      options: ["blue", "yellow", "white", "brown"],
      answer: "blue",
      explanation: "blue 表示“蓝色”。",
      level: "小学送分题"
    },
    {
      id: "en-20",
      subject: "英语",
      type: "thanks-scene",
      prompt: "收到礼物后，最常说哪一句？",
      options: ["Thanks", "Good night", "Hello", "Bye"],
      answer: "Thanks",
      explanation: "收到礼物后常说 Thanks 表示感谢。",
      level: "小学基础题"
    }
  ],
  physics: [
    {
      id: "ph-1",
      subject: "物理",
      type: "gravity",
      prompt: "物体下落主要是因为受到什么力的作用？",
      options: ["摩擦力", "弹力", "重力", "浮力"],
      answer: "重力",
      explanation: "物体会向下落，主要是因为受到重力作用。",
      level: "小学送分题"
    },
    {
      id: "ph-2",
      subject: "物理",
      type: "sound-travel",
      prompt: "声音在真空中能传播吗？",
      options: ["能", "不能", "只有高温时能", "只有低温时能"],
      answer: "不能",
      explanation: "声音传播需要介质，真空里不能传播。",
      level: "小学基础题"
    },
    {
      id: "ph-3",
      subject: "物理",
      type: "tool-temperature",
      prompt: "测量温度常用的仪器是？",
      options: ["天平", "温度计", "刻度尺", "量筒"],
      answer: "温度计",
      explanation: "温度计是测量温度的常见工具。",
      level: "小学送分题"
    },
    {
      id: "ph-4",
      subject: "物理",
      type: "light-path",
      prompt: "光在同一种均匀介质中通常沿什么路径传播？",
      options: ["曲线", "折线", "直线", "螺旋线"],
      answer: "直线",
      explanation: "光在同一种均匀介质中通常沿直线传播。",
      level: "小学常识题"
    },
    {
      id: "ph-5",
      subject: "物理",
      type: "light-reflection",
      prompt: "镜子照出人像，属于哪种现象？",
      options: ["光的反射", "光的吸收", "声音传播", "热传导"],
      answer: "光的反射",
      explanation: "镜子成像是典型的光的反射现象。",
      level: "小学基础题"
    },
    {
      id: "ph-6",
      subject: "物理",
      type: "friction-comparison",
      prompt: "通常情况下，接触面越粗糙，摩擦力会怎样？",
      options: ["越小", "越大", "不变", "消失"],
      answer: "越大",
      explanation: "一般来说，接触面越粗糙，摩擦力越大。",
      level: "小学基础题"
    },
    {
      id: "ph-7",
      subject: "物理",
      type: "state-change-melting",
      prompt: "把冰放在室温下，过一段时间通常会怎样？",
      options: ["变成水", "变成铁", "变成木头", "没有变化"],
      answer: "变成水",
      explanation: "冰受热会融化成水。",
      level: "小学送分题"
    },
    {
      id: "ph-8",
      subject: "物理",
      type: "circuit-closed",
      prompt: "电灯发光通常需要什么？",
      options: ["断开的电路", "闭合的电路", "没有电池", "没有导线"],
      answer: "闭合的电路",
      explanation: "电路闭合后，电流才能通过，灯才容易亮。",
      level: "小学基础题"
    },
    {
      id: "ph-9",
      subject: "物理",
      type: "speed-comparison",
      prompt: "同样一分钟内，谁走得更快？",
      options: ["走了 20 米的人", "走了 40 米的人", "走了 10 米的人", "三人一样快"],
      answer: "走了 40 米的人",
      explanation: "同样时间里，路程越多，通常表示速度越快。",
      level: "小学基础题"
    },
    {
      id: "ph-10",
      subject: "物理",
      type: "lever-tool",
      prompt: "下列哪种工具利用了杠杆原理？",
      options: ["剪刀", "电灯", "温度计", "橡皮"],
      answer: "剪刀",
      explanation: "剪刀是生活中常见的杠杆工具。",
      level: "小学常识题"
    },
    {
      id: "ph-11",
      subject: "物理",
      type: "heat-transfer",
      prompt: "用手摸热水杯，会感觉烫，说明热可以怎样传递？",
      options: ["传给手", "消失", "变成光", "变成声音"],
      answer: "传给手",
      explanation: "热会从温度高的物体传向温度低的物体。",
      level: "小学基础题"
    },
    {
      id: "ph-12",
      subject: "物理",
      type: "weight-comparison",
      prompt: "下面哪样东西通常更重？",
      options: ["羽毛", "橡皮", "装满水的瓶子", "纸片"],
      answer: "装满水的瓶子",
      explanation: "装满水的瓶子通常比羽毛、纸片和橡皮更重。",
      level: "小学送分题"
    },
    {
      id: "ph-13",
      subject: "物理",
      type: "light-scene",
      prompt: "把手电筒照向墙面，墙上会出现什么？",
      options: ["影子或光斑", "声音", "气味", "颜色消失"],
      answer: "影子或光斑",
      explanation: "手电筒照墙面会形成明显的光斑。",
      level: "小学基础题"
    },
    {
      id: "ph-14",
      subject: "物理",
      type: "tool-length",
      prompt: "测量物体长度常用什么工具？",
      options: ["刻度尺", "温度计", "秒表", "天平"],
      answer: "刻度尺",
      explanation: "刻度尺是测量长度的常用工具。",
      level: "小学送分题"
    },
    {
      id: "ph-15",
      subject: "物理",
      type: "speed-distance",
      prompt: "同样走 10 秒，谁更快？",
      options: ["走 10 米的人", "走 20 米的人", "走 5 米的人", "三人一样快"],
      answer: "走 20 米的人",
      explanation: "时间相同时，路程越多，表示速度越快。",
      level: "小学基础题"
    },
    {
      id: "ph-16",
      subject: "物理",
      type: "evaporation",
      prompt: "太阳下晒衣服，衣服会慢慢变干，主要和什么有关？",
      options: ["蒸发", "结冰", "生锈", "发光"],
      answer: "蒸发",
      explanation: "衣服上的水会慢慢蒸发，所以衣服会变干。",
      level: "小学基础题"
    },
    {
      id: "ph-17",
      subject: "物理",
      type: "conductivity",
      prompt: "下面哪种材料通常更容易导电？",
      options: ["铁", "木头", "橡胶", "塑料"],
      answer: "铁",
      explanation: "金属通常比木头、橡胶和塑料更容易导电。",
      level: "小学常识题"
    },
    {
      id: "ph-18",
      subject: "物理",
      type: "tool-time",
      prompt: "想知道一段时间有多长，常用什么工具？",
      options: ["秒表", "刻度尺", "烧杯", "显微镜"],
      answer: "秒表",
      explanation: "秒表是测量时间长短的常见工具。",
      level: "小学常识题"
    },
    {
      id: "ph-19",
      subject: "物理",
      type: "buoyancy-scene",
      prompt: "把乒乓球按进水里，一松手它容易浮上来，这和什么有关？",
      options: ["浮力", "重力消失", "没有空气", "温度降低"],
      answer: "浮力",
      explanation: "乒乓球会受到水的浮力，所以容易浮起来。",
      level: "小学基础题"
    },
    {
      id: "ph-20",
      subject: "物理",
      type: "battery-direction",
      prompt: "电池装反了，玩具车可能为什么不动？",
      options: ["电路不能正常工作", "轮子变大了", "空气太少", "颜色变了"],
      answer: "电路不能正常工作",
      explanation: "电池方向不对时，电路可能不能正常工作。",
      level: "小学基础题"
    }
  ],
  chemistry: [
    {
      id: "ch-1",
      subject: "化学",
      type: "formula-water",
      prompt: "水的化学式是？",
      options: ["CO2", "O2", "H2O", "NaCl"],
      answer: "H2O",
      explanation: "水的化学式是 H2O。",
      level: "小学常识题"
    },
    {
      id: "ch-2",
      subject: "化学",
      type: "chemical-change",
      prompt: "下列哪种现象通常属于化学变化？",
      options: ["冰融化", "纸张燃烧", "水蒸发", "玻璃破碎"],
      answer: "纸张燃烧",
      explanation: "燃烧会生成新物质，属于化学变化。",
      level: "小学基础题"
    },
    {
      id: "ch-3",
      subject: "化学",
      type: "air-component",
      prompt: "空气中含量最多的气体是？",
      options: ["氧气", "氮气", "二氧化碳", "氢气"],
      answer: "氮气",
      explanation: "空气中含量最多的是氮气。",
      level: "小学常识题"
    },
    {
      id: "ch-4",
      subject: "化学",
      type: "formula-oxygen",
      prompt: "氧气的化学式是？",
      options: ["O", "O2", "O3", "O4"],
      answer: "O2",
      explanation: "常见氧气由氧分子组成，写作 O2。",
      level: "小学常识题"
    },
    {
      id: "ch-5",
      subject: "化学",
      type: "formula-salt",
      prompt: "日常生活中说的“食盐”主要成分是？",
      options: ["NaCl", "H2O", "CO2", "CaCO3"],
      answer: "NaCl",
      explanation: "食盐的主要成分是氯化钠。",
      level: "小学常识题"
    },
    {
      id: "ch-6",
      subject: "化学",
      type: "combustion-condition",
      prompt: "物质燃烧通常离不开哪种气体？",
      options: ["氮气", "氧气", "氦气", "氢气"],
      answer: "氧气",
      explanation: "一般燃烧需要氧气参与。",
      level: "小学送分题"
    },
    {
      id: "ch-7",
      subject: "化学",
      type: "rust-product",
      prompt: "铁生锈后主要生成哪类物质？",
      options: ["氧化物", "木头", "塑料", "玻璃"],
      answer: "氧化物",
      explanation: "铁生锈后会生成铁的氧化物。",
      level: "小学基础题"
    },
    {
      id: "ch-8",
      subject: "化学",
      type: "indicator-tool",
      prompt: "下列哪个常用来检验酸碱性变化？",
      options: ["酚酞", "铁丝", "木炭", "砂纸"],
      answer: "酚酞",
      explanation: "酚酞是常见的酸碱指示剂。",
      level: "小学常识题"
    },
    {
      id: "ch-9",
      subject: "化学",
      type: "physical-change",
      prompt: "下列哪种变化通常属于物理变化？",
      options: ["木头燃烧", "铁生锈", "水结冰", "食物腐败"],
      answer: "水结冰",
      explanation: "水结冰没有生成新物质，属于物理变化。",
      level: "小学基础题"
    },
    {
      id: "ch-10",
      subject: "化学",
      type: "cleaning-scene",
      prompt: "洗洁精去油污时，主要利用了它的什么作用？",
      options: ["助燃", "乳化", "凝固", "氧化"],
      answer: "乳化",
      explanation: "洗洁精能把油污分散开，主要利用乳化作用。",
      level: "小学基础题"
    },
    {
      id: "ch-11",
      subject: "化学",
      type: "material-liquid",
      prompt: "下列哪种物质通常是液体？",
      options: ["石头", "空气", "水", "铁钉"],
      answer: "水",
      explanation: "常温下，水通常是液体。",
      level: "小学送分题"
    },
    {
      id: "ch-12",
      subject: "化学",
      type: "dissolution",
      prompt: "白糖放进水里慢慢看不见了，这种现象通常叫？",
      options: ["燃烧", "溶解", "生锈", "凝固"],
      answer: "溶解",
      explanation: "白糖分散到水中，这种现象叫溶解。",
      level: "小学基础题"
    },
    {
      id: "ch-13",
      subject: "化学",
      type: "metal-material",
      prompt: "下列哪种东西更像金属？",
      options: ["铁钉", "木块", "塑料尺", "纸张"],
      answer: "铁钉",
      explanation: "铁钉是常见金属制品。",
      level: "小学送分题"
    },
    {
      id: "ch-14",
      subject: "化学",
      type: "food-change",
      prompt: "厨房里切开的苹果放久了颜色变深，这属于什么变化？",
      options: ["发生了变化", "完全没变", "变成金属", "变成气体"],
      answer: "发生了变化",
      explanation: "苹果放久后颜色变化，说明物质状态发生了变化。",
      level: "小学基础题"
    },
    {
      id: "ch-15",
      subject: "化学",
      type: "lab-container",
      prompt: "做简单化学小实验时，盛放少量液体常用什么？",
      options: ["烧杯", "足球", "书包", "剪刀"],
      answer: "烧杯",
      explanation: "烧杯是实验里常见的容器。",
      level: "小学常识题"
    },
    {
      id: "ch-16",
      subject: "化学",
      type: "material-gas",
      prompt: "下列哪种物质通常是气体？",
      options: ["空气", "石头", "牛奶", "木头"],
      answer: "空气",
      explanation: "空气通常属于气体。",
      level: "小学送分题"
    },
    {
      id: "ch-17",
      subject: "化学",
      type: "boiling-phenomenon",
      prompt: "水烧开后会看到什么现象？",
      options: ["冒出水蒸气", "变成石头", "变成铁", "颜色一定变黑"],
      answer: "冒出水蒸气",
      explanation: "水烧开后常会看到水蒸气。",
      level: "小学基础题"
    },
    {
      id: "ch-18",
      subject: "化学",
      type: "nonmetal-material",
      prompt: "下列哪种东西更像非金属？",
      options: ["木炭", "铁钉", "铜丝", "铝锅"],
      answer: "木炭",
      explanation: "木炭更接近非金属材料。",
      level: "小学常识题"
    },
    {
      id: "ch-19",
      subject: "化学",
      type: "rust-scene",
      prompt: "铁钉放久了容易生锈，和空气中的什么更有关系？",
      options: ["氧气和水分", "月光", "沙子", "纸张"],
      answer: "氧气和水分",
      explanation: "铁生锈通常和氧气、水分有关。",
      level: "小学基础题"
    },
    {
      id: "ch-20",
      subject: "化学",
      type: "observation-tool",
      prompt: "观察细小实验现象时，下面哪种工具更合适？",
      options: ["放大镜", "足球", "书包", "水壶"],
      answer: "放大镜",
      explanation: "放大镜可以帮助观察细小物体或现象。",
      level: "小学常识题"
    }
  ]
};
const QUESTIONS_BY_SUBJECT = Object.fromEntries(
  Object.keys(BASE_QUESTIONS_BY_SUBJECT).map((subjectKey) => [
    subjectKey,
    [
      ...BASE_QUESTIONS_BY_SUBJECT[subjectKey],
      ...GENERATED_QUESTIONS_BY_SUBJECT[subjectKey] || []
    ]
  ])
);
const ROUND_SIZE = 10;
const THEMES = ["glass", "kawaii", "anime"];
const REVIEW_LIST_THEME_CONFIG = {
  glass: { cardMinHeight: 156, gap: 14, maxVisibleCards: 3 },
  kawaii: { cardMinHeight: 164, gap: 14, maxVisibleCards: 3 },
  anime: { cardMinHeight: 172, gap: 14, maxVisibleCards: 2 }
};
const ANIME_RESULT_PC_LEFT_IMAGE = "/PCanime-result-left.png";
const ANIME_RESULT_PC_RIGHT_IMAGE = "/PCanime-result-right.png";
const ANIME_RESULT_APP_LEFT_IMAGE = "/Appanime-result-left.png";
const ANIME_RESULT_APP_RIGHT_IMAGE = "/Appanime-result-right.png";
const ANIME_APP_BREAKPOINT = 768;
const BACKGROUND_MUSIC_SRC = "/quiz-bgm.flac";
const SHAME_LIST_STORAGE_KEY = "dxwm-shame-list-v3";
const ANSWERED_QUESTION_STORAGE_KEY = "dxwm-answered-questions-v3";
const DIFFICULTIES = [
  { key: "primary", label: "小学", matchText: "小学" },
  { key: "middle", label: "初中", matchText: "初中" },
  { key: "high", label: "高中", matchText: "高中" },
  { key: "college", label: "大学", matchText: "大学" }
];
const THEME_COPY = {
  glass: {
    switchLabel: "玻璃拟态",
    homeTitle: "大学文凭能有多文盲",
    homeSubtitle: "别划走，试试这些“基础题”...",
    homeFootnote: "",
    resultAction: "再洗白一次"
  },
  kawaii: {
    switchLabel: "Kawaii",
    homeTitle: "文盲大挑战!",
    homeSubtitle: "~ (っ °Д °;)っ 你还能毕业吗 ~",
    homeFootnote: "由 超可爱研究所 荣誉出品",
    resultAction: "重新挑战 (・ω・)"
  },
  anime: {
    switchLabel: "二次元",
    homeTitle: "文盲程度检测.exe",
    homeSubtitle: "赌上大学生的尊严！",
    homeFootnote: "ACG 学园特别版",
    resultAction: "再来一次"
  }
};
const SUBJECT_THEME_META = {
  glass: {
    chinese: { icon: "🏮", accent: "#6366f1", short: "语文" },
    math: { icon: "📐", accent: "#f59e0b", short: "数学" },
    english: { icon: "🌍", accent: "#10b981", short: "英语" },
    physics: { icon: "⚙️", accent: "#ec4899", short: "物理" },
    chemistry: { icon: "🧪", accent: "#8b5cf6", short: "化学" }
  },
  kawaii: {
    chinese: { icon: "📖", accent: "#ffb7c5", short: "国语文字" },
    math: { icon: "📐", accent: "#a0e7ff", short: "奇妙算术" },
    english: { icon: "🔤", accent: "#bbf7d0", short: "ABC挑战" },
    physics: { icon: "🪐", accent: "#ffe599", short: "物理魔法" },
    chemistry: { icon: "🧪", accent: "#e2c0ff", short: "神奇化学" }
  },
  anime: {
    chinese: { icon: "🖋️", accent: "#7dd3fc", short: "语文" },
    math: { icon: "🔢", accent: "#fbbf24", short: "数学" },
    english: { icon: "🗣️", accent: "#4ade80", short: "英语" },
    physics: { icon: "⚡", accent: "#f472b6", short: "物理" },
    chemistry: { icon: "🧪", accent: "#a78bfa", short: "化学" }
  }
};
const SHARE_THEME_PALETTES = {
  glass: {
    background: ["#eef8ff", "#fff6df", "#ffeef3"],
    card: "#ffffff",
    frame: "#dbeafe",
    accent: "#1f9fff",
    text: "#17324d",
    muted: "#5f738a"
  },
  kawaii: {
    background: ["#fff1f5", "#fff7d6", "#e0f2fe"],
    card: "#fffdfd",
    frame: "#ffb7c5",
    accent: "#ff7d9b",
    text: "#5d4a66",
    muted: "#8c7b93"
  },
  anime: {
    background: ["#fefce8", "#e0f2fe", "#fce7f3"],
    card: "#fffef7",
    frame: "#1e293b",
    accent: "#fde047",
    text: "#1e293b",
    muted: "#64748b"
  }
};
function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}
function matchesDifficulty(question, difficultyKey) {
  const target = DIFFICULTIES.find((item) => item.key === difficultyKey);
  if (!target) return true;
  return String(question.level || "").includes(target.matchText);
}
function getDifficultyCountSummary(items) {
  return DIFFICULTIES.map((difficulty) => {
    const count = items.filter((item) => matchesDifficulty(item, difficulty.key)).length;
    return `${difficulty.label}${count}`;
  }).join(" / ");
}
function inferQuestionType(question) {
  if (question.type) return question.type;
  const prompt = String(question.prompt || "");
  const subject = String(question.subject || "");
  if (prompt.includes("下一句") || prompt.includes("上一句") || prompt.includes("出自哪首诗")) {
    return "poem";
  }
  if (prompt.includes("作者是") || prompt.includes("哪个朝代") || prompt.includes("哪部") || prompt.includes("与谁有关")) {
    return "literature";
  }
  if (prompt.includes("意思") || prompt.includes("成语") || prompt.includes("词语") || prompt.includes("修辞")) {
    return "language";
  }
  if (prompt.includes("等于多少") || prompt.includes("等于？") || prompt.includes("面积") || prompt.includes("周长")) {
    return "calculation";
  }
  if (prompt.includes("公式") || prompt.includes("单位") || prompt.includes("化学式") || prompt.includes("符号")) {
    return "formula";
  }
  if (prompt.includes("反义词") || prompt.includes("中文意思") || prompt.includes("英文") || prompt.includes("应填")) {
    return "vocabulary";
  }
  if (prompt.includes("现象") || prompt.includes("变化") || prompt.includes("作用") || prompt.includes("因为")) {
    return "phenomenon";
  }
  if (subject.includes("数学")) return "math-concept";
  if (subject.includes("英语")) return "english-basic";
  if (subject.includes("物理") || subject.includes("化学")) return "science-basic";
  if (subject.includes("语文")) return "chinese-basic";
  return "general";
}
function pickDiversifiedRound(items) {
  const grouped = items.reduce((result, item) => {
    const type = inferQuestionType(item);
    if (!result[type]) {
      result[type] = [];
    }
    result[type].push(item);
    return result;
  }, {});
  const orderedTypes = shuffle(Object.keys(grouped));
  const round = [];
  while (round.length < ROUND_SIZE && orderedTypes.some((type) => grouped[type].length > 0)) {
    orderedTypes.forEach((type) => {
      if (round.length >= ROUND_SIZE || grouped[type].length === 0) return;
      round.push(grouped[type].shift());
    });
  }
  return round;
}
function getAvailableQuestions(subjectKey, difficultyKey, answeredQuestionIds, isDev) {
  return QUESTIONS_BY_SUBJECT[subjectKey].filter((item) => {
    if (!matchesDifficulty(item, difficultyKey)) return false;
    return !answeredQuestionIds.includes(item.id);
  });
}
function buildRound(subjectKey, difficultyKey, answeredQuestionIds, isDev) {
  const availableQuestions = shuffle(getAvailableQuestions(subjectKey, difficultyKey, answeredQuestionIds));
  const roundQuestions = pickDiversifiedRound(availableQuestions);
  return roundQuestions.map((question) => ({
    ...question,
    options: shuffle(question.options)
  }));
}
function loadShameList() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SHAME_LIST_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function saveShameList(items) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SHAME_LIST_STORAGE_KEY, JSON.stringify(items));
}
function loadAnsweredQuestionIds() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ANSWERED_QUESTION_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function saveAnsweredQuestionIds(items) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ANSWERED_QUESTION_STORAGE_KEY, JSON.stringify(items));
}
function getJudgement(score, total, theme) {
  const ratio = score / total;
  if (theme === "anime") {
    if (ratio === 1) return "斯国一！";
    if (ratio >= 0.6) return "及格哒哟！";
    return "雅蠛蝶！";
  }
  if (theme === "kawaii") {
    if (ratio === 1) return "完美天才！";
    if (ratio >= 0.6) return "勉强及格 ~";
    return "真·小文盲";
  }
  if (ratio === 1) return "文凭保住了";
  if (ratio >= 0.6) return "勉强算识字";
  return "纯纯真文盲";
}
function getResultCopy(score, total, theme) {
  const ratio = score / total;
  if (theme === "anime") {
    if (ratio === 1) return "你居然真的拥有大学生的智慧？不可思议！";
    if (ratio >= 0.6) return "虽然有点摇晃，但还是勉强守住了尊严。";
    return "这种水平...你的毕业证是火车站买的吗？";
  }
  if (theme === "kawaii") {
    if (ratio === 1) return "呜哇！你一定是吃聪明豆长大的吧！(★ ω ★)";
    if (ratio >= 0.6) return `答对 ${score} 题，虽然笨笨的，但还是通过了呢。`;
    return `只答对 ${score} 题，没关系，可爱暂时替你顶一下。`;
  }
  if (ratio === 1) return "满分！你确实读过书。";
  if (ratio >= 0.6) return `答对 ${score} 道题。大学没白读，但不多。`;
  return `只对了 ${score} 道题。建议回小学深造。`;
}
function getResultEmoji(score, total, theme) {
  const ratio = score / total;
  if (theme === "anime") {
    if (ratio === 1) return "👑";
    if (ratio >= 0.6) return "✨";
    return "😱";
  }
  if (theme === "kawaii") {
    if (ratio === 1) return "✨";
    if (ratio >= 0.6) return "🍮";
    return "🍼";
  }
  if (ratio === 1) return "🎓";
  if (ratio >= 0.6) return "🤔";
  return "🤡";
}
function getAnimeResultScene(score, total) {
  const ratio = score / total;
  if (ratio === 1) {
    return {
      badge: "满分通关",
      bubbles: ["这次是真的学霸！", "全都会诶？", "居然一题没丢！", "再来一次也不怕吧！"]
    };
  }
  if (ratio >= 0.6) {
    return {
      badge: "勉强过线",
      bubbles: ["还算撑住了！", "差一点就翻车…", "至少不像完全不会", "要不要再刷一次？"]
    };
  }
  return {
    badge: "急需补课",
    bubbles: ["这都能错这么多？", "分数有点危险了…", "只有这点分…", "再试一次吧！"]
  };
}
function getReviewListStyle(theme, count) {
  const config = REVIEW_LIST_THEME_CONFIG[theme] || REVIEW_LIST_THEME_CONFIG.glass;
  const visibleCount = Math.min(Math.max(count, 1), config.maxVisibleCards);
  const maxHeight = visibleCount * config.cardMinHeight + Math.max(visibleCount - 1, 0) * config.gap;
  return {
    "--review-card-min-height": `${config.cardMinHeight}px`,
    "--review-list-gap": `${config.gap}px`,
    "--review-list-max-height": `${maxHeight}px`
  };
}
function buildShareUrl() {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${window.location.pathname}`;
}
function buildResultShareText({ title, subjectName, difficultyLabel, score, total, accuracy, judgement, description, url }) {
  const subjectLine = difficultyLabel ? `${subjectName} · ${difficultyLabel}` : subjectName;
  return [
    `我在《${title}》里测了 ${subjectLine}`,
    `得分 ${score}/${total}，正确率 ${accuracy}%`,
    judgement,
    description,
    url
  ].join("\n");
}
function wrapCanvasText(context, text, maxWidth) {
  const lines = [];
  let currentLine = "";
  for (const char of text) {
    const nextLine = `${currentLine}${char}`;
    if (context.measureText(nextLine).width <= maxWidth || !currentLine) {
      currentLine = nextLine;
      continue;
    }
    lines.push(currentLine);
    currentLine = char;
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}
function drawRoundedRect(context, x2, y2, width, height, radius) {
  const actualRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x2 + actualRadius, y2);
  context.lineTo(x2 + width - actualRadius, y2);
  context.quadraticCurveTo(x2 + width, y2, x2 + width, y2 + actualRadius);
  context.lineTo(x2 + width, y2 + height - actualRadius);
  context.quadraticCurveTo(x2 + width, y2 + height, x2 + width - actualRadius, y2 + height);
  context.lineTo(x2 + actualRadius, y2 + height);
  context.quadraticCurveTo(x2, y2 + height, x2, y2 + height - actualRadius);
  context.lineTo(x2, y2 + actualRadius);
  context.quadraticCurveTo(x2, y2, x2 + actualRadius, y2);
  context.closePath();
}
function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }
      reject(new Error("Canvas export failed"));
    }, "image/png");
  });
}
async function createResultShareImage({
  theme,
  title,
  subjectName,
  difficultyLabel,
  score,
  total,
  accuracy,
  judgement,
  description,
  emoji
}) {
  const palette = SHARE_THEME_PALETTES[theme] || SHARE_THEME_PALETTES.glass;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 1080;
  canvas.height = 1350;
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, palette.background[0]);
  gradient.addColorStop(0.5, palette.background[1]);
  gradient.addColorStop(1, palette.background[2]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawRoundedRect(context, 76, 88, 928, 1174, theme === "anime" ? 24 : 52);
  context.fillStyle = palette.card;
  context.fill();
  context.lineWidth = theme === "anime" ? 8 : 4;
  context.strokeStyle = palette.frame;
  context.stroke();
  context.fillStyle = palette.accent;
  drawRoundedRect(context, 130, 138, 220, 64, 999);
  context.fill();
  context.fillStyle = theme === "anime" ? "#1e293b" : "#ffffff";
  context.font = "700 30px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("答题结果", 240, 170);
  context.textAlign = "left";
  context.fillStyle = palette.text;
  context.font = "800 64px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  context.fillText(title, 130, 290);
  context.font = "600 34px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  context.fillStyle = palette.muted;
  context.fillText(difficultyLabel ? `${subjectName} · ${difficultyLabel}` : subjectName, 130, 350);
  context.font = "700 152px 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif";
  context.fillText(emoji, 130, 550);
  context.fillStyle = palette.text;
  context.font = "900 74px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  context.fillText(`${score}/${total}`, 340, 520);
  context.font = "600 32px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  context.fillStyle = palette.muted;
  context.fillText(`正确率 ${accuracy}%`, 346, 572);
  drawRoundedRect(context, 130, 640, 820, 124, theme === "anime" ? 24 : 36);
  context.fillStyle = `${palette.accent}22`;
  context.fill();
  context.fillStyle = palette.text;
  context.font = "800 48px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  context.fillText(judgement, 162, 712);
  context.font = "500 34px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  context.fillStyle = palette.text;
  const descriptionLines = wrapCanvasText(context, description, 756).slice(0, 4);
  descriptionLines.forEach((line, index) => {
    context.fillText(line, 130, 860 + index * 56);
  });
  context.fillStyle = palette.muted;
  context.font = "500 28px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  context.fillText("来自《大学文凭能有多文盲》", 130, 1160);
  return canvasToBlob(canvas);
}
function ThemeBackdrop({ theme }) {
  if (theme === "anime") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "theme-backdrop anime-backdrop", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "decor-star star-a", children: "✦" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "decor-star star-b", children: "✧" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "decor-star star-c", children: "✦" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "char-box", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "45", fill: "#fbcfe8", stroke: "#1e293b", strokeWidth: "3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "35", cy: "40", r: "5", fill: "#1e293b" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "65", cy: "40", r: "5", fill: "#1e293b" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 30 70 Q 50 85 70 70", stroke: "#1e293b", strokeWidth: "3", fill: "none" })
      ] }) })
    ] });
  }
  if (theme === "kawaii") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "theme-backdrop kawaii-backdrop", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "floating-item item-a", children: "☁️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "floating-item item-b", children: "⭐️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "floating-item item-c", children: "💖" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "floating-item item-d", children: "🍬" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "theme-backdrop glass-backdrop", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blob blob-a" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blob blob-b" })
  ] });
}
function App() {
  const [phase, setPhase] = reactExports.useState("home");
  const [selectedSubject, setSelectedSubject] = reactExports.useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = reactExports.useState(null);
  const [questions, setQuestions] = reactExports.useState([]);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [selectedOption, setSelectedOption] = reactExports.useState(null);
  const [locked, setLocked] = reactExports.useState(false);
  const [score, setScore] = reactExports.useState(0);
  const [shameList, setShameList] = reactExports.useState(() => loadShameList());
  const [currentRoundMistakes, setCurrentRoundMistakes] = reactExports.useState([]);
  const [answeredQuestionIds, setAnsweredQuestionIds] = reactExports.useState(() => loadAnsweredQuestionIds());
  const [musicEnabled, setMusicEnabled] = reactExports.useState(true);
  const [shareMenuOpen, setShareMenuOpen] = reactExports.useState(false);
  const [shareStatus, setShareStatus] = reactExports.useState("");
  const [isMobileViewport, setIsMobileViewport] = reactExports.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${ANIME_APP_BREAKPOINT}px)`).matches;
  });
  const [theme, setTheme] = reactExports.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dxwm-theme-v3") || "anime";
    }
    return "anime";
  });
  const audioRef = reactExports.useRef(null);
  const copy = THEME_COPY[theme];
  const currentQuestion = questions[currentIndex];
  const currentSubject = SUBJECTS.find((item) => item.key === selectedSubject);
  const currentDifficulty = DIFFICULTIES.find((item) => item.key === selectedDifficulty);
  const currentSubjectThemeMeta = selectedSubject ? SUBJECT_THEME_META[theme][selectedSubject] : null;
  const progress = questions.length ? (currentIndex + 1) / questions.length * 100 : 0;
  const availableQuestionCountBySubject = reactExports.useMemo(
    () => SUBJECTS.reduce((result, subject) => {
      result[subject.key] = getAvailableQuestions(subject.key, null, answeredQuestionIds).length;
      return result;
    }, {}),
    [answeredQuestionIds]
  );
  const availableQuestionCountByDifficulty = reactExports.useMemo(() => {
    if (!selectedSubject) return {};
    return DIFFICULTIES.reduce((result, difficulty) => {
      result[difficulty.key] = getAvailableQuestions(selectedSubject, difficulty.key, answeredQuestionIds).length;
      return result;
    }, {});
  }, [answeredQuestionIds, selectedSubject]);
  const totalQuestionCountBySubject = reactExports.useMemo(
    () => SUBJECTS.reduce((result, subject) => {
      var _a;
      result[subject.key] = ((_a = QUESTIONS_BY_SUBJECT[subject.key]) == null ? void 0 : _a.length) ?? 0;
      return result;
    }, {}),
    []
  );
  const difficultySummaryBySubject = reactExports.useMemo(
    () => SUBJECTS.reduce((result, subject) => {
      result[subject.key] = getDifficultyCountSummary(QUESTIONS_BY_SUBJECT[subject.key] || []);
      return result;
    }, {}),
    []
  );
  selectedSubject ? totalQuestionCountBySubject[selectedSubject] ?? 0 : 0;
  selectedSubject ? difficultySummaryBySubject[selectedSubject] ?? "" : "";
  const globalQuestionCount = reactExports.useMemo(
    () => Object.values(totalQuestionCountBySubject).reduce((sum, count) => sum + count, 0),
    [totalQuestionCountBySubject]
  );
  reactExports.useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("dxwm-theme-v3", theme);
  }, [theme]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return void 0;
    const mediaQuery = window.matchMedia(`(max-width: ${ANIME_APP_BREAKPOINT}px)`);
    const handleChange = (event) => {
      setIsMobileViewport(event.matches);
    };
    setIsMobileViewport(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);
  reactExports.useEffect(() => {
    if (!locked) return;
    const timer = window.setTimeout(() => {
      if (currentIndex >= questions.length - 1) {
        setPhase("result");
        return;
      }
      setCurrentIndex((index) => index + 1);
      setSelectedOption(null);
      setLocked(false);
    }, 100);
    return () => window.clearTimeout(timer);
  }, [currentIndex, locked, questions.length]);
  const summary = reactExports.useMemo(() => {
    if (phase !== "result" || !questions.length) return null;
    return {
      total: questions.length,
      accuracy: Math.round(score / questions.length * 100),
      judgement: getJudgement(score, questions.length, theme),
      description: getResultCopy(score, questions.length, theme),
      emoji: getResultEmoji(score, questions.length, theme)
    };
  }, [phase, questions.length, score, theme]);
  const currentDifficultyRemainingCount = selectedDifficulty ? availableQuestionCountByDifficulty[selectedDifficulty] ?? 0 : 0;
  const currentRoundMistakeCount = currentRoundMistakes.length;
  const homeStats = reactExports.useMemo(() => {
    const wrongCount = shameList.length;
    const totalAnswered = answeredQuestionIds.length;
    const correctCount = Math.max(totalAnswered - wrongCount, 0);
    const accuracy = totalAnswered ? Math.round(correctCount / totalAnswered * 100) : 0;
    return {
      correctCount,
      wrongCount,
      accuracy
    };
  }, [answeredQuestionIds.length, shameList.length]);
  const animeScene = phase === "result" && summary ? getAnimeResultScene(score, summary.total) : null;
  const reviewListStyle = reactExports.useMemo(
    () => getReviewListStyle(theme, currentRoundMistakeCount),
    [theme, currentRoundMistakeCount]
  );
  const animeResultImages = isMobileViewport ? {
    left: ANIME_RESULT_APP_LEFT_IMAGE,
    right: ANIME_RESULT_APP_RIGHT_IMAGE
  } : {
    left: ANIME_RESULT_PC_LEFT_IMAGE,
    right: ANIME_RESULT_PC_RIGHT_IMAGE
  };
  const resultSharePayload = reactExports.useMemo(() => {
    if (phase !== "result" || !summary || !currentSubject) return null;
    return {
      title: copy.homeTitle,
      subjectName: currentSubject.name,
      difficultyLabel: (currentDifficulty == null ? void 0 : currentDifficulty.label) || "",
      score,
      total: summary.total,
      accuracy: summary.accuracy,
      judgement: summary.judgement,
      description: summary.description,
      emoji: summary.emoji,
      theme,
      url: buildShareUrl()
    };
  }, [copy.homeTitle, currentDifficulty == null ? void 0 : currentDifficulty.label, currentSubject, phase, score, summary, theme]);
  reactExports.useEffect(() => {
    setShareMenuOpen(false);
    setShareStatus("");
  }, [phase]);
  reactExports.useEffect(() => {
    if (!shareStatus) return void 0;
    const timer = window.setTimeout(() => {
      setShareStatus("");
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [shareStatus]);
  const stopBackgroundMusic = async () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };
  const startBackgroundMusic = async () => {
    if (typeof window === "undefined") return;
    if (!audioRef.current) {
      audioRef.current = new Audio(BACKGROUND_MUSIC_SRC);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }
    audioRef.current.currentTime = 0;
    await audioRef.current.play();
  };
  reactExports.useEffect(() => {
    if (!musicEnabled) {
      stopBackgroundMusic();
      return void 0;
    }
    let cancelled = false;
    let detachRetryListener = null;
    const tryPlay = async () => {
      try {
        await startBackgroundMusic();
      } catch {
        if (cancelled || typeof window === "undefined") return;
        const retry = async () => {
          window.removeEventListener("pointerdown", retry);
          window.removeEventListener("keydown", retry);
          try {
            await startBackgroundMusic();
          } catch {
            setMusicEnabled(false);
          }
        };
        detachRetryListener = () => {
          window.removeEventListener("pointerdown", retry);
          window.removeEventListener("keydown", retry);
        };
        window.addEventListener("pointerdown", retry, { once: true });
        window.addEventListener("keydown", retry, { once: true });
      }
    };
    tryPlay();
    return () => {
      cancelled = true;
      detachRetryListener == null ? void 0 : detachRetryListener();
    };
  }, [musicEnabled]);
  reactExports.useEffect(() => () => {
    stopBackgroundMusic();
  }, []);
  const chooseSubject = (subjectKey) => {
    setSelectedSubject(subjectKey);
    setSelectedDifficulty(null);
    setPhase("difficulty");
  };
  const startRound = (subjectKey, difficultyKey) => {
    const roundQuestions = buildRound(subjectKey, difficultyKey, answeredQuestionIds);
    if (!roundQuestions.length) {
      return;
    }
    setSelectedSubject(subjectKey);
    setSelectedDifficulty(difficultyKey);
    setQuestions(roundQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setLocked(false);
    setScore(0);
    setCurrentRoundMistakes([]);
    setPhase("playing");
  };
  const handleSelect = (option) => {
    if (locked || !currentQuestion) return;
    const isCorrect = option === currentQuestion.answer;
    setSelectedOption(option);
    setLocked(true);
    setAnsweredQuestionIds((current) => {
      if (current.includes(currentQuestion.id)) {
        return current;
      }
      const next = [...current, currentQuestion.id];
      saveAnsweredQuestionIds(next);
      return next;
    });
    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
    } else {
      setCurrentRoundMistakes((current) => [
        ...current,
        {
          id: currentQuestion.id,
          prompt: currentQuestion.prompt,
          selected: option,
          answer: currentQuestion.answer,
          explanation: currentQuestion.explanation
        }
      ]);
      setShameList((current) => {
        if (current.some((item) => item.id === currentQuestion.id)) {
          return current;
        }
        const next = [
          ...current,
          {
            id: currentQuestion.id,
            prompt: currentQuestion.prompt,
            selected: option,
            answer: currentQuestion.answer,
            explanation: currentQuestion.explanation,
            subject: currentQuestion.subject,
            subjectKey: selectedSubject
          }
        ];
        saveShameList(next);
        return next;
      });
    }
  };
  const backToHome = () => {
    setPhase("home");
    setSelectedSubject(null);
    setSelectedDifficulty(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setLocked(false);
    setScore(0);
    setCurrentRoundMistakes([]);
  };
  const toggleMusic = async () => {
    if (musicEnabled) {
      setMusicEnabled(false);
      return;
    }
    setMusicEnabled(true);
  };
  const copyShareText = async (value, successMessage) => {
    var _a;
    if (typeof navigator === "undefined" || !((_a = navigator.clipboard) == null ? void 0 : _a.writeText)) {
      setShareStatus("当前环境不支持剪贴板");
      return;
    }
    await navigator.clipboard.writeText(value);
    setShareStatus(successMessage);
  };
  const handleShareLink = async () => {
    if (!resultSharePayload) return;
    try {
      await copyShareText(resultSharePayload.url, "链接已复制");
    } catch {
      setShareStatus("复制链接失败");
    }
  };
  const handleShareCard = async () => {
    if (!resultSharePayload) return;
    try {
      const shareText = buildResultShareText(resultSharePayload);
      await copyShareText(shareText, "卡片文案已复制");
    } catch {
      setShareStatus("复制卡片失败");
    }
  };
  const handleShareImage = async () => {
    var _a;
    if (!resultSharePayload || typeof window === "undefined") return;
    try {
      const blob = await createResultShareImage(resultSharePayload);
      const file = new File([blob], "dxwm-result.png", { type: "image/png" });
      if (((_a = navigator.canShare) == null ? void 0 : _a.call(navigator, { files: [file] })) && navigator.share) {
        await navigator.share({
          title: resultSharePayload.title,
          text: `${resultSharePayload.judgement} · ${resultSharePayload.score}/${resultSharePayload.total}`,
          files: [file]
        });
        setShareStatus("已调起图片分享");
        return;
      }
      const objectUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = "dxwm-result.png";
      anchor.click();
      window.setTimeout(() => {
        window.URL.revokeObjectURL(objectUrl);
      }, 1e3);
      setShareStatus("图片已下载");
    } catch {
      setShareStatus("生成图片失败");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `app-shell phase-${phase}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeBackdrop, { theme }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "floating-music-dock", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: `music-toggle ${musicEnabled ? "is-active" : ""}`,
        onClick: toggleMusic,
        "aria-pressed": musicEnabled,
        children: musicEnabled ? "背景音乐 开" : "背景音乐 关"
      }
    ) }),
    phase === "result" && resultSharePayload ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "floating-share-dock", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `share-panel ${shareMenuOpen ? "is-open" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "share-toggle",
          onClick: () => setShareMenuOpen((open) => !open),
          "aria-expanded": shareMenuOpen,
          "aria-haspopup": "true",
          children: "分享"
        }
      ),
      shareMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "share-menu", role: "menu", "aria-label": "分享答题结果", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "share-action", onClick: handleShareLink, children: "链接" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "share-action", onClick: handleShareCard, children: "卡片" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "share-action", onClick: handleShareImage, children: "图片" })
      ] }) : null,
      shareStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "share-status", children: shareStatus }) : null
    ] }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "floating-theme-dock", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `floating-theme-capsule theme-pill-${theme}`,
        role: "tablist",
        "aria-label": "主题选择",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "theme-pill-slider", "aria-hidden": "true" }),
          THEMES.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: `theme-chip ${item === theme ? "is-active" : ""}`,
              onClick: () => setTheme(item),
              "aria-pressed": item === theme,
              children: THEME_COPY[item].switchLabel
            },
            item
          ))
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "app", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `panel ${phase === "home" ? "home-panel" : ""} ${phase === "playing" ? "quiz-panel" : ""} ${phase === "result" ? "result-panel" : ""}`,
        style: currentSubjectThemeMeta ? {
          "--subject-accent": currentSubjectThemeMeta.accent
        } : null,
        children: [
          phase === "home" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            theme === "anime" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "title-bubble", children: "大学文凭挑战赛!" }) : null,
            theme === "kawaii" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "home-emoji", children: "🍭" }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-stats", "aria-label": "总答题统计", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "对：",
                homeStats.correctCount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "错：",
                homeStats.wrongCount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: homeStats.accuracy >= 60 ? "accuracy-good" : "accuracy-bad", children: [
                "正确率：",
                homeStats.accuracy,
                "%"
              ] })
            ] }),
            theme === "glass" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-home-marquee", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glass-hero-chip", children: "10Q Round" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "glass-hero-chip", children: [
                SUBJECTS.length,
                " Subjects"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "glass-hero-chip", children: [
                globalQuestionCount,
                " Total"
              ] })
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: copy.homeTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lead", children: copy.homeSubtitle }),
            null,
            null,
            copy.homeFootnote ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "theme-note", children: copy.homeFootnote }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "subject-grid", children: SUBJECTS.map((subject) => {
              const subjectMeta = SUBJECT_THEME_META[theme][subject.key];
              const remainingCount = availableQuestionCountBySubject[subject.key] ?? 0;
              totalQuestionCountBySubject[subject.key] ?? 0;
              difficultySummaryBySubject[subject.key] ?? "";
              const shouldShowFullName = theme !== "kawaii" && subjectMeta.short !== subject.name;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "subject-card",
                  onClick: () => chooseSubject(subject.key),
                  disabled: remainingCount === 0,
                  style: { "--subject-accent": subjectMeta.accent },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "subject-icon", children: subjectMeta.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "subject-copy", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: subjectMeta.short }),
                      shouldShowFullName ? /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: subject.name }) : null,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: remainingCount ? `${"剩余"} ${remainingCount} 题` : "本学科已答完" }),
                      null,
                      null
                    ] })
                  ]
                },
                subject.key
              );
            }) })
          ] }) : null,
          phase === "difficulty" && currentSubject ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "difficulty-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "subject-tag", children: (currentSubjectThemeMeta == null ? void 0 : currentSubjectThemeMeta.short) || currentSubject.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-button back-button", onClick: backToHome, children: "返回选科" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "question-title difficulty-title", children: "选择难度" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lead", children: "先选一个阶段，再进入本轮 10 题。" }),
            null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "difficulty-grid", children: DIFFICULTIES.map((difficulty) => {
              const remainingCount = availableQuestionCountByDifficulty[difficulty.key] ?? 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "difficulty-card",
                  onClick: () => startRound(selectedSubject, difficulty.key),
                  disabled: remainingCount === 0,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: difficulty.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: remainingCount ? `${"剩余"} ${remainingCount} 题` : "暂无可答题目" })
                  ]
                },
                difficulty.key
              );
            }) })
          ] }) : null,
          phase === "playing" && currentQuestion ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quiz-tags", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "subject-tag", children: (currentSubjectThemeMeta == null ? void 0 : currentSubjectThemeMeta.short) || (currentSubject == null ? void 0 : currentSubject.name) }),
                currentDifficulty ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "subject-tag secondary-tag", children: currentDifficulty.label }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "progress-text", children: theme === "anime" ? `${String(currentIndex + 1).padStart(2, "0")}/${String(questions.length).padStart(2, "0")}` : `${currentIndex + 1} / ${questions.length}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-fill", style: { width: `${progress}%` } }) }),
            theme === "glass" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "score-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "当前得分" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                score,
                " / ",
                questions.length
              ] })
            ] }) : null,
            theme === "glass" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-quiz-meta", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "glass-hero-chip", children: [
                "Left ",
                questions.length - currentIndex - 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glass-hero-chip", children: "Keep Going" })
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "question-title", children: currentQuestion.prompt }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "option-list", children: currentQuestion.options.map((option, index) => {
              const isSelected = option === selectedOption;
              const stateClass = locked && isSelected ? "is-selected" : "";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: `option-button ${stateClass}`,
                  onClick: () => handleSelect(option),
                  disabled: locked,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-key", children: String.fromCharCode(65 + index) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-text", children: option })
                  ]
                },
                option
              );
            }) }),
            theme === "glass" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "helper-text", children: "点击选项即刻作答 · 保持专注" }) : null
          ] }) : null,
          phase === "result" && summary ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            theme === "anime" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "title-bubble", children: "鉴定结果" }) : null,
            theme === "anime" && animeScene ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "anime-result-scene", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "anime-result-stage", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "anime-scene-side side-left", src: animeResultImages.left, alt: "", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "anime-scene-side side-right", src: animeResultImages.right, alt: "", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "speech-bubble bubble-left-bottom", children: animeScene.bubbles[2] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "speech-bubble bubble-right-bottom", children: animeScene.bubbles[3] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "anime-result-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "anime-result-badge", children: animeScene.badge }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "anime-scene-emoji", children: summary.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: summary.judgement }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lead", children: summary.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "result-stats", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "stat-card", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "得分" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                      score,
                      " / ",
                      summary.total
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "stat-card", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "正确率" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                      summary.accuracy,
                      "%"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "result-actions", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "primary-button",
                      onClick: () => startRound(selectedSubject, selectedDifficulty),
                      disabled: currentDifficultyRemainingCount === 0,
                      children: currentDifficultyRemainingCount === 0 ? "当前难度已答完" : copy.resultAction
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-button", onClick: backToHome, children: "重新选科目" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "review-section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "review-section-head", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "耻辱柱" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "本轮 ",
                      currentRoundMistakeCount,
                      " 题"
                    ] })
                  ] }),
                  currentRoundMistakeCount ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "review-list", style: reviewListStyle, role: "list", "aria-label": "错题列表", children: currentRoundMistakes.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "review-card", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "review-head", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "第 ",
                        index + 1,
                        " 题"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "bad", children: "答错" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: item.prompt }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                      "你的答案：",
                      item.selected
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                      "正确答案：",
                      item.answer
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item.explanation })
                  ] }, item.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "review-empty", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "本轮零失误，耻辱柱暂时空着。" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "这里只显示当前回合答错的题。" })
                  ] })
                ] })
              ] })
            ] }) }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "result-emoji", children: summary.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: summary.judgement }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lead", children: summary.description }),
            theme === "glass" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-result-pills", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glass-hero-chip", children: (currentSubjectThemeMeta == null ? void 0 : currentSubjectThemeMeta.short) || (currentSubject == null ? void 0 : currentSubject.name) }),
              currentDifficulty ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glass-hero-chip", children: currentDifficulty.label }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "glass-hero-chip", children: [
                "ACC ",
                summary.accuracy,
                "%"
              ] })
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "result-stats", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "stat-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "得分" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                  score,
                  " / ",
                  summary.total
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "stat-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "正确率" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                  summary.accuracy,
                  "%"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "result-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "primary-button",
                  onClick: () => startRound(selectedSubject, selectedDifficulty),
                  disabled: currentDifficultyRemainingCount === 0,
                  children: currentDifficultyRemainingCount === 0 ? "当前难度已答完" : copy.resultAction
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-button", onClick: backToHome, children: "重新选科目" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "review-section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "review-section-head", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "耻辱柱" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "本轮 ",
                  currentRoundMistakeCount,
                  " 题"
                ] })
              ] }),
              currentRoundMistakeCount ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "review-list", style: reviewListStyle, role: "list", "aria-label": "错题列表", children: currentRoundMistakes.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "review-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "review-head", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "第 ",
                    index + 1,
                    " 题"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "bad", children: "答错" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: item.prompt }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "你的答案：",
                  item.selected
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "正确答案：",
                  item.answer
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item.explanation })
              ] }, item.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "review-empty", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "本轮零失误，耻辱柱暂时空着。" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "这里只显示当前回合答错的题。" })
              ] })
            ] })
          ] }) : null
        ]
      }
    ) }) })
  ] });
}
const savedTheme = localStorage.getItem("dxwm-theme-v3") || "anime";
document.body.setAttribute("data-theme", savedTheme);
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
