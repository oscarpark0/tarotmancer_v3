// World-space layouts, with +Y up and +Z towards the reader.
export const CARD_WIDTH = 1.2;
export const CARD_HEIGHT = 2;
export const layouts = {
    threeCard: { width: 6, height: 3.2, positions: [[-1.8, 0], [0, 0], [1.8, 0]] },
    celticCross: {
        width: 8.4, height: 11.2,
        positions: [[-1, 0.2], [-1, 0.2, 0.08, Math.PI / 2], [-1, -2.6],
            [-3.1, 0.2], [-1, 3], [1.1, 0.2], [3.1, -3.9], [3.1, -1.3],
            [3.1, 1.3], [3.1, 3.9]]
    },
    horseshoe: {
        width: 9.6, height: 8.4,
        positions: [[-3.5, -0.1, 0, 0.35], [-2.2, 2, 0, 0.2], [0, 2.8],
            [2.2, 2, 0, -0.2], [3.5, -0.1, 0, -0.35], [1.7, -2.6], [-1.7, -2.6]]
    }
};

export const ease = value => 1 - (1 - Math.max(0, Math.min(1, value))) ** 3;
export function cardPose(elapsed, index, reversed, reducedMotion = false) {
    const time = elapsed - index * 0.15;
    const dealt = reducedMotion ? 1 : ease(time / 0.5);
    const flip = reducedMotion ? 1 : ease((time - 0.5) / 0.8);
    return { visible: reducedMotion || time >= 0, offsetY: (1 - dealt) * 1.5,
        scale: 0.7 + dealt * 0.3, flipY: Math.PI * (1 - flip),
        reversalZ: reversed ? Math.PI : 0, ready: reducedMotion || time >= 1.3 };
}
