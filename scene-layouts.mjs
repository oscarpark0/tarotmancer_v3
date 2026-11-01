// World-space layouts, with +Y up and +Z towards the reader.
export const CARD_WIDTH = 1.2;
export const CARD_HEIGHT = 2;
export const layouts = {
    threeCard: { width: 6.6, height: 4.4, positions: [[-1.85, 0], [0, 0], [1.85, 0]] },
    celticCross: {
        width: 8.4, height: 11.2,
        positions: [[-1, 0.2], [-1, 0.2, 0.08, Math.PI / 2], [-1, -2.6],
            [-3.1, 0.2], [-1, 3], [1.1, 0.2], [3.1, -3.9], [3.1, -1.3],
            [3.1, 1.3], [3.1, 3.9]]
    },
    horseshoe: {
        width: 9.6, height: 8.8,
        positions: [[-3.5, -0.1, 0, 0.35], [-2.2, 2, 0, 0.2], [0, 2.8],
            [2.2, 2, 0, -0.2], [3.5, -0.1, 0, -0.35], [1.7, -2.6], [-1.7, -2.6]]
    }
};

export const ease = value => 1 - (1 - Math.max(0, Math.min(1, value))) ** 3;
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
export const SHUFFLE_SECONDS = 1.8;
export const DEAL_STAGGER = 0.22;
export const FLIGHT_SECONDS = 0.85;
export const REVEAL_SECONDS = 0.65;
export const dealDuration = count => SHUFFLE_SECONDS + (count - 1) * DEAL_STAGGER + FLIGHT_SECONDS + REVEAL_SECONDS;

// A real stack splits into two packets, riffles together, then squares up.
export function shufflePose(time, index, count) {
    const side = index % 2 ? 1 : -1;
    const split = smooth(time / 0.45);
    const merge = smooth((time - 0.65 - index * 0.025) / 0.5);
    const separation = split * (1 - merge);
    const square = smooth((time - 1.35) / 0.45);
    return {
        x: side * 0.88 * separation,
        y: Math.sin(clamp(time / SHUFFLE_SECONDS) * Math.PI) * 0.12,
        z: (count - 1 - index) * 0.038 + Math.sin(Math.PI * separation) * 0.22,
        rx: 0.28 * Math.sin(Math.PI * clamp(time / SHUFFLE_SECONDS)),
        ry: -side * 0.35 * separation,
        rz: side * 0.12 * separation * (1 - square)
    };
}

export function dealPose(time, index, count, target, reducedMotion = false) {
    const [x, y, z = 0, rz = 0] = target;
    if (reducedMotion || time >= SHUFFLE_SECONDS + index * DEAL_STAGGER + FLIGHT_SECONDS + REVEAL_SECONDS) {
        return { x, y, z, rx: 0, ry: 0, rz, flipY: 0, ready: true };
    }
    if (time < SHUFFLE_SECONDS) return { ...shufflePose(time, index, count), flipY: Math.PI, ready: false };
    const age = time - SHUFFLE_SECONDS - index * DEAL_STAGGER;
    const flight = smooth(age / FLIGHT_SECONDS);
    const arc = Math.sin(Math.PI * clamp(age / FLIGHT_SECONDS));
    const flip = smooth((age - FLIGHT_SECONDS) / REVEAL_SECONDS);
    return { x: x * flight, y: y * flight + arc * 0.35,
        z: (count - 1 - index) * 0.038 * (1 - flight) + z * flight + arc * 0.95,
        rx: -arc * 0.24, ry: arc * (index % 2 ? -0.22 : 0.22),
        rz: rz * flight + arc * (index % 2 ? 0.16 : -0.16),
        flipY: Math.PI * (1 - flip), ready: age >= FLIGHT_SECONDS + REVEAL_SECONDS };
}
export function cardPose(elapsed, index, reversed, reducedMotion = false) {
    const time = elapsed - index * 0.15;
    const dealt = reducedMotion ? 1 : ease(time / 0.5);
    const flip = reducedMotion ? 1 : ease((time - 0.5) / 0.8);
    return { visible: reducedMotion || time >= 0, offsetY: (1 - dealt) * 1.5,
        scale: 0.7 + dealt * 0.3, flipY: Math.PI * (1 - flip),
        reversalZ: reversed ? Math.PI : 0, ready: reducedMotion || time >= 1.3 };
}
