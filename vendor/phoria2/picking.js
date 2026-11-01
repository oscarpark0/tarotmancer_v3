import { D as e, It as t, O as n, Pt as r, S as i, k as a, w as o } from "./core.js";
// src/webgl/picking.js
var s = 33, c = 4, l = `precision highp float;
precision highp int;
flat in uint vPickElement;
#ifdef CLIP
in vec3 vWorldPosition;
#endif
uniform uint uPickId;
layout(location = 0) out uvec4 pickOut;
${o}
${i}
void main() {
#ifdef CLIP
clipAway(vWorldPosition);
#endif
#ifdef ROUND
vec2 p = gl_PointCoord * 2.0 - 1.0;
if (dot(p, p) > 1.0) discard;
#endif
pickOut = uvec4(uPickId, vPickElement, floatBitsToUint(gl_FragCoord.z), 1u);
}
`, u = {
	mesh: [n, l],
	points: [a, l],
	lines: [e, l]
}, d = class {
	#e = null;
	#t = /* @__PURE__ */ new Uint32Array(4356);
	#n = /* @__PURE__ */ new Float32Array(16);
	#r = /* @__PURE__ */ new Float32Array(16);
	#i = /* @__PURE__ */ new Float32Array(9);
	#a = null;
	#o = !1;
	constructor(e, t, n) {
		this.gl = e, this.programs = t, this.resources = n;
	}
	reset() {
		this.#e = null, this.#a = null, this.#o = !1;
	}
	pick(e, t, n, r, i, a) {
		let o = this.gl, c = this.#s(e, t, n, r, i, a);
		return c ? (o.readPixels(0, 0, s, s, o.RGBA_INTEGER, o.UNSIGNED_INT, this.#t), o.bindFramebuffer(o.FRAMEBUFFER, null), this.#c(c)) : null;
	}
	pickAsync(e, t, n, r, i, a) {
		if (this.#o) return null;
		let o = this.gl, c = this.#s(e, t, n, r, i, a);
		if (!c) return Promise.resolve(null);
		let l = this.#l();
		o.bindBuffer(o.PIXEL_PACK_BUFFER, l), o.readPixels(0, 0, s, s, o.RGBA_INTEGER, o.UNSIGNED_INT, 0), o.bindBuffer(o.PIXEL_PACK_BUFFER, null), o.bindFramebuffer(o.FRAMEBUFFER, null);
		let u = o.fenceSync(o.SYNC_GPU_COMMANDS_COMPLETE, 0);
		return o.flush(), this.#o = !0, new Promise((e) => {
			let t = () => {
				o.isContextLost() ? (this.#o = !1, e(null)) : o.clientWaitSync(u, 0, 0) === o.TIMEOUT_EXPIRED ? setTimeout(t, 1) : (o.deleteSync(u), o.bindBuffer(o.PIXEL_PACK_BUFFER, l), o.getBufferSubData(o.PIXEL_PACK_BUFFER, 0, this.#t), o.bindBuffer(o.PIXEL_PACK_BUFFER, null), this.#o = !1, e(this.#c(c)));
			};
			setTimeout(t, 0);
		});
	}
	#s(e, n, r, i, a, o) {
		let c = this.gl, l = f(e);
		if (!l.length) return null;
		let u = this.#d();
		c.bindFramebuffer(c.FRAMEBUFFER, u.framebuffer), c.viewport(0, 0, s, s), c.disable(c.BLEND), c.disable(c.SCISSOR_TEST), c.enable(c.DEPTH_TEST), c.depthFunc(c.LEQUAL), c.depthMask(!0), c.clearBufferuiv(c.COLOR, 0, [
			0,
			0,
			0,
			0
		]), c.clearBufferfv(c.DEPTH, 0, [1]);
		let d = s, p = n / i * 2 - 1, m = 1 - r / a * 2, h = new Float32Array([
			i / d,
			0,
			0,
			0,
			0,
			a / d,
			0,
			0,
			0,
			0,
			1,
			0,
			-p * i / d,
			-m * a / d,
			0,
			1
		]);
		return t(this.#n, h, e.camera.projection), t(this.#r, this.#n, e.camera.view), l.forEach((t, n) => this.#u(t, n + 1, e, a, o)), c.bindVertexArray(null), {
			items: l,
			cx: p,
			cy: m,
			width: i,
			height: a
		};
	}
	#c({ items: e, cx: t, cy: n, width: r, height: i }) {
		let a = this.#t, o = (e, t) => (t * s + e) * 4, l = a[o(16, 16)] ? o(16, 16) : -1, u = 0, d = 0;
		if (l < 0) {
			let t = Infinity;
			for (let n = -4; n <= c; n++) for (let r = -4; r <= c; r++) {
				let i = r * r + n * n;
				if (i > 16 || i >= t) continue;
				let s = o(16 + r, 16 + n), c = a[s];
				c && e[c - 1].node.drawMode !== "triangles" && (l = s, t = i, u = r, d = n);
			}
		}
		if (l < 0) return null;
		let f = new Float32Array(new Uint32Array([a[l + 2]]).buffer)[0], p = [
			t + u * 2 / r,
			n + d * 2 / i,
			f * 2 - 1
		];
		return {
			item: e[a[l] - 1],
			element: a[l + 1],
			ndc: p
		};
	}
	#l() {
		if (this.#a) return this.#a;
		let e = this.gl;
		return this.#a = e.createBuffer(), e.bindBuffer(e.PIXEL_PACK_BUFFER, this.#a), e.bufferData(e.PIXEL_PACK_BUFFER, this.#t.byteLength, e.STREAM_READ), e.bindBuffer(e.PIXEL_PACK_BUFFER, null), this.#a;
	}
	#u(e, t, n, i, a) {
		let o = this.gl, { node: c, geometry: l, material: d, worldMatrix: f, instances: p } = e, m = c.drawMode, h = m === "points" ? "points" : m === "lines" ? "lines" : "mesh", g = ["PICK"];
		p && g.push("INSTANCED"), h === "points" && (d.sizeAttenuation && g.push("SIZE_ATTENUATION"), d.map || g.push("ROUND")), h === "mesh" && e.clip && g.push("CLIP");
		let _ = this.programs.ready(`pick-${h}`, g, u[h]);
		if (o.useProgram(_.program), _.set("uView", n.camera.view), _.set("uProjection", this.#n), _.set("uViewProjection", this.#r), _.set("uModel", f), _.set("uPickId", t), _.set("uHighlightIndex", -2), e.clip && _.set("uClipPlane", e.clip.plane), h === "lines") {
			o.disable(o.CULL_FACE), _.set("uResolution", [s, s]), _.set("uWidth", d.width * a), _.set("uNear", n.camera.near);
			let e = this.resources.lines(l);
			o.bindVertexArray(e.vao), o.drawArraysInstanced(o.TRIANGLE_STRIP, 0, 4, Math.min(e.count, Math.floor(l.drawnCount / 2)));
		} else if (h === "points") {
			o.disable(o.CULL_FACE), _.set("uSize", d.sizeAttenuation ? d.size : d.size * a), _.set("uScale", n.camera.projection[5] * i / 2);
			let e = this.resources.mesh(l, null, !1);
			o.bindVertexArray(e.vao), o.drawArrays(o.POINTS, 0, l.drawnVertices);
		} else _.set("uNormalMatrix", this.#i), d.depthTest ? o.enable(o.DEPTH_TEST) : o.disable(o.DEPTH_TEST), d.doubleSided || e.clip?.cap ? o.disable(o.CULL_FACE) : (o.enable(o.CULL_FACE), o.cullFace(o.BACK), o.frontFace(r(f) < 0 ? o.CW : o.CCW)), this.resources.drawTriangles(l, p);
	}
	#d() {
		if (this.#e) return this.#e;
		let e = this.gl, t = e.createTexture();
		e.activeTexture(e.TEXTURE15), e.bindTexture(e.TEXTURE_2D, t), e.texStorage2D(e.TEXTURE_2D, 1, e.RGBA32UI, s, s);
		let n = e.createRenderbuffer();
		e.bindRenderbuffer(e.RENDERBUFFER, n), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT24, s, s);
		let r = e.createFramebuffer();
		return e.bindFramebuffer(e.FRAMEBUFFER, r), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, n), e.bindFramebuffer(e.FRAMEBUFFER, null), this.#e = {
			framebuffer: r,
			color: t,
			depth: n
		}, this.#e;
	}
};
function f(e) {
	let t = /* @__PURE__ */ new Map(), n = (e) => {
		if (!e) return !0;
		let r = t.get(e);
		return r === void 0 && t.set(e, r = e.pickable !== !1 && n(e.parent)), r;
	}, r = [...e.opaque, ...e.transparent].filter((e) => n(e.node));
	return [...r.filter((e) => e.material.depthTest), ...r.filter((e) => !e.material.depthTest)];
}
export { d as Picker };

//# sourceMappingURL=picking.js.map