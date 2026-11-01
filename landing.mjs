import { createScene } from './phoria-scene.mjs';

const status = document.getElementById('landingStatus');
const scene = createScene(document.getElementById('landingCanvas'), {
    onError: message => { status.textContent = message; }
});
scene?.reRoll();

async function loadCards() {
    try {
        const response = await fetch('tarot_data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const deck = Object.values(await response.json());
        if (scene && !scene.disposed) scene.showLanding(deck);
    } catch {
        status.textContent = 'The deck preview is unavailable. You can still enter Tarotmancer.';
    }
}
loadCards();

let entering = false;
document.getElementById('enterButton').addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (!scene || scene.view.reducedMotion) return;
    event.preventDefault();
    if (entering) return;
    entering = true;
    scene.exitStarted = scene.elapsed;
    setTimeout(() => { location.href = 'main.html'; }, 700);
});
window.addEventListener('pagehide', () => scene?.dispose());
window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
