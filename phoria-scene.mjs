import { View, Group, Mesh, Points, Geometry, Label, Texture, OrthographicCamera, PerspectiveCamera } from './vendor/phoria2/phoria2.js';
import { layouts, cardPose, dealPose, shufflePose, SHUFFLE_SECONDS } from './scene-layouts.mjs';
import { cardFaceGeometry, cardBodyGeometry } from './card-geometry.mjs';

const BACK = 'https://ik.imagekit.io/tarotmancer/cardback.webp';
const rand = (min, max) => min + Math.random() * (max - min);

export class TarotScene {
    constructor(canvas, { interactive = false, description = 'Tarotmancer stars', perspective = false, onError = () => {} } = {}) {
        this.canvas = canvas;
        this.active = true;
        this.perspective = perspective;
        this.generation = 0;
        this.onError = onError;
        this.textures = new Map();
        this.cards = [];
        this.disposed = false;
        this.view = new View({ canvas, camera: perspective
            ? new PerspectiveCamera({ fov: 36, position: [0, 0, 30], target: [0, 0, 0], near: 0.1, far: 100 })
            : new OrthographicCamera({ height: 12, position: [0, 0, 30], target: [0, 0, 0], near: 0.1, far: 100 }),
            autoLight: false, toneMapping: 'none', keyboard: interactive,
            description, pixelRatio: Math.min(window.devicePixelRatio || 1, 2) });
        this.cardGroup = this.view.scene.add(new Group());
        this.starGroup = this.view.scene.add(new Group({ pickable: false }));
        this.elapsed = 0;
        this.view.start((dt) => {
            if (this.active && !document.hidden && !this.contextLost) this.update(Math.min(dt, 0.1));
        });
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(canvas);
        this.onLost = event => {
            event.preventDefault();
            this.contextLost = true;
            this.finishDeal?.();
            this.finishDeal = null;
            this.onError('The graphics context was lost. Reload the page to restore the scene.');
        };
        this.onRestored = () => { this.contextLost = false; this.view.invalidate(); };
        canvas.addEventListener('webglcontextlost', this.onLost);
        canvas.addEventListener('webglcontextrestored', this.onRestored);
        this.pointer = { x: 0, y: 0 };
        this.onPointer = event => {
            const rect = canvas.getBoundingClientRect();
            this.pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.22;
            this.pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.16;
        };
        this.onLeave = () => { this.pointer.x = 0; this.pointer.y = 0; };
        canvas.addEventListener('pointermove', this.onPointer);
        canvas.addEventListener('pointerleave', this.onLeave);
    }

    texture(url) {
        if (!this.textures.has(url)) {
            const texture = new Texture({ url, wrap: 'clamp' });
            texture.ready.then(() => {
                if (this.disposed || this.textures.get(url) !== texture) texture.dispose();
                else this.view.invalidate();
            }).catch(() => {
                if (!this.disposed && this.textures.get(url) === texture) {
                    this.onError('Some card artwork could not load. Card names and reading controls are still available.');
                }
            });
            this.textures.set(url, texture);
        }
        return this.textures.get(url);
    }

    makeCard(card, onSelect, width = 500, backOnly = false) {
        const root = this.cardGroup.add(new Group({ name: card.name,
            highlight: onSelect ? '#153c22' : null, highlightWhole: true,
            tooltip: () => `${card.position ? card.position + ': ' : ''}${card.name}${card.isReversed ? ' (Reversed)' : ''}`,
            onClick: () => { if (entry.ready) onSelect?.(card); } }));
        root.pickable = !backOnly;
        const flip = root.add(new Group());
        flip.add(new Mesh({ geometry: cardBodyGeometry(), material: { color: '#3d7159', unlit: true } }));
        const front = flip.add(new Mesh({ name: card.name, geometry: cardFaceGeometry(),
            material: { color: '#123b22', map: this.texture(backOnly ? BACK : `${card.image_url}${card.image_url.includes('?') ? '&' : '?'}tr=w-${width},q-90,f-auto`), unlit: true },
            rotation: [0, 0, card.isReversed ? Math.PI : 0], position: [0, 0, 0.016] }));
        const back = flip.add(new Mesh({ geometry: cardFaceGeometry(), material: { color: '#123b22', map: this.texture(BACK), unlit: true },
            rotation: [0, Math.PI, 0], position: [0, 0, -0.016] }));
        const placeholder = root.add(new Label({ text: card.name, className: 'scene-label',
            position: [0, 0, 0.02], place: 'center', pickable: false, visible: !backOnly && this.mode === 'zoom' }));
        front.material.map.ready.then(() => {
            if (!this.disposed && root.parent) {
                front.material.color.set('white');
                placeholder.visible = false;
            }
        }).catch(() => {});
        back.material.map.ready.then(() => {
            if (!this.disposed && root.parent) back.material.color.set('white');
        }).catch(() => {});
        const entry = { card, root, flip, front, placeholder, ready: false, base: [0, 0, 0, 0] };
        this.cards.push(entry);
        return entry;
    }

