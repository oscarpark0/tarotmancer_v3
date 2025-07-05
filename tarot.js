const dealButton = document.getElementById('dealButton');
const interpretButton = document.getElementById('interpretButton');
const spreadArea = document.getElementById('spreadArea');
const spreadAreaWrapper = document.getElementById('spreadAreaWrapper');
const interpretationArea = document.getElementById('interpretationArea');
const interpretationText = document.getElementById('interpretationText');
const statsText = document.getElementById('statsText');
const statsArea = document.getElementById('statsArea');

let deck = [];
let currentSpread = [];
let currentSpreadType = 'threeCard'; // Default spread
let stats = {}; // For tracking card stats


// --- Constants ---
const INTERPRET_API_URL = '/interpret'; // Serverless function endpoint
const CARD_BACK_URL = 'https://ik.imagekit.io/tarotmancer/cardback.webp';
const DEAL_STAGGER_DELAY = 150; // ms between each card appearing
const FLIP_DELAY_AFTER_DEAL_START = 500; // ms after dealing starts to begin flipping

// Base dimensions for scaling calculations
const CELTIC_CROSS_BASE_WIDTH = 700;
const CELTIC_CROSS_BASE_HEIGHT = 750;
const HORSESHOE_BASE_WIDTH = 700;
const HORSESHOE_BASE_HEIGHT = 600;
const DEFAULT_SPREAD_AREA_MIN_HEIGHT = '250px';

// --- Spread Definitions ---
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

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadDeck();
    loadStats();
    displayStats(currentSpreadType);
    setupEventListeners();
    setupResizeObserver();
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
            // Manually assign suit for Major Arcana for consistent data structure
            if (newCard.arcana === 'major') {
                newCard.suit = 'Major Arcana';
            }
            return newCard;
        });
        if (dealButton) {
            dealButton.disabled = false;
        }
    } catch (error) {
        console.error('Error loading deck:', error);
        spreadArea.textContent = 'Error loading tarot deck. Please check console.';
        if (dealButton) dealButton.disabled = true;
    }
}

function setupEventListeners() {
    // Spread selection buttons
    const spreadButtons = document.querySelectorAll('.spread-button');
    spreadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            spreadButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSpreadType = btn.dataset.spread;
            displayStats(currentSpreadType);
        });
    });

    // Main action buttons
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

    // Tab navigation for interpretation/stats
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
    const cardElements = [];
    spread.forEach((card, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // Create the inner wrapper for the 3D flip effect
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
        const frontImg = document.createElement('img');
        frontImg.src = CARD_BACK_URL;
        frontImg.alt = 'Card Back';
        cardFront.appendChild(frontImg);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        const backImg = document.createElement('img');
        backImg.src = card.image_url;
        backImg.alt = card.name;
        cardBack.appendChild(backImg);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);

        if (card.isReversed) {
            cardElement.classList.add('reversed');
        }

        const positionLabel = document.createElement('div');
        positionLabel.classList.add('position-label');
        positionLabel.textContent = card.position;

        // Add specific position classes for different layouts
        if (currentSpreadType === 'celticCross') {
            if (index <= 2 || index === 3 || index === 5) {
                positionLabel.classList.add('label-below');
            } else if (index === 4) {
                positionLabel.classList.add('label-above');
            } else if (index >= 6) {
                positionLabel.classList.add('label-right');
            }
        } else if (currentSpreadType === 'horseshoe') {
            if (index === 2 || index === 5 || index === 6) {
                 positionLabel.classList.add('label-above');
            } else {
                positionLabel.classList.add('label-below');
            }
        } else {
            positionLabel.classList.add('label-below');
        }

        cardContainer.appendChild(cardElement);
        cardContainer.appendChild(positionLabel);

        spreadArea.appendChild(cardContainer);
        cardElements.push(cardElement);
    });

    // Ensure the spread area is scaled correctly after adding elements
    scaleSpreadArea();

    // Stagger the animations using nested setTimeouts for reliability
    cardElements.forEach((cardEl, index) => {
        // Deal animation
        setTimeout(() => {
            cardEl.classList.add('is-dealing');
        }, index * DEAL_STAGGER_DELAY);

        // Flip animation
        setTimeout(() => {
            cardEl.classList.add('is-flipping');
        }, index * DEAL_STAGGER_DELAY + FLIP_DELAY_AFTER_DEAL_START);
    });
}

