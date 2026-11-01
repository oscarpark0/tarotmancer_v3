import { E as e, w as t } from "./core.js";
// src/webgl/bloom.js
var n = `precision highp float;
in vec2 vUv;
uniform sampler2D uSource;
uniform vec2 uTexel;
uniform float uThreshold;
out vec4 fragColor;
${t}
vec3 tap(vec2 uv) {
vec3 c = texture(uSource, uv).rgb;
return uThreshold < 0.0 ? c : srgbToLinear(c);
}
void main() {
vec3 c = (tap(vUv + uTexel * vec2(-1.0, -1.0)) + tap(vUv + uTexel * vec2(1.0, -1.0)) +
tap(vUv + uTexel * vec2(-1.0, 1.0)) + tap(vUv + uTexel * vec2(1.0, 1.0))) * 0.25;
if (uThreshold >= 0.0) {
float bright = max(c.r, max(c.g, c.b));
float knee = uThreshold * 0.5 + 1e-4;
float soft = clamp(bright - uThreshold + knee, 0.0, 2.0 * knee);
soft = soft * soft / (4.0 * knee);
c *= max(soft, bright - uThreshold) / max(bright, 1e-4);
}
fragColor = vec4(c, 1.0);
}
`, r = "precision highp float;\nin vec2 vUv;\nuniform sampler2D uSource;\nuniform vec2 uTexel;\nuniform float uWeight;\nout vec4 fragColor;\nvoid main() {\nvec3 c = texture(uSource, vUv).rgb * 4.0;\nc += (texture(uSource, vUv + uTexel * vec2(-1.0, 0.0)).rgb + texture(uSource, vUv + uTexel * vec2(1.0, 0.0)).rgb +\ntexture(uSource, vUv + uTexel * vec2(0.0, -1.0)).rgb + texture(uSource, vUv + uTexel * vec2(0.0, 1.0)).rgb) * 2.0;\nc += texture(uSource, vUv + uTexel * vec2(-1.0, -1.0)).rgb + texture(uSource, vUv + uTexel * vec2(1.0, -1.0)).rgb +\ntexture(uSource, vUv + uTexel * vec2(-1.0, 1.0)).rgb + texture(uSource, vUv + uTexel * vec2(1.0, 1.0)).rgb;\nfragColor = vec4(c / 16.0 * uWeight, 1.0);\n}\n", i = `precision highp float;
in vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uStrength;
out vec4 fragColor;
${t}
void main() {
vec4 scene = texture(uScene, vUv);
vec3 glow = texture(uBloom, vUv).rgb * uStrength;
vec3 c = srgbToLinear(scene.rgb) + glow;
float a = clamp(scene.a + max(glow.r, max(glow.g, glow.b)), 0.0, 1.0);
fragColor = vec4(linearToSrgb(c), a);
}
`, a = [e, n], o = [e, r], s = [e, i], c = 6, l = class {
	#e = null;
	#t = !1;
	constructor(e, t) {
		this.gl = e, this.programs = t, this.reset();
	}
	reset() {
		this.#e = null, this.#t = !!this.gl.getExtension("EXT_color_buffer_float");
	}
	dispose() {
		this.#r(), this.#e = null;
	}
	begin(e, t) {
		let n = this.gl, r = this.#n(e, t);
		n.bindFramebuffer(n.FRAMEBUFFER, r.multisampled), n.viewport(0, 0, e, t);
	}
	end(e) {
		let t = this.gl, n = this.#e, { width: r, height: i, levels: c } = n;
		t.bindFramebuffer(t.READ_FRAMEBUFFER, n.multisampled), t.bindFramebuffer(t.DRAW_FRAMEBUFFER, n.resolved), t.blitFramebuffer(0, 0, r, i, 0, 0, r, i, t.COLOR_BUFFER_BIT, t.NEAREST), t.bindFramebuffer(t.READ_FRAMEBUFFER, null), t.bindFramebuffer(t.DRAW_FRAMEBUFFER, null), t.disable(t.DEPTH_TEST), t.disable(t.CULL_FACE), t.disable(t.BLEND), t.depthMask(!1);
		let l = this.programs.ready("bloom-down", [], a);
		t.useProgram(l.program);
		let u = n.picture, d = r, f = i;
		c.forEach((n, r) => {
			t.bindFramebuffer(t.FRAMEBUFFER, n.framebuffer), t.viewport(0, 0, n.width, n.height), l.set("uSource", u), l.set("uTexel", [1 / d, 1 / f]), l.set("uThreshold", r === 0 ? Math.max(0, e.threshold) : -1), this.programs.drawFullscreen(), u = n.texture, d = n.width, f = n.height;
		});
		let p = this.programs.ready("bloom-up", [], o);
		t.useProgram(p.program), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE);
		let m = Math.min(1, Math.max(0, e.radius));
		for (let e = c.length - 1; e > 0; e--) {
			let n = c[e], r = c[e - 1];
			t.bindFramebuffer(t.FRAMEBUFFER, r.framebuffer), t.viewport(0, 0, r.width, r.height), p.set("uSource", n.texture), p.set("uTexel", [1 / n.width, 1 / n.height]), p.set("uWeight", m), this.programs.drawFullscreen();
		}
		t.disable(t.BLEND), t.bindFramebuffer(t.FRAMEBUFFER, null), t.viewport(0, 0, r, i);
		let h = this.programs.ready("bloom-composite", [], s);
		t.useProgram(h.program), h.set("uScene", n.picture), h.set("uBloom", c[0].texture), h.set("uStrength", Math.max(0, e.strength)), this.programs.drawFullscreen(), t.depthMask(!0), t.enable(t.DEPTH_TEST), t.bindVertexArray(null);
	}
	#n(e, t) {
		if (this.#e && this.#e.width === e && this.#e.height === t) return this.#e;
		this.#r();
		let n = this.gl, r = Math.min(4, n.getParameter(n.MAX_SAMPLES)), i = n.createFramebuffer();
		n.bindFramebuffer(n.FRAMEBUFFER, i);
		let a = n.createRenderbuffer();
		n.bindRenderbuffer(n.RENDERBUFFER, a), n.renderbufferStorageMultisample(n.RENDERBUFFER, r, n.RGBA8, e, t), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.RENDERBUFFER, a);
		let o = n.createRenderbuffer();
		n.bindRenderbuffer(n.RENDERBUFFER, o), n.renderbufferStorageMultisample(n.RENDERBUFFER, r, n.DEPTH24_STENCIL8, e, t), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.RENDERBUFFER, o);
		let s = (e, t, r) => {
			let i = n.createTexture();
			n.activeTexture(n.TEXTURE15), n.bindTexture(n.TEXTURE_2D, i), n.texStorage2D(n.TEXTURE_2D, 1, r, e, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE);
			let a = n.createFramebuffer();
			return n.bindFramebuffer(n.FRAMEBUFFER, a), n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, i, 0), {
				texture: i,
				framebuffer: a,
				width: e,
				height: t
			};
		}, l = s(e, t, n.RGBA8), u = [], d = e, f = t;
		for (let e = 0; e < c && (d = Math.max(1, d >> 1), f = Math.max(1, f >> 1), !(e > 1 && Math.min(d, f) < 8)); e++) u.push(s(d, f, this.#t ? n.RGBA16F : n.RGBA8));
		return n.bindFramebuffer(n.FRAMEBUFFER, null), n.bindRenderbuffer(n.RENDERBUFFER, null), this.#e = {
			width: e,
			height: t,
			multisampled: i,
			buffers: [a, o],
			resolved: l.framebuffer,
			picture: l.texture,
			levels: u
		}, this.#e;
	}
	#r() {
		let e = this.#e;
		if (!e) return;
		let t = this.gl;
		t.deleteFramebuffer(e.multisampled);
		for (let n of e.buffers) t.deleteRenderbuffer(n);
		t.deleteFramebuffer(e.resolved), t.deleteTexture(e.picture);
		for (let n of e.levels) t.deleteFramebuffer(n.framebuffer), t.deleteTexture(n.texture);
	}
};
export { l as Bloom };

//# sourceMappingURL=bloom.js.map