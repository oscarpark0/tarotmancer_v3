import { At as e, Ct as t, Dt as n, Et as r, Mt as i, Ot as a, Tt as o, V as s, dt as c, pt as l, r as u } from "./core.js";
// src/motion/Timeline.js
var d = ["loop", "speed"], f = {
	repeat: "use 'loop: true'",
	autoplay: "a timeline plays from the start - call pause() to hold it"
}, p = ["label", "ease"], m = {
	name: "use 'label'",
	easing: "use 'ease'"
}, h = class {
	static OPTIONS = d;
	static HINTS = f;
	#e = [];
	#t = 0;
	#n = !0;
	#r = -1;
	#i = [];
	loop = !1;
	speed = 1;
	constructor(e = {}) {
		n("Timeline", e, d, f), e.loop !== void 0 && (this.loop = !!e.loop), e.speed !== void 0 && (this.speed = o("Timeline", "speed", e.speed));
	}
	add(t, r, i = {}) {
		o("Timeline.add()", "duration", t), t < 0 && e("Timeline.add()", `'duration' is seconds, 0 or more, got ${t}`), typeof r != "function" && e("Timeline.add()", `takes (duration, (t) => { ... }), got ${a(r)} for the step`), n("Timeline.add()", i, p, m);
		let c = typeof i.ease == "function" ? i.ease : s[i.ease ?? "linear"];
		return c || e("Timeline.add()", `ease '${i.ease}' - expected ${Object.keys(s).map((e) => `'${e}'`).join(", ")}, or a function`), this.#e.push({
			start: this.duration,
			duration: t,
			run: r,
			label: i.label ?? "",
			ease: c
		}), this.#a(), this;
	}
	get duration() {
		let e = this.#e[this.#e.length - 1];
		return e ? e.start + e.duration : 0;
	}
	get time() {
		return this.#t;
	}
	get step() {
		return this.#r;
	}
	get label() {
		return this.#e[this.#r]?.label ?? "";
	}
	get steps() {
		return this.#e.map(({ start: e, duration: t, label: n }) => ({
			start: e,
			duration: t,
			label: n
		}));
	}
	get playing() {
		return this.#n;
	}
	play() {
		return this.#t >= this.duration && !this.loop && (this.#t = 0), this.#n = !0, this;
	}
	pause() {
		return this.#n = !1, this;
	}
	seek(e) {
		return this.#t = Math.min(this.duration, Math.max(0, o("Timeline.seek()", "time", e))), this.#a(), this;
	}
	seekStep(t) {
		let n = typeof t == "string" ? this.#e.findIndex((e) => e.label === t) : t, r = this.#e[n];
		return r || e("Timeline.seekStep()", `no step ${a(t)} - there are ${this.#e.length}${typeof t == "string" ? `: ${this.#e.map((e) => `'${e.label}'`).join(", ")}` : ""}`), this.seek(r.start);
	}
	onStep(t) {
		return typeof t != "function" && e("Timeline.onStep()", `takes (index, label) => { ... }, got ${a(t)}`), this.#i.push(t), this.#r >= 0 && t(this.#r, this.label), this;
	}
	update(e) {
		if (this.#n && this.#e.length) {
			let t = this.#t + e * this.speed;
			t >= this.duration && (this.loop && this.duration > 0 ? t %= this.duration : (t = this.duration, this.#n = !1)), this.#t = t;
		}
		return this.#a(), this;
	}
	#a() {
		let e = this.#e, t = this.#t, n = e.length - 1;
		for (let r = 0; r < e.length; r++) if (t < e[r].start + e[r].duration || e[r].duration === 0 && t <= e[r].start) {
			n = r;
			break;
		}
		for (let t = e.length - 1; t > n; t--) e[t].run(0);
		for (let r = 0; r <= n; r++) {
			let n = e[r], i = n.duration > 0 ? Math.min(1, Math.max(0, (t - n.start) / n.duration)) : +(t >= n.start);
			n.run(n.ease(i));
		}
		if (n !== this.#r) {
			this.#r = n;
			for (let t of this.#i) t(n, e[n]?.label ?? "");
		}
	}
}, g = [
	"-z",
	"+z",
	"-y",
	"+y",
	"-x",
	"+x"
], _ = ["forward", "up"], v = { nose: "use 'forward' - which of the model's axes is its nose" }, y = [
	"orient",
	"forward",
	"up"
], b = {
	rotate: "use 'orient'",
	lookAhead: "the node faces along the curve - orient: false leaves it as it is",
	nose: "use 'forward' - which of the model's axes is its nose"
}, x = {
	"-z": null,
	"+z": [[
		0,
		1,
		0
	], Math.PI],
	"-y": [[
		1,
		0,
		0
	], Math.PI / 2],
	"+y": [[
		1,
		0,
		0
	], -Math.PI / 2],
	"-x": [[
		0,
		1,
		0
	], -Math.PI / 2],
	"+x": [[
		0,
		1,
		0
	], Math.PI / 2]
};
function S(e, a, o = {}) {
	n("face()", o, _, v);
	let s = o.forward === void 0 ? "-z" : r("face()", "forward", o.forward, g), u = e.position.clone().add(t.fromInput(a, "face()")), d = o.up === void 0 ? void 0 : t.fromInput(o.up, "face() up"), f = e.parent;
	if (f) {
		let n = f.updateWorld().worldMatrix;
		d &&= i(d, d.add(e.position), n).sub(i(new t(), e.position, n)), i(u, u, n);
	}
	e.lookAt(u, d);
	let p = x[s];
	if (p) {
		let t = l(/* @__PURE__ */ new Float32Array(4), p[0], p[1]);
		e.quaternion.copy(c(/* @__PURE__ */ new Float32Array(4), e.quaternion, t));
	}
	return e;
}
function C(t, r, i, o = {}) {
	return r instanceof u || e("follow()", `takes (node, curve, t) - make the curve with curve([...points]) or ellipse({...}), got ${a(r)}`), n("follow()", o, y, b), t.position.copy(r.at(i)), o.orient !== !1 && S(t, r.tangentAt(i), {
		forward: o.forward,
		up: o.up
	}), t;
}
function w(t, n) {
	let r = t?.geometry;
	r && t.drawMode === "lines" || e("reveal()", `takes a Lines node, got ${a(t)}`);
	let i = r.vertexCount / 2;
	return r.drawCount = Math.round(Math.min(1, Math.max(0, n)) * i) * 2, t.visible = r.drawCount > 0, t;
}
export { s as EASES, h as Timeline, S as face, C as follow, w as reveal };

//# sourceMappingURL=motion.js.map