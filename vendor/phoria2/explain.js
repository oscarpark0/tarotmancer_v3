import { xt as e } from "./core.js";
// src/explain.js
var t = (e) => Math.abs(e) >= 1e4 || e !== 0 && Math.abs(e) < .001 ? e.toExponential(2) : String(+e.toFixed(2)), n = (e) => `[${t(e[0])}, ${t(e[1])}, ${t(e[2])}]`, r = (e, t) => `${e} ${t}${e === 1 ? "" : "s"}`;
function i(t) {
	let n = null;
	for (let { node: r } of t) r.drawMode === "triangles" && (n = r.expandBounds(n ?? new e()));
	return n;
}
function a(e) {
	let { frame: a, bounds: o } = e, s = a.camera.camera, c = s.constructor.type === "orthographic-camera", l = [], u = [];
	l.push(`View ${e.width} x ${e.height} CSS px at pixel ratio ${t(e.pixelRatio)}; draws ${e.renderMode === "auto" ? "when something changes" : e.renderMode === "always" ? "every frame" : "only on view.render()"}; loop ${e.running ? "running" : "stopped"}${e.sharedContext ? "; shared WebGL context" : ""}`), l.push(`Camera: ${c ? `orthographic, ${t(s.height)} units high` : `perspective, fov ${t(s.fov)}`}, at ${n(s.position)}${s.target ? ` looking at ${n(s.target)}` : ""}, near ${t(s.near)}, far ${t(s.far)}`);
	let d = [...a.opaque, ...a.transparent], f = /* @__PURE__ */ new Map();
	for (let { node: e, instances: t } of d) {
		let n = t ? "instanced mesh" : e.drawMode === "points" ? "points" : e.drawMode === "lines" ? "lines" : "mesh", r = f.get(n) ?? {
			n: 0,
			items: 0
		};
		r.n++, r.items += t ? t.count : n === "points" ? e.geometry.drawnVertices : 0, f.set(n, r);
	}
	let p = [...f].map(([e, t]) => `${t.n} ${e}${t.items ? ` (${t.items.toLocaleString("en")} ${e === "points" ? "points" : "instances"})` : ""}`);
	l.push(`Scene: ${r(e.nodes, "node")}; drew ${a.stats.drawn}${p.length ? ` - ${p.join(", ")}` : ""}; ${a.stats.culled} outside the view`);
	for (let t of e.notes ?? []) l.push(t);
	if (!o.isEmpty()) {
		let r = o.getCenter(), f = o.getRadius(), p = Math.hypot(s.position[0] - r[0], s.position[1] - r[1], s.position[2] - r[2]), m = e.fills, h = c ? s.height : 2 * p * Math.tan(s.fov * Math.PI / 360), g = m ? Math.max(m.width, m.height) : 2 * f / h, _ = (e) => `${Math.round(e * 100)}%`;
		l.push(`Bounds: ${n(o.min)} to ${n(o.max)}, centre ${n(r)}, radius ${t(f)}; ` + (m ? `on screen it spans ${_(m.width)} of the view's width and ${_(m.height)} of its height` : `about ${_(g)} of the view's height (part of it is behind the camera)`)), a.stats.drawn && g < .05 && u.push(`the scene fills only ${Math.round(g * 100)}% of the view - call view.frame() to fit the camera to it`);
		let v = i(d);
		!c && v && v.containsPoint(s.position) && u.push("the camera is inside the solid objects' bounds - call view.frame() to step back"), p - f > s.far ? u.push(`the scene is beyond camera.far (${t(s.far)}) - raise camera.far or call view.frame()`) : p + f > s.far && u.push(`the far side of the scene is beyond camera.far (${t(s.far)}) and is cut off`);
	}
	let m = /* @__PURE__ */ new Map();
	for (let e of a.lights) m.set(e.kind, (m.get(e.kind) ?? 0) + 1);
	let h = a.environment, g = typeof h == "string" ? h === "none" ? "" : `; environment '${h}'` : `; environment ${h.url ? `'${h.url}'` : "image"} (${h.image ? h.isHDR ? "HDR" : "not HDR - ignored; use a .hdr file" : "loading"})`;
	l.push(`Lights: ${m.size ? [...m].map(([e, t]) => `${t} ${e}`).join(", ") : "none"}${g}`);
	let _ = d.filter((e) => e.node.receiveShadow).length;
	a.shadow ? (l.push(`Shadows: ${r(a.shadow.casters.length, "caster")}, ${r(_, "receiver")} in view, ${t(a.shadow.texelSize)} units per shadow texel`), _ || u.push("shadows are cast but nothing in view has receiveShadow: true - set it on the ground and other surfaces")) : a.lights.some((e) => e.castShadow) && !a.spotShadows.length && !a.pointShadow && u.push("a light has castShadow but nothing casts - set castShadow: true on the meshes too");
	let v = d.filter((e) => !e.material.unlit && e.node.drawMode === "triangles");
	v.length && !a.lights.length && a.environment === "none" && !e.autoLight && u.push(`${r(v.length, "lit object")} but no lights and autoLight is off - they draw black; add a light, set scene.environment = 'studio' or use unlit materials`);
	let y = d.filter((e) => e.material.opacity === 0).length;
	if (y && u.push(`${r(y, "object")} with material opacity 0 - drawn but invisible`), e.labels && e.labels.total) {
		let t = e.labels;
		l.push(`Labels: ${t.shown} shown, ${t.dimmed ? `${t.dimmed} dimmed (covered by labels or geometry), ` : ""}${t.overlapped} hidden by overlap, ${t.occluded} hidden behind geometry, ${t.offscreen} off screen${t.zoomedOut ? `, ${t.zoomedOut} waiting to be zoomed in to (minScale)` : ""}`), t.overlapped > t.shown * 3 && u.push(`${t.overlapped} labels are hidden by overlap - give the important ones a higher priority, label fewer things, or use overlap: 'dim' or 'show'`), t.offscreen === t.total && u.push("every label is off screen - check their positions, or call view.frame()");
	}
	let b = e.interaction;
	return (b.hover || b.click || b.tooltip || b.highlight) && l.push(`Interaction: ${[
		b.hover && r(b.hover, "hover handler"),
		b.click && r(b.click, "click handler"),
		b.tooltip && "tooltip",
		b.highlight && "hover highlight"
	].filter(Boolean).join(", ")}`), (b.keyboard || b.reducedMotion || b.description) && l.push(`Accessibility: ${[
		b.keyboard && "keyboard (arrow keys step through what can be hovered)",
		b.reducedMotion && "reduced motion",
		b.description && `described as "${b.description}"`
	].filter(Boolean).join(", ")}`), (e.width < 2 || e.height < 2) && u.unshift(`the canvas is ${e.width} x ${e.height} - give it a size in the page (CSS width and height)`), e.contextLost && u.unshift("the WebGL context is lost - nothing draws until the browser restores it"), o.isEmpty() ? u.unshift("the scene has nothing to draw - add a Mesh, InstancedMesh, Points or Lines") : !a.stats.drawn && a.stats.culled && u.unshift(`nothing is in view: ${r(a.stats.culled, "object")} are outside the camera's view - call view.frame() to fit the camera to the scene`), l.push(u.length ? `Warnings:\n${u.map((e) => `- ${e}`).join("\n")}` : "No warnings."), l.join("\n");
}
export { a as explain };

//# sourceMappingURL=explain.js.map