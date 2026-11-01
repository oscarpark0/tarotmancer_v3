import { At as e, Ot as t } from "./core.js";
// src/tooltip.js
var n = "\n:where(.phoria-tooltip) { position: fixed; left: 0; top: 0; z-index: 1000; pointer-events: none; max-width: 320px;\n  padding: 6px 10px; border-radius: 6px; background: rgba(20, 20, 24, 0.92); color: #fff;\n  font: 12px/1.45 system-ui, sans-serif; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); white-space: pre-line; }\n:where(.phoria-tooltip-title) { font-weight: 600; }\n:where(.phoria-tooltip-rows) { display: grid; grid-template-columns: auto auto; column-gap: 12px; }\n:where(.phoria-tooltip-rows > :nth-child(odd)) { opacity: 0.7; }\n:where(.phoria-tooltip-rows > :nth-child(even)) { text-align: right; font-variant-numeric: tabular-nums; }\n", r = 14, i = class {
	el;
	content;
	constructor(r, i = "") {
		if (typeof r != "function" && e("View", `tooltip() takes a function (hit) => text, got ${t(r)}`), this.content = r, !document.getElementById("phoria-tooltip-style")) {
			let e = document.createElement("style");
			e.id = "phoria-tooltip-style", e.textContent = n, document.head.prepend(e);
		}
		this.el = document.createElement("div"), this.el.className = `phoria-tooltip${i ? ` ${i}` : ""}`, this.el.setAttribute("role", "tooltip"), this.el.hidden = !0, document.body.append(this.el);
	}
	show(e, t, n) {
		let r = this.content(e);
		if (r == null || r === !1 || r === "") return this.hide();
		this.el.replaceChildren(a(r)), this.el.hidden = !1, this.move(t, n);
	}
	move(e, t) {
		if (this.el.hidden) return;
		let n = this.el.offsetWidth, i = this.el.offsetHeight, a = e + r + n > window.innerWidth ? e - r - n : e + r, o = t + r + i > window.innerHeight ? t - r - i : t + r;
		this.el.style.transform = `translate(${Math.round(Math.max(0, a))}px, ${Math.round(Math.max(0, o))}px)`;
	}
	hide() {
		this.el.hidden = !0;
	}
	dispose() {
		this.el.remove();
	}
};
function a(n) {
	if (typeof n == "string" || typeof n == "number") return document.createTextNode(String(n));
	if (n instanceof Node) return n;
	if (typeof n == "object" && n && ("title" in n || "rows" in n)) {
		let e = document.createDocumentFragment();
		if (n.title !== void 0) {
			let t = document.createElement("div");
			t.className = "phoria-tooltip-title", t.textContent = String(n.title), e.append(t);
		}
		if (n.rows) {
			let t = document.createElement("div");
			t.className = "phoria-tooltip-rows";
			let r = Array.isArray(n.rows) ? n.rows : Object.entries(n.rows);
			for (let [e, n] of r) {
				let r = document.createElement("span"), i = document.createElement("span");
				r.textContent = String(e), i.textContent = typeof n == "number" ? n.toLocaleString() : String(n), t.append(r, i);
			}
			e.append(t);
		}
		return e;
	}
	return e("View", `a tooltip function returns text, an element or { title, rows }, got ${t(n)}`);
}
export { i as Tooltip };

//# sourceMappingURL=tooltip.js.map