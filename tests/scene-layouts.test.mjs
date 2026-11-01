import test from 'node:test';
import assert from 'node:assert/strict';
import { layouts, CARD_WIDTH, CARD_HEIGHT, cardPose } from '../scene-layouts.mjs';
import { Group, Mesh, Geometry, Raycaster } from '../vendor/phoria2/phoria2.js';

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
