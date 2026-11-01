import { wt as e } from "./core.js";
// src/snapshot.js
function t(t, n, { type: a = "image/png", quality: o, labels: s = !0 } = {}, c = []) {
	let l = t;
	if (s && n.length) {
		l = document.createElement("canvas"), l.width = t.width, l.height = t.height;
		let e = l.getContext("2d");
		e.drawImage(t, 0, 0);
		let a = t.getBoundingClientRect(), o = t.width / (a.width || 1);
		for (let t of c) r(e, t, o);
		for (let t of n) i(e, t, a, o);
	}
	return new Promise((t, n) => l.toBlob((r) => {
		r ? t(r) : n(new e(`View: toImage() couldn't encode '${a}'`));
	}, a, o));
}
function n(e, t) {
	return t === "uppercase" ? e.toUpperCase() : t === "lowercase" ? e.toLowerCase() : t === "capitalize" ? e.replace(/\b\p{L}/gu, (e) => e.toUpperCase()) : e;
}
function r(e, { from: t, to: n, color: r, opacity: i }, a) {
	e.save(), e.globalAlpha = i, e.strokeStyle = e.fillStyle = r, e.lineWidth = a, e.beginPath(), e.moveTo(t[0] * a, t[1] * a), e.lineTo(n[0] * a, n[1] * a), e.stroke(), e.beginPath(), e.arc(t[0] * a, t[1] * a, 2.5 * a, 0, Math.PI * 2), e.fill(), e.restore();
}
function i(e, t, r, i) {
	let a = t.getBoundingClientRect(), o = getComputedStyle(t), s = (a.left - r.left) * i, c = (a.top - r.top) * i, l = a.width * i, u = a.height * i;
	e.save(), e.globalAlpha = parseFloat(t.style.opacity || o.opacity) || 1, /rgba\(.*,\s*0\)$|transparent/.test(o.backgroundColor) || (e.fillStyle = o.backgroundColor, e.beginPath(), e.roundRect(s, c, l, u, (parseFloat(o.borderTopLeftRadius) || 0) * i), e.fill());
	let d = parseFloat(o.borderBottomWidth) || 0;
	d > 0 && o.borderBottomStyle !== "none" && !parseFloat(o.borderTopWidth) && (e.fillStyle = o.borderBottomColor, e.fillRect(s, c + u - d * i, l, d * i)), e.fillStyle = o.color, e.font = `${o.fontStyle} ${o.fontWeight} ${parseFloat(o.fontSize) * i}px ${o.fontFamily}`, e.textBaseline = "middle";
	let f = o.textAlign === "right" || o.textAlign === "end";
	e.textAlign = f ? "right" : "left";
	let p = f ? s + l - (parseFloat(o.paddingRight) || 0) * i : s + (parseFloat(o.paddingLeft) || 0) * i;
	e.fillText(n(t.textContent ?? "", o.textTransform), p, c + u / 2), e.restore();
}
export { t as snapshot };

//# sourceMappingURL=snapshot.js.map