    clearCards() {
        this.generation++;
        this.finishDeal?.();
        this.finishDeal = null;
        this.animating = false;
        this.shuffleExtras = [];
        for (const child of [...this.cardGroup.children]) {
            child.removeFromParent();
            child.dispose();
        }
        this.cards = [];
        // Textures are owned by this scene, not by individual meshes.
        for (const texture of this.textures.values()) texture.dispose();
        this.textures.clear();
    }

    addDeck(count = 14) {
        const entries = [];
        for (let index = 0; index < count; index++) {
            const entry = this.makeCard({ name: 'Tarot deck', image_url: BACK }, null, 500, true);
            this.cards.pop();
            entry.flip.rotation.y = Math.PI;
            entries.push(entry);
        }
        return entries;
    }

    showIdle() {
        this.clearCards();
        this.mode = 'idle';
        this.layout = layouts.threeCard;
        this.shuffleExtras = this.addDeck();
        this.shuffleExtras.forEach((entry, index) => {
            entry.root.position.set(index * 0.008, index * 0.005, index * 0.035);
            entry.root.rotation.set(-0.16, 0.2, -0.12);
        });
        this.resize();
    }

    showSpread(cards, type, onSelect, onPhase = () => {}) {
        this.clearCards();
        this.mode = 'spread';
        this.layout = layouts[type];
        this.canvas.style.aspectRatio = `${this.layout.width} / ${this.layout.height}`;
        this.canvas.parentElement.style.maxWidth = `${this.layout.width * 105}px`;
        this.elapsed = 0;
        this.onPhase = onPhase;
        cards.forEach((card, index) => {
            const entry = this.makeCard(card, onSelect);
            entry.base = this.layout.positions[index];
            const [x, y, z = 0] = entry.base;
            entry.label = this.cardGroup.add(new Label({ text: card.position, className: 'scene-label', pickable: false, visible: false,
                position: type === 'celticCross' && index === 1 ? [x, y - 0.86, 0.2] : [x, y - 1.2, z], place: 'below' }));
            entry.flip.rotation.y = Math.PI;
            entry.root.position.z = (cards.length - index) * 0.038;
        });
        this.shuffleExtras = this.view.reducedMotion ? [] : this.addDeck(16 - cards.length);
        this.shuffleExtras.forEach((entry, index) => { entry.root.position.z = -index * 0.038; });
        this.resize();
        const generation = this.generation;
        const finished = new Promise(resolve => { this.finishDeal = resolve; });
        onPhase('Preparing the deck…');
        // Start once the backs are ready; a failed/slow image must never block a reading.
        let timeout;
        const timeoutPromise = new Promise(resolve => { timeout = setTimeout(resolve, 5000); });
        Promise.race([this.texture(BACK).ready.catch(() => {}), timeoutPromise]).then(() => {
            clearTimeout(timeout);
            if (this.disposed || generation !== this.generation) return;
            this.elapsed = 0;
            this.animating = true;
            this.phase = 'shuffle';
            onPhase(this.view.reducedMotion ? '' : 'Shuffling the deck…');
            this.update(0);
        });
        return finished;
    }

    showCard(card) {
        this.clearCards();
        this.mode = 'zoom';
        this.active = true;
        this.layout = { width: 1.65, height: 2.55 };
        this.pointer = { x: 0, y: 0 };
        const entry = this.makeCard(card, null, 1200);
        entry.ready = true;
        this.elapsed = 0;
        this.resize();
        this.view.invalidate();
    }

    showLanding(deck) {
        this.mode = 'landing';
        this.deck = deck;
        this.nextDeal = 0;
        this.resize();
        this.update(0);
    }

    addLandingCard() {
        if (!this.deck?.length) return;
        if (this.cards.length >= 12) {
            const old = this.cards.shift();
            old.root.removeFromParent();
            old.root.dispose();
            for (const [url, texture] of this.textures) {
                if (url !== BACK && !this.cards.some(entry => entry.front.material.map === texture)) {
                    texture.dispose();
                    this.textures.delete(url);
                }
            }
        }
        const card = this.deck[Math.floor(Math.random() * this.deck.length)];
        const entry = this.makeCard(card);
        entry.born = this.elapsed;
        entry.anchor = [rand(-0.43, 0.43), rand(-0.4, 0.4)];
        entry.base = [0, 0, rand(0, 2), rand(-0.22, 0.22)];
        entry.phase = rand(0, Math.PI * 2);
    }

    reRoll() {
        for (const child of [...this.starGroup.children]) {
            child.removeFromParent();
            child.dispose();
        }
        for (let layer = 0; layer < 3; layer++) {
            const positions = [];
            for (let i = 0; i < 90; i++) positions.push(rand(-22, 22), rand(-14, 14), -5 - layer);
            this.starGroup.add(new Points({ geometry: new Geometry({ positions }), pickable: false,
                material: { color: layer === 0 ? '#a3edbc' : '#e6f2e9', size: 1 + layer * 0.6,
                    sizeAttenuation: false, unlit: true, opacity: 0.55 + layer * 0.15 } }));
        }
    }

