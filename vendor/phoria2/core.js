// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = 1e-6;
function r() {
	return i(/* @__PURE__ */ new Float32Array(16));
}
function i(e) {
	return e.fill(0), e[0] = e[5] = e[10] = e[15] = 1, e;
}
function a(e, t) {
	let n = t[0], r = t[1], i = t[2], a = t[3], o = t[4], s = t[5], c = t[6], l = t[7], u = t[8], d = t[9], f = t[10], p = t[11], m = t[12], h = t[13], g = t[14], _ = t[15], v = n * s - r * o, y = n * c - i * o, b = n * l - a * o, x = r * c - i * s, S = r * l - a * s, C = i * l - a * c, w = u * h - d * m, T = u * g - f * m, E = u * _ - p * m, D = d * g - f * h, O = d * _ - p * h, k = f * _ - p * g, A = v * k - y * O + b * D + x * E - S * T + C * w;
	return A ? (A = 1 / A, e[0] = (s * k - c * O + l * D) * A, e[1] = (i * O - r * k - a * D) * A, e[2] = (h * C - g * S + _ * x) * A, e[3] = (f * S - d * C - p * x) * A, e[4] = (c * E - o * k - l * T) * A, e[5] = (n * k - i * E + a * T) * A, e[6] = (g * b - m * C - _ * y) * A, e[7] = (u * C - f * b + p * y) * A, e[8] = (o * O - s * E + l * w) * A, e[9] = (r * E - n * O - a * w) * A, e[10] = (m * S - h * b + _ * v) * A, e[11] = (d * b - u * S - p * v) * A, e[12] = (s * T - o * D - c * w) * A, e[13] = (n * D - r * T + i * w) * A, e[14] = (h * y - m * x - g * v) * A, e[15] = (u * x - d * y + f * v) * A, e) : null;
}
function o(e) {
	let t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = n * s - r * o, b = l * m - u * p, x = l * h - d * p, S = u * h - d * m, C = t * S - n * x + r * b, w = a * S - o * x + s * b, T = l * y - u * v + d * _, E = p * y - m * v + h * _;
	return c * C - i * w + g * T - f * E;
}
function s(e, t, n) {
	let r = t[0], i = t[1], a = t[2], o = t[3], s = t[4], c = t[5], l = t[6], u = t[7], d = t[8], f = t[9], p = t[10], m = t[11], h = t[12], g = t[13], _ = t[14], v = t[15];
	for (let t = 0; t < 16; t += 4) {
		let y = n[t], b = n[t + 1], x = n[t + 2], S = n[t + 3];
		e[t] = y * r + b * s + x * d + S * h, e[t + 1] = y * i + b * c + x * f + S * g, e[t + 2] = y * a + b * l + x * p + S * _, e[t + 3] = y * o + b * u + x * m + S * v;
	}
	return e;
}
function c(e, t, n, r, i) {
	let a = 1 / Math.tan(t / 2);
	if (e.fill(0), e[0] = a / n, e[5] = a, e[11] = -1, i != null && i !== Infinity) {
		let t = 1 / (r - i);
		e[10] = (i + r) * t, e[14] = 2 * i * r * t;
	} else e[10] = -1, e[14] = -2 * r;
	return e;
}
function l(e, t, r, a) {
	let o = t[0], s = t[1], c = t[2];
	if (Math.abs(o - r[0]) < n && Math.abs(s - r[1]) < n && Math.abs(c - r[2]) < n) return i(e);
	let l = o - r[0], u = s - r[1], d = c - r[2], f = 1 / Math.hypot(l, u, d);
	l *= f, u *= f, d *= f;
	let p = a[1] * d - a[2] * u, m = a[2] * l - a[0] * d, h = a[0] * u - a[1] * l;
	f = Math.hypot(p, m, h), f ? (f = 1 / f, p *= f, m *= f, h *= f) : p = m = h = 0;
	let g = u * h - d * m, _ = d * p - l * h, v = l * m - u * p;
	return f = Math.hypot(g, _, v), f ? (f = 1 / f, g *= f, _ *= f, v *= f) : g = _ = v = 0, e[0] = p, e[1] = g, e[2] = l, e[3] = 0, e[4] = m, e[5] = _, e[6] = u, e[7] = 0, e[8] = h, e[9] = v, e[10] = d, e[11] = 0, e[12] = -(p * o + m * s + h * c), e[13] = -(g * o + _ * s + v * c), e[14] = -(l * o + u * s + d * c), e[15] = 1, e;
}
function u(e, t, n, r) {
	let i = t[0], a = t[1], o = t[2], s = t[3], c = i + i, l = a + a, u = o + o, d = i * c, f = i * l, p = i * u, m = a * l, h = a * u, g = o * u, _ = s * c, v = s * l, y = s * u, b = r[0], x = r[1], S = r[2];
	return e[0] = (1 - (m + g)) * b, e[1] = (f + y) * b, e[2] = (p - v) * b, e[3] = 0, e[4] = (f - y) * x, e[5] = (1 - (d + g)) * x, e[6] = (h + _) * x, e[7] = 0, e[8] = (p + v) * S, e[9] = (h - _) * S, e[10] = (1 - (d + m)) * S, e[11] = 0, e[12] = n[0], e[13] = n[1], e[14] = n[2], e[15] = 1, e;
}
function d(e, t, n, r, i, a, o) {
	let s = 1 / (t - n), c = 1 / (r - i), l = 1 / (a - o);
	return e.fill(0), e[0] = -2 * s, e[5] = -2 * c, e[10] = 2 * l, e[12] = (t + n) * s, e[13] = (i + r) * c, e[14] = (o + a) * l, e[15] = 1, e;
}
function f(e, t, n, r) {
	let i = t[0], a = t[1], o = t[2], s = i - n[0], c = a - n[1], l = o - n[2], u = s * s + c * c + l * l;
	u > 0 && (u = 1 / Math.sqrt(u), s *= u, c *= u, l *= u);
	let d = r[1] * l - r[2] * c, f = r[2] * s - r[0] * l, p = r[0] * c - r[1] * s;
	return u = d * d + f * f + p * p, u > 0 && (u = 1 / Math.sqrt(u), d *= u, f *= u, p *= u), e[0] = d, e[1] = f, e[2] = p, e[3] = 0, e[4] = c * p - l * f, e[5] = l * d - s * p, e[6] = s * f - c * d, e[7] = 0, e[8] = s, e[9] = c, e[10] = l, e[11] = 0, e[12] = i, e[13] = a, e[14] = o, e[15] = 1, e;
}
// src/math/vec3.js
function p(e, t, n) {
	return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e;
}
function m(e, t, n) {
	return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e;
}
function h(e, t, n) {
	return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e;
}
var g = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
function _(e, t, n) {
	let r = t[0], i = t[1], a = t[2], o = n[0], s = n[1], c = n[2];
	return e[0] = i * c - a * s, e[1] = a * o - r * c, e[2] = r * s - i * o, e;
}
var v = (e) => Math.hypot(e[0], e[1], e[2]), y = (e, t) => Math.hypot(t[0] - e[0], t[1] - e[1], t[2] - e[2]);
function b(e, t) {
	let n = t[0], r = t[1], i = t[2], a = n * n + r * r + i * i;
	return a > 0 && (a = 1 / Math.sqrt(a)), e[0] = n * a, e[1] = r * a, e[2] = i * a, e;
}
function x(e, t, n) {
	let r = t[0], i = t[1], a = t[2], o = n[3] * r + n[7] * i + n[11] * a + n[15] || 1;
	return e[0] = (n[0] * r + n[4] * i + n[8] * a + n[12]) / o, e[1] = (n[1] * r + n[5] * i + n[9] * a + n[13]) / o, e[2] = (n[2] * r + n[6] * i + n[10] * a + n[14]) / o, e;
}
function S(e, t, n) {
	let r = n[0], i = n[1], a = n[2], o = n[3], s = t[0], c = t[1], l = t[2], u = i * l - a * c, d = a * s - r * l, f = r * c - i * s, p = i * f - a * d, m = a * u - r * f, h = r * d - i * u, g = o * 2;
	return u *= g, d *= g, f *= g, p *= 2, m *= 2, h *= 2, e[0] = s + u + p, e[1] = c + d + m, e[2] = l + f + h, e;
}
function C(e, t, n, r) {
	return e[0] = t[0] + r * (n[0] - t[0]), e[1] = t[1] + r * (n[1] - t[1]), e[2] = t[2] + r * (n[2] - t[2]), e;
}
function w(e, t) {
	return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e;
}
// src/validate.js
var T = class extends Error {
	name = "PhoriaError";
};
function E(e, t) {
	throw new T(`${e}: ${t}`);
}
function D(e, t) {
	let n = Array.from({ length: e.length + 1 }, (e, n) => Array.from({ length: t.length + 1 }, (e, t) => n ? t ? 0 : n : t));
	for (let r = 1; r <= e.length; r++) for (let i = 1; i <= t.length; i++) {
		let a = e[r - 1] === t[i - 1] ? 0 : 1;
		n[r][i] = Math.min(n[r - 1][i] + 1, n[r][i - 1] + 1, n[r - 1][i - 1] + a), r > 1 && i > 1 && e[r - 1] === t[i - 2] && e[r - 2] === t[i - 1] && (n[r][i] = Math.min(n[r][i], n[r - 2][i - 2] + 1));
	}
	return n[e.length][t.length];
}
function O(e, t) {
	let n = e.toLowerCase(), r = [...t], i = r.filter((e) => e.toLowerCase().startsWith(n));
	if (i.length === 1) return i[0];
	let a, o = Infinity;
	for (let e of r) {
		let t = e.toLowerCase() === n ? 0 : D(n, e.toLowerCase());
		t < o && (a = e, o = t);
	}
	return o <= Math.max(1, Math.floor(e.length / 3)) ? a : void 0;
}
var k = (e, t) => {
	let n = O(e, t);
	return n ? ` - did you mean '${n}'?` : "";
};
function A(e, t, n, r = {}, i) {
	if (t == null) return;
	let a = new Set(n);
	(typeof t != "object" || Array.isArray(t)) && E(e, `${i ? `'${i}' must be an options object - { ${[...a].join(", ")} }` : "expected an options object"}, got ${j(t)}`);
	for (let n of Object.keys(t)) a.has(n) || (r[n] && E(e, r[n]), E(e, `unknown option '${i ? `${i}.${n}` : n}'${k(n, a)}`));
}
function j(e) {
	return e === null ? "null" : Array.isArray(e) ? `an array of ${e.length}` : typeof e == "string" ? `'${e}'` : typeof e == "object" ? e.constructor?.name && e.constructor !== Object ? `a ${e.constructor.name}` : "an object" : String(e);
}
function M(e, t, n) {
	return (typeof n != "number" || Number.isNaN(n)) && E(e, `'${t}' must be a number, got ${j(n)}`), n;
}
function N(e, t, n, r = -Infinity, i = Infinity, { above: a = !1 } = {}) {
	let o = M(e, t, n);
	return ((a ? !(o > r) : o < r) || o > i) && E(e, `'${t}' must be ${i === Infinity ? a ? `above ${r}` : `${r} or more` : a ? `above ${r} and up to ${i}` : `from ${r} to ${i}`}, got ${o}`), o;
}
function P(e, t, n, r) {
	if (!r.includes(n)) {
		let i = typeof n == "string" ? k(n, r) : "";
		E(e, `'${t}' ${j(n)} is not valid - expected ${r.map((e) => `'${e}'`).join(" | ")}${i}`);
	}
	return n;
}
var ee = /* @__PURE__ */ new WeakMap();
function F(e, t) {
	let n = ee.get(e);
	n || ee.set(e, n = /* @__PURE__ */ new Set()), !n.has(t) && (n.add(t), console.warn(`phoria2: ${t}`));
}
function I(e, t, n, r, i) {
	let a = typeof t == "number" && r ? r(t) : t;
	return A(e, a, n, i), a ?? {};
}
function L(e, t, n, r, i = !1) {
	if (n === void 0) return r;
	let a = M(e, t, n);
	return (!Number.isFinite(a) || a < 0 || a === 0 && !i) && E(e, `'${t}' must be ${i ? "0 or more" : "more than 0"}, got ${a}`), a;
}
function R(e, t, n, r, i = 1, a = Infinity) {
	return n === void 0 ? r : ((!Number.isInteger(n) || n < i || n > a) && E(e, `'${t}' must be a whole number ${a === Infinity ? `${i} or more` : `from ${i} to ${a}`}, got ${j(n)}`), n);
}
// src/value/Vec3.js
var z = class e extends Float32Array {
	static get [Symbol.species]() {
		return Float32Array;
	}
	constructor(e = 0, t = 0, n = 0) {
		super(3), this[0] = e, this[1] = t, this[2] = n;
	}
	static fromInput(t, n = "Vec3") {
		return new e().copy(t, n);
	}
	get x() {
		return this[0];
	}
	set x(e) {
		this[0] = e;
	}
	get y() {
		return this[1];
	}
	set y(e) {
		this[1] = e;
	}
	get z() {
		return this[2];
	}
	set z(e) {
		this[2] = e;
	}
	set(e, t, n) {
		if (typeof e != "number") super.set(e, t ?? 0);
		else return this[0] = e, this[1] = t ?? this[1], this[2] = n ?? this[2], this;
	}
	setScalar(e) {
		return this[0] = this[1] = this[2] = M("Vec3", "setScalar", e), this;
	}
	copy(e, t = "Vec3") {
		return typeof e == "number" ? this[0] = this[1] = this[2] = e : e && (Array.isArray(e) || ArrayBuffer.isView(e)) && e.length >= 3 ? (this[0] = e[0], this[1] = e[1], this[2] = e[2]) : e && typeof e == "object" && "x" in e && "y" in e && "z" in e ? (this[0] = e.x, this[1] = e.y, this[2] = e.z) : E(t, `expected [x, y, z] or { x, y, z }, got ${j(e)}`), Number.isNaN(this[0] + this[1] + this[2]) && E(t, `vector components must be numbers, got ${j(e)}`), this;
	}
	clone() {
		return new e(this[0], this[1], this[2]);
	}
	add(e) {
		let t = te(e);
		return p(this, this, t);
	}
	sub(e) {
		return m(this, this, te(e));
	}
	multiplyScalar(e) {
		return h(this, this, e);
	}
	normalize() {
		return b(this, this);
	}
	negate() {
		return w(this, this);
	}
	lerp(e, t) {
		return C(this, this, te(e), t);
	}
	cross(e) {
		return _(this, this, te(e));
	}
	dot(e) {
		return g(this, te(e));
	}
	len() {
		return v(this);
	}
	distanceTo(e) {
		return y(this, te(e));
	}
	applyMatrix4(e) {
		return x(this, this, e);
	}
	applyQuaternion(e) {
		return S(this, this, e);
	}
	equals(e, t = 0) {
		let n = te(e);
		return Math.abs(this[0] - n[0]) <= t && Math.abs(this[1] - n[1]) <= t && Math.abs(this[2] - n[2]) <= t;
	}
	toArray() {
		return [
			this[0],
			this[1],
			this[2]
		];
	}
	toJSON() {
		return this.toArray();
	}
};
function te(e) {
	return Array.isArray(e) || ArrayBuffer.isView(e) ? e : z.fromInput(e);
}
// src/value/Mat4.js
var B = class e extends Float32Array {
	static get [Symbol.species]() {
		return Float32Array;
	}
	constructor() {
		super(16), this[0] = this[5] = this[10] = this[15] = 1;
	}
	identity() {
		return i(this);
	}
	copy(e) {
		for (let t = 0; t < 16; t++) this[t] = e[t];
		return this;
	}
	clone() {
		return new e().copy(this);
	}
	multiply(e) {
		return s(this, this, e);
	}
	multiplyMatrices(e, t) {
		return s(this, e, t);
	}
	invert() {
		return a(this, this) || this.fill(0), this;
	}
	compose(e, t, n) {
		return u(this, t, e, n);
	}
	getPosition(e = new z()) {
		return e.set(this[12], this[13], this[14]);
	}
	getScale(e = new z()) {
		return e.set(Math.hypot(this[0], this[1], this[2]), Math.hypot(this[4], this[5], this[6]), Math.hypot(this[8], this[9], this[10]));
	}
	toArray() {
		return Array.from(this);
	}
}, V = class e {
	min = new z(Infinity, Infinity, Infinity);
	max = new z(-Infinity, -Infinity, -Infinity);
	constructor(e, t) {
		e && this.min.set(e[0], e[1], e[2]), t && this.max.set(t[0], t[1], t[2]);
	}
	makeEmpty() {
		return this.min.set(Infinity, Infinity, Infinity), this.max.set(-Infinity, -Infinity, -Infinity), this;
	}
	isEmpty() {
		return this.max[0] < this.min[0] || this.max[1] < this.min[1] || this.max[2] < this.min[2];
	}
	expandByXYZ(e, t, n) {
		let { min: r, max: i } = this;
		return e < r[0] && (r[0] = e), t < r[1] && (r[1] = t), n < r[2] && (r[2] = n), e > i[0] && (i[0] = e), t > i[1] && (i[1] = t), n > i[2] && (i[2] = n), this;
	}
	expandByPoint(e) {
		return this.expandByXYZ(e[0], e[1], e[2]);
	}
	expandByPositions(e) {
		for (let t = 0; t < e.length; t += 3) this.expandByXYZ(e[t], e[t + 1], e[t + 2]);
		return this;
	}
	union(e) {
		return e.isEmpty() ? this : (this.expandByPoint(e.min), this.expandByPoint(e.max));
	}
	applyMatrix4(e) {
		if (this.isEmpty()) return this;
		let [t, n, r] = this.min, [i, a, o] = this.max;
		this.makeEmpty();
		for (let s of [t, i]) for (let t of [n, a]) for (let n of [r, o]) this.expandByXYZ(e[0] * s + e[4] * t + e[8] * n + e[12], e[1] * s + e[5] * t + e[9] * n + e[13], e[2] * s + e[6] * t + e[10] * n + e[14]);
		return this;
	}
	getCenter(e = new z()) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.set((this.min[0] + this.max[0]) / 2, (this.min[1] + this.max[1]) / 2, (this.min[2] + this.max[2]) / 2);
	}
	getSize(e = new z()) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.set(this.max[0] - this.min[0], this.max[1] - this.min[1], this.max[2] - this.min[2]);
	}
	getRadius() {
		return this.isEmpty() ? 0 : this.getSize().len() / 2;
	}
	containsPoint(e) {
		return e[0] >= this.min[0] && e[0] <= this.max[0] && e[1] >= this.min[1] && e[1] <= this.max[1] && e[2] >= this.min[2] && e[2] <= this.max[2];
	}
	clone() {
		return new e(this.min, this.max);
	}
	copy(e) {
		return this.min.set(e.min[0], e.min[1], e.min[2]), this.max.set(e.max[0], e.max[1], e.max[2]), this;
	}
}, ne = 2048;
function re(e, t, n, i = ne, a = null) {
	let o = t.filter((e) => !e.isEmpty());
	if (!o.length) return null;
	let c = ue(e), u = Math.abs(c[1]) > .99 ? [
		0,
		0,
		1
	] : [
		0,
		1,
		0
	], f = l(r(), [
		0,
		0,
		0
	], c, u), p = Infinity, m = -Infinity, h = Infinity, g = -Infinity, _ = Infinity, v = -Infinity, y = (e, t) => {
		for (let n = 0; n < 8; n++) {
			let r = n & 1 ? e.max[0] : e.min[0], i = n & 2 ? e.max[1] : e.min[1], a = n & 4 ? e.max[2] : e.min[2], o = f[0] * r + f[4] * i + f[8] * a, s = f[1] * r + f[5] * i + f[9] * a, c = f[2] * r + f[6] * i + f[10] * a;
			t && (o < p && (p = o), o > m && (m = o), s < h && (h = s), s > g && (g = s)), c < _ && (_ = c), c > v && (v = c);
		}
	};
	a && y(a, !0);
	for (let e of o) y(e, !a);
	for (let e of n) e.isEmpty() || y(e, !1);
	let b = Math.max(m - p, g - h, .001) * .02;
	p -= b, m += b, h -= b, g += b;
	let x = Math.max(v - _, .001) * .01;
	_ -= x, v += x;
	let S = ie(m - p), C = ie(g - h), w = S / i, T = C / i;
	p = Math.floor((p + m - S) / 2 / w) * w, h = Math.floor((h + g - C) / 2 / T) * T;
	let E = ie(v - _) / 64;
	_ = Math.floor(_ / E) * E, v = Math.ceil(v / E) * E;
	let D = d(r(), p, p + S, h, h + C, -v, -_), O = new B();
	return s(O, D, f), {
		viewProjection: O,
		texelSize: Math.max(S, C) / i
	};
}
function ie(e) {
	return 2 ** (Math.ceil(Math.log2(Math.max(e, .001)) * 16) / 16);
}
var ae = 2048;
function oe(e, t, n, i, a, o) {
	let u = a.filter((e) => !e.isEmpty());
	if (!u.length) return null;
	let d = ue(t), f = Math.abs(d[1]) > .99 ? [
		0,
		0,
		1
	] : [
		0,
		1,
		0
	], p = Float32Array.from(e), m = Float32Array.from([
		e[0] + d[0],
		e[1] + d[1],
		e[2] + d[2]
	]), h = l(r(), p, m, Float32Array.from(f)), g = Infinity, _ = 0, v = (e, t) => {
		for (let n = 0; n < 8; n++) {
			let r = n & 1 ? e.max[0] : e.min[0], i = n & 2 ? e.max[1] : e.min[1], a = n & 4 ? e.max[2] : e.min[2], o = -(h[2] * r + h[6] * i + h[10] * a + h[14]);
			t && o < g && (g = o), o > _ && (_ = o);
		}
	};
	for (let e of u) v(e, !0);
	for (let e of o) e.isEmpty() || v(e, !1);
	g = Math.max(.05, g * .9), i > 0 && (_ = Math.min(_, i)), _ = Math.max(_ * 1.02, g * 2);
	let y = Math.min(2 * n * 1.1 + .05, Math.PI * .95), b = c(r(), y, 1, g, _), x = new B();
	return s(x, b, h), {
		viewProjection: x,
		texelAngle: 2 * Math.tan(y / 2) / (ae / 2)
	};
}
var se = 1024, ce = [
	[[
		1,
		0,
		0
	], [
		0,
		-1,
		0
	]],
	[[
		-1,
		0,
		0
	], [
		0,
		-1,
		0
	]],
	[[
		0,
		1,
		0
	], [
		0,
		0,
		1
	]],
	[[
		0,
		-1,
		0
	], [
		0,
		0,
		-1
	]],
	[[
		0,
		0,
		1
	], [
		0,
		-1,
		0
	]],
	[[
		0,
		0,
		-1
	], [
		0,
		-1,
		0
	]]
];
function le(e, t, n, i) {
	let a = n.filter((e) => !e.isEmpty());
	if (!a.length) return null;
	let o = 0;
	for (let t of [...a, ...i]) if (!t.isEmpty()) for (let n = 0; n < 8; n++) {
		let r = (n & 1 ? t.max[0] : t.min[0]) - e[0], i = (n & 2 ? t.max[1] : t.min[1]) - e[1], a = (n & 4 ? t.max[2] : t.min[2]) - e[2];
		o = Math.max(o, Math.hypot(r, i, a));
	}
	t > 0 && (o = Math.min(o, t)), o = Math.max(o * 1.02, .001);
	let u = o * .002, d = c(r(), Math.PI / 2, 1, u, o), f = Float32Array.from(e);
	return {
		viewProjections: ce.map(([e, t]) => {
			let n = Float32Array.from([
				f[0] + e[0],
				f[1] + e[1],
				f[2] + e[2]
			]), i = l(r(), f, n, Float32Array.from(t));
			return s(new B(), d, i);
		}),
		near: u,
		far: o,
		texelAngle: 2 / se
	};
}
function ue(e) {
	let t = Math.hypot(e[0], e[1], e[2]) || 1;
	return [
		e[0] / t,
		e[1] / t,
		e[2] / t
	];
}
var de = new Map("aliceblue:f0f8ff,antiquewhite:faebd7,aqua:00ffff,aquamarine:7fffd4,azure:f0ffff,beige:f5f5dc,bisque:ffe4c4,black:000000,blanchedalmond:ffebcd,blue:0000ff,blueviolet:8a2be2,brown:a52a2a,burlywood:deb887,cadetblue:5f9ea0,chartreuse:7fff00,chocolate:d2691e,coral:ff7f50,cornflowerblue:6495ed,cornsilk:fff8dc,crimson:dc143c,cyan:00ffff,darkblue:00008b,darkcyan:008b8b,darkgoldenrod:b8860b,darkgray:a9a9a9,darkgreen:006400,darkgrey:a9a9a9,darkkhaki:bdb76b,darkmagenta:8b008b,darkolivegreen:556b2f,darkorange:ff8c00,darkorchid:9932cc,darkred:8b0000,darksalmon:e9967a,darkseagreen:8fbc8f,darkslateblue:483d8b,darkslategray:2f4f4f,darkslategrey:2f4f4f,darkturquoise:00ced1,darkviolet:9400d3,deeppink:ff1493,deepskyblue:00bfff,dimgray:696969,dimgrey:696969,dodgerblue:1e90ff,firebrick:b22222,floralwhite:fffaf0,forestgreen:228b22,fuchsia:ff00ff,gainsboro:dcdcdc,ghostwhite:f8f8ff,gold:ffd700,goldenrod:daa520,gray:808080,green:008000,greenyellow:adff2f,grey:808080,honeydew:f0fff0,hotpink:ff69b4,indianred:cd5c5c,indigo:4b0082,ivory:fffff0,khaki:f0e68c,lavender:e6e6fa,lavenderblush:fff0f5,lawngreen:7cfc00,lemonchiffon:fffacd,lightblue:add8e6,lightcoral:f08080,lightcyan:e0ffff,lightgoldenrodyellow:fafad2,lightgray:d3d3d3,lightgreen:90ee90,lightgrey:d3d3d3,lightpink:ffb6c1,lightsalmon:ffa07a,lightseagreen:20b2aa,lightskyblue:87cefa,lightslategray:778899,lightslategrey:778899,lightsteelblue:b0c4de,lightyellow:ffffe0,lime:00ff00,limegreen:32cd32,linen:faf0e6,magenta:ff00ff,maroon:800000,mediumaquamarine:66cdaa,mediumblue:0000cd,mediumorchid:ba55d3,mediumpurple:9370db,mediumseagreen:3cb371,mediumslateblue:7b68ee,mediumspringgreen:00fa9a,mediumturquoise:48d1cc,mediumvioletred:c71585,midnightblue:191970,mintcream:f5fffa,mistyrose:ffe4e1,moccasin:ffe4b5,navajowhite:ffdead,navy:000080,oldlace:fdf5e6,olive:808000,olivedrab:6b8e23,orange:ffa500,orangered:ff4500,orchid:da70d6,palegoldenrod:eee8aa,palegreen:98fb98,paleturquoise:afeeee,palevioletred:db7093,papayawhip:ffefd5,peachpuff:ffdab9,peru:cd853f,pink:ffc0cb,plum:dda0dd,powderblue:b0e0e6,purple:800080,rebeccapurple:663399,red:ff0000,rosybrown:bc8f8f,royalblue:4169e1,saddlebrown:8b4513,salmon:fa8072,sandybrown:f4a460,seagreen:2e8b57,seashell:fff5ee,sienna:a0522d,silver:c0c0c0,skyblue:87ceeb,slateblue:6a5acd,slategray:708090,slategrey:708090,snow:fffafa,springgreen:00ff7f,steelblue:4682b4,tan:d2b48c,teal:008080,thistle:d8bfd8,tomato:ff6347,turquoise:40e0d0,violet:ee82ee,wheat:f5deb3,white:ffffff,whitesmoke:f5f5f5,yellow:ffff00,yellowgreen:9acd32".split(",").map((e) => {
	let [t, n] = e.split(":");
	return [t, parseInt(n, 16)];
})), fe = (e) => e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4, pe = (e) => e <= .0031308 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - .055, me = (e) => Math.min(1, Math.max(0, e)), he = String.raw`[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?`, ge = new RegExp(String.raw`^(rgba?|hsla?)\(\s*(${he})(%|deg)?[\s,]+(${he})(%)?[\s,]+(${he})(%)?(?:\s*[,/]\s*(${he})%?)?\s*\)$`, "i"), _e = "use '#rrggbb', a CSS name, 'rgb(...)', 'hsl(...)', 0xrrggbb or [r, g, b] with components 0-1", ve = /* @__PURE__ */ new Map(), ye = 1024, H = class e extends Float32Array {
	static get [Symbol.species]() {
		return Float32Array;
	}
	constructor(e = 16777215) {
		super(3), this.set(e);
	}
	static fromInput(t, n = "Color") {
		return new e().set(t, n);
	}
	get r() {
		return this[0];
	}
	set r(e) {
		this[0] = e;
	}
	get g() {
		return this[1];
	}
	set g(e) {
		this[1] = e;
	}
	get b() {
		return this[2];
	}
	set b(e) {
		this[2] = e;
	}
	set(t, n = "Color") {
		if (typeof n == "number") super.set(t, n);
		else {
			if (t instanceof e) this[0] = t[0], this[1] = t[1], this[2] = t[2];
			else if (typeof t == "number") this.#e(t, n);
			else if (typeof t == "string") this.#t(t.trim(), n);
			else if (Array.isArray(t) || ArrayBuffer.isView(t)) {
				let e = t;
				e.length < 3 && E(n, `color ${j(t)} needs 3 components [r, g, b]`);
				let r = e[0], i = e[1], a = e[2];
				[
					r,
					i,
					a
				].some((e) => typeof e != "number" || Number.isNaN(e)) && E(n, `color components must be numbers - ${_e}`), (r > 1 || i > 1 || a > 1) && E(n, `color [${r}, ${i}, ${a}] has components above 1 - components are 0-1, e.g. [${+(r / 255).toFixed(3)}, ${+(i / 255).toFixed(3)}, ${+(a / 255).toFixed(3)}]`), this.setSRGB(r, i, a);
			} else E(n, `${j(t)} is not a colour - ${_e}`);
			return this;
		}
	}
	setSRGB(e, t, n) {
		return this[0] = fe(e), this[1] = fe(t), this[2] = fe(n), this;
	}
	setLinear(e, t, n) {
		return this[0] = e, this[1] = t, this[2] = n, this;
	}
	clone() {
		return new e(this);
	}
	multiplyScalar(e) {
		return this[0] *= e, this[1] *= e, this[2] *= e, this;
	}
	lerp(t, n) {
		let r = t instanceof e ? t : e.fromInput(t);
		return this[0] += (r[0] - this[0]) * n, this[1] += (r[1] - this[1]) * n, this[2] += (r[2] - this[2]) * n, this;
	}
	toSRGB() {
		return [
			me(pe(this[0])),
			me(pe(this[1])),
			me(pe(this[2]))
		];
	}
	getHex() {
		let [e, t, n] = this.toSRGB();
		return Math.round(e * 255) << 16 | Math.round(t * 255) << 8 | Math.round(n * 255);
	}
	getStyle() {
		return "#" + this.getHex().toString(16).padStart(6, "0");
	}
	equals(e, t = 1e-6) {
		return Math.abs(this[0] - e[0]) <= t && Math.abs(this[1] - e[1]) <= t && Math.abs(this[2] - e[2]) <= t;
	}
	toJSON() {
		return this.getStyle();
	}
	#e(e, t) {
		(!Number.isInteger(e) || e < 0 || e > 16777215) && E(t, `color ${e} is not 0x000000-0xffffff - ${_e}`), this.setSRGB((e >> 16 & 255) / 255, (e >> 8 & 255) / 255, (e & 255) / 255);
	}
	#t(e, t) {
		let n = ve.get(e);
		n ? (this[0] = n[0], this[1] = n[1], this[2] = n[2]) : (this.#n(e, t), ve.size >= ye && ve.clear(), ve.set(e, [
			this[0],
			this[1],
			this[2]
		]));
	}
	#n(e, t) {
		let n = e.toLowerCase();
		if (n.startsWith("#")) {
			let r = n.slice(1);
			/^[0-9a-f]{3,4}$/.test(r) ? r = [...r.slice(0, 3)].map((e) => e + e).join("") : /^[0-9a-f]{8}$/.test(r) && (r = r.slice(0, 6)), /^[0-9a-f]{6}$/.test(r) || E(t, `color '${e}' is not a valid hex colour - ${_e}`), this.#e(parseInt(r, 16), t);
			return;
		}
		let r = de.get(n);
		if (r !== void 0) {
			this.#e(r, t);
			return;
		}
		let i = ge.exec(e);
		i || E(t, `'${e}' is not a colour${k(n, de.keys())} - ${_e}`);
		let [, a, o, s, c, l, u, d] = i;
		if (a.toLowerCase().startsWith("rgb")) {
			let e = (e, t) => me(t === "%" ? e / 100 : e / 255);
			this.setSRGB(e(o, s), e(c, l), e(u, d));
		} else {
			let e = (o % 360 + 360) % 360 / 360, t = me(c / 100), n = me(u / 100), r = n < .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r, a = (e) => (e = (e + 1) % 1, e < 1 / 6 ? i + (r - i) * 6 * e : e < 1 / 2 ? r : e < 2 / 3 ? i + (r - i) * (2 / 3 - e) * 6 : i);
			this.setSRGB(a(e + 1 / 3), a(e), a(e - 1 / 3));
		}
	}
}, be = [
	"normal",
	"offset",
	"cap"
], xe = {
	constant: "use 'offset' for how far along the normal the plane is",
	distance: "use 'offset' for how far along the normal the plane is",
	plane: "give the plane as 'normal' and 'offset'",
	color: "use 'cap' for the colour of the cut faces",
	capColor: "use 'cap' for the colour of the cut faces"
}, Se = class e {
	normal = new z(0, 0, 1);
	offset = 0;
	cap = null;
	constructor(e = {}) {
		A("clip", e, be, xe), e.normal !== void 0 && this.normal.copy(e.normal, "clip"), Math.hypot(this.normal[0], this.normal[1], this.normal[2]) > 0 || E("clip", "'normal' can't be [0, 0, 0] - it says which side is cut away"), e.offset !== void 0 && (this.offset = M("clip", "offset", e.offset)), e.cap != null && (this.cap = H.fromInput(e.cap, "clip"));
	}
	static fromInput(t, n = "clip") {
		return t instanceof e ? t : ((!t || typeof t != "object" || Array.isArray(t)) && E(n, `'clip' must be { normal, offset, cap } or null, got ${j(t)}`), new e(t));
	}
	toJSON() {
		let e = {
			normal: this.normal.toArray(),
			offset: this.offset
		};
		return this.cap && (e.cap = this.cap.getStyle()), e;
	}
};
function Ce(e, t = /* @__PURE__ */ new Float32Array(4)) {
	let n = e.clip, r = e.worldMatrix, [i, a, o] = n.normal, s = Math.hypot(i, a, o), c = i / s, l = a / s, u = o / s, d = c * n.offset, f = l * n.offset, p = u * n.offset, m = r[0] * d + r[4] * f + r[8] * p + r[12], h = r[1] * d + r[5] * f + r[9] * p + r[13], g = r[2] * d + r[6] * f + r[10] * p + r[14], _ = [
		r[5] * r[10] - r[6] * r[9],
		r[6] * r[8] - r[4] * r[10],
		r[4] * r[9] - r[5] * r[8]
	], v = [
		r[2] * r[9] - r[1] * r[10],
		r[0] * r[10] - r[2] * r[8],
		r[1] * r[8] - r[0] * r[9]
	], y = [
		r[1] * r[6] - r[2] * r[5],
		r[2] * r[4] - r[0] * r[6],
		r[0] * r[5] - r[1] * r[4]
	], b = _[0] * c + v[0] * l + y[0] * u, x = _[1] * c + v[1] * l + y[1] * u, S = _[2] * c + v[2] * l + y[2] * u, C = (r[0] * _[0] + r[4] * v[0] + r[8] * y[0] < 0 ? -1 : 1) / (Math.hypot(b, x, S) || 1);
	return b *= C, x *= C, S *= C, t[0] = b, t[1] = x, t[2] = S, t[3] = -(b * m + x * h + S * g), t;
}
function we(e) {
	for (let t = e; t; t = t.parent) if (t.clip) return t;
	return null;
}
// src/value/Euler.js
var Te = class e {
	#e = 0;
	#t = 0;
	#n = 0;
	get order() {
		return "XYZ";
	}
	onChange = null;
	constructor(e = 0, t = 0, n = 0) {
		this.#e = e, this.#t = t, this.#n = n;
	}
	get x() {
		return this.#e;
	}
	set x(e) {
		this.#e = e, this.onChange?.();
	}
	get y() {
		return this.#t;
	}
	set y(e) {
		this.#t = e, this.onChange?.();
	}
	get z() {
		return this.#n;
	}
	set z(e) {
		this.#n = e, this.onChange?.();
	}
	set(e, t, n) {
		return this.#e = e, this.#t = t, this.#n = n, this.onChange?.(), this;
	}
	copy(t, n = "Euler") {
		return t instanceof e ? this.set(t.x, t.y, t.z) : (t && typeof t == "object" && t.length >= 3 || E(n, `expected rotation angles [x, y, z] in radians, got ${j(t)}`), this.set(t[0], t[1], t[2]));
	}
	clone() {
		return new e(this.#e, this.#t, this.#n);
	}
	setFromQuat(e) {
		let t = e[0], n = e[1], r = e[2], i = e[3], a = 1 - 2 * (n * n + r * r), o = 2 * (t * n - r * i), s = 2 * (t * r + n * i), c = 1 - 2 * (t * t + r * r), l = 2 * (n * r - t * i), u = 2 * (n * r + t * i), d = 1 - 2 * (t * t + n * n);
		return this.#t = Math.asin(Math.min(1, Math.max(-1, s))), Math.abs(s) < .9999999 ? (this.#e = Math.atan2(-l, d), this.#n = Math.atan2(-o, a)) : (this.#e = Math.atan2(u, c), this.#n = 0), this;
	}
	toArray() {
		return [
			this.#e,
			this.#t,
			this.#n
		];
	}
	toJSON() {
		return this.toArray();
	}
	*[Symbol.iterator]() {
		yield this.#e, yield this.#t, yield this.#n;
	}
};
// src/math/quat.js
function Ee(e, t, n) {
	let r = Math.sin(n * .5);
	return e[0] = r * t[0], e[1] = r * t[1], e[2] = r * t[2], e[3] = Math.cos(n * .5), e;
}
function De(e, t, n) {
	let r = t[0], i = t[1], a = t[2], o = t[3], s = n[0], c = n[1], l = n[2], u = n[3];
	return e[0] = r * u + o * s + i * l - a * c, e[1] = i * u + o * c + a * s - r * l, e[2] = a * u + o * l + r * c - i * s, e[3] = o * u - r * s - i * c - a * l, e;
}
function Oe(e, t) {
	let n = t[0], r = t[1], i = t[2], a = t[3], o = n * n + r * r + i * i + a * a;
	return o > 0 && (o = 1 / Math.sqrt(o)), e[0] = n * o, e[1] = r * o, e[2] = i * o, e[3] = a * o, e;
}
function ke(e, t) {
	let n = t[0], r = t[1], i = t[2], a = t[3], o = n * n + r * r + i * i + a * a, s = o ? 1 / o : 0;
	return e[0] = -n * s, e[1] = -r * s, e[2] = -i * s, e[3] = a * s, e;
}
function Ae(e, t, n, r) {
	let i = t[0], a = t[1], o = t[2], s = t[3], c = n[0], l = n[1], u = n[2], d = n[3], f = i * c + a * l + o * u + s * d;
	f < 0 && (f = -f, c = -c, l = -l, u = -u, d = -d);
	let p = 1 - r, m = r;
	if (1 - f > 1e-6) {
		let e = Math.acos(f), t = Math.sin(e);
		p = Math.sin((1 - r) * e) / t, m = Math.sin(r * e) / t;
	}
	return e[0] = p * i + m * c, e[1] = p * a + m * l, e[2] = p * o + m * u, e[3] = p * s + m * d, e;
}
function je(e, t) {
	let n = t[0] + t[4] + t[8];
	if (n > 0) {
		let r = Math.sqrt(n + 1);
		e[3] = .5 * r, r = .5 / r, e[0] = (t[5] - t[7]) * r, e[1] = (t[6] - t[2]) * r, e[2] = (t[1] - t[3]) * r;
	} else {
		let n = 0;
		t[4] > t[0] && (n = 1), t[8] > t[n * 3 + n] && (n = 2);
		let r = (n + 1) % 3, i = (n + 2) % 3, a = Math.sqrt(t[n * 3 + n] - t[r * 3 + r] - t[i * 3 + i] + 1);
		e[n] = .5 * a, a = .5 / a, e[3] = (t[r * 3 + i] - t[i * 3 + r]) * a, e[r] = (t[r * 3 + n] + t[n * 3 + r]) * a, e[i] = (t[i * 3 + n] + t[n * 3 + i]) * a;
	}
	return e;
}
function Me(e, t, n, r) {
	let i = Math.cos(t / 2), a = Math.cos(n / 2), o = Math.cos(r / 2), s = Math.sin(t / 2), c = Math.sin(n / 2), l = Math.sin(r / 2);
	return e[0] = s * a * o + i * c * l, e[1] = i * c * o - s * a * l, e[2] = i * a * l + s * c * o, e[3] = i * a * o - s * c * l, e;
}
// src/value/Quat.js
var Ne = class e extends Float32Array {
	static get [Symbol.species]() {
		return Float32Array;
	}
	onChange = null;
	constructor(e = 0, t = 0, n = 0, r = 1) {
		super(4), this[0] = e, this[1] = t, this[2] = n, this[3] = r;
	}
	get x() {
		return this[0];
	}
	set x(e) {
		this[0] = e, this.changed();
	}
	get y() {
		return this[1];
	}
	set y(e) {
		this[1] = e, this.changed();
	}
	get z() {
		return this[2];
	}
	set z(e) {
		this[2] = e, this.changed();
	}
	get w() {
		return this[3];
	}
	set w(e) {
		this[3] = e, this.changed();
	}
	changed() {
		return this.onChange?.(), this;
	}
	set(e, t, n, r) {
		if (typeof e != "number") super.set(e, t ?? 0), this.changed();
		else return this[0] = e, this[1] = t, this[2] = n, this[3] = r, this.changed();
	}
	copy(e, t = "Quat") {
		let n = e;
		return n && typeof n == "object" && n.length >= 4 ? (this[0] = n[0], this[1] = n[1], this[2] = n[2], this[3] = n[3]) : n && typeof n == "object" && "x" in n && "y" in n && "z" in n && "w" in n ? (this[0] = n.x, this[1] = n.y, this[2] = n.z, this[3] = n.w) : E(t, `expected a quaternion [x, y, z, w] or { x, y, z, w }, got ${j(e)}`), this.changed();
	}
	clone() {
		return new e(this[0], this[1], this[2], this[3]);
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	setFromEuler(e, t, n) {
		return Me(this, e, t, n), this.changed();
	}
	setFromAxisAngle(e, t) {
		return Ee(this, e, t), this.changed();
	}
	multiply(e) {
		return De(this, this, e), this.changed();
	}
	premultiply(e) {
		return De(this, e, this), this.changed();
	}
	normalize() {
		return Oe(this, this), this.changed();
	}
	invert() {
		return ke(this, this), this.changed();
	}
	slerp(e, t) {
		return Ae(this, this, e, t), this.changed();
	}
	toArray() {
		return [
			this[0],
			this[1],
			this[2],
			this[3]
		];
	}
	toJSON() {
		return this.toArray();
	}
}, Pe = [
	"positions",
	"normals",
	"uvs",
	"uvs2",
	"colors",
	"indices"
], U = class e {
	static OPTIONS = Pe;
	positions;
	uvs = null;
	uvs2 = null;
	colors = null;
	indices = null;
	version = 0;
	drawCount = null;
	source = null;
	#e = null;
	#t = !1;
	#n = null;
	#r = /* @__PURE__ */ new Set();
	constructor(e) {
		A("Geometry", e, Pe), e?.positions || E("Geometry", "'positions' is required - an array of x, y, z per vertex"), this.positions = Fe("positions", e.positions, 3);
		let t = this.vertexCount;
		if (e.normals && (this.#e = Fe("normals", e.normals, 3, t)), e.uvs && (this.uvs = Fe("uvs", e.uvs, 2, t)), e.uvs2 && (this.uvs2 = Fe("uvs2", e.uvs2, 2, t)), e.colors && (this.colors = Fe("colors", e.colors, 3, t)), e.indices) {
			let n = -1;
			for (let t = 0; t < e.indices.length; t++) {
				let r = e.indices[t];
				(!Number.isInteger(r) || r < 0) && E("Geometry", `'indices' must be whole numbers 0 or more, found ${j(r)} at ${t}`), r > n && (n = r);
			}
			n >= t && E("Geometry", `'indices' refers to vertex ${n} but there are only ${t} vertices`), this.indices = t > 65535 ? Uint32Array.from(e.indices) : Uint16Array.from(e.indices);
		}
	}
	get normals() {
		return this.#e || (this.computeNormals(), this.#t = !0), this.#e;
	}
	set normals(e) {
		this.#e = e, this.#t = !1;
	}
	get hasNormals() {
		return this.#e !== null;
	}
	get vertexCount() {
		return this.positions.length / 3;
	}
	get elementCount() {
		return this.indices ? this.indices.length : this.vertexCount;
	}
	get drawnCount() {
		return this.drawCount === null ? this.elementCount : Math.max(0, Math.min(this.drawCount, this.elementCount));
	}
	get drawnVertices() {
		return this.drawCount === null ? this.vertexCount : Math.max(0, Math.min(this.drawCount, this.vertexCount));
	}
	get bounds() {
		return this.#n ??= new V().expandByPositions(this.positions);
	}
	needsUpdate() {
		return this.source = null, this.#t && (this.#e = null), this.#i();
	}
	#i() {
		return this.version++, this.#n = null, this;
	}
	computeNormals({ flat: e = !1 } = {}) {
		e && this.indices && this.#o();
		let t = this.positions, n = new Float32Array(t.length), r = this.elementCount - this.elementCount % 3;
		for (let e = 0; e < r; e += 3) {
			let r = this.#a(e), i = this.#a(e + 1), a = this.#a(e + 2), o = t[i * 3] - t[r * 3], s = t[i * 3 + 1] - t[r * 3 + 1], c = t[i * 3 + 2] - t[r * 3 + 2], l = t[a * 3] - t[r * 3], u = t[a * 3 + 1] - t[r * 3 + 1], d = t[a * 3 + 2] - t[r * 3 + 2], f = s * d - c * u, p = c * l - o * d, m = o * u - s * l;
			for (let e of [
				r,
				i,
				a
			]) n[e * 3] += f, n[e * 3 + 1] += p, n[e * 3 + 2] += m;
		}
		for (let e = 0; e < n.length; e += 3) {
			let t = Math.hypot(n[e], n[e + 1], n[e + 2]);
			t > 0 && (n[e] /= t, n[e + 1] /= t, n[e + 2] /= t);
		}
		return this.normals = n, this.#i();
	}
	clone() {
		let t = new e({
			positions: this.positions,
			normals: this.#e ?? void 0,
			uvs: this.uvs ?? void 0,
			uvs2: this.uvs2 ?? void 0,
			colors: this.colors ?? void 0,
			indices: this.indices ?? void 0
		});
		return t.source = this.source && { ...this.source }, t.drawCount = this.drawCount, t;
	}
	dispose() {
		for (let e of this.#r) e();
	}
	onDispose(e) {
		return this.#r.add(e), () => this.#r.delete(e);
	}
	toJSON() {
		if (this.source) return { ...this.source };
		let e = { positions: Array.from(this.positions) };
		return this.#e && (e.normals = Array.from(this.#e)), this.uvs && (e.uvs = Array.from(this.uvs)), this.uvs2 && (e.uvs2 = Array.from(this.uvs2)), this.colors && (e.colors = Array.from(this.colors)), this.indices && (e.indices = Array.from(this.indices)), e;
	}
	#a(e) {
		return this.indices ? this.indices[e] : e;
	}
	#o() {
		let e = this.indices, t = (t, n) => {
			if (!t) return null;
			let r = new Float32Array(e.length * n);
			for (let i = 0; i < e.length; i++) for (let a = 0; a < n; a++) r[i * n + a] = t[e[i] * n + a];
			return r;
		};
		this.positions = t(this.positions, 3), this.uvs = t(this.uvs, 2), this.uvs2 = t(this.uvs2, 2), this.colors = t(this.colors, 3), this.indices = null, this.source = null;
	}
};
function Fe(e, t, n, r) {
	t && typeof t == "object" && typeof t.length == "number" || E("Geometry", `'${e}' must be an array of numbers, got ${j(t)}`), t.length % n !== 0 && E("Geometry", `'${e}' has ${t.length} numbers - expected ${n} per vertex`), r !== void 0 && t.length !== r * n && E("Geometry", `'${e}' has ${t.length / n} entries but 'positions' has ${r} vertices`);
	let i = Float32Array.from(t);
	for (let t = 0; t < i.length; t++) Number.isNaN(i[t]) && E("Geometry", `'${e}' contains a non-number at index ${t}`);
	return i;
}
// src/material/Texture.js
var Ie = [
	"image",
	"url",
	"colorSpace",
	"wrap",
	"repeat",
	"offset",
	"rotation",
	"center",
	"uvSet",
	"filter",
	"mipmaps",
	"anisotropy",
	"flipY"
], Le = {
	colorSpace: "srgb",
	wrap: "repeat",
	repeat: [1, 1],
	offset: [0, 0],
	rotation: 0,
	center: [0, 0],
	uvSet: 0,
	filter: "linear",
	mipmaps: !0,
	anisotropy: 8,
	flipY: !1
}, Re = {
	src: "use 'url' for the image address",
	encoding: "use colorSpace: 'srgb' | 'linear'",
	wrapS: "use wrap: 'repeat' | 'clamp' | 'mirror' (applies to both directions)",
	maxAnisotropy: "use 'anisotropy' - samples along glancing angles, 1 for off",
	channel: "use 'uvSet' - 0 for the first UV set, 1 for the second",
	texCoord: "use 'uvSet' - 0 for the first UV set, 1 for the second",
	scale: "use 'repeat' - [u, v] times across"
}, W = class {
	static OPTIONS = Ie;
	static HINTS = Re;
	#e = null;
	url = null;
	#t = "srgb";
	#n = !1;
	wrap = "repeat";
	repeat = [1, 1];
	offset = [0, 0];
	rotation = 0;
	center = [0, 0];
	uvSet = 0;
	filter = "linear";
	mipmaps = !0;
	anisotropy = 8;
	flipY = !1;
	version = 0;
	ready;
	#r = /* @__PURE__ */ new Set();
	constructor(e = {}) {
		typeof e == "string" && (e = { url: e }), A("Texture", e, Ie, Re);
		let t = {
			...Le,
			...e
		};
		this.#t = P("Texture", "colorSpace", t.colorSpace, ["srgb", "linear"]), this.#n = e.colorSpace !== void 0, this.wrap = P("Texture", "wrap", t.wrap, [
			"repeat",
			"clamp",
			"mirror"
		]), this.filter = P("Texture", "filter", t.filter, ["linear", "nearest"]), this.repeat = Ue("repeat", t.repeat), this.offset = Ue("offset", t.offset), this.rotation = M("Texture", "rotation", t.rotation), this.center = Ue("center", t.center), t.uvSet !== 0 && t.uvSet !== 1 && E("Texture", `'uvSet' is 0 (the first UV set) or 1 (the second), got ${j(t.uvSet)}`), this.uvSet = t.uvSet, this.mipmaps = e.mipmaps === void 0 ? !(Be(t.image) || !t.image && ze.test(t.url ?? "")) : !!e.mipmaps, this.anisotropy = M("Texture", "anisotropy", t.anisotropy), this.anisotropy >= 1 || E("Texture", `'anisotropy' is how many samples along a glancing angle - 1 (off) or more, got ${this.anisotropy}`), this.flipY = !!t.flipY, this.url = t.url ?? null, t.image ? (this.image = t.image, this.ready = Be(t.image) ? Ve(t.image).then(() => this) : Promise.resolve(this), this.ready.catch(() => {})) : this.url ? (this.ready = this.#a(this.url), this.ready.catch(() => {})) : E("Texture", "needs an 'image' or a 'url'");
	}
	get image() {
		return this.#e;
	}
	set image(e) {
		this.#e = e, this.needsUpdate(), Be(e) && this.#i(e);
	}
	#i(e) {
		if (typeof e.requestVideoFrameCallback == "function") {
			let t = () => {
				this.#e === e && (this.needsUpdate(), e.requestVideoFrameCallback(t));
			};
			e.requestVideoFrameCallback(t);
			return;
		}
		let t = -1, n = !1, r = () => {
			this.#e !== e || e.paused || e.ended ? n = !1 : (e.currentTime !== t && (t = e.currentTime, this.needsUpdate()), requestAnimationFrame(r));
		}, i = () => {
			n || this.#e !== e || (n = !0, requestAnimationFrame(r));
		};
		e.addEventListener("play", i), e.addEventListener("seeked", () => {
			this.#e === e && this.needsUpdate();
		}), e.paused || i();
	}
	get colorSpace() {
		return this.#t;
	}
	set colorSpace(e) {
		this.#t = P("Texture", "colorSpace", e, ["srgb", "linear"]), this.#n = !0;
	}
	get colorSpaceSet() {
		return this.#n;
	}
	needsUpdate() {
		return this.version++, this;
	}
	dispose() {
		for (let e of this.#r) e();
	}
	onDispose(e) {
		return this.#r.add(e), () => this.#r.delete(e);
	}
	toJSON() {
		if (!this.url) return null;
		let e = { url: this.url };
		for (let [t, n] of Object.entries(Le)) {
			let r = this[t];
			JSON.stringify(r) !== JSON.stringify(n) && (e[t] = r);
		}
		return e;
	}
	get isHDR() {
		return !!this.image && "data" in this.image && this.image.data instanceof Float32Array;
	}
	async #a(e) {
		if (ze.test(e)) {
			if (typeof document > "u") throw Error(`Texture: can't load '${e}' - no video support in this environment`);
			let t = document.createElement("video");
			Object.assign(t, {
				crossOrigin: "anonymous",
				muted: !0,
				loop: !0,
				playsInline: !0,
				autoplay: !0,
				src: e
			});
			try {
				await Ve(t);
			} catch {
				throw Error(`Texture: failed to load '${e}'`);
			}
			return t.play()?.catch(() => {}), this.image = t, this;
		}
		if (/\.hdr($|[?#])/i.test(e)) {
			let [{ parseHDR: t }, n] = await Promise.all([import("./hdr.js"), fetch(e)]);
			if (!n.ok) throw Error(`Texture: failed to load '${e}' (${n.status})`);
			return this.image = t(await n.arrayBuffer()), this.colorSpace = "linear", this;
		}
		if (typeof Image > "u") throw Error(`Texture: can't load '${e}' - no Image support in this environment`);
		let t = new Image();
		t.crossOrigin = "anonymous", t.src = e;
		try {
			await t.decode();
		} catch {
			throw Error(`Texture: failed to load '${e}'`);
		}
		return this.image = t, this;
	}
}, ze = /\.(mp4|webm|ogv|mov|m4v)($|[?#])/i;
function Be(e) {
	return typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement;
}
function Ve(e) {
	return e.readyState >= 2 ? Promise.resolve() : new Promise((t, n) => {
		e.addEventListener("loadeddata", () => t(), { once: !0 }), e.addEventListener("error", () => n(/* @__PURE__ */ Error("Texture: the video failed to load")), { once: !0 });
	});
}
function He(e, t = {}) {
	return new W({
		...t,
		url: e
	}).ready;
}
function Ue(e, t) {
	return (!Array.isArray(t) || t.length !== 2 || t.some((e) => typeof e != "number")) && E("Texture", `'${e}' must be [u, v], got ${j(t)}`), [t[0], t[1]];
}
// src/material/Material.js
var We = [
	"map",
	"roughnessMap",
	"metalnessMap",
	"normalMap",
	"bumpMap",
	"aoMap",
	"emissiveMap",
	"lightMap",
	"matcap"
], Ge = /* @__PURE__ */ new Set([
	"roughnessMap",
	"metalnessMap",
	"normalMap",
	"bumpMap",
	"aoMap"
]), Ke = [
	"unlit",
	"flatShading",
	"doubleSided",
	"vertexColors",
	"depthWrite",
	"depthTest",
	"sizeAttenuation",
	"transparent",
	"fog"
], qe = {
	opacity: [0, 1],
	roughness: [0, 1],
	metalness: [0, 1],
	emissiveIntensity: [0, Infinity],
	size: [0, Infinity],
	width: [0, Infinity],
	alphaTest: [0, 1],
	normalScale: [-Infinity, Infinity],
	aoMapIntensity: [0, 1],
	triplanar: [0, Infinity],
	bumpScale: [-Infinity, Infinity],
	transmission: [0, 1],
	clearcoat: [0, 1],
	clearcoatRoughness: [0, 1],
	sheen: [0, 1],
	sheenRoughness: [0, 1],
	ior: [1, Infinity],
	specularIntensity: [0, 1],
	anisotropy: [0, 1],
	anisotropyRotation: [-Infinity, Infinity],
	translucency: [0, 1],
	toon: [0, 16],
	lightMapIntensity: [0, Infinity],
	environmentIntensity: [0, Infinity]
}, Je = {
	color: 16777215,
	emissive: 0,
	sheenColor: 16777215,
	specularColor: 16777215,
	translucencyColor: 16777215
}, Ye = {
	name: "",
	opacity: 1,
	alphaTest: 0,
	roughness: .5,
	metalness: 0,
	normalScale: 1,
	bumpScale: 1,
	aoMapIntensity: 1,
	triplanar: 0,
	emissiveIntensity: 1,
	transmission: 0,
	clearcoat: 0,
	clearcoatRoughness: 0,
	sheen: 0,
	sheenRoughness: .5,
	ior: 1.5,
	specularIntensity: 1,
	anisotropy: 0,
	anisotropyRotation: 0,
	translucency: 0,
	toon: 0,
	lightMapIntensity: 1,
	environmentIntensity: 1,
	unlit: !1,
	flatShading: !1,
	doubleSided: !1,
	vertexColors: !1,
	blending: "normal",
	depthWrite: !0,
	depthTest: !0,
	fog: !0,
	size: 1,
	sizeAttenuation: !0,
	width: 1
}, Xe = [
	"name",
	...Object.keys(Je),
	...We,
	...Ke,
	...Object.keys(qe),
	"blending"
], Ze = {
	type: "phoria2 has one material - drop 'type' and set 'unlit: true' for a flat colour",
	side: "use 'doubleSided: true'",
	wireframe: "use new Lines({ geometry: edges(geometry) }) for a wireframe",
	shininess: "use 'roughness' (0 = mirror, 1 = matte)",
	envMapIntensity: "use 'environmentIntensity'",
	reflectivityScale: "use 'environmentIntensity'",
	matcapMap: "use 'matcap'",
	gradientMap: "use 'toon' - the number of flat tones",
	cel: "use 'toon' - the number of flat tones",
	celShading: "use 'toon' - the number of flat tones",
	specular: "use 'specularIntensity' and 'specularColor' for a non-metal's reflections, or 'roughness' and 'metalness'",
	reflectivity: "use 'ior' (1.5 by default) or 'specularIntensity'",
	anisotropyStrength: "use 'anisotropy'",
	diffuseTransmission: "use 'translucency'",
	subsurface: "use 'translucency' for light through thin surfaces",
	colour: "use 'color'",
	emissiveColor: "use 'emissive'",
	alpha: "use 'opacity'"
}, Qe = class e {
	static OPTIONS = Xe;
	static HINTS = Ze;
	name;
	opacity;
	alphaTest;
	normalScale;
	bumpScale;
	aoMapIntensity;
	triplanar;
	roughness;
	metalness;
	emissiveIntensity;
	transmission;
	clearcoat;
	clearcoatRoughness;
	sheen;
	sheenRoughness;
	ior;
	specularIntensity;
	anisotropy;
	anisotropyRotation;
	translucency;
	toon;
	lightMapIntensity;
	environmentIntensity;
	unlit;
	flatShading;
	doubleSided;
	vertexColors;
	fog;
	blending;
	depthWrite;
	depthTest;
	size;
	sizeAttenuation;
	width;
	#e = Object.fromEntries(Object.entries(Je).map(([e, t]) => [e, new H(t)]));
	#t = !1;
	#n = Object.fromEntries(We.map((e) => [e, null]));
	#r = /* @__PURE__ */ new Set();
	constructor(e = {}) {
		A("Material", e, Xe, Ze), Object.assign(this, Ye);
		for (let [t, n] of Object.entries(e)) n !== void 0 && (t in Je ? this.#e[t].set(n, "Material") : We.includes(t) ? this.setMap(t, n) : Ke.includes(t) ? this[t] = $e(t, n) : t in qe ? this[t] = et(t, n, qe[t]) : t === "blending" ? this.blending = P("Material", "blending", n, [
			"normal",
			"additive",
			"multiply"
		]) : t === "name" && (this.name = String(n)));
	}
	static fromInput(t) {
		return t instanceof e ? t : ((!t || typeof t != "object" || Array.isArray(t)) && E("Material", `expected material options such as { color: 'orange' }, got ${j(t)}`), new e(t));
	}
	get color() {
		return this.#e.color;
	}
	set color(e) {
		this.#e.color.set(e, "Material");
	}
	get emissive() {
		return this.#e.emissive;
	}
	set emissive(e) {
		this.#e.emissive.set(e, "Material");
	}
	get sheenColor() {
		return this.#e.sheenColor;
	}
	set sheenColor(e) {
		this.#e.sheenColor.set(e, "Material");
	}
	get specularColor() {
		return this.#e.specularColor;
	}
	set specularColor(e) {
		this.#e.specularColor.set(e, "Material");
	}
	get translucencyColor() {
		return this.#e.translucencyColor;
	}
	set translucencyColor(e) {
		this.#e.translucencyColor.set(e, "Material");
	}
	get map() {
		return this.#n.map;
	}
	set map(e) {
		this.setMap("map", e);
	}
	get roughnessMap() {
		return this.#n.roughnessMap;
	}
	set roughnessMap(e) {
		this.setMap("roughnessMap", e);
	}
	get metalnessMap() {
		return this.#n.metalnessMap;
	}
	set metalnessMap(e) {
		this.setMap("metalnessMap", e);
	}
	get normalMap() {
		return this.#n.normalMap;
	}
	set normalMap(e) {
		this.setMap("normalMap", e);
	}
	get bumpMap() {
		return this.#n.bumpMap;
	}
	set bumpMap(e) {
		this.setMap("bumpMap", e);
	}
	get aoMap() {
		return this.#n.aoMap;
	}
	set aoMap(e) {
		this.setMap("aoMap", e);
	}
	get emissiveMap() {
		return this.#n.emissiveMap;
	}
	set emissiveMap(e) {
		this.setMap("emissiveMap", e);
	}
	get lightMap() {
		return this.#n.lightMap;
	}
	set lightMap(e) {
		this.setMap("lightMap", e);
	}
	get matcap() {
		return this.#n.matcap;
	}
	set matcap(e) {
		this.setMap("matcap", e);
	}
	setMap(e, t) {
		if (t == null) {
			this.#n[e] = null;
			return;
		}
		if (t instanceof W) {
			Ge.has(e) && t.colorSpace === "srgb" && (t.colorSpaceSet ? F(t, `'${e}' holds data, not colour, so its texture should be colorSpace: 'linear' - this one is 'srgb', and will be decoded as colour`) : (t.colorSpace = "linear", t.needsUpdate())), this.#n[e] = t;
			return;
		}
		let n = typeof t == "string" ? { url: t } : t;
		(typeof n != "object" || Array.isArray(n)) && E("Material", `'${e}' must be a Texture, a url or texture options, got ${j(t)}`), this.#n[e] = new W({
			colorSpace: Ge.has(e) ? "linear" : "srgb",
			...n
		});
	}
	get textures() {
		return Object.entries(this.#n).filter(([, e]) => e);
	}
	get transparent() {
		return this.#t || this.opacity < 1 || this.transmission > 0 || this.blending !== "normal";
	}
	set transparent(e) {
		this.#t = !!e;
	}
	get variant() {
		let e = [this.unlit ? "unlit" : "lit"];
		for (let [t] of this.textures) e.push(t);
		return this.alphaTest > 0 && e.push("cutout"), this.transmission > 0 && e.push("glass"), this.clearcoat > 0 && e.push("clearcoat"), this.sheen > 0 && e.push("sheen"), this.anisotropy > 0 && e.push("brushed"), this.translucency > 0 && e.push("translucent"), this.toon > 0 && e.push("toon"), this.flatShading && e.push("flat"), this.vertexColors && e.push("vcolor"), e.join("+");
	}
	async ready() {
		await Promise.all(this.textures.map(([, e]) => e.ready));
	}
	clone() {
		let t = new e(this.toJSON(!0));
		for (let [e, n] of Object.entries(this.#e)) t.#e[e].set(n);
		return t;
	}
	dispose() {
		for (let e of this.#r) e();
	}
	onDispose(e) {
		return this.#r.add(e), () => this.#r.delete(e);
	}
	toJSON(e = !1) {
		let t = {};
		for (let [e, n] of Object.entries(Ye)) this[e] !== n && (t[e] = this[e]);
		this.#t && (t.transparent = !0);
		for (let [e, n] of Object.entries(this.#e)) n.getHex() !== Je[e] && (t[e] = n.getStyle());
		for (let [n, r] of this.textures) {
			let i = e ? r : r.toJSON();
			i && (t[n] = i);
		}
		return t;
	}
};
function $e(e, t) {
	return typeof t != "boolean" && E("Material", `'${e}' must be true or false, got ${j(t)}`), t;
}
function et(e, t, [n, r]) {
	M("Material", e, t);
	let i = t;
	return (i < n || i > r) && E("Material", `'${e}' must be ${r === Infinity ? `${n} or more` : `${n}-${r}`}, got ${i}`), i;
}
// src/resolve.js
function tt(e, t) {
	if (e instanceof U) return e;
	if ((!e || typeof e != "object" || Array.isArray(e)) && E(t, `'geometry' must be a Geometry such as box(2), got ${j(e)}`), "type" in e) {
		let n = e.type;
		E(t, `'geometry' { type: '${n}' } is a description - use the generator directly, e.g. ${n}(...), or build the whole node with create({ type: '${t.toLowerCase()}', geometry: { type: '${n}' } })`);
	}
	return new U(e);
}
function nt(e) {
	return e === void 0 ? new Qe() : Qe.fromInput(e);
}
// src/math/mat3.js
function rt(e) {
	return e.fill(0), e[0] = e[4] = e[8] = 1, e;
}
function it(e, t) {
	let n = t[0], r = t[1], i = t[2], a = t[3], o = t[4], s = t[5], c = t[6], l = t[7], u = t[8], d = t[9], f = t[10], p = t[11], m = t[12], h = t[13], g = t[14], _ = t[15], v = n * s - r * o, y = n * c - i * o, b = n * l - a * o, x = r * c - i * s, S = r * l - a * s, C = i * l - a * c, w = u * h - d * m, T = u * g - f * m, E = u * _ - p * m, D = d * g - f * h, O = d * _ - p * h, k = f * _ - p * g, A = v * k - y * O + b * D + x * E - S * T + C * w;
	return A ? (A = 1 / A, e[0] = (s * k - c * O + l * D) * A, e[1] = (c * E - o * k - l * T) * A, e[2] = (o * O - s * E + l * w) * A, e[3] = (i * O - r * k - a * D) * A, e[4] = (n * k - i * E + a * T) * A, e[5] = (r * E - n * O - a * w) * A, e[6] = (h * C - g * S + _ * x) * A, e[7] = (g * b - m * C - _ * y) * A, e[8] = (m * S - h * b + _ * v) * A, e) : null;
}
function at(e, t) {
	return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[4], e[4] = t[5], e[5] = t[6], e[6] = t[8], e[7] = t[9], e[8] = t[10], e;
}
// src/scene/Node.js
var G = [
	"name",
	"position",
	"rotation",
	"quaternion",
	"scale",
	"visible",
	"pickable",
	"matrixAutoUpdate",
	"children",
	"userData",
	"onUpdate",
	"tooltip",
	"highlight",
	"highlightWhole",
	"onHover",
	"onClick",
	"showFrom",
	"clip",
	"onDrag",
	"outline"
], ot = {
	rotationX: "use rotation: [x, y, z] (radians)",
	scaleX: "use scale: [x, y, z] or a single number",
	translate: "use position: [x, y, z]",
	parent: "add the node to its parent instead: parent.add(node)",
	type: "'type' is only used in descriptions passed to create() or add()",
	clippingPlanes: "use clip: { normal, offset, cap } - one plane, cutting this node and everything under it",
	draggable: "give the node an onDrag handler: onDrag: (drag) => { ... }",
	onDragStart: "use onDrag - drag.phase is 'start', 'move' or 'end'",
	onDragEnd: "use onDrag - drag.phase is 'start', 'move' or 'end'",
	selected: "outline what's selected: node.outline = '#ffcc00'"
}, st = [], ct = new Float32Array([
	0,
	1,
	0
]), lt = /* @__PURE__ */ new Float32Array(16), ut = /* @__PURE__ */ new Float32Array(9), K = class e {
	static type = "node";
	static OPTIONS = G;
	static HINTS = ot;
	name = "";
	#e = new z();
	#t = new z(1, 1, 1);
	#n = new Ne();
	#r = new Te();
	visible = !0;
	pickable = !0;
	matrixAutoUpdate = !0;
	matrix = new B();
	worldMatrix = new B();
	userData = {};
	tooltip = null;
	onHover = null;
	onClick = null;
	showFrom = null;
	overlay = null;
	#i = null;
	onDrag = null;
	#a = null;
	#o = null;
	highlightWhole = !1;
	#s = null;
	#c = null;
	#l = [];
	#u = [];
	get position() {
		return this.#e;
	}
	set position(e) {
		this.#e.copy(e, this.constructor.name);
	}
	get scale() {
		return this.#t;
	}
	set scale(e) {
		this.#t.copy(e, this.constructor.name);
	}
	get rotation() {
		return this.#r;
	}
	set rotation(e) {
		this.#r.copy(e, this.constructor.name);
	}
	get quaternion() {
		return this.#n;
	}
	set quaternion(e) {
		this.#n.copy(e, this.constructor.name).normalize();
	}
	constructor(e = {}) {
		let t = new.target;
		A(t.name, e, t.OPTIONS, {
			...ot,
			...t.HINTS
		}), this.rotation.onChange = () => Me(this.quaternion, this.rotation.x, this.rotation.y, this.rotation.z), this.quaternion.onChange = () => this.rotation.setFromQuat(this.quaternion);
		let n = t.name;
		e.name !== void 0 && (this.name = String(e.name)), e.position !== void 0 && this.position.copy(e.position, n), e.rotation !== void 0 && this.rotation.copy(e.rotation, n), e.quaternion !== void 0 && this.quaternion.copy(e.quaternion, n).normalize(), e.scale !== void 0 && this.scale.copy(e.scale, n), e.visible !== void 0 && (this.visible = !!e.visible), e.pickable !== void 0 && (this.pickable = !!e.pickable), e.matrixAutoUpdate !== void 0 && (this.matrixAutoUpdate = !!e.matrixAutoUpdate), e.userData !== void 0 && (this.userData = e.userData), e.onUpdate && [e.onUpdate].flat().forEach((e) => this.onUpdate(e));
		for (let t of [
			"tooltip",
			"onHover",
			"onClick",
			"showFrom",
			"onDrag"
		]) {
			let r = e[t];
			r != null && (typeof r != "function" && E(n, `'${t}' must be a function, got ${j(r)}`), this[t] = r);
		}
		if (e.highlight != null && this.#d(e.highlight, n), e.highlightWhole !== void 0 && (typeof e.highlightWhole != "boolean" && E(n, `'highlightWhole' must be true or false, got ${j(e.highlightWhole)}`), this.highlightWhole = e.highlightWhole), e.clip != null && (this.#i = Se.fromInput(e.clip, n)), e.outline != null && this.#f(e.outline), e.children) for (let t of e.children) this.add(t);
	}
	get highlight() {
		return this.#o;
	}
	set highlight(e) {
		this.#d(e, this.constructor.name);
	}
	#d(e, t) {
		e === !0 && E(t, "'highlight' is a colour, false for no tint, or null to use the View's - got true"), this.#o = e == null ? null : e !== !1 && H.fromInput(e, t);
	}
	get clip() {
		return this.#i;
	}
	set clip(e) {
		this.#i = e == null ? null : Se.fromInput(e, this.constructor.name);
	}
	get outline() {
		return this.#a;
	}
	set outline(e) {
		this.#f(e);
	}
	#f(e) {
		let t = this.constructor.name;
		if (e == null) {
			this.#a = null;
			return;
		}
		let n = typeof e == "object" && !Array.isArray(e) && !ArrayBuffer.isView(e) && !(e instanceof H) ? e : { color: e };
		A(t, n, ["color", "width"], {}, "outline");
		let r = n.width ?? 2;
		(typeof r != "number" || !(r > 0) || r > 8) && E(t, `'outline.width' is in pixels, above 0 and up to 8, got ${j(r)}`), this.#a = {
			color: H.fromInput(n.color ?? "#ffcc00", t),
			width: r
		};
	}
	get parent() {
		return this.#c;
	}
	get children() {
		return this.#l;
	}
	get root() {
		let e = this;
		for (; e.#c;) e = e.#c;
		return e;
	}
	add(e, ...t) {
		e === void 0 && E(this.constructor.name, "add() needs a node to add - add(new Mesh({...})), or add(...nodes) for several");
		let n = [e, ...t].map((e) => pt(e));
		for (let e of n) {
			e === this && E(this.constructor.name, "can't add a node to itself");
			for (let t = this.#c; t; t = t.#c) t === e && E(this.constructor.name, "can't add an ancestor as a child - that would make a loop");
			e.#c && e.#c.#p(e), e.#c = this, this.#l.push(e);
		}
		return n[0];
	}
	remove(...e) {
		for (let t of e) t.#c === this && this.#p(t);
		return this;
	}
	removeFromParent() {
		return this.#c?.remove(this), this;
	}
	#p(e) {
		this.#l.splice(this.#l.indexOf(e), 1), e.#c = null;
	}
	traverse(e) {
		if (e(this), this.#l.length) for (let t of [...this.#l]) t.traverse(e);
	}
	find(e) {
		if (this.name === e) return this;
		for (let t of this.#l) {
			let n = t.find(e);
			if (n) return n;
		}
	}
	findAll(e) {
		let t = [];
		return this.traverse((n) => e(n) && t.push(n)), t;
	}
	get onUpdate() {
		return (e) => this.#m(e);
	}
	set onUpdate(e) {
		E(this.constructor.name, "call onUpdate rather than assigning it - node.onUpdate((node, dt, t) => {}) adds a handler (a node can have several)");
	}
	#m(e) {
		return typeof e != "function" && E(this.constructor.name, `onUpdate expects a function (node, dt, t) => {}, got ${j(e)}`), this.#u.push(e), () => {
			let t = this.#u.indexOf(e);
			t !== -1 && this.#u.splice(t, 1);
		};
	}
	on(e, t) {
		let n = this.constructor.name;
		e !== "hover" && e !== "click" && E(n, `on() listens for 'hover' or 'click', got ${j(e)}${e === "drag" ? " - a drag has one handler: onDrag" : ""}`), typeof t != "function" && E(n, `on('${e}', fn) needs a function, got ${j(t)}`), this.#s ??= {
			hover: /* @__PURE__ */ new Set(),
			click: /* @__PURE__ */ new Set()
		};
		let r = this.#s[e];
		return r.add(t), () => {
			r.delete(t);
		};
	}
	handlersFor(e) {
		let t = e === "hover" ? this.onHover : this.onClick, n = this.#s?.[e];
		return n?.size ? t ? [t, ...n] : [...n] : t ? [t] : st;
	}
	runHandlers(e, t) {
		for (let n of this.#u) n(this, e, t);
	}
	get hasHandlers() {
		return this.#u.length > 0;
	}
	translate(e, t, n) {
		let r = new z(e, t, n).applyQuaternion(this.quaternion);
		return this.position.add(r), this;
	}
	translateX(e) {
		return this.translate(e, 0, 0);
	}
	translateY(e) {
		return this.translate(0, e, 0);
	}
	translateZ(e) {
		return this.translate(0, 0, e);
	}
	rotate(e, t) {
		let n = z.fromInput(e, this.constructor.name).normalize();
		return this.quaternion.multiply(new Ne().setFromAxisAngle(n, t)), this;
	}
	rotateX(e) {
		return this.rotate([
			1,
			0,
			0
		], e);
	}
	rotateY(e) {
		return this.rotate([
			0,
			1,
			0
		], e);
	}
	rotateZ(e) {
		return this.rotate([
			0,
			0,
			1
		], e);
	}
	lookAt(t, n) {
		let r = t instanceof e ? t.updateWorld().worldPosition : z.fromInput(t, this.constructor.name), i = n === void 0 ? ct : z.fromInput(n, `${this.constructor.name}.lookAt() up`).normalize();
		this.updateWorld();
		let a = this.worldPosition;
		if (a.equals(r, 1e-9)) return this;
		let o = r.clone().sub(a).normalize();
		f(lt, a, r, Math.abs(o.dot(i)) > .9999 ? Math.abs(i[1]) > .9 ? [
			0,
			0,
			-1
		] : ct : i);
		let s = je(/* @__PURE__ */ new Float32Array(4), at(ut, lt));
		if (this.#c) {
			let e = Oe(/* @__PURE__ */ new Float32Array(4), je(/* @__PURE__ */ new Float32Array(4), mt(this.#c.worldMatrix)));
			De(s, ke(e, e), s);
		}
		return this.quaternion.copy(Oe(s, s)), this;
	}
	updateMatrix() {
		return this.matrix.compose(this.position, this.quaternion, this.scale), this;
	}
	updateWorld() {
		return this.#c && this.#c.#h(), this.updateWorldTree(), this;
	}
	#h() {
		this.#c && this.#c.#h(), this.#g();
	}
	#g() {
		this.matrixAutoUpdate && this.updateMatrix(), this.#c ? s(this.worldMatrix, this.#c.worldMatrix, this.matrix) : this.worldMatrix.copy(this.matrix);
	}
	updateWorldTree() {
		this.#g();
		for (let e of this.#l) e.updateWorldTree();
	}
	get worldPosition() {
		return this.worldMatrix.getPosition();
	}
	get worldQuaternion() {
		let e = je(/* @__PURE__ */ new Float32Array(4), mt(this.worldMatrix));
		return new Ne(e[0], e[1], e[2], e[3]).normalize();
	}
	get worldScale() {
		return this.worldMatrix.getScale();
	}
	get bounds() {
		this.updateWorld();
		let e = new V();
		return this.traverse((t) => t.expandBounds(e)), e;
	}
	boundsFrom(e) {
		this.updateWorld();
		let t = new V();
		return this.eachShownTo(e, (e) => e.expandBounds(t)), t;
	}
	shownTo(e) {
		return this.visible && (!this.showFrom || this.showFrom(e));
	}
	eachShownTo(e, t) {
		if (this.shownTo(e)) {
			t(this);
			for (let n of this.#l) n.eachShownTo(e, t);
		}
	}
	expandBounds(e) {
		return e;
	}
	clone({ deep: e = !0 } = {}) {
		let t = this.constructor, n = new t(this.cloneOptions());
		n.userData = structuredClone(this.userData), n.matrixAutoUpdate = this.matrixAutoUpdate, n.matrixAutoUpdate || n.matrix.copy(this.matrix);
		for (let e of this.#u) n.onUpdate(e);
		if (e) for (let e of this.#l) n.add(e.clone());
		return n;
	}
	cloneOptions() {
		return {
			name: this.name,
			position: this.position.toArray(),
			quaternion: this.quaternion.toArray(),
			scale: this.scale.toArray(),
			visible: this.visible,
			pickable: this.pickable,
			tooltip: this.tooltip,
			highlight: this.highlight,
			highlightWhole: this.highlightWhole,
			onHover: this.onHover,
			onClick: this.onClick,
			showFrom: this.showFrom,
			clip: this.#i ? this.#i.toJSON() : null,
			onDrag: this.onDrag,
			outline: this.#a ? {
				color: this.#a.color.getStyle(),
				width: this.#a.width
			} : null
		};
	}
	toJSON() {
		let e = { type: this.constructor.type };
		return this.name && (e.name = this.name), this.position.equals([
			0,
			0,
			0
		]) || (e.position = this.position.toArray()), (this.rotation.x || this.rotation.y || this.rotation.z) && (e.rotation = this.rotation.toArray()), this.scale.equals([
			1,
			1,
			1
		]) || (e.scale = this.scale.toArray()), this.visible || (e.visible = !1), this.pickable || (e.pickable = !1), this.matrixAutoUpdate || (e.matrixAutoUpdate = !1), this.highlight ? e.highlight = this.highlight.getStyle() : this.highlight === !1 && (e.highlight = !1), this.highlightWhole && (e.highlightWhole = !0), this.#i && (e.clip = this.#i.toJSON()), this.#a && (e.outline = {
			color: this.#a.color.getStyle(),
			width: this.#a.width
		}), Object.keys(this.userData).length && (e.userData = this.userData), Object.assign(e, this.jsonOptions()), this.#l.length && (e.children = this.#l.map((e) => e.toJSON())), e;
	}
	jsonOptions() {
		return {};
	}
	dispose() {
		this.traverse((e) => e !== this && e.dispose());
	}
};
function dt(e, t, n) {
	return t == null ? null : e ? e.copy(t, n) : z.fromInput(t, n);
}
function ft(e, t) {
	let n = t instanceof K ? t.updateWorld().worldPosition : z.fromInput(t, `${e.constructor.name}.lookAt()`), r = e.parent;
	return r ? n.applyMatrix4(r.updateWorld().worldMatrix.clone().invert()) : n;
}
function pt(e) {
	return e instanceof K ? e : e && typeof e == "object" && "type" in e ? E("Node", `add() takes nodes - build one from a description with add(create({ type: '${e.type}', ... }))`) : E("Node", `add() expects nodes, got ${j(e)}`);
}
function mt(e) {
	let t = at(/* @__PURE__ */ new Float32Array(9), e);
	for (let e = 0; e < 3; e++) {
		let n = Math.hypot(t[e * 3], t[e * 3 + 1], t[e * 3 + 2]) || 1;
		t[e * 3] /= n, t[e * 3 + 1] /= n, t[e * 3 + 2] /= n;
	}
	return t;
}
var ht = class extends K {
	static type = "group";
}, gt = [
	"center",
	"above",
	"below",
	"left",
	"right"
], _t = [
	"place",
	"offset",
	"className",
	"priority",
	"overlap",
	"occlude",
	"leader",
	"edge",
	"minScale"
], vt = {
	line: "use leader: true - a line from the point to the label",
	callout: "use leader: true, with edge: 'left' | 'right' to line the labels up down the side",
	column: "use edge: 'left' | 'right' - the label sits at that edge of the view, level with its point",
	align: "use edge: 'left' | 'right' - the label sits at that edge of the view, level with its point",
	pointer: "use leader: true - a line from the point to the label",
	anchor: "use place: 'center' | 'above' | 'below' | 'left' | 'right' (where the label goes)",
	zIndex: "use 'priority': higher stays when labels overlap",
	minZoom: "use 'minScale': CSS pixels to one world unit at the label's point",
	lod: "use 'minScale': the label shows when zoomed in at least this far (CSS pixels to one world unit)",
	collision: "use overlap: 'hide' | 'dim' | 'show'"
}, yt = {
	...vt,
	position: "labels per instance sit on their instance - offset moves them in pixels"
};
function bt(e, t) {
	let n = t.offset ?? [0, 0];
	return Array.isArray(n) && n.length === 2 && n.every(Number.isFinite) || E(e, `'offset' must be [x, y] in pixels, got ${j(n)}`), {
		place: t.place === void 0 ? "center" : P(e, "place", t.place, gt),
		offset: [n[0], n[1]],
		className: t.className ? String(t.className) : "",
		priority: t.priority === void 0 ? 0 : M(e, "priority", t.priority),
		overlap: t.overlap === void 0 ? "hide" : P(e, "overlap", t.overlap, [
			"hide",
			"dim",
			"show"
		]),
		occlude: !!t.occlude,
		leader: !!t.leader,
		edge: t.edge == null ? null : P(e, "edge", t.edge, ["left", "right"]),
		minScale: t.minScale === void 0 ? 0 : xt(e, t.minScale)
	};
}
function xt(e, t) {
	let n = M(e, "minScale", t);
	return n >= 0 || E(e, `'minScale' is CSS pixels to one world unit, 0 or more, got ${n}`), n;
}
function St(e, t) {
	if (t == null) return null;
	if (Array.isArray(t)) return t.length || E(e, "'labels' as a list needs at least one { text: (datum, index) => string, ... }"), t.map((t) => St(e, t));
	(typeof t != "object" || typeof t.text != "function") && E(e, `'labels' must be { text: (datum, index) => string, ... }, got ${j(t)}`);
	let n = t;
	for (let t of Object.keys(n)) t !== "text" && t !== "at" && !_t.includes(t) && E(e, `unknown labels option '${t}'${yt[t] ? ` - ${yt[t]}` : ` - expected text, at, ${_t.join(", ")}`}`);
	let r = n.at === void 0 ? "top" : P(e, "labels.at", n.at, ["top", "center"]), i = typeof n.priority == "function", a = bt(e, i ? {
		...n,
		priority: 0
	} : n);
	return {
		text: n.text,
		at: r,
		...a,
		priority: i ? n.priority : a.priority
	};
}
var Ct = [
	...G,
	"geometry",
	"material",
	"castShadow",
	"receiveShadow",
	"renderOrder",
	"frustumCulled",
	"data"
], wt = {
	mesh: "pass 'geometry' and 'material' directly",
	materials: "one 'material' per node - use a Group of meshes for several",
	rows: "use 'data' - one row per instance or point"
}, Tt = class extends K {
	static OPTIONS = Ct;
	static HINTS = wt;
	#e;
	#t;
	castShadow = !1;
	receiveShadow = !1;
	renderOrder = 0;
	frustumCulled = !0;
	data = null;
	constructor(e) {
		super(e);
		let t = this.constructor.name;
		e && e.geometry !== void 0 || E(t, `'geometry' is required, e.g. new ${t}({ geometry: box(1), material: { color: 'orange' } })`), this.#e = tt(e.geometry, t), this.#t = nt(e.material), e.castShadow !== void 0 && (this.castShadow = !!e.castShadow), e.receiveShadow !== void 0 && (this.receiveShadow = !!e.receiveShadow), e.renderOrder !== void 0 && (this.renderOrder = M(t, "renderOrder", e.renderOrder)), e.frustumCulled !== void 0 && (this.frustumCulled = !!e.frustumCulled), e.data !== void 0 && (this.data = e.data), this.checkGeometry();
	}
	get geometry() {
		return this.#e;
	}
	set geometry(e) {
		this.#e = tt(e, this.constructor.name), this.checkGeometry();
	}
	get material() {
		return this.#t;
	}
	set material(e) {
		this.#t = nt(e);
	}
	datumAt(e) {
		return ("instanceMatrices" in this || this.drawMode !== "triangles") && Array.isArray(this.data) ? e === null ? null : this.data[e] ?? null : this.data ?? null;
	}
	get isDrawable() {
		return !0;
	}
	get drawMode() {
		return "triangles";
	}
	checkGeometry() {}
	expandBounds(e) {
		return this.geometry.vertexCount && e.union(this.geometry.bounds.clone().applyMatrix4(this.worldMatrix)), e;
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			geometry: this.geometry,
			material: this.material,
			castShadow: this.castShadow,
			receiveShadow: this.receiveShadow,
			renderOrder: this.renderOrder,
			frustumCulled: this.frustumCulled,
			data: this.data
		};
	}
	jsonOptions() {
		let e = {
			geometry: this.geometry.toJSON(),
			material: this.material.toJSON()
		};
		return this.castShadow && (e.castShadow = !0), this.receiveShadow && (e.receiveShadow = !0), this.renderOrder && (e.renderOrder = this.renderOrder), this.frustumCulled || (e.frustumCulled = !1), this.data != null && (e.data = this.data), e;
	}
	dispose() {
		this.geometry.dispose(), this.material.dispose();
		for (let [, e] of this.material.textures) e.dispose();
		super.dispose();
	}
}, Et = class extends Tt {
	static type = "mesh";
	checkGeometry() {
		let e = this.geometry.elementCount;
		e % 3 != 0 && E("Mesh", `geometry has ${e} ${this.geometry.indices ? "indices" : "vertices"}, not a multiple of 3 - triangles need three each (use Lines for pairs, Points for single vertices)`);
	}
}, Dt = /* @__PURE__ */ new Set([
	"position",
	"rotation",
	"quaternion",
	"scale",
	"color"
]), Ot = {
	position: new z(),
	scale: new z(),
	quaternion: new Ne(),
	rotation: new Te()
}, kt = new H(), At = /* @__PURE__ */ new Float32Array(16);
function jt(e, t) {
	let n = t * 16;
	return !e[n] && !e[n + 1] && !e[n + 2] && !e[n + 4] && !e[n + 5] && !e[n + 6] && !e[n + 8] && !e[n + 9] && !e[n + 10];
}
var Mt = class extends Et {
	static type = "instanced-mesh";
	static get OPTIONS() {
		return [
			...Ct,
			"count",
			"instances",
			"instanceMatrices",
			"instanceColors",
			"labels"
		];
	}
	count = 0;
	instanceMatrices;
	instanceColors = null;
	version = 0;
	labels = null;
	constructor(e) {
		super(e), this.labels = St("InstancedMesh", e.labels);
		let t = e.count ?? e.instances?.length ?? (Array.isArray(e.data) ? e.data.length : void 0);
		(!Number.isInteger(t) || t < 0) && E("InstancedMesh", `'count' must be a whole number, got ${j(t)}`), this.count = t, this.instanceMatrices = new Float32Array(t * 16);
		let n = this.instanceMatrices;
		for (let e = 0; e < n.length; e += 16) n[e] = n[e + 5] = n[e + 10] = n[e + 15] = 1;
		e.instances?.forEach((e, t) => this.setInstance(t, e)), e.instanceMatrices && (e.instanceMatrices.length !== t * 16 && E("InstancedMesh", `'instanceMatrices' needs ${t * 16} numbers (16 per instance)`), this.instanceMatrices.set(e.instanceMatrices)), e.instanceColors && (e.instanceColors.length !== t * 3 && E("InstancedMesh", `'instanceColors' needs ${t * 3} numbers (linear rgb per instance)`), this.instanceColors = Float32Array.from(e.instanceColors));
	}
	setInstance(e, t) {
		this.#e(e);
		for (let e in t) Dt.has(e) || E("InstancedMesh", `unknown instance option '${e}' - expected position, rotation, quaternion, scale or color`);
		let { position: n, scale: r, quaternion: i } = Ot;
		if (t.position === void 0 ? n.set(0, 0, 0) : n.copy(t.position, "InstancedMesh"), t.scale === void 0 ? r.set(1, 1, 1) : typeof t.scale == "number" ? r.set(t.scale, t.scale, t.scale) : r.copy(t.scale, "InstancedMesh"), i.set(0, 0, 0, 1), t.quaternion) i.copy(t.quaternion, "InstancedMesh").normalize();
		else if (t.rotation) {
			let e = t.rotation instanceof Te ? t.rotation : Ot.rotation.copy(t.rotation, "InstancedMesh");
			i.setFromEuler(e.x, e.y, e.z);
		}
		return u(this.instanceMatrices.subarray(e * 16, e * 16 + 16), i, n, r), t.color !== void 0 && this.#t(e, t.color), this.version++, this;
	}
	needsUpdate() {
		return this.version++, this;
	}
	setColor(e, t) {
		return this.#e(e), this.#t(e, t), this.version++, this;
	}
	#e(e) {
		(!Number.isInteger(e) || e < 0 || e >= this.instanceMatrices.length / 16) && E("InstancedMesh", `instance ${j(e)} is out of range 0-${this.instanceMatrices.length / 16 - 1}`);
	}
	#t(e, t) {
		this.instanceColors ||= new Float32Array(this.instanceMatrices.length / 16 * 3).fill(1), this.instanceColors.set(kt.set(t, "InstancedMesh"), e * 3);
	}
	expandBounds(e) {
		return this.eachInstanceBox((t, n, r, i, a, o) => {
			e.expandByXYZ(t, n, r), e.expandByXYZ(i, a, o);
		}), e;
	}
	eachInstanceBox(e) {
		if (!this.count || !this.geometry.vertexCount) return;
		let t = this.geometry.bounds, n = (t.min[0] + t.max[0]) / 2, r = (t.min[1] + t.max[1]) / 2, i = (t.min[2] + t.max[2]) / 2, a = (t.max[0] - t.min[0]) / 2, o = (t.max[1] - t.min[1]) / 2, c = (t.max[2] - t.min[2]) / 2, l = this.worldMatrix, u = this.instanceMatrices, d = At;
		for (let t = 0; t < this.count; t++) {
			if (jt(u, t)) continue;
			s(d, l, u.subarray(t * 16, t * 16 + 16));
			let f = d[0] * n + d[4] * r + d[8] * i + d[12], p = d[1] * n + d[5] * r + d[9] * i + d[13], m = d[2] * n + d[6] * r + d[10] * i + d[14], h = Math.abs(d[0]) * a + Math.abs(d[4]) * o + Math.abs(d[8]) * c, g = Math.abs(d[1]) * a + Math.abs(d[5]) * o + Math.abs(d[9]) * c, _ = Math.abs(d[2]) * a + Math.abs(d[6]) * o + Math.abs(d[10]) * c;
			e(f - h, p - g, m - _, f + h, p + g, m + _);
		}
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			count: this.count,
			labels: this.labels
		};
	}
	clone(e) {
		let t = super.clone(e);
		return t.instanceMatrices.set(this.instanceMatrices), this.instanceColors && (t.instanceColors = this.instanceColors.slice()), t;
	}
	jsonOptions() {
		return {
			...super.jsonOptions(),
			count: this.count,
			instanceMatrices: Array.from(this.instanceMatrices),
			...this.instanceColors ? { instanceColors: Array.from(this.instanceColors) } : {}
		};
	}
}, Nt = class extends Tt {
	static type = "points";
	static get OPTIONS() {
		return [...Ct, "labels"];
	}
	labels = null;
	constructor(e) {
		super(e), this.labels = St(this.constructor.name, e?.labels);
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			labels: this.labels
		};
	}
	get drawMode() {
		return "points";
	}
}, Pt = class extends Tt {
	static type = "lines";
	get drawMode() {
		return "lines";
	}
	checkGeometry() {
		let e = this.geometry.elementCount;
		e % 2 != 0 && E("Lines", `geometry has ${e} ${this.geometry.indices ? "indices" : "vertices"} - segments need them in pairs`);
	}
}, Ft = class extends K {
	static type = "label";
	static get OPTIONS() {
		return [
			...G,
			"text",
			..._t
		];
	}
	static get HINTS() {
		return vt;
	}
	text = "";
	className = "";
	place = "center";
	offset = [0, 0];
	priority = 0;
	overlap = "hide";
	occlude = !1;
	leader = !1;
	edge = null;
	minScale = 0;
	constructor(e) {
		super(e), typeof e?.text != "string" && typeof e?.text != "number" && E("Label", `'text' is required, got ${j(e?.text)}`), this.text = String(e.text), Object.assign(this, bt("Label", e));
	}
	get isLabel() {
		return !0;
	}
	expandBounds(e) {
		return e.expandByPoint(this.worldPosition);
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			text: this.text,
			className: this.className,
			place: this.place,
			offset: [...this.offset],
			priority: this.priority,
			overlap: this.overlap,
			occlude: this.occlude,
			leader: this.leader,
			edge: this.edge,
			minScale: this.minScale
		};
	}
	jsonOptions() {
		let e = { text: this.text };
		return this.className && (e.className = this.className), this.place !== "center" && (e.place = this.place), (this.offset[0] || this.offset[1]) && (e.offset = [...this.offset]), this.priority && (e.priority = this.priority), this.overlap !== "hide" && (e.overlap = this.overlap), this.occlude && (e.occlude = !0), this.leader && (e.leader = !0), this.edge && (e.edge = this.edge), this.minScale && (e.minScale = this.minScale), e;
	}
}, It = {
	punctual: 4,
	directional: 2
};
function Lt(e, t) {
	t.updateWorld();
	let n = t.viewMatrix, r = t.projectionMatrix, i = new B().multiplyMatrices(r, n), a = Kt(i), o = {
		camera: {
			view: n,
			projection: r,
			viewProjection: i,
			position: t.worldPosition,
			near: t.near,
			far: t.far,
			camera: t
		},
		lights: [],
		opaque: [],
		transparent: [],
		labels: [],
		background: e.background,
		environment: e.environment,
		environmentIntensity: e.environmentIntensity,
		backgroundBlur: e.backgroundBlur,
		fog: e.fog,
		shadow: null,
		spotShadows: [],
		pointShadow: null,
		caps: [],
		stats: {
			drawn: 0,
			culled: 0
		},
		highlight: null,
		overlays: [],
		interactive: !1,
		draggable: !1,
		outlines: [],
		tooltips: !1
	}, s = 0, c = 0, l = [], u = [], d = /* @__PURE__ */ new Map(), f = (e, s, c) => {
		if (e.shownTo(t)) {
			if (e.clip && (s = {
				plane: Ce(e),
				cap: e.clip.cap
			}), e.outline && (c = {
				color: e.outline.color,
				width: e.outline.width,
				items: []
			}, o.outlines.push(c)), e.overlay && o.overlays.push(e.overlay), e.onDrag && (o.interactive = o.draggable = !0), e.tooltip ? o.interactive = o.tooltips = !0 : (e.highlight || e.handlersFor("hover").length || e.handlersFor("click").length) && (o.interactive = !0), e.isDrawable) {
				e.castShadow && e.drawMode !== "points" && e.drawMode !== "lines" && l.push([e, s]), e.receiveShadow && u.push(e);
				let t = Rt(e, n, a, s);
				if (t) {
					let a = e.material.transparent || e.drawMode === "points" && e.material.map;
					if ((a ? o.transparent : o.opaque).push(t), c && e.drawMode === "triangles" && c.items.push(t), t.clip?.cap && !a) {
						let e = d.get(t.clip);
						e ? e.push(t) : d.set(t.clip, [t]);
					}
					o.stats.drawn++, e.labels && Ht(e, i, n, r[5], o.labels);
				} else o.stats.culled++;
			} else if (e.isLabel) {
				let t = e.worldPosition;
				o.labels.push({
					key: e,
					node: e,
					index: null,
					text: e.text,
					style: e,
					position: t,
					...Gt(t, i, n, r[5])
				});
			} else e.lightKind && p(e);
			for (let t of e.children) f(t, s, c);
		}
	}, p = (t) => {
		let n = t.lightKind;
		n === "ambient" ? o.lights.push({
			kind: "ambient",
			node: t,
			color: t.color,
			intensity: t.intensity
		}) : n === "hemisphere" ? o.lights.push({
			kind: "hemisphere",
			node: t,
			color: t.sky,
			ground: t.ground,
			intensity: t.intensity
		}) : n === "directional" ? ++c > It.directional ? F(e, `more than ${It.directional} directional lights - the extras are ignored; use scene.environment for more light`) : o.lights.push({
			kind: "directional",
			node: t,
			color: t.color,
			intensity: t.intensity,
			direction: t.worldDirection,
			castShadow: t.castShadow
		}) : ++s > It.punctual ? F(e, `more than ${It.punctual} point and spot lights - the extras are ignored`) : n === "spot" ? o.lights.push({
			kind: "spot",
			node: t,
			color: t.color,
			intensity: t.intensity,
			position: t.worldPosition,
			direction: t.worldDirection,
			range: t.range,
			angle: t.angle,
			penumbra: t.penumbra,
			castShadow: t.castShadow,
			shadowTile: -1
		}) : o.lights.push({
			kind: "point",
			node: t,
			color: t.color,
			intensity: t.intensity,
			position: t.worldPosition,
			range: t.range,
			castShadow: t.castShadow
		});
	};
	f(e, null, null), o.outlines = o.outlines.filter((e) => e.items.length);
	for (let [e, t] of d) o.caps.push(zt(e, t));
	let m = o.lights.findIndex((e) => e.kind === "directional" && e.castShadow), h = o.lights.filter((e) => e.kind === "spot" && e.castShadow), g = o.lights.filter((e) => e.kind === "point" && e.castShadow), _ = m >= 0 || h.length || g.length ? l.map(([e, t]) => Rt(e, n, null, t)).filter(Boolean) : [];
	if (h.length > 4 && F(e, "more than 4 spot lights cast shadows - the extras don't"), g.length > 1 && F(e, "more than one point light casts shadows - only the first does"), _.length && g.length) {
		let e = g[0], t = _.map((e) => e.node.expandBounds(new V())), n = le(e.position, e.range ?? 0, t, u.map((e) => e.expandBounds(new V())));
		n && (o.pointShadow = {
			light: e,
			faces: n.viewProjections.map((e) => {
				let n = Kt(e);
				return {
					viewProjection: e,
					casters: _.filter((e, r) => qt(n, t[r].getCenter(), t[r].getRadius()))
				};
			}),
			near: n.near,
			far: n.far,
			texelAngle: n.texelAngle
		});
	}
	if (_.length && h.length) {
		let e = _.map((e) => e.node.expandBounds(new V())), t = u.map((e) => e.expandBounds(new V()));
		for (let n of h.slice(0, 4)) {
			let r = n.position, i = e.map((e) => e.containsPoint(r)), a = oe(r, n.direction, n.angle, n.range ?? 0, e.filter((e, t) => !i[t]), t);
			if (!a) continue;
			let s = Kt(a.viewProjection), c = _.filter((t, n) => {
				if (i[n]) return !1;
				let r = e[n];
				return qt(s, r.getCenter(), r.getRadius());
			});
			n.shadowTile = o.spotShadows.length, o.spotShadows.push({
				light: n,
				tile: n.shadowTile,
				viewProjection: a.viewProjection,
				texelAngle: a.texelAngle,
				casters: c
			});
		}
	}
	if (_.length && m >= 0) {
		let e = o.lights[m], t = (e) => e.expandBounds(new V()), n = re(e.direction, _.map((e) => t(e.node)), u.map(t), void 0, e.node.shadowBounds);
		n && (o.lights.splice(m, 1), o.lights.unshift(e), o.shadow = {
			light: e,
			...n,
			casters: _
		});
	}
	return o.opaque.sort((e, t) => e.node.renderOrder - t.node.renderOrder || (e.material.variant < t.material.variant ? -1 : +(e.material.variant > t.material.variant)) || e.depth - t.depth), o.transparent.sort((e, t) => e.node.renderOrder - t.node.renderOrder || t.depth - e.depth), o;
}
function Rt(e, t, n, r) {
	let { geometry: i, material: a, worldMatrix: o } = e, s = "instanceMatrices" in e ? e : null;
	if (s && s.count === 0 || !i.vertexCount) return null;
	let c = i.bounds, l = c.getCenter().applyMatrix4(o), u = Math.max(Math.hypot(o[0], o[1], o[2]), Math.hypot(o[4], o[5], o[6]), Math.hypot(o[8], o[9], o[10]));
	if (n && e.frustumCulled && !s && !qt(n, l, c.getRadius() * u)) return null;
	let d = r && e.drawMode === "triangles" ? r : null;
	if (d && !s) {
		let e = d.plane;
		if (e[0] * l[0] + e[1] * l[1] + e[2] * l[2] + e[3] > c.getRadius() * u) return null;
	}
	return {
		node: e,
		geometry: i,
		material: a,
		worldMatrix: o,
		instances: s,
		depth: -(t[2] * l[0] + t[6] * l[1] + t[10] * l[2] + t[14]),
		clip: d
	};
}
function zt(e, t) {
	let n = new V();
	for (let e of t) e.node.expandBounds(n);
	let r = n.getCenter(), i = e.plane, a = i[0] * r[0] + i[1] * r[1] + i[2] * r[2] + i[3], o = new z(r[0] - i[0] * a, r[1] - i[1] * a, r[2] - i[2] * a);
	return {
		plane: e.plane,
		color: e.cap,
		items: t,
		center: o,
		radius: n.getRadius()
	};
}
var Bt = /* @__PURE__ */ new WeakMap(), Vt = 1;
function Ht(e, t, n, r, i) {
	Array.isArray(e.labels) ? e.labels.forEach((a, o) => Ut(e, a, o, t, n, r, i)) : Ut(e, e.labels, 0, t, n, r, i);
}
function Ut(e, t, n, r, i, a, o) {
	let { worldMatrix: s } = e, c = Bt.get(e);
	c === void 0 && Bt.set(e, c = Vt++);
	let l = "instanceMatrices" in e, u = l ? e.count : e.geometry.drawnVertices, d = 0, f = 0, p = 0;
	if (l) {
		let n = e.geometry.bounds, r = n.getCenter();
		d = r[0], f = t.at === "top" ? n.max[1] : r[1], p = r[2];
	}
	let m = Array.isArray(e.data) ? e.data : null, h = typeof t.priority == "function";
	for (let g = 0; g < u; g++) {
		if (l && jt(e.instanceMatrices, g)) continue;
		let u = m ? m[g] : null, _ = t.text(u, g);
		if (_ == null || _ === "") continue;
		let v, y, b;
		if (l) {
			let t = e.instanceMatrices, n = g * 16;
			v = t[n] * d + t[n + 4] * f + t[n + 8] * p + t[n + 12], y = t[n + 1] * d + t[n + 5] * f + t[n + 9] * p + t[n + 13], b = t[n + 2] * d + t[n + 6] * f + t[n + 10] * p + t[n + 14];
		} else {
			let t = e.geometry.positions;
			v = t[g * 3], y = t[g * 3 + 1], b = t[g * 3 + 2];
		}
		let x = new z(s[0] * v + s[4] * y + s[8] * b + s[12], s[1] * v + s[5] * y + s[9] * b + s[13], s[2] * v + s[6] * y + s[10] * b + s[14]), S = h ? {
			...t,
			priority: t.priority(u, g)
		} : t;
		o.push({
			key: n ? `${c}:${g}:${n}` : `${c}:${g}`,
			node: e,
			index: g,
			text: String(_),
			style: S,
			position: x,
			...Gt(x, r, i, a)
		});
	}
}
function Wt(e, t) {
	let n = t, r = n[0] * e[0] + n[4] * e[1] + n[8] * e[2] + n[12], i = n[1] * e[0] + n[5] * e[1] + n[9] * e[2] + n[13], a = n[2] * e[0] + n[6] * e[1] + n[10] * e[2] + n[14], o = n[3] * e[0] + n[7] * e[1] + n[11] * e[2] + n[15], s = [
		r / o,
		i / o,
		a / o
	];
	return {
		ndc: s,
		visible: o > 0 && Math.abs(s[0]) <= 1 && Math.abs(s[1]) <= 1 && Math.abs(s[2]) <= 1
	};
}
function Gt(e, t, n, r) {
	let { ndc: i, visible: a } = Wt(e, t), o = -(n[2] * e[0] + n[6] * e[1] + n[10] * e[2] + n[14]), s = t, c = s[3] * e[0] + s[7] * e[1] + s[11] * e[2] + s[15];
	return {
		ndc: [i[0], i[1]],
		depth: o,
		visible: a,
		scale: c > 0 ? r / c : 0
	};
}
function Kt(e) {
	let t = (t) => [
		e[t],
		e[4 + t],
		e[8 + t],
		e[12 + t]
	], n = t(0), r = t(1), i = t(2), a = t(3);
	return [
		[
			a[0] + n[0],
			a[1] + n[1],
			a[2] + n[2],
			a[3] + n[3]
		],
		[
			a[0] - n[0],
			a[1] - n[1],
			a[2] - n[2],
			a[3] - n[3]
		],
		[
			a[0] + r[0],
			a[1] + r[1],
			a[2] + r[2],
			a[3] + r[3]
		],
		[
			a[0] - r[0],
			a[1] - r[1],
			a[2] - r[2],
			a[3] - r[3]
		],
		[
			a[0] + i[0],
			a[1] + i[1],
			a[2] + i[2],
			a[3] + i[3]
		],
		[
			a[0] - i[0],
			a[1] - i[1],
			a[2] - i[2],
			a[3] - i[3]
		]
	].map((e) => {
		let t = Math.hypot(e[0], e[1], e[2]) || 1;
		return new Float32Array([
			e[0] / t,
			e[1] / t,
			e[2] / t,
			e[3] / t
		]);
	});
}
function qt(e, t, n) {
	for (let r of e) if (r[0] * t[0] + r[1] * t[1] + r[2] * t[2] + r[3] < -n) return !1;
	return !0;
}
var Jt = class {
	lastFrame = null;
	frameCount = 0;
	render(e, t) {
		return e.updateWorldTree(), this.renderFrame(Lt(e, t));
	}
	renderFrame(e) {
		return this.lastFrame = e, this.frameCount++, e;
	}
	dispose() {}
}, Yt = 6, Xt = 16, Zt = 64, Qt = .2, $t = .5;
function en(e, t, n, r, i, a, o = null, s = 0) {
	if (o) return [o === "left" ? Xt + a[0] : s - Xt - n - a[0], t - r / 2 + a[1]];
	let c = e - n / 2, l = t - r / 2;
	return i === "above" ? l = t - r - Yt : i === "below" ? l = t + Yt : i === "left" ? c = e - n - Yt : i === "right" && (c = e + Yt), [c + a[0], l + a[1]];
}
function tn(e, t, n = 4) {
	for (let r of ["left", "right"]) {
		let i = e.filter((e) => e.edge === r).sort((e, t) => e.top - t.top), a = [];
		for (let e of i) {
			let r = {
				items: [e],
				wants: [e.top],
				top: e.top,
				height: e.height
			};
			for (; a.length;) {
				let e = a[a.length - 1];
				if (e.top + e.height + n <= r.top) break;
				a.pop();
				let i = [...e.items, ...r.items], o = [...e.wants, ...r.wants], s = 0, c = 0;
				for (let e = 0; e < i.length; e++) c += o[e] - s, s += i[e].height + n;
				let l = s - n;
				r = {
					items: i,
					wants: o,
					top: Math.min(Math.max(c / i.length, 0), Math.max(0, t - l)),
					height: l
				};
			}
			a.push(r);
		}
		for (let e of a) {
			let t = e.top;
			for (let r of e.items) r.top = t, t += r.height + n;
		}
	}
}
function nn(e) {
	for (let t of ["left", "right"]) {
		let n = e.filter((e) => e.edge === t), r = Math.max(0, ...n.map((e) => e.width));
		for (let e of n) t === "right" && (e.left -= r - e.width), e.width = r;
	}
}
function rn(e, t, n, r = null, i = 0) {
	if (r) return [r === "left" ? n.left + n.width : n.left, n.top + n.height - i / 2];
	let a = Math.min(Math.max(e, n.left), n.left + n.width), o = Math.min(Math.max(t, n.top), n.top + n.height);
	return Math.hypot(a - e, o - t) < 2 ? null : [a, o];
}
function an(e) {
	let t = e.map((e, t) => t).sort((t, n) => {
		let r = e[t], i = e[n];
		return +(i.overlap === "show") - (r.overlap === "show") || i.priority - r.priority || +!!i.sticky - !!r.sticky || r.depth - i.depth || t - n;
	}), n = Array(e.length).fill("hide"), r = /* @__PURE__ */ new Map(), i = (e, t) => {
		let n = Math.floor(e.left / Zt), r = Math.floor((e.left + e.width) / Zt), i = Math.floor(e.top / Zt), a = Math.floor((e.top + e.height) / Zt);
		for (let e = n; e <= r; e++) for (let n = i; n <= a; n++) t(`${e},${n}`);
	}, a = (e, t) => {
		let n = Math.min(e.left + e.width, t.left + t.width) - Math.max(e.left, t.left), r = Math.min(e.top + e.height, t.top + t.height) - Math.max(e.top, t.top);
		return n <= 0 || r <= 0 ? 0 : Math.min(n / Math.max(1, Math.min(e.width, t.width)), r / Math.max(1, Math.min(e.height, t.height)));
	};
	for (let o of t) {
		let t = e[o];
		if (t.overlap !== "show") {
			let e = t.sticky ? $t : Qt, s = !!t.covered;
			if (i(t, (n) => {
				s ||= (r.get(n) ?? []).some((n) => a(t, n) > e);
			}), s) {
				n[o] = t.overlap === "dim" ? "dim" : "hide";
				continue;
			}
		}
		n[o] = "show", i(t, (e) => {
			let n = r.get(e);
			n || r.set(e, n = []), n.push(t);
		});
	}
	return n;
}
// src/labels.js
var on = "http://www.w3.org/2000/svg", sn = "0.4", cn = class {
	#e = null;
	#t = /* @__PURE__ */ new Map();
	shown = [];
	leaders = [];
	#n = null;
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new WeakMap();
	#a = null;
	constructor(e, t) {
		this.canvas = e, this.pointer = t;
	}
	get root() {
		return this.#d();
	}
	update(e, t = []) {
		let n = {
			total: e.length,
			shown: 0,
			overlapped: 0,
			dimmed: 0,
			occluded: 0,
			offscreen: 0,
			zoomedOut: 0
		};
		if (this.shown = [], this.leaders = [], !e.length && !this.#t.size && !t.length && !this.#r.size && !this.#e) return n;
		let r = this.#d();
		this.#o(r, t);
		let i = this.canvas.getBoundingClientRect();
		this.#p(r);
		let a = /* @__PURE__ */ new Set(), o = [];
		for (let t of e) a.add(t.key), t.visible ? t.style.minScale && t.scale * i.height / 2 < t.style.minScale ? n.zoomedOut++ : t.occluded && t.style.overlap === "hide" ? n.occluded++ : o.push({
			label: t,
			entry: this.#u(t, r)
		}) : n.offscreen++;
		for (let [e, t] of this.#t) a.has(e) || (this.#l(t), t.el.remove(), t.leader?.remove(), this.#t.delete(e));
		for (let { entry: e } of o) e.width < 0 && (e.el.style.display = "");
		for (let { entry: e } of o) e.width >= 0 || (e.el.style.minWidth = "", e.width = e.el.offsetWidth, e.height = e.el.offsetHeight);
		let s = o.map(({ label: e, entry: t }) => {
			let n = (e.ndc[0] * .5 + .5) * i.width, r = (.5 - e.ndc[1] * .5) * i.height, [a, o] = en(n, r, t.width, t.height, e.style.place, e.style.offset, e.style.edge, i.width);
			return {
				left: a,
				top: o,
				width: t.width,
				height: t.height,
				priority: e.style.priority,
				overlap: e.style.overlap,
				depth: e.depth,
				sticky: t.showing,
				covered: !!e.occluded,
				x: n,
				y: r,
				edge: e.style.edge
			};
		});
		nn(s), tn(s, i.height);
		let c = an(s);
		for (let e of this.#t.values()) e.showing = !1;
		let l = new Set(this.#t.values());
		o.forEach(({ label: e, entry: t }, r) => {
			let i = c[r];
			if (t.showing = i === "show", i === "hide") {
				n.overlapped++;
				return;
			}
			l.delete(t), t.label = e;
			let a = !!this.pointer?.interactive(e);
			a !== t.interactive && (t.interactive = a, t.el.style.pointerEvents = a ? "auto" : "", a ? t.el.dataset.interactive = "" : (delete t.el.dataset.interactive, this.#l(t))), i === "dim" ? n.dimmed++ : n.shown++, this.shown.push(t.el);
			let o = t.el, u = s[r];
			o.style.display = "", o.style.opacity = i === "dim" ? sn : "", u.left = Math.round(u.left), u.top = Math.round(u.top), o.style.transform = `translate(${u.left}px, ${u.top}px)`;
			let d = e.style.edge, f = d && t.width !== u.width ? `${u.width}px` : "", p = d === "right" ? "right" : "";
			(o.style.minWidth !== f || o.style.textAlign !== p) && Object.assign(o.style, {
				minWidth: f,
				textAlign: p,
				boxSizing: f ? "border-box" : ""
			});
			let m = Math.max(0, Math.round(1e5 - e.depth * 100));
			o.style.zIndex = String(i === "dim" ? Math.min(m, 99999) : 1e5 + m), e.style.leader ? this.#s(t, u, i === "dim" ? .4 : 1) : t.leader &&= (t.leader.remove(), null);
		});
		for (let e of l) this.#l(e), e.el.style.display = "none", e.leader && (e.leader.style.display = "none");
		return n;
	}
	#o(e, t) {
		let n = new Set(t);
		for (let t of n) t.parentElement !== e && e.append(t), this.#r.add(t);
		for (let e of this.#r) n.has(e) || (e.remove(), this.#r.delete(e));
	}
	#s(e, t, n) {
		let { x: r, y: i } = t;
		if (!e.color) {
			let t = getComputedStyle(e.el);
			e.color = t.color, e.rule = t.borderBottomStyle === "none" ? 0 : parseFloat(t.borderBottomWidth) || 0;
		}
		let a = rn(r, i, t, t.edge, e.rule), o = e.leader;
		o || (o = document.createElementNS(on, "g"), o.append(document.createElementNS(on, "line"), document.createElementNS(on, "circle")), this.#c().append(o), e.leader = o);
		let s = e.color;
		o.setAttribute("class", `phoria-leader${e.className.slice(12)}`), o.setAttribute("stroke", s), o.setAttribute("fill", s), o.style.display = "", o.style.opacity = String(n);
		let [c, l] = [...o.children];
		c.style.display = a ? "" : "none", a && (c.setAttribute("x1", String(r)), c.setAttribute("y1", String(i)), c.setAttribute("x2", String(a[0])), c.setAttribute("y2", String(a[1])), c.setAttribute("stroke-width", "1")), l.setAttribute("cx", String(r)), l.setAttribute("cy", String(i)), l.setAttribute("r", "2.5"), l.setAttribute("stroke", "none"), a && this.leaders.push({
			from: [r, i],
			to: a,
			color: s,
			opacity: n
		});
	}
	#c() {
		if (this.#n) return this.#n;
		let e = document.createElementNS(on, "svg");
		return e.setAttribute("class", "phoria-leaders"), Object.assign(e.style, {
			position: "absolute",
			left: "0",
			top: "0",
			width: "100%",
			height: "100%",
			overflow: "visible",
			zIndex: "0"
		}), this.#d().prepend(e), this.#n = e, e;
	}
	#l(e) {
		this.#a === e && (this.#a = null, e.label && this.pointer?.on("out", e.label, null));
	}
	dispose() {
		this.#a = null;
		for (let e of this.#r) e.remove();
		this.#r.clear(), this.#e?.remove(), this.#e = null, this.#n = null, this.#t.clear(), this.shown = [], this.leaders = [];
	}
	#u(e, t) {
		let n = this.#t.get(e.key);
		if (!n) {
			let r = document.createElement("div");
			Object.assign(r.style, {
				position: "absolute",
				left: "0",
				top: "0",
				willChange: "transform",
				transition: "opacity 0.15s"
			}), t.append(r), n = {
				el: r,
				text: "",
				className: "",
				width: -1,
				height: -1,
				showing: !1,
				leader: null,
				color: "",
				rule: 0,
				label: null,
				interactive: !1
			}, this.#t.set(e.key, n), this.#i.set(r, n);
		}
		let r = `phoria-label${e.style.className ? ` ${e.style.className}` : ""}`;
		return (n.text !== e.text || n.className !== r) && (n.el.textContent = n.text = e.text, n.el.className = n.className = r, n.width = n.height = -1, n.color = ""), n;
	}
	#d() {
		if (this.#e) return this.#e;
		if (!document.getElementById("phoria-labels-style")) {
			let e = document.createElement("style");
			e.id = "phoria-labels-style", e.textContent = ":where(.phoria-label) { white-space: nowrap } :where(.phoria-label[data-interactive]) { cursor: pointer }", document.head.prepend(e);
		}
		let e = document.createElement("div");
		return e.className = "phoria-labels", Object.assign(e.style, {
			position: "absolute",
			pointerEvents: "none",
			overflow: "hidden",
			zIndex: "0",
			isolation: "isolate"
		}), this.canvas.after(e), this.#e = e, this.#f(e), this.#p(e), e;
	}
	#f(e) {
		let t = (e) => {
			let t = this.#i.get(e.target);
			return t?.interactive && t.label ? t : null;
		};
		e.addEventListener("click", (e) => {
			let n = t(e);
			n?.label && this.pointer?.on("click", n.label, e);
		}), e.addEventListener("pointerover", (e) => {
			let n = t(e);
			n?.label && n !== this.#a && (this.#a = n, this.pointer?.on("over", n.label, e));
		}), e.addEventListener("pointerout", (e) => {
			let n = t(e);
			n && n === this.#a && this.#l(n);
		});
	}
	#p(e) {
		let t = this.canvas;
		e.style.position = getComputedStyle(t).position === "fixed" ? "fixed" : "absolute", e.style.left = `${t.offsetLeft + t.clientLeft}px`, e.style.top = `${t.offsetTop + t.clientTop}px`, e.style.width = `${t.clientWidth}px`, e.style.height = `${t.clientHeight}px`;
	}
}, ln = [
	"enabled",
	"mode",
	"rotateSpeed",
	"zoomSpeed",
	"zoom",
	"zoomToCursor",
	"pan",
	"inertia",
	"autoRotate",
	"minDistance",
	"maxDistance",
	"minPitch",
	"maxPitch"
], un = {
	enableDamping: "use 'inertia' (0 to turn it off)",
	enableRotate: "use mode: 'map' to make dragging pan instead of turning",
	rotate: "use mode: 'map' to make dragging pan instead of turning",
	enableZoom: "use 'zoom'",
	enablePan: "use 'pan'",
	screenSpacePanning: "panning always follows the screen",
	dampingFactor: "use 'inertia': the fraction of speed kept each 1/60 s (default 0.85)",
	target: "set camera.target - the control orbits around it"
}, dn = Math.PI / 2 - .001, fn = 4;
function pn(e) {
	let t = "OrbitControl";
	e.mode !== void 0 && P(t, "mode", e.mode, ["orbit", "map"]), e.rotateSpeed !== void 0 && N(t, "rotateSpeed", e.rotateSpeed, 0), e.zoomSpeed !== void 0 && N(t, "zoomSpeed", e.zoomSpeed, 0), e.inertia !== void 0 && N(t, "inertia", e.inertia, 0, .99), e.autoRotate === void 0 || typeof e.autoRotate == "boolean" || typeof e.autoRotate == "number" && Number.isFinite(e.autoRotate) || E(t, `'autoRotate' is true, false or a speed in radians per second, got ${j(e.autoRotate)}`), e.minDistance !== void 0 && N(t, "minDistance", e.minDistance, 0), e.maxDistance !== void 0 && N(t, "maxDistance", e.maxDistance, 0, Infinity, { above: !0 }), e.minPitch !== void 0 && N(t, "minPitch", e.minPitch, -Math.PI / 2, Math.PI / 2), e.maxPitch !== void 0 && N(t, "maxPitch", e.maxPitch, -Math.PI / 2, Math.PI / 2);
}
var mn = class {
	static OPTIONS = ln;
	static HINTS = un;
	enabled = !0;
	mode = "orbit";
	rotateSpeed = .005;
	zoomSpeed = .1;
	zoom = !0;
	zoomToCursor = !0;
	pan = !0;
	inertia = .85;
	autoRotate = !1;
	minDistance = .1;
	maxDistance = Infinity;
	minPitch = -dn;
	maxPitch = dn;
	camera;
	element;
	#e = /* @__PURE__ */ new Map();
	#t = {
		yaw: 0,
		pitch: 0
	};
	#n = 0;
	#r = !1;
	#i = !1;
	#a = {
		x: 0,
		y: 0
	};
	#o = 0;
	#s;
	#c = null;
	constructor(e, t, n = {}) {
		A("OrbitControl", n, ln, un), e && "target" in e || E("OrbitControl", "expects a camera, e.g. new OrbitControl(view.camera, view.canvas)"), this.camera = e, this.element = t, pn(n), Object.assign(this, n), this.minDistance > this.maxDistance && E("OrbitControl", `'minDistance' (${this.minDistance}) is more than 'maxDistance' (${this.maxDistance})`), this.minPitch > this.maxPitch && E("OrbitControl", `'minPitch' (${this.minPitch}) is more than 'maxPitch' (${this.maxPitch})`), e.target ??= new z(), t.style.touchAction = "none";
		let r = (e) => this.#f(e), i = (e) => this.#p(e), a = (e) => this.#m(e), o = (e) => this.#h(e), s = (e) => {
			this.enabled && this.pan && e.preventDefault();
		}, c = (e) => {
			this.#i &&= (e.stopImmediatePropagation(), !1);
		};
		t.addEventListener("pointerdown", r), t.addEventListener("pointermove", i), t.addEventListener("pointerup", a), t.addEventListener("pointercancel", a), t.addEventListener("wheel", o, { passive: !1 }), t.addEventListener("contextmenu", s), t.addEventListener("click", c, !0), this.#l = {
			down: r,
			move: i,
			up: a
		}, this.#c = () => {
			t.removeEventListener("pointerdown", r), t.removeEventListener("pointermove", i), t.removeEventListener("pointerup", a), t.removeEventListener("pointercancel", a), t.removeEventListener("click", c, !0);
		}, this.#s = () => {
			this.#c?.(), t.removeEventListener("wheel", o), t.removeEventListener("contextmenu", s);
		};
	}
	#l;
	handOverPointer() {
		return this.#c?.(), this.#c = null, this.#l;
	}
	get target() {
		return this.camera.target;
	}
	get spherical() {
		let e = this.camera.position.clone().sub(this.target), t = e.len() || this.minDistance;
		return {
			yaw: Math.atan2(e[0], e[2]),
			pitch: Math.asin(Math.max(-1, Math.min(1, e[1] / t))),
			distance: t
		};
	}
	set spherical({ yaw: e, pitch: t, distance: n }) {
		t = Math.min(this.maxPitch, Math.max(this.minPitch, t)), this.#u || (n = Math.min(this.maxDistance, Math.max(this.minDistance, n)));
		let r = this.target;
		this.camera.position.set(r[0] + n * Math.cos(t) * Math.sin(e), r[1] + n * Math.sin(t), r[2] + n * Math.cos(t) * Math.cos(e));
	}
	rotate(e, t) {
		let n = this.spherical;
		this.spherical = {
			yaw: n.yaw + e,
			pitch: n.pitch + t,
			distance: n.distance
		};
	}
	zoomBy(e) {
		let t = this.camera;
		if (this.#u) {
			t.height = Math.min(this.maxDistance, Math.max(this.minDistance, 1e-4, t.height * e));
			return;
		}
		let n = this.spherical;
		this.spherical = {
			...n,
			distance: n.distance * e
		};
	}
	zoomAt(e, t, n) {
		let r = this.#d();
		this.zoomBy(e);
		let i = 1 - this.#d() / r;
		if (!i) return;
		this.camera.updateWorld();
		let a = this.camera.worldMatrix, o = new z(a[0], a[1], a[2]).normalize().multiplyScalar(t * r * this.camera.aspect * i), s = new z(a[4], a[5], a[6]).normalize().multiplyScalar(n * r * i).add(o);
		this.camera.position.add(s), this.target.add(s);
	}
	get #u() {
		return this.camera.constructor.type === "orthographic-camera";
	}
	#d() {
		let e = this.camera;
		return this.#u ? e.height / 2 : this.spherical.distance * Math.tan(e.fov * Math.PI / 360);
	}
	panBy(e, t) {
		this.camera.updateWorld();
		let n = this.camera.worldMatrix, r = new z(n[0], n[1], n[2]).normalize(), i = new z(n[4], n[5], n[6]).normalize(), a = this.camera, o = this.element.clientHeight || 1, s = this.#u ? a.height / o : 2 * this.spherical.distance * Math.tan(a.fov * Math.PI / 180 / 2) / o, c = r.multiplyScalar(-e * s).add(i.multiplyScalar(t * s));
		this.camera.position.add(c), this.target.add(c);
	}
	update(e, t = !1) {
		if (this.enabled && this.#e.size === 0) {
			let n = this.#t;
			if (Math.abs(n.yaw) > .001 || Math.abs(n.pitch) > .001) {
				this.rotate(n.yaw * e, n.pitch * e);
				let t = Math.min(.99, Math.max(0, this.inertia)) ** (e * 60);
				n.yaw *= t, n.pitch *= t;
			}
			this.autoRotate && !t && this.rotate(-(this.autoRotate === !0 ? .5 : this.autoRotate) * e, 0);
		}
	}
	cancel() {
		this.#e.clear(), this.#o = 0, this.#t = {
			yaw: 0,
			pitch: 0
		}, this.#i = !1;
	}
	dispose() {
		this.#s(), this.element.style.touchAction = "";
	}
	#f(e) {
		if (!(!this.enabled || e.pointerType === "mouse" && e.button !== 0 && e.button !== 2) && (e.button !== 2 || this.pan)) {
			try {
				this.element.setPointerCapture(e.pointerId);
			} catch {}
			this.#e.set(e.pointerId, {
				x: e.clientX,
				y: e.clientY
			}), this.#a = {
				x: e.clientX,
				y: e.clientY
			}, this.#i = !1, this.#t = {
				yaw: 0,
				pitch: 0
			}, this.#n = performance.now(), this.#o = this.#g(), this.#r = e.button === 2 || this.mode === "map", this.#r && !this.pan && this.#e.delete(e.pointerId);
		}
	}
	#p(e) {
		let t = this.#e.get(e.pointerId);
		if (!t || !this.enabled) return;
		let n = e.clientX - t.x, r = e.clientY - t.y;
		if (t.x = e.clientX, t.y = e.clientY, !this.#i && Math.hypot(e.clientX - this.#a.x, e.clientY - this.#a.y) >= 4 && (this.#i = !0), this.#e.size >= 2) {
			let e = this.#g();
			this.zoom && this.#o > 0 && e > 0 && this.zoomBy(this.#o / e), this.#o = e, this.pan && this.panBy(n / 2, r / 2);
		} else if (this.#r) this.panBy(n, r);
		else {
			let e = -n * this.rotateSpeed, t = r * this.rotateSpeed;
			this.rotate(e, t);
			let i = performance.now(), a = Math.max(1 / 60, (i - this.#n) / 1e3), o = (e) => Math.max(-4, Math.min(fn, e / a));
			this.#t = {
				yaw: o(e),
				pitch: o(t)
			}, this.#n = i;
		}
	}
	#m(e) {
		this.#e.delete(e.pointerId), this.#o = this.#g(), (this.inertia <= 0 || performance.now() - this.#n > 80) && (this.#t = {
			yaw: 0,
			pitch: 0
		});
	}
	#h(e) {
		if (!this.enabled || !this.zoom) return;
		e.preventDefault();
		let t = 1 + Math.sign(e.deltaY) * this.zoomSpeed;
		if (!this.zoomToCursor) return this.zoomBy(t);
		let n = this.element.getBoundingClientRect();
		this.zoomAt(t, (e.clientX - n.left) / n.width * 2 - 1, 1 - (e.clientY - n.top) / n.height * 2);
	}
	#g() {
		if (this.#e.size < 2) return 0;
		let [e, t] = [...this.#e.values()];
		return Math.hypot(e.x - t.x, e.y - t.y);
	}
}, hn = new Float32Array([
	0,
	1,
	0
]), gn = /* @__PURE__ */ new Float32Array(16), _n = /* @__PURE__ */ new Float32Array(9);
function vn(e, t) {
	if (e.position.equals(t, 1e-9)) return;
	let n = t.clone().sub(e.position).normalize(), r = Math.hypot(n[0], n[2]) < 5e-4 ? [
		0,
		0,
		-1
	] : hn;
	f(gn, e.position, t, r);
	let i = Oe(/* @__PURE__ */ new Float32Array(4), je(/* @__PURE__ */ new Float32Array(4), at(_n, gn)));
	e.quaternion.copy(i);
}
var yn = [
	...G,
	"near",
	"far",
	"target",
	"aspect"
], bn = {
	lookAt: "use target: [x, y, z], or call camera.lookAt(...) after creating it",
	zoom: "move the camera, or change 'fov' (perspective) or 'height' (orthographic)"
}, xn = class extends K {
	static OPTIONS = yn;
	static HINTS = bn;
	near = .1;
	far = 1e3;
	aspect = 1;
	#e = null;
	constructor(e = {}) {
		super(e);
		let t = this.constructor.name;
		e.near !== void 0 && (this.near = M(t, "near", e.near)), e.far !== void 0 && (this.far = M(t, "far", e.far)), e.aspect !== void 0 && (this.aspect = M(t, "aspect", e.aspect)), this.near > 0 && this.far > this.near || E(t, `needs 0 < near < far, got near ${this.near} and far ${this.far}`), e.target !== void 0 && (this.target = z.fromInput(e.target, t));
	}
	get target() {
		return this.#e;
	}
	set target(e) {
		this.#e = dt(this.#e, e, this.constructor.name);
	}
	updateMatrix() {
		return this.target && vn(this, this.target), super.updateMatrix();
	}
	lookAt(e, t) {
		return this.target ? (this.target.copy(ft(this, e)), this) : super.lookAt(e, t);
	}
	get projectionMatrix() {
		return new B();
	}
	get viewMatrix() {
		return this.worldMatrix.clone().invert();
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			near: this.near,
			far: this.far,
			aspect: this.aspect,
			...this.target ? { target: this.target.toArray() } : {}
		};
	}
	jsonOptions() {
		let e = {};
		return this.near !== .1 && (e.near = this.near), this.far !== 1e3 && (e.far = this.far), this.target && (e.target = this.target.toArray()), e;
	}
}, Sn = class extends xn {
	static type = "perspective-camera";
	static get OPTIONS() {
		return [...yn, "fov"];
	}
	fov = 50;
	constructor(e = {}) {
		super(e), e.fov !== void 0 && (this.fov = M("PerspectiveCamera", "fov", e.fov), (this.fov <= 0 || this.fov >= 180) && E("PerspectiveCamera", `'fov' is the vertical angle in degrees, 0-180 exclusive, got ${this.fov}`));
	}
	get projectionMatrix() {
		return c(new B(), this.fov * Math.PI / 180, this.aspect, this.near, this.far);
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			fov: this.fov
		};
	}
	jsonOptions() {
		return {
			...super.jsonOptions(),
			...this.fov === 50 ? {} : { fov: this.fov }
		};
	}
}, Cn = class extends xn {
	static type = "orthographic-camera";
	static get OPTIONS() {
		return [...yn, "height"];
	}
	height = 10;
	constructor(e = {}) {
		super(e), e.height !== void 0 && (this.height = M("OrthographicCamera", "height", e.height));
	}
	get projectionMatrix() {
		let e = this.height / 2, t = e * this.aspect;
		return d(new B(), -t, t, -e, e, this.near, this.far);
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			height: this.height
		};
	}
	jsonOptions() {
		return {
			...super.jsonOptions(),
			...this.height === 10 ? {} : { height: this.height }
		};
	}
}, wn = {
	perspective: [
		.6,
		.45,
		1
	],
	isometric: [
		1,
		1,
		1
	],
	top: [
		0,
		1,
		0
	],
	front: [
		0,
		0,
		1
	],
	side: [
		1,
		0,
		0
	]
}, Tn = Object.keys(wn), En = {
	ortho: "isometric",
	orthographic: "isometric",
	iso: "isometric",
	plan: "top",
	overhead: "top",
	above: "top",
	map: "top",
	elevation: "front",
	left: "side",
	right: "side",
	persp: "perspective",
	"3d": "perspective"
};
function Dn(e, { target: t = [
	0,
	0,
	0
], distance: n = 10 } = {}) {
	let r = On(e), i = new z(t[0], t[1], t[2]).add(r.multiplyScalar(n));
	return e === "perspective" ? new Sn({
		fov: 45,
		position: i,
		target: [
			t[0],
			t[1],
			t[2]
		]
	}) : new Cn({
		height: n,
		position: i,
		target: [
			t[0],
			t[1],
			t[2]
		],
		far: Math.max(1e3, n * 20)
	});
}
function On(e) {
	if (!(e in wn)) {
		let t = En[String(e).toLowerCase()];
		E("View", `camera '${e}' is not a preset - ${t ? `use '${t}'` : `expected one of ${Tn.map((e) => `'${e}'`).join(", ")}${k(String(e), Tn)}`}`);
	}
	return new z(...wn[e]).normalize();
}
var kn = .12;
function An(e, t, { aspect: n, fov: r, padding: i = 0 }) {
	let a = 1 + i, o = n > 0 ? n : 1, s = new z(-t[0], -t[1], -t[2]), c = s.clone().cross(Math.abs(s[1]) > .9999 ? [
		0,
		0,
		-1
	] : [
		0,
		1,
		0
	]).normalize(), l = c.clone().cross(s), u = [
		c,
		l,
		s
	], d = e.map((e) => u.map((t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2])), f = [
		0,
		1,
		2
	].map((e) => Math.min(...d.map((t) => t[e]))), p = [
		0,
		1,
		2
	].map((e) => Math.max(...d.map((t) => t[e]))), m = [
		0,
		1,
		2
	].map((e) => (f[e] + p[e]) / 2), h = (e) => c[e] * m[0] + l[e] * m[1] + s[e] * m[2], g = () => new z(h(0), h(1), h(2));
	if (r === void 0) {
		let e = Math.max((p[1] - f[1]) / 2, (p[0] - f[0]) / 2 / o) * a;
		return {
			center: g(),
			size: Math.max(e * 2, .001)
		};
	}
	let _ = Math.tan(r * Math.PI / 360), v = _ * o, y = Math.max(...[
		0,
		1,
		2
	].map((e) => p[e] - f[e]), .001) * .05, b = () => Math.max(.001, ...d.map((e) => {
		let t = Math.abs(e[0] - m[0]) * a, n = Math.abs(e[1] - m[1]) * a, r = e[2] - m[2];
		return Math.max(t / v - r, n / _ - r, y - r);
	})), x = b();
	for (let e = 0; e < 8; e++) {
		let e = Infinity, t = -Infinity, n = Infinity, r = -Infinity;
		for (let i of d) {
			let a = x + i[2] - m[2], o = (i[0] - m[0]) / a / v, s = (i[1] - m[1]) / a / _;
			e = Math.min(e, o), t = Math.max(t, o), n = Math.min(n, s), r = Math.max(r, s);
		}
		let i = (e + t) / 2, a = (n + r) / 2 + kn;
		if (Math.abs(i) < 1e-4 && Math.abs(a) < 1e-4) break;
		m[0] += i * v * x, m[1] += a * _ * x, x = b();
	}
	return {
		center: g(),
		size: x
	};
}
function jn(e, t, n) {
	if (e === "height" || !(n > 0) || !(t > 0)) return 1;
	let r = t / n;
	return e === "width" ? r : Math.max(1, r);
}
// src/ease.js
var Mn = {
	linear: (e) => e,
	in: (e) => e * e * e,
	out: (e) => 1 - (1 - e) ** 3,
	inOut: (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2
}, Nn = new z(), Pn = new z(), Fn = new z(), q = new z(), In = new z(), Ln = class e {
	origin = new z();
	direction = new z(0, 0, -1);
	constructor(e, t) {
		e && this.origin.set(e[0], e[1], e[2]), t && this.direction.set(t[0], t[1], t[2]).normalize();
	}
	at(e, t = new z()) {
		return t.copy(this.direction).multiplyScalar(e).add(this.origin);
	}
	clone() {
		return new e(this.origin, this.direction);
	}
	applyMatrix4(e) {
		let t = this.at(1);
		return this.origin.applyMatrix4(e), t.applyMatrix4(e), this.direction.copy(t).sub(this.origin).normalize(), this;
	}
	intersectSphere(e, t) {
		q.set(e[0], e[1], e[2]).sub(this.origin);
		let n = q.dot(this.direction), r = q.dot(q) - n * n, i = t * t;
		if (r > i) return null;
		let a = Math.sqrt(i - r), o = n - a, s = n + a;
		return s < 0 ? null : o < 0 ? s : o;
	}
	intersectPlane(e, t) {
		let n = e[0] * this.direction[0] + e[1] * this.direction[1] + e[2] * this.direction[2];
		if (Math.abs(n) < 1e-9) return null;
		let r = (e[0] * (t[0] - this.origin[0]) + e[1] * (t[1] - this.origin[1]) + e[2] * (t[2] - this.origin[2])) / n;
		return r >= 0 ? r : null;
	}
	intersectTriangle(e, t, n, r) {
		Nn.set(t[0] - e[0], t[1] - e[1], t[2] - e[2]), Pn.set(n[0] - e[0], n[1] - e[1], n[2] - e[2]), Fn.copy(this.direction).cross(Pn);
		let i = Nn.dot(Fn);
		if (r ? i < 1e-10 : Math.abs(i) < 1e-10) return null;
		let a = 1 / i;
		q.set(this.origin[0] - e[0], this.origin[1] - e[1], this.origin[2] - e[2]);
		let o = q.dot(Fn) * a;
		if (o < 0 || o > 1) return null;
		In.copy(q).cross(Nn);
		let s = this.direction.dot(In) * a;
		if (s < 0 || o + s > 1) return null;
		let c = Pn.dot(In) * a;
		return c >= 0 ? {
			t: c,
			u: o,
			v: s
		} : null;
	}
	distanceSqToPoint(e) {
		q.set(e[0] - this.origin[0], e[1] - this.origin[1], e[2] - this.origin[2]);
		let t = Math.max(0, q.dot(this.direction)), n = this.at(t, In);
		return {
			distanceSq: (e[0] - n[0]) ** 2 + (e[1] - n[1]) ** 2 + (e[2] - n[2]) ** 2,
			t
		};
	}
	distanceSqToSegment(e, t) {
		let n = this.direction, r = t[0] - e[0], i = t[1] - e[1], a = t[2] - e[2], o = this.origin[0] - e[0], s = this.origin[1] - e[1], c = this.origin[2] - e[2], l = n[0] * r + n[1] * i + n[2] * a, u = r * r + i * i + a * a, d = n[0] * o + n[1] * s + n[2] * c, f = r * o + i * s + a * c, p = 1 * u - l * l, m = p > 1e-12 ? (1 * f - l * d) / p : 0;
		m = Math.min(1, Math.max(0, m));
		let h = l * m - d;
		h < 0 && (h = 0, m = u > 1e-12 ? Math.min(1, Math.max(0, f / u)) : 0);
		let g = this.origin[0] + n[0] * h - (e[0] + r * m), _ = this.origin[1] + n[1] * h - (e[1] + i * m), v = this.origin[2] + n[2] * h - (e[2] + a * m);
		return {
			distanceSq: g * g + _ * _ + v * v,
			t: h,
			s: m
		};
	}
}, Rn = 8, zn = /* @__PURE__ */ new WeakMap();
function Bn(e, t) {
	let n = zn.get(e);
	if (n && n.version === e.version && n.count === t) return n.bvh;
	let r = Vn(e, t);
	return zn.set(e, {
		version: e.version,
		count: t,
		bvh: r
	}), r;
}
function Vn(e, t) {
	let n = e.positions, r = e.indices, i = (e, t) => (r ? r[e * 3 + t] : e * 3 + t) * 3, a = new Float32Array(t * 9);
	for (let e = 0; e < t; e++) {
		let t = i(e, 0), r = i(e, 1), o = i(e, 2);
		for (let i = 0; i < 3; i++) {
			let s = Math.min(n[t + i], n[r + i], n[o + i]), c = Math.max(n[t + i], n[r + i], n[o + i]);
			a[e * 9 + i] = s, a[e * 9 + 3 + i] = c, a[e * 9 + 6 + i] = (s + c) / 2;
		}
	}
	let o = new Uint32Array(t);
	for (let e = 0; e < t; e++) o[e] = e;
	let s = Math.max(1, 2 * Math.ceil(t / Rn) * 2), c = new Float32Array(s * 6), l = new Int32Array(s * 2), u = 0, d = () => {
		let e = new Float32Array(c.length * 2), t = new Int32Array(l.length * 2);
		e.set(c), t.set(l), c = e, l = t;
	}, f = () => ((u + 1) * 2 > l.length && d(), u++), p = [[
		f(),
		0,
		t
	]];
	for (; p.length;) {
		let [e, t, n] = p.pop(), r = Infinity, i = Infinity, s = Infinity, u = -Infinity, d = -Infinity, m = -Infinity, h = Infinity, g = Infinity, _ = Infinity, v = -Infinity, y = -Infinity, b = -Infinity;
		for (let e = t; e < n; e++) {
			let t = o[e] * 9;
			r = Math.min(r, a[t]), i = Math.min(i, a[t + 1]), s = Math.min(s, a[t + 2]), u = Math.max(u, a[t + 3]), d = Math.max(d, a[t + 4]), m = Math.max(m, a[t + 5]), h = Math.min(h, a[t + 6]), g = Math.min(g, a[t + 7]), _ = Math.min(_, a[t + 8]), v = Math.max(v, a[t + 6]), y = Math.max(y, a[t + 7]), b = Math.max(b, a[t + 8]);
		}
		c.set([
			r,
			i,
			s,
			u,
			d,
			m
		], e * 6);
		let x = v - h, S = y - g, C = b - _;
		if (n - t <= Rn || Math.max(x, S, C) <= 0) {
			l[e * 2] = t, l[e * 2 + 1] = n - t;
			continue;
		}
		let w = x >= S && x >= C ? 6 : S >= C ? 7 : 8, T = t + n >> 1;
		Hn(o, a, w, t, n, T);
		let E = f();
		f(), l[e * 2] = E, l[e * 2 + 1] = 0, p.push([
			E,
			t,
			T
		], [
			E + 1,
			T,
			n
		]);
	}
	return {
		boxes: c.slice(0, u * 6),
		nodes: l.slice(0, u * 2),
		order: o
	};
}
function Hn(e, t, n, r, i, a) {
	let o = r, s = i - 1;
	for (; o < s;) {
		let r = t[e[o + s >> 1] * 9 + n], i = o, c = s;
		for (; i <= c;) {
			for (; t[e[i] * 9 + n] < r;) i++;
			for (; t[e[c] * 9 + n] > r;) c--;
			if (i <= c) {
				let t = e[i];
				e[i] = e[c], e[c] = t, i++, c--;
			}
		}
		if (a <= c) s = c;
		else if (a >= i) o = i;
		else break;
	}
}
function Un(e, t, n, r) {
	let { boxes: i, nodes: a, order: o } = e, s = 1 / n[0], c = 1 / n[1], l = 1 / n[2], u = (e) => {
		let n = e * 6, r = (i[n] - t[0]) * s, a = (i[n + 3] - t[0]) * s, o = Math.min(r, a), u = Math.max(r, a);
		return r = (i[n + 1] - t[1]) * c, a = (i[n + 4] - t[1]) * c, o = Math.max(o, Math.min(r, a)), u = Math.min(u, Math.max(r, a)), r = (i[n + 2] - t[2]) * l, a = (i[n + 5] - t[2]) * l, o = Math.max(o, Math.min(r, a)), u = Math.min(u, Math.max(r, a)), u >= Math.max(o, 0) || Number.isNaN(o) || Number.isNaN(u) ? Math.max(o, 0) || 0 : Infinity;
	}, d = Infinity, f = (e) => e !== Infinity && e <= d, p = u(0);
	if (p === Infinity) return;
	let m = [0], h = [p];
	for (; m.length;) {
		let e = m.pop();
		if (h.pop() > d) continue;
		let t = a[e * 2], n = a[e * 2 + 1];
		if (n) {
			for (let e = t; e < t + n; e++) d = Math.min(d, r(o[e]));
			continue;
		}
		let i = u(t), s = u(t + 1);
		i <= s ? (f(s) && (m.push(t + 1), h.push(s)), f(i) && (m.push(t), h.push(i))) : (f(i) && (m.push(t), h.push(i)), f(s) && (m.push(t + 1), h.push(s)));
	}
}
// src/Raycaster.js
var Wn = /* @__PURE__ */ new Float32Array(16), Gn = /* @__PURE__ */ new Float32Array(16), J = new z(), Y = new z(), Kn = new z(), qn = /* @__PURE__ */ new Float32Array(4), Jn = (e) => e?.clip ? {
	plane: Ce(e),
	cap: !!e.clip.cap
} : null, Yn = class {
	ray = new Ln();
	near = 0;
	far = Infinity;
	threshold = .1;
	camera = null;
	setFromCamera(e, t) {
		if (t.updateWorld(), this.camera = t, t.constructor.type === "orthographic-camera") {
			let n = a(/* @__PURE__ */ new Float32Array(16), s(/* @__PURE__ */ new Float32Array(16), t.projectionMatrix, t.viewMatrix));
			if (!n) return this;
			let r = new z(e[0], e[1], -1).applyMatrix4(n);
			return this.ray.origin.copy(r), this.ray.direction.copy(new z(e[0], e[1], 1).applyMatrix4(n)).sub(r).normalize(), this;
		}
		let n = t.projectionMatrix, r = t.worldMatrix, i = (e[0] + n[8]) / n[0], o = (e[1] + n[9]) / n[5];
		return this.ray.origin.copy(t.worldPosition), this.ray.direction.set(r[0] * i + r[4] * o - r[8], r[1] * i + r[5] * o - r[9], r[2] * i + r[6] * o - r[10]).normalize(), this;
	}
	intersect(e) {
		let t = [];
		for (let n of [e].flat()) n.updateWorld(), this.#e(n, t, Jn(we(n.parent)));
		return t.filter((e) => e.distance >= this.near && e.distance <= this.far).sort((e, t) => e.distance - t.distance);
	}
	intersectDrawn(e) {
		let t = [];
		for (let n of e) {
			let e = n.node;
			if (e.drawMode !== "triangles") continue;
			let r = n.clip ? {
				plane: n.clip.plane,
				cap: !!n.clip.cap
			} : null;
			if (n.instances) for (let i = 0; i < n.instances.count; i++) s(Gn, n.worldMatrix, n.instances.instanceMatrices.subarray(i * 16, i * 16 + 16)), this.#t(e, Gn, i, t, r);
			else this.#t(e, n.worldMatrix, null, t, r);
		}
		return t.filter((e) => e.distance >= this.near && e.distance <= this.far).sort((e, t) => e.distance - t.distance);
	}
	static solids(e) {
		let t = [];
		for (let n of e) {
			let e = n.node;
			if (e.drawMode !== "triangles" || !e.geometry.vertexCount) continue;
			let r = e.geometry.bounds, i = r.getCenter(), a = r.getRadius(), o = n.clip ? {
				plane: n.clip.plane,
				cap: !!n.clip.cap
			} : null, c = (n, r) => {
				let s = i.clone().applyMatrix4(n), c = Math.max(Math.hypot(n[0], n[1], n[2]), Math.hypot(n[4], n[5], n[6]), Math.hypot(n[8], n[9], n[10]));
				t.push({
					node: e,
					world: n,
					instance: r,
					cut: o,
					x: s[0],
					y: s[1],
					z: s[2],
					radius: a * c
				});
			};
			if (n.instances) for (let e = 0; e < n.instances.count; e++) c(s(/* @__PURE__ */ new Float32Array(16), n.worldMatrix, n.instances.instanceMatrices.subarray(e * 16, e * 16 + 16)), e);
			else c(Float32Array.from(n.worldMatrix), null);
		}
		return t;
	}
	blocked(e, t, n = null, r = null) {
		let i = this.ray.origin, a = this.ray.direction, o = [];
		for (let s of e) {
			if (s.node === n && (r === null || s.instance === r)) continue;
			let e = s.x - i[0], c = s.y - i[1], l = s.z - i[2], u = e * a[0] + c * a[1] + l * a[2], d = e * e + c * c + l * l - u * u, f = s.radius * s.radius;
			if (d > f) continue;
			let p = Math.sqrt(f - d);
			if (!(u - p > t || u + p < 0) && (o.length = 0, this.#t(s.node, s.world, s.instance, o, s.cut), o.length && o[0].distance < t)) return !0;
		}
		return !1;
	}
	intersectElement(e, t) {
		e.updateWorld();
		let n = e, r = [], i = Jn(we(e));
		if (n.drawMode === "triangles" && n.instanceMatrices) {
			if (t >= n.count) return null;
			s(Gn, n.worldMatrix, n.instanceMatrices.subarray(t * 16, t * 16 + 16)), this.#t(n, Gn, t, r, i);
		} else if (n.drawMode === "triangles") this.#t(n, n.worldMatrix, null, r, i);
		else if (n.drawMode === "points") {
			let e = n.geometry.positions;
			if (t >= n.geometry.drawnVertices) return null;
			let i = new z(e[t * 3], e[t * 3 + 1], e[t * 3 + 2]).applyMatrix4(n.worldMatrix);
			r.push({
				node: n,
				point: i,
				distance: i.distanceTo(this.ray.origin),
				normal: null,
				face: t,
				instance: null,
				uv: null,
				datum: n.datumAt(t)
			});
		} else if (n.drawMode === "lines") {
			let e = n.geometry, i = e.positions, a = e.indices, o = a ? a[t * 2] : t * 2, s = a ? a[t * 2 + 1] : t * 2 + 1;
			if (s >= e.vertexCount) return null;
			J.set(i[o * 3], i[o * 3 + 1], i[o * 3 + 2]).applyMatrix4(n.worldMatrix), Y.set(i[s * 3], i[s * 3 + 1], i[s * 3 + 2]).applyMatrix4(n.worldMatrix);
			let { t: c } = this.ray.distanceSqToSegment(J, Y);
			r.push({
				node: n,
				point: this.ray.at(c),
				distance: c,
				normal: null,
				face: t,
				instance: null,
				uv: null,
				datum: n.datumAt(t)
			});
		}
		return r[0] ?? null;
	}
	#e(e, t, n) {
		if (!(this.camera ? e.shownTo(this.camera) : e.visible) || !e.pickable) return;
		e.clip && (n = Jn(e));
		let r = e;
		if (r.drawMode === "triangles" && r.instanceMatrices) for (let e = 0; e < r.count; e++) s(Gn, r.worldMatrix, r.instanceMatrices.subarray(e * 16, e * 16 + 16)), this.#t(r, Gn, e, t, n);
		else r.drawMode === "triangles" ? this.#t(r, r.worldMatrix, null, t, n) : r.drawMode === "points" ? this.#n(r, t) : r.drawMode === "lines" && this.#r(r, t);
		for (let r of e.children) this.#e(r, t, n);
	}
	#t(e, t, n, r, i = null) {
		let o = e.geometry;
		if (!o.vertexCount) return;
		let s = o.bounds, c = s.getCenter().applyMatrix4(t), l = Math.max(Math.hypot(t[0], t[1], t[2]), Math.hypot(t[4], t[5], t[6]), Math.hypot(t[8], t[9], t[10]));
		if (this.ray.intersectSphere(c, s.getRadius() * l) === null || !a(Wn, t)) return;
		let u = this.ray.clone().applyMatrix4(Wn), d = o.positions, f = o.indices, p = !e.material.doubleSided && !i?.cap;
		if (i) for (let e = 0; e < 4; e++) qn[e] = i.plane[0] * t[e * 4] + i.plane[1] * t[e * 4 + 1] + i.plane[2] * t[e * 4 + 2] + i.plane[3] * t[e * 4 + 3];
		let m = u.origin, h = u.direction, g = null, _ = Infinity, v = -1, y = (e) => {
			let t = f ? f[e * 3] : e * 3, n = f ? f[e * 3 + 1] : e * 3 + 1, r = f ? f[e * 3 + 2] : e * 3 + 2;
			J.set(d[t * 3], d[t * 3 + 1], d[t * 3 + 2]), Y.set(d[n * 3], d[n * 3 + 1], d[n * 3 + 2]), Kn.set(d[r * 3], d[r * 3 + 1], d[r * 3 + 2]);
			let a = u.intersectTriangle(J, Y, Kn, p);
			return a && i && qn[0] * (m[0] + h[0] * a.t) + qn[1] * (m[1] + h[1] * a.t) + qn[2] * (m[2] + h[2] * a.t) + qn[3] > 0 || a && (a.t < _ || a.t === _ && e < v) && (g = {
				...a,
				i0: t,
				i1: n,
				i2: r
			}, _ = a.t, v = e), _;
		}, b = Math.floor(o.drawnCount / 3);
		if (b >= 128) Un(Bn(o, b), m, h, y);
		else for (let e = 0; e < b; e++) y(e);
		if (!g) return;
		let x = u.at(g.t).applyMatrix4(t);
		J.set(d[g.i0 * 3], d[g.i0 * 3 + 1], d[g.i0 * 3 + 2]), Y.set(d[g.i1 * 3], d[g.i1 * 3 + 1], d[g.i1 * 3 + 2]).sub(J), Kn.set(d[g.i2 * 3], d[g.i2 * 3 + 1], d[g.i2 * 3 + 2]).sub(J);
		let S = Y.clone().cross(Kn), C = it(/* @__PURE__ */ new Float32Array(9), t), w = C ? new z(C[0] * S[0] + C[3] * S[1] + C[6] * S[2], C[1] * S[0] + C[4] * S[1] + C[7] * S[2], C[2] * S[0] + C[5] * S[1] + C[8] * S[2]).normalize() : null;
		if (i?.cap && w && w.dot(this.ray.direction) > 0) {
			let e = i.plane, { origin: t, direction: n } = this.ray, r = e[0] * n[0] + e[1] * n[1] + e[2] * n[2];
			r < 0 && (x = this.ray.at(-(e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3]) / r)), w = new z(e[0], e[1], e[2]);
		}
		let T = null;
		if (o.uvs) {
			let e = 1 - g.u - g.v, t = o.uvs;
			T = [e * t[g.i0 * 2] + g.u * t[g.i1 * 2] + g.v * t[g.i2 * 2], e * t[g.i0 * 2 + 1] + g.u * t[g.i1 * 2 + 1] + g.v * t[g.i2 * 2 + 1]];
		}
		let E = e.datumAt(n);
		if (n === null && Array.isArray(e.data) && e.data.length === o.vertexCount) {
			let t = 1 - g.u - g.v;
			E = e.data[t >= g.u && t >= g.v ? g.i0 : g.u >= g.v ? g.i1 : g.i2] ?? null;
		}
		r.push({
			node: e,
			point: x,
			distance: x.distanceTo(this.ray.origin),
			normal: w,
			face: v,
			instance: n,
			uv: T,
			datum: E
		});
	}
	#n(e, t) {
		let n = e.geometry.positions, r = e.worldMatrix, i = this.threshold * this.threshold, a = null;
		for (let t = 0, o = e.geometry.drawnVertices; t < o; t++) {
			J.set(n[t * 3], n[t * 3 + 1], n[t * 3 + 2]).applyMatrix4(r);
			let { distanceSq: o } = this.ray.distanceSqToPoint(J);
			if (o > i) continue;
			let s = J.distanceTo(this.ray.origin);
			(!a || s < a.distance) && (a = {
				node: e,
				point: J.clone(),
				distance: s,
				normal: null,
				face: t,
				instance: null,
				uv: null,
				datum: e.datumAt(t)
			});
		}
		a && t.push(a);
	}
	#r(e, t) {
		let n = e.geometry, r = n.positions, i = n.indices, a = e.worldMatrix, o = this.threshold * this.threshold, s = null;
		for (let t = 0, c = Math.floor(n.drawnCount / 2); t < c; t++) {
			let n = i ? i[t * 2] : t * 2, c = i ? i[t * 2 + 1] : t * 2 + 1;
			J.set(r[n * 3], r[n * 3 + 1], r[n * 3 + 2]).applyMatrix4(a), Y.set(r[c * 3], r[c * 3 + 1], r[c * 3 + 2]).applyMatrix4(a);
			let { distanceSq: l, t: u } = this.ray.distanceSqToSegment(J, Y);
			l > o || (!s || u < s.distance) && (s = {
				node: e,
				point: this.ray.at(u),
				distance: u,
				normal: null,
				face: t,
				instance: null,
				uv: null,
				datum: e.datumAt(t)
			});
		}
		s && t.push(s);
	}
}, Xn = /* @__PURE__ */ new WeakMap(), Zn = 1, X = (e) => {
	let t = Xn.get(e);
	return t === void 0 && Xn.set(e, t = Zn++), t;
}, Qn = class {
	#e = /* @__PURE__ */ new Float64Array(256);
	#t = /* @__PURE__ */ new Float64Array(256);
	#n = 0;
	#r = -1;
	#i = [];
	#a = [];
	changed(e, t) {
		this.#n = 0, this.#i = [], this.#c(t), this.#l(e, t);
		let n = this.#n !== this.#r || this.#i.length !== this.#a.length;
		for (let e = 0; !n && e < this.#n; e++) n = this.#e[e] !== this.#t[e];
		for (let e = 0; !n && e < this.#i.length; e++) n = this.#i[e] !== this.#a[e];
		return [this.#t, this.#e] = [this.#e, this.#t], this.#r = this.#n, this.#a = this.#i, n;
	}
	reset() {
		this.#r = -1;
	}
	#o(e) {
		if (this.#n === this.#e.length) {
			let e = new Float64Array(this.#e.length * 2);
			e.set(this.#e), this.#e = e;
			let t = new Float64Array(e.length);
			t.set(this.#t), this.#t = t;
		}
		this.#e[this.#n++] = e;
	}
	#s(e) {
		for (let t = 0; t < e.length; t++) this.#o(e[t]);
	}
	#c(e) {
		this.#o(X(e)), this.#s(e.position), this.#s(e.quaternion), e.target && this.#s(e.target), this.#o(e.fov ?? e.height), this.#o(e.near), this.#o(e.far), this.#o(e.aspect);
	}
	#l(e, t) {
		let n = e.background;
		n ? "getHex" in n ? this.#s(n) : this.#f(n) : this.#o(-1);
		let r = e.environment;
		typeof r == "string" ? this.#i.push(r) : this.#f(r), this.#o(e.environmentIntensity), this.#o(e.backgroundBlur);
		let i = e.fog;
		i ? (this.#s(i.color), this.#o(i.density), this.#o(i.near), this.#o(i.far)) : this.#o(-1), this.#u(e, t);
	}
	#u(e, t) {
		this.#o(X(e));
		let n = e.shownTo(t);
		if (this.#o(+!!n), !n) return;
		this.#o(e.overlay ? X(e.overlay) : 0);
		let r = e.clip;
		r ? (this.#s(r.normal), this.#o(r.offset), this.#o(r.cap ? r.cap.getHex() : -1)) : this.#o(-2), this.#o(+!!e.handlersFor("click").length | (e.handlersFor("hover").length ? 2 : 0) | (e.tooltip ? 4 : 0) | (e.onDrag ? 8 : 0) | (e.highlightWhole ? 16 : 0)), e.highlight ? this.#s(e.highlight) : this.#o(e.highlight === !1 ? -5 : -4);
		let i = e.outline;
		i ? (this.#s(i.color), this.#o(i.width)) : this.#o(-3), this.#s(e.position), this.#s(e.quaternion), this.#s(e.scale), e.matrixAutoUpdate || this.#s(e.matrix), e.isDrawable ? this.#d(e) : e.isLabel ? this.#p(e) : e.lightKind && this.#m(e);
		for (let n of e.children) this.#u(n, t);
	}
	#d(e) {
		let t = e.geometry, n = e.material;
		this.#o(X(t)), this.#o(t.version), this.#o(t.drawCount ?? -1), this.#o(e.renderOrder), this.#o(+!!e.castShadow | (e.receiveShadow ? 2 : 0)), this.#o(e.labels ? X(e.labels) : 0), this.#o(e.data && typeof e.data == "object" ? X(e.data) : 0), "instanceMatrices" in e && (this.#o(e.count), this.#o(e.version)), this.#o(X(n)), this.#s(n.color), this.#s(n.emissive), this.#o(n.emissiveIntensity), this.#o(n.opacity), this.#o(n.roughness), this.#o(n.metalness), this.#o(n.size), this.#o(n.width), this.#o(n.alphaTest), this.#o(n.normalScale), this.#o(n.aoMapIntensity), this.#o(n.triplanar), this.#o(n.bumpScale), this.#o(n.transmission), this.#o(n.clearcoat), this.#o(n.clearcoatRoughness), this.#o(n.sheen), this.#s(n.sheenColor), this.#o(n.sheenRoughness), this.#o(n.ior), this.#o(n.specularIntensity), this.#s(n.specularColor), this.#o(n.anisotropy), this.#o(n.anisotropyRotation), this.#o(n.translucency), this.#o(n.toon), this.#o(n.lightMapIntensity), this.#o(n.environmentIntensity), this.#s(n.translucencyColor), this.#o(+!!n.unlit | (n.flatShading ? 2 : 0) | (n.doubleSided ? 4 : 0) | (n.vertexColors ? 8 : 0) | (n.depthWrite ? 16 : 0) | (n.depthTest ? 32 : 0) | (n.sizeAttenuation ? 64 : 0) | (n.blending === "additive" ? 128 : n.blending === "multiply" ? 1024 : 0) | (n.transparent ? 256 : 0) | (n.fog ? 512 : 0));
		for (let [, e] of n.textures) this.#f(e);
	}
	#f(e) {
		this.#o(X(e)), this.#o(e.version), this.#s(e.repeat), this.#o(e.rotation), this.#s(e.center), this.#o(e.uvSet), this.#s(e.offset);
	}
	#p(e) {
		this.#i.push(e.text, e.className, e.place, e.overlap, e.edge ?? ""), this.#s(e.offset), this.#o(e.priority), this.#o(+!!e.occlude), this.#o(+!!e.leader), this.#o(e.minScale);
	}
	#m(e) {
		this.#s(e.color), this.#o(e.intensity), e.ground && this.#s(e.ground), e.direction && this.#s(e.direction), e.target && this.#s(e.target), e.castShadow && this.#o(1), e.shadowBounds && (this.#s(e.shadowBounds.min), this.#s(e.shadowBounds.max)), "range" in e && this.#o(e.range), "angle" in e && (this.#o(e.angle), this.#o(e.penumbra));
	}
}, $n = [
	"color",
	"density",
	"near",
	"far"
], er = {
	start: "use 'near' for where linear fog starts",
	end: "use 'far' for where linear fog is complete",
	type: "give 'density' for exponential fog, or 'near' and 'far' for linear",
	exp2: "give 'density' for exponential fog",
	colour: "use 'color'"
}, tr = class e {
	color = new H(8421504);
	density = .05;
	near = 0;
	far = 100;
	constructor(e = {}) {
		A("fog", e, $n, er), e.color !== void 0 && this.color.set(e.color, "fog");
		let t = e.near !== void 0 || e.far !== void 0;
		t && e.density !== void 0 && E("fog", "give 'density' for exponential fog, or 'near' and 'far' for linear - not both"), t ? (this.density = 0, e.near !== void 0 && (this.near = M("fog", "near", e.near)), e.far !== void 0 && (this.far = M("fog", "far", e.far)), this.near >= 0 && this.far > this.near || E("fog", `'near' must be 0 or more and 'far' beyond it, got near ${this.near}, far ${this.far}`)) : e.density !== void 0 && (this.density = M("fog", "density", e.density), this.density > 0 || E("fog", `'density' must be more than 0, got ${this.density}`));
	}
	get linear() {
		return this.density === 0;
	}
	static fromInput(t, n = "fog") {
		return t instanceof e ? t : ((!t || typeof t != "object" || Array.isArray(t)) && E(n, `'fog' must be { color, density } or { color, near, far }, or null, got ${j(t)}`), new e(t));
	}
	toJSON() {
		let e = this.color.getStyle();
		return this.linear ? {
			color: e,
			near: this.near,
			far: this.far
		} : {
			color: e,
			density: this.density
		};
	}
}, nr = class extends K {
	static type = "scene";
	static get OPTIONS() {
		return [
			...G,
			"background",
			"environment",
			"environmentIntensity",
			"backgroundBlur",
			"fog"
		];
	}
	static HINTS = {
		fogColor: "use fog: { color, density }",
		lights: "add lights as children: scene.add(new DirectionalLight({ ... }))",
		envMap: "use 'environment': 'studio', or an .hdr url",
		environmentMap: "use 'environment': 'studio', or an .hdr url",
		backgroundBlurriness: "use 'backgroundBlur' (0-1)"
	};
	#e = null;
	#t = "none";
	environmentIntensity = 1;
	backgroundBlur = 0;
	motionReduced = !1;
	#n = null;
	constructor(e = {}) {
		super(e), e.background !== void 0 && this.#r(e.background), e.environment !== void 0 && this.#i(e.environment), e.environmentIntensity !== void 0 && (this.environmentIntensity = M("Scene", "environmentIntensity", e.environmentIntensity)), e.backgroundBlur !== void 0 && (this.backgroundBlur = M("Scene", "backgroundBlur", e.backgroundBlur)), e.fog != null && (this.#n = tr.fromInput(e.fog, "Scene"));
	}
	get fog() {
		return this.#n;
	}
	set fog(e) {
		this.#n = e == null ? null : tr.fromInput(e, "Scene");
	}
	get background() {
		return this.#e;
	}
	set background(e) {
		this.#r(e);
	}
	#r(e) {
		this.#e = e == null ? null : e instanceof W ? e : typeof e == "object" && !Array.isArray(e) && !ArrayBuffer.isView(e) ? new W(e) : H.fromInput(e, "Scene");
	}
	get environment() {
		return this.#t;
	}
	set environment(e) {
		this.#i(e);
	}
	#i(e) {
		e === "studio" || e === "none" ? this.#t = e : typeof e == "string" && /[./]/.test(e) ? this.#t = new W({
			url: e,
			colorSpace: "linear",
			mipmaps: !1
		}) : e instanceof W ? this.#t = e : e && typeof e == "object" ? this.#t = new W({
			colorSpace: "linear",
			mipmaps: !1,
			...e
		}) : E("Scene", `'environment' must be 'studio', 'none', an .hdr url or a texture, got ${j(e)}`);
	}
	update(e, t) {
		return rr(this, e, t, /* @__PURE__ */ new Set()), this.updateWorldTree(), this;
	}
	get ready() {
		let e = [];
		return this.#e instanceof W && e.push(this.#e.ready), this.#t instanceof W && e.push(this.#t.ready), this.traverse((t) => t.isDrawable && e.push(t.material.ready())), Promise.all(e).then(() => {});
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			background: this.#e,
			environment: this.#t,
			environmentIntensity: this.environmentIntensity,
			backgroundBlur: this.backgroundBlur,
			fog: this.#n ? this.#n.toJSON() : null
		};
	}
	jsonOptions() {
		let e = {};
		if (this.#e) {
			let t = (this.#e instanceof W, this.#e.toJSON());
			t && (e.background = t);
		}
		if (this.#t !== "none") {
			let t = typeof this.#t == "string" ? this.#t : this.#t.toJSON();
			t && (e.environment = t);
		}
		return this.environmentIntensity !== 1 && (e.environmentIntensity = this.environmentIntensity), this.backgroundBlur && (e.backgroundBlur = this.backgroundBlur), this.#n && (e.fog = this.#n.toJSON()), e;
	}
};
function rr(e, t, n, r) {
	e.hasHandlers && !r.has(e) && (r.add(e), e.runHandlers(t, n));
	let i = e.children;
	if (i.length) for (let e of [...i]) rr(e, t, n, r);
}
// src/scene/lights.js
var ir = [
	...G,
	"color",
	"intensity"
], ar = {
	distance: "use 'range' (0 = infinite)",
	decay: "falloff is physical (inverse square), as in glTF - limit it with range",
	attenuation: "use 'range' - falloff is physical (inverse square)",
	shadow: "use 'castShadow: true' (directional, spot and point lights)"
}, or = class extends K {
	static OPTIONS = ir;
	static HINTS = ar;
	static kind = "ambient";
	get lightKind() {
		return this.constructor.kind;
	}
	#e = new H(16777215);
	intensity = 1;
	constructor(e = {}) {
		super(e);
		let t = this.constructor.name;
		e.color !== void 0 && this.#e.set(e.color, t), e.intensity !== void 0 && (this.intensity = M(t, "intensity", e.intensity), this.intensity < 0 && E(t, `'intensity' can't be negative, got ${this.intensity}`));
	}
	get color() {
		return this.#e;
	}
	set color(e) {
		this.#e.set(e, this.constructor.name);
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			color: this.#e.clone(),
			intensity: this.intensity
		};
	}
	jsonOptions() {
		let e = {};
		return this.#e.getHex() !== 16777215 && (e.color = this.#e.getStyle()), this.intensity !== 1 && (e.intensity = this.intensity), e;
	}
}, sr = class extends or {
	static type = "ambient-light";
	static kind = "ambient";
}, cr = class extends or {
	static type = "hemisphere-light";
	static kind = "hemisphere";
	static get OPTIONS() {
		return [
			...G,
			"sky",
			"ground",
			"intensity",
			"color"
		];
	}
	#e = new H(4473924);
	constructor(e = {}) {
		let { sky: t, ground: n, ...r } = e;
		super(t === void 0 ? r : {
			...r,
			color: t
		}), n !== void 0 && this.#e.set(n, "HemisphereLight");
	}
	get sky() {
		return this.color;
	}
	set sky(e) {
		this.color.set(e, "HemisphereLight");
	}
	get ground() {
		return this.#e;
	}
	set ground(e) {
		this.#e.set(e, "HemisphereLight");
	}
	cloneOptions() {
		let { color: e, ...t } = super.cloneOptions();
		return {
			...t,
			sky: e,
			ground: this.#e.clone()
		};
	}
	jsonOptions() {
		let { color: e, ...t } = super.jsonOptions();
		return {
			...t,
			...e ? { sky: e } : {},
			...this.#e.getHex() === 4473924 ? {} : { ground: this.#e.getStyle() }
		};
	}
}, lr = class extends or {
	#e = new z(0, -1, 0);
	#t = null;
	get direction() {
		return this.#e;
	}
	set direction(e) {
		let t = this.constructor.name;
		this.#e.copy(e, t), this.#e.len() === 0 && E(t, "'direction' can't be [0, 0, 0]"), this.#e.normalize();
	}
	get target() {
		return this.#t;
	}
	set target(e) {
		this.#t = dt(this.#t, e, this.constructor.name);
	}
	constructor(e = {}) {
		super(e);
		let t = this.constructor.name;
		e.direction !== void 0 && e.target !== void 0 && E(t, "give 'direction' or 'target', not both"), e.direction !== void 0 && (this.direction = e.direction), e.target !== void 0 && (this.target = e.target);
	}
	lookAt(e) {
		let t = ft(this, e);
		return this.target ? this.target.copy(t) : t.equals(this.position, 1e-9) || this.direction.copy(t.sub(this.position).normalize()), this;
	}
	get worldDirection() {
		let e = this.target ? this.target.clone().sub(this.position) : this.direction.clone(), t = this.parent ? this.parent.worldMatrix : null;
		if (t) {
			let [n, r, i] = e;
			e.set(t[0] * n + t[4] * r + t[8] * i, t[1] * n + t[5] * r + t[9] * i, t[2] * n + t[6] * r + t[10] * i);
		}
		return e.normalize();
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			...this.target ? { target: this.target.toArray() } : { direction: this.direction.toArray() }
		};
	}
	jsonOptions() {
		return {
			...super.jsonOptions(),
			...this.target ? { target: this.target.toArray() } : { direction: this.direction.toArray() }
		};
	}
}, ur = class extends lr {
	static type = "directional-light";
	static kind = "directional";
	static get OPTIONS() {
		return [
			...ir,
			"direction",
			"target",
			"castShadow",
			"shadowBounds"
		];
	}
	castShadow = !1;
	#e = null;
	constructor(e = {}) {
		super(e), e.castShadow !== void 0 && (this.castShadow = !!e.castShadow), e.shadowBounds !== void 0 && this.#t(e.shadowBounds);
	}
	get shadowBounds() {
		return this.#e;
	}
	set shadowBounds(e) {
		this.#t(e);
	}
	#t(e) {
		if (e === null) {
			this.#e = null;
			return;
		}
		let t = e;
		t && typeof t == "object" && t.min && t.max || E(this.constructor.name, `'shadowBounds' is a box - { min: [x, y, z], max: [x, y, z] } or a Box3 - or null, got ${j(e)}`);
		let n = new V(z.fromInput(t.min, this.constructor.name), z.fromInput(t.max, this.constructor.name));
		n.isEmpty() && E(this.constructor.name, `'shadowBounds' min must not be above max on any axis, got ${j(e)}`), this.#e = n;
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			castShadow: this.castShadow,
			shadowBounds: this.#e
		};
	}
	jsonOptions() {
		let e = this.#e;
		return {
			...super.jsonOptions(),
			...this.castShadow ? { castShadow: !0 } : {},
			...e ? { shadowBounds: {
				min: Array.from(e.min),
				max: Array.from(e.max)
			} } : {}
		};
	}
}, dr = class extends or {
	static type = "point-light";
	static kind = "point";
	static get OPTIONS() {
		return [
			...ir,
			"range",
			"castShadow"
		];
	}
	range = 0;
	castShadow = !1;
	constructor(e = {}) {
		super(e), e.range !== void 0 && (this.range = pr(this.constructor.name, e.range)), e.castShadow !== void 0 && (this.castShadow = !!e.castShadow);
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			range: this.range,
			castShadow: this.castShadow
		};
	}
	jsonOptions() {
		return {
			...super.jsonOptions(),
			...this.range ? { range: this.range } : {},
			...this.castShadow ? { castShadow: !0 } : {}
		};
	}
}, fr = class extends lr {
	static type = "spot-light";
	static kind = "spot";
	static get OPTIONS() {
		return [
			...ir,
			"direction",
			"target",
			"range",
			"angle",
			"penumbra",
			"castShadow"
		];
	}
	range = 0;
	castShadow = !1;
	angle = Math.PI / 6;
	penumbra = .1;
	constructor(e = {}) {
		super(e), e.castShadow !== void 0 && (this.castShadow = !!e.castShadow), e.range !== void 0 && (this.range = pr("SpotLight", e.range)), e.angle !== void 0 && (this.angle = M("SpotLight", "angle", e.angle), (this.angle <= 0 || this.angle > Math.PI / 2) && E("SpotLight", `'angle' is the cone's half-angle in radians, above 0 and up to PI/2, got ${this.angle}`)), e.penumbra !== void 0 && (this.penumbra = M("SpotLight", "penumbra", e.penumbra), (this.penumbra < 0 || this.penumbra > 1) && E("SpotLight", `'penumbra' must be 0-1, got ${this.penumbra}`));
	}
	cloneOptions() {
		return {
			...super.cloneOptions(),
			range: this.range,
			angle: this.angle,
			penumbra: this.penumbra,
			castShadow: this.castShadow
		};
	}
	jsonOptions() {
		let e = super.jsonOptions();
		return this.range && (e.range = this.range), this.angle !== Math.PI / 6 && (e.angle = this.angle), this.penumbra !== .1 && (e.penumbra = this.penumbra), this.castShadow && (e.castShadow = !0), e;
	}
};
function pr(e, t) {
	let n = M(e, "range", t);
	return n < 0 && E(e, `'range' can't be negative (0 means unlimited), got ${n}`), n;
}
// src/webgl/shaders.js
var Z = {
	position: 0,
	normal: 1,
	uv: 2,
	color: 3,
	instanceMatrix: 4,
	instanceColor: 8,
	tangent: 9,
	uv2: 10,
	segmentStart: 0,
	segmentEnd: 1,
	segmentColorStart: 2,
	segmentColorEnd: 3,
	corner: 4
}, mr = "#ifdef CLIP\nuniform vec4 uClipPlane;\nvoid clipAway(vec3 p) {\nif (dot(uClipPlane.xyz, p) + uClipPlane.w > 0.0) discard;\n}\n#else\nvoid clipAway(vec3 p) {}\n#endif\n", hr = "#ifdef FOG\nuniform vec3 uFogColor;\nuniform vec2 uFogRange;\nuniform float uFogDensity;\nin float vFogDepth;\nvec3 fogged(vec3 c) {\n#ifdef FOG_LINEAR\nfloat f = clamp((vFogDepth - uFogRange.x) / max(uFogRange.y - uFogRange.x, 1e-4), 0.0, 1.0);\n#else\nfloat d = uFogDensity * vFogDepth;\nfloat f = 1.0 - exp(-d * d);\n#endif\n#ifdef FOG_ADD\nreturn c * (1.0 - f);\n#elif defined(FOG_MULTIPLY)\nreturn mix(c, vec3(1.0), f);\n#else\nreturn mix(c, uFogColor, f);\n#endif\n}\n#else\nvec3 fogged(vec3 c) { return c; }\n#endif\n", gr = [
	"uMap",
	"uRoughnessMap",
	"uMetalnessMap",
	"uNormalMap",
	"uBumpMap",
	"uAoMap",
	"uEmissiveMap",
	"uLightMap"
], _r = `#ifdef UV2
in vec2 vUv2;
#endif
${gr.map((e) => `uniform mat3 ${e}Uv;
#ifndef ${e}Set
#define ${e}Set vUv
#endif
#define ${e}Coord (${e}Uv * vec3(${e}Set, 1.0)).xy`).join("\n")}
#ifdef TRIPLANAR
in vec3 vObjectPosition;
in vec3 vObjectNormal;
in mat3 vObjectToWorld;
uniform float uTriplanar; // repeats per unit of the mesh's own space

// a projection's coordinates through the map's transform, as UVs would be
vec2 projected(vec2 p, mat3 t) {
  return (t * vec3(p, 1.0)).xy;
}

// how much each axis's projection counts: mostly the one the surface faces, blended at the turns
vec3 triplanarWeights(vec3 n) {
  vec3 w = pow(abs(n), vec3(4.0));
  return w / (w.x + w.y + w.z);
}
// a map seen from the three axes and blended - for meshes with no UVs, scans and CAD models
vec4 triplanar(sampler2D s, mat3 t) {
  vec3 p = vObjectPosition * uTriplanar, w = triplanarWeights(normalize(vObjectNormal));
  return texture(s, projected(p.zy, t)) * w.x + texture(s, projected(p.xz, t)) * w.y + texture(s, projected(p.xy, t)) * w.z;
}
${gr.map((e) => `#define ${e}Texel triplanar(${e}, ${e}Uv)`).join("\n")}
#else
${gr.map((e) => `#define ${e}Texel texture(${e}, ${e}Coord)`).join("\n")}
#endif
`, vr = `precision highp float;
in vec3 vWorldPosition;
out vec4 fragColor;
#ifdef ALPHA_TEST
in vec2 vUv;
uniform float uOpacity;
uniform float uAlphaTest;
#ifdef MAP
uniform sampler2D uMap;
${_r}
#endif
#endif
${mr}
void main() {
clipAway(vWorldPosition);
#ifdef ALPHA_TEST
float alpha = uOpacity;
#ifdef MAP
alpha *= uMapTexel.a;
#endif
if (alpha < uAlphaTest) discard;
#endif
fragColor = vec4(1.0);
}
`, yr = "vec3 srgbToLinear(vec3 c) {\nreturn mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));\n}\nvec3 linearToSrgb(vec3 c) {\nc = clamp(c, 0.0, 1.0);\nreturn mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));\n}\n", br = "vec2 equirectUv(vec3 d) {\nreturn vec2(atan(d.z, d.x) * 0.15915494 + 0.5, acos(clamp(d.y, -1.0, 1.0)) * 0.31830989);\n}\nvec3 equirectDirection(vec2 uv) {\nfloat phi = (uv.x - 0.5) * 6.28318531, theta = uv.y * 3.14159265;\nreturn vec3(cos(phi) * sin(theta), cos(theta), sin(phi) * sin(theta));\n}\n", xr = "out vec2 vUv;\nvoid main() {\nvec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));\nvUv = p;\ngl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);\n}\n", Sr = "uniform float uExposure;\nuniform int uToneMapping;\nvec3 toneMap(vec3 c) {\nc *= uExposure;\nif (uToneMapping == 1) {\nc = clamp((c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14), 0.0, 1.0);\n} else if (uToneMapping == 2) {\nfloat x = min(c.r, min(c.g, c.b));\nfloat offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\nc -= offset;\nfloat peak = max(c.r, max(c.g, c.b));\nif (peak > 0.8) {\nfloat d = 0.2;\nfloat newPeak = 1.0 - d * d / (peak + d - 0.8);\nc *= newPeak / peak;\nfloat g = 1.0 - 1.0 / (0.15 * (peak - newPeak) + 1.0);\nc = mix(c, vec3(newPeak), g);\n}\n}\nreturn c;\n}\n", Cr = `layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;
layout(location = 3) in vec3 color;
#ifdef INSTANCED
layout(location = 4) in mat4 instanceMatrix;
layout(location = 8) in vec3 instanceColor;
#endif
#ifdef ANISOTROPY
layout(location = 9) in vec4 tangent;
out vec4 vTangent;
#endif
#ifdef UV2
layout(location = 10) in vec2 uv2;
out vec2 vUv2;
#endif
uniform mat4 uModel;
uniform mat3 uNormalMatrix;
uniform mat4 uViewProjection;
uniform int uHighlightIndex;
#ifdef FOG
uniform mat4 uView;
out float vFogDepth;
#endif
out vec3 vWorldPosition;
out vec3 vNormal;
out vec2 vUv;
out vec3 vColor;
flat out float vHighlight;
#ifdef TRIPLANAR
out vec3 vObjectPosition;
out vec3 vObjectNormal;
out mat3 vObjectToWorld;
#endif
#ifdef PICK
flat out uint vPickElement;
#endif
${yr}
void main() {
vColor = vec3(1.0);
vHighlight = uHighlightIndex == -1 ? 1.0 : 0.0;
#ifdef INSTANCED
vec4 local = instanceMatrix * vec4(position, 1.0);
mat3 m = mat3(instanceMatrix);
mat3 instanceNormal = mat3(cross(m[1], m[2]), cross(m[2], m[0]), cross(m[0], m[1])) * sign(dot(m[0], cross(m[1], m[2])));
vec3 n = instanceNormal * normal;
vColor *= instanceColor;
if (gl_InstanceID == uHighlightIndex) vHighlight = 1.0;
#else
vec4 local = vec4(position, 1.0);
vec3 n = normal;
#endif
#ifdef VERTEX_COLORS
vColor *= srgbToLinear(color);
#endif
vec4 world = uModel * local;
vWorldPosition = world.xyz;
vNormal = uNormalMatrix * n;
vUv = uv;
#ifdef UV2
vUv2 = uv2;
#endif
#ifdef ANISOTROPY
#ifdef INSTANCED
vTangent = vec4(mat3(uModel) * (m * tangent.xyz), tangent.w);
#else
vTangent = vec4(mat3(uModel) * tangent.xyz, tangent.w);
#endif
#endif
#ifdef TRIPLANAR
vObjectPosition = position;
vObjectNormal = normal;
#ifdef INSTANCED
vObjectToWorld = uNormalMatrix * instanceNormal;
#else
vObjectToWorld = uNormalMatrix;
#endif
#endif
gl_Position = uViewProjection * world;
#ifdef FOG
vFogDepth = -(uView * world).z;
#endif
#ifdef PICK
vPickElement = uint(gl_InstanceID);
#endif
}
`, wr = `precision highp float;
precision highp sampler2DShadow;
precision highp samplerCubeShadow;
in vec3 vWorldPosition;
in vec3 vNormal;
in vec2 vUv;
in vec3 vColor;
flat in float vHighlight;
uniform vec4 uHighlight;
uniform vec3 uColor;
uniform float uOpacity;
uniform vec3 uEmissive;
#ifdef MAP
uniform sampler2D uMap;
#endif
#ifdef ALPHA_TEST
uniform float uAlphaTest;
#endif
#ifdef EMISSIVE_MAP
uniform sampler2D uEmissiveMap;
#endif
${_r}
#ifdef LIT
uniform vec3 uCameraPosition;
uniform float uRoughness;
uniform float uMetalness;
#ifdef ROUGHNESS_MAP
uniform sampler2D uRoughnessMap;
#endif
#ifdef METALNESS_MAP
uniform sampler2D uMetalnessMap;
#endif
#ifdef NORMAL_MAP
uniform sampler2D uNormalMap;
uniform float uNormalScale;
#endif
#ifdef BUMP_MAP
uniform sampler2D uBumpMap;
uniform float uBumpScale;
#endif
#ifdef AO_MAP
uniform sampler2D uAoMap;
uniform float uAoMapIntensity;
#endif
#ifdef LIGHT_MAP
uniform sampler2D uLightMap;
uniform float uLightMapIntensity;
#endif
uniform float uEnvStrength;
#ifdef TRANSMISSION
uniform float uTransmission;
#endif
#ifdef CLEARCOAT
uniform float uClearcoat;
uniform float uClearcoatRoughness;
#endif
uniform vec4 uSpecular;
#ifdef MATCAP
uniform sampler2D uMatcap;
uniform mat4 uView;
#endif
#ifdef TOON
uniform float uToon;
#endif
#ifdef SHEEN
uniform vec3 uSheenColor;
uniform float uSheenRoughness;
#endif
#ifdef ANISOTROPY
uniform float uAnisotropy;
uniform vec2 uAnisotropyDirection;
in vec4 vTangent;
#endif
#ifdef TRANSLUCENCY
uniform vec4 uTranslucency;
#endif
uniform vec3 uAmbient;
uniform vec3 uHemisphereSky;
uniform vec3 uHemisphereGround;
#ifdef ENV_MAP
uniform sampler2D uEnvMap;
uniform float uEnvMaxLod;
uniform vec3 uEnvSH[9];
uniform float uEnvIntensity;
#endif
#if NUM_DIRECTIONAL > 0
uniform vec3 uDirectionalDirection[NUM_DIRECTIONAL];
uniform vec3 uDirectionalColor[NUM_DIRECTIONAL];
#endif
#if NUM_PUNCTUAL > 0
uniform vec3 uPunctualPosition[NUM_PUNCTUAL];
uniform vec3 uPunctualColor[NUM_PUNCTUAL];
uniform float uPunctualRange[NUM_PUNCTUAL];
uniform vec3 uPunctualDirection[NUM_PUNCTUAL];
uniform vec2 uPunctualCone[NUM_PUNCTUAL];
#endif
#ifdef SHADOW
uniform sampler2DShadow uShadowMap;
uniform mat4 uShadowMatrix;
uniform float uShadowTexel;
uniform float uShadowBias;
#endif
#ifdef SPOT_SHADOWS
uniform sampler2DShadow uSpotShadowMap;
uniform mat4 uSpotShadowMatrix[4];
uniform vec4 uSpotShadowTile[4];
uniform float uSpotShadowBias[4];
uniform float uSpotShadowTexel;
uniform float uPunctualShadow[NUM_PUNCTUAL];
#endif
#ifdef POINT_SHADOW
uniform samplerCubeShadow uPointShadowMap;
uniform float uPointShadowIndex;
uniform vec2 uPointShadowNearFar;
uniform float uPointShadowTexel;
uniform float uPointShadowBias;
#endif
#endif
out vec4 fragColor;
${yr}
${mr}
${hr}
${Sr}
#ifdef LIT
const float PI = 3.14159265359;
float D_GGX(float NoH, float a) {
float a2 = a * a;
float f = (NoH * a2 - NoH) * NoH + 1.0;
return a2 / (PI * f * f);
}
float V_SmithGGXCorrelated(float NoV, float NoL, float a) {
float a2 = a * a;
float gv = NoL * sqrt(NoV * NoV * (1.0 - a2) + a2);
float gl = NoV * sqrt(NoL * NoL * (1.0 - a2) + a2);
return 0.5 / max(gv + gl, 1e-5);
}
vec3 F_Schlick(float VoH, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - VoH, 5.0);
}
#ifdef ANISOTROPY
vec3 brushT, brushB;
float brushAT, brushAB;
float anisotropicDV(vec3 v, vec3 l, vec3 h, float NoV, float NoL, float NoH) {
float a2 = brushAT * brushAB;
vec3 f = vec3(brushAB * dot(brushT, h), brushAT * dot(brushB, h), a2 * NoH);
float w2 = a2 / dot(f, f);
float gv = NoL * length(vec3(brushAT * dot(brushT, v), brushAB * dot(brushB, v), NoV));
float gl = NoV * length(vec3(brushAT * dot(brushT, l), brushAB * dot(brushB, l), NoL));
return a2 * w2 * w2 / PI * 0.5 / max(gv + gl, 1e-5);
}
#endif
#ifdef TOON
vec3 toonHighlight;
float toonTone(float x) {
float steps = uToon - 1.0;
float b = x * steps + 0.6;
float w = fwidth(b);
return min(floor(b) + smoothstep(1.0 - w, 1.0, fract(b)), steps) / steps;
}
vec3 toonShade(vec3 n, vec3 v, vec3 l, vec3 radiance, vec3 diffuse, float a) {
float lit = toonTone(clamp(dot(n, l), 0.0, 1.0));
float s = D_GGX(clamp(dot(n, normalize(l + v)), 0.0, 1.0), a) * PI * a * a;
float w = fwidth(s);
float spot = smoothstep(0.5 - w, 0.5 + w, s) * step(0.001, lit);
return (diffuse * lit + toonHighlight * spot) * radiance;
}
#endif
vec3 shade(vec3 n, vec3 v, vec3 l, vec3 radiance, vec3 diffuse, vec3 f0, float f90, float a) {
#ifdef TOON
return toonShade(n, v, l, radiance, diffuse, a);
#endif
float NoL = clamp(dot(n, l), 0.0, 1.0);
if (NoL <= 0.0) return vec3(0.0);
vec3 h = normalize(l + v);
float NoV = clamp(abs(dot(n, v)), 1e-4, 1.0);
float NoH = clamp(dot(n, h), 0.0, 1.0);
float VoH = clamp(dot(v, h), 0.0, 1.0);
vec3 F = F_Schlick(VoH, f0, f90);
#ifdef ANISOTROPY
vec3 specular = anisotropicDV(v, l, h, NoV, NoL, NoH) * F * PI;
#else
vec3 specular = D_GGX(NoH, a) * V_SmithGGXCorrelated(NoV, NoL, a) * F * PI;
#endif
return (diffuse * (1.0 - F) + specular) * radiance * NoL;
}
#ifdef SHEEN
vec3 sheenShade(vec3 n, vec3 v, vec3 l, vec3 radiance, float a) {
float NoL = clamp(dot(n, l), 0.0, 1.0);
if (NoL <= 0.0) return vec3(0.0);
vec3 h = normalize(l + v);
float NoV = clamp(abs(dot(n, v)), 1e-4, 1.0);
float NoH = clamp(dot(n, h), 0.0, 1.0);
float invA = 1.0 / a;
float sin2h = max(1.0 - NoH * NoH, 0.0078125);
float D = (2.0 + invA) * pow(sin2h, invA * 0.5) / (2.0 * PI);
float V = clamp(1.0 / (4.0 * (NoL + NoV - NoL * NoV)), 0.0, 1.0);
return uSheenColor * D * V * PI * radiance * NoL;
}
float sheenEnvironment(float NoV, float r) {
float r2 = r * r;
float a = r < 0.25 ? -339.2 * r2 + 161.4 * r - 25.9 : -8.48 * r2 + 14.3 * r - 9.95;
float b = r < 0.25 ? 44.0 * r2 - 23.7 * r + 3.26 : 1.97 * r2 - 3.27 * r + 0.72;
return min(exp(a * NoV + b) + (r < 0.25 ? 0.0 : 0.1 * (r - 0.25)), PI);
}
#endif
#ifdef CLEARCOAT
vec3 coatShade(vec3 n, vec3 v, vec3 l, vec3 radiance, float a) {
float NoL = clamp(dot(n, l), 0.0, 1.0);
if (NoL <= 0.0) return vec3(0.0);
vec3 h = normalize(l + v);
float NoV = clamp(abs(dot(n, v)), 1e-4, 1.0);
float NoH = clamp(dot(n, h), 0.0, 1.0);
float VoH = clamp(dot(v, h), 0.0, 1.0);
return D_GGX(NoH, a) * V_SmithGGXCorrelated(NoV, NoL, a) * F_Schlick(VoH, vec3(0.04), 1.0) * PI * radiance * NoL;
}
#endif
vec3 studio(vec3 d) {
float up = d.y * 0.5 + 0.5;
vec3 sky = mix(vec3(0.35, 0.36, 0.38), vec3(1.0), smoothstep(0.55, 0.95, up));
vec3 floorColor = vec3(0.18, 0.17, 0.16);
return mix(floorColor, sky, smoothstep(0.35, 0.55, up));
}
vec3 envBRDF(vec3 f0, float f90, float roughness, float NoV) {
vec4 c0 = vec4(-1.0, -0.0275, -0.572, 0.022);
vec4 c1 = vec4(1.0, 0.0425, 1.04, -0.04);
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;
vec2 ab = vec2(-1.04, 1.04) * a004 + r.zw;
return f0 * ab.x + ab.y * f90;
}
#ifdef ENV_MAP
${br}
vec3 envIrradiance(vec3 n) {
return uEnvSH[0]
+ uEnvSH[1] * n.y + uEnvSH[2] * n.z + uEnvSH[3] * n.x
+ uEnvSH[4] * n.x * n.y + uEnvSH[5] * n.y * n.z + uEnvSH[6] * (3.0 * n.z * n.z - 1.0)
+ uEnvSH[7] * n.x * n.z + uEnvSH[8] * (n.x * n.x - n.y * n.y);
}
#endif
#ifdef BUMP_MAP
vec3 bumpNormal(vec3 n) {
float h = uBumpMapTexel.r * uBumpScale;
vec2 dh = vec2(dFdx(h), dFdy(h));
vec3 sx = dFdx(vWorldPosition), sy = dFdy(vWorldPosition);
vec3 r1 = cross(sy, n), r2 = cross(n, sx);
float det = dot(sx, r1);
vec3 grad = sign(det) * (dh.x * r1 + dh.y * r2);
return normalize(abs(det) * n - grad);
}
#endif
#if defined(NORMAL_MAP) && defined(TRIPLANAR)
vec3 triplanarNormal(float strength) {
vec3 n = normalize(vObjectNormal), p = vObjectPosition * uTriplanar, w = triplanarWeights(n);
vec3 tx = texture(uNormalMap, projected(p.zy, uNormalMapUv)).xyz * 2.0 - 1.0;
vec3 ty = texture(uNormalMap, projected(p.xz, uNormalMapUv)).xyz * 2.0 - 1.0;
vec3 tz = texture(uNormalMap, projected(p.xy, uNormalMapUv)).xyz * 2.0 - 1.0;
tx.xy *= strength; ty.xy *= strength; tz.xy *= strength;
tx = vec3(tx.xy + n.zy, abs(tx.z) * n.x);
ty = vec3(ty.xy + n.xz, abs(ty.z) * n.y);
tz = vec3(tz.xy + n.xy, abs(tz.z) * n.z);
return normalize(vObjectToWorld * normalize(tx.zyx * w.x + ty.xzy * w.y + tz.xyz * w.z));
}
#endif
#ifdef ANISOTROPY
vec3 brushDirection(vec3 n) {
vec3 t = vTangent.xyz - n * dot(n, vTangent.xyz);
float len = length(t);
t = len > 1e-6 ? t / len : normalize(cross(abs(n.y) < 0.999 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0), n));
return t * uAnisotropyDirection.x + cross(n, t) * (vTangent.w < 0.0 ? -1.0 : 1.0) * uAnisotropyDirection.y;
}
#endif
#ifdef NORMAL_MAP
vec3 perturbNormal(vec3 n, vec3 m, vec2 uv) {
vec3 dp1 = dFdx(vWorldPosition), dp2 = dFdy(vWorldPosition);
vec2 duv1 = dFdx(uv), duv2 = dFdy(uv);
vec3 dp2perp = cross(dp2, n), dp1perp = cross(n, dp1);
vec3 t = dp2perp * duv1.x + dp1perp * duv2.x;
vec3 b = dp2perp * duv1.y + dp1perp * duv2.y;
float scale = inversesqrt(max(max(dot(t, t), dot(b, b)), 1e-20));
return normalize(mat3(t * scale, -b * scale, n) * m);
}
#endif
#ifdef SHADOW
float shadowAt(vec3 n, vec3 l) {
vec3 p = vWorldPosition + n * uShadowBias * (1.0 - 0.5 * clamp(dot(n, l), 0.0, 1.0));
vec4 s = uShadowMatrix * vec4(p, 1.0);
vec3 c = s.xyz / s.w;
if (c.x <= 0.0 || c.x >= 1.0 || c.y <= 0.0 || c.y >= 1.0 || c.z >= 1.0) return 1.0;
float lit = 0.0;
for (int x = -1; x <= 1; x++) {
for (int y = -1; y <= 1; y++) lit += texture(uShadowMap, vec3(c.xy + vec2(x, y) * uShadowTexel * 1.5, c.z));
}
return lit / 9.0;
}
#endif
#ifdef SPOT_SHADOWS
float spotShadowAt(int k, vec3 n, float distance) {
vec3 p = vWorldPosition + n * uSpotShadowBias[k] * distance;
vec4 s = uSpotShadowMatrix[k] * vec4(p, 1.0);
if (s.w <= 0.0) return 1.0;
vec3 c = s.xyz / s.w;
vec4 tile = uSpotShadowTile[k];
if (c.x <= tile.x || c.x >= tile.z || c.y <= tile.y || c.y >= tile.w || c.z >= 1.0) return 1.0;
vec2 lo = tile.xy + uSpotShadowTexel, hi = tile.zw - uSpotShadowTexel;
float lit = 0.0;
for (int x = -1; x <= 1; x++) {
for (int y = -1; y <= 1; y++) lit += texture(uSpotShadowMap, vec3(clamp(c.xy + vec2(x, y) * uSpotShadowTexel * 1.5, lo, hi), c.z));
}
return lit / 9.0;
}
#endif
#ifdef POINT_SHADOW
float pointShadowAt(vec3 light, vec3 n, float distance) {
vec3 d = vWorldPosition + n * uPointShadowBias * distance - light;
vec3 a = abs(d);
float z = max(a.x, max(a.y, a.z));
float near = uPointShadowNearFar.x, far = uPointShadowNearFar.y;
if (z >= far) return 1.0;
float depth = 0.5 * ((far + near) / (far - near) - 2.0 * far * near / ((far - near) * z)) + 0.5;
vec3 dir = d / length(d);
vec3 u = normalize(cross(dir, abs(dir.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
vec3 w = cross(dir, u);
float spread = uPointShadowTexel * 1.5;
float lit = 0.0;
for (int x = -1; x <= 1; x++) {
for (int y = -1; y <= 1; y++) lit += texture(uPointShadowMap, vec4(dir + (u * float(x) + w * float(y)) * spread, depth));
}
return lit / 9.0;
}
#endif
#ifdef MATCAP
vec3 matcapAt(vec3 n, vec3 v) {
vec3 nv = normalize(mat3(uView) * n), vv = normalize(mat3(uView) * v);
vec3 x = normalize(vec3(vv.z, 0.0, -vv.x));
vec3 y = cross(vv, x);
vec2 uv = vec2(dot(x, nv), dot(y, nv)) * 0.495 + 0.5;
return texture(uMatcap, vec2(uv.x, 1.0 - uv.y)).rgb;
}
#endif
vec3 irradianceAt(vec3 n) {
vec3 e = uAmbient + mix(uHemisphereGround, uHemisphereSky, n.y * 0.5 + 0.5);
#ifdef ENV_MAP
e += envIrradiance(n) * uEnvIntensity * uEnvStrength;
#elif defined(STUDIO)
e += studio(n) * 0.35 * uEnvStrength;
#endif
return e;
}
vec3 reflected(vec3 r, vec3 n, float roughness, vec3 irradiance) {
#ifdef ENV_MAP
return textureLod(uEnvMap, equirectUv(r), roughness * uEnvMaxLod).rgb * uEnvIntensity * uEnvStrength;
#elif defined(STUDIO)
return mix(studio(r), studio(n), roughness * roughness) * uEnvStrength;
#else
return irradiance * 0.5;
#endif
}
#endif
void main() {
clipAway(vWorldPosition);
vec4 base = vec4(uColor * vColor, uOpacity);
#ifdef MAP
base *= uMapTexel;
#endif
#ifdef ALPHA_TEST
if (base.a < uAlphaTest) discard;
base.a = 1.0;
#endif
float coverage = base.a;
vec3 emissive = uEmissive;
#ifdef EMISSIVE_MAP
emissive *= uEmissiveMapTexel.rgb;
#endif
#ifdef LIT
#ifdef FLAT_SHADING
vec3 n = normalize(cross(dFdx(vWorldPosition), dFdy(vWorldPosition)));
#else
vec3 n = normalize(vNormal);
#endif
#if defined(DOUBLE_SIDED) && !defined(FLAT_SHADING)
if (!gl_FrontFacing) n = -n;
#endif
vec3 surfaceNormal = n;
#ifdef NORMAL_MAP
#ifdef TRIPLANAR
n = triplanarNormal(uNormalScale);
#ifdef DOUBLE_SIDED
if (!gl_FrontFacing) n = -n;
#endif
#else
vec2 normalUv = uNormalMapCoord;
vec3 m = texture(uNormalMap, normalUv).xyz * 2.0 - 1.0;
m.xy *= uNormalScale;
n = perturbNormal(n, m, normalUv);
#endif
#endif
#ifdef BUMP_MAP
n = bumpNormal(n);
#endif
vec3 v = normalize(uCameraPosition - vWorldPosition);
#ifdef MATCAP
vec3 color = base.rgb * matcapAt(n, v) + emissive;
#else
float roughness = uRoughness;
float metalness = uMetalness;
#ifdef ROUGHNESS_MAP
roughness *= uRoughnessMapTexel.g;
#endif
#ifdef METALNESS_MAP
metalness *= uMetalnessMapTexel.b;
#endif
roughness = clamp(roughness, 0.04, 1.0);
float a = roughness * roughness;
vec3 diffuse = base.rgb * (1.0 - metalness);
vec3 f0 = mix(uSpecular.rgb, base.rgb, metalness);
float f90 = mix(uSpecular.a, 1.0, metalness);
#ifdef TOON
diffuse = base.rgb;
toonHighlight = mix(vec3(uSpecular.a), base.rgb, metalness) * (1.0 - roughness);
#endif
#ifdef TRANSMISSION
diffuse *= 1.0 - uTransmission;
#endif
#ifdef CLEARCOAT
float coatRoughness = clamp(uClearcoatRoughness, 0.04, 1.0);
float coatA = coatRoughness * coatRoughness;
vec3 coat = vec3(0.0);
#endif
#ifdef SHEEN
float sheenRoughness = clamp(uSheenRoughness, 0.07, 1.0);
vec3 sheen = vec3(0.0);
#endif
#ifdef ANISOTROPY
brushT = brushDirection(n);
brushB = cross(n, brushT);
brushAT = mix(a, 1.0, uAnisotropy * uAnisotropy);
brushAB = max(a, 0.001);
#endif
#ifdef TRANSLUCENCY
vec3 through = diffuse * uTranslucency.rgb;
diffuse *= 1.0 - uTranslucency.a;
#endif
vec3 color = vec3(0.0);
#if NUM_DIRECTIONAL > 0
for (int i = 0; i < NUM_DIRECTIONAL; i++) {
vec3 radiance = uDirectionalColor[i];
#ifdef SHADOW
if (i == 0) radiance *= shadowAt(surfaceNormal, uDirectionalDirection[0]);
#endif
color += shade(n, v, uDirectionalDirection[i], radiance, diffuse, f0, f90, a);
#ifdef CLEARCOAT
coat += coatShade(surfaceNormal, v, uDirectionalDirection[i], radiance, coatA);
#endif
#ifdef SHEEN
sheen += sheenShade(n, v, uDirectionalDirection[i], radiance, sheenRoughness * sheenRoughness);
#endif
#ifdef TRANSLUCENCY
float behind = clamp(-dot(n, uDirectionalDirection[i]), 0.0, 1.0);
if (behind > 0.0) {
vec3 light = uDirectionalColor[i];
#ifdef SHADOW
if (i == 0) light *= shadowAt(-surfaceNormal, uDirectionalDirection[0]);
#endif
color += through * light * behind;
}
#endif
}
#endif
#if NUM_PUNCTUAL > 0
for (int i = 0; i < NUM_PUNCTUAL; i++) {
vec3 toLight = uPunctualPosition[i] - vWorldPosition;
float d = length(toLight);
vec3 l = toLight / max(d, 1e-4);
float falloff = 1.0 / max(d * d, 1e-4);
float range = uPunctualRange[i];
if (range > 0.0) falloff *= pow(clamp(1.0 - pow(d / range, 4.0), 0.0, 1.0), 2.0);
float cosAngle = dot(-l, uPunctualDirection[i]);
float cone = smoothstep(uPunctualCone[i].x, uPunctualCone[i].y, cosAngle);
vec3 radiance = uPunctualColor[i] * falloff * cone;
#ifdef SPOT_SHADOWS
float tile = uPunctualShadow[i];
if (tile >= 0.0 && cone > 0.0) radiance *= spotShadowAt(int(tile), surfaceNormal, d);
#endif
#ifdef POINT_SHADOW
if (float(i) == uPointShadowIndex) radiance *= pointShadowAt(uPunctualPosition[i], surfaceNormal, d);
#endif
color += shade(n, v, l, radiance, diffuse, f0, f90, a);
#ifdef CLEARCOAT
coat += coatShade(surfaceNormal, v, l, radiance, coatA);
#endif
#ifdef SHEEN
sheen += sheenShade(n, v, l, radiance, sheenRoughness * sheenRoughness);
#endif
#ifdef TRANSLUCENCY
float behind = clamp(-dot(n, l), 0.0, 1.0);
if (behind > 0.0) {
vec3 light = uPunctualColor[i] * falloff * cone;
#ifdef SPOT_SHADOWS
if (tile >= 0.0 && cone > 0.0) light *= spotShadowAt(int(tile), -surfaceNormal, d);
#endif
#ifdef POINT_SHADOW
if (float(i) == uPointShadowIndex) light *= pointShadowAt(uPunctualPosition[i], -surfaceNormal, d);
#endif
color += through * light * behind;
}
#endif
}
#endif
vec3 irradiance = irradianceAt(n);
float NoV = clamp(abs(dot(n, v)), 1e-4, 1.0);
vec3 brdf = envBRDF(f0, f90, roughness, NoV);
#ifdef ANISOTROPY
vec3 brushNormal = cross(cross(brushB, v), brushB);
float bend = 1.0 - uAnisotropy * (1.0 - roughness);
bend *= bend;
vec3 r = reflect(-v, normalize(mix(brushNormal, n, bend * bend)));
#else
vec3 r = reflect(-v, n);
#endif
#ifdef TOON
vec3 indirect = diffuse * 0.5 * (irradianceAt(vec3(0.0, 1.0, 0.0)) + irradianceAt(vec3(0.0, -1.0, 0.0)));
#else
vec3 ambientSpecular = reflected(r, n, roughness, irradiance) * brdf;
vec3 indirect = diffuse * irradiance + ambientSpecular;
#endif
#ifdef TRANSLUCENCY
indirect += through * irradianceAt(-n);
#endif
#ifdef LIGHT_MAP
indirect += diffuse * uLightMapTexel.rgb * uLightMapIntensity;
#endif
#ifdef AO_MAP
indirect *= mix(1.0, uAoMapTexel.r, uAoMapIntensity);
#endif
color += indirect + emissive;
#ifdef SHEEN
sheen += irradiance * uSheenColor * sheenEnvironment(NoV, sheenRoughness);
color = color * (1.0 - 0.157 * max(uSheenColor.r, max(uSheenColor.g, uSheenColor.b))) + sheen;
#endif
#ifdef CLEARCOAT
float coatNoV = clamp(abs(dot(surfaceNormal, v)), 1e-4, 1.0);
coat += reflected(reflect(-v, surfaceNormal), surfaceNormal, coatRoughness, irradiance) * envBRDF(vec3(0.04), 1.0, coatRoughness, coatNoV);
color = color * (1.0 - uClearcoat * F_Schlick(coatNoV, vec3(0.04), 1.0).x) + coat * uClearcoat;
#endif
#ifdef TRANSMISSION
coverage *= mix(1.0, clamp(max(brdf.r, max(brdf.g, brdf.b)), 0.0, 1.0), uTransmission);
#endif
color = toneMap(color);
#endif
#else
vec3 color = base.rgb + emissive;
#endif
color = mix(color, uHighlight.rgb, vHighlight * uHighlight.a);
coverage = mix(coverage, base.a, vHighlight * uHighlight.a);
color = fogged(color);
fragColor = vec4(linearToSrgb(color) * base.a, coverage);
}
`, Tr = `layout(location = 0) in vec3 position;
layout(location = 3) in vec3 color;
uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
uniform float uSize;
uniform float uScale;
uniform int uHighlightIndex;
out vec3 vColor;
flat out float vHighlight;
#ifdef PICK
flat out uint vPickElement;
#endif
#ifdef FOG
out float vFogDepth;
#endif
${yr}
void main() {
vec4 viewPosition = uView * (uModel * vec4(position, 1.0));
gl_Position = uProjection * viewPosition;
#ifdef FOG
vFogDepth = -viewPosition.z;
#endif
#ifdef SIZE_ATTENUATION
float depth = uProjection[3][3] == 1.0 ? 1.0 : max(-viewPosition.z, 1e-4);
gl_PointSize = uSize * uScale / depth;
#else
gl_PointSize = uSize;
#endif
vColor = vec3(1.0);
#ifdef VERTEX_COLORS
vColor = srgbToLinear(color);
#endif
vHighlight = uHighlightIndex == -1 || gl_VertexID == uHighlightIndex ? 1.0 : 0.0;
#ifdef PICK
vPickElement = uint(gl_VertexID);
#endif
}
`, Er = `precision highp float;
in vec3 vColor;
flat in float vHighlight;
uniform vec4 uHighlight;
uniform vec3 uColor;
uniform float uOpacity;
#ifdef MAP
uniform sampler2D uMap;
#endif
out vec4 fragColor;
${yr}
${hr}
void main() {
vec4 base = vec4(uColor * vColor, uOpacity);
#ifdef MAP
base *= texture(uMap, vec2(gl_PointCoord.x, gl_PointCoord.y));
#else
vec2 p = gl_PointCoord * 2.0 - 1.0;
float r = dot(p, p);
float edge = fwidth(r);
base.a *= 1.0 - smoothstep(1.0 - edge, 1.0, r);
#endif
if (base.a <= 0.0) discard;
base.rgb = fogged(mix(base.rgb, uHighlight.rgb, vHighlight * uHighlight.a));
fragColor = vec4(linearToSrgb(base.rgb) * base.a, base.a);
}
`, Dr = `layout(location = 0) in vec3 segmentStart;
layout(location = 1) in vec3 segmentEnd;
layout(location = 2) in vec3 segmentColorStart;
layout(location = 3) in vec3 segmentColorEnd;
layout(location = 4) in vec2 corner;
uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
uniform vec2 uResolution;
uniform float uWidth;
uniform float uNear;
out vec3 vColor;
#ifdef PICK
flat out uint vPickElement;
#endif
#ifdef FOG
out float vFogDepth;
#endif
${yr}
void main() {
vec4 a = uView * (uModel * vec4(segmentStart, 1.0));
vec4 b = uView * (uModel * vec4(segmentEnd, 1.0));
float clipZ = -uNear;
if (a.z > clipZ && b.z > clipZ) {
gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
return;
}
if (a.z > clipZ) a = mix(a, b, (clipZ - a.z) / (b.z - a.z));
if (b.z > clipZ) b = mix(b, a, (clipZ - b.z) / (a.z - b.z));
vec4 ca = uProjection * a;
vec4 cb = uProjection * b;
vec2 sa = ca.xy / ca.w * uResolution * 0.5;
vec2 sb = cb.xy / cb.w * uResolution * 0.5;
vec2 dir = sb - sa;
float len = length(dir);
dir = len > 0.0 ? dir / len : vec2(1.0, 0.0);
vec2 normal = vec2(-dir.y, dir.x);
vec4 clip = mix(ca, cb, corner.x);
#ifdef FOG
vFogDepth = -mix(a.z, b.z, corner.x);
#endif
vec2 offset = normal * corner.y * uWidth * 0.5 + dir * (corner.x * 2.0 - 1.0) * uWidth * 0.5;
clip.xy += offset / (uResolution * 0.5) * clip.w;
gl_Position = clip;
#ifdef PICK
vPickElement = uint(gl_InstanceID);
#endif
vColor = vec3(1.0);
#ifdef VERTEX_COLORS
vColor = srgbToLinear(mix(segmentColorStart, segmentColorEnd, corner.x));
#endif
}
`, Or = `precision highp float;
in vec3 vColor;
uniform vec3 uColor;
uniform float uOpacity;
out vec4 fragColor;
${yr}
${hr}
void main() {
vec3 color = fogged(uColor * vColor);
fragColor = vec4(linearToSrgb(color) * uOpacity, uOpacity);
}
`, kr = {
	mesh: [Cr, wr],
	points: [Tr, Er],
	lines: [Dr, Or]
};
function Ar(e, t) {
	let n = `#version 300 es\n${t.map((e) => `#define ${e}\n`).join("")}`, [r, i] = typeof e == "string" ? kr[e] : e;
	return [n + r, n + i];
}
// src/webgl/programs.js
var jr = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = null;
	constructor(e) {
		this.gl = e, this.#t = !!e.getExtension("KHR_parallel_shader_compile");
	}
	get count() {
		return this.#e.size;
	}
	get compiling() {
		let e = 0;
		for (let t of this.#e.values()) !t.ready && !this.isReady(t) && e++;
		return e;
	}
	get(e, t, n) {
		let r = `${e}|${t.join(",")}`, i = this.#e.get(r);
		return i || (i = this.#r(r, Ar(n ?? e, t)), this.#e.set(r, i)), i;
	}
	ready(e, t, n) {
		let r = this.get(e, t, n);
		return r.ready || this.#i(r), r;
	}
	isReady(e) {
		return e.ready ? !0 : this.#t && !this.gl.getProgramParameter(e.program, 37297) ? !1 : (this.#i(e), !0);
	}
	reset() {
		this.#e.clear(), this.#n = null, this.#t = !!this.gl.getExtension("KHR_parallel_shader_compile");
	}
	drawFullscreen() {
		let e = this.gl;
		this.#n ??= e.createVertexArray(), e.bindVertexArray(this.#n), e.drawArrays(e.TRIANGLES, 0, 3);
	}
	dispose() {
		for (let e of this.#e.values()) this.gl.deleteProgram(e.program);
		this.#e.clear(), this.#n && this.gl.deleteVertexArray(this.#n), this.#n = null;
	}
	#r(e, t) {
		let n = this.gl, r = (e, t) => {
			let r = n.createShader(e);
			return n.shaderSource(r, t), n.compileShader(r), r;
		}, i = n.createProgram(), a = r(n.VERTEX_SHADER, t[0]), o = r(n.FRAGMENT_SHADER, t[1]);
		n.attachShader(i, a), n.attachShader(i, o), n.linkProgram(i);
		let s = {
			program: i,
			key: e,
			frame: -1,
			ready: !1,
			set() {},
			shaders: [a, o],
			sources: t
		};
		return this.#t || this.#i(s), s;
	}
	#i(e) {
		let t = this.gl, { program: n, key: r, shaders: i, sources: a } = e;
		if (!t.getProgramParameter(n, t.LINK_STATUS) && !t.isContextLost()) throw i.forEach((e, n) => {
			if (!t.getShaderParameter(e, t.COMPILE_STATUS)) throw Error(`phoria2: ${n ? "fragment" : "vertex"} shader '${r}' failed to compile:\n${t.getShaderInfoLog(e)}\n${Nr(a[n])}`);
		}), Error(`phoria2: shader program '${r}' failed to link: ${t.getProgramInfoLog(n)}`);
		for (let e of i) t.deleteShader(e);
		let o = /* @__PURE__ */ new Map(), s = t.getProgramParameter(n, t.ACTIVE_UNIFORMS), c = 0;
		for (let e = 0; e < s; e++) {
			let r = t.getActiveUniform(n, e), i = r.name.replace(/\[0\]$/, ""), a = t.getUniformLocation(n, r.name), s = r.type === t.SAMPLER_2D || r.type === t.SAMPLER_2D_SHADOW || r.type === t.SAMPLER_CUBE_SHADOW;
			o.set(i, Mr(t, r.type, a, s ? c++ : 0));
		}
		e.set = (e, t) => o.get(e)?.(t), e.ready = !0;
	}
};
function Mr(e, t, n, r) {
	switch (t) {
		case e.FLOAT: return (t) => typeof t == "number" ? e.uniform1f(n, t) : e.uniform1fv(n, t);
		case e.FLOAT_VEC2: return (t) => e.uniform2fv(n, t);
		case e.FLOAT_VEC3: return (t) => e.uniform3fv(n, t);
		case e.FLOAT_VEC4: return (t) => e.uniform4fv(n, t);
		case e.INT:
		case e.BOOL: return (t) => e.uniform1i(n, t);
		case e.UNSIGNED_INT: return (t) => e.uniform1ui(n, t);
		case e.FLOAT_MAT3: return (t) => e.uniformMatrix3fv(n, !1, t);
		case e.FLOAT_MAT4: return (t) => e.uniformMatrix4fv(n, !1, t);
		case e.SAMPLER_2D:
		case e.SAMPLER_2D_SHADOW: return (t) => {
			e.activeTexture(e.TEXTURE0 + r), e.bindTexture(e.TEXTURE_2D, t), e.uniform1i(n, r);
		};
		case e.SAMPLER_CUBE_SHADOW: return (t) => {
			e.activeTexture(e.TEXTURE0 + r), e.bindTexture(e.TEXTURE_CUBE_MAP, t), e.uniform1i(n, r);
		};
		default: return () => {};
	}
}
var Nr = (e) => e.split("\n").map((e, t) => `${String(t + 1).padStart(4)}  ${e}`).join("\n"), Pr = 15;
function Fr(e, t, n, r) {
	return [
		e.positions.length,
		n,
		e.uvs?.length,
		e.uvs2?.length,
		e.colors?.length,
		e.indices?.length,
		t?.instanceMatrices.length,
		t?.instanceColors?.length,
		r
	].join();
}
function Ir(e) {
	let t = e.positions, n = e.normals, r = e.uvs, i = t.length / 3, a = new Float32Array(i * 4), o = new Float32Array(i * 3), s = new Float32Array(i * 3);
	if (r) {
		let n = e.indices, a = (n ? n.length : i) / 3;
		for (let e = 0; e < a; e++) {
			let i = n ? n[e * 3] : e * 3, a = n ? n[e * 3 + 1] : e * 3 + 1, c = n ? n[e * 3 + 2] : e * 3 + 2, l = t[a * 3] - t[i * 3], u = t[a * 3 + 1] - t[i * 3 + 1], d = t[a * 3 + 2] - t[i * 3 + 2], f = t[c * 3] - t[i * 3], p = t[c * 3 + 1] - t[i * 3 + 1], m = t[c * 3 + 2] - t[i * 3 + 2], h = r[a * 2] - r[i * 2], g = r[a * 2 + 1] - r[i * 2 + 1], _ = r[c * 2] - r[i * 2], v = r[c * 2 + 1] - r[i * 2 + 1], y = h * v - _ * g;
			if (Math.abs(y) < 1e-12) continue;
			let b = 1 / y, x = (l * v - f * g) * b, S = (u * v - p * g) * b, C = (d * v - m * g) * b, w = (f * h - l * _) * b, T = (p * h - u * _) * b, E = (m * h - d * _) * b;
			for (let e of [
				i,
				a,
				c
			]) o[e * 3] += x, o[e * 3 + 1] += S, o[e * 3 + 2] += C, s[e * 3] += w, s[e * 3 + 1] += T, s[e * 3 + 2] += E;
		}
	}
	for (let e = 0; e < i; e++) {
		let t = n[e * 3], r = n[e * 3 + 1], i = n[e * 3 + 2], c = o[e * 3], l = o[e * 3 + 1], u = o[e * 3 + 2], d = t * c + r * l + i * u;
		c -= t * d, l -= r * d, u -= i * d;
		let f = Math.hypot(c, l, u);
		if (f < 1e-9) {
			Math.abs(r) < .999 ? (c = i, l = 0, u = -t) : (c = 1, l = 0, u = 0);
			let e = t * c + r * l + i * u;
			c -= t * e, l -= r * e, u -= i * e, f = Math.hypot(c, l, u) || 1;
		}
		a[e * 4] = c / f, a[e * 4 + 1] = l / f, a[e * 4 + 2] = u / f;
		let p = r * u - i * l, m = i * c - t * u, h = t * l - r * c;
		a[e * 4 + 3] = p * s[e * 3] + m * s[e * 3 + 1] + h * s[e * 3 + 2] < 0 ? -1 : 1;
	}
	return a;
}
var Lr = /* @__PURE__ */ new Float32Array(9);
function Rr(e) {
	let t = Math.cos(e.rotation), n = Math.sin(e.rotation), [r, i] = e.repeat, [a, o] = e.center, s = Lr;
	return s[0] = t * r, s[1] = -n * r, s[2] = 0, s[3] = n * i, s[4] = t * i, s[5] = 0, s[6] = a - t * a - n * o + e.offset[0], s[7] = o + n * a - t * o + e.offset[1], s[8] = 1, s;
}
var zr = new Float32Array([
	0,
	-1,
	0,
	1,
	1,
	-1,
	1,
	1
]), Br = class {
	gl;
	#e = /* @__PURE__ */ new WeakMap();
	#t = /* @__PURE__ */ new WeakMap();
	#n = /* @__PURE__ */ new WeakMap();
	#r = /* @__PURE__ */ new WeakMap();
	#i = null;
	#a = null;
	counts = {
		geometries: 0,
		textures: 0
	};
	owner = null;
	#o = /* @__PURE__ */ new WeakMap();
	constructor(e) {
		this.gl = e;
	}
	#s;
	#c() {
		if (this.#s !== void 0) return this.#s;
		let e = this.gl.getExtension("EXT_texture_filter_anisotropic");
		return this.#s = e ? {
			ext: e,
			max: this.gl.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 1
		} : null, this.#s;
	}
	mesh(e, t, n, r = !1) {
		let i = t ?? e;
		this.#u(i);
		let a = n ? this.#e : this.#t, o = a.get(i), s = o?.geometry === e;
		if (r = n && (r || s && !!o?.attributes?.tangent), o && s && o.version === e.version && (!t || o.instanceVersion === t.version) && r === !!o.attributes?.tangent) return o;
		let c = Fr(e, t, n, r);
		if (o && s && o.layout === c) {
			if (o.version !== e.version) {
				let t = o.attributes;
				this.#l(t.position, e.positions), n && this.#l(t.normal, e.normals), e.uvs && this.#l(t.uv, e.uvs), e.uvs2 && this.#l(t.uv2, e.uvs2), e.colors && this.#l(t.color, e.colors), r && this.#l(t.tangent, Ir(e)), e.indices && (this.gl.bindVertexArray(o.vao), this.gl.bufferSubData(this.gl.ELEMENT_ARRAY_BUFFER, 0, e.indices), this.gl.bindVertexArray(null)), o.version = e.version;
			}
			return t && o.instanceVersion !== t.version && (this.#l(o.matrixBuffer, t.instanceMatrices), t.instanceColors && this.#l(o.colorBuffer, t.instanceColors), o.instanceVersion = t.version), o;
		}
		o ? (this.#p(o), s || (this.counts.geometries--, this.#f(e, i, a))) : this.#f(e, i, a);
		let l = this.gl, u = l.createVertexArray();
		l.bindVertexArray(u);
		let d = [], f = (e, t, n, r = 0) => {
			let i = l.createBuffer();
			return l.bindBuffer(l.ARRAY_BUFFER, i), l.bufferData(l.ARRAY_BUFFER, t, l.STATIC_DRAW), l.enableVertexAttribArray(e), l.vertexAttribPointer(e, n, l.FLOAT, !1, 0, 0), r && l.vertexAttribDivisor(e, r), d.push(i), i;
		}, p = {};
		p.position = f(Z.position, e.positions, 3), n && (p.normal = f(Z.normal, e.normals, 3)), e.uvs ? p.uv = f(Z.uv, e.uvs, 2) : l.vertexAttrib2f(Z.uv, 0, 0), e.uvs2 && (p.uv2 = f(Z.uv2, e.uvs2, 2)), e.colors ? p.color = f(Z.color, e.colors, 3) : l.vertexAttrib3f(Z.color, 1, 1, 1), r && (p.tangent = f(Z.tangent, Ir(e), 4));
		let m = null, h = null;
		if (t) {
			m = l.createBuffer(), l.bindBuffer(l.ARRAY_BUFFER, m), l.bufferData(l.ARRAY_BUFFER, t.instanceMatrices, l.STATIC_DRAW);
			for (let e = 0; e < 4; e++) {
				let t = Z.instanceMatrix + e;
				l.enableVertexAttribArray(t), l.vertexAttribPointer(t, 4, l.FLOAT, !1, 64, e * 16), l.vertexAttribDivisor(t, 1);
			}
			d.push(m), t.instanceColors ? h = f(Z.instanceColor, t.instanceColors, 3, 1) : l.vertexAttrib3f(Z.instanceColor, 1, 1, 1);
		}
		let g = 0;
		if (e.indices) {
			let t = l.createBuffer();
			l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, t), l.bufferData(l.ELEMENT_ARRAY_BUFFER, e.indices, l.STATIC_DRAW), d.push(t), g = e.indices instanceof Uint32Array ? l.UNSIGNED_INT : l.UNSIGNED_SHORT;
		}
		return l.bindVertexArray(null), o = {
			vao: u,
			buffers: d,
			count: e.elementCount,
			indexType: g,
			geometry: e,
			version: e.version,
			instanceVersion: t?.version ?? 0,
			matrixBuffer: m,
			colorBuffer: h,
			attributes: p,
			layout: c
		}, a.set(i, o), o;
	}
	drawTriangles(e, t, n = !1) {
		let r = this.gl, i = this.mesh(e, t, !0, n);
		r.bindVertexArray(i.vao);
		let a = e.drawnCount - e.drawnCount % 3, o = t ? t.count : 1;
		return i.indexType ? t ? r.drawElementsInstanced(r.TRIANGLES, a, i.indexType, 0, o) : r.drawElements(r.TRIANGLES, a, i.indexType, 0) : t ? r.drawArraysInstanced(r.TRIANGLES, 0, a, o) : r.drawArrays(r.TRIANGLES, 0, a), a / 3 * o;
	}
	#l(e, t) {
		let n = this.gl;
		n.bindBuffer(n.ARRAY_BUFFER, e), n.bufferSubData(n.ARRAY_BUFFER, 0, t);
	}
	lines(e) {
		this.#u(e);
		let t = this.#n.get(e);
		if (t && t.version === e.version) return t;
		t ? this.#p(t) : this.#f(e, e, this.#n);
		let n = this.gl, r = e.positions, i = e.colors, a = e.indices, o = e.elementCount / 2, s = new Float32Array(o * 6), c = new Float32Array(o * 6).fill(1);
		for (let e = 0; e < o; e++) {
			let t = a ? a[e * 2] : e * 2, n = a ? a[e * 2 + 1] : e * 2 + 1;
			for (let a = 0; a < 3; a++) s[e * 6 + a] = r[t * 3 + a], s[e * 6 + 3 + a] = r[n * 3 + a], i && (c[e * 6 + a] = i[t * 3 + a], c[e * 6 + 3 + a] = i[n * 3 + a]);
		}
		let l = n.createVertexArray();
		n.bindVertexArray(l);
		let u = [], d = (e, t, r) => {
			let i = n.createBuffer();
			n.bindBuffer(n.ARRAY_BUFFER, i), n.bufferData(n.ARRAY_BUFFER, e, n.STATIC_DRAW);
			for (let [e, i] of [[t, 0], [r, 12]]) n.enableVertexAttribArray(e), n.vertexAttribPointer(e, 3, n.FLOAT, !1, 24, i), n.vertexAttribDivisor(e, 1);
			u.push(i);
		};
		return d(s, Z.segmentStart, Z.segmentEnd), d(c, Z.segmentColorStart, Z.segmentColorEnd), n.bindBuffer(n.ARRAY_BUFFER, this.#h()), n.enableVertexAttribArray(Z.corner), n.vertexAttribPointer(Z.corner, 2, n.FLOAT, !1, 0, 0), n.bindVertexArray(null), t = {
			vao: l,
			buffers: u,
			count: o,
			indexType: 0,
			geometry: e,
			version: e.version,
			instanceVersion: 0
		}, this.#n.set(e, t), t;
	}
	texture(e) {
		if (!e.image) return this.#m();
		this.#u(e);
		let t = this.gl, n = this.#r.get(e);
		if (n && n.version === e.version) return n.texture;
		if (Be(e.image) && e.image.readyState < 2) return n?.texture ?? this.#m();
		n || (n = {
			texture: t.createTexture(),
			version: -1
		}, this.#r.set(e, n), this.counts.textures++, e.onDispose(() => this.#d(e))), t.activeTexture(t.TEXTURE0 + Pr), t.bindTexture(t.TEXTURE_2D, n.texture), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, e.flipY), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1);
		let r = e.image;
		if ("data" in r) {
			let n = r, i = n.data instanceof Float32Array, a = i ? t.RGBA16F : e.colorSpace === "srgb" ? t.SRGB8_ALPHA8 : t.RGBA8;
			t.texImage2D(t.TEXTURE_2D, 0, a, n.width, n.height, 0, t.RGBA, i ? t.FLOAT : t.UNSIGNED_BYTE, n.data);
		} else {
			let n = e.colorSpace === "srgb" ? t.SRGB8_ALPHA8 : t.RGBA8;
			t.texImage2D(t.TEXTURE_2D, 0, n, t.RGBA, t.UNSIGNED_BYTE, r);
		}
		let i = {
			repeat: t.REPEAT,
			clamp: t.CLAMP_TO_EDGE,
			mirror: t.MIRRORED_REPEAT
		}[e.wrap];
		t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, i), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, i);
		let a = e.filter === "nearest";
		if (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, a ? t.NEAREST : t.LINEAR), e.mipmaps) {
			t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, a ? t.NEAREST_MIPMAP_NEAREST : t.LINEAR_MIPMAP_LINEAR);
			let n = this.#c();
			n && !a && t.texParameterf(t.TEXTURE_2D, n.ext.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(e.anisotropy, n.max));
		} else t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, a ? t.NEAREST : t.LINEAR);
		return n.version = e.version, n.texture;
	}
	release(e, t) {
		let n = /* @__PURE__ */ new Set(), r = t.environment, i = t.background;
		r && typeof r == "object" && n.add(r), i && "version" in i && n.add(i), t.traverse((e) => {
			let t = e;
			if (t.isDrawable) {
				n.add(t.geometry), "instanceMatrices" in t && n.add(t);
				for (let [, e] of t.material.textures) n.add(e);
			}
		});
		for (let t of n) {
			let n = this.#o.get(t);
			if (n?.delete(e) && !n.size) {
				this.#o.delete(t);
				for (let e of [
					this.#e,
					this.#t,
					this.#n
				]) {
					let n = e.get(t);
					n && (this.#p(n), e.delete(t), this.counts.geometries--);
				}
				this.#d(t);
			}
		}
	}
	#u(e) {
		if (!this.owner) return;
		let t = this.#o.get(e);
		t || this.#o.set(e, t = /* @__PURE__ */ new Set()), t.add(this.owner);
	}
	#d(e) {
		let t = this.#r.get(e);
		t && (this.gl.deleteTexture(t.texture), this.#r.delete(e), this.counts.textures--);
	}
	reset() {
		this.#e = /* @__PURE__ */ new WeakMap(), this.#t = /* @__PURE__ */ new WeakMap(), this.#n = /* @__PURE__ */ new WeakMap(), this.#r = /* @__PURE__ */ new WeakMap(), this.#o = /* @__PURE__ */ new WeakMap(), this.#i = null, this.#a = null, this.#s = void 0, this.counts = {
			geometries: 0,
			textures: 0
		};
	}
	#f(e, t, n) {
		this.counts.geometries++, e.onDispose(() => {
			let r = n.get(t);
			r && r.geometry === e && (this.#p(r), n.delete(t), this.counts.geometries--);
		});
	}
	#p(e) {
		let t = this.gl;
		t.deleteVertexArray(e.vao);
		for (let n of e.buffers) t.deleteBuffer(n);
	}
	#m() {
		if (this.#i) return this.#i;
		let e = this.gl;
		return this.#i = e.createTexture(), e.activeTexture(e.TEXTURE0 + Pr), e.bindTexture(e.TEXTURE_2D, this.#i), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA8, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, new Uint8Array([
			255,
			255,
			255,
			255
		])), this.#i;
	}
	#h() {
		if (this.#a) return this.#a;
		let e = this.gl;
		return this.#a = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, this.#a), e.bufferData(e.ARRAY_BUFFER, zr, e.STATIC_DRAW), this.#a;
	}
}, Vr = null, Hr = class e {
	canvas;
	gl;
	programs;
	resources;
	passes = null;
	picker = null;
	bloom = null;
	lost = !1;
	frame = 0;
	users = /* @__PURE__ */ new Set();
	isShared;
	#e = !1;
	#t = !1;
	#n = !1;
	#r = !1;
	#i;
	constructor(e, { antialias: t = !0, shared: n = !1 } = {}) {
		this.canvas = e, this.isShared = n;
		let r = Ur.get(e);
		r && (clearTimeout(r.timer), Ur.delete(e));
		let i = e.getContext("webgl2", {
			antialias: t,
			alpha: !0,
			premultipliedAlpha: !0,
			stencil: !0,
			powerPreference: "high-performance"
		});
		i || E("WebGLRenderer", "WebGL 2 is not available in this browser or on this device"), this.gl = i, this.programs = new jr(this.gl), this.resources = new Br(this.gl);
		let a = (e) => {
			e.preventDefault(), this.lost = !0;
		}, o = () => {
			this.lost = !1, this.programs.reset(), this.resources.reset(), this.passes?.reset(), this.picker?.reset(), this.bloom?.reset();
			for (let e of this.users) e.onReady?.();
		};
		e.addEventListener("webglcontextlost", a), e.addEventListener("webglcontextrestored", o), this.#i = () => {
			e.removeEventListener("webglcontextlost", a), e.removeEventListener("webglcontextrestored", o);
		}, r && i.isContextLost() && (this.lost = !0, r.lose?.restoreContext());
	}
	static shared() {
		if (!Vr) {
			let t = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
			Vr = new e(t, { shared: !0 });
		}
		return Vr;
	}
	fit(e, t) {
		let n = this.canvas;
		n.width >= e && n.height >= t || (n.width = Math.max(n.width, Math.ceil(e / 256) * 256), n.height = Math.max(n.height, Math.ceil(t / 256) * 256));
	}
	loadPasses(e) {
		return this.passes || !e || this.#e ? this.passes : (this.#e = !0, import("./passes.js").then(({ Passes: e }) => {
			this.passes = new e(this.gl, this.programs, this.resources);
			for (let e of this.users) e.onReady?.();
		}), null);
	}
	whenCompiled() {
		if (this.#t) return;
		this.#t = !0;
		let e = () => {
			if (this.lost || !this.users.size) this.#t = !1;
			else if (this.programs.compiling) setTimeout(e, 4);
			else {
				this.#t = !1;
				for (let e of this.users) e.onReady?.();
			}
		};
		setTimeout(e, 4);
	}
	loadPicker() {
		return this.picker || this.#n ? this.picker : (this.#n = !0, import("./picking.js").then(({ Picker: e }) => {
			this.picker = new e(this.gl, this.programs, this.resources);
			for (let e of this.users) e.onReady?.();
		}), null);
	}
	loadBloom() {
		return this.bloom || this.#r ? this.bloom : (this.#r = !0, import("./bloom.js").then(({ Bloom: e }) => {
			this.bloom = new e(this.gl, this.programs);
			for (let e of this.users) e.onReady?.();
		}), null);
	}
	release(e, t) {
		if (this.users.delete(e), t && this.resources.release(e, t), this.users.size) return;
		this.programs.dispose(), this.resources.reset(), this.passes?.reset(), this.bloom?.dispose(), this.#i();
		let n = this.gl.getExtension("WEBGL_lose_context");
		this === Vr ? (n?.loseContext(), Vr = null) : Ur.set(this.canvas, {
			lose: n,
			timer: setTimeout(() => n?.loseContext())
		});
	}
}, Ur = /* @__PURE__ */ new WeakMap(), Wr = [
	"canvas",
	"shared",
	"antialias",
	"outlineAntialias",
	"toneMapping",
	"exposure",
	"pixelRatio",
	"bloom"
], Gr = {
	strength: 1,
	radius: .6,
	threshold: .6
}, Kr = Object.keys(Gr), qr = {
	intensity: "use 'strength'",
	amount: "use 'strength'",
	size: "use 'radius'",
	blur: "use 'radius'"
}, Jr = { alpha: "the canvas is always transparent where the scene has no background" };
function Yr(e, t) {
	if (t == null || t === !1) return null;
	if (t === !0) return { ...Gr };
	typeof t != "object" && E(e, `bloom is true, false or { strength, radius, threshold }, got ${j(t)}`), A(`${e} bloom`, t, Kr, qr);
	let n = { ...Gr };
	for (let r of Object.keys(Gr)) t[r] !== void 0 && (n[r] = M(`${e} bloom`, r, t[r]));
	return n;
}
var Xr = {
	none: 0,
	aces: 1,
	neutral: 2
}, Zr = [], Qr = {
	roughnessMap: "ROUGHNESS_MAP",
	metalnessMap: "METALNESS_MAP",
	normalMap: "NORMAL_MAP",
	bumpMap: "BUMP_MAP",
	aoMap: "AO_MAP",
	lightMap: "LIGHT_MAP"
}, $r = [
	"map",
	"emissiveMap",
	...Object.keys(Qr)
], ei = {
	matcap: "uMatcap",
	map: "uMap",
	roughnessMap: "uRoughnessMap",
	metalnessMap: "uMetalnessMap",
	normalMap: "uNormalMap",
	bumpMap: "uBumpMap",
	aoMap: "uAoMap",
	emissiveMap: "uEmissiveMap",
	lightMap: "uLightMap"
}, ti = [Cr, vr], ni = new U({
	positions: [
		-1,
		0,
		-1,
		1,
		0,
		-1,
		1,
		0,
		1,
		-1,
		0,
		1
	],
	normals: [
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0
	],
	uvs: [
		0,
		0,
		1,
		0,
		1,
		1,
		0,
		1
	],
	indices: [
		0,
		2,
		1,
		0,
		3,
		2
	]
}), ri = {
	drawMode: "triangles",
	receiveShadow: !0,
	castShadow: !1,
	renderOrder: 0
}, ii = class {
	static OPTIONS = Wr;
	static HINTS = Jr;
	canvas;
	toneMapping = "neutral";
	exposure = 1;
	pixelRatio = 1;
	outlineAntialias = !0;
	#e = null;
	info = {
		drawCalls: 0,
		triangles: 0,
		programs: 0,
		geometries: 0,
		textures: 0,
		compiling: 0
	};
	onReady = null;
	#t;
	#n = null;
	#r = null;
	#i = [];
	#a = /* @__PURE__ */ new Float32Array(9);
	#o = {};
	#s = !1;
	#c = [];
	#l = !1;
	#u = /* @__PURE__ */ new Map();
	constructor(e) {
		if (A("WebGLRenderer", e, Wr, Jr), e?.canvas || E("WebGLRenderer", "'canvas' is required"), this.canvas = e.canvas, e.toneMapping !== void 0 && (this.toneMapping = P("WebGLRenderer", "toneMapping", e.toneMapping, [
			"aces",
			"neutral",
			"none"
		])), e.exposure !== void 0 && (this.exposure = N("WebGLRenderer", "exposure", e.exposure, 0)), e.pixelRatio !== void 0 && (this.pixelRatio = N("WebGLRenderer", "pixelRatio", e.pixelRatio, 0, Infinity, { above: !0 })), this.#e = Yr("WebGLRenderer", e.bloom), this.outlineAntialias = e.outlineAntialias === void 0 ? e.shared || e.antialias !== !1 : !!e.outlineAntialias, e.shared) {
			this.#t = Hr.shared();
			let e = this.canvas.getContext("2d");
			e || E("WebGLRenderer", "a shared renderer's canvas needs a 2D context - give it a canvas that has no WebGL context yet"), this.#n = e;
		} else this.#t = new Hr(this.canvas, { antialias: e.antialias });
		this.#t.users.add(this);
	}
	get bloom() {
		return this.#e;
	}
	set bloom(e) {
		this.#e = Yr("WebGLRenderer", e);
	}
	get gl() {
		return this.#t.gl;
	}
	get shared() {
		return this.#t.isShared;
	}
	setSize(e, t, n = this.pixelRatio) {
		this.pixelRatio = n, this.canvas.width = Math.max(1, Math.round(e * n)), this.canvas.height = Math.max(1, Math.round(t * n));
	}
	render(e, t) {
		return e.updateWorldTree(), this.renderFrame(Lt(e, t));
	}
	renderFrame(e, { wait: t = !1 } = {}) {
		let n = this.#t;
		if (n.lost) return e;
		let r = n.gl;
		n.frame++, n.resources.owner = this, this.#s = t, this.info.drawCalls = 0, this.info.triangles = 0, this.info.compiling = 0;
		let i = this.canvas.width, a = this.canvas.height;
		n.isShared && n.fit(i, a);
		let o = e.environment, s = e.background, c = n.loadPasses(!!e.shadow || e.spotShadows.length > 0 || !!e.pointShadow || e.outlines.length > 0 || typeof o == "object" && !!o.image || !!s && !("getHex" in s) && !!s.image);
		this.#r = c && typeof o == "object" ? c.environment(o) : null, c && typeof o == "object" && o.image && !this.#r && F(o, o.isHDR ? "this device can't render to float textures, which HDR environments need - lighting without it" : "'environment' needs an HDR image (a .hdr file) - lighting without it"), c && s && !("getHex" in s) && s.isHDR && c.environment(s), this.#i = c ? [
			e.shadow && c.shadowMap(e.shadow),
			e.spotShadows.length > 0 && c.spotShadowMaps(e.spotShadows),
			e.pointShadow && c.pointShadowMap(e.pointShadow)
		].filter((e) => !!e) : [];
		let l = c && e.outlines.length ? c.outlineMask(e.outlines, e, i, a, this.pixelRatio, this.outlineAntialias) : null, u = this.#e ? n.loadBloom() : null;
		if (!u && n.bloom && ![...n.users].some((e) => e.bloom) && n.bloom.dispose(), u ? u.begin(i, a) : (r.bindFramebuffer(r.FRAMEBUFFER, null), r.viewport(0, 0, i, a)), s && "getHex" in s) {
			let [e, t, n] = s.toSRGB();
			r.clearColor(e, t, n, 1);
		} else r.clearColor(0, 0, 0, 0);
		r.depthMask(!0), r.enable(r.SCISSOR_TEST), r.scissor(0, 0, i, a), r.clear(r.COLOR_BUFFER_BIT | r.DEPTH_BUFFER_BIT), r.disable(r.SCISSOR_TEST), c && s && !("getHex" in s) && s.image && c.background(e, s, {
			exposure: this.exposure,
			toneMapping: Xr[this.toneMapping]
		}), r.enable(r.DEPTH_TEST), r.depthFunc(r.LEQUAL), this.#d(e), r.disable(r.BLEND);
		for (let t of e.opaque) this.#f(t, e, !1);
		for (let t of e.caps) this.#p(t, e, i, a);
		r.enable(r.BLEND);
		for (let t of e.transparent) this.#f(t, e, !0);
		if (l && c && c.outlineComposite(l), r.depthMask(!0), r.disable(r.BLEND), r.bindVertexArray(null), u && this.#e && u.end(this.#e), this.info.compiling && n.whenCompiled(), this.#n) {
			let e = this.#n, t = n.canvas;
			e.globalCompositeOperation = "copy", e.drawImage(t, 0, t.height - a, i, a, 0, 0, i, a);
		}
		return this.info.programs = n.programs.count, this.info.geometries = n.resources.counts.geometries, this.info.textures = n.resources.counts.textures, e;
	}
	pick(e, t, n) {
		let r = this.#t;
		if (r.lost) return;
		let i = r.loadPicker();
		if (!i) return;
		r.resources.owner = this;
		let a = this.pixelRatio;
		return i.pick(e, t * a, n * a, this.canvas.width, this.canvas.height, a);
	}
	pickAsync(e, t, n) {
		let r = this.#t;
		if (r.lost) return;
		let i = r.loadPicker();
		if (!i) return;
		r.resources.owner = this;
		let a = this.pixelRatio;
		return i.pickAsync(e, t * a, n * a, this.canvas.width, this.canvas.height, a);
	}
	dispose(e) {
		this.#t.release(this, e);
	}
	#d(e) {
		let t = [
			0,
			0,
			0
		], n = [
			0,
			0,
			0
		], r = [
			0,
			0,
			0
		], i = e.lights.filter((e) => e.kind === "directional").length, a = e.lights.filter((e) => e.kind === "point" || e.kind === "spot").length, o = new Float32Array(i * 3), s = new Float32Array(i * 3), c = new Float32Array(a * 3), l = new Float32Array(a * 3), u = new Float32Array(a), d = new Float32Array(a * 3), f = new Float32Array(a).fill(-1), p = new Float32Array(a * 2), m = 0, h = 0, g = -1, _ = (e, t, n, r = n.color) => {
			e[t] += r[0] * n.intensity, e[t + 1] += r[1] * n.intensity, e[t + 2] += r[2] * n.intensity;
		};
		for (let i of e.lights) if (i.kind === "ambient") _(t, 0, i);
		else if (i.kind === "hemisphere") _(n, 0, i), _(r, 0, i, i.ground);
		else if (i.kind === "directional") {
			let e = i.direction;
			o.set([
				-e[0],
				-e[1],
				-e[2]
			], m * 3), _(s, m * 3, i), m++;
		} else {
			let t = h++;
			if (c.set(i.position, t * 3), _(l, t * 3, i), u[t] = i.range ?? 0, i === e.pointShadow?.light && (g = t), i.kind === "spot") {
				d.set(i.direction, t * 3), f[t] = i.shadowTile ?? -1;
				let e = i.angle;
				p[t * 2] = Math.cos(e), p[t * 2 + 1] = Math.cos(e * (1 - (i.penumbra ?? 0)));
			} else p[t * 2] = -2, p[t * 2 + 1] = -1;
		}
		this.#c = [`NUM_DIRECTIONAL ${m}`, `NUM_PUNCTUAL ${h}`], this.#l = e.environment === "studio", this.#o = {
			uAmbient: t,
			uHemisphereSky: n,
			uHemisphereGround: r,
			uDirectionalDirection: o,
			uDirectionalColor: s,
			uPunctualPosition: c,
			uPunctualColor: l,
			uPunctualRange: u,
			uPunctualDirection: d,
			uPunctualCone: p,
			uPunctualShadow: f,
			uPointShadowIndex: g
		};
	}
	#f(e, t, n) {
		let r = this.gl, { node: i, geometry: a, material: s, worldMatrix: c, instances: l } = e, u = i.drawMode, d = u === "points" ? "points" : u === "lines" ? "lines" : "mesh", f = d === "mesh" && i.receiveShadow && !s.unlit ? this.#i : Zr, p = d === "mesh" ? e.clip : null, m = this.#h(d, s, a.colors !== null, !!l, a.uvs2 !== null);
		for (let e of f) m.push(e.define);
		let h = s.fog ? t.fog : null;
		h && (m.push("FOG"), h.linear && m.push("FOG_LINEAR"), s.blending === "additive" ? m.push("FOG_ADD") : s.blending === "multiply" && m.push("FOG_MULTIPLY")), p && m.push("CLIP");
		let g = this.#t.programs, _ = g.get(d, m);
		if (!g.isReady(_)) {
			if (!this.#s) {
				this.info.compiling++;
				return;
			}
			g.ready(d, m);
		}
		if (r.useProgram(_.program), _.frame !== this.#t.frame && (_.frame = this.#t.frame, _.set("uView", t.camera.view), _.set("uProjection", t.camera.projection), _.set("uViewProjection", t.camera.viewProjection), _.set("uCameraPosition", t.camera.position), _.set("uExposure", this.exposure), _.set("uToneMapping", Xr[this.toneMapping]), _.set("uResolution", [this.canvas.width, this.canvas.height]), _.set("uNear", t.camera.near), _.set("uScale", t.camera.projection[5] * this.canvas.height / 2), d === "mesh" && !s.unlit)) {
			for (let [e, t] of Object.entries(this.#o)) _.set(e, t);
			let e = this.#r;
			e && (_.set("uEnvMaxLod", e.maxLod), _.set("uEnvSH", e.sh), _.set("uEnvIntensity", t.environmentIntensity));
			for (let e of f) for (let [t, n] of Object.entries(e.uniforms)) _.set(t, n);
		}
		if (d === "mesh" && !s.unlit) {
			this.#r && _.set("uEnvMap", this.#r.prefiltered);
			for (let e of f) _.set(e.sampler, e.texture);
		}
		_.set("uModel", c);
		let v = t.highlight;
		v && (v.nodes ? v.nodes.has(i) : v.node === i) ? (_.set("uHighlightIndex", v.index ?? -1), _.set("uHighlight", [
			v.color[0],
			v.color[1],
			v.color[2],
			v.amount
		])) : _.set("uHighlightIndex", -2), _.set("uColor", s.color), _.set("uOpacity", s.opacity), h && (_.set("uFogColor", h.color), _.set("uFogRange", [h.near, h.far]), _.set("uFogDensity", h.density)), p && _.set("uClipPlane", p.plane);
		let y = s.emissive, b = s.emissiveIntensity;
		_.set("uEmissive", [
			y[0] * b,
			y[1] * b,
			y[2] * b
		]), _.set("uRoughness", s.roughness), _.set("uMetalness", s.metalness), _.set("uNormalScale", s.normalScale), s.bumpMap && _.set("uBumpScale", s.bumpScale), s.triplanar > 0 && _.set("uTriplanar", s.triplanar), _.set("uAoMapIntensity", s.aoMapIntensity), s.transmission > 0 && _.set("uTransmission", s.transmission), s.clearcoat > 0 && (_.set("uClearcoat", s.clearcoat), _.set("uClearcoatRoughness", s.clearcoatRoughness));
		let x = (s.ior - 1) / (s.ior + 1), S = s.specularColor, C = s.specularIntensity;
		if (_.set("uSpecular", [
			Math.min(x * x * S[0], 1) * C,
			Math.min(x * x * S[1], 1) * C,
			Math.min(x * x * S[2], 1) * C,
			C
		]), s.sheen > 0) {
			let e = s.sheenColor, t = s.sheen;
			_.set("uSheenColor", [
				e[0] * t,
				e[1] * t,
				e[2] * t
			]), _.set("uSheenRoughness", s.sheenRoughness);
		}
		if (s.anisotropy > 0 && (_.set("uAnisotropy", s.anisotropy), _.set("uAnisotropyDirection", [Math.cos(s.anisotropyRotation), Math.sin(s.anisotropyRotation)])), s.translucency > 0) {
			let e = s.translucencyColor, t = s.translucency;
			_.set("uTranslucency", [
				e[0] * t,
				e[1] * t,
				e[2] * t,
				t
			]);
		}
		s.toon > 0 && _.set("uToon", Math.max(2, Math.round(s.toon))), _.set("uAlphaTest", s.alphaTest);
		let w = d === "mesh" ? s.textures : s.map ? [["map", s.map]] : [], T = w.map(([e, t]) => [ei[e], this.#t.resources.texture(t)]);
		for (let [e, t] of T) _.set(e, t);
		for (let [e, t] of w) e !== "matcap" && _.set(`${ei[e]}Uv`, Rr(t));
		if (s.lightMap && _.set("uLightMapIntensity", s.lightMapIntensity), _.set("uEnvStrength", s.environmentIntensity), r.depthMask(!n && s.depthWrite), s.depthTest ? r.enable(r.DEPTH_TEST) : r.disable(r.DEPTH_TEST), n && (s.blending === "additive" ? r.blendFunc(r.ONE, r.ONE) : s.blending === "multiply" ? r.blendFunc(r.DST_COLOR, r.ONE_MINUS_SRC_ALPHA) : r.blendFunc(r.ONE, r.ONE_MINUS_SRC_ALPHA)), d === "lines") {
			r.disable(r.CULL_FACE), _.set("uWidth", s.width * this.pixelRatio);
			let e = this.#t.resources.lines(a);
			r.bindVertexArray(e.vao), r.drawArraysInstanced(r.TRIANGLE_STRIP, 0, 4, Math.min(e.count, Math.floor(a.drawnCount / 2))), this.info.drawCalls++;
		} else if (d === "points") {
			r.disable(r.CULL_FACE), _.set("uSize", s.sizeAttenuation ? s.size : s.size * this.pixelRatio);
			let e = this.#t.resources.mesh(a, null, !1);
			r.bindVertexArray(e.vao), r.drawArrays(r.POINTS, 0, a.drawnVertices), this.info.drawCalls++;
		} else it(this.#a, c) || rt(this.#a), _.set("uNormalMatrix", this.#a), r.frontFace(o(c) < 0 ? r.CW : r.CCW), s.doubleSided ? r.disable(r.CULL_FACE) : (r.enable(r.CULL_FACE), r.cullFace(r.BACK)), r.enable(r.POLYGON_OFFSET_FILL), r.polygonOffset(1, 2), this.info.triangles += this.#t.resources.drawTriangles(a, l, s.anisotropy > 0 && !s.unlit), r.disable(r.POLYGON_OFFSET_FILL), this.info.drawCalls++;
	}
	#p(e, t, n, r) {
		let i = this.gl, a = this.#t.programs, s = [!1, !0].map((e) => a.get("clip-mask", e ? ["INSTANCED", "CLIP"] : ["CLIP"], ti));
		if (!s.every((e) => a.isReady(e))) {
			if (!this.#s) {
				this.info.compiling++;
				return;
			}
			for (let e of [!1, !0]) a.ready("clip-mask", e ? ["INSTANCED", "CLIP"] : ["CLIP"], ti);
		}
		i.enable(i.STENCIL_TEST), i.enable(i.SCISSOR_TEST), i.scissor(0, 0, n, r), i.clearStencil(0), i.clear(i.STENCIL_BUFFER_BIT), i.disable(i.SCISSOR_TEST), i.colorMask(!1, !1, !1, !1), i.depthMask(!1), i.disable(i.DEPTH_TEST), i.disable(i.CULL_FACE), i.stencilFunc(i.ALWAYS, 0, 255), i.stencilOpSeparate(i.BACK, i.KEEP, i.KEEP, i.INCR_WRAP), i.stencilOpSeparate(i.FRONT, i.KEEP, i.KEEP, i.DECR_WRAP);
		for (let n of e.items) {
			let r = s[+!!n.instances];
			i.useProgram(r.program), r.set("uViewProjection", t.camera.viewProjection), r.set("uModel", n.worldMatrix), r.set("uClipPlane", e.plane), i.frontFace(o(n.worldMatrix) < 0 ? i.CW : i.CCW), this.#t.resources.drawTriangles(n.geometry, n.instances), this.info.drawCalls++;
		}
		i.colorMask(!0, !0, !0, !0), i.stencilFunc(i.NOTEQUAL, 0, 255), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), this.#f(this.#m(e), t, !1), i.disable(i.STENCIL_TEST);
	}
	#m(e) {
		let t = e.color.getHex(), n = this.#u.get(t);
		n || this.#u.set(t, n = new Qe({
			color: e.color.getStyle(),
			roughness: .6
		}));
		let [r, i, a] = e.plane, o = Math.abs(r) < .9 ? [
			1,
			0,
			0
		] : [
			0,
			1,
			0
		], s = i * o[2] - a * o[1], c = a * o[0] - r * o[2], l = r * o[1] - i * o[0], u = Math.hypot(s, c, l);
		s /= u, c /= u, l /= u;
		let d = c * a - l * i, f = l * r - s * a, p = s * i - c * r, m = e.radius * 1.05, h = e.center, g = new Float32Array([
			s * m,
			c * m,
			l * m,
			0,
			r,
			i,
			a,
			0,
			d * m,
			f * m,
			p * m,
			0,
			h[0],
			h[1],
			h[2],
			1
		]);
		return {
			node: ri,
			geometry: ni,
			material: n,
			worldMatrix: g,
			instances: null,
			depth: 0,
			clip: null
		};
	}
	#h(e, t, n, r, i) {
		let a = [];
		if (t.vertexColors && n && a.push("VERTEX_COLORS"), e === "mesh") {
			if (!t.unlit) {
				a.push("LIT");
				for (let [e, n] of Object.entries(Qr)) t[e] && a.push(n);
				a.push(...this.#c), this.#r ? a.push("ENV_MAP") : this.#l && a.push("STUDIO"), t.transmission > 0 && a.push("TRANSMISSION"), t.clearcoat > 0 && a.push("CLEARCOAT"), t.sheen > 0 && a.push("SHEEN"), t.anisotropy > 0 && a.push("ANISOTROPY"), t.translucency > 0 && a.push("TRANSLUCENCY"), t.matcap && a.push("MATCAP"), t.toon > 0 && a.push("TOON");
			}
			t.map && a.push("MAP"), t.emissiveMap && a.push("EMISSIVE_MAP"), t.alphaTest > 0 && a.push("ALPHA_TEST"), t.flatShading && a.push("FLAT_SHADING"), t.doubleSided && a.push("DOUBLE_SIDED"), t.triplanar > 0 && $r.some((e) => t[e]) && a.push("TRIPLANAR");
			let e = i ? t.textures.filter(([e, t]) => t.uvSet === 1 && e !== "matcap") : [];
			e.length && a.push("UV2", ...e.map(([e]) => `${ei[e]}Set vUv2`)), r && a.push("INSTANCED");
		} else e === "points" && (t.map && a.push("MAP"), t.sizeAttenuation && a.push("SIZE_ATTENUATION"));
		return a;
	}
}, ai = [
	"canvas",
	"scene",
	"camera",
	"orbit",
	"background",
	"renderMode",
	"framing",
	"highlight",
	"tooltip",
	"pixelRatio",
	"antialias",
	"outlineAntialias",
	"context",
	"toneMapping",
	"exposure",
	"bloom",
	"autoLight",
	"maxDelta",
	"reducedMotion",
	"keyboard",
	"description"
], oi = ["keep", "aspect"], si = {
	renderer: "the View makes its renderer - read it from view.renderer",
	controls: "use orbit: true (or orbit options); the control is then view.controls",
	container: "use canvas: an element or selector (a full-window canvas is made when omitted)",
	onClick: "use view.on('click', (hit) => ...)",
	onHover: "use view.on('hover', (hit) => ...)",
	frameloop: "use renderMode: 'auto' | 'always' | 'manual'",
	keep: "use framing: { keep: 'width' | 'height' | 'both' }",
	fit: "use framing: { keep: 'both' } to keep everything framed in view as the canvas changes shape",
	aspect: "the canvas sets the aspect; framing: { aspect } says which shape the camera was set up for"
}, ci = {
	mouseover: "hover",
	mouseenter: "hover",
	mousemove: "hover",
	pointermove: "hover",
	pointerover: "hover",
	pointerenter: "hover",
	mouseleave: "hover",
	pointerleave: "hover",
	tap: "click",
	pick: "click",
	select: "click",
	pointerdown: "click",
	mousedown: "click"
}, li = .45, ui = H.fromInput("#ffcc00"), di = 4, fi = 5e3, pi = 0, mi = class {
	static OPTIONS = ai;
	static HINTS = si;
	static FRAMING_OPTIONS = oi;
	canvas;
	scene;
	#e;
	renderer;
	controls = null;
	time = 0;
	autoLight = !0;
	maxDelta = .1;
	renderMode = "auto";
	lastFrame = null;
	#t = null;
	#n = !0;
	#r = !1;
	#i = !1;
	#a = !1;
	#o = 0;
	#s = 0;
	#c = !0;
	#l = !0;
	#u = 0;
	#d = 0;
	#f = 1;
	#p = !1;
	#m = !1;
	#h = null;
	#g = "height";
	#_ = 0;
	#v = 1;
	#y = new Qn();
	#b = [];
	#x;
	#S = null;
	#C = {
		click: /* @__PURE__ */ new Set(),
		hover: /* @__PURE__ */ new Set()
	};
	#w = null;
	#T = null;
	#E = "";
	#D = !1;
	#O = null;
	#k = "auto";
	#A = null;
	#j = null;
	#M = null;
	#N = !1;
	#P = !1;
	#F = null;
	#I = !1;
	#L = !1;
	#R = !1;
	#z = null;
	#B = null;
	#V = null;
	#H = null;
	#U = null;
	#W = null;
	#G = new cr({
		sky: "#ffffff",
		ground: "#444444",
		intensity: .5
	});
	#K = new ur({
		direction: [
			-.5,
			-1,
			-.6
		],
		intensity: 1.5
	});
	#q = !1;
	constructor(e = {}) {
		A("View", e, ai, si), this.canvas = Di(e.canvas), this.#a = e.canvas === void 0, e.scene === void 0 ? this.scene = new nr() : e.scene instanceof nr ? this.scene = e.scene : E("View", `'scene' must be a Scene${e.scene && typeof e.scene == "object" && "type" in e.scene ? " - build one from a description with create({ type: 'scene', ... })" : `, got ${j(e.scene)}`}`), e.background !== void 0 && (this.scene.background = e.background), e.camera instanceof xn ? this.#e = e.camera : typeof e.camera == "string" ? (this.#e = Dn(e.camera), this.#m = !0) : e.camera === void 0 ? (this.#e = Dn("perspective"), this.#m = !0) : this.#e = new Sn({
			position: [
				0,
				1.5,
				6
			],
			target: [
				0,
				0,
				0
			],
			...e.camera
		}), this.#m && (this.#h = hi(this.#e));
		let t = e.context === void 0 ? "auto" : P("View", "context", e.context, [
			"auto",
			"own",
			"shared"
		]);
		e.exposure !== void 0 && N("View", "exposure", e.exposure, 0);
		let n = t === "shared" || t === "auto" && pi >= di;
		if (this.renderer = new ii({
			canvas: this.canvas,
			shared: n,
			antialias: e.antialias,
			outlineAntialias: e.outlineAntialias,
			toneMapping: e.toneMapping,
			exposure: e.exposure,
			bloom: e.bloom
		}), n || (this.#i = !0, pi++), this.renderer.onReady = () => {
			this.#I = !0, this.invalidate();
		}, e.autoLight !== void 0 && (this.autoLight = !!e.autoLight), e.reducedMotion !== void 0 && this.#Y(e.reducedMotion), e.maxDelta !== void 0 && (this.maxDelta = N("View", "maxDelta", e.maxDelta, 0, Infinity, { above: !0 })), e.renderMode !== void 0 && (this.renderMode = P("View", "renderMode", e.renderMode, [
			"auto",
			"always",
			"manual"
		])), e.pixelRatio !== void 0 && (this.#f = N("View", "pixelRatio", e.pixelRatio, 0, Infinity, { above: !0 }), this.#p = !0), e.orbit !== void 0 && e.orbit !== !1 && e.orbit !== !0 && (typeof e.orbit != "object" || Array.isArray(e.orbit) || e.orbit === null) && E("View", `'orbit' must be true, false or orbit options such as { autoRotate: true }, got ${j(e.orbit)}`), e.orbit) {
			let t = e.orbit === !0 ? {} : e.orbit, n = t.mode ?? (e.camera === "top" ? "map" : void 0);
			this.controls = new mn(this.camera, this.canvas, n ? {
				...t,
				mode: n
			} : t), this.#B = this.controls.handOverPointer();
		}
		if (e.highlight !== void 0 && this.#J(e.highlight), e.tooltip !== void 0 && this.tooltip(e.tooltip), e.description !== void 0 && (this.description = e.description), e.keyboard !== void 0 && e.keyboard !== !1 && this.#ae(e.keyboard), this.#x = new cn(this.canvas, {
			interactive: (e) => Ti(e, "click").length > 0 || Ti(e, "hover").length > 0,
			on: (e, t, n) => this.#me(e, t, n)
		}), e.framing !== void 0) {
			let t = typeof e.framing == "string" ? { keep: e.framing } : e.framing;
			A("View", t, oi, {}, "framing"), t.keep !== void 0 && (this.#g = P("View", "framing.keep", t.keep, [
				"height",
				"width",
				"both"
			])), t.aspect !== void 0 && (t.aspect > 0 || E("View", `framing.aspect is a width / height above 0, got ${j(t.aspect)}`), this.#_ = t.aspect);
		}
		this.resize(), this.#ve(), this.#le();
	}
	get camera() {
		return this.#e;
	}
	set camera(e) {
		if (typeof e == "string") {
			let t = this.#e, n = t.target ?? new z();
			e = Dn(e, {
				target: n,
				distance: Math.max(.001, t.position.distanceTo(n))
			}), this.#m = !0;
		} else this.#m = !1;
		e instanceof xn || E("View", `'camera' must be a camera or a preset name, got ${j(e)}`), this.#U = null, this.#e = e, this.#d && (e.aspect = this.#u / this.#d), this.#_ = e.aspect, this.#v = 1, this.controls && (e.target ??= this.controls.target.clone(), this.controls.camera = e), this.#m && (this.#h = hi(e)), this.invalidate();
	}
	get bloom() {
		return this.renderer.bloom;
	}
	set bloom(e) {
		this.renderer.bloom = e, this.invalidate();
	}
	get highlight() {
		return this.#O;
	}
	set highlight(e) {
		this.#J(e);
	}
	#J(e) {
		this.#O = e == null ? null : H.fromInput(e, "View"), this.#I = !0, this.invalidate();
	}
	get reducedMotion() {
		return this.#k === "auto" ? this.#P : this.#k;
	}
	set reducedMotion(e) {
		this.#Y(e);
	}
	#Y(e) {
		e !== "auto" && typeof e != "boolean" && E("View", `'reducedMotion' is 'auto' (as the system's setting), true or false, got ${j(e)}`), this.#k = e, this.invalidate();
	}
	get description() {
		return this.#M;
	}
	set description(e) {
		if (e !== null && typeof e != "string" && E("View", `'description' is text for screen readers, or null, got ${j(e)}`), this.#M = e, this.#A) {
			this.#A.setDescription(e);
			return;
		}
		let t = this.canvas;
		e === null ? (t.removeAttribute("aria-label"), this.#N && t.removeAttribute("role"), this.#N = !1) : (t.setAttribute("aria-label", e), t.hasAttribute("role") || (t.setAttribute("role", "img"), this.#N = !0));
	}
	get width() {
		return this.#u;
	}
	get height() {
		return this.#d;
	}
	get ready() {
		return this.scene.ready;
	}
	get hovered() {
		return this.#H;
	}
	get overlay() {
		return this.#x.root;
	}
	start(e) {
		return e && (this.#t = e), this.#n || (this.#n = !0, this.#s = 0), this.#le(), this;
	}
	stop() {
		return this.#n = !1, this;
	}
	get running() {
		return this.#n;
	}
	invalidate() {
		return this.#c = !0, this.#le(), this;
	}
	step(e) {
		return this.time += e, this.#t?.(e, this.time), this.scene.motionReduced = this.reducedMotion, this.scene.update(e, this.time), this.#X(e), this.#Z(!0);
	}
	#X(e) {
		if (this.#U) return this.#$(e);
		if (!this.controls) return;
		let t = this.#m && gi(hi(this.camera), this.#h);
		this.controls.update(e, this.reducedMotion), t && (this.#h = hi(this.camera));
	}
	render() {
		return this.#Z(!1);
	}
	#Z(e) {
		if (this.#m) {
			this.resize();
			let e = this.scene.bounds;
			gi(hi(this.camera), this.#h) ? e.isEmpty() || this.frame(this.scene) : this.#m = !1;
		}
		this.scene.updateWorldTree();
		let t = Lt(this.scene, this.camera);
		return this.autoLight && t.lights.length === 0 && this.#xe(t), t.highlight = this.#ge(this.#H), this.#_e(t), this.renderer.renderFrame(t, { wait: e }), this.#S = this.#x.update(t.labels, t.overlays), t.tooltips && !this.#w && this.#ie(), this.lastFrame = t, this.#c = !1, this.renderMode === "auto" && this.#y.changed(this.scene, this.camera), (this.#F || this.#j) && this.#de() && (this.#I = !0), t;
	}
	resize() {
		let e = this.canvas.clientWidth, t = this.canvas.clientHeight;
		if ((!e || !t) && this.#u) return;
		if (this.#u && this.#f !== 1 && e === Math.round(this.#u * this.#f) && t === Math.round(this.#d * this.#f)) {
			this.canvas.style.width = `${this.#u}px`, this.canvas.style.height = `${this.#d}px`;
			return;
		}
		let n = e || this.canvas.width || 1, r = t || this.canvas.height || 1;
		this.#p || (this.#f = Math.min(globalThis.devicePixelRatio || 1, 2)), this.#u = n, this.#d = r, this.renderer.setSize(n, r, this.#f), this.camera.aspect = n / r;
		let i = this.#m && gi(hi(this.camera), this.#h);
		this.#ce(), i && (this.#h = hi(this.camera)), this.#c = !0;
	}
	frame(e = this.scene, { padding: t = .2, direction: n, duration: r = 0 } = {}) {
		N("View", "frame() duration", r, 0);
		let i = this.camera, a = xi(i);
		this.#U = null;
		let o = this.#Q("frame", e, t, n);
		return this.#m = !1, o && (Si(i, o.place), i.near = o.near ?? i.near, i.far = Math.max(i.far, o.far), this.#_ = i.aspect, this.#v = 1, r > 0 && !this.reducedMotion && (this.#U = {
			from: a,
			to: xi(i),
			time: 0,
			duration: r
		}, Si(i, a)), this.invalidate()), this;
	}
	framing(e = this.scene, { padding: t = .2, direction: n } = {}) {
		let r = this.#Q("framing", e, t, n);
		if (!r) return null;
		let { position: i, target: a, height: o } = r.place;
		return o === void 0 ? {
			position: i,
			target: a
		} : {
			position: i,
			target: a,
			height: o
		};
	}
	#Q(e, t, n, r) {
		n >= 0 || E("View", `${e}() padding is the margin around, as a fraction of the size (0.2 = 20%), got ${j(n)}`), n >= 1 && F(this, `${e}() padding ${n} leaves a margin of ${Math.round(n * 100)}% - it is a fraction of the size (0.2 = 20%)`);
		let i = this.camera, a = r === void 0 ? i.position.clone().sub(i.target ?? new z()).normalize() : typeof r == "string" ? On(r) : z.fromInput(r, "View").normalize();
		r !== void 0 && !(a.len() > 0) && E("View", `${e}() direction is a preset name or a vector from the target towards the camera, got ${j(r)}`), a.len() === 0 && a.set(0, .3, 1).normalize();
		let o = t instanceof V ? _i(t) : this.#ee(t, a);
		if (!o.length) return null;
		let s = i.constructor.type === "orthographic-camera", { center: c, size: l } = An(o, a, {
			aspect: i.aspect,
			fov: s ? void 0 : i.fov,
			padding: n
		}), u = Math.max(.001, ...o.map((e) => Math.hypot(e[0] - c[0], e[1] - c[1], e[2] - c[2])));
		if (s) return {
			place: {
				position: c.clone().add(a.clone().multiplyScalar(u * 4)),
				target: c,
				height: l
			},
			near: void 0,
			far: u * 10
		};
		let d = l;
		return {
			place: {
				position: c.clone().add(a.clone().multiplyScalar(d)),
				target: c
			},
			near: Math.max(.001, d / 1e3),
			far: d * 10
		};
	}
	#$(e) {
		let t = this.#U;
		t.time = Math.min(t.duration, t.time + e);
		let n = Mn.inOut(t.time / t.duration), r = this.camera, i = t.from.target.clone().lerp(t.to.target, n), a = t.from.position.clone().sub(t.from.target), o = t.to.position.clone().sub(t.to.target), s = a.len() || 1e-6, c = o.len() || 1e-6, l = wi(a.multiplyScalar(1 / s), o.multiplyScalar(1 / c), n);
		Ci(r, i), r.position.copy(i).add(l.multiplyScalar(s * (c / s) ** n)), t.to.height !== void 0 && (r.height = t.from.height * (t.to.height / t.from.height) ** n), t.time >= t.duration && (Si(r, t.to), this.#U = null), this.invalidate();
	}
	#ee(e, t) {
		let n = e.bounds;
		if (n.isEmpty()) return [];
		let r = this.camera, i = r.position.clone();
		r.position.copy(n.getCenter()).add(t.clone().multiplyScalar(Math.max(n.getRadius(), .001) * 3)), r.updateWorld();
		let a = yi(e, r);
		return r.position.copy(i), r.updateWorld(), a.length ? a : _i(n);
	}
	pick(e, t) {
		if (typeof e == "object") {
			let n = this.canvas.getBoundingClientRect();
			t = e.clientY - n.top, e = e.clientX - n.left;
		}
		let n = this.#te(), r = n ? this.renderer.pick(n, e, t) : void 0;
		return r === void 0 ? this.pickAll(e, t)[0] ?? null : r && this.#ne(r, n);
	}
	rayAt(e, t) {
		if (typeof e == "object") {
			let n = this.canvas.getBoundingClientRect();
			t = e.clientY - n.top, e = e.clientX - n.left;
		}
		let n = [e / (this.#u || 1) * 2 - 1, 1 - t / (this.#d || 1) * 2];
		return new Yn().setFromCamera(n, this.camera).ray;
	}
	#te() {
		let e = this.lastFrame;
		if (!e) return null;
		let t = 0;
		for (let { node: n, geometry: r, instances: i } of [...e.opaque, ...e.transparent]) {
			let e = n.drawMode;
			t += i ? i.count : e === "points" ? r.drawnVertices : e === "lines" ? r.drawnCount / 2 : r.drawnCount / 3;
		}
		return t > fi ? e : null;
	}
	#ne(e, t) {
		let n = e.item.node, r = new Yn().setFromCamera(e.ndc, this.camera), i = r.intersectElement(n, e.element);
		if (i) return i;
		let a = new B().copy(t.camera.viewProjection).invert(), o = new z(e.ndc[0], e.ndc[1], e.ndc[2]).applyMatrix4(a), s = "instanceMatrices" in n, c = e.element, l = s || n.drawMode !== "triangles";
		return {
			node: n,
			point: o,
			distance: o.distanceTo(r.ray.origin),
			normal: null,
			face: l && !s ? c : null,
			instance: s ? c : null,
			uv: null,
			datum: n.datumAt(l ? c : null)
		};
	}
	project(e) {
		let { ndc: [t, n, r], visible: i } = Wt(z.fromInput(e, "View"), this.#re());
		return {
			x: (t * .5 + .5) * this.#u,
			y: (.5 - n * .5) * this.#d,
			depth: r * .5 + .5,
			visible: i
		};
	}
	screenBounds(e = this.scene) {
		let t = e instanceof V ? _i(e) : yi(e, this.camera);
		if (!t.length) return null;
		let n = Infinity, r = Infinity, i = -Infinity, a = -Infinity;
		for (let e of t) {
			let { x: t, y: o, depth: s } = this.project(e);
			if (!(s >= 0 && s <= 1)) return null;
			n = Math.min(n, t), i = Math.max(i, t), r = Math.min(r, o), a = Math.max(a, o);
		}
		return {
			left: n,
			top: r,
			right: i,
			bottom: a,
			width: i - n,
			height: a - r
		};
	}
	#re() {
		let e = this.camera;
		return e.updateWorld(), new B().multiplyMatrices(e.projectionMatrix, e.viewMatrix);
	}
	pickAll(e, t) {
		if (typeof e == "object") {
			let n = this.canvas.getBoundingClientRect();
			t = e.clientY - n.top, e = e.clientX - n.left;
		}
		let n = [e / this.#u * 2 - 1, 1 - t / this.#d * 2], r = new Yn().setFromCamera(n, this.camera), i = this.camera, a = i.position.distanceTo(i.target ?? [
			0,
			0,
			0
		]);
		return r.threshold = 4 * (i.constructor.type === "orthographic-camera" ? i.height / this.#d : 2 * a * Math.tan(i.fov * Math.PI / 360) / this.#d), this.scene.updateWorldTree(), r.intersect(this.scene);
	}
	on(e, t) {
		if (!(e in this.#C)) {
			let t = ci[e];
			t && E("View", `on('${e}') - use '${t}'${t === "hover" ? ", which fires as the thing under the pointer changes (null when it leaves)" : ""}`), P("View", "event", e, ["click", "hover"]);
		}
		typeof t != "function" && E("View", `on('${e}', fn) needs a function, got ${j(t)}`);
		let n = this.#C[e];
		return n.add(t), this.#I = !0, () => n.delete(t);
	}
	tooltip(e, { className: t } = {}) {
		return e !== null && typeof e != "function" && E("View", `tooltip() takes a function (hit) => text, or null, got ${j(e)}`), this.#T = e, t !== void 0 && (this.#E = t), this.#w && (this.#w.el.className = `phoria-tooltip${this.#E ? ` ${this.#E}` : ""}`), e && this.#ie(), this.#I = !0, this;
	}
	#ie() {
		this.#D || (this.#D = !0, import("./tooltip.js").then(({ Tooltip: e }) => {
			this.#r || (this.#w = new e((e) => this.#se(e)?.(e), this.#E), this.#I = !0, this.#le());
		}));
	}
	#ae(e) {
		e !== !0 && (typeof e != "object" || !e || Array.isArray(e)) && E("View", `'keyboard' is true, false or { label: (hit) => text }, got ${j(e)}`);
		let t = e === !0 ? {} : e;
		A("View", t, ["label"], {
			describe: "use 'label: (hit) => text'",
			text: "use 'label: (hit) => text'"
		}, "keyboard"), t.label !== void 0 && typeof t.label != "function" && E("View", `keyboard.label is a function (hit) => text, got ${j(t.label)}`), Promise.resolve().then(() => Ha).then(({ Keyboard: e }) => {
			this.#r || (this.#A = new e(this, {
				focus: (e) => {
					this.#j = e, this.#I = !0, this.invalidate();
				},
				press: (e) => {
					for (let t of Ei(e.node, "click")) t(e);
					for (let t of this.#C.click) t(e, null);
				},
				tooltip: (e) => this.#se(e)?.(e),
				viewWide: () => this.#C.hover.size > 0 || this.#C.click.size > 0 || !!this.#T
			}, t), this.#A.setDescription(this.#M));
		});
	}
	#oe(e) {
		let { x: t, y: n } = this.project(e.point), r = this.canvas.getBoundingClientRect();
		return {
			x: t,
			y: n,
			clientX: r.left + t,
			clientY: r.top + n,
			event: null
		};
	}
	#se(e) {
		for (let t = e.node; t; t = t.parent) if (t.tooltip) return t.tooltip;
		return this.#T;
	}
	async toImage(e) {
		let { snapshot: t } = await import("./snapshot.js");
		return this.#Z(!0), t(this.canvas, this.#x.shown, e ?? {}, this.#x.leaders);
	}
	async explain() {
		let { explain: e } = await import("./explain.js"), t = this.render(), n = 0, r = [];
		this.scene.traverse((e) => {
			n++, e !== this.scene && typeof e.explain == "function" && r.push(e.explain());
		});
		let i = this.scene.boundsFrom(this.camera), a = this.screenBounds(this.scene);
		return e({
			notes: r,
			fills: a ? {
				height: a.height / this.#d,
				width: a.width / this.#u
			} : null,
			width: this.#u,
			height: this.#d,
			pixelRatio: this.#f,
			renderMode: this.renderMode,
			running: this.#n,
			sharedContext: this.renderer.shared,
			frame: t,
			labels: this.#S,
			bounds: i,
			nodes: n,
			autoLight: this.autoLight,
			contextLost: !!this.renderer.gl?.isContextLost?.(),
			interaction: {
				hover: this.#C.hover.size,
				click: this.#C.click.size,
				tooltip: !!this.#T,
				highlight: !!this.#O,
				keyboard: !!this.#A,
				reducedMotion: this.reducedMotion,
				description: this.canvas.getAttribute?.("aria-label") ?? this.#M
			}
		});
	}
	dispose() {
		if (!this.#r) {
			this.#r = !0, this.#n = !1, cancelAnimationFrame(this.#o);
			for (let e of this.#b) e();
			this.controls?.dispose(), this.#x.dispose(), this.#w?.dispose(), this.#A?.dispose(), this.#M !== null && !this.#A && (this.description = null), this.renderer.dispose(this.scene), this.#i && pi--, this.#a && this.canvas.remove();
		}
	}
	#ce() {
		let e = this.#e;
		this.#_ ||= e.aspect;
		let t = jn(this.#g, this.#_, e.aspect), n = t / this.#v;
		if (this.#v = t, !(Math.abs(n - 1) < 1e-9)) {
			if (e.constructor.type === "orthographic-camera") e.height *= n;
			else if (e.target) {
				let t = e.position.clone().sub(e.target).multiplyScalar(n);
				e.position.copy(e.target).add(t);
			} else e.fov = Math.min(170, 2 * Math.atan(Math.tan(e.fov * Math.PI / 360) * n) * 360 / Math.PI);
		}
	}
	#le() {
		this.#o || this.#r || !this.#l || (this.renderMode !== "manual" || this.#n && this.#t || this.#c || this.#I) && (this.#o = requestAnimationFrame(this.#ue));
	}
	#ue = (e) => {
		this.#o = 0;
		let t = this.#s ? Math.min(this.maxDelta, (e - this.#s) / 1e3) : 0;
		this.#s = e;
		try {
			this.#n && (this.time += t, this.#t?.(t, this.time), this.scene.motionReduced = this.reducedMotion, this.scene.update(t, this.time)), this.#X(t), this.#I && this.#fe(), (this.#c || this.renderMode === "always" || this.renderMode === "auto" && this.#y.changed(this.scene, this.camera)) && this.render();
		} finally {
			(this.renderMode !== "manual" || this.#n && this.#t || this.#c || this.#I) && this.#le();
		}
	};
	#de() {
		return this.#C.hover.size > 0 || !!this.#T || !!this.#O || this.#C.click.size > 0 || !!this.lastFrame?.interactive;
	}
	#fe() {
		if (this.#I = !1, !this.#de()) return;
		let e = this.#F;
		if (this.#j) return this.#pe(this.#j, this.#oe(this.#j));
		if (this.#W) return this.#pe(this.#W);
		if (!e || this.#R) return this.#pe(null);
		let t = this.#te();
		if (t && this.#L) {
			this.#I = !0;
			return;
		}
		let n = t ? this.renderer.pickAsync(t, e.x, e.y) : void 0;
		if (!n) return this.#pe(this.pick(e.x, e.y));
		this.#L = !0, n.then((e) => {
			this.#L = !1, !this.#r && (this.#pe(this.#W ?? (e && this.#F ? this.#ne(e, t) : null)), this.#le());
		});
	}
	#pe(e, t = this.#F) {
		let n = this.#H, r = n === e || n && e && n.node === e.node && n.instance === e.instance && n.datum === e.datum && (e.node.drawMode !== "points" || n.face === e.face);
		if (this.#H = e, t && e && this.#w ? this.#w.show(e, t.clientX, t.clientY) : this.#w?.hide(), r) return;
		(this.#ge(n) || this.#ge(e)) && this.invalidate(), (this.#C.click.size || this.lastFrame?.interactive) && (this.canvas.style.cursor = e && bi(e.node, "onDrag") ? "grab" : e && this.#he(e) ? "pointer" : "");
		let i = Ei(n?.node, "hover"), a = Ei(e?.node, "hover");
		for (let e of i) a.includes(e) || e(null);
		for (let t of a) t(e);
		for (let n of this.#C.hover) n(e, t?.event ?? null);
	}
	#me(e, t, n) {
		let r = t.node, i = t.index, a = i !== null && r.drawMode === "points", o = {
			node: r,
			point: t.position.clone(),
			distance: t.position.distanceTo(this.camera.worldPosition),
			normal: null,
			face: a ? i : null,
			instance: i !== null && !a ? i : null,
			uv: null,
			datum: r.datumAt?.(i) ?? null
		};
		if (e === "click") {
			for (let e of Ei(r, "click")) e(o);
			for (let e of this.#C.click) e(o, n);
		} else {
			if (this.#W = e === "over" ? o : null, n) {
				let e = this.canvas.getBoundingClientRect();
				this.#F = {
					x: n.clientX - e.left,
					y: n.clientY - e.top,
					clientX: n.clientX,
					clientY: n.clientY,
					event: n
				};
			}
			e === "out" && (this.#F = null), this.#I = !0, this.#le();
		}
	}
	#he(e) {
		return this.#C.click.size > 0 || Ei(e.node, "click").length > 0;
	}
	#ge(e) {
		if (!e) return null;
		let t = null, n = null;
		for (let r = e.node; r; r = r.parent) t ??= r.highlight, n ??= r.highlightWhole ? r : null;
		if (t ??= this.#O, !t && e === this.#j && (t = ui), !t) return null;
		let r = e.node;
		if (n) {
			let e = /* @__PURE__ */ new Set();
			return n.traverse((t) => {
				e.add(t);
			}), {
				node: r,
				index: null,
				nodes: e,
				color: t,
				amount: li
			};
		}
		return {
			node: r,
			index: e.instance ?? (r.drawMode === "points" ? e.face : null),
			color: t,
			amount: li
		};
	}
	#_e(e) {
		let t = e.labels, n = this.height / 2, r = t.filter((e) => e.style.occlude && e.visible && !(e.style.minScale && e.scale * n < e.style.minScale));
		if (!r.length) return;
		let i = Yn.solids([...e.opaque, ...e.transparent]), a = new Yn();
		for (let e of r) {
			a.setFromCamera(e.ndc, this.camera);
			let t = e.position.distanceTo(a.ray.origin);
			e.occluded = a.blocked(i, t * .995, e.node, e.index);
		}
	}
	#ve() {
		let e = this.canvas, t = (t) => {
			let n = e.getBoundingClientRect();
			return {
				x: t.clientX - n.left,
				y: t.clientY - n.top,
				clientX: t.clientX,
				clientY: t.clientY,
				event: t
			};
		}, n = (e) => {
			this.#j && this.#A?.clear(), this.#F = t(e);
			let n = this.#V;
			n && n.id === e.pointerId && !n.moved && Math.hypot(this.#F.x - n.x, this.#F.y - n.y) >= 4 && (n.moved = !0), this.#z ? this.#ye(e, this.#F) : this.#B?.move(e), this.#R = e.buttons !== 0, this.#R ? this.#w?.hide() : this.#w?.move(e.clientX, e.clientY), this.#de() && (this.#I = !0, this.#le());
		}, r = () => {
			this.#F = null, this.#I = !0, this.#le();
		}, i = (e) => {
			this.#z ? this.#be(e) : this.#B?.up(e), this.#R = !1, this.#I = !0, this.#le();
		}, a = (n) => {
			if (this.#z?.id === n.pointerId) return;
			this.#U = null, this.#z = null;
			let r = t(n);
			this.#V = {
				id: n.pointerId,
				x: r.x,
				y: r.y,
				moved: !1
			};
			let i = this.lastFrame?.draggable && (n.pointerType !== "mouse" || n.button === 0) ? this.pick(n) : null, a = i && bi(i.node, "onDrag");
			if (!i || !a) {
				this.#B?.down(n);
				return;
			}
			try {
				e.setPointerCapture(n.pointerId);
			} catch {}
			let o = t(n), s = i.point.clone(), c = {
				phase: "start",
				hit: i,
				node: a,
				ray: this.rayAt(o.x, o.y),
				plane: {
					normal: new z(0, 1, 0),
					point: s.clone()
				},
				start: s,
				point: s.clone(),
				delta: new z(),
				event: n
			};
			this.#z = {
				drag: c,
				id: n.pointerId,
				x: o.x,
				y: o.y,
				press: c.ray,
				started: !1
			};
		}, o = (e) => {
			if (this.#V?.moved) {
				this.#V = null;
				return;
			}
			if (!this.#C.click.size && !this.lastFrame?.interactive) return;
			let t = this.pick(e);
			if (t) for (let e of Ei(t.node, "click")) e(t);
			for (let n of this.#C.click) n(t, e);
		};
		e.addEventListener("pointerdown", a), e.addEventListener("pointermove", n), e.addEventListener("pointerleave", r), e.addEventListener("pointerup", i), e.addEventListener("pointercancel", i), e.addEventListener("click", o);
		let s = () => {
			this.#U = null;
		};
		if (e.addEventListener("wheel", s, { passive: !0 }), this.#b.push(() => {
			e.removeEventListener("wheel", s), e.removeEventListener("pointerdown", a), e.removeEventListener("pointermove", n), e.removeEventListener("pointerleave", r), e.removeEventListener("pointerup", i), e.removeEventListener("pointercancel", i), e.removeEventListener("click", o);
		}), typeof ResizeObserver < "u") {
			let t = new ResizeObserver(() => {
				this.resize(), this.render();
			});
			t.observe(e), this.#b.push(() => t.disconnect());
		}
		let c = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
		if (c) {
			let e = () => {
				this.#P = c.matches, this.invalidate();
			};
			this.#P = c.matches, c.addEventListener?.("change", e), this.#b.push(() => c.removeEventListener?.("change", e));
		}
		if (typeof IntersectionObserver < "u") {
			let t = new IntersectionObserver(([e]) => {
				this.#l = e.isIntersecting, this.#l && this.invalidate();
			});
			t.observe(e), this.#b.push(() => t.disconnect());
		}
	}
	#ye(e, t) {
		let n = this.#z;
		if (!n || e.pointerId !== n.id) return;
		let { drag: r } = n;
		if (r.event = e, r.ray = this.rayAt(t.x, t.y), !n.started) {
			if (Math.hypot(t.x - n.x, t.y - n.y) < 4) return;
			n.started = !0, this.canvas.style.cursor = "grabbing", r.phase = "start";
			let e = r.plane;
			if (r.node.onDrag?.(r), r.plane !== e || !r.plane.point.equals(e.point) || !r.plane.normal.equals(e.normal)) {
				r.plane = {
					normal: z.fromInput(r.plane.normal, "Drag").normalize(),
					point: z.fromInput(r.plane.point, "Drag")
				};
				let e = n.press.intersectPlane(r.plane.normal, r.plane.point);
				e !== null && r.start.copy(n.press.at(e));
			}
		}
		r.phase = "move";
		let i = r.ray.intersectPlane(r.plane.normal, r.plane.point);
		i === null ? r.point = null : (r.point = r.ray.at(i), r.delta.copy(r.point).sub(r.start)), r.node.onDrag?.(r), this.invalidate();
	}
	#be(e) {
		let t = this.#z;
		if (t && e.pointerId === t.id) {
			this.#z = null;
			try {
				this.canvas.releasePointerCapture(e.pointerId);
			} catch {}
			t.started && (t.drag.phase = "end", t.drag.event = e, t.drag.node.onDrag?.(t.drag), this.canvas.style.cursor = "", this.invalidate());
		}
	}
	#xe(e) {
		this.#q || (this.#q = !0, console.info("phoria2: the scene has no lights, so the View is lighting it (autoLight: false turns this off)"));
		let t = this.#G, n = this.#K;
		e.lights.push({
			kind: "hemisphere",
			node: t,
			color: t.sky,
			ground: t.ground,
			intensity: t.intensity
		}, {
			kind: "directional",
			node: n,
			color: n.color,
			intensity: n.intensity,
			direction: n.worldDirection
		});
	}
};
function hi(e) {
	return [
		...e.position,
		...e.target ?? [],
		e.fov ?? e.height
	];
}
var gi = (e, t) => !!t && e.length === t.length && e.every((e, n) => e === t[n]);
function _i(e) {
	if (e.isEmpty()) return [];
	if (e.min.equals(e.max)) return [e.min.toArray()];
	let t = [];
	for (let n = 0; n < 8; n++) t.push([
		n & 1 ? e.max[0] : e.min[0],
		n & 2 ? e.max[1] : e.min[1],
		n & 4 ? e.max[2] : e.min[2]
	]);
	return t;
}
var vi = 4e3;
function yi(e, t) {
	e.updateWorld();
	let n = [];
	return e.eachShownTo(t, (e) => {
		let t = e;
		if ("instanceMatrices" in t && t.count <= vi) t.eachInstanceBox((e, t, r, i, a, o) => {
			n.push(..._i(new V([
				e,
				t,
				r
			], [
				i,
				a,
				o
			])));
		});
		else if ((t.drawMode === "lines" || t.drawMode === "points") && t.geometry.vertexCount <= vi) {
			let e = t.geometry, r = e.positions, i = t.worldMatrix, a = e.indices ? e.vertexCount : e.drawnVertices;
			for (let e = 0; e < a; e++) {
				let t = r[e * 3], a = r[e * 3 + 1], o = r[e * 3 + 2];
				n.push([
					i[0] * t + i[4] * a + i[8] * o + i[12],
					i[1] * t + i[5] * a + i[9] * o + i[13],
					i[2] * t + i[6] * a + i[10] * o + i[14]
				]);
			}
		} else n.push(..._i(e.expandBounds(new V())));
	}), n;
}
function bi(e, t) {
	for (let n = e; n; n = n.parent) if (n[t]) return n;
	return null;
}
function xi(e) {
	return {
		position: e.position.clone(),
		target: (e.target ?? new z()).clone(),
		height: e.height
	};
}
function Si(e, t) {
	e.position.copy(t.position), Ci(e, t.target), t.height !== void 0 && (e.height = t.height);
}
function Ci(e, t) {
	e.target ? e.target.copy(t) : e.target = t.clone();
}
function wi(e, t, n) {
	let r = Math.max(-1, Math.min(1, e.dot(t)));
	if (r > .9999) return e.clone().lerp(t, n).normalize();
	if (r < -.9999) {
		let r = Math.abs(e[1]) < .9 ? new z(0, 1, 0) : new z(1, 0, 0), i = e.clone().cross(r).normalize();
		return n < .5 ? wi(e, i, n * 2) : wi(i, t, n * 2 - 1);
	}
	let i = Math.acos(r), a = Math.sin(i);
	return e.clone().multiplyScalar(Math.sin((1 - n) * i) / a).add(t.clone().multiplyScalar(Math.sin(n * i) / a));
}
function Ti(e, t) {
	return e.index === null && !e.node.handlersFor(t).length ? [] : Ei(e.node, t);
}
function Ei(e, t) {
	let n = [];
	for (let r = e; r; r = r.parent) n.push(...r.handlersFor(t));
	return n;
}
function Di(e) {
	if (e === void 0) {
		let e = document.createElement("canvas");
		return Object.assign(e.style, {
			position: "fixed",
			inset: "0",
			width: "100vw",
			height: "100vh",
			display: "block"
		}), document.body.append(e), e;
	}
	if (typeof e == "string") {
		let t = document.querySelector(e);
		return t || E("View", `canvas '${e}' not found`), t instanceof HTMLCanvasElement || E("View", `'${e}' is a <${t.tagName.toLowerCase()}>, not a <canvas>`), t;
	}
	return e instanceof HTMLCanvasElement || E("View", `'canvas' must be a <canvas> element or a selector, got ${j(e)}`), e;
}
// src/geometry/triangulate.js
function Oi(e) {
	let t = 0;
	for (let n = 0, r = e.length - 1; n < e.length; r = n++) t += (e[r][0] - e[n][0]) * (e[r][1] + e[n][1]);
	return t;
}
function ki(e, t = []) {
	let n = [...e], r = e.map((e, t) => t);
	Oi(e) < 0 && r.reverse();
	let i = t.map((e) => {
		let t = n.length;
		n.push(...e);
		let r = e.map((e, n) => t + n);
		return Oi(e) > 0 && r.reverse(), r;
	}).sort((e, t) => Ai(n, t) - Ai(n, e));
	for (let e of i) r = ji(n, r, e, i);
	return Pi(n, r);
}
var Ai = (e, t) => Math.max(...t.map((t) => e[t][0]));
function ji(e, t, n, r) {
	let i = 0;
	n.forEach((t, r) => {
		e[t][0] > e[n[i]][0] && (i = r);
	});
	let a = e[n[i]], o = [];
	for (let n of [t, ...r]) n.forEach((t, r) => o.push([e[t], e[n[(r + 1) % n.length]]]));
	let s = -1, c = Infinity;
	t.forEach((t, n) => {
		let r = e[t], i = ((r[0] - a[0]) ** 2 + (r[1] - a[1]) ** 2) * (r[0] >= a[0] ? 1 : 4);
		i >= c || o.some(([e, t]) => Mi(a, r, e, t)) || (s = n, c = i);
	}), s < 0 && (s = 0);
	let l = [...n.slice(i), ...n.slice(0, i)];
	return [
		...t.slice(0, s + 1),
		...l,
		n[i],
		t[s],
		...t.slice(s + 1)
	];
}
function Mi(e, t, n, r) {
	if (Ni(e, n) || Ni(e, r) || Ni(t, n) || Ni(t, r)) return !1;
	let i = Q(n, r, e), a = Q(n, r, t), o = Q(e, t, n), s = Q(e, t, r);
	return i * a < 0 && o * s < 0;
}
var Ni = (e, t) => e[0] === t[0] && e[1] === t[1], Q = (e, t, n) => (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]);
function Pi(e, t) {
	let n = [...t], r = [];
	for (; n.length > 3;) {
		let t = -1;
		for (let r = 0; r < n.length && t < 0; r++) Ii(e, n, r) && (t = r);
		if (t < 0) for (let r = 0; r < n.length && t < 0; r++) Fi(e, n, r) && (t = r);
		t < 0 && (t = 0);
		let i = n.length;
		r.push(n[(t + i - 1) % i], n[t], n[(t + 1) % i]), n.splice(t, 1);
	}
	return n.length === 3 && r.push(...n), r;
}
function Fi(e, t, n) {
	let r = t.length;
	return Q(e[t[(n + r - 1) % r]], e[t[n]], e[t[(n + 1) % r]]) > 0;
}
function Ii(e, t, n) {
	if (!Fi(e, t, n)) return !1;
	let r = t.length, i = e[t[(n + r - 1) % r]], a = e[t[n]], o = e[t[(n + 1) % r]];
	for (let n of t) {
		let t = e[n];
		if (!(Ni(t, i) || Ni(t, a) || Ni(t, o)) && Q(i, a, t) >= 0 && Q(a, o, t) >= 0 && Q(o, i, t) >= 0) return !1;
	}
	return !0;
}
// src/geometry/generators.js
var Li = /* @__PURE__ */ t({
	GENERATOR_OPTIONS: () => $,
	axes: () => ea,
	box: () => Bi,
	cylinder: () => Wi,
	edges: () => $i,
	extrude: () => Yi,
	grid: () => ta,
	icosphere: () => qi,
	lathe: () => Ji,
	plane: () => Ui,
	sphere: () => Hi,
	torus: () => Ki
}), Ri = Math.PI * 2, $ = {
	box: [
		"size",
		"width",
		"height",
		"depth",
		"segments"
	],
	sphere: [
		"radius",
		"segments",
		"rings"
	],
	plane: [
		"size",
		"width",
		"depth",
		"segments"
	],
	cylinder: [
		"radius",
		"radiusTop",
		"height",
		"segments",
		"caps",
		"axis"
	],
	torus: [
		"radius",
		"tube",
		"segments",
		"tubeSegments"
	],
	icosphere: ["radius", "detail"],
	lathe: [
		"points",
		"segments",
		"axis"
	],
	extrude: [
		"shape",
		"holes",
		"depth",
		"axis"
	],
	axes: ["size"],
	grid: ["size", "divisions"]
}, zi = "has one 'segments' option, used for every face";
function Bi(e) {
	let t = "box()", n = I(t, e, $.box, (e) => ({ size: e }), {
		widthSegments: `box() ${zi}`,
		heightSegments: `box() ${zi}`,
		depthSegments: `box() ${zi}`
	}), r = L(t, "size", n.size, 1), i = L(t, "width", n.width, r), a = L(t, "height", n.height, r), o = L(t, "depth", n.depth, r), s = R(t, "segments", n.segments, 1), c = [
		i,
		a,
		o
	], l = new na();
	for (let [e, t, n] of Vi) {
		let r = l.count;
		for (let r = 0; r <= s; r++) {
			let i = r / s;
			for (let r = 0; r <= s; r++) {
				let a = r / s, o = [
					0,
					1,
					2
				].map((r) => (e[r] * .5 + t[r] * (a - .5) + n[r] * (.5 - i)) * c[r]);
				l.vertex(o[0], o[1], o[2], e[0], e[1], e[2], a, i);
			}
		}
		l.grid(r, s, s);
	}
	return l.build({
		type: "box",
		width: i,
		height: a,
		depth: o,
		segments: s
	});
}
var Vi = [
	[
		[
			1,
			0,
			0
		],
		[
			0,
			0,
			-1
		],
		[
			0,
			1,
			0
		]
	],
	[
		[
			-1,
			0,
			0
		],
		[
			0,
			0,
			1
		],
		[
			0,
			1,
			0
		]
	],
	[
		[
			0,
			1,
			0
		],
		[
			1,
			0,
			0
		],
		[
			0,
			0,
			-1
		]
	],
	[
		[
			0,
			-1,
			0
		],
		[
			1,
			0,
			0
		],
		[
			0,
			0,
			1
		]
	],
	[
		[
			0,
			0,
			1
		],
		[
			1,
			0,
			0
		],
		[
			0,
			1,
			0
		]
	],
	[
		[
			0,
			0,
			-1
		],
		[
			-1,
			0,
			0
		],
		[
			0,
			1,
			0
		]
	]
];
function Hi(e) {
	let t = "sphere()", n = I(t, e, $.sphere, (e) => ({ radius: e }), {
		widthSegments: "sphere(): use 'segments' for the divisions around the sphere",
		heightSegments: "sphere(): use 'rings' for the divisions from pole to pole"
	}), r = L(t, "radius", n.radius, 1), i = R(t, "segments", n.segments, 32, 3), a = R(t, "rings", n.rings, 16, 2), o = new na();
	for (let e = 0; e <= a; e++) {
		let t = e / a, n = e === 0 || e === a, s = n ? 0 : Math.sin(t * Math.PI), c = e === 0 ? 1 : e === a ? -1 : Math.cos(t * Math.PI);
		for (let e = 0; e <= i; e++) {
			let a = n && e < i ? (e + .5) / i : e / i, l = e % i / i * Ri, u = -Math.cos(l) * s, d = c, f = Math.sin(l) * s;
			o.vertex(u * r, d * r, f * r, u, d, f, a, t);
		}
	}
	return o.grid(0, i, a, {
		pinchTop: !0,
		pinchBottom: !0
	}), o.build({
		type: "sphere",
		radius: r,
		segments: i,
		rings: a
	});
}
function Ui(e) {
	let t = "plane()", n = I(t, e, $.plane, (e) => ({ size: e }), {
		height: "plane() lies in the x-z plane - use 'depth' rather than 'height'",
		widthSegments: `plane() ${zi}`,
		heightSegments: `plane() ${zi}`
	}), r = L(t, "size", n.size, 1), i = L(t, "width", n.width, r), a = L(t, "depth", n.depth, r), o = R(t, "segments", n.segments, 1), s = new na();
	for (let e = 0; e <= o; e++) {
		let t = e / o;
		for (let e = 0; e <= o; e++) {
			let n = e / o;
			s.vertex((n - .5) * i, 0, (t - .5) * a, 0, 1, 0, n, t);
		}
	}
	return s.grid(0, o, o), s.build({
		type: "plane",
		width: i,
		depth: a,
		segments: o
	});
}
function Wi(e) {
	let t = "cylinder()", n = I(t, e, $.cylinder, null, {
		radiusBottom: "cylinder(): use 'radius' for the bottom radius",
		radialSegments: "cylinder(): use 'segments' for the divisions around the cylinder",
		openEnded: "cylinder(): use 'caps: false' for an open tube"
	}), r = L(t, "radius", n.radius, .5, !0), i = L(t, "radiusTop", n.radiusTop, r, !0);
	r === 0 && i === 0 && E(t, "'radius' and 'radiusTop' can't both be 0");
	let a = L(t, "height", n.height, 1), o = R(t, "segments", n.segments, 32, 3), s = n.caps ?? !0;
	typeof s != "boolean" && E(t, `'caps' must be true or false, got ${j(s)}`);
	let c = ia(t, n.axis, "y"), l = new na(), u = r - i, d = Math.hypot(a, u), f = a / d, p = u / d;
	for (let e = 0; e <= 1; e++) {
		let t = e === 0 ? i : r, n = e === 0 ? a / 2 : -a / 2;
		for (let r = 0; r <= o; r++) {
			let i = t === 0 && r < o ? (r + .5) / o : r / o, a = t === 0 ? i * Ri : r % o / o * Ri, s = Math.sin(a), c = Math.cos(a);
			l.vertex(t * s, n, t * c, f * s, p, f * c, i, e);
		}
	}
	return l.grid(0, o, 1, {
		pinchTop: i === 0,
		pinchBottom: r === 0
	}), s && (i > 0 && Gi(l, i, a / 2, 1, o), r > 0 && Gi(l, r, -a / 2, -1, o)), l.turn("y", c), l.build({
		type: "cylinder",
		radius: r,
		radiusTop: i,
		height: a,
		segments: o,
		caps: s,
		...c !== "y" && { axis: c }
	});
}
function Gi(e, t, n, r, i) {
	let a = e.vertex(0, n, 0, 0, r, 0, .5, .5);
	for (let a = 0; a < i; a++) {
		let o = a / i * Ri, s = Math.sin(o), c = Math.cos(o);
		e.vertex(t * s, n, t * c, 0, r, 0, .5 + s / 2, .5 + r * c / 2);
	}
	for (let t = 0; t < i; t++) {
		let n = a + 1 + t, o = a + 1 + (t + 1) % i;
		r > 0 ? e.indices.push(a, n, o) : e.indices.push(a, o, n);
	}
}
function Ki(e) {
	let t = "torus()", n = I(t, e, $.torus, null, {
		tubularSegments: "torus(): use 'segments' for the divisions around the ring",
		radialSegments: "torus(): use 'tubeSegments' for the divisions around the tube"
	}), r = L(t, "radius", n.radius, 1), i = L(t, "tube", n.tube, .4), a = R(t, "segments", n.segments, 48, 3), o = R(t, "tubeSegments", n.tubeSegments, 16, 3), s = new na();
	for (let e = 0; e <= o; e++) {
		let t = e / o, n = -(e % o / o) * Ri, c = Math.cos(n), l = Math.sin(n);
		for (let e = 0; e <= a; e++) {
			let n = e / a, o = e % a / a * Ri, u = Math.sin(o), d = Math.cos(o), f = c * u, p = l, m = c * d;
			s.vertex(r * u + i * f, i * p, r * d + i * m, f, p, m, n, t);
		}
	}
	return s.grid(0, a, o), s.build({
		type: "torus",
		radius: r,
		tube: i,
		segments: a,
		tubeSegments: o
	});
}
function qi(e) {
	let t = "icosphere()", n = I(t, e, $.icosphere, (e) => ({ radius: e }), { subdivisions: "icosphere(): use 'detail' (0-6) for the subdivision level" }), r = L(t, "radius", n.radius, 1), i = R(t, "detail", n.detail, 2, 0, 6), a = (1 + Math.sqrt(5)) / 2, o = [], s = (e, t, n) => {
		let r = Math.hypot(e, t, n);
		return o.push(e / r, t / r, n / r), o.length / 3 - 1;
	};
	for (let [e, t, n] of [
		[
			-1,
			a,
			0
		],
		[
			1,
			a,
			0
		],
		[
			-1,
			-a,
			0
		],
		[
			1,
			-a,
			0
		],
		[
			0,
			-1,
			a
		],
		[
			0,
			1,
			a
		],
		[
			0,
			-1,
			-a
		],
		[
			0,
			1,
			-a
		],
		[
			a,
			0,
			-1
		],
		[
			a,
			0,
			1
		],
		[
			-a,
			0,
			-1
		],
		[
			-a,
			0,
			1
		]
	]) s(e, t, n);
	let c = [
		0,
		11,
		5,
		0,
		5,
		1,
		0,
		1,
		7,
		0,
		7,
		10,
		0,
		10,
		11,
		1,
		5,
		9,
		5,
		11,
		4,
		11,
		10,
		2,
		10,
		7,
		6,
		7,
		1,
		8,
		3,
		9,
		4,
		3,
		4,
		2,
		3,
		2,
		6,
		3,
		6,
		8,
		3,
		8,
		9,
		4,
		9,
		5,
		2,
		4,
		11,
		6,
		2,
		10,
		8,
		6,
		7,
		9,
		8,
		1
	];
	for (let e = 0; e < i; e++) {
		let e = /* @__PURE__ */ new Map(), t = (t, n) => {
			let r = t < n ? t * 65536 + n : n * 65536 + t, i = e.get(r);
			return i === void 0 && (i = s(o[t * 3] + o[n * 3], o[t * 3 + 1] + o[n * 3 + 1], o[t * 3 + 2] + o[n * 3 + 2]), e.set(r, i)), i;
		}, n = [];
		for (let e = 0; e < c.length; e += 3) {
			let r = c[e], i = c[e + 1], a = c[e + 2], o = t(r, i), s = t(i, a), l = t(a, r);
			n.push(r, o, l, o, i, s, l, s, a, o, s, l);
		}
		c = n;
	}
	let l = new U({
		positions: o.map((e) => e * r),
		normals: o,
		indices: c
	});
	return l.source = {
		type: "icosphere",
		radius: r,
		detail: i
	}, l;
}
function Ji(e) {
	let t = "lathe()", n = I(t, e, $.lathe, null, {
		divisions: "lathe(): use 'segments' for the divisions around the axis",
		phiSegments: "lathe(): use 'segments' for the divisions around the axis",
		profile: "lathe(): use 'points' for the profile, as [radius, y] pairs"
	}), r = Qi(t, "points", n.points, 2).map(([e, t]) => [Math.abs(e) < 1e-9 ? 0 : e, t]);
	r.some(([e]) => e < 0) && E(t, "'points' are [radius, y] pairs - a radius can't be below 0");
	let i = R(t, "segments", n.segments, 32, 3), a = ia(t, n.axis, "y"), o = [];
	for (let e = 0; e + 1 < r.length; e++) {
		let [t, n] = r[e], [i, a] = r[e + 1], s = Math.hypot(i - t, a - n);
		s !== 0 && o.push({
			from: r[e],
			to: r[e + 1],
			len: s,
			normal: [(a - n) / s, -(i - t) / s]
		});
	}
	o.length || E(t, "'points' need at least two different points");
	let s = o.reduce((e, t) => e + t.len, 0), c = new na(), l = 0;
	return o.forEach((e, t) => {
		let n = Zi(o[t - 1]?.normal, e.normal), r = Zi(o[t + 1]?.normal, e.normal), a = c.count;
		for (let [[t, a], [o, u], d] of [[
			e.to,
			r,
			1 - (l + e.len) / s
		], [
			e.from,
			n,
			1 - l / s
		]]) for (let e = 0; e <= i; e++) {
			let n = e % i / i * Ri, r = Math.sin(n), s = Math.cos(n);
			c.vertex(t * r, a, t * s, o * r, u, o * s, e / i, d);
		}
		c.grid(a, i, 1, {
			pinchTop: e.to[0] === 0,
			pinchBottom: e.from[0] === 0
		}), l += e.len;
	}), c.turn("y", a), c.build({
		type: "lathe",
		points: r.map((e) => [...e]),
		segments: i,
		...a !== "y" && { axis: a }
	});
}
function Yi(e) {
	let t = "extrude()", n = I(t, e, $.extrude, null, {
		amount: "extrude(): use 'depth'",
		points: "extrude(): use 'shape' for the outline, as [x, y] pairs",
		outline: "extrude(): use 'shape' for the outline, as [x, y] pairs",
		bevelEnabled: "extrude() has no bevel - round the shape's corners instead"
	}), r = aa(Qi(t, "shape", n.shape, 3));
	n.holes !== void 0 && !Array.isArray(n.holes) && E(t, `'holes' must be a list of outlines, got ${j(n.holes)}`), typeof n.holes?.[0]?.[0] == "number" && E(t, "'holes' is a list of outlines - for one hole, holes: [outline]");
	let i = (n.holes ?? []).map((e, n) => aa(Qi(t, `holes[${n}]`, e, 3))), a = L(t, "depth", n.depth, 1), o = ia(t, n.axis, "z"), s = a / 2, c = Oi(r) < 0 ? [...r].reverse() : r, l = i.map((e) => Oi(e) > 0 ? [...e].reverse() : e), u = [c, ...l].flat(), d = Infinity, f = -Infinity, p = Infinity, m = -Infinity;
	for (let [e, t] of u) d = Math.min(d, e), f = Math.max(f, e), p = Math.min(p, t), m = Math.max(m, t);
	let h = f - d || 1, g = m - p || 1, _ = new na(), v = ki(c, l);
	for (let [e, t] of [[s, 1], [-s, -1]]) {
		let n = _.count;
		for (let [n, r] of u) _.vertex(n, r, e, 0, 0, t, t > 0 ? (n - d) / h : (f - n) / h, (m - r) / g);
		for (let e = 0; e < v.length; e += 3) t > 0 ? _.indices.push(n + v[e], n + v[e + 1], n + v[e + 2]) : _.indices.push(n + v[e], n + v[e + 2], n + v[e + 1]);
	}
	for (let e of [c, ...l]) {
		let t = e.length, n = e.map(([n, r], i) => Math.hypot(e[(i + 1) % t][0] - n, e[(i + 1) % t][1] - r)), r = e.map(([r, i], a) => {
			let [o, s] = e[(a + 1) % t], c = n[a] || 1;
			return [(s - i) / c, -(o - r) / c];
		}), i = n.reduce((e, t) => e + t, 0) || 1, a = 0;
		for (let o = 0; o < t; o++) {
			let c = r[o], [l, u] = [Zi(r[(o + t - 1) % t], c), Zi(r[(o + 1) % t], c)], [d, f] = e[o], [p, m] = e[(o + 1) % t], h = a / i, g = (a + n[o]) / i, v = _.vertex(d, f, s, l[0], l[1], 0, h, 0), y = _.vertex(d, f, -s, l[0], l[1], 0, h, 1), b = _.vertex(p, m, -s, u[0], u[1], 0, g, 1), x = _.vertex(p, m, s, u[0], u[1], 0, g, 0);
			_.indices.push(v, y, b, v, b, x), a += n[o];
		}
	}
	return _.turn("z", o), _.build({
		type: "extrude",
		shape: r.map((e) => [...e]),
		holes: i.map((e) => e.map((e) => [...e])),
		depth: a,
		...o !== "z" && { axis: o }
	});
}
var Xi = Math.cos(Math.PI / 6);
function Zi(e, t) {
	if (!e || e[0] * t[0] + e[1] * t[1] < Xi) return t;
	let n = e[0] + t[0], r = e[1] + t[1], i = Math.hypot(n, r) || 1;
	return [n / i, r / i];
}
function Qi(e, t, n, r) {
	Array.isArray(n) || E(e, `'${t}' must be a list of [x, y] pairs, got ${j(n)}`);
	let i = n;
	return i.length < r && E(e, `'${t}' needs at least ${r} points, got ${i.length}`), i.map((n, r) => {
		(!n || typeof n != "object" || typeof n.length != "number" || n.length < 2) && E(e, `'${t}' must be a list of [x, y] pairs - point ${r} is ${j(n)}`);
		let i = n[0], a = n[1];
		return typeof i == "number" && typeof a == "number" && Number.isFinite(i) && Number.isFinite(a) || E(e, `'${t}' point ${r} must be two finite numbers, got ${j(n)}`), [i, a];
	});
}
function $i(e, t = {}) {
	e instanceof U || E("edges()", `expected a Geometry, got ${j(e)}`);
	let { angle: n = 1 } = I("edges()", t, ["angle"], null);
	n >= 0 && n < 180 || E("edges()", `'angle' is in degrees, 0 to under 180, got ${j(n)}`);
	let r = Math.cos(n * Math.PI / 180), i = e.positions, a = e.indices, o = e.vertexCount, s = /* @__PURE__ */ new Map(), c = new Uint32Array(o);
	for (let e = 0; e < o; e++) {
		let t = `${i[e * 3]},${i[e * 3 + 1]},${i[e * 3 + 2]}`, n = s.get(t);
		n === void 0 && s.set(t, n = e), c[e] = n;
	}
	let l = /* @__PURE__ */ new Map(), u = a ? a.length : o;
	for (let e = 0; e + 2 < u; e += 3) {
		let t = c[a ? a[e] : e], n = c[a ? a[e + 1] : e + 1], s = c[a ? a[e + 2] : e + 2], u = i[n * 3] - i[t * 3], d = i[n * 3 + 1] - i[t * 3 + 1], f = i[n * 3 + 2] - i[t * 3 + 2], p = i[s * 3] - i[t * 3], m = i[s * 3 + 1] - i[t * 3 + 1], h = i[s * 3 + 2] - i[t * 3 + 2], g = d * h - f * m, _ = f * p - u * h, v = u * m - d * p, y = Math.hypot(g, _, v);
		if (y !== 0) {
			g /= y, _ /= y, v /= y;
			for (let [e, i] of [
				[t, n],
				[n, s],
				[s, t]
			]) {
				let t = Math.min(e, i), n = Math.max(e, i), a = t * o + n, s = l.get(a);
				s ? (s.faces++, s.nx * g + s.ny * _ + s.nz * v < r && (s.crease = !0)) : l.set(a, {
					a: t,
					b: n,
					nx: g,
					ny: _,
					nz: v,
					faces: 1,
					crease: !1
				});
			}
		}
	}
	let d = /* @__PURE__ */ new Map(), f = [], p = [], m = (e) => {
		let t = d.get(e);
		return t === void 0 && (d.set(e, t = f.length / 3), f.push(i[e * 3], i[e * 3 + 1], i[e * 3 + 2])), t;
	};
	for (let e of l.values()) (e.faces === 1 || e.crease) && p.push(m(e.a), m(e.b));
	return new U({
		positions: f,
		indices: p
	});
}
function ea(e) {
	let t = "axes()", n = L(t, "size", I(t, e, $.axes, (e) => ({ size: e })).size, 1), r = new U({
		positions: [
			0,
			0,
			0,
			n,
			0,
			0,
			0,
			0,
			0,
			0,
			n,
			0,
			0,
			0,
			0,
			0,
			0,
			n
		],
		colors: [
			1,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			1
		]
	});
	return r.source = {
		type: "axes",
		size: n
	}, r;
}
function ta(e) {
	let t = "grid()", n = I(t, e, $.grid, (e) => ({ size: e }), { segments: "grid() uses 'divisions' for the number of squares along each side" }), r = L(t, "size", n.size, 10), i = R(t, "divisions", n.divisions, 10), a = r / 2, o = [];
	for (let e = 0; e <= i; e++) {
		let t = -a + r * e / i;
		o.push(t, 0, -a, t, 0, a, -a, 0, t, a, 0, t);
	}
	let s = new U({ positions: o });
	return s.source = {
		type: "grid",
		size: r,
		divisions: i
	}, s;
}
var na = class {
	positions = [];
	normals = [];
	uvs = [];
	indices = [];
	get count() {
		return this.positions.length / 3;
	}
	vertex(e, t, n, r, i, a, o, s) {
		return this.positions.push(e, t, n), this.normals.push(r, i, a), this.uvs.push(o, s), this.count - 1;
	}
	grid(e, t, n, { pinchTop: r = !1, pinchBottom: i = !1 } = {}) {
		let a = t + 1;
		for (let o = 0; o < n; o++) for (let s = 0; s < t; s++) {
			let t = e + o * a + s, c = t + a, l = c + 1, u = t + 1;
			i && o === n - 1 || this.indices.push(t, c, l), r && o === 0 || this.indices.push(t, l, u);
		}
	}
	turn(e, t) {
		if (e === t) return;
		let n = ra[e][t];
		for (let e of [this.positions, this.normals]) for (let t = 0; t < e.length; t += 3) {
			let [r, i, a] = n(e[t], e[t + 1], e[t + 2]);
			e[t] = r, e[t + 1] = i, e[t + 2] = a;
		}
	}
	build(e) {
		let { positions: t, normals: n, uvs: r, indices: i } = this, a = new U({
			positions: t,
			normals: n,
			uvs: r,
			indices: i
		});
		return a.source = e, a;
	}
}, ra = {
	y: {
		x: (e, t, n) => [
			t,
			-e,
			n
		],
		z: (e, t, n) => [
			e,
			-n,
			t
		]
	},
	z: {
		x: (e, t, n) => [
			n,
			t,
			-e
		],
		y: (e, t, n) => [
			e,
			n,
			-t
		]
	}
};
function ia(e, t, n) {
	return t === void 0 ? n : P(e, "axis", t, [
		"x",
		"y",
		"z"
	]);
}
function aa(e) {
	let t = e.filter((t, n) => {
		let r = e[(n + e.length - 1) % e.length];
		return t[0] !== r[0] || t[1] !== r[1];
	});
	return t.length >= 3 ? t : e;
}
// src/geometry/outline.js
var oa = Math.PI * 2, sa = {
	circle: [
		"radius",
		"segments",
		"center"
	],
	rect: [
		"size",
		"width",
		"height",
		"radius",
		"segments",
		"center"
	],
	polygon: [
		"radius",
		"sides",
		"angle",
		"center"
	],
	arc: [
		"radius",
		"from",
		"to",
		"segments",
		"center"
	],
	gear: [
		"radius",
		"teeth",
		"depth",
		"center"
	]
}, ca = {
	r: "use 'radius'",
	x: "use center: [x, y]",
	y: "use center: [x, y]",
	centre: "use 'center'",
	startAngle: "use 'from' (radians)",
	endAngle: "use 'to' (radians)",
	cornerRadius: "use 'radius' for the corners' rounding",
	n: "use 'sides' (polygon) or 'segments'"
};
function la(e) {
	let t = "outline.circle()", n = ha(t, e, sa.circle, (e) => ({ radius: e })), r = L(t, "radius", n.radius, 1), i = R(t, "segments", n.segments, 32, 3), [a, o] = ga(t, "center", n.center);
	return Array.from({ length: i }, (e, t) => {
		let n = t / i * oa;
		return [a + Math.cos(n) * r, o + Math.sin(n) * r];
	});
}
function ua(e) {
	let t = "outline.rect()", n = ha(t, e, sa.rect, (e) => ({ size: e })), r = L(t, "size", n.size, 1), i = L(t, "width", n.width, r), a = L(t, "height", n.height, r), o = n.radius === void 0 ? 0 : M(t, "radius", n.radius);
	(o < 0 || o > Math.min(i, a) / 2) && E(t, `'radius' must be from 0 to half the shorter side (${Math.min(i, a) / 2}), got ${o}`);
	let s = R(t, "segments", n.segments, 8, 1), [c, l] = ga(t, "center", n.center), u = i / 2, d = a / 2;
	if (o === 0) return [
		[c - u, l - d],
		[c + u, l - d],
		[c + u, l + d],
		[c - u, l + d]
	];
	let f = [];
	for (let [e, t, n] of [
		[
			u - o,
			-d + o,
			-Math.PI / 2
		],
		[
			u - o,
			d - o,
			0
		],
		[
			-u + o,
			d - o,
			Math.PI / 2
		],
		[
			-u + o,
			-d + o,
			Math.PI
		]
	]) for (let r = 0; r <= s; r++) {
		let i = n + r / s * Math.PI / 2;
		f.push([c + e + Math.cos(i) * o, l + t + Math.sin(i) * o]);
	}
	return f;
}
function da(e) {
	let t = "outline.polygon()", n = ha(t, e, sa.polygon, (e) => ({ radius: e })), r = L(t, "radius", n.radius, 1), i = R(t, "sides", n.sides, 6, 3), a = n.angle === void 0 ? 0 : M(t, "angle", n.angle), [o, s] = ga(t, "center", n.center);
	return Array.from({ length: i }, (e, t) => {
		let n = a + t / i * oa;
		return [o + Math.cos(n) * r, s + Math.sin(n) * r];
	});
}
function fa(e) {
	let t = "outline.arc()", n = ha(t, e, sa.arc, null), r = L(t, "radius", n.radius, 1), i = n.from === void 0 ? 0 : M(t, "from", n.from), a = n.to === void 0 ? i + oa : M(t, "to", n.to);
	a === i && E(t, "'from' and 'to' are the same angle - there's no arc between them");
	let o = R(t, "segments", n.segments, Math.max(1, Math.ceil(Math.abs(a - i) / oa * 32)), 1), [s, c] = ga(t, "center", n.center);
	return Array.from({ length: o + 1 }, (e, t) => {
		let n = i + (a - i) * t / o;
		return [s + Math.cos(n) * r, c + Math.sin(n) * r];
	});
}
function pa(e) {
	let t = "outline.gear()", n = ha(t, e, sa.gear, (e) => ({ radius: e })), r = L(t, "radius", n.radius, 1), i = R(t, "teeth", n.teeth, 24, 3), a = L(t, "depth", n.depth, Math.min(r / 2, r * Math.PI / i));
	a >= r && E(t, `'depth' must be less than the radius (${r}), got ${a}`);
	let [o, s] = ga(t, "center", n.center), c = r - a, l = oa / i, u = [];
	for (let e = 0; e < i; e++) for (let [t, n] of [
		[0, c],
		[.12, r],
		[.38, r],
		[.5, c]
	]) {
		let r = (e + t) * l;
		u.push([o + Math.cos(r) * n, s + Math.sin(r) * n]);
	}
	return u;
}
var ma = {
	circle: la,
	rect: ua,
	polygon: da,
	arc: fa,
	gear: pa
}, ha = (e, t, n, r) => I(e, t, n, r, ca);
function ga(e, t, n) {
	if (n === void 0) return [0, 0];
	let r = n;
	return r && typeof r == "object" && typeof r[0] == "number" && typeof r[1] == "number" && Number.isFinite(r[0]) && Number.isFinite(r[1]) || E(e, `'${t}' must be [x, y], got ${j(n)}`), [r[0], r[1]];
}
// src/geometry/fromPolygons.js
var _a = "fromPolygons()";
function va(e) {
	A(_a, e, [
		"points",
		"polygons",
		"edges",
		"smooth"
	]);
	let { points: t, polygons: n } = e ?? {};
	Array.isArray(t) || E(_a, `'points' must be an array of { x, y, z } or [x, y, z], got ${j(t)}`), Array.isArray(n) || E(_a, `'polygons' must be an array of { vertices: [...] }, got ${j(n)}`);
	let r = t.map((e, t) => {
		let n = Array.isArray(e) ? e : e && typeof e == "object" ? [
			e.x,
			e.y,
			e.z
		] : null;
		return n && n.length === 3 && n.every(Number.isFinite) || E(_a, `point ${t} must be { x, y, z } or [x, y, z] numbers, got ${j(e)}`), n;
	});
	n.forEach((e, t) => {
		let n = e?.vertices;
		(!Array.isArray(n) || n.length < 3) && E(_a, `polygon ${t} needs 'vertices' with 3 or more point indices, got ${j(n)}`);
		for (let e of n) (!Number.isInteger(e) || e < 0 || e >= r.length) && E(_a, `polygon ${t} refers to point ${j(e)} but there are only ${r.length} points`);
		let i = e.uvs;
		i === void 0 || Array.isArray(i) && i.length === n.length * 2 && i.every(Number.isFinite) || E(_a, `polygon ${t} 'uvs' must be ${n.length * 2} numbers (a u, v pair per vertex), got ${j(i)}`);
	});
	let i = [];
	n.forEach(({ vertices: e }, t) => {
		for (let n = 1; n + 1 < e.length; n++) i.push([t, 0], [t, n], [t, n + 1]);
	});
	let a, o = n.some((e) => e.uvs);
	if (o) {
		let e = [], t = [];
		for (let [a, o] of i) {
			let { vertices: i, uvs: s } = n[a];
			e.push(...r[i[o]]), t.push(s ? s[o * 2] : 0, s ? s[o * 2 + 1] : 0);
		}
		a = new U({
			positions: e,
			uvs: t
		});
	} else a = new U({
		positions: r.flat(),
		indices: i.map(([e, t]) => n[e].vertices[t])
	});
	return a.computeNormals({ flat: !(e.smooth && !o) });
}
// src/geometry/Curve.js
var ya = ["closed", "tension"], ba = {
	loop: "use 'closed: true'",
	smooth: "the curve is always smooth - 'tension' (0-1) sets how tight"
}, xa = ["segments", "dash"], Sa = { dashed: "use 'dash: [on, off]' - lengths in the curve's units" }, Ca = [
	"radius",
	"segments",
	"sides"
], wa = {
	tubularSegments: "use 'segments'",
	radialSegments: "use 'sides'"
}, Ta = [
	"plane",
	"radius",
	"center",
	"tilt"
], Ea = 48, Da = class {
	#e;
	#t;
	#n;
	#r;
	constructor(e, t = {}) {
		(!Array.isArray(e) || e.length < 2) && E("curve()", `needs an array of two or more points, got ${j(e)}`), A("curve()", t, ya, ba), this.#e = e.map((e) => z.fromInput(e, "curve()")), this.#t = !!t.closed, this.#n = t.tension === void 0 ? 0 : M("curve()", "tension", t.tension);
		let n = this.#i() * Ea;
		this.#r = new Float64Array(n + 1);
		let r = this.#s(0);
		for (let e = 1; e <= n; e++) {
			let t = this.#s(e / n);
			this.#r[e] = this.#r[e - 1] + t.distanceTo(r), r = t;
		}
	}
	get length() {
		return this.#r[this.#r.length - 1];
	}
	get closed() {
		return this.#t;
	}
	at(e, t = new z()) {
		return this.#s(this.#o(e), t);
	}
	tangentAt(e, t = new z()) {
		let n = this.#o(e), r = 1e-4, i = this.#s(Math.max(0, n - r)), a = this.#s(Math.min(1, n + r));
		return t.copy(a.sub(i)).normalize();
	}
	points(e) {
		let t = R("curve.points()", "count", e ?? null, 2, 2), n = this.#t ? t : t - 1;
		return Array.from({ length: t }, (e, t) => this.at(t / n));
	}
	line(e = {}) {
		A("curve.line()", e, xa, Sa);
		let t = this.#a("curve.line()", e.segments), n = this.length / t, r = [], i = (e, t) => {
			let i = Math.max(1, Math.ceil((t - e) / n - 1e-9)), a = this.at(e / this.length);
			for (let n = 1; n <= i; n++) {
				let o = this.at((e + (t - e) * n / i) / this.length);
				r.push(a[0], a[1], a[2], o[0], o[1], o[2]), a = o;
			}
		};
		if (e.dash === void 0) i(0, this.length);
		else {
			let t = e.dash;
			Array.isArray(t) && t.length === 2 && t.every((e) => e > 0) || E("curve.line()", `'dash' is [on, off], two lengths above 0, got ${j(t)}`);
			for (let e = 0; e < this.length; e += t[0] + t[1]) i(e, Math.min(this.length, e + t[0]));
		}
		return new U({ positions: r });
	}
	tube(e = {}) {
		A("curve.tube()", e, Ca, wa);
		let t = e.radius === void 0 ? .1 : M("curve.tube()", "radius", e.radius), n = R("curve.tube()", "sides", e.sides, 8, 3), r = this.#a("curve.tube()", e.segments), i = this.#t ? r : r + 1, a = [], o = [], s = this.tangentAt(0), c = new z(...Math.abs(s[1]) < .9 ? [
			0,
			1,
			0
		] : [
			1,
			0,
			0
		]).cross(s).normalize();
		for (let e = 0; e < i; e++) {
			let i = e / r, o = this.tangentAt(i);
			c = o.clone().cross(c.clone().cross(o)).normalize(), s = o;
			let l = s.clone().cross(c), u = this.at(i);
			for (let e = 0; e < n; e++) {
				let r = e / n * Math.PI * 2, i = Math.cos(r) * t, o = Math.sin(r) * t;
				a.push(u[0] + c[0] * i + l[0] * o, u[1] + c[1] * i + l[1] * o, u[2] + c[2] * i + l[2] * o);
			}
		}
		for (let e = 0; e < r; e++) {
			let t = (e + 1) % i;
			for (let r = 0; r < n; r++) {
				let i = e * n + r, a = t * n + r, s = t * n + (r + 1) % n, c = e * n + (r + 1) % n;
				o.push(i, c, s, i, s, a);
			}
		}
		return new U({
			positions: a,
			indices: o
		});
	}
	#i() {
		return this.#t ? this.#e.length : this.#e.length - 1;
	}
	#a(e, t) {
		return t === void 0 ? Math.min(400, Math.max(8, Math.round(this.length * 20))) : R(e, "segments", t, 1);
	}
	#o(e) {
		let t = this.length, n = Math.min(1, Math.max(0, e)) * t, r = this.#r, i = 0, a = r.length - 1;
		for (; a - i > 1;) {
			let e = i + a >> 1;
			r[e] < n ? i = e : a = e;
		}
		let o = r[a] - r[i];
		return (i + (o > 0 ? (n - r[i]) / o : 0)) / (r.length - 1);
	}
	#s(e, t = new z()) {
		let n = this.#e, r = n.length, i = this.#i(), a = Math.min(1, Math.max(0, e)) * i, o = Math.min(i - 1, Math.floor(a)), s = a - o, c = (e) => this.#t ? n[(e % r + r) % r] : n[Math.min(r - 1, Math.max(0, e))], l = c(o - 1), u = c(o), d = c(o + 1), f = c(o + 2), p = Math.sqrt(u.distanceTo(l)), m = Math.sqrt(d.distanceTo(u)) || 1e-9, h = Math.sqrt(f.distanceTo(d)), g = 1 - this.#n, _ = s * s, v = _ * s, y = 2 * v - 3 * _ + 1, b = -2 * v + 3 * _, x = v - 2 * _ + s, S = v - _;
		for (let e = 0; e < 3; e++) {
			let n = (d[e] - u[e]) / m, r = p > 1e-9 ? (u[e] - l[e]) / p - (d[e] - l[e]) / (p + m) + n : n / 2, i = h > 1e-9 ? n - (f[e] - u[e]) / (m + h) + (f[e] - d[e]) / h : n / 2, a = g * r * m, o = g * i * m;
			t[e] = y * u[e] + b * d[e] + x * a + S * o;
		}
		return t;
	}
};
function Oa(e, t) {
	return new Da(e, t);
}
function ka(e = {}) {
	let t = e.plane === void 0 ? "xz" : P("ellipse()", "plane", e.plane, [
		"xz",
		"xy",
		"yz"
	]), [n, r] = [...t].map((e) => "xyz".indexOf(e)), i = (e) => `radius${"XYZ"[e]}`, a = i(3 - n - r);
	A("ellipse()", e, [
		...Ta,
		i(n),
		i(r)
	], { [a]: `an ellipse in '${t}' has '${i(n)}' and '${i(r)}' - set plane for another` });
	let o = e.radius === void 0 ? 1 : M("ellipse()", "radius", e.radius), s = (t) => e[i(t)] === void 0 ? o : M("ellipse()", i(t), e[i(t)]), c = s(n), l = s(r), u = z.fromInput(e.center ?? [
		0,
		0,
		0
	], "ellipse()"), d = e.tilt === void 0 ? 0 : M("ellipse()", "tilt", e.tilt), f = [
		0,
		0,
		0
	];
	f[n] = 1;
	let p = Ee(/* @__PURE__ */ new Float32Array(4), f, d);
	return new Da(Array.from({ length: 64 }, (e, t) => {
		let i = t / 64 * Math.PI * 2, a = new z();
		return a[n] = Math.cos(i) * c, a[r] = Math.sin(i) * l, a.applyQuaternion(p).add(u);
	}), { closed: !0 });
}
// src/registry.js
var Aa = /* @__PURE__ */ new Map();
function ja(e) {
	Aa.set(e.type, e);
}
function Ma() {
	return Aa;
}
// src/describe.js
var Na = [
	"box",
	"sphere",
	"plane",
	"cylinder",
	"torus",
	"icosphere",
	"lathe",
	"extrude",
	"axes",
	"grid"
], Pa = null, Fa = () => {
	Pa ??= new Map([
		K,
		ht,
		nr,
		Et,
		Mt,
		Nt,
		Pt,
		Ft,
		Sn,
		Cn,
		sr,
		cr,
		ur,
		dr,
		fr
	].map((e) => [e.type, e]));
	for (let [e, t] of Ma()) Pa.set(e, t);
	return Pa;
}, Ia = {
	Mesh: "mesh",
	Group: "group",
	Object3D: "node",
	Points: "points",
	LineSegments: "lines",
	Line: "lines",
	InstancedMesh: "instanced-mesh",
	PerspectiveCamera: "perspective-camera",
	OrthographicCamera: "orthographic-camera",
	AmbientLight: "ambient-light",
	HemisphereLight: "hemisphere-light",
	DirectionalLight: "directional-light",
	PointLight: "point-light",
	SpotLight: "spot-light",
	Scene: "scene",
	light: "directional-light",
	camera: "perspective-camera"
}, La = {
	chart: "import { chart } from 'phoria2/charts' first, which registers 'chart'",
	emitter: "'emitter' descriptions aren't supported yet - use new Emitter() from 'phoria2/particles'"
}, Ra = {
	cube: "box",
	ball: "sphere",
	globe: "sphere",
	quad: "plane",
	tube: "cylinder",
	ring: "torus",
	donut: "torus",
	BoxGeometry: "box",
	SphereGeometry: "sphere",
	PlaneGeometry: "plane",
	CylinderGeometry: "cylinder",
	TorusGeometry: "torus",
	IcosahedronGeometry: "icosphere",
	GridHelper: "grid",
	AxesHelper: "axes",
	LatheGeometry: "lathe",
	ExtrudeGeometry: "extrude",
	ShapeGeometry: "extrude"
};
function za(e) {
	if (/Material$/.test(e)) return "materials aren't nodes - give a mesh material: { color, roughness, metalness, ... }";
	let t = Ra[e];
	return t ? `geometry isn't a node - give a mesh geometry: { type: '${t}', ... }` : null;
}
function Ba(e) {
	if (e instanceof K) return e;
	(!e || typeof e != "object" || Array.isArray(e)) && E("create()", `expected a description such as { type: 'mesh', ... }, got ${j(e)}`);
	let { type: t, ...n } = e;
	typeof t != "string" && E("create()", `a description needs a 'type': one of ${[...Fa().keys()].join(", ")}`);
	let r = Fa().get(t);
	if (!r) {
		let e = Ia[t], n = za(t) ?? La[t];
		E("create()", `unknown type '${t}' - ${e ? `use '${e}'` : n ?? `expected one of ${[...Fa().keys()].join(", ")}${k(t, Fa().keys())}`}`);
	}
	return Array.isArray(n.children) && (n.children = n.children.map((e) => Ba(e))), n.geometry && !(n.geometry instanceof U) && typeof n.geometry == "object" && "type" in n.geometry && (n.geometry = Va(n.geometry, `create({ type: '${t}' })`)), new r(n);
}
function Va(e, t = "createGeometry()") {
	let { type: n, ...r } = e, i = Ra[n];
	i && E(t, `geometry type '${n}' - use '${i}'`), P(t, "geometry.type", n, Na);
	let a = Li[n];
	return a(Object.keys(r).length ? r : void 0);
}
// src/keyboard.js
var Ha = /* @__PURE__ */ t({ Keyboard: () => Ka }), Ua = ":where(.phoria-sr-only) { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden;\n  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }", Wa = 10, Ga = 0, Ka = class {
	#e;
	#t;
	#n;
	#r = null;
	#i;
	#a;
	#o;
	#s = "";
	#c = !0;
	#l = [];
	constructor(e, t, n) {
		if (this.#e = e, this.#t = t, this.#n = n, !document.getElementById("phoria-sr-style")) {
			let e = document.createElement("style");
			e.id = "phoria-sr-style", e.textContent = Ua, document.head.prepend(e);
		}
		let r = e.canvas, i = `phoria-keys-${++Ga}`;
		this.#i = document.createElement("div"), this.#i.className = "phoria-sr-only", this.#i.setAttribute("aria-live", "polite"), this.#i.setAttribute("aria-atomic", "true"), this.#a = document.createElement("div"), this.#a.className = "phoria-sr-only", this.#a.id = i, r.after(this.#i, this.#a), this.#o = [
			"tabindex",
			"role",
			"aria-roledescription",
			"aria-label",
			"aria-describedby"
		].map((e) => [e, r.getAttribute(e)]), r.hasAttribute("tabindex") || (r.tabIndex = 0), r.setAttribute("role", "application"), r.setAttribute("aria-roledescription", "3D view"), r.setAttribute("aria-describedby", i);
		let a = (e) => this.#d(e), o = () => this.clear(), s = () => this.#u();
		r.addEventListener("keydown", a), r.addEventListener("blur", o), r.addEventListener("focus", s), this.#l.push(() => {
			r.removeEventListener("keydown", a), r.removeEventListener("blur", o), r.removeEventListener("focus", s);
		}), this.#u();
	}
	setDescription(e) {
		this.#c = e === null, this.#s = e ?? "", this.#u();
	}
	#u() {
		let e = this.#p().length, t = this.#c ? $a(this.#e.scene, e) : this.#s;
		this.#e.canvas.setAttribute("aria-label", t), this.#a.textContent = e ? `Use the arrow keys to move between ${e === 1 ? "the one item" : `${e} items`}, Enter to select, Escape to leave.` : "Nothing here can be selected.";
	}
	clear() {
		this.#r && (this.#r = null, this.#t.focus(null));
	}
	#d(e) {
		if (e.altKey || e.ctrlKey || e.metaKey) return;
		let t = this.#p(), n = this.#r ? t.findIndex((e) => qa(e, this.#r)) : -1;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				n = n < 0 ? 0 : Math.min(t.length - 1, n + 1);
				break;
			case "ArrowLeft":
			case "ArrowUp":
				n = n < 0 ? t.length - 1 : Math.max(0, n - 1);
				break;
			case "PageDown":
				n = Math.min(t.length - 1, Math.max(0, n) + Wa);
				break;
			case "PageUp":
				n = Math.max(0, n - Wa);
				break;
			case "Home":
				n = 0;
				break;
			case "End":
				n = t.length - 1;
				break;
			case "Enter":
			case " ":
				if (!this.#r || n < 0) return;
				e.preventDefault(), this.#t.press(Ya(t[n]));
				return;
			case "Escape":
				if (!this.#r) return;
				e.preventDefault(), this.clear(), this.#i.textContent = "";
				return;
			default: return;
		}
		if (e.preventDefault(), !t.length) {
			this.#i.textContent = "Nothing here can be selected.";
			return;
		}
		this.#r = t[n];
		let r = Ya(t[n]);
		this.#t.focus(r), this.#i.textContent = `${this.#n.label?.(r) ?? this.#f(r)}. ${n + 1} of ${t.length}`;
	}
	#f(e) {
		let t = Za(this.#t.tooltip(e));
		if (t) return t;
		let n = e.datum;
		if (n != null) {
			if (typeof n != "object") return String(n);
			let e = Object.entries(n).filter(([, e]) => typeof e != "object" || !e).slice(0, 4).map(([e, t]) => `${e}: ${Qa(t)}`);
			if (e.length) return e.join(", ");
		}
		for (let t = e.node; t; t = t.parent) if (t.name) return t.name;
		return "Item";
	}
	#p() {
		let e = [], t = [], n = this.#t.viewWide(), r = /* @__PURE__ */ new Set(), i = (a, o, s) => {
			if (!a.visible || a.pickable === !1) return;
			let c = !!(a.tooltip || a.onDrag || a.highlight || a.handlersFor("click").length || a.handlersFor("hover").length);
			if (o ||= c, s = a.highlightWhole ? a : s, a.isDrawable) {
				if (s) (o || n) && !r.has(s) && (r.add(s), e.push({
					node: a,
					index: null,
					whole: s
				}));
				else if ("instanceMatrices" in a) for (let t = 0; t < a.count; t++) !jt(a.instanceMatrices, t) && (o || n && a.datumAt(t) !== null) && e.push({
					node: a,
					index: t,
					whole: null
				});
				else if (a.drawMode === "points" && Array.isArray(a.data) || Ja(a)) for (let t = 0; t < a.data.length; t++) (o || n) && e.push({
					node: a,
					index: t,
					whole: null
				});
				else if (a.drawMode === "lines" && Array.isArray(a.data)) for (let e = 0; e < a.data.length; e++) (o || n) && t.push({
					node: a,
					index: e,
					whole: null
				});
				else (c || (o || n) && (a.name || a.datumAt(null) !== null)) && e.push({
					node: a,
					index: null,
					whole: null
				});
			}
			for (let e of a.children) i(e, o, s);
		};
		return i(this.#e.scene, !1, null), e.concat(t);
	}
	dispose() {
		for (let e of this.#l) e();
		let e = this.#e.canvas;
		for (let [t, n] of this.#o) n === null ? e.removeAttribute(t) : e.setAttribute(t, n);
		this.#i.remove(), this.#a.remove();
	}
}, qa = (e, t) => e.node === t.node && e.index === t.index, Ja = (e) => e.drawMode === "triangles" && !("instanceMatrices" in e) && Array.isArray(e.data) && e.data.length === e.geometry.vertexCount;
function Ya({ node: e, index: t, whole: n }) {
	let r = e, i = t !== null && r.drawMode === "points", a = t !== null && Ja(r), o = t !== null && r.drawMode === "lines", s;
	if (n) s = n.bounds.getCenter();
	else if (t !== null && "instanceMatrices" in r) {
		e.updateWorld();
		let n = r.geometry.bounds.getCenter();
		s = Xa(r.worldMatrix, Xa(r.instanceMatrices.subarray(t * 16, t * 16 + 16), n));
	} else if (i || a) {
		let n = r.geometry.positions;
		e.updateWorld(), s = Xa(r.worldMatrix, new z(n[t * 3], n[t * 3 + 1], n[t * 3 + 2]));
	} else if (o) {
		let n = r.geometry.positions, i = r.geometry.indices, a = i ? i[t * 2] : t * 2, o = i ? i[t * 2 + 1] : t * 2 + 1;
		e.updateWorld(), s = Xa(r.worldMatrix, new z((n[a * 3] + n[o * 3]) / 2, (n[a * 3 + 1] + n[o * 3 + 1]) / 2, (n[a * 3 + 2] + n[o * 3 + 2]) / 2));
	} else s = e.bounds.getCenter();
	return {
		node: e,
		point: s,
		distance: 0,
		normal: null,
		face: i || o ? t : null,
		instance: t !== null && !i && !a && !o ? t : null,
		uv: null,
		datum: a ? r.data[t] ?? null : r.datumAt?.(t) ?? null
	};
}
function Xa(e, t) {
	let [n, r, i] = t;
	return new z(e[0] * n + e[4] * r + e[8] * i + e[12], e[1] * n + e[5] * r + e[9] * i + e[13], e[2] * n + e[6] * r + e[10] * i + e[14]);
}
function Za(e) {
	if (e == null || e === !1 || e === "") return "";
	if (typeof e == "string" || typeof e == "number") return String(e).replace(/\s*\n\s*/g, ", ");
	if (globalThis.Node !== void 0 && e instanceof globalThis.Node) return (e.textContent ?? "").trim();
	if (typeof e == "object") {
		let t = e, n = t.rows ? (Array.isArray(t.rows) ? t.rows : Object.entries(t.rows)).map(([e, t]) => `${e}: ${Qa(t)}`) : [];
		return [t.title, ...n].filter((e) => e !== void 0 && e !== "").join(", ");
	}
	return "";
}
var Qa = (e) => typeof e == "number" ? e.toLocaleString() : String(e);
function $a(e, t) {
	let n = [];
	return e.traverse((t) => {
		let r = t.summary;
		t !== e && t.visible && typeof r == "function" && n.push(r.call(t));
	}), n.length || n.push(t ? `3D view of ${t === 1 ? "one item" : `${t} items`}` : "3D view"), n.join(". ");
}
export { Pt as $, Sr as A, E as At, Ln as B, vr as C, z as Ct, Dr as D, A as Dt, xr as E, P as Et, dr as F, a as Ft, Cn as G, Tn as H, fr as I, s as It, It as J, Sn as K, nr as L, ur as M, x as Mt, cr as N, r as Nt, Cr as O, j as Ot, or as P, o as Pt, Ft as Q, tr as R, mr as S, B as St, br as T, M as Tt, Dn as U, Mn as V, xn as W, Tt as X, Jt as Y, Mt as Z, Hi as _, H as _t, ka as a, Qe as at, ii as b, ae as bt, ea as c, U as ct, $i as d, De as dt, Et as et, Yi as f, Oe as ft, Ui as g, Se as gt, Ji as h, Te as ht, Oa as i, K as it, sr as j, F as jt, Tr as k, k as kt, Bi as l, Ne as lt, qi as m, Ae as mt, ja as n, ht as nt, va as o, W as ot, ta as p, Ee as pt, mn as q, Da as r, G as rt, ma as s, He as st, Ba as t, Nt as tt, Wi as u, je as ut, Ki as v, se as vt, yr as w, T as wt, Rr as x, V as xt, mi as y, ne as yt, Yn as z };

//# sourceMappingURL=core.js.map