function scaleSpreadArea() {
    if (!spreadArea || !spreadAreaWrapper || !interpretationArea || !statsArea) return;

    const availableWidth = spreadAreaWrapper.clientWidth - 30; // 15px padding on each side
    let scaleFactor = 1;
    let baseHeight = DEFAULT_SPREAD_AREA_MIN_HEIGHT;

    // Reset transform to get accurate measurements
    spreadArea.style.transform = 'scale(1)';

    if (currentSpreadType === 'celticCross') {
        baseHeight = `${CELTIC_CROSS_BASE_HEIGHT}px`;
        if (availableWidth < CELTIC_CROSS_BASE_WIDTH) {
            scaleFactor = availableWidth / CELTIC_CROSS_BASE_WIDTH;
            spreadArea.style.transform = `scale(${scaleFactor})`;
        }
    } else if (currentSpreadType === 'horseshoe') {
        baseHeight = `${HORSESHOE_BASE_HEIGHT}px`;
        if (availableWidth < HORSESHOE_BASE_WIDTH) {
            scaleFactor = availableWidth / HORSESHOE_BASE_WIDTH;
            spreadArea.style.transform = `scale(${scaleFactor})`;
        }
    }

    // Adjust min-height based on scale factor to prevent layout collapse
    if (scaleFactor < 1) {
         const scaledHeight = (currentSpreadType === 'celticCross' ? CELTIC_CROSS_BASE_HEIGHT : HORSESHOE_BASE_HEIGHT) * scaleFactor;
         spreadArea.style.minHeight = `${scaledHeight}px`;
    } else {
         spreadArea.style.minHeight = baseHeight;
    }

    // Sync the height of the interpretation/stats area with the spread area wrapper
    requestAnimationFrame(() => {
        const wrapperHeight = spreadAreaWrapper.offsetHeight;
        if (wrapperHeight > 0) { 
            interpretationArea.style.height = `${wrapperHeight}px`;
            statsArea.style.height = `${wrapperHeight}px`; 
        } else {
            console.warn('Could not get valid spreadAreaWrapper height.');
        }
    });
}

function setupResizeObserver() {
    if (!spreadAreaWrapper) return;

    const resizeObserver = new ResizeObserver(entries => {
        // Use requestAnimationFrame to avoid layout thrashing
        requestAnimationFrame(scaleSpreadArea);
    });

    resizeObserver.observe(spreadAreaWrapper);
}

function handleDealSpread() {
    if (deck.length === 0) {
        console.error('Deck not loaded.');
        return;
    }

    interpretButton.disabled = true;
    interpretationText.textContent = '';

    // Clear previous spread and remove animation classes from children
    Array.from(spreadArea.children).forEach(child => {
        const card = child.querySelector('.card');
        if (card) {
            card.classList.remove('is-dealing', 'is-flipping');
        }
    });

    // Use a small timeout to allow the DOM to update and animations to reset
    setTimeout(() => {
        spreadArea.innerHTML = '';
        spreadArea.classList.remove('celtic-cross-layout', 'horseshoe-layout');

        // Add the appropriate layout class for the new spread
        if (currentSpreadType === 'celticCross') {
            spreadArea.classList.add('celtic-cross-layout');
        } else if (currentSpreadType === 'horseshoe') {
            spreadArea.classList.add('horseshoe-layout');
        }

        const spreadInfo = spreadDefinitions[currentSpreadType];
        if (!spreadInfo) {
            console.error(`Invalid spread type: ${currentSpreadType}`);
            return;
        }

        const shuffledDeck = shuffleDeck([...deck]);
        const drawnCards = shuffledDeck.slice(0, spreadInfo.count);

        currentSpread = drawnCards.map((card, index) => ({
            ...card,
            isReversed: Math.random() < 0.5,
            position: spreadInfo.positions[index] || `Card ${index + 1}`
        }));

        displaySpread(currentSpread);
        updateStats(currentSpreadType, currentSpread);
        saveStats();
        displayStats(currentSpreadType);

        // Enable interpretation button after a delay (e.g., after flip animation might finish)
        // Adjust timing based on animation duration using global constants
        // Keyframe durations: deal=0.5s, flip=0.8s
        const maxDealDelay = (spreadInfo.count - 1) * DEAL_STAGGER_DELAY;
        const lastDealFinishTime = maxDealDelay + 500; // Deal animation duration = 500ms
        const lastFlipStartTime = maxDealDelay + FLIP_DELAY_AFTER_DEAL_START;
        const lastFlipFinishTime = lastFlipStartTime + 800; // Flip animation duration = 800ms
        const totalAnimationTime = Math.max(lastDealFinishTime, lastFlipFinishTime);

        setTimeout(() => {
             interpretButton.disabled = false;
        }, totalAnimationTime);

    }, 50); // Delay clearing and dealing slightly after resetting animation classes
}

