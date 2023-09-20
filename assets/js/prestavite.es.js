var Ei = (o, e) => () => (e || o((e = { exports: {} }).exports, e), e.exports);
import a from "jquery";
import y from "prestashop";
var Ps = Ei((yi, Ti) => {
  const xt = "transitionend", wi = 1e6, Si = 1e3;
  function bi(o) {
    return o === null || typeof o > "u" ? `${o}` : {}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();
  }
  function Ci() {
    return {
      bindType: xt,
      delegateType: xt,
      handle(o) {
        if (a(o.target).is(this))
          return o.handleObj.handler.apply(this, arguments);
      }
    };
  }
  function ki(o) {
    let e = !1;
    return a(this).one(g.TRANSITION_END, () => {
      e = !0;
    }), setTimeout(() => {
      e || g.triggerTransitionEnd(this);
    }, o), this;
  }
  function $i() {
    a.fn.emulateTransitionEnd = ki, a.event.special[g.TRANSITION_END] = Ci();
  }
  const g = {
    TRANSITION_END: "bsTransitionEnd",
    getUID(o) {
      do
        o += ~~(Math.random() * wi);
      while (document.getElementById(o));
      return o;
    },
    getSelectorFromElement(o) {
      let e = o.getAttribute("data-target");
      if (!e || e === "#") {
        const t = o.getAttribute("href");
        e = t && t !== "#" ? t.trim() : "";
      }
      try {
        return document.querySelector(e) ? e : null;
      } catch {
        return null;
      }
    },
    getTransitionDurationFromElement(o) {
      if (!o)
        return 0;
      let e = a(o).css("transition-duration"), t = a(o).css("transition-delay");
      const i = parseFloat(e), r = parseFloat(t);
      return !i && !r ? 0 : (e = e.split(",")[0], t = t.split(",")[0], (parseFloat(e) + parseFloat(t)) * Si);
    },
    reflow(o) {
      return o.offsetHeight;
    },
    triggerTransitionEnd(o) {
      a(o).trigger(xt);
    },
    supportsTransitionEnd() {
      return !!xt;
    },
    isElement(o) {
      return (o[0] || o).nodeType;
    },
    typeCheckConfig(o, e, t) {
      for (const i in t)
        if (Object.prototype.hasOwnProperty.call(t, i)) {
          const r = t[i], n = e[i], l = n && g.isElement(n) ? "element" : bi(n);
          if (!new RegExp(r).test(l))
            throw new Error(
              `${o.toUpperCase()}: Option "${i}" provided type "${l}" but expected type "${r}".`
            );
        }
    },
    findShadowRoot(o) {
      if (!document.documentElement.attachShadow)
        return null;
      if (typeof o.getRootNode == "function") {
        const e = o.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return o instanceof ShadowRoot ? o : o.parentNode ? g.findShadowRoot(o.parentNode) : null;
    },
    jQueryDetection() {
      if (typeof a > "u")
        throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
      const o = a.fn.jquery.split(" ")[0].split("."), e = 1, t = 2, i = 9, r = 1, n = 4;
      if (o[0] < t && o[1] < i || o[0] === e && o[1] === i && o[2] < r || o[0] >= n)
        throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
    }
  };
  g.jQueryDetection();
  $i();
  const pt = "alert", Ai = "4.6.2", Ot = "bs.alert", re = `.${Ot}`, Oi = ".data-api", Ni = a.fn[pt], Di = "alert", Ii = "fade", Li = "show", Pi = `close${re}`, xi = `closed${re}`, Mi = `click${re}${Oi}`, Ri = '[data-dismiss="alert"]';
  class H {
    constructor(e) {
      this._element = e;
    }
    // Getters
    static get VERSION() {
      return Ai;
    }
    // Public
    close(e) {
      let t = this._element;
      e && (t = this._getRootElement(e)), !this._triggerCloseEvent(t).isDefaultPrevented() && this._removeElement(t);
    }
    dispose() {
      a.removeData(this._element, Ot), this._element = null;
    }
    // Private
    _getRootElement(e) {
      const t = g.getSelectorFromElement(e);
      let i = !1;
      return t && (i = document.querySelector(t)), i || (i = a(e).closest(`.${Di}`)[0]), i;
    }
    _triggerCloseEvent(e) {
      const t = a.Event(Pi);
      return a(e).trigger(t), t;
    }
    _removeElement(e) {
      if (a(e).removeClass(Li), !a(e).hasClass(Ii)) {
        this._destroyElement(e);
        return;
      }
      const t = g.getTransitionDurationFromElement(e);
      a(e).one(g.TRANSITION_END, (i) => this._destroyElement(e, i)).emulateTransitionEnd(t);
    }
    _destroyElement(e) {
      a(e).detach().trigger(xi).remove();
    }
    // Static
    static _jQueryInterface(e) {
      return this.each(function() {
        const t = a(this);
        let i = t.data(Ot);
        i || (i = new H(this), t.data(Ot, i)), e === "close" && i[e](this);
      });
    }
    static _handleDismiss(e) {
      return function(t) {
        t && t.preventDefault(), e.close(this);
      };
    }
  }
  a(document).on(
    Mi,
    Ri,
    H._handleDismiss(new H())
  );
  a.fn[pt] = H._jQueryInterface;
  a.fn[pt].Constructor = H;
  a.fn[pt].noConflict = () => (a.fn[pt] = Ni, H._jQueryInterface);
  const ht = "button", Hi = "4.6.2", Nt = "bs.button", Mt = `.${Nt}`, Rt = ".data-api", ji = a.fn[ht], D = "active", Fi = "btn", Wi = "focus", Ui = `click${Mt}${Rt}`, Vi = `focus${Mt}${Rt} blur${Mt}${Rt}`, zi = `load${Mt}${Rt}`, me = '[data-toggle^="button"]', Bi = '[data-toggle="buttons"]', qi = '[data-toggle="button"]', Yi = '[data-toggle="buttons"] .btn', ae = 'input:not([type="hidden"])', Ki = ".active", ge = ".btn";
  class X {
    constructor(e) {
      this._element = e, this.shouldAvoidTriggerChange = !1;
    }
    // Getters
    static get VERSION() {
      return Hi;
    }
    // Public
    toggle() {
      let e = !0, t = !0;
      const i = a(this._element).closest(Bi)[0];
      if (i) {
        const r = this._element.querySelector(ae);
        if (r) {
          if (r.type === "radio")
            if (r.checked && this._element.classList.contains(D))
              e = !1;
            else {
              const n = i.querySelector(Ki);
              n && a(n).removeClass(D);
            }
          e && ((r.type === "checkbox" || r.type === "radio") && (r.checked = !this._element.classList.contains(D)), this.shouldAvoidTriggerChange || a(r).trigger("change")), r.focus(), t = !1;
        }
      }
      this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (t && this._element.setAttribute("aria-pressed", !this._element.classList.contains(D)), e && a(this._element).toggleClass(D));
    }
    dispose() {
      a.removeData(this._element, Nt), this._element = null;
    }
    // Static
    static _jQueryInterface(e, t) {
      return this.each(function() {
        const i = a(this);
        let r = i.data(Nt);
        r || (r = new X(this), i.data(Nt, r)), r.shouldAvoidTriggerChange = t, e === "toggle" && r[e]();
      });
    }
  }
  a(document).on(Ui, me, (o) => {
    let e = o.target;
    const t = e;
    if (a(e).hasClass(Fi) || (e = a(e).closest(ge)[0]), !e || e.hasAttribute("disabled") || e.classList.contains("disabled"))
      o.preventDefault();
    else {
      const i = e.querySelector(ae);
      if (i && (i.hasAttribute("disabled") || i.classList.contains("disabled"))) {
        o.preventDefault();
        return;
      }
      (t.tagName === "INPUT" || e.tagName !== "LABEL") && X._jQueryInterface.call(a(e), "toggle", t.tagName === "INPUT");
    }
  }).on(Vi, me, (o) => {
    const e = a(o.target).closest(ge)[0];
    a(e).toggleClass(Wi, /^focus(in)?$/.test(o.type));
  });
  a(window).on(zi, () => {
    let o = [].slice.call(document.querySelectorAll(Yi));
    for (let e = 0, t = o.length; e < t; e++) {
      const i = o[e], r = i.querySelector(ae);
      r.checked || r.hasAttribute("checked") ? i.classList.add(D) : i.classList.remove(D);
    }
    o = [].slice.call(document.querySelectorAll(qi));
    for (let e = 0, t = o.length; e < t; e++) {
      const i = o[e];
      i.getAttribute("aria-pressed") === "true" ? i.classList.add(D) : i.classList.remove(D);
    }
  });
  a.fn[ht] = X._jQueryInterface;
  a.fn[ht].Constructor = X;
  a.fn[ht].noConflict = () => (a.fn[ht] = ji, X._jQueryInterface);
  const V = "collapse", Qi = "4.6.2", R = "bs.collapse", mt = `.${R}`, Gi = ".data-api", Xi = a.fn[V], M = "show", et = "collapse", bt = "collapsing", Vt = "collapsed", ve = "width", Ji = "height", Zi = `show${mt}`, to = `shown${mt}`, eo = `hide${mt}`, io = `hidden${mt}`, oo = `click${mt}${Gi}`, no = ".show, .collapsing", Xe = '[data-toggle="collapse"]', zt = {
    toggle: !0,
    parent: ""
  }, so = {
    toggle: "boolean",
    parent: "(string|element)"
  };
  class L {
    constructor(e, t) {
      this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll(
        `[data-toggle="collapse"][href="#${e.id}"],[data-toggle="collapse"][data-target="#${e.id}"]`
      ));
      const i = [].slice.call(document.querySelectorAll(Xe));
      for (let r = 0, n = i.length; r < n; r++) {
        const l = i[r], s = g.getSelectorFromElement(l), c = [].slice.call(document.querySelectorAll(s)).filter((d) => d === e);
        s !== null && c.length > 0 && (this._selector = s, this._triggerArray.push(l));
      }
      this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
    }
    // Getters
    static get VERSION() {
      return Qi;
    }
    static get Default() {
      return zt;
    }
    // Public
    toggle() {
      a(this._element).hasClass(M) ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || a(this._element).hasClass(M))
        return;
      let e, t;
      if (this._parent && (e = [].slice.call(this._parent.querySelectorAll(no)).filter((d) => typeof this._config.parent == "string" ? d.getAttribute("data-parent") === this._config.parent : d.classList.contains(et)), e.length === 0 && (e = null)), e && (t = a(e).not(this._selector).data(R), t && t._isTransitioning))
        return;
      const i = a.Event(Zi);
      if (a(this._element).trigger(i), i.isDefaultPrevented())
        return;
      e && (L._jQueryInterface.call(a(e).not(this._selector), "hide"), t || a(e).data(R, null));
      const r = this._getDimension();
      a(this._element).removeClass(et).addClass(bt), this._element.style[r] = 0, this._triggerArray.length && a(this._triggerArray).removeClass(Vt).attr("aria-expanded", !0), this.setTransitioning(!0);
      const n = () => {
        a(this._element).removeClass(bt).addClass(`${et} ${M}`), this._element.style[r] = "", this.setTransitioning(!1), a(this._element).trigger(to);
      }, s = `scroll${r[0].toUpperCase() + r.slice(1)}`, c = g.getTransitionDurationFromElement(this._element);
      a(this._element).one(g.TRANSITION_END, n).emulateTransitionEnd(c), this._element.style[r] = `${this._element[s]}px`;
    }
    hide() {
      if (this._isTransitioning || !a(this._element).hasClass(M))
        return;
      const e = a.Event(eo);
      if (a(this._element).trigger(e), e.isDefaultPrevented())
        return;
      const t = this._getDimension();
      this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`, g.reflow(this._element), a(this._element).addClass(bt).removeClass(`${et} ${M}`);
      const i = this._triggerArray.length;
      if (i > 0)
        for (let l = 0; l < i; l++) {
          const s = this._triggerArray[l], c = g.getSelectorFromElement(s);
          c !== null && (a([].slice.call(document.querySelectorAll(c))).hasClass(M) || a(s).addClass(Vt).attr("aria-expanded", !1));
        }
      this.setTransitioning(!0);
      const r = () => {
        this.setTransitioning(!1), a(this._element).removeClass(bt).addClass(et).trigger(io);
      };
      this._element.style[t] = "";
      const n = g.getTransitionDurationFromElement(this._element);
      a(this._element).one(g.TRANSITION_END, r).emulateTransitionEnd(n);
    }
    setTransitioning(e) {
      this._isTransitioning = e;
    }
    dispose() {
      a.removeData(this._element, R), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
    }
    // Private
    _getConfig(e) {
      return e = {
        ...zt,
        ...e
      }, e.toggle = !!e.toggle, g.typeCheckConfig(V, e, so), e;
    }
    _getDimension() {
      return a(this._element).hasClass(ve) ? ve : Ji;
    }
    _getParent() {
      let e;
      g.isElement(this._config.parent) ? (e = this._config.parent, typeof this._config.parent.jquery < "u" && (e = this._config.parent[0])) : e = document.querySelector(this._config.parent);
      const t = `[data-toggle="collapse"][data-parent="${this._config.parent}"]`, i = [].slice.call(e.querySelectorAll(t));
      return a(i).each((r, n) => {
        this._addAriaAndCollapsedClass(
          L._getTargetFromElement(n),
          [n]
        );
      }), e;
    }
    _addAriaAndCollapsedClass(e, t) {
      const i = a(e).hasClass(M);
      t.length && a(t).toggleClass(Vt, !i).attr("aria-expanded", i);
    }
    // Static
    static _getTargetFromElement(e) {
      const t = g.getSelectorFromElement(e);
      return t ? document.querySelector(t) : null;
    }
    static _jQueryInterface(e) {
      return this.each(function() {
        const t = a(this);
        let i = t.data(R);
        const r = {
          ...zt,
          ...t.data(),
          ...typeof e == "object" && e ? e : {}
        };
        if (!i && r.toggle && typeof e == "string" && /show|hide/.test(e) && (r.toggle = !1), i || (i = new L(this, r), t.data(R, i)), typeof e == "string") {
          if (typeof i[e] > "u")
            throw new TypeError(`No method named "${e}"`);
          i[e]();
        }
      });
    }
  }
  a(document).on(oo, Xe, function(o) {
    o.currentTarget.tagName === "A" && o.preventDefault();
    const e = a(this), t = g.getSelectorFromElement(this), i = [].slice.call(document.querySelectorAll(t));
    a(i).each(function() {
      const r = a(this), l = r.data(R) ? "toggle" : e.data();
      L._jQueryInterface.call(r, l);
    });
  });
  a.fn[V] = L._jQueryInterface;
  a.fn[V].Constructor = L;
  a.fn[V].noConflict = () => (a.fn[V] = Xi, L._jQueryInterface);
  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var gt = typeof window < "u" && typeof document < "u" && typeof navigator < "u", ro = function() {
    for (var o = ["Edge", "Trident", "Firefox"], e = 0; e < o.length; e += 1)
      if (gt && navigator.userAgent.indexOf(o[e]) >= 0)
        return 1;
    return 0;
  }();
  function ao(o) {
    var e = !1;
    return function() {
      e || (e = !0, window.Promise.resolve().then(function() {
        e = !1, o();
      }));
    };
  }
  function lo(o) {
    var e = !1;
    return function() {
      e || (e = !0, setTimeout(function() {
        e = !1, o();
      }, ro));
    };
  }
  var co = gt && window.Promise, uo = co ? ao : lo;
  function Je(o) {
    var e = {};
    return o && e.toString.call(o) === "[object Function]";
  }
  function F(o, e) {
    if (o.nodeType !== 1)
      return [];
    var t = o.ownerDocument.defaultView, i = t.getComputedStyle(o, null);
    return e ? i[e] : i;
  }
  function le(o) {
    return o.nodeName === "HTML" ? o : o.parentNode || o.host;
  }
  function vt(o) {
    if (!o)
      return document.body;
    switch (o.nodeName) {
      case "HTML":
      case "BODY":
        return o.ownerDocument.body;
      case "#document":
        return o.body;
    }
    var e = F(o), t = e.overflow, i = e.overflowX, r = e.overflowY;
    return /(auto|scroll|overlay)/.test(t + r + i) ? o : vt(le(o));
  }
  function Ze(o) {
    return o && o.referenceNode ? o.referenceNode : o;
  }
  var _e = gt && !!(window.MSInputMethodContext && document.documentMode), ye = gt && /MSIE 10/.test(navigator.userAgent);
  function J(o) {
    return o === 11 ? _e : o === 10 ? ye : _e || ye;
  }
  function z(o) {
    if (!o)
      return document.documentElement;
    for (var e = J(10) ? document.body : null, t = o.offsetParent || null; t === e && o.nextElementSibling; )
      t = (o = o.nextElementSibling).offsetParent;
    var i = t && t.nodeName;
    return !i || i === "BODY" || i === "HTML" ? o ? o.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(t.nodeName) !== -1 && F(t, "position") === "static" ? z(t) : t;
  }
  function po(o) {
    var e = o.nodeName;
    return e === "BODY" ? !1 : e === "HTML" || z(o.firstElementChild) === o;
  }
  function Jt(o) {
    return o.parentNode !== null ? Jt(o.parentNode) : o;
  }
  function Ht(o, e) {
    if (!o || !o.nodeType || !e || !e.nodeType)
      return document.documentElement;
    var t = o.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING, i = t ? o : e, r = t ? e : o, n = document.createRange();
    n.setStart(i, 0), n.setEnd(r, 0);
    var l = n.commonAncestorContainer;
    if (o !== l && e !== l || i.contains(r))
      return po(l) ? l : z(l);
    var s = Jt(o);
    return s.host ? Ht(s.host, e) : Ht(o, Jt(e).host);
  }
  function B(o) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", t = e === "top" ? "scrollTop" : "scrollLeft", i = o.nodeName;
    if (i === "BODY" || i === "HTML") {
      var r = o.ownerDocument.documentElement, n = o.ownerDocument.scrollingElement || r;
      return n[t];
    }
    return o[t];
  }
  function ho(o, e) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, i = B(e, "top"), r = B(e, "left"), n = t ? -1 : 1;
    return o.top += i * n, o.bottom += i * n, o.left += r * n, o.right += r * n, o;
  }
  function Te(o, e) {
    var t = e === "x" ? "Left" : "Top", i = t === "Left" ? "Right" : "Bottom";
    return parseFloat(o["border" + t + "Width"]) + parseFloat(o["border" + i + "Width"]);
  }
  function Ee(o, e, t, i) {
    return Math.max(e["offset" + o], e["scroll" + o], t["client" + o], t["offset" + o], t["scroll" + o], J(10) ? parseInt(t["offset" + o]) + parseInt(i["margin" + (o === "Height" ? "Top" : "Left")]) + parseInt(i["margin" + (o === "Height" ? "Bottom" : "Right")]) : 0);
  }
  function ti(o) {
    var e = o.body, t = o.documentElement, i = J(10) && getComputedStyle(t);
    return {
      height: Ee("Height", e, t, i),
      width: Ee("Width", e, t, i)
    };
  }
  var fo = function(o, e) {
    if (!(o instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }, mo = function() {
    function o(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function(e, t, i) {
      return t && o(e.prototype, t), i && o(e, i), e;
    };
  }(), q = function(o, e, t) {
    return e in o ? Object.defineProperty(o, e, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : o[e] = t, o;
  }, k = Object.assign || function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (o[i] = t[i]);
    }
    return o;
  };
  function P(o) {
    return k({}, o, {
      right: o.left + o.width,
      bottom: o.top + o.height
    });
  }
  function Zt(o) {
    var e = {};
    try {
      if (J(10)) {
        e = o.getBoundingClientRect();
        var t = B(o, "top"), i = B(o, "left");
        e.top += t, e.left += i, e.bottom += t, e.right += i;
      } else
        e = o.getBoundingClientRect();
    } catch {
    }
    var r = {
      left: e.left,
      top: e.top,
      width: e.right - e.left,
      height: e.bottom - e.top
    }, n = o.nodeName === "HTML" ? ti(o.ownerDocument) : {}, l = n.width || o.clientWidth || r.width, s = n.height || o.clientHeight || r.height, c = o.offsetWidth - l, d = o.offsetHeight - s;
    if (c || d) {
      var p = F(o);
      c -= Te(p, "x"), d -= Te(p, "y"), r.width -= c, r.height -= d;
    }
    return P(r);
  }
  function ce(o, e) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, i = J(10), r = e.nodeName === "HTML", n = Zt(o), l = Zt(e), s = vt(o), c = F(e), d = parseFloat(c.borderTopWidth), p = parseFloat(c.borderLeftWidth);
    t && r && (l.top = Math.max(l.top, 0), l.left = Math.max(l.left, 0));
    var u = P({
      top: n.top - l.top - d,
      left: n.left - l.left - p,
      width: n.width,
      height: n.height
    });
    if (u.marginTop = 0, u.marginLeft = 0, !i && r) {
      var f = parseFloat(c.marginTop), m = parseFloat(c.marginLeft);
      u.top -= d - f, u.bottom -= d - f, u.left -= p - m, u.right -= p - m, u.marginTop = f, u.marginLeft = m;
    }
    return (i && !t ? e.contains(s) : e === s && s.nodeName !== "BODY") && (u = ho(u, e)), u;
  }
  function go(o) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, t = o.ownerDocument.documentElement, i = ce(o, t), r = Math.max(t.clientWidth, window.innerWidth || 0), n = Math.max(t.clientHeight, window.innerHeight || 0), l = e ? 0 : B(t), s = e ? 0 : B(t, "left"), c = {
      top: l - i.top + i.marginTop,
      left: s - i.left + i.marginLeft,
      width: r,
      height: n
    };
    return P(c);
  }
  function ei(o) {
    var e = o.nodeName;
    if (e === "BODY" || e === "HTML")
      return !1;
    if (F(o, "position") === "fixed")
      return !0;
    var t = le(o);
    return t ? ei(t) : !1;
  }
  function ii(o) {
    if (!o || !o.parentElement || J())
      return document.documentElement;
    for (var e = o.parentElement; e && F(e, "transform") === "none"; )
      e = e.parentElement;
    return e || document.documentElement;
  }
  function de(o, e, t, i) {
    var r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, n = { top: 0, left: 0 }, l = r ? ii(o) : Ht(o, Ze(e));
    if (i === "viewport")
      n = go(l, r);
    else {
      var s = void 0;
      i === "scrollParent" ? (s = vt(le(e)), s.nodeName === "BODY" && (s = o.ownerDocument.documentElement)) : i === "window" ? s = o.ownerDocument.documentElement : s = i;
      var c = ce(s, l, r);
      if (s.nodeName === "HTML" && !ei(l)) {
        var d = ti(o.ownerDocument), p = d.height, u = d.width;
        n.top += c.top - c.marginTop, n.bottom = p + c.top, n.left += c.left - c.marginLeft, n.right = u + c.left;
      } else
        n = c;
    }
    t = t || 0;
    var f = typeof t == "number";
    return n.left += f ? t : t.left || 0, n.top += f ? t : t.top || 0, n.right -= f ? t : t.right || 0, n.bottom -= f ? t : t.bottom || 0, n;
  }
  function vo(o) {
    var e = o.width, t = o.height;
    return e * t;
  }
  function oi(o, e, t, i, r) {
    var n = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
    if (o.indexOf("auto") === -1)
      return o;
    var l = de(t, i, n, r), s = {
      top: {
        width: l.width,
        height: e.top - l.top
      },
      right: {
        width: l.right - e.right,
        height: l.height
      },
      bottom: {
        width: l.width,
        height: l.bottom - e.bottom
      },
      left: {
        width: e.left - l.left,
        height: l.height
      }
    }, c = Object.keys(s).map(function(f) {
      return k({
        key: f
      }, s[f], {
        area: vo(s[f])
      });
    }).sort(function(f, m) {
      return m.area - f.area;
    }), d = c.filter(function(f) {
      var m = f.width, _ = f.height;
      return m >= t.clientWidth && _ >= t.clientHeight;
    }), p = d.length > 0 ? d[0].key : c[0].key, u = o.split("-")[1];
    return p + (u ? "-" + u : "");
  }
  function ni(o, e, t) {
    var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, r = i ? ii(e) : Ht(e, Ze(t));
    return ce(t, r, i);
  }
  function si(o) {
    var e = o.ownerDocument.defaultView, t = e.getComputedStyle(o), i = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0), r = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0), n = {
      width: o.offsetWidth + r,
      height: o.offsetHeight + i
    };
    return n;
  }
  function jt(o) {
    var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return o.replace(/left|right|bottom|top/g, function(t) {
      return e[t];
    });
  }
  function ri(o, e, t) {
    t = t.split("-")[0];
    var i = si(o), r = {
      width: i.width,
      height: i.height
    }, n = ["right", "left"].indexOf(t) !== -1, l = n ? "top" : "left", s = n ? "left" : "top", c = n ? "height" : "width", d = n ? "width" : "height";
    return r[l] = e[l] + e[c] / 2 - i[c] / 2, t === s ? r[s] = e[s] - i[d] : r[s] = e[jt(s)], r;
  }
  function _t(o, e) {
    return Array.prototype.find ? o.find(e) : o.filter(e)[0];
  }
  function _o(o, e, t) {
    if (Array.prototype.findIndex)
      return o.findIndex(function(r) {
        return r[e] === t;
      });
    var i = _t(o, function(r) {
      return r[e] === t;
    });
    return o.indexOf(i);
  }
  function ai(o, e, t) {
    var i = t === void 0 ? o : o.slice(0, _o(o, "name", t));
    return i.forEach(function(r) {
      r.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var n = r.function || r.fn;
      r.enabled && Je(n) && (e.offsets.popper = P(e.offsets.popper), e.offsets.reference = P(e.offsets.reference), e = n(e, r));
    }), e;
  }
  function yo() {
    if (!this.state.isDestroyed) {
      var o = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      o.offsets.reference = ni(this.state, this.popper, this.reference, this.options.positionFixed), o.placement = oi(this.options.placement, o.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), o.originalPlacement = o.placement, o.positionFixed = this.options.positionFixed, o.offsets.popper = ri(this.popper, o.offsets.reference, o.placement), o.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", o = ai(this.modifiers, o), this.state.isCreated ? this.options.onUpdate(o) : (this.state.isCreated = !0, this.options.onCreate(o));
    }
  }
  function li(o, e) {
    return o.some(function(t) {
      var i = t.name, r = t.enabled;
      return r && i === e;
    });
  }
  function ue(o) {
    for (var e = [!1, "ms", "Webkit", "Moz", "O"], t = o.charAt(0).toUpperCase() + o.slice(1), i = 0; i < e.length; i++) {
      var r = e[i], n = r ? "" + r + t : o;
      if (typeof document.body.style[n] < "u")
        return n;
    }
    return null;
  }
  function To() {
    return this.state.isDestroyed = !0, li(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[ue("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }
  function ci(o) {
    var e = o.ownerDocument;
    return e ? e.defaultView : window;
  }
  function di(o, e, t, i) {
    var r = o.nodeName === "BODY", n = r ? o.ownerDocument.defaultView : o;
    n.addEventListener(e, t, { passive: !0 }), r || di(vt(n.parentNode), e, t, i), i.push(n);
  }
  function Eo(o, e, t, i) {
    t.updateBound = i, ci(o).addEventListener("resize", t.updateBound, { passive: !0 });
    var r = vt(o);
    return di(r, "scroll", t.updateBound, t.scrollParents), t.scrollElement = r, t.eventsEnabled = !0, t;
  }
  function wo() {
    this.state.eventsEnabled || (this.state = Eo(this.reference, this.options, this.state, this.scheduleUpdate));
  }
  function So(o, e) {
    return ci(o).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
      t.removeEventListener("scroll", e.updateBound);
    }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e;
  }
  function bo() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = So(this.reference, this.state));
  }
  function pe(o) {
    return o !== "" && !isNaN(parseFloat(o)) && isFinite(o);
  }
  function te(o, e) {
    Object.keys(e).forEach(function(t) {
      var i = "";
      ["width", "height", "top", "right", "bottom", "left"].indexOf(t) !== -1 && pe(e[t]) && (i = "px"), o.style[t] = e[t] + i;
    });
  }
  function Co(o, e) {
    Object.keys(e).forEach(function(t) {
      var i = e[t];
      i !== !1 ? o.setAttribute(t, e[t]) : o.removeAttribute(t);
    });
  }
  function ko(o) {
    return te(o.instance.popper, o.styles), Co(o.instance.popper, o.attributes), o.arrowElement && Object.keys(o.arrowStyles).length && te(o.arrowElement, o.arrowStyles), o;
  }
  function $o(o, e, t, i, r) {
    var n = ni(r, e, o, t.positionFixed), l = oi(t.placement, n, e, o, t.modifiers.flip.boundariesElement, t.modifiers.flip.padding);
    return e.setAttribute("x-placement", l), te(e, { position: t.positionFixed ? "fixed" : "absolute" }), t;
  }
  function Ao(o, e) {
    var t = o.offsets, i = t.popper, r = t.reference, n = Math.round, l = Math.floor, s = function(E) {
      return E;
    }, c = n(r.width), d = n(i.width), p = ["left", "right"].indexOf(o.placement) !== -1, u = o.placement.indexOf("-") !== -1, f = c % 2 === d % 2, m = c % 2 === 1 && d % 2 === 1, _ = e ? p || u || f ? n : l : s, h = e ? n : s;
    return {
      left: _(m && !u && e ? i.left - 1 : i.left),
      top: h(i.top),
      bottom: h(i.bottom),
      right: _(i.right)
    };
  }
  var Oo = gt && /Firefox/i.test(navigator.userAgent);
  function No(o, e) {
    var t = e.x, i = e.y, r = o.offsets.popper, n = _t(o.instance.modifiers, function(w) {
      return w.name === "applyStyle";
    }).gpuAcceleration;
    n !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
    var l = n !== void 0 ? n : e.gpuAcceleration, s = z(o.instance.popper), c = Zt(s), d = {
      position: r.position
    }, p = Ao(o, window.devicePixelRatio < 2 || !Oo), u = t === "bottom" ? "top" : "bottom", f = i === "right" ? "left" : "right", m = ue("transform"), _ = void 0, h = void 0;
    if (u === "bottom" ? s.nodeName === "HTML" ? h = -s.clientHeight + p.bottom : h = -c.height + p.bottom : h = p.top, f === "right" ? s.nodeName === "HTML" ? _ = -s.clientWidth + p.right : _ = -c.width + p.right : _ = p.left, l && m)
      d[m] = "translate3d(" + _ + "px, " + h + "px, 0)", d[u] = 0, d[f] = 0, d.willChange = "transform";
    else {
      var T = u === "bottom" ? -1 : 1, E = f === "right" ? -1 : 1;
      d[u] = h * T, d[f] = _ * E, d.willChange = u + ", " + f;
    }
    var v = {
      "x-placement": o.placement
    };
    return o.attributes = k({}, v, o.attributes), o.styles = k({}, d, o.styles), o.arrowStyles = k({}, o.offsets.arrow, o.arrowStyles), o;
  }
  function ui(o, e, t) {
    var i = _t(o, function(s) {
      var c = s.name;
      return c === e;
    }), r = !!i && o.some(function(s) {
      return s.name === t && s.enabled && s.order < i.order;
    });
    if (!r) {
      var n = "`" + e + "`", l = "`" + t + "`";
      console.warn(l + " modifier is required by " + n + " modifier in order to work, be sure to include it before " + n + "!");
    }
    return r;
  }
  function Do(o, e) {
    var t;
    if (!ui(o.instance.modifiers, "arrow", "keepTogether"))
      return o;
    var i = e.element;
    if (typeof i == "string") {
      if (i = o.instance.popper.querySelector(i), !i)
        return o;
    } else if (!o.instance.popper.contains(i))
      return console.warn("WARNING: `arrow.element` must be child of its popper element!"), o;
    var r = o.placement.split("-")[0], n = o.offsets, l = n.popper, s = n.reference, c = ["left", "right"].indexOf(r) !== -1, d = c ? "height" : "width", p = c ? "Top" : "Left", u = p.toLowerCase(), f = c ? "left" : "top", m = c ? "bottom" : "right", _ = si(i)[d];
    s[m] - _ < l[u] && (o.offsets.popper[u] -= l[u] - (s[m] - _)), s[u] + _ > l[m] && (o.offsets.popper[u] += s[u] + _ - l[m]), o.offsets.popper = P(o.offsets.popper);
    var h = s[u] + s[d] / 2 - _ / 2, T = F(o.instance.popper), E = parseFloat(T["margin" + p]), v = parseFloat(T["border" + p + "Width"]), w = h - o.offsets.popper[u] - E - v;
    return w = Math.max(Math.min(l[d] - _, w), 0), o.arrowElement = i, o.offsets.arrow = (t = {}, q(t, u, Math.round(w)), q(t, f, ""), t), o;
  }
  function Io(o) {
    return o === "end" ? "start" : o === "start" ? "end" : o;
  }
  var pi = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], Bt = pi.slice(3);
  function we(o) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, t = Bt.indexOf(o), i = Bt.slice(t + 1).concat(Bt.slice(0, t));
    return e ? i.reverse() : i;
  }
  var qt = {
    FLIP: "flip",
    CLOCKWISE: "clockwise",
    COUNTERCLOCKWISE: "counterclockwise"
  };
  function Lo(o, e) {
    if (li(o.instance.modifiers, "inner") || o.flipped && o.placement === o.originalPlacement)
      return o;
    var t = de(o.instance.popper, o.instance.reference, e.padding, e.boundariesElement, o.positionFixed), i = o.placement.split("-")[0], r = jt(i), n = o.placement.split("-")[1] || "", l = [];
    switch (e.behavior) {
      case qt.FLIP:
        l = [i, r];
        break;
      case qt.CLOCKWISE:
        l = we(i);
        break;
      case qt.COUNTERCLOCKWISE:
        l = we(i, !0);
        break;
      default:
        l = e.behavior;
    }
    return l.forEach(function(s, c) {
      if (i !== s || l.length === c + 1)
        return o;
      i = o.placement.split("-")[0], r = jt(i);
      var d = o.offsets.popper, p = o.offsets.reference, u = Math.floor, f = i === "left" && u(d.right) > u(p.left) || i === "right" && u(d.left) < u(p.right) || i === "top" && u(d.bottom) > u(p.top) || i === "bottom" && u(d.top) < u(p.bottom), m = u(d.left) < u(t.left), _ = u(d.right) > u(t.right), h = u(d.top) < u(t.top), T = u(d.bottom) > u(t.bottom), E = i === "left" && m || i === "right" && _ || i === "top" && h || i === "bottom" && T, v = ["top", "bottom"].indexOf(i) !== -1, w = !!e.flipVariations && (v && n === "start" && m || v && n === "end" && _ || !v && n === "start" && h || !v && n === "end" && T), C = !!e.flipVariationsByContent && (v && n === "start" && _ || v && n === "end" && m || !v && n === "start" && T || !v && n === "end" && h), St = w || C;
      (f || E || St) && (o.flipped = !0, (f || E) && (i = l[c + 1]), St && (n = Io(n)), o.placement = i + (n ? "-" + n : ""), o.offsets.popper = k({}, o.offsets.popper, ri(o.instance.popper, o.offsets.reference, o.placement)), o = ai(o.instance.modifiers, o, "flip"));
    }), o;
  }
  function Po(o) {
    var e = o.offsets, t = e.popper, i = e.reference, r = o.placement.split("-")[0], n = Math.floor, l = ["top", "bottom"].indexOf(r) !== -1, s = l ? "right" : "bottom", c = l ? "left" : "top", d = l ? "width" : "height";
    return t[s] < n(i[c]) && (o.offsets.popper[c] = n(i[c]) - t[d]), t[c] > n(i[s]) && (o.offsets.popper[c] = n(i[s])), o;
  }
  function xo(o, e, t, i) {
    var r = o.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), n = +r[1], l = r[2];
    if (!n)
      return o;
    if (l.indexOf("%") === 0) {
      var s = void 0;
      switch (l) {
        case "%p":
          s = t;
          break;
        case "%":
        case "%r":
        default:
          s = i;
      }
      var c = P(s);
      return c[e] / 100 * n;
    } else if (l === "vh" || l === "vw") {
      var d = void 0;
      return l === "vh" ? d = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : d = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), d / 100 * n;
    } else
      return n;
  }
  function Mo(o, e, t, i) {
    var r = [0, 0], n = ["right", "left"].indexOf(i) !== -1, l = o.split(/(\+|\-)/).map(function(p) {
      return p.trim();
    }), s = l.indexOf(_t(l, function(p) {
      return p.search(/,|\s/) !== -1;
    }));
    l[s] && l[s].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
    var c = /\s*,\s*|\s+/, d = s !== -1 ? [l.slice(0, s).concat([l[s].split(c)[0]]), [l[s].split(c)[1]].concat(l.slice(s + 1))] : [l];
    return d = d.map(function(p, u) {
      var f = (u === 1 ? !n : n) ? "height" : "width", m = !1;
      return p.reduce(function(_, h) {
        return _[_.length - 1] === "" && ["+", "-"].indexOf(h) !== -1 ? (_[_.length - 1] = h, m = !0, _) : m ? (_[_.length - 1] += h, m = !1, _) : _.concat(h);
      }, []).map(function(_) {
        return xo(_, f, e, t);
      });
    }), d.forEach(function(p, u) {
      p.forEach(function(f, m) {
        pe(f) && (r[u] += f * (p[m - 1] === "-" ? -1 : 1));
      });
    }), r;
  }
  function Ro(o, e) {
    var t = e.offset, i = o.placement, r = o.offsets, n = r.popper, l = r.reference, s = i.split("-")[0], c = void 0;
    return pe(+t) ? c = [+t, 0] : c = Mo(t, n, l, s), s === "left" ? (n.top += c[0], n.left -= c[1]) : s === "right" ? (n.top += c[0], n.left += c[1]) : s === "top" ? (n.left += c[0], n.top -= c[1]) : s === "bottom" && (n.left += c[0], n.top += c[1]), o.popper = n, o;
  }
  function Ho(o, e) {
    var t = e.boundariesElement || z(o.instance.popper);
    o.instance.reference === t && (t = z(t));
    var i = ue("transform"), r = o.instance.popper.style, n = r.top, l = r.left, s = r[i];
    r.top = "", r.left = "", r[i] = "";
    var c = de(o.instance.popper, o.instance.reference, e.padding, t, o.positionFixed);
    r.top = n, r.left = l, r[i] = s, e.boundaries = c;
    var d = e.priority, p = o.offsets.popper, u = {
      primary: function(m) {
        var _ = p[m];
        return p[m] < c[m] && !e.escapeWithReference && (_ = Math.max(p[m], c[m])), q({}, m, _);
      },
      secondary: function(m) {
        var _ = m === "right" ? "left" : "top", h = p[_];
        return p[m] > c[m] && !e.escapeWithReference && (h = Math.min(p[_], c[m] - (m === "right" ? p.width : p.height))), q({}, _, h);
      }
    };
    return d.forEach(function(f) {
      var m = ["left", "top"].indexOf(f) !== -1 ? "primary" : "secondary";
      p = k({}, p, u[m](f));
    }), o.offsets.popper = p, o;
  }
  function jo(o) {
    var e = o.placement, t = e.split("-")[0], i = e.split("-")[1];
    if (i) {
      var r = o.offsets, n = r.reference, l = r.popper, s = ["bottom", "top"].indexOf(t) !== -1, c = s ? "left" : "top", d = s ? "width" : "height", p = {
        start: q({}, c, n[c]),
        end: q({}, c, n[c] + n[d] - l[d])
      };
      o.offsets.popper = k({}, l, p[i]);
    }
    return o;
  }
  function Fo(o) {
    if (!ui(o.instance.modifiers, "hide", "preventOverflow"))
      return o;
    var e = o.offsets.reference, t = _t(o.instance.modifiers, function(i) {
      return i.name === "preventOverflow";
    }).boundaries;
    if (e.bottom < t.top || e.left > t.right || e.top > t.bottom || e.right < t.left) {
      if (o.hide === !0)
        return o;
      o.hide = !0, o.attributes["x-out-of-boundaries"] = "";
    } else {
      if (o.hide === !1)
        return o;
      o.hide = !1, o.attributes["x-out-of-boundaries"] = !1;
    }
    return o;
  }
  function Wo(o) {
    var e = o.placement, t = e.split("-")[0], i = o.offsets, r = i.popper, n = i.reference, l = ["left", "right"].indexOf(t) !== -1, s = ["top", "left"].indexOf(t) === -1;
    return r[l ? "left" : "top"] = n[t] - (s ? r[l ? "width" : "height"] : 0), o.placement = jt(e), o.offsets.popper = P(r), o;
  }
  var Uo = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: jo
    },
    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: Ro,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },
    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: Ho,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ["left", "right", "top", "bottom"],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: "scrollParent"
    },
    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: Po
    },
    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: Do,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: "[x-arrow]"
    },
    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: Lo,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: "flip",
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: "viewport",
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: !1,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: !1
    },
    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: !1,
      /** @prop {ModifierFn} */
      fn: Wo
    },
    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: Fo
    },
    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: No,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: !0,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: "bottom",
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: "right"
    },
    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: !0,
      /** @prop {ModifierFn} */
      fn: ko,
      /** @prop {Function} */
      onLoad: $o,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: void 0
    }
  }, Vo = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: "bottom",
    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: !1,
    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: !0,
    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: !1,
    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function() {
    },
    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function() {
    },
    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: Uo
  }, Ut = function() {
    function o(e, t) {
      var i = this, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      fo(this, o), this.scheduleUpdate = function() {
        return requestAnimationFrame(i.update);
      }, this.update = uo(this.update.bind(this)), this.options = k({}, o.Defaults, r), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = e && e.jquery ? e[0] : e, this.popper = t && t.jquery ? t[0] : t, this.options.modifiers = {}, Object.keys(k({}, o.Defaults.modifiers, r.modifiers)).forEach(function(l) {
        i.options.modifiers[l] = k({}, o.Defaults.modifiers[l] || {}, r.modifiers ? r.modifiers[l] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function(l) {
        return k({
          name: l
        }, i.options.modifiers[l]);
      }).sort(function(l, s) {
        return l.order - s.order;
      }), this.modifiers.forEach(function(l) {
        l.enabled && Je(l.onLoad) && l.onLoad(i.reference, i.popper, i.options, l, i.state);
      }), this.update();
      var n = this.options.eventsEnabled;
      n && this.enableEventListeners(), this.state.eventsEnabled = n;
    }
    return mo(o, [{
      key: "update",
      value: function() {
        return yo.call(this);
      }
    }, {
      key: "destroy",
      value: function() {
        return To.call(this);
      }
    }, {
      key: "enableEventListeners",
      value: function() {
        return wo.call(this);
      }
    }, {
      key: "disableEventListeners",
      value: function() {
        return bo.call(this);
      }
      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */
      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */
    }]), o;
  }();
  Ut.Utils = (typeof window < "u" ? window : global).PopperUtils;
  Ut.placements = pi;
  Ut.Defaults = Vo;
  const Ft = Ut, Y = "dropdown", zo = "4.6.2", ct = "bs.dropdown", I = `.${ct}`, he = ".data-api", Bo = a.fn[Y], dt = 27, Se = 32, be = 9, ee = 38, ie = 40, qo = 3, Yo = new RegExp(`${ee}|${ie}|${dt}`), Ct = "disabled", A = "show", Ko = "dropup", Qo = "dropright", Go = "dropleft", Ce = "dropdown-menu-right", Xo = "position-static", ke = `hide${I}`, $e = `hidden${I}`, Jo = `show${I}`, Zo = `shown${I}`, tn = `click${I}`, Yt = `click${I}${he}`, Ae = `keydown${I}${he}`, en = `keyup${I}${he}`, Wt = '[data-toggle="dropdown"]', on = ".dropdown form", oe = ".dropdown-menu", nn = ".navbar-nav", sn = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", rn = "top-start", an = "top-end", ln = "bottom-start", cn = "bottom-end", dn = "right-start", un = "left-start", pn = {
    offset: 0,
    flip: !0,
    boundary: "scrollParent",
    reference: "toggle",
    display: "dynamic",
    popperConfig: null
  }, hn = {
    offset: "(number|string|function)",
    flip: "boolean",
    boundary: "(string|element)",
    reference: "(string|element)",
    display: "string",
    popperConfig: "(null|object)"
  };
  class S {
    constructor(e, t) {
      this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
    }
    // Getters
    static get VERSION() {
      return zo;
    }
    static get Default() {
      return pn;
    }
    static get DefaultType() {
      return hn;
    }
    // Public
    toggle() {
      if (this._element.disabled || a(this._element).hasClass(Ct))
        return;
      const e = a(this._menu).hasClass(A);
      S._clearMenus(), !e && this.show(!0);
    }
    show(e = !1) {
      if (this._element.disabled || a(this._element).hasClass(Ct) || a(this._menu).hasClass(A))
        return;
      const t = {
        relatedTarget: this._element
      }, i = a.Event(Jo, t), r = S._getParentFromElement(this._element);
      if (a(r).trigger(i), !i.isDefaultPrevented()) {
        if (!this._inNavbar && e) {
          if (typeof Ft > "u")
            throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
          let n = this._element;
          this._config.reference === "parent" ? n = r : g.isElement(this._config.reference) && (n = this._config.reference, typeof this._config.reference.jquery < "u" && (n = this._config.reference[0])), this._config.boundary !== "scrollParent" && a(r).addClass(Xo), this._popper = new Ft(n, this._menu, this._getPopperConfig());
        }
        "ontouchstart" in document.documentElement && a(r).closest(nn).length === 0 && a(document.body).children().on("mouseover", null, a.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), a(this._menu).toggleClass(A), a(r).toggleClass(A).trigger(a.Event(Zo, t));
      }
    }
    hide() {
      if (this._element.disabled || a(this._element).hasClass(Ct) || !a(this._menu).hasClass(A))
        return;
      const e = {
        relatedTarget: this._element
      }, t = a.Event(ke, e), i = S._getParentFromElement(this._element);
      a(i).trigger(t), !t.isDefaultPrevented() && (this._popper && this._popper.destroy(), a(this._menu).toggleClass(A), a(i).toggleClass(A).trigger(a.Event($e, e)));
    }
    dispose() {
      a.removeData(this._element, ct), a(this._element).off(I), this._element = null, this._menu = null, this._popper !== null && (this._popper.destroy(), this._popper = null);
    }
    update() {
      this._inNavbar = this._detectNavbar(), this._popper !== null && this._popper.scheduleUpdate();
    }
    // Private
    _addEventListeners() {
      a(this._element).on(tn, (e) => {
        e.preventDefault(), e.stopPropagation(), this.toggle();
      });
    }
    _getConfig(e) {
      return e = {
        ...this.constructor.Default,
        ...a(this._element).data(),
        ...e
      }, g.typeCheckConfig(
        Y,
        e,
        this.constructor.DefaultType
      ), e;
    }
    _getMenuElement() {
      if (!this._menu) {
        const e = S._getParentFromElement(this._element);
        e && (this._menu = e.querySelector(oe));
      }
      return this._menu;
    }
    _getPlacement() {
      const e = a(this._element.parentNode);
      let t = ln;
      return e.hasClass(Ko) ? t = a(this._menu).hasClass(Ce) ? an : rn : e.hasClass(Qo) ? t = dn : e.hasClass(Go) ? t = un : a(this._menu).hasClass(Ce) && (t = cn), t;
    }
    _detectNavbar() {
      return a(this._element).closest(".navbar").length > 0;
    }
    _getOffset() {
      const e = {};
      return typeof this._config.offset == "function" ? e.fn = (t) => (t.offsets = {
        ...t.offsets,
        ...this._config.offset(t.offsets, this._element)
      }, t) : e.offset = this._config.offset, e;
    }
    _getPopperConfig() {
      const e = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };
      return this._config.display === "static" && (e.modifiers.applyStyle = {
        enabled: !1
      }), {
        ...e,
        ...this._config.popperConfig
      };
    }
    // Static
    static _jQueryInterface(e) {
      return this.each(function() {
        let t = a(this).data(ct);
        const i = typeof e == "object" ? e : null;
        if (t || (t = new S(this, i), a(this).data(ct, t)), typeof e == "string") {
          if (typeof t[e] > "u")
            throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
    static _clearMenus(e) {
      if (e && (e.which === qo || e.type === "keyup" && e.which !== be))
        return;
      const t = [].slice.call(document.querySelectorAll(Wt));
      for (let i = 0, r = t.length; i < r; i++) {
        const n = S._getParentFromElement(t[i]), l = a(t[i]).data(ct), s = {
          relatedTarget: t[i]
        };
        if (e && e.type === "click" && (s.clickEvent = e), !l)
          continue;
        const c = l._menu;
        if (!a(n).hasClass(A) || e && (e.type === "click" && /input|textarea/i.test(e.target.tagName) || e.type === "keyup" && e.which === be) && a.contains(n, e.target))
          continue;
        const d = a.Event(ke, s);
        a(n).trigger(d), !d.isDefaultPrevented() && ("ontouchstart" in document.documentElement && a(document.body).children().off("mouseover", null, a.noop), t[i].setAttribute("aria-expanded", "false"), l._popper && l._popper.destroy(), a(c).removeClass(A), a(n).removeClass(A).trigger(a.Event($e, s)));
      }
    }
    static _getParentFromElement(e) {
      let t;
      const i = g.getSelectorFromElement(e);
      return i && (t = document.querySelector(i)), t || e.parentNode;
    }
    // eslint-disable-next-line complexity
    static _dataApiKeydownHandler(e) {
      if ((/input|textarea/i.test(e.target.tagName) ? e.which === Se || e.which !== dt && (e.which !== ie && e.which !== ee || a(e.target).closest(oe).length) : !Yo.test(e.which)) || this.disabled || a(this).hasClass(Ct))
        return;
      const t = S._getParentFromElement(this), i = a(t).hasClass(A);
      if (!i && e.which === dt)
        return;
      if (e.preventDefault(), e.stopPropagation(), !i || e.which === dt || e.which === Se) {
        e.which === dt && a(t.querySelector(Wt)).trigger("focus"), a(this).trigger("click");
        return;
      }
      const r = [].slice.call(t.querySelectorAll(sn)).filter((l) => a(l).is(":visible"));
      if (r.length === 0)
        return;
      let n = r.indexOf(e.target);
      e.which === ee && n > 0 && n--, e.which === ie && n < r.length - 1 && n++, n < 0 && (n = 0), r[n].focus();
    }
  }
  a(document).on(Ae, Wt, S._dataApiKeydownHandler).on(Ae, oe, S._dataApiKeydownHandler).on(`${Yt} ${en}`, S._clearMenus).on(Yt, Wt, function(o) {
    o.preventDefault(), o.stopPropagation(), S._jQueryInterface.call(a(this), "toggle");
  }).on(Yt, on, (o) => {
    o.stopPropagation();
  });
  a.fn[Y] = S._jQueryInterface;
  a.fn[Y].Constructor = S;
  a.fn[Y].noConflict = () => (a.fn[Y] = Bo, S._jQueryInterface);
  const K = "modal", fn = "4.6.2", ut = "bs.modal", b = `.${ut}`, mn = ".data-api", gn = a.fn[K], Oe = 27, vn = "modal-dialog-scrollable", _n = "modal-scrollbar-measure", yn = "modal-backdrop", Ne = "modal-open", W = "fade", kt = "show", De = "modal-static", Tn = `hide${b}`, En = `hidePrevented${b}`, hi = `hidden${b}`, fi = `show${b}`, wn = `shown${b}`, $t = `focusin${b}`, Ie = `resize${b}`, Kt = `click.dismiss${b}`, Le = `keydown.dismiss${b}`, Sn = `mouseup.dismiss${b}`, Pe = `mousedown.dismiss${b}`, bn = `click${b}${mn}`, Cn = ".modal-dialog", kn = ".modal-body", $n = '[data-toggle="modal"]', An = '[data-dismiss="modal"]', xe = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Me = ".sticky-top", Qt = {
    backdrop: !0,
    keyboard: !0,
    focus: !0,
    show: !0
  }, On = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    focus: "boolean",
    show: "boolean"
  };
  class Z {
    constructor(e, t) {
      this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(Cn), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0;
    }
    // Getters
    static get VERSION() {
      return fn;
    }
    static get Default() {
      return Qt;
    }
    // Public
    toggle(e) {
      return this._isShown ? this.hide() : this.show(e);
    }
    show(e) {
      if (this._isShown || this._isTransitioning)
        return;
      const t = a.Event(fi, {
        relatedTarget: e
      });
      a(this._element).trigger(t), !t.isDefaultPrevented() && (this._isShown = !0, a(this._element).hasClass(W) && (this._isTransitioning = !0), this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), a(this._element).on(
        Kt,
        An,
        (i) => this.hide(i)
      ), a(this._dialog).on(Pe, () => {
        a(this._element).one(Sn, (i) => {
          a(i.target).is(this._element) && (this._ignoreBackdropClick = !0);
        });
      }), this._showBackdrop(() => this._showElement(e)));
    }
    hide(e) {
      if (e && e.preventDefault(), !this._isShown || this._isTransitioning)
        return;
      const t = a.Event(Tn);
      if (a(this._element).trigger(t), !this._isShown || t.isDefaultPrevented())
        return;
      this._isShown = !1;
      const i = a(this._element).hasClass(W);
      if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), a(document).off($t), a(this._element).removeClass(kt), a(this._element).off(Kt), a(this._dialog).off(Pe), i) {
        const r = g.getTransitionDurationFromElement(this._element);
        a(this._element).one(g.TRANSITION_END, (n) => this._hideModal(n)).emulateTransitionEnd(r);
      } else
        this._hideModal();
    }
    dispose() {
      [window, this._element, this._dialog].forEach((e) => a(e).off(b)), a(document).off($t), a.removeData(this._element, ut), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
    }
    handleUpdate() {
      this._adjustDialog();
    }
    // Private
    _getConfig(e) {
      return e = {
        ...Qt,
        ...e
      }, g.typeCheckConfig(K, e, On), e;
    }
    _triggerBackdropTransition() {
      const e = a.Event(En);
      if (a(this._element).trigger(e), e.isDefaultPrevented())
        return;
      const t = this._element.scrollHeight > document.documentElement.clientHeight;
      t || (this._element.style.overflowY = "hidden"), this._element.classList.add(De);
      const i = g.getTransitionDurationFromElement(this._dialog);
      a(this._element).off(g.TRANSITION_END), a(this._element).one(g.TRANSITION_END, () => {
        this._element.classList.remove(De), t || a(this._element).one(g.TRANSITION_END, () => {
          this._element.style.overflowY = "";
        }).emulateTransitionEnd(this._element, i);
      }).emulateTransitionEnd(i), this._element.focus();
    }
    _showElement(e) {
      const t = a(this._element).hasClass(W), i = this._dialog ? this._dialog.querySelector(kn) : null;
      (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) && document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), a(this._dialog).hasClass(vn) && i ? i.scrollTop = 0 : this._element.scrollTop = 0, t && g.reflow(this._element), a(this._element).addClass(kt), this._config.focus && this._enforceFocus();
      const r = a.Event(wn, {
        relatedTarget: e
      }), n = () => {
        this._config.focus && this._element.focus(), this._isTransitioning = !1, a(this._element).trigger(r);
      };
      if (t) {
        const l = g.getTransitionDurationFromElement(this._dialog);
        a(this._dialog).one(g.TRANSITION_END, n).emulateTransitionEnd(l);
      } else
        n();
    }
    _enforceFocus() {
      a(document).off($t).on($t, (e) => {
        document !== e.target && this._element !== e.target && a(this._element).has(e.target).length === 0 && this._element.focus();
      });
    }
    _setEscapeEvent() {
      this._isShown ? a(this._element).on(Le, (e) => {
        this._config.keyboard && e.which === Oe ? (e.preventDefault(), this.hide()) : !this._config.keyboard && e.which === Oe && this._triggerBackdropTransition();
      }) : this._isShown || a(this._element).off(Le);
    }
    _setResizeEvent() {
      this._isShown ? a(window).on(Ie, (e) => this.handleUpdate(e)) : a(window).off(Ie);
    }
    _hideModal() {
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(() => {
        a(document.body).removeClass(Ne), this._resetAdjustments(), this._resetScrollbar(), a(this._element).trigger(hi);
      });
    }
    _removeBackdrop() {
      this._backdrop && (a(this._backdrop).remove(), this._backdrop = null);
    }
    _showBackdrop(e) {
      const t = a(this._element).hasClass(W) ? W : "";
      if (this._isShown && this._config.backdrop) {
        if (this._backdrop = document.createElement("div"), this._backdrop.className = yn, t && this._backdrop.classList.add(t), a(this._backdrop).appendTo(document.body), a(this._element).on(Kt, (r) => {
          if (this._ignoreBackdropClick) {
            this._ignoreBackdropClick = !1;
            return;
          }
          r.target === r.currentTarget && (this._config.backdrop === "static" ? this._triggerBackdropTransition() : this.hide());
        }), t && g.reflow(this._backdrop), a(this._backdrop).addClass(kt), !e)
          return;
        if (!t) {
          e();
          return;
        }
        const i = g.getTransitionDurationFromElement(this._backdrop);
        a(this._backdrop).one(g.TRANSITION_END, e).emulateTransitionEnd(i);
      } else if (!this._isShown && this._backdrop) {
        a(this._backdrop).removeClass(kt);
        const i = () => {
          this._removeBackdrop(), e && e();
        };
        if (a(this._element).hasClass(W)) {
          const r = g.getTransitionDurationFromElement(this._backdrop);
          a(this._backdrop).one(g.TRANSITION_END, i).emulateTransitionEnd(r);
        } else
          i();
      } else
        e && e();
    }
    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    _adjustDialog() {
      const e = this._element.scrollHeight > document.documentElement.clientHeight;
      !this._isBodyOverflowing && e && (this._element.style.paddingLeft = `${this._scrollbarWidth}px`), this._isBodyOverflowing && !e && (this._element.style.paddingRight = `${this._scrollbarWidth}px`);
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }
    _checkScrollbar() {
      const e = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(e.left + e.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
    }
    _setScrollbar() {
      if (this._isBodyOverflowing) {
        const e = [].slice.call(document.querySelectorAll(xe)), t = [].slice.call(document.querySelectorAll(Me));
        a(e).each((n, l) => {
          const s = l.style.paddingRight, c = a(l).css("padding-right");
          a(l).data("padding-right", s).css("padding-right", `${parseFloat(c) + this._scrollbarWidth}px`);
        }), a(t).each((n, l) => {
          const s = l.style.marginRight, c = a(l).css("margin-right");
          a(l).data("margin-right", s).css("margin-right", `${parseFloat(c) - this._scrollbarWidth}px`);
        });
        const i = document.body.style.paddingRight, r = a(document.body).css("padding-right");
        a(document.body).data("padding-right", i).css("padding-right", `${parseFloat(r) + this._scrollbarWidth}px`);
      }
      a(document.body).addClass(Ne);
    }
    _resetScrollbar() {
      const e = [].slice.call(document.querySelectorAll(xe));
      a(e).each((r, n) => {
        const l = a(n).data("padding-right");
        a(n).removeData("padding-right"), n.style.paddingRight = l || "";
      });
      const t = [].slice.call(document.querySelectorAll(`${Me}`));
      a(t).each((r, n) => {
        const l = a(n).data("margin-right");
        typeof l < "u" && a(n).css("margin-right", l).removeData("margin-right");
      });
      const i = a(document.body).data("padding-right");
      a(document.body).removeData("padding-right"), document.body.style.paddingRight = i || "";
    }
    _getScrollbarWidth() {
      const e = document.createElement("div");
      e.className = _n, document.body.appendChild(e);
      const t = e.getBoundingClientRect().width - e.clientWidth;
      return document.body.removeChild(e), t;
    }
    // Static
    static _jQueryInterface(e, t) {
      return this.each(function() {
        let i = a(this).data(ut);
        const r = {
          ...Qt,
          ...a(this).data(),
          ...typeof e == "object" && e ? e : {}
        };
        if (i || (i = new Z(this, r), a(this).data(ut, i)), typeof e == "string") {
          if (typeof i[e] > "u")
            throw new TypeError(`No method named "${e}"`);
          i[e](t);
        } else
          r.show && i.show(t);
      });
    }
  }
  a(document).on(bn, $n, function(o) {
    let e;
    const t = g.getSelectorFromElement(this);
    t && (e = document.querySelector(t));
    const i = a(e).data(ut) ? "toggle" : {
      ...a(e).data(),
      ...a(this).data()
    };
    (this.tagName === "A" || this.tagName === "AREA") && o.preventDefault();
    const r = a(e).one(fi, (n) => {
      n.isDefaultPrevented() || r.one(hi, () => {
        a(this).is(":visible") && this.focus();
      });
    });
    Z._jQueryInterface.call(a(e), i, this);
  });
  a.fn[K] = Z._jQueryInterface;
  a.fn[K].Constructor = Z;
  a.fn[K].noConflict = () => (a.fn[K] = gn, Z._jQueryInterface);
  const Nn = [
    "background",
    "cite",
    "href",
    "itemtype",
    "longdesc",
    "poster",
    "src",
    "xlink:href"
  ], Dn = /^aria-[\w-]*$/i, In = {
    // Global attributes allowed on any supplied element below.
    "*": ["class", "dir", "id", "lang", "role", Dn],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  }, Ln = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i, Pn = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
  function xn(o, e) {
    const t = o.nodeName.toLowerCase();
    if (e.indexOf(t) !== -1)
      return Nn.indexOf(t) !== -1 ? !!(Ln.test(o.nodeValue) || Pn.test(o.nodeValue)) : !0;
    const i = e.filter((r) => r instanceof RegExp);
    for (let r = 0, n = i.length; r < n; r++)
      if (i[r].test(t))
        return !0;
    return !1;
  }
  function Re(o, e, t) {
    if (o.length === 0)
      return o;
    if (t && typeof t == "function")
      return t(o);
    const r = new window.DOMParser().parseFromString(o, "text/html"), n = Object.keys(e), l = [].slice.call(r.body.querySelectorAll("*"));
    for (let s = 0, c = l.length; s < c; s++) {
      const d = l[s], p = d.nodeName.toLowerCase();
      if (n.indexOf(d.nodeName.toLowerCase()) === -1) {
        d.parentNode.removeChild(d);
        continue;
      }
      const u = [].slice.call(d.attributes), f = [].concat(e["*"] || [], e[p] || []);
      u.forEach((m) => {
        xn(m, f) || d.removeAttribute(m.nodeName);
      });
    }
    return r.body.innerHTML;
  }
  const j = "tooltip", Mn = "4.6.2", Dt = "bs.tooltip", O = `.${Dt}`, Rn = a.fn[j], mi = "bs-tooltip", Hn = new RegExp(`(^|\\s)${mi}\\S+`, "g"), jn = ["sanitize", "whiteList", "sanitizeFn"], it = "fade", ot = "show", nt = "show", Gt = "out", Fn = ".tooltip-inner", Wn = ".arrow", st = "hover", Xt = "focus", Un = "click", Vn = "manual", zn = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left"
  }, Bn = {
    animation: !0,
    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    selector: !1,
    placement: "top",
    offset: 0,
    container: !1,
    fallbackPlacement: "flip",
    boundary: "scrollParent",
    customClass: "",
    sanitize: !0,
    sanitizeFn: null,
    whiteList: In,
    popperConfig: null
  }, qn = {
    animation: "boolean",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
    delay: "(number|object)",
    html: "boolean",
    selector: "(string|boolean)",
    placement: "(string|function)",
    offset: "(number|string|function)",
    container: "(string|element|boolean)",
    fallbackPlacement: "(string|array)",
    boundary: "(string|element)",
    customClass: "(string|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    whiteList: "object",
    popperConfig: "(null|object)"
  }, Yn = {
    HIDE: `hide${O}`,
    HIDDEN: `hidden${O}`,
    SHOW: `show${O}`,
    SHOWN: `shown${O}`,
    INSERTED: `inserted${O}`,
    CLICK: `click${O}`,
    FOCUSIN: `focusin${O}`,
    FOCUSOUT: `focusout${O}`,
    MOUSEENTER: `mouseenter${O}`,
    MOUSELEAVE: `mouseleave${O}`
  };
  class x {
    constructor(e, t) {
      if (typeof Ft > "u")
        throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
      this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners();
    }
    // Getters
    static get VERSION() {
      return Mn;
    }
    static get Default() {
      return Bn;
    }
    static get NAME() {
      return j;
    }
    static get DATA_KEY() {
      return Dt;
    }
    static get Event() {
      return Yn;
    }
    static get EVENT_KEY() {
      return O;
    }
    static get DefaultType() {
      return qn;
    }
    // Public
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle(e) {
      if (this._isEnabled)
        if (e) {
          const t = this.constructor.DATA_KEY;
          let i = a(e.currentTarget).data(t);
          i || (i = new this.constructor(
            e.currentTarget,
            this._getDelegateConfig()
          ), a(e.currentTarget).data(t, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i);
        } else {
          if (a(this.getTipElement()).hasClass(ot)) {
            this._leave(null, this);
            return;
          }
          this._enter(null, this);
        }
    }
    dispose() {
      clearTimeout(this._timeout), a.removeData(this.element, this.constructor.DATA_KEY), a(this.element).off(this.constructor.EVENT_KEY), a(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && a(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
    }
    show() {
      if (a(this.element).css("display") === "none")
        throw new Error("Please use show on visible elements");
      const e = a.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        a(this.element).trigger(e);
        const t = g.findShadowRoot(this.element), i = a.contains(
          t !== null ? t : this.element.ownerDocument.documentElement,
          this.element
        );
        if (e.isDefaultPrevented() || !i)
          return;
        const r = this.getTipElement(), n = g.getUID(this.constructor.NAME);
        r.setAttribute("id", n), this.element.setAttribute("aria-describedby", n), this.setContent(), this.config.animation && a(r).addClass(it);
        const l = typeof this.config.placement == "function" ? this.config.placement.call(this, r, this.element) : this.config.placement, s = this._getAttachment(l);
        this.addAttachmentClass(s);
        const c = this._getContainer();
        a(r).data(this.constructor.DATA_KEY, this), a.contains(this.element.ownerDocument.documentElement, this.tip) || a(r).appendTo(c), a(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Ft(this.element, r, this._getPopperConfig(s)), a(r).addClass(ot), a(r).addClass(this.config.customClass), "ontouchstart" in document.documentElement && a(document.body).children().on("mouseover", null, a.noop);
        const d = () => {
          this.config.animation && this._fixTransition();
          const p = this._hoverState;
          this._hoverState = null, a(this.element).trigger(this.constructor.Event.SHOWN), p === Gt && this._leave(null, this);
        };
        if (a(this.tip).hasClass(it)) {
          const p = g.getTransitionDurationFromElement(this.tip);
          a(this.tip).one(g.TRANSITION_END, d).emulateTransitionEnd(p);
        } else
          d();
      }
    }
    hide(e) {
      const t = this.getTipElement(), i = a.Event(this.constructor.Event.HIDE), r = () => {
        this._hoverState !== nt && t.parentNode && t.parentNode.removeChild(t), this._cleanTipClass(), this.element.removeAttribute("aria-describedby"), a(this.element).trigger(this.constructor.Event.HIDDEN), this._popper !== null && this._popper.destroy(), e && e();
      };
      if (a(this.element).trigger(i), !i.isDefaultPrevented()) {
        if (a(t).removeClass(ot), "ontouchstart" in document.documentElement && a(document.body).children().off("mouseover", null, a.noop), this._activeTrigger[Un] = !1, this._activeTrigger[Xt] = !1, this._activeTrigger[st] = !1, a(this.tip).hasClass(it)) {
          const n = g.getTransitionDurationFromElement(t);
          a(t).one(g.TRANSITION_END, r).emulateTransitionEnd(n);
        } else
          r();
        this._hoverState = "";
      }
    }
    update() {
      this._popper !== null && this._popper.scheduleUpdate();
    }
    // Protected
    isWithContent() {
      return !!this.getTitle();
    }
    addAttachmentClass(e) {
      a(this.getTipElement()).addClass(`${mi}-${e}`);
    }
    getTipElement() {
      return this.tip = this.tip || a(this.config.template)[0], this.tip;
    }
    setContent() {
      const e = this.getTipElement();
      this.setElementContent(a(e.querySelectorAll(Fn)), this.getTitle()), a(e).removeClass(`${it} ${ot}`);
    }
    setElementContent(e, t) {
      if (typeof t == "object" && (t.nodeType || t.jquery)) {
        this.config.html ? a(t).parent().is(e) || e.empty().append(t) : e.text(a(t).text());
        return;
      }
      this.config.html ? (this.config.sanitize && (t = Re(t, this.config.whiteList, this.config.sanitizeFn)), e.html(t)) : e.text(t);
    }
    getTitle() {
      let e = this.element.getAttribute("data-original-title");
      return e || (e = typeof this.config.title == "function" ? this.config.title.call(this.element) : this.config.title), e;
    }
    // Private
    _getPopperConfig(e) {
      return {
        ...{
          placement: e,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Wn
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: (i) => {
            i.originalPlacement !== i.placement && this._handlePopperPlacementChange(i);
          },
          onUpdate: (i) => this._handlePopperPlacementChange(i)
        },
        ...this.config.popperConfig
      };
    }
    _getOffset() {
      const e = {};
      return typeof this.config.offset == "function" ? e.fn = (t) => (t.offsets = {
        ...t.offsets,
        ...this.config.offset(t.offsets, this.element)
      }, t) : e.offset = this.config.offset, e;
    }
    _getContainer() {
      return this.config.container === !1 ? document.body : g.isElement(this.config.container) ? a(this.config.container) : a(document).find(this.config.container);
    }
    _getAttachment(e) {
      return zn[e.toUpperCase()];
    }
    _setListeners() {
      this.config.trigger.split(" ").forEach((t) => {
        if (t === "click")
          a(this.element).on(
            this.constructor.Event.CLICK,
            this.config.selector,
            (i) => this.toggle(i)
          );
        else if (t !== Vn) {
          const i = t === st ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN, r = t === st ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
          a(this.element).on(i, this.config.selector, (n) => this._enter(n)).on(r, this.config.selector, (n) => this._leave(n));
        }
      }), this._hideModalHandler = () => {
        this.element && this.hide();
      }, a(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = {
        ...this.config,
        trigger: "manual",
        selector: ""
      } : this._fixTitle();
    }
    _fixTitle() {
      const e = typeof this.element.getAttribute("data-original-title");
      (this.element.getAttribute("title") || e !== "string") && (this.element.setAttribute(
        "data-original-title",
        this.element.getAttribute("title") || ""
      ), this.element.setAttribute("title", ""));
    }
    _enter(e, t) {
      const i = this.constructor.DATA_KEY;
      if (t = t || a(e.currentTarget).data(i), t || (t = new this.constructor(
        e.currentTarget,
        this._getDelegateConfig()
      ), a(e.currentTarget).data(i, t)), e && (t._activeTrigger[e.type === "focusin" ? Xt : st] = !0), a(t.getTipElement()).hasClass(ot) || t._hoverState === nt) {
        t._hoverState = nt;
        return;
      }
      if (clearTimeout(t._timeout), t._hoverState = nt, !t.config.delay || !t.config.delay.show) {
        t.show();
        return;
      }
      t._timeout = setTimeout(() => {
        t._hoverState === nt && t.show();
      }, t.config.delay.show);
    }
    _leave(e, t) {
      const i = this.constructor.DATA_KEY;
      if (t = t || a(e.currentTarget).data(i), t || (t = new this.constructor(
        e.currentTarget,
        this._getDelegateConfig()
      ), a(e.currentTarget).data(i, t)), e && (t._activeTrigger[e.type === "focusout" ? Xt : st] = !1), !t._isWithActiveTrigger()) {
        if (clearTimeout(t._timeout), t._hoverState = Gt, !t.config.delay || !t.config.delay.hide) {
          t.hide();
          return;
        }
        t._timeout = setTimeout(() => {
          t._hoverState === Gt && t.hide();
        }, t.config.delay.hide);
      }
    }
    _isWithActiveTrigger() {
      for (const e in this._activeTrigger)
        if (this._activeTrigger[e])
          return !0;
      return !1;
    }
    _getConfig(e) {
      const t = a(this.element).data();
      return Object.keys(t).forEach((i) => {
        jn.indexOf(i) !== -1 && delete t[i];
      }), e = {
        ...this.constructor.Default,
        ...t,
        ...typeof e == "object" && e ? e : {}
      }, typeof e.delay == "number" && (e.delay = {
        show: e.delay,
        hide: e.delay
      }), typeof e.title == "number" && (e.title = e.title.toString()), typeof e.content == "number" && (e.content = e.content.toString()), g.typeCheckConfig(
        j,
        e,
        this.constructor.DefaultType
      ), e.sanitize && (e.template = Re(e.template, e.whiteList, e.sanitizeFn)), e;
    }
    _getDelegateConfig() {
      const e = {};
      if (this.config)
        for (const t in this.config)
          this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
      return e;
    }
    _cleanTipClass() {
      const e = a(this.getTipElement()), t = e.attr("class").match(Hn);
      t !== null && t.length && e.removeClass(t.join(""));
    }
    _handlePopperPlacementChange(e) {
      this.tip = e.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement));
    }
    _fixTransition() {
      const e = this.getTipElement(), t = this.config.animation;
      e.getAttribute("x-placement") === null && (a(e).removeClass(it), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t);
    }
    // Static
    static _jQueryInterface(e) {
      return this.each(function() {
        const t = a(this);
        let i = t.data(Dt);
        const r = typeof e == "object" && e;
        if (!(!i && /dispose|hide/.test(e)) && (i || (i = new x(this, r), t.data(Dt, i)), typeof e == "string")) {
          if (typeof i[e] > "u")
            throw new TypeError(`No method named "${e}"`);
          i[e]();
        }
      });
    }
  }
  a.fn[j] = x._jQueryInterface;
  a.fn[j].Constructor = x;
  a.fn[j].noConflict = () => (a.fn[j] = Rn, x._jQueryInterface);
  const Q = "popover", Kn = "4.6.2", It = "bs.popover", N = `.${It}`, Qn = a.fn[Q], gi = "bs-popover", Gn = new RegExp(`(^|\\s)${gi}\\S+`, "g"), Xn = "fade", Jn = "show", Zn = ".popover-header", ts = ".popover-body", es = {
    ...x.Default,
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }, is = {
    ...x.DefaultType,
    content: "(string|element|function)"
  }, os = {
    HIDE: `hide${N}`,
    HIDDEN: `hidden${N}`,
    SHOW: `show${N}`,
    SHOWN: `shown${N}`,
    INSERTED: `inserted${N}`,
    CLICK: `click${N}`,
    FOCUSIN: `focusin${N}`,
    FOCUSOUT: `focusout${N}`,
    MOUSEENTER: `mouseenter${N}`,
    MOUSELEAVE: `mouseleave${N}`
  };
  class yt extends x {
    // Getters
    static get VERSION() {
      return Kn;
    }
    static get Default() {
      return es;
    }
    static get NAME() {
      return Q;
    }
    static get DATA_KEY() {
      return It;
    }
    static get Event() {
      return os;
    }
    static get EVENT_KEY() {
      return N;
    }
    static get DefaultType() {
      return is;
    }
    // Overrides
    isWithContent() {
      return this.getTitle() || this._getContent();
    }
    addAttachmentClass(e) {
      a(this.getTipElement()).addClass(`${gi}-${e}`);
    }
    getTipElement() {
      return this.tip = this.tip || a(this.config.template)[0], this.tip;
    }
    setContent() {
      const e = a(this.getTipElement());
      this.setElementContent(e.find(Zn), this.getTitle());
      let t = this._getContent();
      typeof t == "function" && (t = t.call(this.element)), this.setElementContent(e.find(ts), t), e.removeClass(`${Xn} ${Jn}`);
    }
    // Private
    _getContent() {
      return this.element.getAttribute("data-content") || this.config.content;
    }
    _cleanTipClass() {
      const e = a(this.getTipElement()), t = e.attr("class").match(Gn);
      t !== null && t.length > 0 && e.removeClass(t.join(""));
    }
    // Static
    static _jQueryInterface(e) {
      return this.each(function() {
        let t = a(this).data(It);
        const i = typeof e == "object" ? e : null;
        if (!(!t && /dispose|hide/.test(e)) && (t || (t = new yt(this, i), a(this).data(It, t)), typeof e == "string")) {
          if (typeof t[e] > "u")
            throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
  }
  a.fn[Q] = yt._jQueryInterface;
  a.fn[Q].Constructor = yt;
  a.fn[Q].noConflict = () => (a.fn[Q] = Qn, yt._jQueryInterface);
  const ft = "tab", ns = "4.6.2", Lt = "bs.tab", Tt = `.${Lt}`, ss = ".data-api", rs = a.fn[ft], as = "dropdown-menu", rt = "active", ls = "disabled", He = "fade", je = "show", cs = `hide${Tt}`, ds = `hidden${Tt}`, us = `show${Tt}`, ps = `shown${Tt}`, hs = `click${Tt}${ss}`, fs = ".dropdown", ms = ".nav, .list-group", Fe = ".active", We = "> li > .active", gs = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', vs = ".dropdown-toggle", _s = "> .dropdown-menu .active";
  class tt {
    constructor(e) {
      this._element = e;
    }
    // Getters
    static get VERSION() {
      return ns;
    }
    // Public
    show() {
      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && a(this._element).hasClass(rt) || a(this._element).hasClass(ls) || this._element.hasAttribute("disabled"))
        return;
      let e, t;
      const i = a(this._element).closest(ms)[0], r = g.getSelectorFromElement(this._element);
      if (i) {
        const c = i.nodeName === "UL" || i.nodeName === "OL" ? We : Fe;
        t = a.makeArray(a(i).find(c)), t = t[t.length - 1];
      }
      const n = a.Event(cs, {
        relatedTarget: this._element
      }), l = a.Event(us, {
        relatedTarget: t
      });
      if (t && a(t).trigger(n), a(this._element).trigger(l), l.isDefaultPrevented() || n.isDefaultPrevented())
        return;
      r && (e = document.querySelector(r)), this._activate(
        this._element,
        i
      );
      const s = () => {
        const c = a.Event(ds, {
          relatedTarget: this._element
        }), d = a.Event(ps, {
          relatedTarget: t
        });
        a(t).trigger(c), a(this._element).trigger(d);
      };
      e ? this._activate(e, e.parentNode, s) : s();
    }
    dispose() {
      a.removeData(this._element, Lt), this._element = null;
    }
    // Private
    _activate(e, t, i) {
      const n = (t && (t.nodeName === "UL" || t.nodeName === "OL") ? a(t).find(We) : a(t).children(Fe))[0], l = i && n && a(n).hasClass(He), s = () => this._transitionComplete(
        e,
        n,
        i
      );
      if (n && l) {
        const c = g.getTransitionDurationFromElement(n);
        a(n).removeClass(je).one(g.TRANSITION_END, s).emulateTransitionEnd(c);
      } else
        s();
    }
    _transitionComplete(e, t, i) {
      if (t) {
        a(t).removeClass(rt);
        const n = a(t.parentNode).find(
          _s
        )[0];
        n && a(n).removeClass(rt), t.getAttribute("role") === "tab" && t.setAttribute("aria-selected", !1);
      }
      a(e).addClass(rt), e.getAttribute("role") === "tab" && e.setAttribute("aria-selected", !0), g.reflow(e), e.classList.contains(He) && e.classList.add(je);
      let r = e.parentNode;
      if (r && r.nodeName === "LI" && (r = r.parentNode), r && a(r).hasClass(as)) {
        const n = a(e).closest(fs)[0];
        if (n) {
          const l = [].slice.call(n.querySelectorAll(vs));
          a(l).addClass(rt);
        }
        e.setAttribute("aria-expanded", !0);
      }
      i && i();
    }
    // Static
    static _jQueryInterface(e) {
      return this.each(function() {
        const t = a(this);
        let i = t.data(Lt);
        if (i || (i = new tt(this), t.data(Lt, i)), typeof e == "string") {
          if (typeof i[e] > "u")
            throw new TypeError(`No method named "${e}"`);
          i[e]();
        }
      });
    }
  }
  a(document).on(hs, gs, function(o) {
    o.preventDefault(), tt._jQueryInterface.call(a(this), "show");
  });
  a.fn[ft] = tt._jQueryInterface;
  a.fn[ft].Constructor = tt;
  a.fn[ft].noConflict = () => (a.fn[ft] = rs, tt._jQueryInterface);
  const G = "toast", ys = "4.6.2", Pt = "bs.toast", Et = `.${Pt}`, Ts = a.fn[G], Es = "fade", Ue = "hide", at = "show", Ve = "showing", ze = `click.dismiss${Et}`, ws = `hide${Et}`, Ss = `hidden${Et}`, bs = `show${Et}`, Cs = `shown${Et}`, ks = '[data-dismiss="toast"]', Be = {
    animation: !0,
    autohide: !0,
    delay: 500
  }, $s = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
  };
  class wt {
    constructor(e, t) {
      this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners();
    }
    // Getters
    static get VERSION() {
      return ys;
    }
    static get DefaultType() {
      return $s;
    }
    static get Default() {
      return Be;
    }
    // Public
    show() {
      const e = a.Event(bs);
      if (a(this._element).trigger(e), e.isDefaultPrevented())
        return;
      this._clearTimeout(), this._config.animation && this._element.classList.add(Es);
      const t = () => {
        this._element.classList.remove(Ve), this._element.classList.add(at), a(this._element).trigger(Cs), this._config.autohide && (this._timeout = setTimeout(() => {
          this.hide();
        }, this._config.delay));
      };
      if (this._element.classList.remove(Ue), g.reflow(this._element), this._element.classList.add(Ve), this._config.animation) {
        const i = g.getTransitionDurationFromElement(this._element);
        a(this._element).one(g.TRANSITION_END, t).emulateTransitionEnd(i);
      } else
        t();
    }
    hide() {
      if (!this._element.classList.contains(at))
        return;
      const e = a.Event(ws);
      a(this._element).trigger(e), !e.isDefaultPrevented() && this._close();
    }
    dispose() {
      this._clearTimeout(), this._element.classList.contains(at) && this._element.classList.remove(at), a(this._element).off(ze), a.removeData(this._element, Pt), this._element = null, this._config = null;
    }
    // Private
    _getConfig(e) {
      return e = {
        ...Be,
        ...a(this._element).data(),
        ...typeof e == "object" && e ? e : {}
      }, g.typeCheckConfig(
        G,
        e,
        this.constructor.DefaultType
      ), e;
    }
    _setListeners() {
      a(this._element).on(ze, ks, () => this.hide());
    }
    _close() {
      const e = () => {
        this._element.classList.add(Ue), a(this._element).trigger(Ss);
      };
      if (this._element.classList.remove(at), this._config.animation) {
        const t = g.getTransitionDurationFromElement(this._element);
        a(this._element).one(g.TRANSITION_END, e).emulateTransitionEnd(t);
      } else
        e();
    }
    _clearTimeout() {
      clearTimeout(this._timeout), this._timeout = null;
    }
    // Static
    static _jQueryInterface(e) {
      return this.each(function() {
        const t = a(this);
        let i = t.data(Pt);
        const r = typeof e == "object" && e;
        if (i || (i = new wt(this, r), t.data(Pt, i)), typeof e == "string") {
          if (typeof i[e] > "u")
            throw new TypeError(`No method named "${e}"`);
          i[e](this);
        }
      });
    }
  }
  a.fn[G] = wt._jQueryInterface;
  a.fn[G].Constructor = wt;
  a.fn[G].noConflict = () => (a.fn[G] = Ts, wt._jQueryInterface);
  (function(o) {
    typeof define == "function" && define.amd ? define(["jquery"], o) : typeof yi < "u" ? Ti.exports = o(require("jquery")) : o(jQuery);
  })(function(o) {
    var e = window.Slick || {};
    e = function() {
      function t(r, n) {
        var l, s = this;
        s.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: o(r), appendDots: o(r), arrows: !0, asNavFor: null, prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function(c, d) {
          return o('<button type="button" />').text(d + 1);
        }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: 0.35, fade: !1, focusOnSelect: !1, focusOnChange: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, s.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, scrolling: !1, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, swiping: !1, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, o.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = o(r), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, l = o(r).data("slick") || {}, s.options = o.extend({}, s.defaults, n, l), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, typeof document.mozHidden < "u" ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : typeof document.webkitHidden < "u" && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = o.proxy(s.autoPlay, s), s.autoPlayClear = o.proxy(s.autoPlayClear, s), s.autoPlayIterator = o.proxy(s.autoPlayIterator, s), s.changeSlide = o.proxy(s.changeSlide, s), s.clickHandler = o.proxy(s.clickHandler, s), s.selectHandler = o.proxy(s.selectHandler, s), s.setPosition = o.proxy(s.setPosition, s), s.swipeHandler = o.proxy(s.swipeHandler, s), s.dragHandler = o.proxy(s.dragHandler, s), s.keyHandler = o.proxy(s.keyHandler, s), s.instanceUid = i++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0);
      }
      var i = 0;
      return t;
    }(), e.prototype.activateADA = function() {
      var t = this;
      t.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
    }, e.prototype.addSlide = e.prototype.slickAdd = function(t, i, r) {
      var n = this;
      if (typeof i == "boolean")
        r = i, i = null;
      else if (i < 0 || i >= n.slideCount)
        return !1;
      n.unload(), typeof i == "number" ? i === 0 && n.$slides.length === 0 ? o(t).appendTo(n.$slideTrack) : r ? o(t).insertBefore(n.$slides.eq(i)) : o(t).insertAfter(n.$slides.eq(i)) : r === !0 ? o(t).prependTo(n.$slideTrack) : o(t).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function(l, s) {
        o(s).attr("data-slick-index", l);
      }), n.$slidesCache = n.$slides, n.reinit();
    }, e.prototype.animateHeight = function() {
      var t = this;
      if (t.options.slidesToShow === 1 && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
        var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
        t.$list.animate({ height: i }, t.options.speed);
      }
    }, e.prototype.animateSlide = function(t, i) {
      var r = {}, n = this;
      n.animateHeight(), n.options.rtl === !0 && n.options.vertical === !1 && (t = -t), n.transformsEnabled === !1 ? n.options.vertical === !1 ? n.$slideTrack.animate({ left: t }, n.options.speed, n.options.easing, i) : n.$slideTrack.animate({ top: t }, n.options.speed, n.options.easing, i) : n.cssTransitions === !1 ? (n.options.rtl === !0 && (n.currentLeft = -n.currentLeft), o({ animStart: n.currentLeft }).animate({ animStart: t }, { duration: n.options.speed, easing: n.options.easing, step: function(l) {
        l = Math.ceil(l), n.options.vertical === !1 ? (r[n.animType] = "translate(" + l + "px, 0px)", n.$slideTrack.css(r)) : (r[n.animType] = "translate(0px," + l + "px)", n.$slideTrack.css(r));
      }, complete: function() {
        i && i.call();
      } })) : (n.applyTransition(), t = Math.ceil(t), n.options.vertical === !1 ? r[n.animType] = "translate3d(" + t + "px, 0px, 0px)" : r[n.animType] = "translate3d(0px," + t + "px, 0px)", n.$slideTrack.css(r), i && setTimeout(function() {
        n.disableTransition(), i.call();
      }, n.options.speed));
    }, e.prototype.getNavTarget = function() {
      var t = this, i = t.options.asNavFor;
      return i && i !== null && (i = o(i).not(t.$slider)), i;
    }, e.prototype.asNavFor = function(t) {
      var i = this, r = i.getNavTarget();
      r !== null && typeof r == "object" && r.each(function() {
        var n = o(this).slick("getSlick");
        n.unslicked || n.slideHandler(t, !0);
      });
    }, e.prototype.applyTransition = function(t) {
      var i = this, r = {};
      i.options.fade === !1 ? r[i.transitionType] = i.transformType + " " + i.options.speed + "ms " + i.options.cssEase : r[i.transitionType] = "opacity " + i.options.speed + "ms " + i.options.cssEase, i.options.fade === !1 ? i.$slideTrack.css(r) : i.$slides.eq(t).css(r);
    }, e.prototype.autoPlay = function() {
      var t = this;
      t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed));
    }, e.prototype.autoPlayClear = function() {
      var t = this;
      t.autoPlayTimer && clearInterval(t.autoPlayTimer);
    }, e.prototype.autoPlayIterator = function() {
      var t = this, i = t.currentSlide + t.options.slidesToScroll;
      t.paused || t.interrupted || t.focussed || (t.options.infinite === !1 && (t.direction === 1 && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : t.direction === 0 && (i = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 === 0 && (t.direction = 1))), t.slideHandler(i));
    }, e.prototype.buildArrows = function() {
      var t = this;
      t.options.arrows === !0 && (t.$prevArrow = o(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = o(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
    }, e.prototype.buildDots = function() {
      var t, i, r = this;
      if (r.options.dots === !0 && r.slideCount > r.options.slidesToShow) {
        for (r.$slider.addClass("slick-dotted"), i = o("<ul />").addClass(r.options.dotsClass), t = 0; t <= r.getDotCount(); t += 1)
          i.append(o("<li />").append(r.options.customPaging.call(this, r, t)));
        r.$dots = i.appendTo(r.options.appendDots), r.$dots.find("li").first().addClass("slick-active");
      }
    }, e.prototype.buildOut = function() {
      var t = this;
      t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(i, r) {
        o(r).attr("data-slick-index", i).data("originalStyling", o(r).attr("style") || "");
      }), t.$slider.addClass("slick-slider"), t.$slideTrack = t.slideCount === 0 ? o('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), t.options.centerMode !== !0 && t.options.swipeToSlide !== !0 || (t.options.slidesToScroll = 1), o("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses(typeof t.currentSlide == "number" ? t.currentSlide : 0), t.options.draggable === !0 && t.$list.addClass("draggable");
    }, e.prototype.buildRows = function() {
      var t, i, r, n, l, s, c, d = this;
      if (n = document.createDocumentFragment(), s = d.$slider.children(), d.options.rows > 0) {
        for (c = d.options.slidesPerRow * d.options.rows, l = Math.ceil(s.length / c), t = 0; t < l; t++) {
          var p = document.createElement("div");
          for (i = 0; i < d.options.rows; i++) {
            var u = document.createElement("div");
            for (r = 0; r < d.options.slidesPerRow; r++) {
              var f = t * c + (i * d.options.slidesPerRow + r);
              s.get(f) && u.appendChild(s.get(f));
            }
            p.appendChild(u);
          }
          n.appendChild(p);
        }
        d.$slider.empty().append(n), d.$slider.children().children().children().css({ width: 100 / d.options.slidesPerRow + "%", display: "inline-block" });
      }
    }, e.prototype.checkResponsive = function(t, i) {
      var r, n, l, s = this, c = !1, d = s.$slider.width(), p = window.innerWidth || o(window).width();
      if (s.respondTo === "window" ? l = p : s.respondTo === "slider" ? l = d : s.respondTo === "min" && (l = Math.min(p, d)), s.options.responsive && s.options.responsive.length && s.options.responsive !== null) {
        n = null;
        for (r in s.breakpoints)
          s.breakpoints.hasOwnProperty(r) && (s.originalSettings.mobileFirst === !1 ? l < s.breakpoints[r] && (n = s.breakpoints[r]) : l > s.breakpoints[r] && (n = s.breakpoints[r]));
        n !== null ? s.activeBreakpoint !== null ? (n !== s.activeBreakpoint || i) && (s.activeBreakpoint = n, s.breakpointSettings[n] === "unslick" ? s.unslick(n) : (s.options = o.extend({}, s.originalSettings, s.breakpointSettings[n]), t === !0 && (s.currentSlide = s.options.initialSlide), s.refresh(t)), c = n) : (s.activeBreakpoint = n, s.breakpointSettings[n] === "unslick" ? s.unslick(n) : (s.options = o.extend({}, s.originalSettings, s.breakpointSettings[n]), t === !0 && (s.currentSlide = s.options.initialSlide), s.refresh(t)), c = n) : s.activeBreakpoint !== null && (s.activeBreakpoint = null, s.options = s.originalSettings, t === !0 && (s.currentSlide = s.options.initialSlide), s.refresh(t), c = n), t || c === !1 || s.$slider.trigger("breakpoint", [s, c]);
      }
    }, e.prototype.changeSlide = function(t, i) {
      var r, n, l, s = this, c = o(t.currentTarget);
      switch (c.is("a") && t.preventDefault(), c.is("li") || (c = c.closest("li")), l = s.slideCount % s.options.slidesToScroll !== 0, r = l ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, t.data.message) {
        case "previous":
          n = r === 0 ? s.options.slidesToScroll : s.options.slidesToShow - r, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - n, !1, i);
          break;
        case "next":
          n = r === 0 ? s.options.slidesToScroll : r, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + n, !1, i);
          break;
        case "index":
          var d = t.data.index === 0 ? 0 : t.data.index || c.index() * s.options.slidesToScroll;
          s.slideHandler(s.checkNavigable(d), !1, i), c.children().trigger("focus");
          break;
        default:
          return;
      }
    }, e.prototype.checkNavigable = function(t) {
      var i, r, n = this;
      if (i = n.getNavigableIndexes(), r = 0, t > i[i.length - 1])
        t = i[i.length - 1];
      else
        for (var l in i) {
          if (t < i[l]) {
            t = r;
            break;
          }
          r = i[l];
        }
      return t;
    }, e.prototype.cleanUpEvents = function() {
      var t = this;
      t.options.dots && t.$dots !== null && (o("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", o.proxy(t.interrupt, t, !0)).off("mouseleave.slick", o.proxy(t.interrupt, t, !1)), t.options.accessibility === !0 && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), t.options.accessibility === !0 && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), o(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && o(t.$slideTrack).children().off("click.slick", t.selectHandler), o(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), o(window).off("resize.slick.slick-" + t.instanceUid, t.resize), o("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), o(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
    }, e.prototype.cleanUpSlideEvents = function() {
      var t = this;
      t.$list.off("mouseenter.slick", o.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", o.proxy(t.interrupt, t, !1));
    }, e.prototype.cleanUpRows = function() {
      var t, i = this;
      i.options.rows > 0 && (t = i.$slides.children().children(), t.removeAttr("style"), i.$slider.empty().append(t));
    }, e.prototype.clickHandler = function(t) {
      var i = this;
      i.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
    }, e.prototype.destroy = function(t) {
      var i = this;
      i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), o(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
        o(this).attr("style", o(this).data("originalStyling"));
      }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, t || i.$slider.trigger("destroy", [i]);
    }, e.prototype.disableTransition = function(t) {
      var i = this, r = {};
      r[i.transitionType] = "", i.options.fade === !1 ? i.$slideTrack.css(r) : i.$slides.eq(t).css(r);
    }, e.prototype.fadeSlide = function(t, i) {
      var r = this;
      r.cssTransitions === !1 ? (r.$slides.eq(t).css({ zIndex: r.options.zIndex }), r.$slides.eq(t).animate({ opacity: 1 }, r.options.speed, r.options.easing, i)) : (r.applyTransition(t), r.$slides.eq(t).css({ opacity: 1, zIndex: r.options.zIndex }), i && setTimeout(function() {
        r.disableTransition(t), i.call();
      }, r.options.speed));
    }, e.prototype.fadeSlideOut = function(t) {
      var i = this;
      i.cssTransitions === !1 ? i.$slides.eq(t).animate({ opacity: 0, zIndex: i.options.zIndex - 2 }, i.options.speed, i.options.easing) : (i.applyTransition(t), i.$slides.eq(t).css({ opacity: 0, zIndex: i.options.zIndex - 2 }));
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
      var i = this;
      t !== null && (i.$slidesCache = i.$slides, i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.filter(t).appendTo(i.$slideTrack), i.reinit());
    }, e.prototype.focusHandler = function() {
      var t = this;
      t.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(i) {
        var r = o(this);
        setTimeout(function() {
          t.options.pauseOnFocus && r.is(":focus") && (t.focussed = !0, t.autoPlay());
        }, 0);
      }).on("blur.slick", "*", function(i) {
        o(this), t.options.pauseOnFocus && (t.focussed = !1, t.autoPlay());
      });
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
      var t = this;
      return t.currentSlide;
    }, e.prototype.getDotCount = function() {
      var t = this, i = 0, r = 0, n = 0;
      if (t.options.infinite === !0)
        if (t.slideCount <= t.options.slidesToShow)
          ++n;
        else
          for (; i < t.slideCount; )
            ++n, i = r + t.options.slidesToScroll, r += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
      else if (t.options.centerMode === !0)
        n = t.slideCount;
      else if (t.options.asNavFor)
        for (; i < t.slideCount; )
          ++n, i = r + t.options.slidesToScroll, r += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
      else
        n = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
      return n - 1;
    }, e.prototype.getLeft = function(t) {
      var i, r, n, l, s = this, c = 0;
      return s.slideOffset = 0, r = s.$slides.first().outerHeight(!0), s.options.infinite === !0 ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, l = -1, s.options.vertical === !0 && s.options.centerMode === !0 && (s.options.slidesToShow === 2 ? l = -1.5 : s.options.slidesToShow === 1 && (l = -2)), c = r * s.options.slidesToShow * l), s.slideCount % s.options.slidesToScroll !== 0 && t + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (t > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (t - s.slideCount)) * s.slideWidth * -1, c = (s.options.slidesToShow - (t - s.slideCount)) * r * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, c = s.slideCount % s.options.slidesToScroll * r * -1))) : t + s.options.slidesToShow > s.slideCount && (s.slideOffset = (t + s.options.slidesToShow - s.slideCount) * s.slideWidth, c = (t + s.options.slidesToShow - s.slideCount) * r), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, c = 0), s.options.centerMode === !0 && s.slideCount <= s.options.slidesToShow ? s.slideOffset = s.slideWidth * Math.floor(s.options.slidesToShow) / 2 - s.slideWidth * s.slideCount / 2 : s.options.centerMode === !0 && s.options.infinite === !0 ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : s.options.centerMode === !0 && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), i = s.options.vertical === !1 ? t * s.slideWidth * -1 + s.slideOffset : t * r * -1 + c, s.options.variableWidth === !0 && (n = s.slideCount <= s.options.slidesToShow || s.options.infinite === !1 ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow), i = s.options.rtl === !0 ? n[0] ? (s.$slideTrack.width() - n[0].offsetLeft - n.width()) * -1 : 0 : n[0] ? n[0].offsetLeft * -1 : 0, s.options.centerMode === !0 && (n = s.slideCount <= s.options.slidesToShow || s.options.infinite === !1 ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow + 1), i = s.options.rtl === !0 ? n[0] ? (s.$slideTrack.width() - n[0].offsetLeft - n.width()) * -1 : 0 : n[0] ? n[0].offsetLeft * -1 : 0, i += (s.$list.width() - n.outerWidth()) / 2)), i;
    }, e.prototype.getOption = e.prototype.slickGetOption = function(t) {
      var i = this;
      return i.options[t];
    }, e.prototype.getNavigableIndexes = function() {
      var t, i = this, r = 0, n = 0, l = [];
      for (i.options.infinite === !1 ? t = i.slideCount : (r = i.options.slidesToScroll * -1, n = i.options.slidesToScroll * -1, t = 2 * i.slideCount); r < t; )
        l.push(r), r = n + i.options.slidesToScroll, n += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
      return l;
    }, e.prototype.getSlick = function() {
      return this;
    }, e.prototype.getSlideCount = function() {
      var t, i, r, n = this;
      return r = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0, i = n.swipeLeft * -1 + r, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function(l, s) {
        var c, d, p;
        if (c = o(s).outerWidth(), d = s.offsetLeft, n.options.centerMode !== !0 && (d += c / 2), p = d + c, i < p)
          return t = s, !1;
      }), Math.abs(o(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll;
    }, e.prototype.goTo = e.prototype.slickGoTo = function(t, i) {
      var r = this;
      r.changeSlide({ data: { message: "index", index: parseInt(t) } }, i);
    }, e.prototype.init = function(t) {
      var i = this;
      o(i.$slider).hasClass("slick-initialized") || (o(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), t && i.$slider.trigger("init", [i]), i.options.accessibility === !0 && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay());
    }, e.prototype.initADA = function() {
      var t = this, i = Math.ceil(t.slideCount / t.options.slidesToShow), r = t.getNavigableIndexes().filter(function(s) {
        return s >= 0 && s < t.slideCount;
      });
      t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), t.$dots !== null && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(s) {
        var c = r.indexOf(s);
        if (o(this).attr({ role: "tabpanel", id: "slick-slide" + t.instanceUid + s, tabindex: -1 }), c !== -1) {
          var d = "slick-slide-control" + t.instanceUid + c;
          o("#" + d).length && o(this).attr({ "aria-describedby": d });
        }
      }), t.$dots.attr("role", "tablist").find("li").each(function(s) {
        var c = r[s];
        o(this).attr({ role: "presentation" }), o(this).find("button").first().attr({ role: "tab", id: "slick-slide-control" + t.instanceUid + s, "aria-controls": "slick-slide" + t.instanceUid + c, "aria-label": s + 1 + " of " + i, "aria-selected": null, tabindex: "-1" });
      }).eq(t.currentSlide).find("button").attr({ "aria-selected": "true", tabindex: "0" }).end());
      for (var n = t.currentSlide, l = n + t.options.slidesToShow; n < l; n++)
        t.options.focusOnChange ? t.$slides.eq(n).attr({ tabindex: "0" }) : t.$slides.eq(n).removeAttr("tabindex");
      t.activateADA();
    }, e.prototype.initArrowEvents = function() {
      var t = this;
      t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, t.changeSlide), t.options.accessibility === !0 && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)));
    }, e.prototype.initDotEvents = function() {
      var t = this;
      t.options.dots === !0 && t.slideCount > t.options.slidesToShow && (o("li", t.$dots).on("click.slick", { message: "index" }, t.changeSlide), t.options.accessibility === !0 && t.$dots.on("keydown.slick", t.keyHandler)), t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.slideCount > t.options.slidesToShow && o("li", t.$dots).on("mouseenter.slick", o.proxy(t.interrupt, t, !0)).on("mouseleave.slick", o.proxy(t.interrupt, t, !1));
    }, e.prototype.initSlideEvents = function() {
      var t = this;
      t.options.pauseOnHover && (t.$list.on("mouseenter.slick", o.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", o.proxy(t.interrupt, t, !1)));
    }, e.prototype.initializeEvents = function() {
      var t = this;
      t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", { action: "start" }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", { action: "move" }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", { action: "end" }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), o(document).on(t.visibilityChange, o.proxy(t.visibility, t)), t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && o(t.$slideTrack).children().on("click.slick", t.selectHandler), o(window).on("orientationchange.slick.slick-" + t.instanceUid, o.proxy(t.orientationChange, t)), o(window).on("resize.slick.slick-" + t.instanceUid, o.proxy(t.resize, t)), o("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), o(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), o(t.setPosition);
    }, e.prototype.initUI = function() {
      var t = this;
      t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show();
    }, e.prototype.keyHandler = function(t) {
      var i = this;
      t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (t.keyCode === 37 && i.options.accessibility === !0 ? i.changeSlide({ data: { message: i.options.rtl === !0 ? "next" : "previous" } }) : t.keyCode === 39 && i.options.accessibility === !0 && i.changeSlide({ data: { message: i.options.rtl === !0 ? "previous" : "next" } }));
    }, e.prototype.lazyLoad = function() {
      function t(f) {
        o("img[data-lazy]", f).each(function() {
          var m = o(this), _ = o(this).attr("data-lazy"), h = o(this).attr("data-srcset"), T = o(this).attr("data-sizes") || s.$slider.attr("data-sizes"), E = document.createElement("img");
          E.onload = function() {
            m.animate({ opacity: 0 }, 100, function() {
              h && (m.attr("srcset", h), T && m.attr("sizes", T)), m.attr("src", _).animate({ opacity: 1 }, 200, function() {
                m.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
              }), s.$slider.trigger("lazyLoaded", [s, m, _]);
            });
          }, E.onerror = function() {
            m.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, m, _]);
          }, E.src = _;
        });
      }
      var i, r, n, l, s = this;
      if (s.options.centerMode === !0 ? s.options.infinite === !0 ? (n = s.currentSlide + (s.options.slidesToShow / 2 + 1), l = n + s.options.slidesToShow + 2) : (n = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), l = 2 + (s.options.slidesToShow / 2 + 1) + s.currentSlide) : (n = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, l = Math.ceil(n + s.options.slidesToShow), s.options.fade === !0 && (n > 0 && n--, l <= s.slideCount && l++)), i = s.$slider.find(".slick-slide").slice(n, l), s.options.lazyLoad === "anticipated")
        for (var c = n - 1, d = l, p = s.$slider.find(".slick-slide"), u = 0; u < s.options.slidesToScroll; u++)
          c < 0 && (c = s.slideCount - 1), i = i.add(p.eq(c)), i = i.add(p.eq(d)), c--, d++;
      t(i), s.slideCount <= s.options.slidesToShow ? (r = s.$slider.find(".slick-slide"), t(r)) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? (r = s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow), t(r)) : s.currentSlide === 0 && (r = s.$slider.find(".slick-cloned").slice(s.options.slidesToShow * -1), t(r));
    }, e.prototype.loadSlider = function() {
      var t = this;
      t.setPosition(), t.$slideTrack.css({ opacity: 1 }), t.$slider.removeClass("slick-loading"), t.initUI(), t.options.lazyLoad === "progressive" && t.progressiveLazyLoad();
    }, e.prototype.next = e.prototype.slickNext = function() {
      var t = this;
      t.changeSlide({ data: { message: "next" } });
    }, e.prototype.orientationChange = function() {
      var t = this;
      t.checkResponsive(), t.setPosition();
    }, e.prototype.pause = e.prototype.slickPause = function() {
      var t = this;
      t.autoPlayClear(), t.paused = !0;
    }, e.prototype.play = e.prototype.slickPlay = function() {
      var t = this;
      t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1;
    }, e.prototype.postSlide = function(t) {
      var i = this;
      if (!i.unslicked && (i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), i.options.accessibility === !0 && (i.initADA(), i.options.focusOnChange))) {
        var r = o(i.$slides.get(i.currentSlide));
        r.attr("tabindex", 0).focus();
      }
    }, e.prototype.prev = e.prototype.slickPrev = function() {
      var t = this;
      t.changeSlide({ data: { message: "previous" } });
    }, e.prototype.preventDefault = function(t) {
      t.preventDefault();
    }, e.prototype.progressiveLazyLoad = function(t) {
      t = t || 1;
      var i, r, n, l, s, c = this, d = o("img[data-lazy]", c.$slider);
      d.length ? (i = d.first(), r = i.attr("data-lazy"), n = i.attr("data-srcset"), l = i.attr("data-sizes") || c.$slider.attr("data-sizes"), s = document.createElement("img"), s.onload = function() {
        n && (i.attr("srcset", n), l && i.attr("sizes", l)), i.attr("src", r).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, i, r]), c.progressiveLazyLoad();
      }, s.onerror = function() {
        t < 3 ? setTimeout(function() {
          c.progressiveLazyLoad(t + 1);
        }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, i, r]), c.progressiveLazyLoad());
      }, s.src = r) : c.$slider.trigger("allImagesLoaded", [c]);
    }, e.prototype.refresh = function(t) {
      var i, r, n = this;
      r = n.slideCount - n.options.slidesToShow, !n.options.infinite && n.currentSlide > r && (n.currentSlide = r), n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0), i = n.currentSlide, n.destroy(!0), o.extend(n, n.initials, { currentSlide: i }), n.init(), t || n.changeSlide({ data: { message: "index", index: i } }, !1);
    }, e.prototype.registerBreakpoints = function() {
      var t, i, r, n = this, l = n.options.responsive || null;
      if (o.type(l) === "array" && l.length) {
        n.respondTo = n.options.respondTo || "window";
        for (t in l)
          if (r = n.breakpoints.length - 1, l.hasOwnProperty(t)) {
            for (i = l[t].breakpoint; r >= 0; )
              n.breakpoints[r] && n.breakpoints[r] === i && n.breakpoints.splice(r, 1), r--;
            n.breakpoints.push(i), n.breakpointSettings[i] = l[t].settings;
          }
        n.breakpoints.sort(function(s, c) {
          return n.options.mobileFirst ? s - c : c - s;
        });
      }
    }, e.prototype.reinit = function() {
      var t = this;
      t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && t.currentSlide !== 0 && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), t.options.focusOnSelect === !0 && o(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses(typeof t.currentSlide == "number" ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t]);
    }, e.prototype.resize = function() {
      var t = this;
      o(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
        t.windowWidth = o(window).width(), t.checkResponsive(), t.unslicked || t.setPosition();
      }, 50));
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(t, i, r) {
      var n = this;
      return typeof t == "boolean" ? (i = t, t = i === !0 ? 0 : n.slideCount - 1) : t = i === !0 ? --t : t, !(n.slideCount < 1 || t < 0 || t > n.slideCount - 1) && (n.unload(), r === !0 ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, void n.reinit());
    }, e.prototype.setCSS = function(t) {
      var i, r, n = this, l = {};
      n.options.rtl === !0 && (t = -t), i = n.positionProp == "left" ? Math.ceil(t) + "px" : "0px", r = n.positionProp == "top" ? Math.ceil(t) + "px" : "0px", l[n.positionProp] = t, n.transformsEnabled === !1 ? n.$slideTrack.css(l) : (l = {}, n.cssTransitions === !1 ? (l[n.animType] = "translate(" + i + ", " + r + ")", n.$slideTrack.css(l)) : (l[n.animType] = "translate3d(" + i + ", " + r + ", 0px)", n.$slideTrack.css(l)));
    }, e.prototype.setDimensions = function() {
      var t = this;
      t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({ padding: "0px " + t.options.centerPadding }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({ padding: t.options.centerPadding + " 0px" })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
      var i = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
      t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - i);
    }, e.prototype.setFade = function() {
      var t, i = this;
      i.$slides.each(function(r, n) {
        t = i.slideWidth * r * -1, i.options.rtl === !0 ? o(n).css({ position: "relative", right: t, top: 0, zIndex: i.options.zIndex - 2, opacity: 0 }) : o(n).css({ position: "relative", left: t, top: 0, zIndex: i.options.zIndex - 2, opacity: 0 });
      }), i.$slides.eq(i.currentSlide).css({ zIndex: i.options.zIndex - 1, opacity: 1 });
    }, e.prototype.setHeight = function() {
      var t = this;
      if (t.options.slidesToShow === 1 && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
        var i = t.$slides.eq(t.currentSlide).outerHeight(!0);
        t.$list.css("height", i);
      }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
      var t, i, r, n, l, s = this, c = !1;
      if (o.type(arguments[0]) === "object" ? (r = arguments[0], c = arguments[1], l = "multiple") : o.type(arguments[0]) === "string" && (r = arguments[0], n = arguments[1], c = arguments[2], arguments[0] === "responsive" && o.type(arguments[1]) === "array" ? l = "responsive" : typeof arguments[1] < "u" && (l = "single")), l === "single")
        s.options[r] = n;
      else if (l === "multiple")
        o.each(r, function(d, p) {
          s.options[d] = p;
        });
      else if (l === "responsive")
        for (i in n)
          if (o.type(s.options.responsive) !== "array")
            s.options.responsive = [n[i]];
          else {
            for (t = s.options.responsive.length - 1; t >= 0; )
              s.options.responsive[t].breakpoint === n[i].breakpoint && s.options.responsive.splice(t, 1), t--;
            s.options.responsive.push(n[i]);
          }
      c && (s.unload(), s.reinit());
    }, e.prototype.setPosition = function() {
      var t = this;
      t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t]);
    }, e.prototype.setProps = function() {
      var t = this, i = document.body.style;
      t.positionProp = t.options.vertical === !0 ? "top" : "left", t.positionProp === "top" ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), i.WebkitTransition === void 0 && i.MozTransition === void 0 && i.msTransition === void 0 || t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && (typeof t.options.zIndex == "number" ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), i.OTransform !== void 0 && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", i.perspectiveProperty === void 0 && i.webkitPerspective === void 0 && (t.animType = !1)), i.MozTransform !== void 0 && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", i.perspectiveProperty === void 0 && i.MozPerspective === void 0 && (t.animType = !1)), i.webkitTransform !== void 0 && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", i.perspectiveProperty === void 0 && i.webkitPerspective === void 0 && (t.animType = !1)), i.msTransform !== void 0 && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", i.msTransform === void 0 && (t.animType = !1)), i.transform !== void 0 && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && t.animType !== null && t.animType !== !1;
    }, e.prototype.setSlideClasses = function(t) {
      var i, r, n, l, s = this;
      if (r = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(t).addClass("slick-current"), s.options.centerMode === !0) {
        var c = s.options.slidesToShow % 2 === 0 ? 1 : 0;
        i = Math.floor(s.options.slidesToShow / 2), s.options.infinite === !0 && (t >= i && t <= s.slideCount - 1 - i ? s.$slides.slice(t - i + c, t + i + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = s.options.slidesToShow + t, r.slice(n - i + 1 + c, n + i + 2).addClass("slick-active").attr("aria-hidden", "false")), t === 0 ? r.eq(r.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && r.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(t).addClass("slick-center");
      } else
        t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : r.length <= s.options.slidesToShow ? r.addClass("slick-active").attr("aria-hidden", "false") : (l = s.slideCount % s.options.slidesToShow, n = s.options.infinite === !0 ? s.options.slidesToShow + t : t, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? r.slice(n - (s.options.slidesToShow - l), n + l).addClass("slick-active").attr("aria-hidden", "false") : r.slice(n, n + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
      s.options.lazyLoad !== "ondemand" && s.options.lazyLoad !== "anticipated" || s.lazyLoad();
    }, e.prototype.setupInfinite = function() {
      var t, i, r, n = this;
      if (n.options.fade === !0 && (n.options.centerMode = !1), n.options.infinite === !0 && n.options.fade === !1 && (i = null, n.slideCount > n.options.slidesToShow)) {
        for (r = n.options.centerMode === !0 ? n.options.slidesToShow + 1 : n.options.slidesToShow, t = n.slideCount; t > n.slideCount - r; t -= 1)
          i = t - 1, o(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
        for (t = 0; t < r + n.slideCount; t += 1)
          i = t, o(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
        n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
          o(this).attr("id", "");
        });
      }
    }, e.prototype.interrupt = function(t) {
      var i = this;
      t || i.autoPlay(), i.interrupted = t;
    }, e.prototype.selectHandler = function(t) {
      var i = this, r = o(t.target).is(".slick-slide") ? o(t.target) : o(t.target).parents(".slick-slide"), n = parseInt(r.attr("data-slick-index"));
      return n || (n = 0), i.slideCount <= i.options.slidesToShow ? void i.slideHandler(n, !1, !0) : void i.slideHandler(n);
    }, e.prototype.slideHandler = function(t, i, r) {
      var n, l, s, c, d, p = null, u = this;
      if (i = i || !1, !(u.animating === !0 && u.options.waitForAnimate === !0 || u.options.fade === !0 && u.currentSlide === t))
        return i === !1 && u.asNavFor(t), n = t, p = u.getLeft(n), c = u.getLeft(u.currentSlide), u.currentLeft = u.swipeLeft === null ? c : u.swipeLeft, u.options.infinite === !1 && u.options.centerMode === !1 && (t < 0 || t > u.getDotCount() * u.options.slidesToScroll) ? void (u.options.fade === !1 && (n = u.currentSlide, r !== !0 && u.slideCount > u.options.slidesToShow ? u.animateSlide(c, function() {
          u.postSlide(n);
        }) : u.postSlide(n))) : u.options.infinite === !1 && u.options.centerMode === !0 && (t < 0 || t > u.slideCount - u.options.slidesToScroll) ? void (u.options.fade === !1 && (n = u.currentSlide, r !== !0 && u.slideCount > u.options.slidesToShow ? u.animateSlide(c, function() {
          u.postSlide(n);
        }) : u.postSlide(n))) : (u.options.autoplay && clearInterval(u.autoPlayTimer), l = n < 0 ? u.slideCount % u.options.slidesToScroll !== 0 ? u.slideCount - u.slideCount % u.options.slidesToScroll : u.slideCount + n : n >= u.slideCount ? u.slideCount % u.options.slidesToScroll !== 0 ? 0 : n - u.slideCount : n, u.animating = !0, u.$slider.trigger("beforeChange", [u, u.currentSlide, l]), s = u.currentSlide, u.currentSlide = l, u.setSlideClasses(u.currentSlide), u.options.asNavFor && (d = u.getNavTarget(), d = d.slick("getSlick"), d.slideCount <= d.options.slidesToShow && d.setSlideClasses(u.currentSlide)), u.updateDots(), u.updateArrows(), u.options.fade === !0 ? (r !== !0 ? (u.fadeSlideOut(s), u.fadeSlide(l, function() {
          u.postSlide(l);
        })) : u.postSlide(l), void u.animateHeight()) : void (r !== !0 && u.slideCount > u.options.slidesToShow ? u.animateSlide(p, function() {
          u.postSlide(l);
        }) : u.postSlide(l)));
    }, e.prototype.startLoad = function() {
      var t = this;
      t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading");
    }, e.prototype.swipeDirection = function() {
      var t, i, r, n, l = this;
      return t = l.touchObject.startX - l.touchObject.curX, i = l.touchObject.startY - l.touchObject.curY, r = Math.atan2(i, t), n = Math.round(180 * r / Math.PI), n < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 || n <= 360 && n >= 315 ? l.options.rtl === !1 ? "left" : "right" : n >= 135 && n <= 225 ? l.options.rtl === !1 ? "right" : "left" : l.options.verticalSwiping === !0 ? n >= 35 && n <= 135 ? "down" : "up" : "vertical";
    }, e.prototype.swipeEnd = function(t) {
      var i, r, n = this;
      if (n.dragging = !1, n.swiping = !1, n.scrolling)
        return n.scrolling = !1, !1;
      if (n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), n.touchObject.curX === void 0)
        return !1;
      if (n.touchObject.edgeHit === !0 && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
        switch (r = n.swipeDirection()) {
          case "left":
          case "down":
            i = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
            break;
          case "right":
          case "up":
            i = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1;
        }
        r != "vertical" && (n.slideHandler(i), n.touchObject = {}, n.$slider.trigger("swipe", [n, r]));
      } else
        n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {});
    }, e.prototype.swipeHandler = function(t) {
      var i = this;
      if (!(i.options.swipe === !1 || "ontouchend" in document && i.options.swipe === !1 || i.options.draggable === !1 && t.type.indexOf("mouse") !== -1))
        switch (i.touchObject.fingerCount = t.originalEvent && t.originalEvent.touches !== void 0 ? t.originalEvent.touches.length : 1, i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold, i.options.verticalSwiping === !0 && (i.touchObject.minSwipe = i.listHeight / i.options.touchThreshold), t.data.action) {
          case "start":
            i.swipeStart(t);
            break;
          case "move":
            i.swipeMove(t);
            break;
          case "end":
            i.swipeEnd(t);
        }
    }, e.prototype.swipeMove = function(t) {
      var i, r, n, l, s, c, d = this;
      return s = t.originalEvent !== void 0 ? t.originalEvent.touches : null, !(!d.dragging || d.scrolling || s && s.length !== 1) && (i = d.getLeft(d.currentSlide), d.touchObject.curX = s !== void 0 ? s[0].pageX : t.clientX, d.touchObject.curY = s !== void 0 ? s[0].pageY : t.clientY, d.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(d.touchObject.curX - d.touchObject.startX, 2))), c = Math.round(Math.sqrt(Math.pow(d.touchObject.curY - d.touchObject.startY, 2))), !d.options.verticalSwiping && !d.swiping && c > 4 ? (d.scrolling = !0, !1) : (d.options.verticalSwiping === !0 && (d.touchObject.swipeLength = c), r = d.swipeDirection(), t.originalEvent !== void 0 && d.touchObject.swipeLength > 4 && (d.swiping = !0, t.preventDefault()), l = (d.options.rtl === !1 ? 1 : -1) * (d.touchObject.curX > d.touchObject.startX ? 1 : -1), d.options.verticalSwiping === !0 && (l = d.touchObject.curY > d.touchObject.startY ? 1 : -1), n = d.touchObject.swipeLength, d.touchObject.edgeHit = !1, d.options.infinite === !1 && (d.currentSlide === 0 && r === "right" || d.currentSlide >= d.getDotCount() && r === "left") && (n = d.touchObject.swipeLength * d.options.edgeFriction, d.touchObject.edgeHit = !0), d.options.vertical === !1 ? d.swipeLeft = i + n * l : d.swipeLeft = i + n * (d.$list.height() / d.listWidth) * l, d.options.verticalSwiping === !0 && (d.swipeLeft = i + n * l), d.options.fade !== !0 && d.options.touchMove !== !1 && (d.animating === !0 ? (d.swipeLeft = null, !1) : void d.setCSS(d.swipeLeft))));
    }, e.prototype.swipeStart = function(t) {
      var i, r = this;
      return r.interrupted = !0, r.touchObject.fingerCount !== 1 || r.slideCount <= r.options.slidesToShow ? (r.touchObject = {}, !1) : (t.originalEvent !== void 0 && t.originalEvent.touches !== void 0 && (i = t.originalEvent.touches[0]), r.touchObject.startX = r.touchObject.curX = i !== void 0 ? i.pageX : t.clientX, r.touchObject.startY = r.touchObject.curY = i !== void 0 ? i.pageY : t.clientY, void (r.dragging = !0));
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
      var t = this;
      t.$slidesCache !== null && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit());
    }, e.prototype.unload = function() {
      var t = this;
      o(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    }, e.prototype.unslick = function(t) {
      var i = this;
      i.$slider.trigger("unslick", [i, t]), i.destroy();
    }, e.prototype.updateArrows = function() {
      var t = this;
      Math.floor(t.options.slidesToShow / 2), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.currentSlide === 0 ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (t.currentSlide >= t.slideCount - t.options.slidesToShow && t.options.centerMode === !1 || t.currentSlide >= t.slideCount - 1 && t.options.centerMode === !0) && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }, e.prototype.updateDots = function() {
      var t = this;
      t.$dots !== null && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"));
    }, e.prototype.visibility = function() {
      var t = this;
      t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1);
    }, o.fn.slick = function() {
      var t, i, r = this, n = arguments[0], l = Array.prototype.slice.call(arguments, 1), s = r.length;
      for (t = 0; t < s; t++)
        if (typeof n == "object" || typeof n > "u" ? r[t].slick = new e(r[t], n) : i = r[t].slick[n].apply(r[t].slick, l), typeof i < "u")
          return i;
      return r;
    };
  });
  /*!
   * hoverIntent v1.9.0 // 2017.09.01 // jQuery v1.7.0+
   * http://briancherne.github.io/jquery-hoverIntent/
   *
   * You may use hoverIntent under the terms of the MIT license. Basically that
   * means you are free to use hoverIntent as long as this header is left intact.
   * Copyright 2007-2017 Brian Cherne
   */
  (function(o) {
    typeof define == "function" && define.amd ? define(["jquery"], o) : jQuery && !jQuery.fn.hoverIntent && o(jQuery);
  })(function(o) {
    var e, t, i = { interval: 100, sensitivity: 6, timeout: 0 }, r = 0, n = function(c) {
      e = c.pageX, t = c.pageY;
    }, l = function(c, d, p, u) {
      if (Math.sqrt((p.pX - e) * (p.pX - e) + (p.pY - t) * (p.pY - t)) < u.sensitivity)
        return d.off(p.event, n), delete p.timeoutId, p.isActive = !0, c.pageX = e, c.pageY = t, delete p.pX, delete p.pY, u.over.apply(d[0], [c]);
      p.pX = e, p.pY = t, p.timeoutId = setTimeout(function() {
        l(c, d, p, u);
      }, u.interval);
    }, s = function(c, d, p, u) {
      return delete d.data("hoverIntent")[p.id], u.apply(d[0], [c]);
    };
    o.fn.hoverIntent = function(c, d, p) {
      var u = r++, f = o.extend({}, i);
      o.isPlainObject(c) ? (f = o.extend(f, c), o.isFunction(f.out) || (f.out = f.over)) : f = o.isFunction(d) ? o.extend(f, { over: c, out: d, selector: p }) : o.extend(f, { over: c, out: c, selector: d });
      var m = function(_) {
        var h = o.extend({}, _), T = o(this), E = T.data("hoverIntent");
        E || T.data("hoverIntent", E = {});
        var v = E[u];
        v || (E[u] = v = { id: u }), v.timeoutId && (v.timeoutId = clearTimeout(v.timeoutId));
        var w = v.event = "mousemove.hoverIntent.hoverIntent" + u;
        if (_.type === "mouseenter") {
          if (v.isActive)
            return;
          v.pX = h.pageX, v.pY = h.pageY, T.off(w, n).on(w, n), v.timeoutId = setTimeout(function() {
            l(h, T, v, f);
          }, f.interval);
        } else {
          if (!v.isActive)
            return;
          T.off(w, n), v.timeoutId = setTimeout(function() {
            s(h, T, v, f.out);
          }, f.timeout);
        }
      };
      return this.on({ "mouseenter.hoverIntent": m, "mouseleave.hoverIntent": m }, f.selector);
    };
  });
  class fe {
    init() {
      a("[data-slick]").not(".slick-initialized").each(function() {
        let e = a(this);
        e.data("count") !== 1 && e.slick({
          prevArrow: '<button type="button" class="btn btn-link slick-prev slick-arrow"><i class="material-icons left">&#xE314;</i></button>',
          nextArrow: '<button type="button" class="btn btn-link slick-next slick-arrow"><i class="material-icons right">&#xE315;</i></button>'
        });
      });
    }
  }
  /**
   * 2007-2017 PrestaShop
   *
   * NOTICE OF LICENSE
   *
   * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
   * that is bundled with this package in the file LICENSE.txt.
   * It is also available through the world-wide-web at this URL:
   * https://opensource.org/licenses/AFL-3.0
   * If you did not receive a copy of the license and are unable to
   * obtain it through the world-wide-web, please send an email
   * to license@prestashop.com so we can send you a copy immediately.
   *
   * DISCLAIMER
   *
   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
   * versions in the future. If you wish to customize PrestaShop for your
   * needs please refer to http://www.prestashop.com for more information.
   *
   * @author    PrestaShop SA <contact@prestashop.com>
   * @copyright 2007-2017 PrestaShop SA
   * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
   * International Registered Trademark & Property of PrestaShop SA
   */
  y.responsive = y.responsive || {};
  y.responsive.current_width = window.innerWidth;
  y.responsive.min_width = 992;
  y.responsive.mobile = y.responsive.current_width < y.responsive.min_width;
  function qe(o, e) {
    var t = e.children().detach();
    e.empty().append(o.children().detach()), o.append(t);
  }
  function vi() {
    y.responsive.mobile ? (a("*[id^='_desktop_']").each(function(o, e) {
      var t = a("#" + e.id.replace("_desktop_", "_mobile_"));
      t.length && qe(a(e), t);
    }), a("[data-collapse-hide-mobile]").collapse("hide")) : (a("*[id^='_mobile_']").each(function(o, e) {
      var t = a("#" + e.id.replace("_mobile_", "_desktop_"));
      t.length && qe(a(e), t);
    }), a("[data-collapse-hide-mobile]").not(".show").collapse("show"), a("[data-modal-hide-mobile].show").modal("hide")), y.emit("responsive update", {
      mobile: y.responsive.mobile
    });
  }
  a(window).on("resize", function() {
    var o = y.responsive.current_width, e = y.responsive.min_width, t = window.innerWidth, i = o >= e && t < e || o < e && t >= e;
    y.responsive.current_width = t, y.responsive.mobile = y.responsive.current_width < y.responsive.min_width, i && vi();
  });
  a(document).ready(function() {
    y.responsive.mobile && vi();
  });
  /**
   * 2007-2017 PrestaShop
   *
   * NOTICE OF LICENSE
   *
   * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
   * that is bundled with this package in the file LICENSE.txt.
   * It is also available through the world-wide-web at this URL:
   * https://opensource.org/licenses/AFL-3.0
   * If you did not receive a copy of the license and are unable to
   * obtain it through the world-wide-web, please send an email
   * to license@prestashop.com so we can send you a copy immediately.
   *
   * DISCLAIMER
   *
   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
   * versions in the future. If you wish to customize PrestaShop for your
   * needs please refer to http://www.prestashop.com for more information.
   *
   * @author    PrestaShop SA <contact@prestashop.com>
   * @copyright 2007-2017 PrestaShop SA
   * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
   * International Registered Trademark & Property of PrestaShop SA
   */
  function As() {
    a(".js-terms a").on("click", (o) => {
      o.preventDefault();
      var e = a(o.target).attr("href");
      e && (e += "?content_only=1", a.get(e, (t) => {
        a("#modal").find(".js-modal-content").html(a(t).find(".page-content--cms").contents());
      }).fail((t) => {
        y.emit("handleError", { eventType: "clickTerms", resp: t });
      })), a("#modal").modal("show");
    }), a(".js-gift-checkbox").on("click", (o) => {
      a("#gift").collapse("toggle");
    });
  }
  a(document).ready(() => {
    a("body#checkout").length === 1 && As(), y.on("updatedDeliveryForm", (o) => {
      typeof o.deliveryOption > "u" || o.deliveryOption.length === 0 || (a(".carrier-extra-content").hide(), o.deliveryOption.next(".carrier-extra-content").slideDown());
    }), y.on("changedCheckoutStep", (o) => {
      typeof o.event.currentTarget < "u" && a(".collapse", o.event.currentTarget).not(".show").not(".collapse .collapse").collapse("show");
    });
  });
  a(document).on("change", ".js-input-delivery:checked", (o) => {
    a(".js-label-delivery.selected").removeClass("selected"), a("#js-" + a(globalThis).attr("id")).addClass("selected");
  });
  a(document).on("click", ".js-checkout-step-header", (o) => {
    let e = a(o.currentTarget).data("identifier");
    a("#" + e).addClass("-current"), a("#content-" + e).collapse("show").scrollTop();
  });
  /**
   * 2007-2017 PrestaShop
   *
   * NOTICE OF LICENSE
   *
   * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
   * that is bundled with this package in the file LICENSE.txt.
   * It is also available through the world-wide-web at this URL:
   * https://opensource.org/licenses/AFL-3.0
   * If you did not receive a copy of the license and are unable to
   * obtain it through the world-wide-web, please send an email
   * to license@prestashop.com so we can send you a copy immediately.
   *
   * DISCLAIMER
   *
   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
   * versions in the future. If you wish to customize PrestaShop for your
   * needs please refer to http://www.prestashop.com for more information.
   *
   * @author    PrestaShop SA <contact@prestashop.com>
   * @copyright 2007-2017 PrestaShop SA
   * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
   * International Registered Trademark & Property of PrestaShop SA
   */
  function Os() {
    a("#order-return-form table thead input[type=checkbox]").on("click", function() {
      var o = a(this).prop("checked");
      a("#order-return-form table tbody input[type=checkbox]").each(function(e, t) {
        a(t).prop("checked", o);
      });
    });
  }
  function Ns() {
    a("body#order-detail") && Os();
  }
  a(document).ready(Ns);
  /**
   * 2007-2017 PrestaShop
   *
   * NOTICE OF LICENSE
   *
   * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
   * that is bundled with this package in the file LICENSE.txt.
   * It is also available through the world-wide-web at this URL:
   * https://opensource.org/licenses/AFL-3.0
   * If you did not receive a copy of the license and are unable to
   * obtain it through the world-wide-web, please send an email
   * to license@prestashop.com so we can send you a copy immediately.
   *
   * DISCLAIMER
   *
   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
   * versions in the future. If you wish to customize PrestaShop for your
   * needs please refer to http://www.prestashop.com for more information.
   *
   * @author    PrestaShop SA <contact@prestashop.com>
   * @copyright 2007-2017 PrestaShop SA
   * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
   * International Registered Trademark & Property of PrestaShop SA
   */
  a(document).ready(() => {
    y.on("clickQuickView", function(t) {
      let i = {
        action: "quickview",
        id_product: t.dataset.idProduct,
        id_product_attribute: t.dataset.idProductAttribute
      };
      a.post(y.urls.pages.product, i, null, "json").then(function(r) {
        a("body").append(r.quickview_html);
        let n = a(`#quickview-modal-${r.product.id}-${r.product.id_product_attribute}`);
        n.modal("show"), n.on("hidden.bs.modal", function() {
          n.remove();
        }), n.on("shown.bs.modal", function() {
          o(n);
        });
      }).fail((r) => {
        y.emit("handleError", { eventType: "clickQuickView", resp: r });
      });
    });
    var o = (t) => {
      new fe().init(), t.find("#quantity_wanted").TouchSpin({
        buttondown_class: "btn js-touchspin",
        buttonup_class: "btn js-touchspin",
        min: 1,
        max: 1e6
      });
    };
    const e = function(t) {
      if (t.target.dataset.searchUrl !== void 0)
        return t.target.dataset.searchUrl;
      if (a(t.target).parent()[0].dataset.searchUrl === void 0)
        throw new Error("Can not parse search URL");
      return a(t.target).parent()[0].dataset.searchUrl;
    };
    a("body").on("change", "#search_filters input[data-search-url]", function(t) {
      y.emit("updateFacets", e(t));
    }), a("body").on("click", ".js-search-filters-clear-all", function(t) {
      y.emit("updateFacets", e(t));
    }), a("body").on("click", ".js-search-link", function(t) {
      t.preventDefault(), y.emit("updateFacets", a(t.target).closest("a").get(0).href);
    }), a("body").on("change", "#select-sort-order", function() {
      var t = a(this).val();
      y.emit("updateFacets", t);
    }), a("body").on("change", "#search_filters select", function(t) {
      var i = a(this).val();
      y.emit("updateFacets", i);
    }), y.on("updateProductList", (t) => {
      Ds(t), window.scrollTo(0, 0);
    });
  });
  function Ds(o) {
    a("#search_filters").replaceWith(o.rendered_facets), a("#js-active-search-filters").replaceWith(o.rendered_active_filters), a("#js-product-list-top").replaceWith(o.rendered_products_top), a("#js-product-list").replaceWith(o.rendered_products), a("#js-product-list-bottom").replaceWith(o.rendered_products_bottom), typeof o.rendered_products_header < "u" && o.rendered_products_header && a("#js-product-list-header").replaceWith(o.rendered_products_header);
  }
  /**
   * 2007-2017 PrestaShop
   *
   * NOTICE OF LICENSE
   *
   * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
   * that is bundled with this package in the file LICENSE.txt.
   * It is also available through the world-wide-web at this URL:
   * https://opensource.org/licenses/AFL-3.0
   * If you did not receive a copy of the license and are unable to
   * obtain it through the world-wide-web, please send an email
   * to license@prestashop.com so we can send you a copy immediately.
   *
   * DISCLAIMER
   *
   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
   * versions in the future. If you wish to customize PrestaShop for your
   * needs please refer to http://www.prestashop.com for more information.
   *
   * @author    PrestaShop SA <contact@prestashop.com>
   * @copyright 2007-2017 PrestaShop SA
   * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
   * International Registered Trademark & Property of PrestaShop SA
   */
  a(document).ready(function() {
    t(), e();
    let o = new fe();
    y.on("updatedProduct", function(i) {
      if (e(), i && i.product_minimal_quantity) {
        const r = parseInt(i.product_minimal_quantity, 10);
        a("#quantity_wanted").trigger("touchspin.updatesettings", { min: r });
      }
      a(a(".tabs .nav-link.active").attr("href")).addClass("active").removeClass("fade"), a(".js-product-images-modal").replaceWith(i.product_images_modal), o.init();
    });
    function e() {
      a(".js-file-input").on("change", (i) => {
        let r, n;
        (r = a(i.currentTarget)[0]) && (n = r.files[0]) && a(r).prev().text(n.name);
      });
    }
    function t() {
      const i = a("#quantity_wanted");
      i.TouchSpin({
        buttondown_class: "btn js-touchspin",
        buttonup_class: "btn js-touchspin",
        min: parseInt(i.attr("min"), 10),
        max: 1e6
      }), a("body").on("change keyup", "#quantity_wanted", (r) => {
        a(r.currentTarget).trigger("touchspin.stopspin"), y.emit("updateProduct", {
          eventType: "updatedProductQuantity",
          event: r
        });
      });
    }
  });
  a(document).on("shown.bs.modal", "#product-modal", function(o) {
    a("#js-slick-product").resize();
  });
  a(document).on("click", ".js-add-to-cart:enabled:not(.is--loading)", function() {
    a(this).addClass("is--loading").attr("disabled", !0);
  });
  y.on("updateCart", function(o) {
    _i();
  });
  y.on("handleError", function(o) {
    _i(), a(".js-add-to-cart").attr("disabled", !1);
  });
  function _i() {
    a(".js-add-to-cart.is--loading").removeClass("is--loading");
  }
  y.cart = y.cart || {};
  y.cart.active_inputs = null;
  let ne = 'input[name="product-quantity-spin"]', lt = !1, At = !1, U = "";
  function Ye() {
    a.each(a(ne), function(o, e) {
      a(e).TouchSpin({
        buttondown_class: "btn js-touchspin",
        buttonup_class: "btn js-touchspin",
        min: parseInt(a(e).attr("min"), 10),
        max: 1e6
      });
    }), se.switchErrorStat();
  }
  a(document).ready(() => {
    const o = ".js-cart-line-product-quantity", e = [];
    y.on("updateCart", () => {
      a(".quickview").modal("hide"), a(".js-cart__card-body").addClass("is--loading");
    }), y.on("updatedCart", () => {
      Ye(), a(".js-cart__card-body.is--loading").removeClass("is--loading");
    }), y.on("handleError", function(h) {
      a(".js-cart__card-body.is--loading").removeClass("is--loading");
    }), Ye();
    const t = a("body");
    function i(h) {
      return h === "on.startupspin" || h === "on.startdownspin";
    }
    function r(h) {
      return h === "on.startupspin";
    }
    function n(h) {
      var T = h.parents(".bootstrap-touchspin").find(o);
      return T.is(":focus") ? null : T;
    }
    function l(h) {
      let T = h.split("-"), E, v, w = "";
      for (E = 0; E < T.length; E++)
        v = T[E], E !== 0 && (v = v.substring(0, 1).toUpperCase() + v.substring(1)), w = w + v;
      return w;
    }
    function s(h, T) {
      if (!i(T))
        return {
          url: h.attr("href"),
          type: l(h.data("link-action"))
        };
      let E = n(h);
      if (!E)
        return;
      let v = {};
      return r(T) ? v = {
        url: E.data("up-url"),
        type: "increaseProductQuantity"
      } : v = {
        url: E.data("down-url"),
        type: "decreaseProductQuantity"
      }, v;
    }
    let c = () => {
      for (var h; e.length > 0; )
        h = e.pop(), h.abort();
    };
    var d = (h) => a(h.parents(".bootstrap-touchspin").find("input")), p = (h) => {
      h.preventDefault();
      let T = a(h.currentTarget), E = h.currentTarget.dataset, v = s(T, h.namespace), w = {
        ajax: "1",
        action: "update"
      };
      typeof v > "u" || (c(), a.ajax({
        url: v.url,
        method: "POST",
        data: w,
        dataType: "json",
        beforeSend: function(C) {
          e.push(C);
        }
      }).then(function(C) {
        se.checkUpdateOpertation(C);
        var St = d(T);
        St.val(C.quantity), y.emit("updateCart", {
          reason: E,
          resp: C
        });
      }).fail((C) => {
        y.emit("handleError", {
          eventType: "updateProductInCart",
          resp: C,
          cartAction: v.type
        });
      }));
    };
    t.on(
      "click",
      '[data-link-action="delete-from-cart"], [data-link-action="remove-voucher"]',
      p
    ), t.on("touchspin.on.startdownspin", ne, p), t.on("touchspin.on.startupspin", ne, p);
    function u(h, T, E) {
      return c(), a.ajax({
        url: h,
        method: "POST",
        data: T,
        dataType: "json",
        beforeSend: function(v) {
          e.push(v);
        }
      }).then(function(v) {
        se.checkUpdateOpertation(v), E.val(v.quantity);
        var w;
        E && E.dataset ? w = E.dataset : w = v, y.emit("updateCart", {
          reason: w,
          resp: v
        });
      }).fail((v) => {
        y.emit("handleError", { eventType: "updateProductQuantityInCart", resp: v });
      });
    }
    function f(h) {
      return {
        ajax: "1",
        qty: Math.abs(h),
        action: "update",
        op: m(h)
      };
    }
    function m(h) {
      return h > 0 ? "up" : "down";
    }
    function _(h) {
      const T = a(h.currentTarget), E = T.data("update-url"), v = T.attr("value"), w = T.val();
      if (w != parseInt(w) || w < 0 || isNaN(w)) {
        T.val(v);
        return;
      }
      const C = w - v;
      C !== 0 && (T.attr("value", w), u(E, f(C), T));
    }
    t.on(
      "focusout keyup",
      o,
      (h) => {
        if (h.type === "keyup")
          return h.keyCode === 13 && _(h), !1;
        _(h);
      }
    ), t.on(
      "click",
      ".js-discount .code",
      (h) => {
        h.stopPropagation();
        const T = a(h.currentTarget);
        return a("[name=discount_name]").val(T.text()), a("#promo-code").collapse("show"), !1;
      }
    );
  });
  const se = {
    switchErrorStat: () => {
      const o = a(".checkout a");
      if ((a("#notifications article.alert-danger").length || U !== "" && !lt) && o.addClass("disabled"), U !== "") {
        let e = ' <article class="alert alert-danger" role="alert" data-alert="danger"><ul><li>' + U + "</li></ul></article>";
        a("#notifications.notifications-container").html(e), U = "", At = !1, lt && o.removeClass("disabled");
      } else
        !lt && At && (lt = !1, At = !1, a("#notifications.notifications-container").html(""), o.removeClass("disabled"));
    },
    checkUpdateOpertation: (o) => {
      lt = o.hasOwnProperty("hasError");
      let e = o.errors || "";
      e instanceof Array ? U = e.join(" ") : U = e, At = !0;
    }
  };
  /**
   * 2007-2017 PrestaShop
   *
   * NOTICE OF LICENSE
   *
   * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
   * that is bundled with this package in the file LICENSE.txt.
   * It is also available through the world-wide-web at this URL:
   * https://opensource.org/licenses/AFL-3.0
   * If you did not receive a copy of the license and are unable to
   * obtain it through the world-wide-web, please send an email
   * to license@prestashop.com so we can send you a copy immediately.
   *
   * DISCLAIMER
   *
   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
   * versions in the future. If you wish to customize PrestaShop for your
   * needs please refer to http://www.prestashop.com for more information.
   *
   * @author    PrestaShop SA <contact@prestashop.com>
   * @copyright 2007-2017 PrestaShop SA
   * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
   * International Registered Trademark & Property of PrestaShop SA
   */
  class Is {
    init() {
      this.parentFocus(), this.togglePasswordVisibility(), this.formValidation();
    }
    parentFocus() {
      a(".js-child-focus").focus(function() {
        a(this).closest(".js-parent-focus").addClass("focus");
      }), a(".js-child-focus").focusout(function() {
        a(this).closest(".js-parent-focus").removeClass("focus");
      });
    }
    togglePasswordVisibility() {
      a('button[data-action="show-password"]').on("click", function() {
        var e = a(this).closest(".input-group").children("input.js-visible-password");
        e.attr("type") === "password" ? (e.attr("type", "text"), a(this).text(a(this).data("textHide"))) : (e.attr("type", "password"), a(this).text(a(this).data("textShow")));
      });
    }
    formValidation() {
      let e = document.getElementsByClassName("needs-validation");
      if (e.length > 0) {
        if (console.log(Ke()), !Ke())
          return;
        let t = !1;
        Array.prototype.filter.call(e, function(i) {
          i.addEventListener("submit", function(r) {
            i.checkValidity() === !1 && (r.preventDefault(), r.stopPropagation(), a("input:invalid,select:invalid,textarea:invalid", i).each(function(n) {
              var l = a(this), s = l.parents(".form-group").first();
              a(".js-invalid-feedback-browser", s).text(l[0].validationMessage), t || (t = s);
            }), a(this).data("disabled", !1), a('button[type="submit"]', i).removeClass("disabled")), i.classList.add("was-validated"), t && (a("html, body").animate({ scrollTop: t.offset().top }, 300), t = !1);
          }, !1);
        });
      }
    }
  }
  const Ke = function() {
    var o = document.createElement("input");
    return "validity" in o && "badInput" in o.validity && "patternMismatch" in o.validity && "rangeOverflow" in o.validity && "rangeUnderflow" in o.validity && "tooLong" in o.validity && "tooShort" in o.validity && "typeMismatch" in o.validity && "valid" in o.validity && "valueMissing" in o.validity;
  };
  /**
   * 2007-2017 PrestaShop
   *
   * NOTICE OF LICENSE
   *
   * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
   * that is bundled with this package in the file LICENSE.txt.
   * It is also available through the world-wide-web at this URL:
   * https://opensource.org/licenses/AFL-3.0
   * If you did not receive a copy of the license and are unable to
   * obtain it through the world-wide-web, please send an email
   * to license@prestashop.com so we can send you a copy immediately.
   *
   * DISCLAIMER
   *
   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
   * versions in the future. If you wish to customize PrestaShop for your
   * needs please refer to http://www.prestashop.com for more information.
   *
   * @author    PrestaShop SA <contact@prestashop.com>
   * @copyright 2007-2017 PrestaShop SA
   * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
   * International Registered Trademark & Property of PrestaShop SA
   */
  class Ls {
    constructor(e) {
      this.el = e;
    }
    init() {
      let e = this;
      e.el.hoverIntent({
        over: e.toggleClassSubMenu,
        out: e.toggleClassSubMenu,
        selector: " > li",
        timeout: 100
      });
    }
    toggleClassSubMenu() {
      let e = a(this), t = e.attr("aria-expanded");
      typeof t < "u" && (t = t.toLowerCase() === "true", e.toggleClass("menu__item--active").attr("aria-expanded", !t), a(".menu-sub", e).attr("aria-expanded", !t).attr("aria-hidden", t));
    }
  }
  const Qe = {};
  /**
   * 2007-2017 PrestaShop
   *
   * NOTICE OF LICENSE
   *
   * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
   * that is bundled with this package in the file LICENSE.txt.
   * It is also available through the world-wide-web at this URL:
   * https://opensource.org/licenses/AFL-3.0
   * If you did not receive a copy of the license and are unable to
   * obtain it through the world-wide-web, please send an email
   * to license@prestashop.com so we can send you a copy immediately.
   *
   * DISCLAIMER
   *
   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
   * versions in the future. If you wish to customize PrestaShop for your
   * needs please refer to http://www.prestashop.com for more information.
   *
   * @author    PrestaShop SA <contact@prestashop.com>
   * @copyright 2007-2017 PrestaShop SA
   * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
   * International Registered Trademark & Property of PrestaShop SA
   */
  y.blockcart = y.blockcart || {};
  y.blockcart.showModal = (o) => {
    function e() {
      return a("#blockcart-modal");
    }
    let t = e();
    t.length && t.remove(), a("body").append(o), t = e(), t.modal("show").on("hidden.bs.modal", (i) => {
      y.emit("updateProduct", {
        reason: i.currentTarget.dataset,
        event: i
      });
    });
  };
  /**
   * 2007-2017 PrestaShop
   *
   * NOTICE OF LICENSE
   *
   * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
   * that is bundled with this package in the file LICENSE.txt.
   * It is also available through the world-wide-web at this URL:
   * https://opensource.org/licenses/AFL-3.0
   * If you did not receive a copy of the license and are unable to
   * obtain it through the world-wide-web, please send an email
   * to license@prestashop.com so we can send you a copy immediately.
   *
   * DISCLAIMER
   *
   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
   * versions in the future. If you wish to customize PrestaShop for your
   * needs please refer to http://www.prestashop.com for more information.
   *
   * @author    PrestaShop SA <contact@prestashop.com>
   * @copyright 2007-2017 PrestaShop SA
   * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
   * International Registered Trademark & Property of PrestaShop SA
   */
  for (var Ge in Qe.prototype)
    y[Ge] = Qe.prototype[Ge];
  $(document).ready(() => {
    const o = new Is();
    let e = new fe(), t = $("#_desktop_top_menu #top-menu"), i = new Ls(t);
    o.init(), e.init(), i.init(), $(".custom-file-input").on("change", function() {
      let r = $(this).val().split("\\").pop();
      $(this).next(".custom-file-label").addClass("selected").html(r);
    });
  });
  document.addEventListener("lazyloaded", function(o) {
    $(o.target).parent().addClass("rc--lazyload");
  });
});
export default Ps();
