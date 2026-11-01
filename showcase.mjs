// Keep the View/context alive between openings. Disposing and recreating a View on
// the same canvas triggers WEBGL_lose_context restoration races in browsers.
export class Showcase {
    constructor(create) { this.create = create; this.scene = null; }
    show(card) {
        this.scene ||= this.create();
        if (!this.scene) return;
        this.scene.active = true;
        this.scene.view.description = `${card.name}${card.isReversed ? ' (Reversed)' : ''}`;
        this.scene.showCard(card);
    }
    hide() { if (this.scene) this.scene.active = false; }
    dispose() { this.scene?.dispose(); this.scene = null; }
}