async function handleGetInterpretation() {
    if (currentSpread.length === 0) {
        interpretationText.textContent = 'Please deal a spread first.';
        return;
    }

    // Activate the interpretation tab
    document.querySelector('.tab-button[data-tab="interpretation"]').click();

    interpretationText.innerHTML = ''; // Clear previous text
    let accumulatedText = '';
    interpretButton.disabled = true;

    const spreadDetails = currentSpread.map((card, index) => {
        const position = spreadDefinitions[currentSpreadType]?.positions[index] || `Card ${index + 1}`;
        const reversed = card.isReversed ? ' (Reversed)' : '';
        return `${position}: ${card.name}${reversed}`;
    }).join('\n');

    const prompt = `Provide a tarot reading interpretation for the following ${spreadDefinitions[currentSpreadType].name} spread:\n\n${spreadDetails}\n\nPlease provide a concise, insightful interpretation focusing on the interplay between the cards in their positions.`;

    try {
        const response = await fetch('/api/interpret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "claude-3-haiku-20240307",
                max_tokens: 2048,
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
                    interpretButton.disabled = false;
                    return;
                }
                accumulatedText += decoder.decode(value, { stream: true });
                interpretationText.innerHTML = marked.parse(accumulatedText);
                push();
            }).catch(err => {
                console.error('Error reading stream:', err);
                interpretationText.textContent = 'Error displaying interpretation.';
                interpretButton.disabled = false;
            });
        }

        push();

    } catch (error) {
        console.error('Error getting interpretation:', error);
        interpretationText.textContent = `Error: ${error.message}`;
        interpretButton.disabled = false;
    }
}

// --- Statistics ---
function loadStats() {
    const savedStats = localStorage.getItem('tarotStats');
    if (savedStats) {
        try {
            stats = JSON.parse(savedStats) || {};
        } catch (e) {
            console.error('Error parsing stats from localStorage:', e);
            stats = {};
        }

        // Ensure all spread types from definitions exist in stats and have the correct structure
        Object.keys(spreadDefinitions).forEach(spreadType => {
            if (!stats[spreadType]) {
                stats[spreadType] = { totalDraws: 0, cards: {}, suits: {}, numbers: {}, reversals: 0 };
            } else {
                // Ensure sub-properties exist to prevent errors with old data structures
                stats[spreadType].totalDraws = stats[spreadType].totalDraws || 0;
                stats[spreadType].cards = stats[spreadType].cards || {};
                stats[spreadType].suits = stats[spreadType].suits || {};
                stats[spreadType].numbers = stats[spreadType].numbers || {};
                stats[spreadType].reversals = stats[spreadType].reversals || 0;
            }
        });
        console.log('Stats loaded and validated from localStorage.');
    } else {
        // Initialize with empty objects for each spread type
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
        console.log('No saved stats found, initialized new stats object.');
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
        // Count suit, using 'Major Arcana' if suit is not defined
        const suit = card.suit || 'Major Arcana';
        spreadStats.suits[suit] = (spreadStats.suits[suit] || 0) + 1;

        // Only count numbers for Minor Arcana
        if (card.arcana === 'minor') {
            spreadStats.numbers[card.number] = (spreadStats.numbers[card.number] || 0) + 1;
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
    if (!statsText || !deck.length) return; // Also wait for deck to be loaded

    const spreadStats = stats[spreadType];
    const spreadName = spreadDefinitions[spreadType]?.name || 'Spread';

    if (!spreadStats || spreadStats.totalDraws === 0) {
        statsText.innerHTML = `<h2>${spreadName} Statistics</h2><p>No statistics yet for this spread type. Deal a spread to begin.</p>`;
        return;
    }

    // Helper to create sorted list items for card frequencies
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
    
    // Helper for simple lists
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
