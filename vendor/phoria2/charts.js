import { $ as e, At as t, Ft as n, Ot as r, Q as i, Tt as a, V as o, Z as s, _t as c, ct as l, et as u, kt as d, l as f, m as p, n as m, nt as h, rt as g, tt as _ } from "./core.js";
// src/charts/axes.js
var v = .97, y = .08, b = /* @__PURE__ */ new Float32Array(16);
function x(e, t, r) {
	let i = t.worldPosition;
	n(b, e.worldMatrix);
	let a = b[0] * i[0] + b[4] * i[1] + b[8] * i[2] + b[12], o = b[1] * i[0] + b[5] * i[1] + b[9] * i[2] + b[13] - r, s = b[2] * i[0] + b[6] * i[1] + b[10] * i[2] + b[14], c = Math.hypot(a, o, s) || 1;
	return [
		a / c,
		o / c,
		s / c
	];
}
function S({ box: t, axes: n, theme: r, overlap: a }) {
	let [o, s, c] = t, u = new h({
		name: "axes",
		pickable: !1
	}), d = (e) => x(u, e, s / 2), f = r === "light" ? "#c3c8d2" : "#3a3d47", p = (e) => {
		let t = e.channel?.axis?.ticks;
		if (!Array.isArray(t)) return e.scale.kind === "band" ? e.scale.ticks() : e.scale.ticks(t ?? 5);
		let [n, r] = e.scale.range, i = Math.min(n, r), a = Math.max(n, r);
		return t.filter((t) => e.scale(t) >= i - 1e-9 && e.scale(t) <= a + 1e-9);
	}, m = (e) => e && e.scale.kind !== "band" && e.channel?.axis !== !1 ? p(e) : [], g = m(n.x), _ = m(n.y), b = m(n.z), S = (t, r) => {
		let i = [], a = (e, t) => i.push(...e, ...t), p = (e) => r < 0 ? -e / 2 : e / 2;
		if (t === "y") {
			let e = r < 0 ? 0 : s;
			for (let t of g) {
				let r = n.x.scale(t);
				a([
					r,
					e,
					-c / 2
				], [
					r,
					e,
					c / 2
				]);
			}
			for (let t of b) {
				let r = n.z.scale(t);
				a([
					-o / 2,
					e,
					r
				], [
					o / 2,
					e,
					r
				]);
			}
			C(a, [
				-o / 2,
				e,
				-c / 2
			], [
				o / 2,
				e,
				-c / 2
			], [
				o / 2,
				e,
				c / 2
			], [
				-o / 2,
				e,
				c / 2
			]);
		} else if (t === "x") {
			let e = p(o);
			for (let t of _) {
				let r = n.y.scale(t);
				a([
					e,
					r,
					-c / 2
				], [
					e,
					r,
					c / 2
				]);
			}
			for (let t of b) {
				let r = n.z.scale(t);
				a([
					e,
					0,
					r
				], [
					e,
					s,
					r
				]);
			}
			C(a, [
				e,
				0,
				-c / 2
			], [
				e,
				s,
				-c / 2
			], [
				e,
				s,
				c / 2
			], [
				e,
				0,
				c / 2
			]);
		} else {
			let e = p(c);
			for (let t of _) {
				let r = n.y.scale(t);
				a([
					-o / 2,
					r,
					e
				], [
					o / 2,
					r,
					e
				]);
			}
			for (let t of g) {
				let r = n.x.scale(t);
				a([
					r,
					0,
					e
				], [
					r,
					s,
					e
				]);
			}
			C(a, [
				-o / 2,
				0,
				e
			], [
				o / 2,
				0,
				e
			], [
				o / 2,
				s,
				e
			], [
				-o / 2,
				s,
				e
			]);
		}
		let m = "xyz".indexOf(t);
		u.add(new e({
			geometry: new l({ positions: i }),
			material: { color: f },
			pickable: !1,
			showFrom: (e) => -r * d(e)[m] > y
		}));
	};
	for (let e of [
		"x",
		"y",
		"z"
	]) for (let t of [-1, 1]) S(e, t);
	let w = Math.max(o, s, c) * .04, T = (e) => `phoria-axis-${e} phoria-${r}`, E = (e, t, r) => {
		let o = n[e];
		if (!o || o.channel?.axis === !1) return;
		let s = "xyz".indexOf(e), c = p(o);
		for (let e of t) {
			let t = u.add(new h({ showFrom: (t) => {
				let n = d(t);
				return Math.abs(n[s]) < v && e.when(n);
			} }));
			for (let n of c) t.add(new i({
				text: o.scale.format(n),
				position: e.at(o.scale(n), w),
				place: r,
				className: T("tick"),
				priority: 1,
				overlap: a
			}));
			o.title && t.add(new i({
				text: o.title,
				position: e.title(w),
				place: r,
				className: T("title"),
				priority: 2,
				overlap: a
			}));
		}
	}, D = (e) => e[1] >= -.08, O = (e) => e >= -.1 ? 1 : -1;
	return E("x", [-1, 1].flatMap((e) => [0, s].map((t) => ({
		when: (n) => t === 0 === D(n) && O(n[2]) === e,
		at: (n, r) => [
			n,
			t,
			e * (c / 2 + r)
		],
		title: (n) => [
			0,
			t,
			e * (c / 2 + n * 3.5)
		]
	}))), "below"), E("z", [-1, 1].flatMap((e) => [0, s].map((t) => ({
		when: (n) => t === 0 === D(n) && O(n[0]) === e,
		at: (n, r) => [
			e * (o / 2 + r),
			t,
			n
		],
		title: (n) => [
			e * (o / 2 + n * 4),
			t,
			0
		]
	}))), "below"), E("y", [-1, 1].flatMap((e) => [-1, 1].map((t) => ({
		when: (n) => O(n[0]) === -e && O(n[2]) === t,
		at: (n, r) => [
			e * (o / 2 + r),
			n,
			t * c / 2
		],
		title: (n) => [
			e * (o / 2 + n),
			s + n * 2,
			t * c / 2
		]
	}))), "left"), u;
}
function C(e, t, n, r, i) {
	e(t, n), e(n, r), e(r, i), e(i, t);
}
// src/charts/scales.js
var w = Math.log(10);
function T(e, t) {
	let n = e / Math.max(1, t), r = 10 ** Math.floor(Math.log(n) / w), i = n / r;
	return r * (i >= 7.07 ? 10 : i >= 3.16 ? 5 : i >= 1.41 ? 2 : 1);
}
function E(e, n, i = !1) {
	if (typeof e == "function") return e;
	if (e && typeof e == "object") {
		let t = i ? new Intl.DateTimeFormat(void 0, e) : new Intl.NumberFormat(void 0, e);
		return (e) => t.format(e);
	}
	return e !== void 0 && t("charts", `'format' must be Intl format options or a function, got ${r(e)}`), n;
}
function D(e, t) {
	let n = Math.max(0, Math.min(6, -Math.floor(Math.log(e || 1) / w))), r = new Intl.NumberFormat(void 0, { maximumFractionDigits: n }), i = new Intl.NumberFormat(void 0, {
		notation: "compact",
		maximumFractionDigits: 1
	}), a = Math.abs(t) >= 1e4 && e >= Math.abs(t) / 100;
	return (e) => (a ? i : r).format(e);
}
function O(e, n) {
	return Array.isArray(e) && e.length === 2 && e.every((e) => typeof e == "number" && Number.isFinite(e)) || t("charts", `'${n}' must be [min, max] numbers, got ${r(e)}`), [e[0], e[1]];
}
function k({ domain: e, range: t = [0, 1], nice: n = !1, zero: r = !1, clamp: i = !1, format: a }) {
	let [o, s] = O(e, "domain"), [c, l] = O(t, "range");
	if (r && (o = Math.min(0, o), s = Math.max(0, s)), o === s && (o -= o ? Math.abs(o) * .5 : 1, s += s ? Math.abs(s) * .5 : 1), n) {
		let e = T(s - o, 5);
		o = Math.floor(o / e) * e, s = Math.ceil(s / e) * e;
	}
	let u = (l - c) / (s - o), d = ((e) => {
		let t = c + (e - o) * u;
		return i ? Math.min(Math.max(t, Math.min(c, l)), Math.max(c, l)) : t;
	});
	return d.kind = "linear", d.domain = [o, s], d.range = [c, l], d.invert = (e) => o + (e - c) / u, d.ticks = (e = 5) => {
		let t = T(s - o, e), n = [];
		for (let e = Math.ceil(o / t) * t; e <= s + t * 1e-9; e += t) n.push(+e.toFixed(12));
		return n;
	}, d.format = E(a, D(T(s - o, 5), Math.max(Math.abs(o), Math.abs(s)))), d;
}
function A({ domain: e, range: n = [0, 1], format: r }) {
	let [i, a] = O(e, "domain");
	(i <= 0 || a <= 0) && t("charts", `a log scale needs a domain above 0, got [${i}, ${a}] - use a linear scale for zero or negative values`);
	let o = k({
		domain: [Math.log10(i), Math.log10(a)],
		range: n
	}), s = ((e) => o(Math.log10(e)));
	return s.kind = "log", s.domain = [i, a], s.range = o.range, s.invert = (e) => 10 ** o.invert?.(e), s.ticks = () => {
		let e = [];
		for (let t = Math.floor(Math.log10(i)); t <= Math.ceil(Math.log10(a)); t++) for (let n of [
			1,
			2,
			5
		]) {
			let r = n * 10 ** t;
			r >= i * .999 && r <= a * 1.001 && e.push(r);
		}
		return e;
	}, s.format = E(r, (e) => new Intl.NumberFormat(void 0, {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(e)), s;
}
var j = 1e3, M = 60 * j, N = 60 * M, P = 24 * N, F = [
	[j, "s"],
	[5 * j, "s"],
	[15 * j, "s"],
	[30 * j, "s"],
	[M, "m"],
	[5 * M, "m"],
	[15 * M, "m"],
	[30 * M, "m"],
	[N, "h"],
	[3 * N, "h"],
	[6 * N, "h"],
	[12 * N, "h"],
	[P, "d"],
	[2 * P, "d"],
	[7 * P, "w"],
	[30 * P, "M"],
	[91 * P, "Q"],
	[365 * P, "Y"]
], ee = {
	s: [
		(e) => e.getSeconds(),
		(e, t) => e.setSeconds(t),
		j
	],
	m: [
		(e) => e.getMinutes(),
		(e, t) => e.setMinutes(t),
		M
	],
	h: [
		(e) => e.getHours(),
		(e, t) => e.setHours(t),
		N
	],
	d: [
		(e) => e.getDate(),
		(e, t) => e.setDate(t),
		P
	],
	w: [
		(e) => e.getDate(),
		(e, t) => e.setDate(t),
		P
	],
	M: [
		(e) => e.getMonth(),
		(e, t) => e.setMonth(t),
		30 * P
	],
	Q: [
		(e) => e.getMonth(),
		(e, t) => e.setMonth(t),
		30 * P
	],
	Y: [
		(e) => e.getFullYear(),
		(e, t) => e.setFullYear(t),
		365 * P
	]
}, te = {
	s: {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	},
	m: {
		hour: "2-digit",
		minute: "2-digit"
	},
	h: {
		hour: "2-digit",
		minute: "2-digit"
	},
	d: {
		month: "short",
		day: "numeric"
	},
	w: {
		month: "short",
		day: "numeric"
	},
	M: {
		month: "short",
		year: "numeric"
	},
	Q: {
		month: "short",
		year: "numeric"
	},
	Y: { year: "numeric" }
};
function I(e) {
	let n = e instanceof Date ? e : new Date(e);
	return Number.isNaN(n.getTime()) && t("charts", `${r(e)} isn't a date - use Date objects, timestamps or ISO strings like '2026-10-25'`), n;
}
function ne({ domain: e, range: t = [0, 1], format: n }) {
	let r = I(e[0]).getTime(), i = I(e[1]).getTime(), a = k({
		domain: [r, i],
		range: t
	}), o = Math.max(1, i - r), s = (e) => F.find(([t]) => o / t <= e) ?? F[F.length - 1], c = ((e) => a(I(e).getTime()));
	c.kind = "time", c.domain = [new Date(r), new Date(i)], c.range = a.range, c.invert = (e) => new Date(a.invert?.(e)), c.ticks = (e = 5) => {
		let [t, n] = s(e), [a, c, l] = ee[n], u = Math.max(1, Math.round(t / l));
		if (n === "Y") {
			let t = o / l / e, n = 10 ** Math.floor(Math.log10(t || 1));
			u = Math.max(1, [
				1,
				2,
				5,
				10
			].map((e) => e * n).find((e) => e >= t) ?? 10 * n);
		}
		let d = new Date(r);
		d.setMilliseconds(0), n !== "s" && d.setSeconds(0), "sm".includes(n) || d.setMinutes(0), "dwMQY".includes(n) && d.setHours(0), "MQY".includes(n) && d.setDate(1), n === "Y" && d.setMonth(0);
		let f = +(n === "d");
		for (n !== "w" && c(d, Math.floor((a(d) - f) / u) * u + f); d.getTime() < r;) c(d, a(d) + u);
		let p = [];
		for (let e = 0; d.getTime() <= i && e < 200; e++) p.push(new Date(d)), c(d, a(d) + u);
		return p;
	};
	let l = new Intl.DateTimeFormat(void 0, te[s(6)[1]]);
	return c.format = E(n, (e) => l.format(I(e)), !0), c;
}
function re({ domain: e, range: n = [0, 1], padding: i = .2, format: a }) {
	Array.isArray(e) || t("charts", `a band scale's domain is a list of categories, got ${r(e)}`);
	let [o, s] = O(n, "range"), c = new Map(e.map((e, t) => [String(e), t])), l = (s - o) / Math.max(1, e.length), u = ((e) => {
		let t = c.get(String(e));
		return t === void 0 ? NaN : o + l * (t + .5);
	});
	return u.kind = "band", u.domain = e, u.range = [o, s], u.step = l, u.bandwidth = Math.abs(l) * (1 - i), u.ticks = () => e, u.format = E(a, (e) => String(e)), u;
}
var L = {
	category: [
		"#4e79a7",
		"#f28e2b",
		"#59a14f",
		"#e15759",
		"#76b7b2",
		"#edc948",
		"#b07aa1",
		"#ff9da7",
		"#9c755f",
		"#bab0ac"
	],
	viridis: [
		"#440154",
		"#3b528b",
		"#21918c",
		"#5ec962",
		"#fde725"
	],
	blues: [
		"#eff3ff",
		"#bdd7e7",
		"#6baed6",
		"#3182bd",
		"#08519c"
	],
	heat: [
		"#2c7bb6",
		"#abd9e9",
		"#ffffbf",
		"#fdae61",
		"#d7191c"
	],
	cool: [
		"#f7fcf0",
		"#ccebc5",
		"#7bccc4",
		"#2b8cbe",
		"#084081"
	],
	redblue: [
		"#b2182b",
		"#ef8a62",
		"#f7f7f7",
		"#67a9cf",
		"#2166ac"
	]
};
function R({ domain: e, scheme: n, range: i, kind: a }) {
	n !== void 0 && !(n in L) && t("charts", `colour scheme '${n}' isn't one we have - use ${Object.keys(L).map((e) => `'${e}'`).join(", ")}, or a range of colours`);
	let o = a ? a === "sequential" : e.length === 2 && e.every((e) => typeof e == "number");
	o && (e.length < 2 || e.some((e) => typeof e != "number")) && t("charts", `a sequential colour scale needs two or more numbers in its domain, got ${r(e)}`);
	let s = (i ?? L[n ?? (o ? "viridis" : "category")]).map((e) => c.fromInput(e, "charts")), l;
	if (o) {
		let t = (t) => {
			let n = e.length - 1, r = 0;
			for (; r < n - 1 && t > e[r + 1];) r++;
			let i = (t - e[r]) / (e[r + 1] - e[r] || 1);
			return Math.min(1, Math.max(0, (r + i) / n));
		};
		l = ((e) => {
			if (s.length < 2) return s[0].clone();
			let n = t(e) * (s.length - 1), r = Math.min(s.length - 2, Math.floor(n));
			return s[r].clone().lerp(s[r + 1], n - r);
		}), l.kind = "sequential", l.colors = () => [];
	} else {
		let t = new Map(e.map((e, t) => [String(e), t]));
		l = ((e) => s[(t.get(String(e)) ?? 0) % s.length].clone()), l.kind = "categorical", l.colors = () => e.map((e) => ({
			value: e,
			color: l(e)
		}));
	}
	return l.domain = e, l.range = s.map((e) => e.getStyle()), l;
}
function z(e) {
	let t = [...new Map(e.map((e) => [e instanceof Date ? e.getTime() : e, e])).values()];
	return typeof t[0] == "number" || t[0] instanceof Date ? t.sort((e, t) => +e - t) : t;
}
// src/charts/legend.js
function ie(e, { title: t, theme: n, position: r = "top-right", format: i, ticks: a, onToggle: o }) {
	let s = document.createElement("div");
	if (s.className = `phoria-legend phoria-legend-${r} phoria-${n}`, t) {
		let e = document.createElement("div");
		e.className = "phoria-legend-title", e.textContent = t, s.append(e);
	}
	if (e.kind === "categorical") for (let { value: t, color: n } of e.colors()) {
		let e = document.createElement("button");
		e.type = "button", e.className = "phoria-legend-item";
		let r = document.createElement("span");
		r.className = "phoria-legend-swatch", r.style.background = n.getStyle(), e.append(r, i(t)), e.addEventListener("click", () => o?.(t, !e.classList.toggle("off"))), s.append(e);
	}
	else {
		let t = e.domain[0], n = e.domain[e.domain.length - 1], r = k({
			domain: [t, n],
			range: [0, 100]
		}), o = document.createElement("div");
		o.className = "phoria-legend-key";
		let c = document.createElement("div");
		c.className = "phoria-legend-ramp";
		let l = Array.from({ length: 17 }, (r, i) => `${e(t + (n - t) * i / 16).getStyle()} ${i * 100 / 16}%`);
		c.style.background = `linear-gradient(to top, ${l.join(", ")})`;
		let u = document.createElement("div");
		u.className = "phoria-legend-scale";
		let d = Array.isArray(a) ? a : r.ticks(a ?? 5);
		for (let e of d) {
			let t = r(e);
			if (!(t >= -1e-9 && t <= 100 + 1e-9)) continue;
			let n = document.createElement("span");
			n.style.bottom = `${t}%`, n.textContent = i(e), u.append(n);
		}
		o.append(c, u), s.append(o);
	}
	return s;
}
// src/charts/marks.js
function B(e, t, n) {
	let r = e.x?.get(t);
	return `${r instanceof Date ? r.getTime() : r}|${e.z ? e.z.get(t) : ""}|${n < 0 ? "-" : "+"}`;
}
var ae = (e) => `phoria-value phoria-${e.theme}`;
function V(e, t) {
	let n = e.spec.channels.label;
	if (!n) return null;
	let r = n.priority, i = typeof r == "function" ? r : typeof r == "string" ? (e) => Number(e[r]) || 0 : r ?? 0;
	return {
		text: (t) => t ? e.format(n, n.get(t)) : null,
		place: t,
		className: ae(e),
		priority: i,
		occlude: !0,
		overlap: e.overlap
	};
}
var H = (e, t, n) => e && t ? e(t.get(n)) : 0;
function oe(e) {
	let t = U(64, e), n = {
		nodes: [t],
		layout(t) {
			let { x: n, y: r, z: i } = e.scales, a = e.spec.channels, o = e.spec.options.width ?? .7, s = (n.bandwidth ?? e.box[0] / 20) * o / .8, c = i?.bandwidth === void 0 ? Math.min(s, e.box[2] * .8) : i.bandwidth * o / .8, l = r(Math.max(r.domain[0], Math.min(0, r.domain[1]))), u = /* @__PURE__ */ new Map(), d = new Float32Array(t.length * 9);
			return t.forEach((t, o) => {
				let f = Number(a.y.get(t)) || 0, p = l, m = r(f);
				if (e.spec.options.stack) {
					let e = B(a, t, f), n = u.get(e) ?? 0;
					p = r(n), m = r(n + f), u.set(e, n + f);
				}
				d.set([
					H(n, a.x, t),
					H(i, a.z, t),
					p,
					m,
					s,
					c,
					...e.rgb(t)
				], o * 9);
			}), {
				rows: t,
				keys: W(e, t),
				state: d,
				stride: 9
			};
		},
		apply(r, i) {
			let a = r.length / i.stride;
			if (a > t.instanceMatrices.length / 16) {
				let r = U(a * 2, e);
				t.parent?.add(r), t.parent?.remove(t), t.dispose(), n.nodes[0] = t = r;
			}
			t.count = a, t.data = i.rows;
			for (let e = 0; e < a; e++) {
				let [n, i, a, o, s, c, l, u, d] = r.subarray(e * 9, e * 9 + 9);
				t.setInstance(e, {
					position: [
						n,
						(a + o) / 2,
						i
					],
					scale: [
						s,
						Math.max(.001, Math.abs(o - a)),
						c
					],
					color: [
						l,
						u,
						d
					]
				});
			}
		},
		enter(e) {
			e[3] = e[2];
		}
	};
	return n;
}
function U(e, t) {
	let n = new s({
		geometry: f(1),
		material: { roughness: .55 },
		count: e,
		labels: V(t, "above")
	});
	return n.count = 0, n;
}
function W(e, t) {
	let n = e.spec.channels.key;
	return n ? t.map((e) => n.get(e)) : t.length && t[0] && "id" in t[0] ? t.map((e) => e.id) : t.map((e, t) => t);
}
function se(e) {
	let t = !!e.spec.channels.size?.field, n = Math.min(...e.box) / 40, r = e.spec.channels.opacity?.value, i = {
		roughness: .4,
		...r === void 0 ? {} : { opacity: r }
	}, a = t ? new s({
		geometry: p({
			radius: 1,
			detail: 1
		}),
		material: i,
		count: 64,
		labels: V(e, "above")
	}) : new _({
		geometry: G(64),
		material: {
			size: e.spec.channels.size?.value ?? n * 1.4,
			vertexColors: !0,
			...i
		},
		labels: V(e, "above")
	});
	t && (a.count = 0);
	let o = {
		nodes: [a],
		layout(n) {
			let { x: r, y: i, z: a } = e.scales, o = e.spec.channels, s = t ? 7 : 6, c = new Float32Array(n.length * s);
			return n.forEach((n, l) => {
				let u = [
					H(r, o.x, n),
					H(i, o.y, n),
					H(a, o.z, n)
				];
				c.set(t ? [
					...u,
					e.size(o.size.get(n)),
					...e.rgb(n)
				] : [...u, ...e.rgb(n)], l * s);
			}), {
				rows: n,
				keys: W(e, n),
				state: c,
				stride: s
			};
		},
		apply(e, n) {
			let r = e.length / n.stride;
			if (a.data = n.rows, t) {
				if (r > a.instanceMatrices.length / 16) {
					let e = new s({
						geometry: a.geometry,
						material: a.material,
						count: r * 2,
						labels: a.labels
					});
					a.parent?.add(e), a.parent?.remove(a), o.nodes[0] = a = e;
				}
				a.count = r;
				for (let t = 0; t < r; t++) {
					let [n, r, i, o, s, c, l] = e.subarray(t * 7, t * 7 + 7);
					a.setInstance(t, {
						position: [
							n,
							r,
							i
						],
						scale: Math.max(1e-4, o),
						color: [
							s,
							c,
							l
						]
					});
				}
				return;
			}
			let i = a.geometry;
			r > i.vertexCount && (a.geometry = G(r * 2));
			let c = a.geometry.positions, l = a.geometry.colors;
			for (let t = 0; t < r; t++) c.set(e.subarray(t * 6, t * 6 + 3), t * 3), l.set(e.subarray(t * 6 + 3, t * 6 + 6), t * 3);
			a.geometry.drawCount = r, a.geometry.needsUpdate(), a.geometry !== i && i.dispose();
		},
		enter(e) {
			t ? e[3] = 0 : e[1] = 0;
		}
	};
	return o;
}
function G(e) {
	let t = new l({
		positions: new Float32Array(e * 3),
		colors: new Float32Array(e * 3)
	});
	return t.drawCount = 0, t;
}
function ce(t, n) {
	let r = new e({
		geometry: new l({ positions: [
			0,
			0,
			0,
			0,
			0,
			0
		] }),
		material: {
			width: 2.5,
			vertexColors: !0
		},
		pickable: !1
	}), i = new _({
		geometry: G(8),
		material: {
			size: 7,
			sizeAttenuation: !1,
			vertexColors: !0
		},
		labels: V(t, "above")
	}), a = n ? new u({
		geometry: new l({ positions: [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		] }),
		material: {
			vertexColors: !0,
			opacity: .55,
			doubleSided: !0,
			unlit: !0
		},
		pickable: !1
	}) : null;
	return {
		nodes: a ? [
			a,
			r,
			i
		] : [r, i],
		layout(e) {
			let { x: n, y: r, z: i } = t.scales, a = t.spec.channels, o = a.color?.field ? a.color : a.detail ?? (a.z?.field ? a.z : null), s = /* @__PURE__ */ new Map();
			for (let t of e) {
				let e = o ? String(o.get(t)) : "";
				s.has(e) || s.set(e, []), s.get(e).push(t);
			}
			let c = [...s.values()].map((e) => e.sort((e, t) => n(a.x.get(e)) - n(a.x.get(t)))), l = /* @__PURE__ */ new Map(), u = c.flat(), d = new Float32Array(u.length * 4), f = 0;
			for (let e of c) for (let o of e) {
				let e = a.x.get(o), s = Number(a.y.get(o)) || 0, c = B(a, o, s), u = t.spec.options.stack ? l.get(c) ?? 0 : 0;
				t.spec.options.stack && l.set(c, u + s), d.set([
					n(e),
					r(u + s),
					H(i, a.z, o),
					r(u)
				], f * 4), f++;
			}
			return {
				rows: u,
				keys: null,
				state: d,
				stride: 4,
				shape: {
					lengths: c.map((e) => e.length),
					colors: c.map((e) => t.rgb(e[0]))
				}
			};
		},
		apply(e, t) {
			let { lengths: n, colors: o } = t.shape, s = [], c = [], l = [], u = [], d = [], f = [], p = [], m = 0;
			n.forEach((t, n) => {
				let r = o[n];
				for (let n = 0; n < t; n++, m++) {
					let [t, i, o, h] = e.subarray(m * 4, m * 4 + 4);
					if (l.push(t, i, o), u.push(...r), n > 0 && (s.push(...e.subarray((m - 1) * 4, (m - 1) * 4 + 3), t, i, o), c.push(...r, ...r)), a) {
						let e = f.length / 3;
						d.push(t, i, o, t, h, o), f.push(...r, ...r), n > 0 && p.push(e - 2, e - 1, e, e - 1, e + 1, e);
					}
				}
			}), r.geometry = K(r.geometry, s.length ? {
				positions: s,
				colors: c
			} : { positions: [
				0,
				0,
				0,
				0,
				0,
				0
			] }), i.geometry = K(i.geometry, {
				positions: l.length ? l : [
					0,
					0,
					0
				],
				colors: l.length ? u : [
					0,
					0,
					0
				]
			}), i.geometry.drawCount = l.length / 3, i.material.size = Math.max(...n, 0) > 40 ? 4 : 7, i.data = t.rows, a && (a.geometry = K(a.geometry, p.length ? {
				positions: d,
				colors: f,
				indices: p
			} : { positions: [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			] }));
		}
	};
}
function K(e, t) {
	return e.dispose(), new l(t);
}
function le(e) {
	let n = new u({
		geometry: new l({ positions: [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		] }),
		material: {
			vertexColors: !0,
			roughness: .6,
			doubleSided: !0
		}
	});
	return {
		nodes: [n],
		layout(n) {
			let { x: r, y: i, z: a } = e.scales, o = e.spec.channels, s = z(n.map((e) => o.x.get(e))), c = z(n.map((e) => o.z.get(e))), l = new Map(n.map((e) => [`${+o.x.get(e)}|${+o.z.get(e)}|${o.x.get(e)}|${o.z.get(e)}`, e])), u = (e, t) => l.get(`${+e}|${+t}|${e}|${t}`), d = s.length * c.length - l.size;
			if (d > 0) {
				let e = s.flatMap((e) => c.map((t) => [e, t])).find(([e, t]) => !u(e, t));
				t("chart()", `a surface needs a value for every x and z pair - ${d} of ${s.length * c.length} are missing (first: x ${e[0]}, z ${e[1]})`);
			}
			let f = [], p = new Float32Array(s.length * c.length * 6), m = 0;
			for (let t of c) for (let n of s) {
				let s = u(n, t);
				f.push(s), p.set([
					r(n),
					i(Number(o.y.get(s)) || 0),
					a(t),
					...e.rgb(s)
				], m++ * 6);
			}
			return {
				rows: f,
				keys: null,
				state: p,
				stride: 6,
				shape: {
					nx: s.length,
					nz: c.length
				}
			};
		},
		apply(e, t) {
			let { nx: r, nz: i } = t.shape, a = [], o = [], s = [];
			for (let t = 0; t < r * i; t++) a.push(...e.subarray(t * 6, t * 6 + 3)), o.push(...e.subarray(t * 6 + 3, t * 6 + 6));
			for (let e = 0; e < i - 1; e++) for (let t = 0; t < r - 1; t++) {
				let n = e * r + t, i = n + 1, a = n + r, o = a + 1;
				s.push(n, a, i, i, a, o);
			}
			n.geometry = K(n.geometry, {
				positions: a,
				colors: o,
				indices: s
			}), n.data = t.rows;
		}
	};
}
// src/charts/network.js
function ue(e) {
	return () => {
		e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var de = [
	1.2,
	2.5,
	4.5
];
function fe(n) {
	let i = n.spec.options, a = me(n), o = n.spec.link, u = i.source ?? "source", d = i.target ?? "target", f = /* @__PURE__ */ new Map(), m = (e) => new s({
		geometry: p({
			radius: 1,
			detail: 2
		}),
		material: { roughness: .35 },
		count: e,
		labels: V(n, "above")
	}), h = m(Math.max(8, n.spec.rows.length * 2));
	h.count = 0;
	let g = de.map((t) => new e({
		geometry: new l({ positions: [
			0,
			0,
			0,
			0,
			0,
			0
		] }),
		material: {
			width: t,
			vertexColors: !0
		},
		data: []
	})), v = new e({
		geometry: new l({ positions: [] }),
		material: {
			width: 4,
			color: "#7fd3ff"
		},
		pickable: !1,
		visible: !1
	}), y = o.flow ? new _({
		geometry: new l({ positions: [] }),
		material: {
			size: .012 * Math.min(...n.box),
			color: "#bff0ff"
		},
		pickable: !1
	}) : null, b = [], x = [], S = [], C = [], w = null, T = {
		nodes: [
			...g,
			v,
			h,
			...y ? [y] : []
		],
		layout(e) {
			let i = e.map(a), o = new Map(i.map((e, t) => [e, t]));
			S = n.spec.links.filter((e, i) => {
				let s = e[u], c = e[d];
				return (s === void 0 || c === void 0) && t("chart()", `link ${i} has no '${s === void 0 ? u : d}' - links name their ends with source: '${u}', target: '${d}' (set 'source' and 'target' to your field names)`), n.spec.rows.some((e) => a(e) === s) || t("chart()", `link ${i}: ${u} ${r(s)} names no node`), n.spec.rows.some((e) => a(e) === c) || t("chart()", `link ${i}: ${d} ${r(c)} names no node`), o.has(s) && o.has(c);
			});
			let s = N(e, i, S.map((e) => [o.get(e[u]), o.get(e[d])])), c = new Float32Array(e.length * 7);
			return e.forEach((e, t) => c.set([
				...s[t],
				n.size ? n.size(n.spec.channels.size.get(e)) : .06 * Math.min(...n.box),
				...n.rgb(e)
			], t * 7)), {
				rows: e,
				keys: i,
				state: c,
				stride: 7,
				shape: { pairs: S.map((e) => [e[u], e[d]]) }
			};
		},
		apply(e, t) {
			let n = e.length / t.stride;
			if (C = t.rows, w !== null && !C.some((e) => a(e) === w) && (w = null, v.visible = !1), n > h.instanceMatrices.length / 16) {
				let e = m(n * 2);
				E && e.on("hover", D), h.parent?.add(e), h.parent?.remove(h), h.dispose(), T.nodes[T.nodes.indexOf(h)] = e, h = e;
			}
			h.count = n, h.data = t.rows;
			let r = t.rows.map(a), i = new Map(r.map((e, t) => [e, t]));
			x = [];
			for (let t = 0; t < n; t++) {
				let [n, r, i, a, o, s, c] = e.subarray(t * 7, t * 7 + 7);
				x.push([
					n,
					r,
					i
				]), h.setInstance(t, {
					position: [
						n,
						r,
						i
					],
					scale: Math.max(1e-4, a),
					color: k(t, [
						o,
						s,
						c
					])
				});
			}
			let s = de.map(() => ({
				positions: [],
				colors: [],
				rows: []
			}));
			b = [], S.forEach((e, t) => {
				let n = i.get(e[u]), r = i.get(e[d]);
				if (n === void 0 || r === void 0) return;
				let a = s[A(e)], c = j(e);
				a.positions.push(...x[n], ...x[r]), a.colors.push(...c, ...c), a.rows.push(e), o.flow && b.push({
					a: n,
					b: r,
					speed: M(e),
					phase: t * .618 % 1
				});
			}), g.forEach((e, t) => {
				let n = s[t];
				e.geometry.dispose(), e.geometry = new l(n.positions.length ? {
					positions: n.positions,
					colors: n.colors
				} : { positions: [
					0,
					0,
					0,
					0,
					0,
					0
				] }), e.visible = n.positions.length > 0, e.data = n.rows;
			}), w !== null && O(w);
		},
		enter(e) {
			e[3] = 0;
		},
		tick(e) {
			if (!y || !b.length) return;
			let t = new Float32Array(b.length * 3);
			b.forEach((n, r) => {
				n.phase = (n.phase + e * n.speed) % 1;
				let i = x[n.a], a = x[n.b];
				for (let e = 0; e < 3; e++) t[r * 3 + e] = i[e] + (a[e] - i[e]) * n.phase;
			}), y.geometry.vertexCount === b.length ? (y.geometry.positions.set(t), y.geometry.needsUpdate()) : (y.geometry.dispose(), y.geometry = new l({ positions: t }));
		},
		tooltipRows(e) {
			return g.includes(e.node) ? "link" : "node";
		}
	}, E = (i.highlight ?? "neighbours") === "neighbours";
	E && h.on("hover", D);
	function D(e) {
		let t = e && e.node === h && e.instance !== null ? a(C[e.instance]) : null;
		if (t !== w) {
			w = t, v.visible = t !== null, t !== null && O(t);
			for (let e = 0; e < h.count; e++) h.setColor(e, k(e, n.rgb(C[e])));
		}
	}
	function O(e) {
		let t = [];
		for (let n of S) {
			if (n[u] !== e && n[d] !== e) continue;
			let r = C.findIndex((e) => a(e) === n[u]), i = C.findIndex((e) => a(e) === n[d]);
			r >= 0 && i >= 0 && t.push(...x[r], ...x[i]);
		}
		v.geometry.dispose(), v.geometry = new l({ positions: t });
	}
	function k(e, t) {
		if (w === null || !E) return t;
		let r = a(C[e]);
		return r === w || S.some((e) => e[u] === w && e[d] === r || e[d] === w && e[u] === r) ? t : new c().setSRGB(t[0], t[1], t[2]).lerp(n.theme === "light" ? "#ffffff" : "#202024", .65).toSRGB();
	}
	function A(e) {
		let t = o.width;
		if (!t) return 0;
		if (t.field === null) return t.value >= 3.5 ? 2 : +(t.value >= 2);
		let r = n.spec.links.map((e) => Number(t.get(e)) || 0), i = Math.max(...r) || 1;
		return Math.min(2, Math.floor((Number(t.get(e)) || 0) / i * 2.999));
	}
	function j(e) {
		let t = o.color, r = n.theme === "light" ? "#9aa3b2" : "#4a5266";
		return t ? t.field === null ? c.fromInput(t.value).toSRGB() : n.linkColor(t.get(e)).toSRGB() : c.fromInput(r).toSRGB();
	}
	function M(e) {
		let t = o.flow;
		if (t.field === null) return .4;
		let r = Math.max(...n.spec.links.map((e) => Number(t.get(e)) || 0)) || 1;
		return .15 + .6 * (Number(t.get(e)) || 0) / r;
	}
	function N(e, a, o) {
		let [s, c, l] = n.box, u = i.layout ?? "force";
		if (u === "given") {
			let { x: t, y: r, z: i } = n.scales, a = n.spec.channels;
			return e.map((e) => [
				t && a.x ? t(a.x.get(e)) : 0,
				r && a.y ? r(a.y.get(e)) : c / 2,
				i && a.z ? i(a.z.get(e)) : 0
			]);
		}
		if (u && typeof u == "object" && "tiers" in u) return pe(e, a, o, u, [
			s,
			c,
			l
		]);
		u !== "force" && t("chart()", `layout ${r(u)} - expected 'force', 'given' or { tiers: 'field' }`);
		let d = P(a, o), f = [
			Infinity,
			Infinity,
			Infinity
		], p = [
			-Infinity,
			-Infinity,
			-Infinity
		];
		for (let e of d) for (let t = 0; t < 3; t++) f[t] = Math.min(f[t], e[t]), p[t] = Math.max(p[t], e[t]);
		let m = Math.max(...p.map((e, t) => e - f[t]), 1e-6), h = Math.min(s, i.flat ? l : Math.min(c, l)) * .9 / m, g = p.map((e, t) => (e + f[t]) / 2);
		return d.map((e) => [
			(e[0] - g[0]) * h,
			i.flat ? 0 : (e[1] - g[1]) * h + c / 2,
			(e[2] - g[2]) * h
		]);
	}
	function P(e, t) {
		let n = e.length, r = ue(i.seed ?? 1), a = i.flat ? [0, 2] : [
			0,
			1,
			2
		], o = e.some((e) => f.has(e)), s = i.steps ?? (o ? 60 : 300), c = e.map(() => []);
		for (let [e, n] of t) c[e].push(n), c[n].push(e);
		let l = new Float32Array(n * n).fill(Infinity), u = 1;
		for (let e = 0; e < n; e++) {
			let t = [e];
			l[e * n + e] = 0;
			for (let r = 0; r < t.length; r++) {
				let i = t[r], a = l[e * n + i] + 1;
				for (let r of c[i]) l[e * n + r] === Infinity && (l[e * n + r] = a, u = Math.max(u, a), t.push(r));
			}
		}
		let d = e.map((t, a) => {
			if (f.has(t)) return [...f.get(t)];
			let o = c[a].find((t) => f.has(e[t])), s = o === void 0 ? [
				0,
				0,
				0
			] : f.get(e[o]), l = o === void 0 ? Math.sqrt(n) : .5;
			return [
				s[0] + (r() - .5) * l,
				i.flat ? 0 : s[1] + (r() - .5) * l,
				s[2] + (r() - .5) * l
			];
		}), p = [
			0,
			0,
			0
		];
		for (let e = 0; e < s; e++) for (let e = 0; e < n; e++) {
			p.fill(0);
			let t = 0;
			for (let r = 0; r < n; r++) {
				if (e === r) continue;
				let i = l[e * n + r], a = i === Infinity ? u + 1 : i, o = 1 / (a * a), s = d[e][0] - d[r][0], c = d[e][1] - d[r][1], f = d[e][2] - d[r][2], m = Math.hypot(s, c, f) || 1e-6;
				p[0] += o * (d[r][0] + a * s / m), p[1] += o * (d[r][1] + a * c / m), p[2] += o * (d[r][2] + a * f / m), t += o;
			}
			if (t) for (let n of a) d[e][n] = p[n] / t;
		}
		return f = new Map(e.map((e, t) => [e, d[t]])), d;
	}
	return T;
}
function pe(e, n, r, i, [a, o, s]) {
	let c = i.tiers;
	if (!e.length) return [];
	c in e[0] || t("chart()", `layout: { tiers: '${c}' } - '${c}' isn't a node field`);
	let l = i.order ?? [...new Set(e.map((e) => e[c]))], u = e.map((e) => Math.max(0, l.indexOf(e[c]))), d = Math.max(...u) + 1, f = Array(e.length).fill(0), p = Array(e.length), m = Math.min(a, s) / 2 * .92;
	for (let t = 0; t < d; t++) {
		let n = e.map((e, t) => t).filter((e) => u[e] === t), i = (e) => {
			let i = r.filter(([t, n]) => t === e || n === e).map(([t, n]) => t === e ? n : t).filter((e) => u[e] < t);
			return i.length ? i.reduce((e, t) => e + f[t], 0) / i.length : n.indexOf(e);
		};
		t > 0 && n.sort((e, t) => i(e) - i(t));
		let a = n.length === 1 ? 0 : t === 0 ? m * .25 : m * (.35 + .65 * t / Math.max(1, d - 1));
		n.forEach((e, r) => {
			f[e] = (r + .5) / n.length * Math.PI * 2, p[e] = [
				Math.cos(f[e]) * a,
				o * (1 - t / Math.max(1, d - 1)),
				Math.sin(f[e]) * a
			];
		});
	}
	return p;
}
function me(e) {
	let n = e.spec.channels.key;
	return n ? (e) => n.get(e) : (e.spec.rows.length && !("id" in e.spec.rows[0]) && t("chart()", "network nodes need an 'id' field, or key: 'yourIdField' - links name nodes by it"), (e) => e.id);
}
// src/charts/spec.js
var q = [
	"bar",
	"point",
	"line",
	"area",
	"surface",
	"network"
], J = [
	"x",
	"y",
	"z",
	"color",
	"size",
	"opacity",
	"label",
	"key",
	"detail"
], Y = [
	"mark",
	"data",
	"encoding",
	"tooltip",
	"box",
	"stack",
	"width",
	"layout",
	"flat",
	"steps",
	"seed",
	"source",
	"target",
	"link",
	"highlight",
	"legend",
	"theme",
	"overlap",
	"transition",
	"title",
	"$schema",
	"description",
	...J
], he = [
	"field",
	"type",
	"title",
	"format",
	"scale",
	"axis",
	"value",
	"priority",
	"legend"
], ge = {
	series: "phoria2 charts map fields to channels instead of listing series - e.g. { mark: 'bar', x: 'month', y: 'sales', color: 'region' }",
	xAxis: "axes come from the channels - use x: { field, axis: { title } }",
	yAxis: "axes come from the channels - use y: { field, axis: { title } }",
	zAxis: "axes come from the channels - use z: { field, axis: { title } }",
	type: "use mark: 'bar' | 'point' | 'line' | 'area' | 'surface' | 'network'",
	transform: "transforms aren't supported - filter, sum or sort the rows before charting them",
	selection: "use view.on('click', (hit) => ...) or a chart's onClick; hit.datum is the row",
	params: "use view.on('click', (hit) => ...) or a chart's onClick; hit.datum is the row",
	facet: "small multiples aren't supported - make one chart (or one View) per panel",
	repeat: "small multiples aren't supported - make one chart (or one View) per panel",
	layer: "layers aren't supported yet - add several charts to the same scene with the same box",
	hconcat: "put each chart in its own View",
	vconcat: "put each chart in its own View",
	concat: "put each chart in its own View",
	height: "the canvas sets the size in pixels; 'box' sets the chart's size in the scene",
	colour: "use 'color'",
	colors: "use color: { field, scale: { range: [...] } }",
	nodes: "a network's nodes and links go in data: { nodes, links }",
	links: "a network's nodes and links go in data: { nodes, links }"
}, _e = {
	scatter: "point",
	scatter3d: "point",
	circle: "point",
	dots: "point",
	column: "bar",
	bars: "bar",
	histogram: "bar",
	heatmap: "surface",
	mesh3d: "surface",
	graph: "network",
	tree: "network",
	ribbon: "area",
	lines: "line",
	rect: "bar"
}, ve = {
	overlap: "set overlap on the chart - { overlap: 'dim' | 'hide' | 'show' } - it applies to all the chart's labels",
	aggregate: "aggregate the rows first (e.g. sum per month) - charts draw rows as given",
	bin: "bin the rows first - charts draw rows as given",
	timeUnit: "round the dates in the rows first - charts draw rows as given",
	sort: "sort with scale: { domain: [...] } in the order you want",
	stack: "stacking is the chart's option: stack: true"
};
function ye(e) {
	(!e || typeof e != "object" || Array.isArray(e)) && t("chart()", `expected a spec such as { mark: 'bar', data, x, y }, got ${r(e)}`);
	for (let n of Object.keys(e)) Y.includes(n) || t("chart()", `unknown option '${n}' - ${ge[n] ?? `expected ${Y.filter((e) => e[0] !== "$").join(", ")}${d(n, Y)}`}`);
	typeof e.width == "number" && e.width > 1 && t("chart()", "'width' is a bar's share of its band (0-1); in Vega-Lite it is pixels - here the canvas sets the size");
	let n = be(e.mark), { rows: i, links: o } = xe(e.data, n), s = Se(i), c = { ...e.encoding ?? {} };
	for (let e of Object.keys(c)) !J.includes(e) && e !== "tooltip" && t("chart()", `encoding '${e}' isn't a channel we have - channels are ${J.join(", ")}, tooltip`);
	let l = {};
	for (let t of J) {
		let n = e[t] ?? c[t];
		n != null && (l[t] = X(t, n, i, s));
	}
	if (n === "network") for (let n of [
		"x",
		"y",
		"z"
	]) l[n] && e.layout !== "given" && t("chart()", `${n} on a 'network' places its nodes - add layout: 'given' to use positions from the data`);
	else for (let e of n === "surface" ? [
		"x",
		"z",
		"y"
	] : ["x", "y"]) l[e] || t("chart()", `a '${n}' chart needs ${e} - e.g. ${e}: '${s[0] ?? "field"}'`), n !== "point" && l[e].field === null && t("chart()", `${e} on a '${n}' chart lays its marks out along a scale - it needs a field, not a constant value - e.g. ${e}: '${s[0] ?? "field"}'`);
	let u = e.tooltip ?? c.tooltip, f = typeof e.mark == "object" ? e.mark.tooltip : void 0, p = Ee(u ?? (f !== !1 && void 0), l, i, s), m = {};
	if (e.link !== void 0) {
		n !== "network" && t("chart()", "'link' sets a network's link channels - it needs mark: 'network'");
		let r = Se(o);
		for (let [n, i] of Object.entries(e.link)) [
			"width",
			"color",
			"opacity",
			"flow",
			"tooltip"
		].includes(n) || t("chart()", `link has no '${n}' - link channels are width, color, opacity, flow, tooltip`), n !== "tooltip" && (m[n] = X(`link.${n}`, i, o, r));
		e.link.tooltip !== void 0 && (m.tooltip = Ee(e.link.tooltip, {}, o, r));
	}
	let h = {};
	for (let t of Y) !J.includes(t) && ![
		"mark",
		"data",
		"encoding",
		"tooltip",
		"link"
	].includes(t) && e[t] !== void 0 && (h[t] = e[t]);
	return h.steps !== void 0 && (!Number.isInteger(h.steps) || h.steps < 1) && t("chart()", `'steps' is how many steps the force layout takes, a whole number of 1 or more, got ${r(h.steps)}`), h.seed !== void 0 && a("chart()", "seed", h.seed), h.legend?.ticks !== void 0 && we("legend", h.legend.ticks), h.box === void 0 || Array.isArray(h.box) && h.box.length === 3 && h.box.every((e) => e > 0) || t("chart()", `'box' is the chart's size in the scene, [x, y, z] above 0, got ${r(h.box)}`), {
		mark: n,
		rows: i,
		links: o,
		fields: s,
		channels: l,
		tooltip: p,
		link: m,
		options: h
	};
}
function be(e) {
	let n = e;
	if (n && typeof n == "object") {
		for (let e of Object.keys(n)) e !== "type" && e !== "tooltip" && t("chart()", `mark option '${e}' isn't supported - use the chart's options (width, stack, ...) or style the chart's nodes`);
		n = n.type;
	}
	if (typeof n != "string" && t("chart()", `'mark' is required: one of ${q.map((e) => `'${e}'`).join(", ")}`), !q.includes(n)) {
		let e = _e[n];
		(n === "pie" || n === "arc" || n === "donut") && t("chart()", "pie and donut charts aren't supported - in 3D they distort values; use mark: 'bar'"), t("chart()", `mark '${n}' - ${e ? `use '${e}'` : `expected one of ${q.map((e) => `'${e}'`).join(", ")}${d(n, q)}`}`);
	}
	return n;
}
function xe(e, n) {
	if (e && typeof e == "object" && !Array.isArray(e) && "url" in e && t("chart()", "data: { url } isn't loaded for you - fetch the rows and pass data: rows"), n === "network") return e && Array.isArray(e.nodes) && Array.isArray(e.links) || t("chart()", `a network's data is { nodes: [...], links: [...] }, got ${r(e)}`), {
		rows: e.nodes,
		links: e.links
	};
	let i = Array.isArray(e) ? e : e && Array.isArray(e.values) ? e.values : null;
	return i || t("chart()", `'data' must be an array of rows (objects), or { values: [...] }, got ${r(e)}`), i.some((e) => !e || typeof e != "object") && t("chart()", "every row in 'data' must be an object, such as { month: 'Jan', sales: 41 }"), {
		rows: i,
		links: []
	};
}
function Se(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.slice(0, 50)) for (let e of Object.keys(n)) t.add(e);
	return [...t];
}
function Ce(e, t) {
	let n = e.find((e) => e[t] !== null && e[t] !== void 0)?.[t];
	return typeof n == "number" ? "quantitative" : n instanceof Date || typeof n == "string" && /^\d{4}-\d{2}(-\d{2})?([T ][\d:.]+Z?)?$/.test(n) ? "temporal" : "nominal";
}
function X(e, n, i, a) {
	let o = "chart()", s;
	if (typeof n == "string") a.includes(n) ? s = { field: n } : /color|colour/.test(e) && Te(n) ? s = { value: n } : t(o, `${e}: field '${n}' isn't in the data - fields are ${a.join(", ") || "(none)"}${d(n, a)}`);
	else if (typeof n == "number" && [
		"size",
		"opacity",
		"link.width",
		"link.opacity",
		"link.flow"
	].includes(e)) s = { value: n };
	else if (n && typeof n == "object" && !Array.isArray(n)) {
		s = n;
		for (let n of Object.keys(s)) he.includes(n) || t(o, `${e}: '${n}' - ${ve[n] ?? `unknown; a channel takes ${he.join(", ")}`}`);
		s.field !== void 0 && !a.includes(s.field) && t(o, `${e}: field '${s.field}' isn't in the data - fields are ${a.join(", ") || "(none)"}${d(String(s.field), a)}`), s.field === void 0 && s.value === void 0 && t(o, `${e} needs a field (or a constant value)`);
	} else return e === "size" && Array.isArray(n) && t(o, "'size' is a channel - the chart's size in the scene is 'box: [x, y, z]'"), t(o, `${e} must be a field name or { field, ... }, got ${r(n)}`);
	s.axis?.ticks !== void 0 && we(`${e}: axis`, s.axis.ticks);
	let c = s.field ?? null, l = s.type ?? (c ? Ce(i, c) : "nominal");
	[
		"quantitative",
		"nominal",
		"ordinal",
		"temporal"
	].includes(l) || t(o, `${e}: type '${l}' - expected 'quantitative', 'nominal', 'ordinal' or 'temporal'${d(String(l), [
		"quantitative",
		"nominal",
		"ordinal",
		"temporal"
	])}`);
	let u = c === null ? () => s.value : l === "temporal" ? (e) => I(e[c]) : (e) => e[c];
	return {
		field: c,
		value: s.value,
		type: l,
		title: s.title ?? c ?? e,
		format: s.format,
		scale: s.scale ?? {},
		axis: s.axis ?? {},
		get: u,
		priority: s.priority
	};
}
function we(e, n) {
	Array.isArray(n) || Number.isInteger(n) && n > 0 || t("chart()", `${e} ticks are a list of the values to mark, such as [0, 25, 50, 75, 100], or about how many, got ${r(n)}`);
}
function Te(e) {
	try {
		return c.fromInput(e), !0;
	} catch {
		return !1;
	}
}
function Ee(e, t, n, r) {
	if (e === !1 || e === null) return null;
	if (typeof e == "function") return e;
	if (e === void 0 || e === !0) {
		let e = /* @__PURE__ */ new Set();
		return Object.entries(t).filter(([t, n]) => n.field && t !== "key" && !e.has(n.field) && e.add(n.field)).map(([, e]) => e);
	}
	let i = Array.isArray(e) ? e : [e], a = (e) => typeof e == "string" && Object.entries(t).find(([t, n]) => t !== "key" && n.field === e)?.[1];
	return i.map((e) => a(e) || X("tooltip", e, n, r));
}
// src/charts/style.js
var De = "\n/* ticks are bare text: the padding is breathing room, so the overlap the label layout allows never runs them together */\n:where(.phoria-axis-tick) { padding: 0 4px; color: #8b909c; font: 11px/1.2 system-ui, sans-serif; font-variant-numeric: tabular-nums; }\n:where(.phoria-axis-title) { color: #c8ccd4; font: 600 12px/1.2 system-ui, sans-serif; }\n:where(.phoria-value) { padding: 1px 5px; border-radius: 4px; background: rgba(16, 16, 20, 0.72); color: #eee;\n  font: 11px/1.3 system-ui, sans-serif; font-variant-numeric: tabular-nums; }\n:where(.phoria-light.phoria-axis-tick) { color: #5d6370; }\n:where(.phoria-light.phoria-axis-title) { color: #2b2f37; }\n:where(.phoria-light.phoria-value) { background: rgba(255, 255, 255, 0.85); color: #222; }\n:where(.phoria-legend) { position: absolute; display: flex; flex-direction: column; gap: 3px; padding: 8px 10px;\n  border-radius: 8px; background: rgba(20, 20, 24, 0.78); color: #e6e6e6; font: 12px/1.3 system-ui, sans-serif;\n  pointer-events: auto; max-height: calc(100% - 24px); overflow: auto; }\n:where(.phoria-light.phoria-legend) { background: rgba(255, 255, 255, 0.88); color: #222; }\n:where(.phoria-legend-top-right) { top: 12px; right: 12px; }\n:where(.phoria-legend-top-left) { top: 12px; left: 12px; }\n:where(.phoria-legend-bottom-right) { bottom: 12px; right: 12px; }\n:where(.phoria-legend-bottom-left) { bottom: 12px; left: 12px; }\n:where(.phoria-legend-title) { opacity: 0.7; font-size: 11px; margin-bottom: 2px; }\n:where(.phoria-legend-item) { display: flex; align-items: center; gap: 6px; padding: 0; border: 0; background: none;\n  color: inherit; font: inherit; text-align: left; cursor: pointer; }\n:where(.phoria-legend-item.off) { opacity: 0.35; }\n:where(.phoria-legend-swatch) { width: 10px; height: 10px; border-radius: 2px; flex: none; }\n/* a number key is up to 140px tall and gives way in a short view, so the legend never scrolls; its\n   values share one grid cell, so the widest sets the key's width, each raised to its place */\n:where(.phoria-legend-key) { display: flex; gap: 6px; margin: 6px 0; flex: 0 1 140px; min-height: 48px; }\n:where(.phoria-legend-ramp) { width: 10px; border-radius: 2px; flex: none; }\n:where(.phoria-legend-scale) { display: grid; font-size: 11px; font-variant-numeric: tabular-nums; }\n:where(.phoria-legend-scale > span) { grid-area: 1 / 1; align-self: end; position: relative; transform: translateY(50%);\n  white-space: nowrap; opacity: 0.8; }\n";
function Oe() {
	if (typeof document > "u" || document.getElementById("phoria-chart-style")) return;
	let e = document.createElement("style");
	e.id = "phoria-chart-style", e.textContent = De, document.head.prepend(e);
}
// src/charts/Chart.js
var ke = g.filter((e) => ![
	"children",
	"tooltip",
	"highlight"
].includes(e));
function Ae(e) {
	return new Z(e);
}
var Z = class e extends h {
	static type = "chart";
	static get OPTIONS() {
		return g;
	}
	scales = {};
	#e;
	#t = null;
	#n = null;
	#r = "";
	#i;
	#a = null;
	#o = null;
	#s = /* @__PURE__ */ new Set();
	#c = null;
	#l = null;
	#u = null;
	#d = null;
	constructor(e) {
		(!e || typeof e != "object" || Array.isArray(e)) && t("chart()", `expected a spec such as { mark: 'bar', data, x, y }, got ${r(e)}`);
		let n = {}, i = {};
		for (let [t, r] of Object.entries(e)) (ke.includes(t) ? n : i)[t] = r;
		e.children && t("chart()", "a chart makes its own children - add other nodes to a Group beside it"), super(n), Oe(), this.#e = i, this.#i = {}, this.#f(!0), this.onUpdate((e, t) => this.#_(t));
	}
	get spec() {
		let e = this.#t;
		return {
			mark: e.mark,
			channels: e.channels,
			options: e.options
		};
	}
	get data() {
		return this.#e.data;
	}
	get marks() {
		return this.#n ? [...this.#n.nodes] : [];
	}
	update(e) {
		let t = Array.isArray(e) || e && "nodes" in e && "links" in e;
		return this.#e = t ? {
			...this.#e,
			data: e
		} : {
			...this.#e,
			...e
		}, this.#f(!0), this;
	}
	filter(e) {
		return e !== null && typeof e != "function" && t("Chart", `filter() takes (row) => boolean, or null, got ${r(e)}`), this.#c = e, this.#f(!0), this;
	}
	explain() {
		let e = this.#t, t = [
			"x",
			"y",
			"z"
		].filter((e) => this.scales[e]).map((e) => {
			let t = this.scales[e];
			return t.kind === "band" ? `${e} band of ${t.domain.length}` : `${e} ${t.kind} ${t.format(t.domain[0])}-${t.format(t.domain[1])}`;
		}), n = this.#u?.rows.length ?? 0;
		return `Chart (${e.mark}): ${n} of ${e.rows.length} rows shown${t.length ? `; ${t.join(", ")}` : ""}${e.links.length ? `; ${e.links.length} links` : ""}`;
	}
	summary() {
		let e = this.#t, t = e.options;
		if (t.description) return String(t.description);
		let n = [...new Set([
			"x",
			"y",
			"z",
			"color",
			"size"
		].map((t) => e.channels[t]).filter((e) => e?.field).map((e) => e.title))], r = (e, t) => `${e} ${e === 1 ? t : `${t}s`}`, i = `${e.mark} chart of ${r(e.rows.length, "row")}${n.length ? ` by ${n.join(", ")}` : ""}${e.links.length ? ` and ${r(e.links.length, "link")}` : ""}`;
		return t.title ? `${t.title}: ${i}` : i;
	}
	jsonOptions() {
		return { ...this.#e };
	}
	toJSON() {
		let e = super.toJSON();
		return delete e.children, this.#e.highlight === void 0 && delete e.highlight, e;
	}
	clone() {
		let { name: t, position: n, quaternion: r, scale: i, visible: a, pickable: o, highlightWhole: s, onHover: c, onClick: l, showFrom: u, clip: d, onDrag: f, outline: p } = super.cloneOptions(), m = new e({
			...this.#e,
			name: t,
			position: n,
			quaternion: r,
			scale: i,
			visible: a,
			pickable: o,
			highlightWhole: s,
			onHover: c,
			onClick: l,
			showFrom: u,
			clip: d,
			onDrag: f,
			outline: p
		});
		return m.userData = structuredClone(this.userData), m.matrixAutoUpdate = this.matrixAutoUpdate, m.matrixAutoUpdate || m.matrix.copy(this.matrix), m;
	}
	#f(e) {
		let n = ye(this.#e), r = n.options, a = n.channels;
		this.#t = n;
		let o = r.box ?? Ne(n), s = r.theme ?? "dark";
		s !== "dark" && s !== "light" && t("chart()", `theme '${s}' - expected 'dark' or 'light'`);
		let l = r.overlap ?? "dim";
		[
			"dim",
			"hide",
			"show"
		].includes(l) || t("chart()", `overlap '${l}' - expected 'dim', 'hide' or 'show'`);
		let u = n.rows.filter((e) => (!this.#c || this.#c(e)) && (!a.color?.field || !this.#s.has(String(a.color.get(e)))));
		this.scales = Le(n, o);
		let d = this.scales.color, f = c.fromInput(a.color?.field ? L.category[0] : a.color?.value ?? L.category[0], "chart()").toSRGB(), p = n.link.color?.field ? Fe(n.link.color, n.links.map((e) => n.link.color.get(e))) : null;
		Object.assign(this.#i, {
			spec: n,
			box: o,
			theme: s,
			overlap: l,
			scales: this.scales,
			size: this.scales.size ?? null,
			rgb: (e) => d ? d(Ie(n, e)).toSRGB() : f,
			format: $,
			linkColor: (e) => p(e)
		});
		let m = JSON.stringify([
			n.mark,
			Object.entries(a).map(([e, t]) => [
				e,
				t.field,
				t.type
			]),
			o,
			s,
			l,
			r.stack,
			r.layout,
			r.flat,
			Object.keys(n.link)
		]);
		if (m !== this.#r) {
			this.#r = m, this.#n && this.remove(...this.#n.nodes), this.#n = Me(n.mark, this.#i);
			for (let e of this.#n.nodes) this.add(e);
			this.#l = this.#u = null, this.#d = null;
		}
		this.#a && this.remove(this.#a), this.#a = n.mark === "network" && r.layout !== "given" ? null : this.add(S({
			box: o,
			theme: s,
			overlap: l,
			axes: ze(n, this.scales)
		})), this.#o && this.remove(this.#o), this.#o = r.title ? this.add(new i({
			text: String(r.title),
			position: [
				0,
				o[1] * 1.12,
				-o[2] / 2
			],
			className: `phoria-axis-title phoria-${s}`,
			overlap: "show"
		})) : null, this.#p(n, s), this.tooltip = n.tooltip === null && !n.link.tooltip ? null : (e) => this.#m(e);
		let h = r.highlight;
		this.highlight = h === !1 ? null : c.fromInput(h === void 0 || h === "neighbours" || h === "node" ? "#ffffff" : h, "chart()"), this.#h(this.#n.layout(u), e && r.transition !== !1);
	}
	#p(e, n) {
		this.overlay?.remove(), this.overlay = null;
		let i = e.channels.color, a = e.options.legend;
		if (!i?.field || a === !1 || !this.scales.color || typeof document > "u") return;
		let o = ie(this.scales.color, {
			title: i.title,
			theme: n,
			position: a?.position,
			ticks: a?.ticks,
			format: (e) => $(i, e),
			onToggle: (e, t) => {
				t ? this.#s.delete(String(e)) : this.#s.add(String(e)), this.#f(!0);
			}
		});
		o.querySelectorAll(".phoria-legend-item").forEach((e, t) => {
			this.#s.has(String(this.scales.color?.domain[t])) && e.classList.add("off");
		});
		let s = a?.container;
		if (s) {
			let e = typeof s == "string" ? document.querySelector(s) : s;
			e || t("chart()", `legend container ${r(s)} not found`), o.classList.remove(`phoria-legend-${a?.position ?? "top-right"}`), Object.assign(o.style, {
				position: "static",
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				columnGap: "12px",
				maxHeight: "none",
				overflow: "visible"
			}), e.replaceChildren(o);
		} else this.overlay = o;
	}
	#m(e) {
		let t = this.#t, n = e.datum;
		if (!n) return null;
		let r = this.#n?.tooltipRows?.(e) === "link", i = r ? t.link.tooltip : t.tooltip;
		if (typeof i == "function") return i(n, e);
		if (r && (!i || !i.length)) {
			let e = t.options.source ?? "source", r = t.options.target ?? "target";
			return {
				title: `${n[e]} → ${n[r]}`,
				rows: Object.fromEntries(Object.entries(t.link).filter(([e, t]) => e !== "tooltip" && t.field).map(([, e]) => [e.title, $(e, e.get(n))]))
			};
		}
		if (!i || !i.length) return null;
		let a = i.find((e) => e.type === "nominal" || e.type === "ordinal"), o = Object.fromEntries(i.filter((e) => e !== a).map((e) => [e.title, $(e, e.get(n))]));
		return a ? {
			title: $(a, a.get(n)),
			rows: o
		} : { rows: o };
	}
	#h(e, t) {
		let n = this.#n, r = this.#u, i = this.#l;
		if (!t) return this.#g(e.state, e, e);
		let { stride: a } = e, o, s, c = e;
		if (e.keys && n.enter) {
			let t = new Map(r?.keys?.map((e, t) => [e, t]) ?? []), l = new Set(e.keys), u = new Set(this.#d?.final.keys ?? r?.keys), d = r?.keys ? r.keys.map((e, t) => t).filter((e) => {
				let t = r.keys[e];
				return !l.has(t) && u.has(t);
			}) : [], f = e.keys.length + d.length;
			o = new Float32Array(f * a), s = new Float32Array(f * a), s.set(e.state), e.keys.forEach((s, c) => {
				let l = t.get(s), u = o.subarray(c * a, (c + 1) * a);
				l !== void 0 && i && r?.stride === a ? u.set(i.subarray(l * a, (l + 1) * a)) : (u.set(e.state.subarray(c * a, (c + 1) * a)), n.enter(u));
			}), d.forEach((t, r) => {
				let c = e.keys.length + r;
				o.set(i.subarray(t * a, (t + 1) * a), c * a), s.set(i.subarray(t * a, (t + 1) * a), c * a), n.enter(s.subarray(c * a, (c + 1) * a));
			}), c = {
				...e,
				rows: [...e.rows, ...d.map((e) => r.rows[e])],
				keys: [...e.keys, ...d.map((e) => r.keys[e])],
				state: s
			};
		} else if (r && i && i.length === e.state.length && r.stride === a && je(r.shape, e.shape)) o = i.slice(), s = e.state;
		else return this.#g(e.state, e, e);
		this.#d = {
			from: o,
			to: s,
			t: 0,
			frame: c,
			final: e
		}, this.#g(o, c, c);
	}
	#g(e, t, n) {
		this.#n.apply(e, t), this.#l = e.slice(), this.#u = n;
	}
	#_(e) {
		let n = this.root.motionReduced === !0;
		n || this.#n?.tick?.(e);
		let r = this.#d;
		if (!r) return;
		let i = this.#e.transition ?? {}, a = i.duration ?? .5, s = o[i.ease ?? "out"];
		s || t("chart()", `transition ease '${i.ease}' - expected ${Object.keys(o).map((e) => `'${e}'`).join(", ")}`), r.t = n ? 1 : Math.min(1, r.t + e / a);
		let c = s(r.t), l = new Float32Array(r.from.length);
		for (let e = 0; e < l.length; e++) l[e] = r.from[e] + (r.to[e] - r.from[e]) * c;
		if (r.t < 1) return this.#g(l, r.frame, r.frame);
		this.#d = null, this.#g(r.final.state, r.final, r.final);
	}
};
m(Z);
function je(e, t) {
	let n = (e) => JSON.stringify(e ? {
		lengths: e.lengths,
		nx: e.nx,
		nz: e.nz
	} : null);
	return n(e) === n(t);
}
function Me(e, t) {
	return e === "bar" ? oe(t) : e === "point" ? se(t) : e === "line" || e === "area" ? ce(t, e === "area") : e === "surface" ? le(t) : fe(t);
}
function Ne(e) {
	let t = !!e.channels.z;
	return e.mark === "surface" ? [
		10,
		4,
		10
	] : e.mark === "network" ? e.options.flat ? [
		12,
		1,
		12
	] : [
		12,
		8,
		12
	] : e.mark === "point" ? [
		8,
		6,
		t ? 8 : 1.6
	] : [
		10,
		6,
		t ? 6 : 1.6
	];
}
function Q(e) {
	let t = Infinity, n = -Infinity;
	for (let r of e) {
		let e = +r;
		Number.isFinite(e) && (e < t && (t = e), e > n && (n = e));
	}
	return t === Infinity ? [0, 1] : [t, n];
}
function Pe(e) {
	return {
		scheme: e.scale.scheme,
		range: e.scale.range
	};
}
function Fe(e, t, n) {
	return e.type === "quantitative" ? R({
		kind: "sequential",
		domain: e.scale.domain ?? Q(t),
		...Pe(e),
		scheme: e.scale.scheme ?? n
	}) : R({
		kind: "categorical",
		domain: e.scale.domain ?? z(t),
		...Pe(e)
	});
}
function Ie(e, t) {
	let n = e.channels.color;
	return n?.field ? n.get(t) : e.channels.y.get(t);
}
function Le(e, t) {
	let [n, r, i] = t, a = e.channels, o = e.rows, s = {}, c = {
		x: [-n / 2, n / 2],
		y: [0, r],
		z: [i / 2, -i / 2]
	};
	for (let t of [
		"x",
		"y",
		"z"
	]) {
		let n = a[t];
		if (!n?.field) continue;
		let r = n.axis && n.axis.ticks, i = [...o.map((e) => n.get(e)), ...Array.isArray(r) ? r : []], l = {
			range: c[t],
			format: (n.axis && n.axis.format) ?? n.format
		};
		if (n.type === "nominal" || n.type === "ordinal" || e.mark === "bar" && t !== "y") s[t] = re({
			domain: n.scale.domain ?? z(i),
			padding: .2,
			...l
		});
		else if (n.type === "temporal") {
			let [e, r] = Q(i.map((e) => I(e).getTime()));
			s[t] = ne({
				domain: n.scale.domain ?? [e, r],
				...l
			});
		} else {
			let r = n.scale.domain ?? Q(i);
			t === "y" && e.options.stack && (r = Q([0, ...Re(e)])), s[t] = n.scale.type === "log" ? A({
				domain: r,
				...l
			}) : k({
				domain: r,
				nice: n.scale.nice ?? !0,
				zero: n.scale.zero ?? (t === "y" && ["bar", "area"].includes(e.mark)),
				...l
			});
		}
	}
	let l = a.color;
	if (l?.field || e.mark === "surface") {
		let t = l?.field ? l : a.y, n = e.options.legend?.ticks;
		s.color = Fe(t, [...o.map((e) => t.get(e)), ...t.type === "quantitative" && Array.isArray(n) ? n : []], e.mark === "surface" && !l?.field ? "viridis" : void 0);
	}
	let u = a.size;
	if (u?.field) {
		let n = Math.min(...t) / 40, r = e.mark === "network" ? [n * .6, n * 1.8] : [n * .5, n * 2];
		s.size = k({
			domain: Q(o.map((e) => u.get(e))),
			range: u.scale.range ?? r
		});
	}
	return s;
}
function Re(e) {
	let t = e.channels, n = /* @__PURE__ */ new Map();
	for (let r of e.rows) {
		let e = Number(t.y.get(r)) || 0, i = B(t, r, e);
		n.set(i, (n.get(i) ?? 0) + e);
	}
	return [...n.values()];
}
function ze(e, t) {
	let n = {};
	for (let r of [
		"x",
		"y",
		"z"
	]) {
		let i = e.channels[r];
		t[r] && i && (n[r] = {
			scale: t[r],
			channel: i,
			title: (i.axis && i.axis.title) ?? i.title
		});
	}
	return n;
}
var Be = new Intl.NumberFormat(void 0, { maximumFractionDigits: 2 }), Ve = new Intl.NumberFormat(void 0, {
	notation: "compact",
	maximumFractionDigits: 1
}), He = new Intl.DateTimeFormat(void 0, {
	year: "numeric",
	month: "short",
	day: "numeric"
});
function $(e, t) {
	if (t == null) return "";
	let n = e.format;
	return typeof n == "function" ? String(n(t)) : t instanceof Date ? n ? new Intl.DateTimeFormat(void 0, n).format(t) : He.format(t) : typeof t == "number" ? n ? new Intl.NumberFormat(void 0, n).format(t) : (Math.abs(t) >= 1e4 ? Ve : Be).format(t) : String(t);
}
export { Z as Chart, L as SCHEMES, Ae as chart, $ as formatValue, re as scaleBand, R as scaleColor, k as scaleLinear, A as scaleLog, ne as scaleTime, T as tickStep };

//# sourceMappingURL=charts.js.map