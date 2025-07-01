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
    console.log('DOM fully loaded and parsed');
    await loadDeck();
    loadStats();
    displayStats();
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

    // Card focus on click (event delegation on spreadArea)
    if (spreadArea) {
        spreadArea.addEventListener('click', (e) => {
            const clickedCardContainer = e.target.closest('.card-container');

            // If a card container was clicked
            if (clickedCardContainer) {
                const isAlreadyFocused = clickedCardContainer.classList.contains('focused');
                
                // Remove focus from all cards first
                spreadArea.querySelectorAll('.card-container.focused').forEach(card => {
                    card.classList.remove('focused');
                });

                // If it wasn't already focused, add focus class to the clicked card
                if (!isAlreadyFocused) {
                    clickedCardContainer.classList.add('focused');
                }
            }
        });
    } else {
        console.error('spreadArea not found for click listener');
    }
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
        updateStats(currentSpreadType, currentSpread);
        saveStats();
        displayStats();

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

    interpretationText.textContent = 'Getting interpretation...';
    interpretButton.disabled = true;

    try {
        // Construct the prompt for the API
        const spreadDetails = currentSpread.map((card, index) => {
            const position = spreadDefinitions[currentSpreadType]?.positions[index] || `Card ${index + 1}`;
            const reversed = card.isReversed ? ' (Reversed)' : '';
            return `${position}: ${card.name}${reversed}`;
        }).join('\n');

        const prompt = `Provide a tarot reading interpretation for the following ${spreadDefinitions[currentSpreadType].name} spread:\n\n${spreadDetails}\n\nPlease provide a concise, insightful interpretation focusing on the interplay between the cards in their positions.`;

        // Prepare the request body for our serverless function
        const requestBody = {
            model: "claude-3-7-sonnet-20250219", // Use a powerful model
            max_tokens: 2048,
            messages: [
                { role: "user", content: prompt }
            ]
        };

        // Call our serverless function endpoint
        const response = await fetch('/api/interpret', { // CORRECTED PATH
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle errors returned from our serverless function
            console.error('Error from serverless function:', data);
            throw new Error(data.error || `Server responded with status ${response.status}`);
        }

        // Extract the interpretation text from the correct place in the Anthropic response structure
        if (data.content && data.content.length > 0 && data.content[0].text) {
            interpretationText.textContent = data.content[0].text;
        } else {
            console.error('Unexpected response structure:', data);
            interpretationText.textContent = 'Could not extract interpretation from response.';
        }

    } catch (error) {
        console.error('Error getting interpretation:', error);
        // Display a user-friendly message, including the error if possible
        interpretationText.textContent = `Error getting interpretation: ${error.message}`;
    } finally {
        interpretButton.disabled = false;
    }
}

// --- Statistics Handling ---
function loadStats() {
    const storedStats = localStorage.getItem('tarotStats');
    if (storedStats) {
        try {
            stats = JSON.parse(storedStats);
            console.log('Loaded stats from localStorage:', stats);
        } catch (e) {
            console.error('Error parsing stats from localStorage:', e);
            stats = {}; // Reset if invalid
        }
    } else {
        stats = {}; // Initialize if nothing stored
    }
}


function updateStats(spreadType, spread) {
    if (!stats[spreadType]) {
        stats[spreadType] = {};
    }

    spread.forEach(card => {
        const position = card.position;
        const cardId = card.id; 

        if (!stats[spreadType][position]) {
            stats[spreadType][position] = {};
        }
        if (!stats[spreadType][position][cardId]) {
            stats[spreadType][position][cardId] = 0;
        }
        stats[spreadType][position][cardId]++;
    });
    console.log('Updated stats:', stats);
}

function saveStats() {
    try {
        localStorage.setItem('tarotStats', JSON.stringify(stats));
    } catch (e) {
        console.error('Error saving stats to localStorage:', e);
    }
}

function displayStats() {
    let statsHtml = '<div class="stats-placeholder">No stats recorded yet.</div>';
    if (Object.keys(stats).length > 0) {
        statsHtml = '';
        for (const spreadType in stats) {
            const spreadName = spreadDefinitions[spreadType]?.name || spreadType;
            statsHtml += `<div class="stats-spread-section">`;
            statsHtml += `<h3>${spreadName}</h3>`;

            for (const position in stats[spreadType]) {
                statsHtml += `<div class="stats-position-section">`;
                statsHtml += `<h4>${position}</h4>`;
                
                const positionStats = stats[spreadType][position];
                const totalDrawsForPosition = Object.values(positionStats).reduce((sum, count) => sum + count, 0);

                const sortedCards = Object.entries(positionStats)
                                          .sort(([, countA], [, countB]) => countB - countA);

                sortedCards.forEach(([cardId, count]) => {
                    const cardInfo = deck.find(c => c.id === cardId);
                    if (!cardInfo) return;

                    const percentage = totalDrawsForPosition > 0 ? ((count / totalDrawsForPosition) * 100).toFixed(1) : 0;
                    const cardName = cardInfo.name;

                    statsHtml += `
                        <div class="stats-row">
                            <div class="stats-card-info">
                                <img src="${cardInfo.image_url}" alt="${cardName}" class="stats-card-img"/>
                                <span class="stats-card-name">${cardName}</span>
                            </div>
                            <div class="stats-bar-container">
                                <div class="stats-bar" style="width: ${percentage}%;"></div>
                            </div>
                            <span class="stats-count">${count} (${percentage}%)</span>
                        </div>`;
                });
                statsHtml += `</div>`; 
            }
            statsHtml += `</div>`; 
        }
    }
    statsText.innerHTML = statsHtml;
}
