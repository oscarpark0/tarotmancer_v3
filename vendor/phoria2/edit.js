import { At as e, Ct as t, Dt as n, Et as r, Ot as i, Tt as a, et as o, lt as s, nt as c, u as l, v as u } from "./core.js";
// src/edit/TransformHandle.js
var d = [
	"view",
	"target",
	"move",
	"turn",
	"snap",
	"size",
	"dragTarget",
	"history",
	"constrain",
	"onChange"
], f = {
	object: "use 'target'",
	mode: "use 'move' ('xz', 'xyz' or false) and 'turn' (true or false)",
	rotate: "use 'turn' - a ring for turning about the vertical",
	translate: "use 'move': 'xz', 'xyz' or false",
	translationSnap: "use snap: { move, turn }",
	rotationSnap: "use snap: { move, turn }",
	onDrag: "use 'onChange': (target, phase) => ..."
}, p = {
	x: "#ff5a52",
	y: "#5ad07a",
	z: "#4f8cff",
	ring: "#ffcc33",
	disc: "#f2f2f2"
}, m = 1e5, h = class {
	node = new c({
		name: "transform-handle",
		highlight: "#ffffff"
	});
	move = "xz";
	turn = !0;
	snap = null;
	size = 120;
	dragTarget = !0;
	history = null;
	constrain = null;
	onChange = null;
	#e;
	#t = null;
	#n = null;
	#r = {};
	#i = null;
	constructor(t) {
		if (n("TransformHandle", t, d, f), t?.view?.scene || e("TransformHandle", "'view' is required - the View it is used in"), this.#e = t.view, t.move !== void 0 && (this.move = t.move !== !1 && r("TransformHandle", "move", t.move, ["xz", "xyz"])), t.turn !== void 0 && (this.turn = _("turn", t.turn)), t.dragTarget !== void 0 && (this.dragTarget = _("dragTarget", t.dragTarget)), t.size !== void 0 && (this.size = a("TransformHandle", "size", t.size), this.size > 0 || e("TransformHandle", `'size' is in pixels, above 0, got ${this.size}`)), t.snap != null) {
			n("TransformHandle", t.snap, ["move", "turn"], {}, "snap");
			let r = (n) => {
				let r = t.snap?.[n];
				return r === void 0 ? 0 : (typeof r == "number" && r >= 0 || e("TransformHandle", `'snap.${n}' must be a step of 0 or more, got ${i(r)}`), r);
			};
			this.snap = {
				move: r("move"),
				turn: r("turn")
			};
		}
		for (let n of ["constrain", "onChange"]) {
			let r = t[n];
			r != null && (typeof r != "function" && e("TransformHandle", `'${n}' must be a function, got ${i(r)}`), this[n] = r);
		}
		t.history != null && (typeof t.history.transform != "function" && e("TransformHandle", `'history' must be a History, got ${i(t.history)}`), this.history = t.history), this.#a(), this.node.visible = !1, this.node.onUpdate(() => this.#o()), this.#e.scene.add(this.node), t.target != null && (this.target = t.target);
	}
	get target() {
		return this.#t;
	}
	set target(e) {
		e !== this.#t && (this.#n && (this.#n.node.onDrag = this.#n.onDrag), this.#n = null, this.#t = e ?? null, this.node.visible = !!e, e && this.dragTarget && (this.#n = {
			node: e,
			onDrag: e.onDrag
		}, e.onDrag = (e) => this.#s("free", e)), e && this.#o(), this.#e.invalidate());
	}
	dispose() {
		this.target = null, this.node.removeFromParent();
	}
	#a() {
		let e = (e) => ({
			color: e,
			unlit: !0,
			depthTest: !1,
			depthWrite: !1,
			opacity: .95
		}), t = (t, n, r, i = [
			0,
			0,
			0
		], a = t) => {
			let s = this.node.add(new o({
				name: t,
				geometry: n,
				material: e(r),
				position: i,
				renderOrder: m,
				castShadow: !1
			}));
			return s.onDrag = (e) => this.#s(a, e), this.#r[t] = s, s;
		};
		t("ring", u({
			radius: 1,
			tube: .035,
			segments: 72,
			tubeSegments: 8
		}), p.ring);
		let n = (e, n) => {
			let r = (t) => e === "x" ? [
				t,
				0,
				0
			] : e === "y" ? [
				0,
				t,
				0
			] : [
				0,
				0,
				t
			];
			t(`${e}-shaft`, l({
				radius: .035,
				height: .4,
				segments: 10,
				axis: e
			}), n, r(1.3), e), t(`${e}-tip`, l({
				radius: .1,
				radiusTop: 0,
				height: .22,
				segments: 16,
				axis: e
			}), n, r(1.6), e);
		};
		n("x", p.x), n("z", p.z), n("y", p.y), t("disc", l({
			radius: .16,
			height: .02,
			segments: 32
		}), p.disc, [
			0,
			0,
			0
		], "free");
	}
	#o() {
		let e = this.#t;
		if (!e) return;
		for (let [e, t] of Object.entries(this.#r)) {
			let n = e[0];
			t.visible = e === "ring" ? this.turn : e === "disc" ? !!this.move : !!this.move && (n !== "y" || this.move === "xyz");
		}
		e.updateWorld();
		let t = e.worldPosition;
		this.node.position.copy(t);
		let n = this.#e, r = n.camera, i = n.canvas.clientHeight || 1, a = r.constructor.type === "orthographic-camera" ? r.height / i : 2 * r.position.distanceTo(t) * Math.tan(r.fov * Math.PI / 360) / i, o = e.bounds, s = o.isEmpty() ? 0 : Math.hypot(o.max[0] - o.min[0], o.max[2] - o.min[2]) / 2, c = Math.max(this.size / 2 * a, s * 1.1);
		this.node.scale.set(c, c, c);
	}
	#s(e, n) {
		let r = this.#t;
		if (!r) return;
		if (n.phase === "start") {
			let i = r.worldPosition;
			if (e === "y") {
				let e = this.#e.camera.position, r = new t(e[0] - i[0], 0, e[2] - i[2]);
				n.plane = {
					normal: r.len() > 1e-6 ? r.normalize() : new t(0, 0, 1),
					point: i.clone()
				};
			} else n.plane = {
				normal: new t(0, 1, 0),
				point: i.clone()
			};
			let a = n.ray.intersectPlane(n.plane.normal, n.plane.point), o = a === null ? i : n.ray.at(a);
			this.#i = {
				position: r.position.clone(),
				rotation: g(r.quaternion),
				quaternion: r.quaternion.clone(),
				angle: Math.atan2(o[2] - i[2], o[0] - i[0]),
				done: this.history ? this.history.transform(r) : null
			}, this.onChange?.(r, "start");
			return;
		}
		let i = this.#i;
		if (!i) return;
		if (n.phase === "end") {
			i.done?.(e === "ring" ? "Turn" : "Move"), this.#i = null, this.onChange?.(r, "end");
			return;
		}
		if (!n.point) return;
		let a = {
			position: i.position.clone(),
			rotation: i.rotation
		};
		if (e === "ring") {
			let e = this.node.position, t = Math.atan2(n.point[2] - e[2], n.point[0] - e[0]), r = i.rotation - (t - i.angle);
			this.snap?.turn && (r = Math.round(r / this.snap.turn) * this.snap.turn), a.rotation = r;
		} else {
			let t = n.delta, r = e === "x" ? [
				t[0],
				0,
				0
			] : e === "z" ? [
				0,
				0,
				t[2]
			] : e === "y" ? [
				0,
				t[1],
				0
			] : [
				t[0],
				0,
				t[2]
			];
			a.position.add(r);
			let i = this.snap?.move;
			if (i) for (let e = 0; e < 3; e++) r[e] !== 0 && (a.position[e] = Math.round(a.position[e] / i) * i);
		}
		let o = this.constrain ? this.constrain(a, r) : a;
		if (o === null) return;
		let c = o ?? a;
		r.position.copy(c.position);
		let l = new s().setFromAxisAngle([
			0,
			1,
			0
		], c.rotation - i.rotation);
		r.quaternion.copy(l.multiply(i.quaternion)), this.#o(), this.onChange?.(r, "move");
	}
};
function g(e) {
	let [t, n, r, i] = e;
	return Math.atan2(-2 * (t * r - n * i), 1 - 2 * (n * n + r * r));
}
function _(t, n) {
	return typeof n != "boolean" && e("TransformHandle", `'${t}' must be true or false, got ${i(n)}`), n;
}
// src/edit/History.js
var v = ["limit", "onChange"], y = {
	max: "use 'limit'",
	size: "use 'limit'",
	onUpdate: "use 'onChange'"
}, b = class {
	limit = 100;
	onChange = null;
	#e = [];
	#t = [];
	constructor(t = {}) {
		n("History", t, v, y), t.limit !== void 0 && ((!Number.isInteger(t.limit) || t.limit < 1) && e("History", `'limit' must be a whole number 1 or more, got ${i(t.limit)}`), this.limit = t.limit), t.onChange != null && (typeof t.onChange != "function" && e("History", `'onChange' must be a function, got ${i(t.onChange)}`), this.onChange = t.onChange);
	}
	push(t) {
		return t && typeof t.undo == "function" && typeof t.redo == "function" || e("History", `push() takes { label, undo, redo } with undo and redo functions, got ${i(t)}`), this.#e.push(t), this.#e.length > this.limit && this.#e.shift(), this.#t = [], this.onChange?.(this), this;
	}
	undo() {
		let e = this.#e.pop();
		return e ? (e.undo(), this.#t.push(e), this.onChange?.(this), !0) : !1;
	}
	redo() {
		let e = this.#t.pop();
		return e ? (e.redo(), this.#e.push(e), this.onChange?.(this), !0) : !1;
	}
	get canUndo() {
		return this.#e.length > 0;
	}
	get canRedo() {
		return this.#t.length > 0;
	}
	get undoCount() {
		return this.#e.length;
	}
	get redoCount() {
		return this.#t.length;
	}
	get undoLabel() {
		return this.#e.at(-1)?.label ?? null;
	}
	get redoLabel() {
		return this.#t.at(-1)?.label ?? null;
	}
	clear() {
		this.#e = [], this.#t = [], this.onChange?.(this);
	}
	transform(e, t) {
		let n = [e].flat(), r = n.map(x);
		return (e = t) => {
			let i = n.map(x);
			return !i.every((e, t) => e.every((e, n) => e === r[t][n])) && (this.push({
				label: e,
				undo: () => n.forEach((e, t) => S(e, r[t])),
				redo: () => n.forEach((e, t) => S(e, i[t]))
			}), !0);
		};
	}
}, x = (e) => [
	...e.position,
	...e.quaternion,
	...e.scale
];
function S(e, t) {
	e.position.set(t[0], t[1], t[2]), e.quaternion.set(t[3], t[4], t[5], t[6]), e.scale.set(t[7], t[8], t[9]);
}
export { b as History, h as TransformHandle };

//# sourceMappingURL=edit.js.map