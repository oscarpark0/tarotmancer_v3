import { A as e, C as t, E as n, Ft as r, It as i, Nt as a, O as o, S as s, T as c, bt as l, vt as u, w as d, x as f, yt as p } from "./core.js";
// src/irradiance.js
function m({ data: e, width: t, height: n }) {
	let r = /* @__PURE__ */ new Float64Array(27), i = Math.max(1, Math.floor(t / 128)), a = Math.max(1, Math.floor(n / 64)), o = 2 * Math.PI * i / t, s = Math.PI * a / n;
	for (let c = 0; c < n; c += a) {
		let l = (c + .5 * a) / n * Math.PI, u = Math.sin(l), d = Math.cos(l), f = o * s * u;
		for (let n = 0; n < t; n += i) {
			let a = ((n + .5 * i) / t - .5) * 2 * Math.PI, o = Math.cos(a) * u, s = Math.sin(a) * u, l = [
				1,
				d,
				s,
				o,
				o * d,
				d * s,
				3 * s * s - 1,
				o * s,
				o * o - d * d
			], p = (c * t + n) * 4;
			for (let t = 0; t < 9; t++) {
				let n = l[t] * f;
				r[t * 3] += e[p] * n, r[t * 3 + 1] += e[p + 1] * n, r[t * 3 + 2] += e[p + 2] * n;
			}
		}
	}
	let c = [
		.282095,
		.488603,
		.488603,
		.488603,
		1.092548,
		1.092548,
		.315392,
		1.092548,
		.546274
	], l = [
		1,
		2 / 3,
		2 / 3,
		2 / 3,
		1 / 4,
		1 / 4,
		1 / 4,
		1 / 4,
		1 / 4
	], u = /* @__PURE__ */ new Float32Array(27);
	for (let e = 0; e < 9; e++) for (let t = 0; t < 3; t++) u[e * 3 + t] = r[e * 3 + t] * c[e] * c[e] * l[e];
	return u;
}
// src/webgl/passes.js
var h = `precision highp float;
in vec2 vUv;
uniform mat4 uInverseViewProjection;
uniform vec3 uCameraPosition;
uniform sampler2D uBackground;
uniform float uLod;
uniform float uIntensity;
uniform int uHdr;
out vec4 fragColor;
${d}
${c}
${e}
void main() {
vec4 far = uInverseViewProjection * vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
vec3 d = normalize(far.xyz / far.w - uCameraPosition);
vec3 c = textureLod(uBackground, equirectUv(d), uLod).rgb * uIntensity;
if (uHdr == 1) c = toneMap(c);
fragColor = vec4(linearToSrgb(c), 1.0);
}
`, g = `precision highp float;
in vec2 vUv;
uniform sampler2D uSource;
uniform float uRoughness;
uniform float uSourceTexels;
uniform float uCopyLod;
out vec4 fragColor;
${c}
const float PI = 3.14159265359;
const uint SAMPLES = 192u;
vec2 hammersley(uint i) {
uint bits = i;
bits = (bits << 16u) | (bits >> 16u);
bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
return vec2(float(i) / float(SAMPLES), float(bits) * 2.3283064365386963e-10);
}
void main() {
vec3 n = equirectDirection(vUv);
if (uRoughness <= 0.0) {
fragColor = vec4(textureLod(uSource, vUv, uCopyLod).rgb, 1.0);
return;
}
float a = uRoughness * uRoughness, a2 = a * a;
vec3 up = abs(n.y) < 0.999 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
vec3 t = normalize(cross(up, n)), b = cross(n, t);
float texelAngle = 4.0 * PI / uSourceTexels;
vec3 sum = vec3(0.0);
float weight = 0.0;
for (uint i = 0u; i < SAMPLES; i++) {
vec2 xi = hammersley(i);
float phi = 2.0 * PI * xi.x;
float cosTheta = sqrt((1.0 - xi.y) / (1.0 + (a2 - 1.0) * xi.y));
float sinTheta = sqrt(1.0 - cosTheta * cosTheta);
vec3 h = t * (cos(phi) * sinTheta) + b * (sin(phi) * sinTheta) + n * cosTheta;
vec3 l = 2.0 * dot(n, h) * h - n;
float NoL = dot(n, l);
if (NoL <= 0.0) continue;
float f = (cosTheta * a2 - cosTheta) * cosTheta + 1.0;
float pdf = a2 / (PI * f * f) * 0.25;
float lod = max(0.5 * log2(1.0 / (float(SAMPLES) * pdf * texelAngle)) + 1.0, 0.0);
sum += textureLod(uSource, equirectUv(l), lod).rgb * NoL;
weight += NoL;
}
fragColor = vec4(sum / max(weight, 1e-4), 1.0);
}
`, _ = `precision highp float;
in vec3 vWorldPosition;
uniform vec4 uMask;
out vec4 fragColor;
${s}
void main() {
clipAway(vWorldPosition);
fragColor = uMask;
}
`, v = 16, y = `uniform sampler2D uSource;
uniform vec2 uStep;
uniform int uRadius;
vec4 widened(vec2 uv) {
vec4 best = vec4(0.0);
float nearest = 1e9;
for (int i = -${v}; i <= ${v}; i++) {
float d = abs(float(i));
if (d > float(uRadius)) continue;
vec4 s = texture(uSource, uv + uStep * float(i));
if (s.a > 0.0 && d <= s.a * ${v}.0 && d < nearest) {
best = s;
nearest = d;
}
}
return best;
}
`, b = `precision highp float;
in vec2 vUv;
out vec4 fragColor;
${y}
void main() {
fragColor = widened(vUv);
}
`, x = `precision highp float;
in vec2 vUv;
uniform sampler2D uMask;
out vec4 fragColor;
${d}
${y}
void main() {
if (texture(uMask, vUv).a > 0.0) discard;
vec4 ring = widened(vUv);
if (ring.a <= 0.0) discard;
fragColor = vec4(linearToSrgb(ring.rgb), 1.0);
}
`, S = `precision highp float;
in vec3 vWorldPosition;
uniform vec4 uMask;
layout(location = 0) out vec4 fragColor;
layout(location = 1) out vec4 fragCoverage;
${s}
void main() {
clipAway(vWorldPosition);
fragColor = uMask;
fragCoverage = vec4(1.0);
}
`, C = `uniform sampler2D uMask;
uniform sampler2D uCoverage;
uniform vec2 uTexel;
uniform int uRadius;
vec4 masked(vec2 uv, float coverage) {
vec4 m = texture(uMask, uv) / coverage;
return vec4(m.rgb, m.a * ${v}.0);
}
`, w = `precision highp float;
in vec2 vUv;
out vec4 fragColor;
${C}
void main() {
float nearest = 1e9;
int at = 0;
bool found = false;
for (int i = -17; i <= 17; i++) {
if (abs(i) > uRadius + 1) continue;
vec2 uv = vUv + vec2(float(i) * uTexel.x, 0.0);
float c = texture(uCoverage, uv).r;
if (c <= 0.0) continue;
float d = abs(float(i)) - (c - 0.5);
if (d < masked(uv, c).a + 0.5 && d < nearest) {
nearest = d;
at = i;
found = true;
}
}
fragColor = found ? vec4(float(at + 32) / 255.0, 0.0, 0.0, 1.0) : vec4(0.0);
}
`, T = `precision highp float;
in vec2 vUv;
uniform sampler2D uNearest;
out vec4 fragColor;
${d}
${C}
void main() {
float here = texture(uCoverage, vUv).r;
if (here >= 1.0) discard;
float nearest = 1e9;
vec4 ring = vec4(0.0);
for (int j = -17; j <= 17; j++) {
if (abs(j) > uRadius + 1) continue;
vec2 row = vUv + vec2(0.0, float(j) * uTexel.y);
vec4 n = texture(uNearest, row);
if (n.a <= 0.0) continue;
int i = int(n.r * 255.0 + 0.5) - 32;
vec2 uv = row + vec2(float(i) * uTexel.x, 0.0);
float c = texture(uCoverage, uv).r;
float d = length(vec2(float(i), float(j))) - (c - 0.5);
if (d < nearest) {
nearest = d;
ring = masked(uv, c);
}
}
float alpha = clamp(ring.a - nearest + 0.5, 0.0, 1.0) * (1.0 - here);
if (alpha <= 0.0) discard;
fragColor = vec4(linearToSrgb(ring.rgb) * alpha, alpha);
}
`, E = [o, _], D = [n, b], O = [n, x], k = [o, S], A = [n, w], j = [n, T], M = [o, t], N = [n, h], P = [n, g], F = 512, I = 6, L = class {
	#e = /* @__PURE__ */ new WeakMap();
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	floatTargets = !1;
	constructor(e, t, n) {
		this.gl = e, this.programs = t, this.resources = n, this.reset();
	}
	reset() {
		this.#e = /* @__PURE__ */ new WeakMap(), this.#t = null, this.#n = null, this.#r = null, this.#i = null, this.floatTargets = !!this.gl.getExtension("EXT_color_buffer_float");
	}
	environment(e) {
		if (!e.image || !e.isHDR || !this.floatTargets) return null;
		let t = this.#e.get(e);
		if (t && t.version === e.version) return t;
		let n = this.gl;
		t ? (n.deleteTexture(t.source), n.deleteTexture(t.prefiltered)) : e.onDispose(() => {
			let t = this.#e.get(e);
			t && (n.deleteTexture(t.source), n.deleteTexture(t.prefiltered), this.#e.delete(e));
		});
		let r = e.image, i = this.#d(r.width, r.height, Math.floor(Math.log2(Math.max(r.width, r.height))) + 1);
		n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, r.width, r.height, n.RGBA, n.FLOAT, r.data), n.generateMipmap(n.TEXTURE_2D);
		let a = this.#d(F, F / 2, I), o = this.programs.ready("prefilter", [], P);
		n.useProgram(o.program), o.set("uSource", i), o.set("uSourceTexels", r.width * r.height);
		let s = n.createFramebuffer();
		n.bindFramebuffer(n.FRAMEBUFFER, s), n.disable(n.DEPTH_TEST), n.disable(n.BLEND), n.disable(n.CULL_FACE);
		for (let e = 0; e < I; e++) {
			let t = F >> e;
			n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, a, e), n.viewport(0, 0, t, t / 2), o.set("uRoughness", e / 5), o.set("uCopyLod", Math.max(0, Math.log2(r.width / t))), this.programs.drawFullscreen();
		}
		return n.bindFramebuffer(n.FRAMEBUFFER, null), n.deleteFramebuffer(s), n.enable(n.DEPTH_TEST), t = {
			source: i,
			prefiltered: a,
			maxLod: 5,
			sh: m(r),
			version: e.version
		}, this.#e.set(e, t), t;
	}
	background(e, t, n) {
		let i = this.gl, o = t.isHDR, s = o ? this.environment(t) : null;
		if (o && !s) return;
		let c = this.programs.ready("background", [], N);
		i.useProgram(c.program);
		let l = Math.min(Math.max(e.backgroundBlur, 0), 1);
		s ? (c.set("uBackground", l > 0 ? s.prefiltered : s.source), c.set("uLod", l * s.maxLod), c.set("uIntensity", e.environment === t ? e.environmentIntensity : 1)) : (c.set("uBackground", this.resources.texture(t)), c.set("uLod", l * 6), c.set("uIntensity", 1)), c.set("uHdr", +!!o), c.set("uExposure", n.exposure), c.set("uToneMapping", n.toneMapping), c.set("uInverseViewProjection", r(a(), e.camera.viewProjection)), c.set("uCameraPosition", e.camera.position), i.disable(i.DEPTH_TEST), i.disable(i.BLEND), i.disable(i.CULL_FACE), i.depthMask(!1), this.programs.drawFullscreen(), i.depthMask(!0), i.enable(i.DEPTH_TEST);
	}
	shadowMap(e) {
		let t = this.gl;
		this.#t ??= this.#l(p), t.bindFramebuffer(t.FRAMEBUFFER, this.#t.framebuffer), t.viewport(0, 0, p, p), this.#a(), this.#s(e.casters, e.viewProjection), this.#o();
		let n = new Float32Array([
			.5,
			0,
			0,
			0,
			0,
			.5,
			0,
			0,
			0,
			0,
			.5,
			0,
			.5,
			.5,
			.5,
			1
		]);
		return {
			define: "SHADOW",
			sampler: "uShadowMap",
			texture: this.#t.texture,
			uniforms: {
				uShadowMatrix: i(/* @__PURE__ */ new Float32Array(16), n, e.viewProjection),
				uShadowTexel: 1 / p,
				uShadowBias: e.texelSize * 1.5
			}
		};
	}
	spotShadowMaps(e) {
		let t = this.gl;
		this.#n ??= this.#l(l), t.bindFramebuffer(t.FRAMEBUFFER, this.#n.framebuffer), t.viewport(0, 0, l, l), this.#a();
		let n = /* @__PURE__ */ new Float32Array(64), r = /* @__PURE__ */ new Float32Array(16), a = /* @__PURE__ */ new Float32Array(4), o = l / 2;
		for (let s of e) {
			let e = s.tile % 2, c = Math.floor(s.tile / 2);
			t.viewport(e * o, c * o, o, o), this.#s(s.casters, s.viewProjection);
			let l = new Float32Array([
				.25,
				0,
				0,
				0,
				0,
				.25,
				0,
				0,
				0,
				0,
				.5,
				0,
				e * .5 + .25,
				c * .5 + .25,
				.5,
				1
			]);
			n.set(i(/* @__PURE__ */ new Float32Array(16), l, s.viewProjection), s.tile * 16), r.set([
				e * .5,
				c * .5,
				e * .5 + .5,
				c * .5 + .5
			], s.tile * 4), a[s.tile] = s.texelAngle * 1.5;
		}
		return this.#o(), {
			define: "SPOT_SHADOWS",
			sampler: "uSpotShadowMap",
			texture: this.#n.texture,
			uniforms: {
				uSpotShadowMatrix: n,
				uSpotShadowTile: r,
				uSpotShadowBias: a,
				uSpotShadowTexel: 1 / l
			}
		};
	}
	pointShadowMap(e) {
		let t = this.gl;
		return this.#r ??= this.#u(u), e.faces.forEach((e, n) => {
			t.bindFramebuffer(t.FRAMEBUFFER, this.#r.framebuffers[n]), t.viewport(0, 0, u, u), this.#a(), this.#s(e.casters, e.viewProjection);
		}), this.#o(), {
			define: "POINT_SHADOW",
			sampler: "uPointShadowMap",
			texture: this.#r.texture,
			uniforms: {
				uPointShadowNearFar: [e.near, e.far],
				uPointShadowTexel: e.texelAngle,
				uPointShadowBias: e.texelAngle * 1.5
			}
		};
	}
	#a() {
		let e = this.gl;
		e.depthMask(!0), e.enable(e.DEPTH_TEST), e.depthFunc(e.LEQUAL), e.disable(e.BLEND), e.clear(e.DEPTH_BUFFER_BIT), e.disable(e.CULL_FACE), e.enable(e.POLYGON_OFFSET_FILL), e.polygonOffset(1.5, 2);
	}
	#o() {
		let e = this.gl;
		e.disable(e.POLYGON_OFFSET_FILL), e.bindFramebuffer(e.FRAMEBUFFER, null);
	}
	#s(e, t) {
		let n = this.gl;
		for (let r of e) {
			let e = r.instances, i = e ? ["INSTANCED"] : [];
			r.clip && i.push("CLIP");
			let a = r.material, o = a.alphaTest > 0, s = o && !!a.map && a.triplanar > 0;
			o && i.push("ALPHA_TEST", ...a.map ? ["MAP"] : [], ...s ? ["TRIPLANAR"] : []), o && a.map?.uvSet === 1 && r.geometry.uvs2 && i.push("UV2", "uMapSet vUv2");
			let c = this.programs.ready("depth", i, M);
			if (n.useProgram(c.program), c.set("uViewProjection", t), c.set("uModel", r.worldMatrix), r.clip && c.set("uClipPlane", r.clip.plane), o) {
				c.set("uOpacity", a.opacity), c.set("uAlphaTest", a.alphaTest);
				let e = a.map;
				e && (c.set("uMapUv", f(e)), c.set("uMap", this.resources.texture(e))), s && c.set("uTriplanar", a.triplanar);
			}
			this.resources.drawTriangles(r.geometry, e);
		}
	}
	outlineMask(e, t, n, r, i, a) {
		let o = this.gl, s = this.#c(n, r, a);
		o.bindFramebuffer(o.FRAMEBUFFER, s.msaa ? s.msaa.framebuffer : s.mask.framebuffer), s.msaa && o.drawBuffers([o.COLOR_ATTACHMENT0, o.COLOR_ATTACHMENT1]), o.viewport(0, 0, n, r), o.clearColor(0, 0, 0, 0), o.clear(o.COLOR_BUFFER_BIT), o.disable(o.DEPTH_TEST), o.disable(o.BLEND), o.disable(o.CULL_FACE), o.depthMask(!1);
		let c = 1;
		for (let n of e) {
			let e = Math.min(v, Math.max(1, Math.round(n.width * i)));
			c = Math.max(c, e);
			for (let r of n.items) {
				let i = r.instances ? ["INSTANCED"] : [];
				r.clip && i.push("CLIP");
				let s = a ? this.programs.ready("outline-cover", i, k) : this.programs.ready("outline-mask", i, E);
				o.useProgram(s.program), s.set("uViewProjection", t.camera.viewProjection), s.set("uModel", r.worldMatrix), s.set("uMask", [
					n.color[0],
					n.color[1],
					n.color[2],
					e / v
				]), r.clip && s.set("uClipPlane", r.clip.plane), this.resources.drawTriangles(r.geometry, r.instances);
			}
		}
		if (s.msaa && s.coverage) {
			o.bindFramebuffer(o.READ_FRAMEBUFFER, s.msaa.framebuffer);
			for (let [e, t] of [[o.COLOR_ATTACHMENT0, s.mask], [o.COLOR_ATTACHMENT1, s.coverage]]) o.readBuffer(e), o.bindFramebuffer(o.DRAW_FRAMEBUFFER, t.framebuffer), o.blitFramebuffer(0, 0, n, r, 0, 0, n, r, o.COLOR_BUFFER_BIT, o.NEAREST);
		}
		if (o.bindFramebuffer(o.FRAMEBUFFER, s.wide.framebuffer), o.clear(o.COLOR_BUFFER_BIT), s.coverage) {
			let e = this.programs.ready("outline-smooth-widen", [], A);
			o.useProgram(e.program), e.set("uMask", s.mask.texture), e.set("uCoverage", s.coverage.texture), e.set("uTexel", [1 / n, 1 / r]), e.set("uRadius", c);
		} else {
			let e = this.programs.ready("outline-widen", [], D);
			o.useProgram(e.program), e.set("uSource", s.mask.texture), e.set("uStep", [1 / n, 0]), e.set("uRadius", c);
		}
		return this.programs.drawFullscreen(), o.depthMask(!0), o.enable(o.DEPTH_TEST), o.bindFramebuffer(o.FRAMEBUFFER, null), {
			mask: s.mask.texture,
			wide: s.wide.texture,
			coverage: s.coverage?.texture ?? null,
			radius: c,
			width: n,
			height: r
		};
	}
	outlineComposite(e) {
		let t = this.gl;
		if (e.coverage) {
			let n = this.programs.ready("outline-smooth-composite", [], j);
			t.useProgram(n.program), n.set("uNearest", e.wide), n.set("uMask", e.mask), n.set("uCoverage", e.coverage), n.set("uTexel", [1 / e.width, 1 / e.height]), n.set("uRadius", e.radius);
		} else {
			let n = this.programs.ready("outline-composite", [], O);
			t.useProgram(n.program), n.set("uSource", e.wide), n.set("uMask", e.mask), n.set("uStep", [0, 1 / e.height]), n.set("uRadius", e.radius);
		}
		t.disable(t.DEPTH_TEST), t.disable(t.CULL_FACE), t.depthMask(!1), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), this.programs.drawFullscreen(), t.depthMask(!0), t.enable(t.DEPTH_TEST);
	}
	#c(e, t, n) {
		let r = this.#i;
		if (r && r.width === e && r.height === t && r.smooth === n) return r;
		let i = this.gl;
		if (r) {
			for (let e of [
				r.mask,
				r.wide,
				r.coverage
			]) e && (i.deleteTexture(e.texture), i.deleteFramebuffer(e.framebuffer));
			if (r.msaa) {
				i.deleteFramebuffer(r.msaa.framebuffer);
				for (let e of r.msaa.renderbuffers) i.deleteRenderbuffer(e);
			}
		}
		let a = (n = i.RGBA8) => {
			let r = i.createTexture();
			i.activeTexture(i.TEXTURE15), i.bindTexture(i.TEXTURE_2D, r), i.texStorage2D(i.TEXTURE_2D, 1, n, e, t), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE);
			let a = i.createFramebuffer();
			return i.bindFramebuffer(i.FRAMEBUFFER, a), i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, r, 0), {
				texture: r,
				framebuffer: a
			};
		}, o = null;
		if (n) {
			let n = Math.min(4, i.getParameter(i.MAX_SAMPLES)), r = i.createFramebuffer();
			i.bindFramebuffer(i.FRAMEBUFFER, r), o = {
				framebuffer: r,
				renderbuffers: [i.RGBA8, i.R8].map((r, a) => {
					let o = i.createRenderbuffer();
					return i.bindRenderbuffer(i.RENDERBUFFER, o), i.renderbufferStorageMultisample(i.RENDERBUFFER, n, r, e, t), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + a, i.RENDERBUFFER, o), o;
				})
			};
		}
		return this.#i = {
			width: e,
			height: t,
			smooth: n,
			mask: a(),
			wide: a(),
			coverage: n ? a(i.R8) : null,
			msaa: o
		}, i.bindFramebuffer(i.FRAMEBUFFER, null), this.#i;
	}
	#l(e) {
		let t = this.gl, n = t.createTexture();
		t.activeTexture(t.TEXTURE15), t.bindTexture(t.TEXTURE_2D, n), t.texStorage2D(t.TEXTURE_2D, 1, t.DEPTH_COMPONENT24, e, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_COMPARE_MODE, t.COMPARE_REF_TO_TEXTURE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_COMPARE_FUNC, t.LEQUAL), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
		let r = t.createFramebuffer();
		return t.bindFramebuffer(t.FRAMEBUFFER, r), t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, n, 0), t.drawBuffers([t.NONE]), t.readBuffer(t.NONE), t.bindFramebuffer(t.FRAMEBUFFER, null), {
			texture: n,
			framebuffer: r
		};
	}
	#u(e) {
		let t = this.gl, n = t.createTexture();
		t.activeTexture(t.TEXTURE15), t.bindTexture(t.TEXTURE_CUBE_MAP, n), t.texStorage2D(t.TEXTURE_CUBE_MAP, 1, t.DEPTH_COMPONENT24, e, e), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_COMPARE_MODE, t.COMPARE_REF_TO_TEXTURE), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_COMPARE_FUNC, t.LEQUAL), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
		let r = [
			0,
			1,
			2,
			3,
			4,
			5
		].map((e) => {
			let r = t.createFramebuffer();
			return t.bindFramebuffer(t.FRAMEBUFFER, r), t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_CUBE_MAP_POSITIVE_X + e, n, 0), t.drawBuffers([t.NONE]), t.readBuffer(t.NONE), r;
		});
		return t.bindFramebuffer(t.FRAMEBUFFER, null), {
			texture: n,
			framebuffers: r
		};
	}
	#d(e, t, n) {
		let r = this.gl, i = r.createTexture();
		return r.activeTexture(r.TEXTURE15), r.bindTexture(r.TEXTURE_2D, i), r.texStorage2D(r.TEXTURE_2D, n, r.RGBA16F, e, t), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.REPEAT), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR_MIPMAP_LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1), i;
	}
};
export { L as Passes };

//# sourceMappingURL=passes.js.map