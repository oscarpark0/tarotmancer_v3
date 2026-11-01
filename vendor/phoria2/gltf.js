import { $ as e, F as t, G as n, I as r, K as i, M as a, X as o, at as s, ct as c, et as l, ft as u, jt as d, mt as f, nt as p, ot as m, tt as h, ut as g, wt as _ } from "./core.js";
// src/gltf/Animation.js
var v = class {
	name;
	duration;
	tracks;
	time = 0;
	speed = 1;
	loop = !0;
	playing = !1;
	constructor(e, t) {
		this.name = e, this.tracks = t, this.duration = t.reduce((e, t) => Math.max(e, t.times[t.times.length - 1] ?? 0), 0);
	}
	play() {
		return !this.loop && this.duration && (this.speed >= 0 && this.time >= this.duration ? this.seek(0) : this.speed < 0 && this.time <= 0 && this.seek(this.duration)), this.playing = !0, this;
	}
	pause() {
		return this.playing = !1, this;
	}
	stop() {
		return this.playing = !1, this.seek(0), this;
	}
	seek(e) {
		return this.time = e, this.apply(), this;
	}
	advance(e) {
		if (!this.playing) return;
		if (!this.duration) {
			this.apply();
			return;
		}
		let t = this.time + e * this.speed;
		this.loop ? t = (t % this.duration + this.duration) % this.duration : (this.speed >= 0 ? t >= this.duration : t <= 0) && (t = Math.min(Math.max(t, 0), this.duration), this.playing = !1), this.seek(t);
	}
	apply() {
		for (let e of this.tracks) b(e, this.time);
	}
}, y = /* @__PURE__ */ new Float32Array(4);
function b(e, t) {
	let { times: n, values: r, node: i, path: a, interpolation: o } = e, s = a === "quaternion" ? 4 : 3, c = o === "CUBICSPLINE", l = c ? s * 3 : s, d = (e) => c ? e * l + s : e * l, p = n.length - 1, m = y;
	if (t <= n[0] || p === 0) for (let e = 0; e < s; e++) m[e] = r[d(0) + e];
	else if (t >= n[p]) for (let e = 0; e < s; e++) m[e] = r[d(p) + e];
	else {
		let e = 0, i = p;
		for (; i - e > 1;) {
			let r = e + i >> 1;
			n[r] <= t ? e = r : i = r;
		}
		let a = n[e], h = n[i] - a, g = h > 0 ? (t - a) / h : 0;
		if (o === "STEP") for (let t = 0; t < s; t++) m[t] = r[d(e) + t];
		else if (c) {
			let t = g * g, n = t * g, a = 2 * n - 3 * t + 1, o = n - 2 * t + g, c = -2 * n + 3 * t, d = n - t, f = e * l, p = i * l;
			for (let e = 0; e < s; e++) m[e] = a * r[f + s + e] + o * h * r[f + s * 2 + e] + c * r[p + s + e] + d * h * r[p + e];
			s === 4 && u(m, m);
		} else if (s === 4) f(m, r.subarray(e * 4, e * 4 + 4), r.subarray(i * 4, i * 4 + 4), g);
		else for (let t = 0; t < 3; t++) m[t] = r[e * 3 + t] + (r[i * 3 + t] - r[e * 3 + t]) * g;
	}
	a === "quaternion" ? i.quaternion.set(m[0], m[1], m[2], m[3]) : i[a].set(m[0], m[1], m[2]);
}
// src/gltf/load.js
var x = /* @__PURE__ */ new Set([
	"KHR_materials_emissive_strength",
	"KHR_texture_transform",
	"KHR_lights_punctual",
	"KHR_materials_unlit",
	"KHR_mesh_quantization",
	"KHR_materials_transmission",
	"KHR_materials_clearcoat",
	"KHR_materials_sheen",
	"KHR_materials_ior",
	"KHR_materials_specular",
	"KHR_materials_anisotropy",
	"KHR_materials_diffuse_transmission"
]), S = /* @__PURE__ */ new Set([
	"KHR_draco_mesh_compression",
	"EXT_meshopt_compression",
	"KHR_texture_basisu"
]), C = {
	SCALAR: 1,
	VEC2: 2,
	VEC3: 3,
	VEC4: 4,
	MAT2: 4,
	MAT3: 9,
	MAT4: 16
}, w = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array
}, T = {
	5120: 127,
	5121: 255,
	5122: 32767,
	5123: 65535,
	5125: 1
}, E = {
	33071: "clamp",
	33648: "mirror",
	10497: "repeat"
}, D = class extends p {
	static type = "model";
	animations = [];
	cameras = [];
	get meshes() {
		return this.findAll((e) => e instanceof o);
	}
	play(e = 0) {
		let t = typeof e == "number" ? this.animations[e] : this.animations.find((t) => t.name === e);
		if (!t) {
			let t = this.animations.map((e) => `'${e.name}'`).join(", ");
			return d(this, `no animation ${typeof e == "number" ? e : `'${e}'`} - this model has ${t || "none"}`), null;
		}
		return t.play();
	}
	toJSON() {
		return {
			...super.toJSON(),
			type: "group"
		};
	}
};
async function O(e, t = {}) {
	let n = await fetch(e).catch((t) => {
		throw new _(`loadGLTF: couldn't fetch '${e}' - ${t.message}`);
	});
	if (!n.ok) throw new _(`loadGLTF: couldn't fetch '${e}' (${n.status} ${n.statusText})`);
	let r = t.baseUrl ?? new URL(e, globalThis.location?.href ?? "file:///").href;
	return k(await n.arrayBuffer(), {
		...t,
		baseUrl: r
	});
}
async function k(e, t = {}) {
	let { json: n, bin: r } = A(e), i = String(n.asset?.version ?? "");
	if (!i.startsWith("2.")) throw new _(`loadGLTF: glTF ${i || "(no version)"} isn't supported - only glTF 2.0`);
	for (let e of n.extensionsRequired ?? []) {
		if (x.has(e)) continue;
		let t = S.has(e) ? " - export the model without compression for now" : "";
		throw new _(`loadGLTF: the model requires '${e}', which isn't supported${t}`);
	}
	let a = new D({ name: n.scenes?.[n.scene ?? 0]?.name ?? "model" });
	for (let e of n.extensionsUsed ?? []) x.has(e) || d(a, `the model uses '${e}', which isn't supported - it is ignored`);
	let o = new j(n, r, t.baseUrl ?? "", a);
	await o.buffers(), o.scene();
	let s = o.textures();
	return (t.waitForTextures ?? !0) && await s, a;
}
function A(e) {
	if (typeof e == "string") return {
		json: JSON.parse(e),
		bin: null
	};
	if (!(e instanceof ArrayBuffer) && !ArrayBuffer.isView(e)) return {
		json: e,
		bin: null
	};
	let t = e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength), n = new DataView(t.buffer, t.byteOffset, t.byteLength);
	if (t.length >= 12 && n.getUint32(0, !0) === 1179937895) {
		let e = null, r = null;
		for (let i = 12; i + 8 <= t.length;) {
			let a = n.getUint32(i, !0), o = n.getUint32(i + 4, !0), s = t.subarray(i + 8, i + 8 + a);
			o === 1313821514 ? e = JSON.parse(new TextDecoder().decode(s)) : o === 5130562 && (r = s), i += 8 + a;
		}
		if (!e) throw new _("loadGLTF: the .glb file has no JSON chunk");
		return {
			json: e,
			bin: r
		};
	}
	return {
		json: JSON.parse(new TextDecoder().decode(t)),
		bin: null
	};
}
var j = class {
	#e = [];
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Map();
	#i = [];
	#a = [];
	constructor(e, t, n, r) {
		this.json = e, this.bin = t, this.base = n, this.model = r;
	}
	#o(e) {
		try {
			return new URL(e, this.base || void 0).href;
		} catch {
			return e;
		}
	}
	async buffers() {
		this.#e = await Promise.all((this.json.buffers ?? []).map(async (e, t) => {
			if (e.uri === void 0) {
				if (t !== 0 || !this.bin) throw new _(`loadGLTF: buffer ${t} has no uri and there is no binary chunk`);
				return this.bin;
			}
			let n = this.#o(e.uri), r = await fetch(n).catch((t) => {
				throw new _(`loadGLTF: couldn't fetch buffer '${e.uri}' - ${t.message}`);
			});
			if (!r.ok) throw new _(`loadGLTF: couldn't fetch buffer '${e.uri}' (${r.status})`);
			return new Uint8Array(await r.arrayBuffer());
		}));
	}
	async textures() {
		await Promise.all([...this.#t.values()].map((e) => e.ready.catch((e) => d(this.model, e.message))));
		for (let e of this.#a) URL.revokeObjectURL(e);
	}
	scene() {
		let e = this.json;
		this.#i = (e.nodes ?? []).map((e, t) => this.#s(t)), (e.nodes ?? []).forEach((e, t) => {
			for (let n of e.children ?? []) this.#i[t].add(this.#i[n]);
		});
		let t = e.scenes?.[e.scene ?? 0], n = t ? t.nodes ?? [] : this.#i.map((e, t) => t).filter((e) => !this.#i[e].parent);
		for (let e of n) this.model.add(this.#i[e]);
		if (this.model.animations = (e.animations ?? []).map((e, t) => this.#_(e, t)), this.model.animations.length) {
			let e = this.model;
			e.onUpdate((t, n) => {
				for (let t of e.animations) t.advance(n);
			});
		}
	}
	#s(e) {
		let t = this.json.nodes[e], n = t.name ?? `node ${e}`;
		t.skin !== void 0 && d(this.model, `skinned meshes aren't supported - '${n}' is drawn in its bind pose`), (t.weights || t.mesh !== void 0 && this.json.meshes[t.mesh].weights) && d(this.model, "morph targets aren't supported - meshes are drawn without them");
		let r = t.mesh === void 0 ? [] : this.#c(t.mesh), i = r.length === 1 ? r[0] : new p();
		for (let e of r.length > 1 ? r : []) i.add(e);
		if (i.name = n, t.matrix ? M(i, t.matrix) : (t.translation && i.position.set(t.translation[0], t.translation[1], t.translation[2]), t.rotation && i.quaternion.set(t.rotation[0], t.rotation[1], t.rotation[2], t.rotation[3]), t.scale && i.scale.set(t.scale[0], t.scale[1], t.scale[2])), t.camera !== void 0) {
			let e = this.#h(t.camera);
			i.add(e), this.model.cameras.push(e);
		}
		let a = t.extensions?.KHR_lights_punctual?.light;
		return a !== void 0 && i.add(this.#g(a)), t.extras && typeof t.extras == "object" && (i.userData = { ...t.extras }), i;
	}
	#c(t) {
		let n = this.json.meshes[t];
		return n.primitives.map((r, i) => {
			let a = this.#l(r), o = r.material === void 0 ? this.#p() : this.#f(r.material), s = r.mode ?? 4, c;
			return c = s === 0 ? new h({
				geometry: a,
				material: P(o)
			}) : s === 1 || s === 2 || s === 3 ? new e({
				geometry: I(a, s),
				material: P(o)
			}) : new l({
				geometry: s === 4 ? a : F(a, s),
				material: o
			}), c.name = n.primitives.length > 1 ? `${n.name ?? `mesh ${t}`} ${i}` : n.name ?? `mesh ${t}`, c;
		});
	}
	#l(e) {
		let t = JSON.stringify([e.attributes, e.indices]), n = this.#r.get(t);
		if (n) return n;
		let r = e.attributes;
		if (r.POSITION === void 0) throw new _("loadGLTF: a mesh primitive has no POSITION");
		let i = { positions: this.#u(r.POSITION) };
		r.NORMAL !== void 0 && (i.normals = this.#u(r.NORMAL)), r.TEXCOORD_0 !== void 0 && (i.uvs = this.#u(r.TEXCOORD_0)), r.TEXCOORD_1 !== void 0 && (i.uvs2 = this.#u(r.TEXCOORD_1)), r.COLOR_0 !== void 0 && (i.colors = N(this.#u(r.COLOR_0), C[this.json.accessors[r.COLOR_0].type])), e.indices !== void 0 && (i.indices = this.#u(e.indices, !0));
		let a = new c(i);
		return this.#r.set(t, a), a;
	}
	#u(e, t = !1) {
		let n = this.json.accessors[e], r = C[n.type], i = n.count * r, a = t ? new Uint32Array(i) : new Float32Array(i), o = n.normalized && !t ? 1 / T[n.componentType] : 1;
		if (n.bufferView !== void 0 && this.#d(n.bufferView, n.byteOffset ?? 0, n.componentType, r, n.count, a, o), n.sparse) {
			let e = n.sparse, i = new Uint32Array(e.count);
			this.#d(e.indices.bufferView, e.indices.byteOffset ?? 0, e.indices.componentType, 1, e.count, i, 1);
			let s = t ? new Uint32Array(e.count * r) : new Float32Array(e.count * r);
			this.#d(e.values.bufferView, e.values.byteOffset ?? 0, n.componentType, r, e.count, s, o);
			for (let t = 0; t < e.count; t++) a.set(s.subarray(t * r, t * r + r), i[t] * r);
		}
		if (n.normalized && !t && (n.componentType === 5120 || n.componentType === 5122)) for (let e = 0; e < a.length; e++) a[e] = Math.max(a[e], -1);
		return a;
	}
	#d(e, t, n, r, i, a, o) {
		let s = this.json.bufferViews[e], c = this.#e[s.buffer], l = w[n];
		if (!l) throw new _(`loadGLTF: unknown component type ${n}`);
		let u = l.BYTES_PER_ELEMENT, d = s.byteStride || r * u, f = c.byteOffset + (s.byteOffset ?? 0) + t, p = new DataView(c.buffer), m = {
			5120: (e) => p.getInt8(e),
			5121: (e) => p.getUint8(e),
			5122: (e) => p.getInt16(e, !0),
			5123: (e) => p.getUint16(e, !0),
			5125: (e) => p.getUint32(e, !0),
			5126: (e) => p.getFloat32(e, !0)
		}[n];
		if (n === 5126 && d === r * 4 && f % 4 == 0 && o === 1 && a instanceof Float32Array) a.set(new Float32Array(c.buffer, f, i * r));
		else for (let e = 0; e < i; e++) for (let t = 0; t < r; t++) a[e * r + t] = m(f + e * d + t * u) * o;
	}
	#f(e) {
		let t = this.#n.get(e);
		if (t) return t;
		let n = this.json.materials[e], r = n.pbrMetallicRoughness ?? {}, i = new s({ name: n.name ?? `material ${e}` }), a = r.baseColorFactor ?? [
			1,
			1,
			1,
			1
		];
		i.color.setLinear(a[0], a[1], a[2]), i.metalness = r.metallicFactor ?? 1, i.roughness = r.roughnessFactor ?? 1, r.baseColorTexture && (i.map = this.#m(r.baseColorTexture, "srgb")), r.metallicRoughnessTexture && (i.roughnessMap = i.metalnessMap = this.#m(r.metallicRoughnessTexture, "linear")), n.normalTexture && (i.normalMap = this.#m(n.normalTexture, "linear"), i.normalScale = n.normalTexture.scale ?? 1), n.occlusionTexture && (i.aoMap = this.#m(n.occlusionTexture, "linear"), i.aoMapIntensity = Math.min(Math.max(n.occlusionTexture.strength ?? 1, 0), 1)), n.emissiveFactor && i.emissive.setLinear(n.emissiveFactor[0], n.emissiveFactor[1], n.emissiveFactor[2]), n.emissiveTexture && (i.emissiveMap = this.#m(n.emissiveTexture, "srgb"), n.emissiveFactor || i.emissive.setLinear(1, 1, 1)), i.emissiveIntensity = n.extensions?.KHR_materials_emissive_strength?.emissiveStrength ?? 1, n.extensions?.KHR_materials_unlit && (i.unlit = !0);
		let o = (e) => Math.min(Math.max(e, 0), 1), c = n.extensions ?? {}, l = c.KHR_materials_transmission, u = c.KHR_materials_clearcoat, d = c.KHR_materials_sheen;
		if (l && (i.transmission = o(l.transmissionFactor ?? 0)), u && (i.clearcoat = o(u.clearcoatFactor ?? 0), i.clearcoatRoughness = o(u.clearcoatRoughnessFactor ?? 0)), d) {
			let e = d.sheenColorFactor ?? [
				0,
				0,
				0
			];
			Math.max(e[0], e[1], e[2]) > 0 && (i.sheen = 1, i.sheenColor.setLinear(e[0], e[1], e[2])), i.sheenRoughness = o(d.sheenRoughnessFactor ?? 0);
		}
		c.KHR_materials_ior?.ior >= 1 && (i.ior = c.KHR_materials_ior.ior);
		let f = c.KHR_materials_specular;
		if (f) {
			i.specularIntensity = o(f.specularFactor ?? 1);
			let e = f.specularColorFactor ?? [
				1,
				1,
				1
			];
			i.specularColor.setLinear(e[0], e[1], e[2]);
		}
		let p = c.KHR_materials_anisotropy;
		p && (i.anisotropy = o(p.anisotropyStrength ?? 0), i.anisotropyRotation = p.anisotropyRotation ?? 0);
		let m = c.KHR_materials_diffuse_transmission;
		if (m) {
			i.translucency = o(m.diffuseTransmissionFactor ?? 0);
			let e = m.diffuseTransmissionColorFactor ?? [
				1,
				1,
				1
			];
			i.translucencyColor.setLinear(e[0], e[1], e[2]);
		}
		return n.alphaMode === "BLEND" ? (i.opacity = a[3], i.transparent = !0, i.depthWrite = !1) : n.alphaMode === "MASK" && (i.alphaTest = n.alphaCutoff ?? .5), i.doubleSided = !!n.doubleSided, this.#n.set(e, i), i;
	}
	#p() {
		let e = this.#n.get(-1);
		return e || this.#n.set(-1, e = new s({
			name: "default",
			metalness: 1,
			roughness: 1
		})), e;
	}
	#m(e, t) {
		let n = e.extensions?.KHR_texture_transform, r = n?.texCoord ?? e.texCoord ?? 0;
		r > 1 && (d(this.model, `textures on a third UV set or later (TEXCOORD_${r}) are drawn with the first`), r = 0);
		let i = JSON.stringify([
			e.index,
			t,
			n?.offset,
			n?.scale,
			n?.rotation,
			r
		]), a = this.#t.get(i);
		if (a) return a;
		let o = this.json.textures[e.index], s = this.json.samplers?.[o.sampler] ?? {}, c = this.json.images[o.source];
		if (o.source === void 0 || !c) throw new _(`loadGLTF: texture ${e.index} has no image (compressed textures aren't supported)`);
		let l;
		if (c.bufferView !== void 0) {
			let e = this.json.bufferViews[c.bufferView], t = this.#e[e.buffer].subarray(e.byteOffset ?? 0, (e.byteOffset ?? 0) + e.byteLength);
			l = URL.createObjectURL(new Blob([t], { type: c.mimeType ?? "image/png" })), this.#a.push(l);
		} else l = this.#o(c.uri);
		let u = new m({
			url: l,
			colorSpace: t,
			wrap: E[s.wrapS ?? 10497] ?? "repeat",
			filter: s.magFilter === 9728 ? "nearest" : "linear",
			flipY: !1,
			repeat: n?.scale ?? [1, 1],
			offset: n?.offset ?? [0, 0],
			rotation: n?.rotation ?? 0,
			uvSet: r
		});
		return this.#t.set(i, u), u;
	}
	#h(e) {
		let t = this.json.cameras[e], r = t.name ?? `camera ${e}`;
		if (t.type === "orthographic") {
			let e = t.orthographic;
			return new n({
				name: r,
				height: e.ymag * 2,
				near: e.znear,
				far: e.zfar
			});
		}
		let a = t.perspective;
		return new i({
			name: r,
			fov: a.yfov * 180 / Math.PI,
			near: a.znear,
			far: a.zfar ?? 1e6
		});
	}
	#g(e) {
		let n = this.json.extensions?.KHR_lights_punctual?.lights?.[e];
		if (!n) throw new _(`loadGLTF: KHR_lights_punctual light ${e} doesn't exist`);
		let i = n.color ?? [
			1,
			1,
			1
		], o = {
			name: n.name,
			intensity: (n.intensity ?? 1) / Math.PI
		}, s;
		if (n.type === "directional") s = new a({
			...o,
			direction: [
				0,
				0,
				-1
			]
		});
		else if (n.type === "spot") {
			let e = n.spot?.outerConeAngle ?? Math.PI / 4, t = n.spot?.innerConeAngle ?? 0;
			s = new r({
				...o,
				direction: [
					0,
					0,
					-1
				],
				range: n.range ?? 0,
				angle: e,
				penumbra: e > 0 ? 1 - t / e : 0
			});
		} else s = new t({
			...o,
			range: n.range ?? 0
		});
		return s.color.setLinear(i[0], i[1], i[2]), s;
	}
	#_(e, t) {
		let n = [];
		for (let t of e.channels) {
			let r = {
				translation: "position",
				rotation: "quaternion",
				scale: "scale"
			}[t.target.path];
			if (!r) {
				d(this.model, `'${t.target.path}' animations aren't supported - only translation, rotation and scale`);
				continue;
			}
			let i = this.#i[t.target.node];
			if (!i) continue;
			let a = e.samplers[t.sampler];
			n.push({
				node: i,
				path: r,
				times: this.#u(a.input),
				values: this.#u(a.output),
				interpolation: a.interpolation ?? "LINEAR"
			});
		}
		return new v(e.name ?? `animation ${t}`, n);
	}
};
function M(e, t) {
	let n = Math.hypot(t[0], t[1], t[2]), r = Math.hypot(t[4], t[5], t[6]), i = Math.hypot(t[8], t[9], t[10]);
	t[0] * (t[5] * t[10] - t[6] * t[9]) - t[4] * (t[1] * t[10] - t[2] * t[9]) + t[8] * (t[1] * t[6] - t[2] * t[5]) < 0 && (n = -n);
	let a = [
		t[0] / n,
		t[1] / n,
		t[2] / n,
		t[4] / r,
		t[5] / r,
		t[6] / r,
		t[8] / i,
		t[9] / i,
		t[10] / i
	], o = u([
		0,
		0,
		0,
		1
	], g([
		0,
		0,
		0,
		1
	], a));
	e.position.set(t[12], t[13], t[14]), e.quaternion.set(o[0], o[1], o[2], o[3]), e.scale.set(n, r, i);
}
function N(e, t) {
	let n = e.length / t, r = new Float32Array(n * 3);
	for (let i = 0; i < n; i++) for (let n = 0; n < 3; n++) {
		let a = Math.min(Math.max(e[i * t + n], 0), 1);
		r[i * 3 + n] = a <= .0031308 ? a * 12.92 : 1.055 * a ** (1 / 2.4) - .055;
	}
	return r;
}
function P(e) {
	return new s({
		name: e.name,
		color: e.color.getStyle(),
		opacity: e.opacity,
		map: e.map,
		vertexColors: !0,
		size: 2,
		sizeAttenuation: !1
	});
}
function F(e, t) {
	let n = e.indices ?? Uint32Array.from({ length: e.vertexCount }, (e, t) => t), r = [];
	for (let e = 2; e < n.length; e++) t === 6 ? r.push(n[0], n[e - 1], n[e]) : e % 2 == 0 ? r.push(n[e - 2], n[e - 1], n[e]) : r.push(n[e - 1], n[e - 2], n[e]);
	return L(e, r, !0);
}
function I(e, t) {
	if (t === 1) return e;
	let n = e.indices ?? Uint32Array.from({ length: e.vertexCount }, (e, t) => t), r = [];
	for (let e = 1; e < n.length; e++) r.push(n[e - 1], n[e]);
	return t === 2 && n.length > 2 && r.push(n[n.length - 1], n[0]), L(e, r, !1);
}
function L(e, t, n) {
	return new c({
		positions: e.positions,
		normals: n && e.hasNormals ? e.normals : void 0,
		uvs: e.uvs ?? void 0,
		uvs2: e.uvs2 ?? void 0,
		colors: e.colors ?? void 0,
		indices: t
	});
}
export { v as Animation, D as Model, O as loadGLTF, k as parseGLTF };

//# sourceMappingURL=gltf.js.map