    resize() {
        if (this.disposed) return;
        const rect = this.canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const aspect = rect.width / rect.height;
        const layout = this.layout || { width: 0, height: 12 };
        const height = Math.max(layout.height, layout.width / aspect);
        if (this.perspective) this.view.camera.position.z = height / (2 * Math.tan(Math.PI / 10));
        else this.view.camera.height = height;
        this.worldWidth = height * aspect;
        this.cards.forEach((entry, index) => {
            if (entry.label) entry.label.text = rect.width < 480 && this.cards.length > 3
                ? String(index + 1) : entry.card.position;
        });
        if (this.mode === 'landing') this.cards.forEach(entry => { entry.ready = false; });
        this.view.invalidate();
    }

    update(dt) {
        this.elapsed += dt;
        const reduced = this.view.reducedMotion;
        if (this.exitStarted !== undefined) {
            this.view.camera.height = Math.max(0.5, 12 * (1 - (this.elapsed - this.exitStarted) / 0.75));
        }
        if (!reduced && this.starGroup.children.length) this.starGroup.rotation.z += dt * 0.003;
        if (this.mode === 'landing') {
            if (this.elapsed >= this.nextDeal && (!reduced || !this.cards.length)) {
                this.addLandingCard();
                this.nextDeal = this.elapsed + rand(2, 8);
            }
            this.cards.forEach(entry => {
                if (reduced && entry.ready) return;
                const age = this.elapsed - entry.born;
                const pose = cardPose(age, 0, false, reduced);
                const [x, y] = entry.anchor;
                entry.root.position.set(x * (this.worldWidth || 12), y * 12 + pose.offsetY +
                    (reduced ? 0 : Math.sin(age + entry.phase) * 0.12), entry.base[2]);
                entry.root.rotation.z = entry.base[3];
                entry.root.scale.set(pose.scale * 0.72, pose.scale * 0.72, pose.scale * 0.72);
                entry.flip.rotation.y = pose.flipY;
                entry.ready = pose.ready;
            });
        } else if (this.mode === 'spread' && this.animating) {
            const total = this.cards.length + this.shuffleExtras.length;
            this.cards.forEach((entry, index) => {
                const pose = dealPose(this.elapsed, index, total, entry.base, reduced);
                entry.root.position.set(pose.x, pose.y, pose.z);
                entry.root.rotation.set(pose.rx, pose.ry, pose.rz);
                entry.flip.rotation.y = pose.flipY;
                entry.ready = pose.ready;
                entry.label.visible = pose.ready;
                entry.placeholder.visible = pose.ready && !entry.front.material.map.image;
            });
            this.shuffleExtras.forEach((entry, index) => {
                const pose = shufflePose(Math.min(this.elapsed, SHUFFLE_SECONDS), index + this.cards.length, total);
                entry.root.position.set(pose.x, pose.y, pose.z);
                entry.root.rotation.set(pose.rx, pose.ry, pose.rz);
                entry.root.visible = !reduced && this.elapsed < SHUFFLE_SECONDS;
            });
            if (this.elapsed >= SHUFFLE_SECONDS && this.phase === 'shuffle') {
                this.phase = 'deal';
                this.onPhase('Dealing your cards…');
            }
            if (this.cards.every(entry => entry.ready)) {
                this.animating = false;
                this.onPhase('');
                this.finishDeal?.();
                this.finishDeal = null;
            }
        } else if (this.mode === 'zoom' && this.cards.length) {
            const root = this.cards[0].root;
            const targetX = reduced ? 0 : -this.pointer.y;
            const targetY = reduced ? 0 : this.pointer.x;
            if (Math.abs(root.rotation.x - targetX) > 0.0001 || Math.abs(root.rotation.y - targetY) > 0.0001) {
                root.rotation.x += (targetX - root.rotation.x) * Math.min(1, dt * 10);
                root.rotation.y += (targetY - root.rotation.y) * Math.min(1, dt * 10);
            }
        }
    }

    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        this.resizeObserver.disconnect();
        this.canvas.removeEventListener('webglcontextlost', this.onLost);
        this.canvas.removeEventListener('webglcontextrestored', this.onRestored);
        this.canvas.removeEventListener('pointermove', this.onPointer);
        this.canvas.removeEventListener('pointerleave', this.onLeave);
        this.clearCards();
        this.view.dispose();
    }
}

export function createScene(canvas, options = {}) {
    try { return new TarotScene(canvas, options); }
    catch (error) {
        console.error('Phoria 2 could not initialize:', error);
        options.onError?.('The 3D view needs WebGL 2. Enable hardware acceleration or try another browser.');
        canvas.hidden = true;
        return null;
    }
}
