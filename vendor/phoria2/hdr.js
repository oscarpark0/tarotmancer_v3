// src/hdr.js
function e(e) {
	let t = e instanceof Uint8Array ? e : new Uint8Array(e), n = 0, r = () => {
		let e = "";
		for (; n < t.length && t[n] !== 10;) e += String.fromCharCode(t[n++]);
		return n++, e;
	};
	if (!r().startsWith("#?")) throw Error("parseHDR: not a Radiance .hdr file (no '#?' signature)");
	let i = "";
	for (let e = r(); e !== ""; e = r()) {
		if (n >= t.length) throw Error("parseHDR: the header never ends");
		e.startsWith("FORMAT=") && (i = e.slice(7));
	}
	if (i && i !== "32-bit_rle_rgbe") throw Error(`parseHDR: format '${i}' isn't supported - expected 32-bit_rle_rgbe`);
	let a = r().match(/^-Y (\d+) \+X (\d+)$/);
	if (!a) throw Error("parseHDR: only top-to-bottom, left-to-right images (-Y h +X w) are supported");
	let o = Number(a[1]), s = Number(a[2]), c = new Uint8Array(s * o * 4), l = new Uint8Array(s * 4);
	for (let e = 0; e < o; e++) {
		if (!(s >= 8 && s < 32768 && t[n] === 2 && t[n + 1] === 2 && !(t[n + 2] & 128))) {
			c.set(t.subarray(n, n + (o - e) * s * 4), e * s * 4);
			break;
		}
		if ((t[n + 2] << 8 | t[n + 3]) !== s) throw Error("parseHDR: a scanline has the wrong width");
		n += 4;
		for (let e = 0; e < 4; e++) {
			let r = 0;
			for (; r < s;) {
				let i = t[n++];
				if (i > 128) {
					i -= 128;
					let a = t[n++];
					for (let t = 0; t < i; t++) l[r++ * 4 + e] = a;
				} else for (let a = 0; a < i; a++) l[r++ * 4 + e] = t[n++];
			}
		}
		c.set(l, e * s * 4);
	}
	let u = new Float32Array(s * o * 4);
	for (let e = 0; e < s * o; e++) {
		let t = c[e * 4 + 3], n = t ? 2 ** (t - 136) : 0;
		u[e * 4] = c[e * 4] * n, u[e * 4 + 1] = c[e * 4 + 1] * n, u[e * 4 + 2] = c[e * 4 + 2] * n, u[e * 4 + 3] = 1;
	}
	return {
		data: u,
		width: s,
		height: o
	};
}
export { e as parseHDR };

//# sourceMappingURL=hdr.js.map