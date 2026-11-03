import { createScene } from './phoria-scene.mjs';
import { Showcase } from './showcase.mjs';

const dealButton = document.getElementById('dealButton');
const interpretButton = document.getElementById('interpretButton');
const interpretationText = document.getElementById('interpretationText');
const statsText = document.getElementById('statsText');
const cardModal = document.getElementById('cardModal');
const modalCardCanvas = document.getElementById('modalCardCanvas');
const modalCardInfo = document.getElementById('modalCardInfo');
const modalClose = document.getElementById('modalClose');

let deck = [];
let currentSpread = [];
let currentSpreadType = 'threeCard';
let stats = {};


let spreadScene;
let skyScene;
const showcase = new Showcase(() => createScene(modalCardCanvas, {
    perspective: true,
    onError: message => { document.getElementById('modalStatus').textContent = message; }
}));
let dealtSpreadType = 'threeCard';
let dealing = false;
let interpreting = false;
let lastFocus;
const sceneStatus = document.getElementById('sceneStatus');
const cardList = document.getElementById('cardList');
const reportSceneError = message => { sceneStatus.textContent = message; };

const spreadDefinitions = {
    threeCard: {
        name: '3 Card Spread',
        count: 3,
        positions: ['Past', 'Present', 'Future']
    },
    celticCross: {
        name: 'Celtic Cross',
        count: 10,
        positions: [
            '1. Present Situation',
            '2. Immediate Challenge',
            '3. Distant Past (Foundation)',
            '4. Recent Past',
            '5. Best Outcome/Potential',
            '6. Near Future',
            '7. Your Attitude/Approach',
            '8. External Influences',
            '9. Hopes and Fears',
            '10. Final Outcome'
        ]
    },
    horseshoe: {
        name: 'Horseshoe Spread',
        count: 7,
        positions: [
            '1. Past', '2. Present', '3. Future', '4. Obstacles', '5. Advice', '6. External Influences', '7. Outcome'
        ]
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    spreadScene = createScene(document.getElementById('spreadCanvas'), {
        interactive: true, perspective: true, description: 'Tarot spread. Use arrow keys to choose a card and Enter to inspect it.',
        onError: reportSceneError
    });
    skyScene = createScene(document.getElementById('skyCanvas'));
    skyScene?.reRoll();
    spreadScene?.showIdle();
    await loadDeck();
    loadStats();
    displayStats(currentSpreadType);
    setupEventListeners();
    setupCardModal();

    document.addEventListener('keydown', (e) => {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;
        const key = e.key.toLowerCase();
        if (cardModal.classList.contains('active')) {
            if (key === 'escape') closeCardModal();
            if (key === 'tab') { e.preventDefault(); modalClose.focus(); }
            return;
        }
        if (key === 'd' && dealButton && !dealButton.disabled) {
            e.preventDefault();
            handleDealSpread();
        } else if (key === 'i' && interpretButton && !interpretButton.disabled) {
            e.preventDefault();
            handleGetInterpretation();
        } else if (key === 'r' && skyScene) {
            e.preventDefault();
            skyScene.reRoll();
        } else if (key === 'escape') {
            closeCardModal();
        }
    });
});

async function loadDeck() {
    try {
        const response = await fetch('tarot_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        deck = Object.entries(data).map(([key, cardData]) => {
            const newCard = {
                id: key,
                ...cardData,
                name: cardData.name || key.replace(/_/g, ' ')
            };
            if (newCard.arcana === 'major') {
                newCard.suit = 'Major Arcana';
            } else if (newCard.arcana === 'minor' && newCard.name) {
                const nameParts = newCard.name.split(' ');
                newCard.rank = nameParts[0];
            }
            return newCard;
        });
        if (dealButton) {
            dealButton.disabled = false;
        }
    } catch (error) {
        console.error('Error loading deck:', error);
        sceneStatus.textContent = 'Unable to load the tarot deck. Please reload to try again.';
        if (dealButton) dealButton.disabled = true;
    }
}

