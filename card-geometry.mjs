import { Geometry, extrude } from './vendor/phoria2/phoria2.js';
import { CARD_WIDTH, CARD_HEIGHT } from './scene-layouts.mjs';

export function roundedOutline(width = CARD_WIDTH, height = CARD_HEIGHT, radius = 0.085) {
    const w = width / 2, h = height / 2;
    const points = [];
    [[w-radius,h-radius],[-w+radius,h-radius],[-w+radius,-h+radius],[w-radius,-h+radius]].forEach(([x,y], corner) => {
        for (let step = 0; step <= 8; step++) {
            const angle = (corner + step / 8) * Math.PI / 2;
            points.push([x + Math.cos(angle) * radius, y + Math.sin(angle) * radius]);
        }
    });
    return points;
}

export function cardFaceGeometry() {
    const outline = roundedOutline();
    const positions = [0, 0, 0], normals = [0, 0, 1], uvs = [0.5, 0.5], indices = [];
    outline.forEach(([x, y], index) => {
        positions.push(x, y, 0);
        normals.push(0, 0, 1);
        // Image top-left is UV (0,0); artwork stays upright without stretching at the corners.
        uvs.push(x / CARD_WIDTH + 0.5, 0.5 - y / CARD_HEIGHT);
        indices.push(0, index + 1, (index + 1) % outline.length + 1);
    });
    return new Geometry({ positions, normals, uvs, indices });
}

export function cardBodyGeometry() {
    return extrude({ shape: roundedOutline(CARD_WIDTH + 0.018, CARD_HEIGHT + 0.018), depth: 0.028 });
}
