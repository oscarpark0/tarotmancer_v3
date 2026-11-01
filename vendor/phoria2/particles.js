import { At as e, Ct as t, Dt as n, Ft as r, Ot as i, Tt as a, _t as o, at as s, ct as c, it as l, tt as u } from "./core.js";
// src/particles/Emitter.js
var d = [
	"origin",
	"originSpread",
	"velocity",
	"velocitySpread",
	"lifetime",
	"color"
], f = [
	...u.OPTIONS,
	...d,
	"max",
	"rate",
	"gravity",
	"drag",
	"follow",
	"onParticle"
], p = {
	count: "use 'max' for the most particles alive at once, 'rate' for how many are born per second",
	lifetimeRnd: "give 'lifetime' a [min, max] range",
	velocityRnd: "use 'velocitySpread'",
	positionRnd: "use 'originSpread'"
}, m = {
	size: .1,
	vertexColors: !0,
	blending: "additive",
	depthWrite: !1
}, h = /* @__PURE__ */ new Float32Array(16), g = class extends u {
	static type = "emitter";
	static get OPTIONS() {
		return f;
	}
	static get HINTS() {
		return {
			...u.HINTS,
			...p
		};
	}
	rate = 100;
	gravity = new t();
	drag = 0;
	origin = new t();
	originSpread = 0;
	velocity = new t(0, 1, 0);
	velocitySpread = 0;
	lifetime = [1, 1];
	follow = null;
	onParticle = null;
	#e;
	#t = 0;
	#n = 0;
	#r;
	#i;
	#a;
	#o = [[[
		1,
		1,
		1
	]]];
	#s = /* @__PURE__ */ new Map();
	#c;
	#l = 0;
	#u = null;
	#d = {
		position: new t(),
		velocity: new t(),
		age: 0,
		lifetime: 0
	};
	constructor(t = {}) {
		t?.geometry !== void 0 && e("Emitter", "an Emitter makes its own geometry - size it with 'max'");
		let n = t?.max ?? 1e3;
		(!Number.isInteger(n) || n < 1) && e("Emitter", `'max' must be a whole number of 1 or more, got ${i(n)}`);
		let r = t?.material;
		r === void 0 || r instanceof s || r && typeof r == "object" && !Array.isArray(r) || e("Emitter", `'material' is a Material or material options such as { size: 0.2 }, got ${i(r)}`);
		let a = r instanceof s ? r : {
			...m,
			...r
		}, o = new c({
			positions: new Float32Array(n * 3),
			colors: new Float32Array(n * 3)
		});
		o.drawCount = 0, super({
			...t,
			geometry: o,
			material: a
		}), this.#e = n, this.#r = new Float32Array(n * 3), this.#i = new Float32Array(n), this.#a = new Float32Array(n), this.#c = new Uint8Array(n), t.frustumCulled === void 0 && (this.frustumCulled = !1), this.#v(t), this.#_(t), this.onUpdate((e, t) => this.step(t));
	}
	set(t) {
		let n = [
			...d,
			"rate",
			"gravity",
			"drag",
			"follow",
			"onParticle"
		];
		for (let r of Object.keys(t ?? {})) n.includes(r) || e("Emitter", `set() doesn't take '${r}' - it takes ${n.join(", ")}`);
		return this.#v(t), this.#_(t), this;
	}
	get max() {
		return this.#e;
	}
	get count() {
		return this.#t;
	}
	set color(e) {
		this.#o[0] = y(e);
	}
	get color() {
		return this.#o[0].map((e) => [...e]);
	}
	burst(t, n = {}) {
		for (let t of Object.keys(n)) d.includes(t) || e("Emitter", `burst() doesn't take '${t}' - it takes ${d.join(", ")}`);
		let { color: r, ...i } = n, a = this.#y();
		this.#_(i), r !== void 0 && (this.#l = this.#b(y(r)));
		let o = this.origin.clone();
		for (let e = 0; e < t; e++) this.#f(o, o, 0);
		return this.#_(a), this.#l = 0, this.#h(), this;
	}
	clear() {
		return this.#t = 0, this.#n = 0, this.#h(), this;
	}
	step(e) {
		if (e <= 0) return;
		let t = this.geometry.positions, n = this.#r, r = this.#i, i = this.#a, a = this.gravity, o = Math.exp(-this.drag * e), s = this.onParticle, c = this.#d;
		for (let l = 0; l < this.#t;) {
			let u = r[l] += e;
			if (u >= i[l]) {
				this.#p(l);
				continue;
			}
			let d = l * 3;
			for (let r = 0; r < 3; r++) n[d + r] = (n[d + r] + a[r] * e) * o, t[d + r] += n[d + r] * e;
			if (this.#m(l, u / i[l]), s) {
				if (c.position.set(t[d], t[d + 1], t[d + 2]), c.velocity.set(n[d], n[d + 1], n[d + 2]), c.age = u, c.lifetime = i[l], s(c) === !1) {
					this.#p(l);
					continue;
				}
				t.set(c.position, d), n.set(c.velocity, d);
			}
			l++;
		}
		let l = this.#g(), u = this.#u ?? l;
		this.#n += this.rate * e;
		let d = Math.floor(this.#n);
		this.#n -= d;
		for (let t = 0; t < d; t++) this.#f(u, l, (t + Math.random()) / d * e);
		this.#u = l.clone(), this.#h();
	}
	cloneOptions() {
		let e = super.cloneOptions();
		return delete e.geometry, {
			...e,
			...this.#y(),
			max: this.#e,
			rate: this.rate,
			gravity: this.gravity.clone(),
			drag: this.drag,
			follow: this.follow,
			onParticle: this.onParticle,
			color: this.color
		};
	}
	jsonOptions() {
		let e = super.jsonOptions();
		return delete e.geometry, {
			...e,
			max: this.#e,
			rate: this.rate,
			gravity: this.gravity.toArray(),
			drag: this.drag,
			origin: this.origin.toArray(),
			originSpread: this.originSpread,
			velocity: this.velocity.toArray(),
			velocitySpread: typeof this.velocitySpread == "number" ? this.velocitySpread : this.velocitySpread.toArray(),
			lifetime: [...this.lifetime],
			color: this.#o[0].map((e) => new o().setSRGB(e[0], e[1], e[2]).toJSON())
		};
	}
	#f(e, t, n) {
		if (this.#t >= this.#e) return;
		let r = this.#t++, i = r * 3, a = this.geometry.positions, o = this.#r, s = Math.random(), c = b(this.originSpread), l = this.velocitySpread, u = typeof l == "number" ? b(l) : [
			(Math.random() * 2 - 1) * l[0],
			(Math.random() * 2 - 1) * l[1],
			(Math.random() * 2 - 1) * l[2]
		];
		for (let r = 0; r < 3; r++) o[i + r] = this.velocity[r] + u[r], a[i + r] = e[r] + (t[r] - e[r]) * s + c[r] + o[i + r] * n;
		let [d, f] = this.lifetime;
		this.#a[r] = d + Math.random() * (f - d), this.#i[r] = n, this.#c[r] = this.#l, this.#m(r, n / this.#a[r]);
	}
	#p(e) {
		let t = --this.#t;
		if (e === t) return;
		let n = this.geometry.positions, r = this.geometry.colors, i = this.#r;
		n.copyWithin(e * 3, t * 3, t * 3 + 3), r.copyWithin(e * 3, t * 3, t * 3 + 3), i.copyWithin(e * 3, t * 3, t * 3 + 3), this.#i[e] = this.#i[t], this.#a[e] = this.#a[t], this.#c[e] = this.#c[t];
	}
	#m(e, t) {
		let n = this.geometry.colors, r = this.#o[this.#c[e]];
		if (r.length === 1) {
			n.set(r[0], e * 3);
			return;
		}
		let i = Math.min(Math.max(t, 0), 1) * (r.length - 1), a = Math.min(Math.floor(i), r.length - 2), o = i - a, s = r[a], c = r[a + 1];
		n[e * 3] = s[0] + (c[0] - s[0]) * o, n[e * 3 + 1] = s[1] + (c[1] - s[1]) * o, n[e * 3 + 2] = s[2] + (c[2] - s[2]) * o;
	}
	#h() {
		this.geometry.drawCount = this.#t, this.geometry.needsUpdate();
	}
	#g() {
		if (!this.follow) return this.origin;
		let e = this.follow.worldPosition;
		return r(h, this.worldMatrix) ? this.origin.copy(e).applyMatrix4(h) : this.origin;
	}
	#_(e) {
		let n = "Emitter";
		if (e.origin !== void 0 && this.origin.copy(e.origin, n), e.originSpread !== void 0 && (this.originSpread = Math.max(0, a(n, "originSpread", e.originSpread))), e.velocity !== void 0 && this.velocity.copy(e.velocity, n), e.velocitySpread !== void 0) {
			let r = e.velocitySpread;
			typeof r == "number" ? this.velocitySpread = a(n, "velocitySpread", r) : this.velocitySpread instanceof t ? this.velocitySpread.copy(r, n) : this.velocitySpread = t.fromInput(r, n);
		}
		e.lifetime !== void 0 && (this.lifetime = v(e.lifetime)), e.color !== void 0 && (this.#o[0] = y(e.color));
	}
	#v(e) {
		let t = "Emitter";
		e.rate !== void 0 && (this.rate = Math.max(0, a(t, "rate", e.rate))), e.gravity !== void 0 && this.gravity.copy(e.gravity, t), e.drag !== void 0 && (this.drag = Math.max(0, a(t, "drag", e.drag))), e.follow !== void 0 && (this.follow = _(e.follow)), e.onParticle !== void 0 && (this.onParticle = e.onParticle);
	}
	#y() {
		return {
			origin: this.origin.clone(),
			originSpread: this.originSpread,
			velocity: this.velocity.clone(),
			velocitySpread: typeof this.velocitySpread == "number" ? this.velocitySpread : this.velocitySpread.clone(),
			lifetime: [...this.lifetime]
		};
	}
	#b(e) {
		let t = e.flat().join(), n = this.#s.get(t);
		if (n === void 0) {
			n = this.#o.length < 256 ? this.#o.length : 1 + this.#s.size % 255;
			for (let [e, t] of this.#s) t === n && this.#s.delete(e);
			this.#s.set(t, n);
		}
		return this.#o[n] = e, n;
	}
};
function _(t) {
	return t === null || t instanceof l ? t : e("Emitter", `'follow' must be a node, got ${i(t)}`);
}
function v(t) {
	let n = typeof t == "number" ? [t, t] : t;
	return Array.isArray(n) && n.length === 2 && n.every((e) => typeof e == "number" && e > 0) || e("Emitter", `'lifetime' must be seconds above 0, or a [min, max] range, got ${i(t)}`), [Math.min(n[0], n[1]), Math.max(n[0], n[1])];
}
function y(t) {
	let n = Array.isArray(t) && !(t.length === 3 && t.every((e) => typeof e == "number")) ? t : [t];
	return n.length || e("Emitter", "'color' needs at least one colour"), n.map((e) => o.fromInput(e, "Emitter").toSRGB());
}
function b(e) {
	if (!e) return [
		0,
		0,
		0
	];
	let t, n, r;
	do
		t = Math.random() * 2 - 1, n = Math.random() * 2 - 1, r = Math.random() * 2 - 1;
	while (t * t + n * n + r * r > 1);
	return [
		t * e,
		n * e,
		r * e
	];
}
// src/particles/Body.js
var x = [
	"velocity",
	"gravity",
	"drag"
], S = {
	impulse: "call body.impulse([x, y, z]) after creating it",
	mass: "a Body has no mass - impulse() changes velocity directly"
}, C = class {
	static OPTIONS = x;
	static HINTS = S;
	velocity = new t();
	gravity = new t();
	drag = 0;
	constructor(e = {}) {
		n("Body", e, x, S), e.velocity !== void 0 && this.velocity.copy(e.velocity, "Body"), e.gravity !== void 0 && this.gravity.copy(e.gravity, "Body"), e.drag !== void 0 && (this.drag = Math.max(0, a("Body", "drag", e.drag)));
	}
	impulse(e) {
		return this.velocity.add(t.fromInput(e, "Body")), this;
	}
	update = (e, t) => {
		let n = this.velocity, r = Math.exp(-this.drag * t);
		for (let i = 0; i < 3; i++) n[i] = (n[i] + this.gravity[i] * t) * r, e.position[i] += n[i] * t;
	};
};
export { C as Body, g as Emitter };

//# sourceMappingURL=particles.js.map