function setupEventListeners() {
    const spreadButtons = document.querySelectorAll('.spread-button');
    spreadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            spreadButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            currentSpreadType = btn.dataset.spread;
            displayStats(currentSpreadType);
        });
    });

    if (dealButton) {
        dealButton.addEventListener('click', handleDealSpread);
    } else {
        console.error('Deal button not found');
    }

    if (interpretButton) {
        interpretButton.addEventListener('click', handleGetInterpretation);
    } else {
        console.error('Interpret button not found');
    }

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.tab;
            document.getElementById('interpretationArea').classList.toggle('hidden', tab !== 'interpretation');
            document.getElementById('statsArea').classList.toggle('hidden', tab !== 'stats');
        });
    });
}

// --- Core Logic ---
function shuffleDeck(array) {
    let currentIndex = array.length;
    const randomValues = new Uint32Array(currentIndex);
    // Use crypto.getRandomValues for a more secure shuffle
    crypto.getRandomValues(randomValues);

    while (currentIndex !== 0) {
        let randomIndex = randomValues[currentIndex - 1] % currentIndex;
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function displaySpread(spread) {
    sceneStatus.textContent = spreadScene
        ? 'Preparing the deck…'
        : 'The 3D view is unavailable. Open Cards in this reading below to inspect your spread.';
    let animation = Promise.resolve();
    document.getElementById('spreadTitle').textContent = spreadDefinitions[dealtSpreadType].name;
    document.getElementById('spreadCount').textContent = `${spread.length} cards`;
    try {
        animation = spreadScene?.showSpread(spread, dealtSpreadType, openCardModal,
            message => { sceneStatus.textContent = message; }) || animation;
    }
    catch (error) {
        console.error('Unable to draw spread:', error);
        reportSceneError('The 3D spread could not be drawn. Use the card list below to continue your reading.');
    }
    cardList.replaceChildren();
    spread.forEach(card => {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = `${card.position}: ${card.name}${card.isReversed ? ' (Reversed)' : ''}`;
        button.addEventListener('click', () => openCardModal(card));
        item.append(button);
        cardList.append(item);
    });
    return animation;
}

async function handleDealSpread() {
    if (!deck.length || dealing || interpreting) return;
    dealing = true;
    dealButton.disabled = true;
    interpretButton.disabled = true;
    interpretationText.textContent = 'Select Get interpretation to read this spread.';
    dealButton.textContent = 'Shuffling…';
    document.querySelectorAll('.spread-button').forEach(button => { button.disabled = true; });
    dealtSpreadType = currentSpreadType;
    const spreadInfo = spreadDefinitions[dealtSpreadType];
    currentSpread = shuffleDeck([...deck]).slice(0, spreadInfo.count).map((card, index) => ({
        ...card, isReversed: Math.random() < 0.5, position: spreadInfo.positions[index]
    }));
    const animation = displaySpread(currentSpread);
    updateStats(dealtSpreadType, currentSpread);
    saveStats();
    displayStats(currentSpreadType);
    cardList.querySelectorAll('button').forEach(button => { button.disabled = true; });
    await animation;
    cardList.querySelectorAll('button').forEach(button => { button.disabled = false; });
    document.querySelectorAll('.spread-button').forEach(button => { button.disabled = false; });
    dealButton.textContent = 'Shuffle & deal again';
    dealing = false;
    dealButton.disabled = false;
    interpretButton.disabled = false;
}

async function handleGetInterpretation() {
    if (interpreting || dealing) return;
    if (currentSpread.length === 0) {
        interpretationText.textContent = 'Please deal a spread first.';
        return;
    }

    document.querySelector('.tab-button[data-tab="interpretation"]').click();

    interpretationText.innerHTML = '';
    let accumulatedText = '';
    interpretButton.disabled = true;

    interpreting = true;
    dealButton.disabled = true;
    const spreadDetails = currentSpread.map((card) => {
        const position = card.position;
        const reversed = card.isReversed ? ' (Reversed)' : '';
        return `${position}: ${card.name}${reversed}`;
    }).join('\n');

    const prompt = `Please provide a thorough and insightful tarot reading interpretation for the following ${spreadDefinitions[dealtSpreadType].name} spread:\n\n${spreadDetails}\n\n-Format your response neatly to allow the reader to easily understand the meaning of the spread.\n-Include a summary of the spread, a description of the overall meaning of the spread, and a description of the meaning of each card in the spread. Begin your response with "Dear Seeker".`;

    try {
        const response = await fetch('/api/interpret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "claude-haiku-4-5-20251001",
                max_tokens: 4096,
                messages: [{ role: "user", content: prompt }]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response.' }));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        function push() {
            reader.read().then(({ done, value }) => {
                if (done) {
                    interpreting = false;
                    dealButton.disabled = false;
                    interpretButton.disabled = false;
                    return;
                }
                accumulatedText += decoder.decode(value, { stream: true });
                interpretationText.innerHTML = marked.parse(accumulatedText);
                push();
            }).catch(err => {
                console.error('Error reading stream:', err);
                interpretationText.textContent = 'Error displaying interpretation.';
                interpreting = false;
                dealButton.disabled = false;
                interpretButton.disabled = false;
            });
        }

        push();

    } catch (error) {
        console.error('Error getting interpretation:', error);
        interpretationText.textContent = `Error: ${error.message}`;
        interpreting = false;
        dealButton.disabled = false;
        interpretButton.disabled = false;
    }
}

function loadStats() {
    let savedStats;
    try { savedStats = localStorage.getItem('tarotStats'); } catch { /* Private browsing may disallow storage. */ }
    if (savedStats) {
        try {
            stats = JSON.parse(savedStats) || {};
        } catch (e) {
            console.error('Error parsing stats from localStorage:', e);
            stats = {};
        }

        Object.keys(spreadDefinitions).forEach(spreadType => {
            if (!stats[spreadType]) {
                stats[spreadType] = { totalDraws: 0, cards: {}, suits: {}, numbers: {}, reversals: 0 };
            } else {
                stats[spreadType].totalDraws = stats[spreadType].totalDraws || 0;
                stats[spreadType].cards = stats[spreadType].cards || {};
                stats[spreadType].suits = stats[spreadType].suits || {};
                stats[spreadType].numbers = stats[spreadType].numbers || {};
                stats[spreadType].reversals = stats[spreadType].reversals || 0;
            }
        });

    } else {
        stats = {};
        Object.keys(spreadDefinitions).forEach(spreadType => {
            stats[spreadType] = {
                totalDraws: 0,
                cards: {},
                suits: {},
                numbers: {},
                reversals: 0
            };
        });

    }
}

function updateStats(spreadType, spread) {
    const spreadStats = stats[spreadType];
    if (!spreadStats) {
        console.error(`Stats for spread type ${spreadType} not initialized.`);
        return;
    }

    spreadStats.totalDraws = (spreadStats.totalDraws || 0) + 1;

    spread.forEach(card => {
        spreadStats.cards[card.id] = (spreadStats.cards[card.id] || 0) + 1;
        const suit = card.suit || 'Major Arcana';
        spreadStats.suits[suit] = (spreadStats.suits[suit] || 0) + 1;

        if (card.arcana === 'minor' && card.rank) {
            spreadStats.numbers[card.rank] = (spreadStats.numbers[card.rank] || 0) + 1;
        }
        if (card.isReversed) {
            spreadStats.reversals = (spreadStats.reversals || 0) + 1;
        }
    });
}

function saveStats() {
    try {
        localStorage.setItem('tarotStats', JSON.stringify(stats));
    } catch (error) {
        console.error('Error saving stats to localStorage:', error);
    }
}

function displayStats(spreadType) {
    if (!statsText || !deck.length) return;

    const spreadStats = stats[spreadType];
    const spreadName = spreadDefinitions[spreadType]?.name || 'Spread';

    if (!spreadStats || spreadStats.totalDraws === 0) {
        statsText.innerHTML = `<h2>${spreadName} Statistics</h2><p>No statistics yet for this spread type. Deal a spread to begin.</p>`;
        return;
    }

    const createCardList = (data) => {
        const sortedItems = Object.entries(data)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10) // Show top 10
            .map(([cardId, count]) => {
                const cardInfo = deck.find(c => c.id === cardId);
                const cardName = cardInfo ? cardInfo.name : cardId.replace(/_/g, ' ');
                return `<li>${cardName}: ${count}</li>`;
            })
            .join('');
        return `<ul>${sortedItems}</ul>`;
    };

    const createSimpleList = (data) => {
         const sortedItems = Object.entries(data)
            .sort(([, a], [, b]) => b - a)
            .map(([key, value]) => `<li>${key.replace(/_/g, ' ')}: ${value}</li>`)
            .join('');
        return `<ul>${sortedItems}</ul>`;
    };

    const totalCardsDrawn = Object.values(spreadStats.cards).reduce((a, b) => a + b, 0);
    const reversalRate = totalCardsDrawn > 0 ? ((spreadStats.reversals / totalCardsDrawn) * 100).toFixed(1) : 0;

    let statsHTML = `<h2>${spreadName} Statistics</h2>`;
    statsHTML += `<p><strong>Total Times Drawn:</strong> ${spreadStats.totalDraws}</p>`;
    statsHTML += `<p><strong>Total Cards Drawn in this Spread Type:</strong> ${totalCardsDrawn}</p>`;
    statsHTML += `<p><strong>Reversal Rate:</strong> ${reversalRate}%</p>`;

    if (Object.keys(spreadStats.cards).length > 0) {
        statsHTML += `<h3>Most Frequent Cards (Top 10)</h3>${createCardList(spreadStats.cards)}`;
    }
    if (Object.keys(spreadStats.suits).length > 0) {
        statsHTML += `<h3>Suit Frequency</h3>${createSimpleList(spreadStats.suits)}`;
    }
    if (Object.keys(spreadStats.numbers).length > 0) {
        statsHTML += `<h3>Number/Rank Frequency</h3>${createSimpleList(spreadStats.numbers)}`;
    }

    statsText.innerHTML = statsHTML;
}

// Card Modal Functions
function setupCardModal() {
    if (!cardModal || !modalClose) return;

    // Close on background click only
    cardModal.addEventListener('click', (e) => {
        if (e.target === cardModal) {
            closeCardModal();
        }
    });

    // Close on X button
    modalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCardModal();
    });
}

function openCardModal(card) {
    lastFocus = document.activeElement;
    cardModal.classList.add('active');
    cardModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.querySelector('.container').inert = true;
    modalCardInfo.textContent = `${card.name}${card.isReversed ? ' (Reversed)' : ''}`;
    document.getElementById('modalStatus').textContent = '';
    modalCardCanvas.hidden = false;
    document.getElementById('modalPosition').textContent = card.position || 'From the deck';
    document.getElementById('modalDescription').textContent = card.description || '';
    showcase.show(card);
    modalClose.focus();
}

function closeCardModal() {
    if (!cardModal.classList.contains('active')) return;
    cardModal.classList.remove('active');
    cardModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.querySelector('.container').inert = false;
    showcase.hide();
    lastFocus?.focus();
}

window.addEventListener('pagehide', () => {
    spreadScene?.dispose();
    skyScene?.dispose();
    showcase.dispose();
});
// A restored bfcache page needs fresh WebGL resources and listeners.
window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
