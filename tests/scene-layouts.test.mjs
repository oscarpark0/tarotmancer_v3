import test from 'node:test';
import assert from 'node:assert/strict';
import { layouts, CARD_WIDTH, CARD_HEIGHT, cardPose, dealPose, shufflePose, dealDuration, SHUFFLE_SECONDS, FLIGHT_SECONDS } from '../scene-layouts.mjs';
import { Group, Mesh, Geometry, Raycaster } from '../vendor/phoria2/phoria2.js';
import { cardFaceGeometry, cardBodyGeometry } from '../card-geometry.mjs';
import { Showcase } from '../showcase.mjs';

test('all three spreads contain the correct number of cards and fit their camera bounds', () => {
    for (const [name, count] of Object.entries({ threeCard: 3, celticCross: 10, horseshoe: 7 })) {
        const layout = layouts[name];
        assert.equal(layout.positions.length, count);
        for (const [x, y, , angle = 0] of layout.positions) {
            const halfWidth = Math.abs(Math.cos(angle)) * CARD_WIDTH / 2 + Math.abs(Math.sin(angle)) * CARD_HEIGHT / 2;
            const halfHeight = Math.abs(Math.sin(angle)) * CARD_WIDTH / 2 + Math.abs(Math.cos(angle)) * CARD_HEIGHT / 2;
            assert.ok(Math.abs(x) + halfWidth < layout.width / 2, `${name} horizontal clipping`);
            assert.ok(Math.abs(y) + halfHeight < layout.height / 2, `${name} vertical clipping`);
        }
    }
});

test('cards reveal in sequence, finish face-up, and keep reversal independent of the flip', () => {
    assert.equal(cardPose(0, 1, false).visible, false);
    assert.equal(cardPose(0, 0, false).flipY, Math.PI);
    assert.equal(cardPose(0.6, 0, false).ready, false);
    for (let index = 0; index < 10; index++) {
        const pose = cardPose(3, index, true);
        assert.equal(pose.ready, true);
        assert.equal(pose.flipY, 0);
        assert.equal(pose.reversalZ, Math.PI);
        assert.equal(pose.scale, 1);
        assert.equal(pose.offsetY, 0);
    }
});

test('reduced motion reveals every card immediately without changing its reversal', () => {
    assert.deepEqual(cardPose(0, 9, true, true), {
        visible: true, offsetY: 0, scale: 1, flipY: 0, reversalZ: Math.PI, ready: true
    });
});

test('Phoria picking selects the crossing card ahead of the card beneath it', () => {
    const scene = new Group();
    const geometry = new Geometry({ positions: [-0.6,-1,0, 0.6,-1,0, 0.6,1,0, -0.6,1,0], indices: [0,1,2,0,2,3] });
    const cards = layouts.celticCross.positions.slice(0, 2).map(([x,y,z=0,angle=0]) =>
        scene.add(new Mesh({ geometry, position: [x,y,z], rotation: [0,0,angle], material: { unlit: true } })));
    const ray = new Raycaster();
    ray.ray.origin.set(-1,0.2,30);
    ray.ray.direction.set(0,0,-1);
    assert.equal(ray.intersect(scene)[0].node, cards[1]);
    cards[1].removeFromParent();
    assert.equal(ray.intersect(scene)[0].node, cards[0]);
});

test('rounded meshes cut the corner out of both the artwork and the card body', () => {
    for (const geometry of [cardFaceGeometry(), cardBodyGeometry()]) {
        const card = new Mesh({ geometry, material: { unlit: true } });
        const ray = new Raycaster();
        ray.ray.direction.set(0, 0, -1);
        ray.ray.origin.set(0, 0, 10);
        assert.ok(ray.intersect(card).length, 'center must remain visible/pickable');
        ray.ray.origin.set(0.599, 0.999, 10);
        assert.equal(ray.intersect(card).length, 0, 'square corner must be clipped from real geometry');
        geometry.dispose();
    }
});

test('shuffle splits two packets and returns to a squared stack before dealing', () => {
    const left = shufflePose(0.5, 0, 16), right = shufflePose(0.5, 1, 16);
    assert.ok(left.x < -0.8 && right.x > 0.8);
    assert.ok(left.ry > 0 && right.ry < 0);
    for (let index = 0; index < 16; index++) {
        const end = shufflePose(SHUFFLE_SECONDS, index, 16);
        const start = dealPose(SHUFFLE_SECONDS, index, 16, [2, 1]);
        assert.ok(Math.abs(end.x - start.x) < 1e-8);
        assert.ok(Math.abs(end.y - start.y) < 1e-8);
        assert.ok(Math.abs(end.z - start.z) < 1e-8);
        assert.equal(start.flipY, Math.PI);
    }
});

test('cards travel through depth, land before revealing, and settle at exact spread positions', () => {
    const flying = dealPose(SHUFFLE_SECONDS + FLIGHT_SECONDS / 2, 0, 16, [2, 1]);
    assert.ok(flying.x > 0 && flying.x < 2);
    assert.ok(flying.z > 0.9);
    assert.equal(flying.flipY, Math.PI);
    for (const layout of Object.values(layouts)) {
        layout.positions.forEach((target, index) => {
            const pose = dealPose(dealDuration(layout.positions.length) + 0.001, index, 16, target);
            const [x, y, z = 0, rz = 0] = target;
            assert.deepEqual(pose, { x, y, z, rx: 0, ry: 0, rz, flipY: 0, ready: true });
            assert.deepEqual(dealPose(0, index, 16, target, true), pose);
        });
    }
});

test('showcase reuses one view across repeated openings and only disposes at page teardown', () => {
    let created = 0, disposed = 0;
    const shown = [];
    const showcase = new Showcase(() => {
        created++;
        return { view: {}, showCard: card => shown.push(card.name), dispose: () => { disposed++; } };
    });
    for (let index = 0; index < 12; index++) {
        showcase.show({ name: `Card ${index}`, isReversed: index % 2 === 1 });
        assert.equal(showcase.scene.active, true);
        showcase.hide();
        assert.equal(showcase.scene.active, false);
    }
    assert.equal(created, 1);
    assert.equal(disposed, 0);
    assert.equal(shown.length, 12);
    assert.equal(showcase.scene.view.description, 'Card 11 (Reversed)');
    showcase.dispose();
    showcase.dispose();
    assert.equal(disposed, 1);
});
