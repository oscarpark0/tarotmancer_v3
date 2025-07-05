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
    console.log('DOM fully loaded and parsed');
    await loadDeck();
    displayStats(); // Initial call to clear stats area if needed
    setupEventListeners();
    setupResizeObserver();
});

async function loadDeck() {
    console.log('Loading deck...');
    try {
        const response = await fetch('tarot_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        deck = Object.entries(data).map(([key, cardData]) => ({
            id: key,
            ...cardData,
            name: cardData.name || key.replace(/_/g, ' ')
        }));
        console.log(`Deck loaded with ${deck.length} cards.`);
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
    console.log('Setting up event listeners...');
    // Spread selection buttons
    const spreadButtons = document.querySelectorAll('.spread-button');
    spreadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            spreadButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSpreadType = btn.dataset.spread;
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

    console.log(`Spread Area Scaled: Type=${currentSpreadType}, AvailableWidth=${availableWidth}, Scale=${scaleFactor.toFixed(2)}, MinHeight=${spreadArea.style.minHeight}`);

    // Sync the height of the interpretation/stats area with the spread area wrapper
    requestAnimationFrame(() => {
        const wrapperHeight = spreadAreaWrapper.offsetHeight;
        if (wrapperHeight > 0) { 
            interpretationArea.style.height = `${wrapperHeight}px`;
            statsArea.style.height = `${wrapperHeight}px`; 
            console.log(`Interpretation/Stats area height set to: ${wrapperHeight}px`);
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
    console.log('ResizeObserver set up for spreadAreaWrapper');
}

function handleDealSpread() {
    console.log(`Dealing spread: ${currentSpreadType}`);
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
        displayStats(); // Update stats for the new spread

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
                    console.log('Stream complete');
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

function displayStats() {
    if (!statsText) return;

    if (currentSpread.length === 0) {
        statsText.innerHTML = '<p>No statistics yet. Deal a spread to see its stats.</p>';
        return;
    }

    const spreadStats = {
        suits: {},
        numbers: {},
        reversals: 0,
        majorArcana: 0,
        minorArcana: 0
    };

    currentSpread.forEach(card => {
        spreadStats.suits[card.suit] = (spreadStats.suits[card.suit] || 0) + 1;
        spreadStats.numbers[card.number] = (spreadStats.numbers[card.number] || 0) + 1;
        if (card.isReversed) {
            spreadStats.reversals++;
        }
        if (card.suit === 'Major Arcana') {
            spreadStats.majorArcana++;
        } else {
            spreadStats.minorArcana++;
        }
    });

    const totalCards = currentSpread.length;
    const reversalRate = totalCards > 0 ? ((spreadStats.reversals / totalCards) * 100).toFixed(1) : 0;

    let statsHTML = `<h2>Current Spread: ${spreadDefinitions[currentSpreadType].name}</h2>`;
    statsHTML += `<p><strong>Total Cards:</strong> ${totalCards}</p>`;
    statsHTML += `<p><strong>Reversed Cards:</strong> ${spreadStats.reversals} (${reversalRate}%)</p>`;
    statsHTML += `<p><strong>Major Arcana:</strong> ${spreadStats.majorArcana}</p>`;
    statsHTML += `<p><strong>Minor Arcana:</strong> ${spreadStats.minorArcana}</p>`;

    const createList = (data, title) => {
        const items = Object.entries(data)
            .map(([key, value]) => `<li>${key.replace(/_/g, ' ')}: ${value}</li>`)
            .join('');
        return `<h3>${title}</h3><ul>${items}</ul>`;
    };

    if (Object.keys(spreadStats.suits).length > 0) {
        statsHTML += createList(spreadStats.suits, 'Suit Frequency');
    }
    if (Object.keys(spreadStats.numbers).length > 0) {
        statsHTML += createList(spreadStats.numbers, 'Number/Rank Frequency');
    }

    statsText.innerHTML = statsHTML;
}
