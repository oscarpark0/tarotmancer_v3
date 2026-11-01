import { View, Group, Mesh, Points, Geometry, Label, Texture, OrthographicCamera } from './vendor/phoria2/phoria2.js';
import { CARD_WIDTH, CARD_HEIGHT, layouts, cardPose } from './scene-layouts.mjs';

const BACK = 'https://ik.imagekit.io/tarotmancer/cardback.webp';
const rand = (min, max) => min + Math.random() * (max - min);

// UVs use the image's top-left origin (Texture.flipY defaults to false).
function faceGeometry() {
    const w = CARD_WIDTH / 2, h = CARD_HEIGHT / 2;
    return new Geometry({ positions: [-w, -h, 0, w, -h, 0, w, h, 0, -w, h, 0],
        normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        uvs: [0, 1, 1, 1, 1, 0, 0, 0], indices: [0, 1, 2, 0, 2, 3] });
}

export class TarotScene {
    constructor(canvas, { interactive = false, description = 'Tarotmancer stars', onError = () => {} } = {}) {
        this.canvas = canvas;
        this.onError = onError;
        this.textures = new Map();
        this.cards = [];
        this.disposed = false;
        this.view = new View({ canvas, camera: new OrthographicCamera({ height: 12,
            position: [0, 0, 30], target: [0, 0, 0], near: 0.1, far: 100 }),
            autoLight: false, toneMapping: 'none', keyboard: interactive,
            description, pixelRatio: Math.min(window.devicePixelRatio || 1, 2) });
        this.cardGroup = this.view.scene.add(new Group());
        this.starGroup = this.view.scene.add(new Group({ pickable: false }));
        this.elapsed = 0;
        this.view.start((dt) => {
            if (!document.hidden && !this.contextLost) this.update(Math.min(dt, 0.05));
        });
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(canvas);
        this.onLost = event => {
            event.preventDefault();
            this.contextLost = true;
            this.onError('The graphics context was lost. Reload the page to restore the scene.');
        };
        canvas.addEventListener('webglcontextlost', this.onLost);
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

    makeCard(card, onSelect, width = 500) {
        const root = this.cardGroup.add(new Group({ name: card.name,
            highlight: onSelect ? '#193d25' : null, highlightWhole: true,
            tooltip: () => `${card.position ? card.position + ': ' : ''}${card.name}${card.isReversed ? ' (Reversed)' : ''}`,
            onClick: () => { if (entry.ready) onSelect?.(card); } }));
        const flip = root.add(new Group());
        const front = flip.add(new Mesh({ name: card.name, geometry: faceGeometry(),
            material: { color: '#123b22', map: this.texture(`${card.image_url}${card.image_url.includes('?') ? '&' : '?'}tr=w-${width},q-90,f-auto`), unlit: true },
            rotation: [0, 0, card.isReversed ? Math.PI : 0], position: [0, 0, 0.005] }));
        const back = flip.add(new Mesh({ geometry: faceGeometry(), material: { color: '#123b22', map: this.texture(BACK), unlit: true },
            rotation: [0, Math.PI, 0], position: [0, 0, -0.005] }));
        const placeholder = root.add(new Label({ text: card.name, className: 'scene-label',
            position: [0, 0, 0.02], place: 'center', pickable: false, visible: this.mode !== 'landing' }));
        front.material.map.ready.then(() => {
            if (!this.disposed && root.parent) {
                front.material.color.set('white');
                placeholder.visible = false;
            }
        }).catch(() => {});
        back.material.map.ready.then(() => {
            if (!this.disposed && root.parent) back.material.color.set('white');
        }).catch(() => {});
        const entry = { card, root, flip, front, ready: false, base: [0, 0, 0, 0] };
        this.cards.push(entry);
        return entry;
    }

    clearCards() {
        for (const child of [...this.cardGroup.children]) {
            child.removeFromParent();
            child.dispose();
        }
        this.cards = [];
        // Textures are owned by this scene, not by individual meshes.
        for (const texture of this.textures.values()) texture.dispose();
        this.textures.clear();
    }

    showSpread(cards, type, onSelect) {
        this.clearCards();
        this.mode = 'spread';
        this.layout = layouts[type];
        this.canvas.style.aspectRatio = `${this.layout.width} / ${this.layout.height}`;
        this.canvas.parentElement.style.maxWidth = `${this.layout.width * 100}px`;
        this.elapsed = 0;
        cards.forEach((card, index) => {
            const entry = this.makeCard(card, onSelect);
            entry.base = this.layout.positions[index];
            const [x, y, z = 0, rotation = 0] = entry.base;
            // Crossing-card labels sit beside the cross; other labels remain horizontal below cards.
            this.cardGroup.add(new Label({ text: card.position, className: 'scene-label', pickable: false,
                position: type === 'celticCross' && index === 1 ? [x, y - 0.86, 0.2] : [x, y - 1.2, z], place: 'below' }));
            entry.root.rotation.z = rotation;
        });
        this.resize();
        this.update(0);
    }

    showCard(card) {
        this.clearCards();
        this.mode = 'zoom';
        this.layout = { width: 1.5, height: 2.3 };
        this.makeCard(card, null, 1200).ready = true;
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
                material: { color: layer === 0 ? '#bce8cf' : '#ffffff', size: 1 + layer * 0.6,
                    sizeAttenuation: false, unlit: true, opacity: 0.55 + layer * 0.15 } }));
        }
    }

    resize() {
        if (this.disposed) return;
        const rect = this.canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const aspect = rect.width / rect.height;
        const layout = this.layout || { width: 0, height: 12 };
        this.view.camera.height = Math.max(layout.height, layout.width / aspect);
        this.worldWidth = this.view.camera.height * aspect;
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
        } else if (this.mode === 'spread') {
            this.cards.forEach((entry, index) => {
                if (entry.ready) return;
                const pose = cardPose(this.elapsed, index, entry.card.isReversed, reduced);
                const [x, y, z = 0] = entry.base;
                entry.root.visible = pose.visible;
                entry.root.position.set(x, y + pose.offsetY, z);
                entry.root.scale.set(pose.scale, pose.scale, pose.scale);
                entry.flip.rotation.y = pose.flipY;
                entry.ready = pose.ready;
            });
        }
    }

    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        this.resizeObserver.disconnect();
        this.canvas.removeEventListener('webglcontextlost', this.onLost);
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
