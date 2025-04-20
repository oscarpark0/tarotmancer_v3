// --- DOM Elements ---
const dealButton = document.getElementById('dealButton');
const interpretButton = document.getElementById('interpretButton');
const spreadArea = document.getElementById('spreadArea');
const spreadAreaWrapper = document.getElementById('spreadAreaWrapper');
const interpretationArea = document.getElementById('interpretationArea');
const interpretationText = document.getElementById('interpretationText');
const statsText = document.getElementById('statsText');
const statsArea = document.getElementById('statsArea'); // ADDED Reference

// --- State Variables ---
let deck = [];
let currentSpread = []; // Array of card objects, will include isReversed state
let currentSpreadType = 'threeCard'; // Default spread
let stats = {}; // { spreadType: { positionName: { cardName: count } } }
const INTERPRET_API_URL = '/interpret'; // Our local backend endpoint
const CARD_BACK_URL = 'https://ik.imagekit.io/tarotmancer/cardback.webp';

// --- Animation Constants ---
const DEAL_STAGGER_DELAY = 150; // ms delay between each card starting its deal animation
const FLIP_DELAY_AFTER_DEAL_START = 500; // ms after a card starts dealing before it starts flipping
const CELTIC_CROSS_BASE_WIDTH = 700; // Base width needed for Celtic Cross layout (px)
const CELTIC_CROSS_BASE_HEIGHT = 750; // Base height needed for Celtic Cross layout (px)
const HORSESHOE_BASE_WIDTH = 700; // Base width for Horseshoe (px)
const HORSESHOE_BASE_HEIGHT = 600; // Base height for Horseshoe (px)
const DEFAULT_SPREAD_AREA_MIN_HEIGHT = '250px'; // Default min-height from CSS

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
            '1. Present Situation', '2. Immediate Challenge', '3. Distant Past (Foundation)',
            '4. Recent Past', '5. Best Outcome/Potential', '6. Near Future',
            '7. Your Attitude/Approach', '8. External Influences', '9. Hopes and Fears',
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
    // Add more spreads here in the future
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');
    await loadDeck();
    loadStats(); // Load stats from localStorage
    displayStats(); // Display initial stats
    setupEventListeners();
    setupResizeObserver();
});

// --- Functions (will be added below) ---
// Function to load deck data
async function loadDeck() {
    console.log('Loading deck...');
    try {
        const response = await fetch('tarot_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Convert the object into an array of card objects, including the key (filename)
        deck = Object.entries(data).map(([key, cardData]) => ({
            id: key,
            ...cardData,
            name: cardData.name || key.replace(/_/g, ' ') // Use name field, fallback to key
        }));
        console.log(`Deck loaded with ${deck.length} cards.`);
        // Enable deal button once deck is loaded
        if (dealButton) {
            dealButton.disabled = false;
        }
    } catch (error) {
        console.error('Error loading deck:', error);
        spreadArea.textContent = 'Error loading tarot deck. Please check console.';
        if (dealButton) dealButton.disabled = true; // Keep disabled if load fails
    }
}

// Function to set up event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    // Handle spread selection via buttons
    const spreadButtons = document.querySelectorAll('.spread-button');
    spreadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            spreadButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSpreadType = btn.dataset.spread;
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

    // Tab switching logic
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

// Fisher-Yates (Knuth) Shuffle using Crypto API for randomness
function shuffleDeck(array) {
    let currentIndex = array.length;
    const randomValues = new Uint32Array(currentIndex);
    crypto.getRandomValues(randomValues);

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element using a crypto-random index.
        let randomIndex = randomValues[currentIndex - 1] % currentIndex;
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Function to deal a specified number of cards
function dealSpread(numCards) {
    console.log(`Dealing ${numCards} cards...`);
    if (deck.length < numCards) {
        console.error('Not enough cards in deck to deal spread.');
        // Optionally reshuffle or handle error
        shuffleDeck(); // Simple reshuffle for now
        if (deck.length < numCards) return; // Still not enough
    }
    currentSpread = deck.slice(0, numCards);
    console.log('Spread dealt:', currentSpread.map(card => card.name));
}

// Function to display the dealt cards on the page with flip animation
function displaySpread(spread) {
    spreadArea.innerHTML = ''; // Clear previous spread
    const cardElements = []; // Store card elements for sequenced animation

    // Build the card elements and containers first
    spread.forEach((card, index) => {
        // Create Container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        // Create the card element itself
        const cardElement = document.createElement('div');

        // Create the card front and back faces
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

        // *** NEW: Create the inner wrapper for 3D flip ***
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        // Append faces to the inner wrapper
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        // Append inner wrapper to the card element
        cardElement.appendChild(cardInner);

        // Set card classes (including reversed state)
        cardElement.classList.add('card');
        if (card.isReversed) {
            cardElement.classList.add('reversed');
        }

        // Create Position Label
        const positionLabel = document.createElement('div');
        positionLabel.classList.add('position-label');
        positionLabel.textContent = card.position; // Use position from spread data

        // Assign label position for Celtic Cross
        if (currentSpreadType === 'celticCross') {
            // index: 0-based
            if (index === 0 || index === 1 || index === 2) {
                // Center cross cards (present, challenge, below) - label below
                positionLabel.classList.add('label-below');
            } else if (index === 3) {
                // Recent Past (Card 4) - label below
                positionLabel.classList.add('label-below');
            } else if (index === 4) {
                // Above card (best outcome) - label-above
                positionLabel.classList.add('label-above');
            } else if (index === 5) {
                // Near Future (Card 6) - label below
                positionLabel.classList.add('label-below');
            } else if (index === 6 || index === 7 || index === 8 || index === 9) {
                // Staff cards (vertical stack) - label right
                positionLabel.classList.add('label-right');
            }
        } else if (currentSpreadType === 'horseshoe') { // ADDED HORSESHOE LOGIC
            // index: 0-based (Past, Present, Future, Obstacles, Advice, External, Outcome)
            if (index === 2) { // Future (Top card)
                positionLabel.classList.add('label-above');
            } else if (index === 5 || index === 6) { // External, Outcome (Bottom cards)
                 positionLabel.classList.add('label-above'); // Place above bottom cards
            } else { // Past, Present, Obstacles, Advice (Side cards)
                positionLabel.classList.add('label-below');
            }
        } else {
            // Default: label below for other spreads
            positionLabel.classList.add('label-below');
        }

        // Append card and label to container
        cardContainer.appendChild(cardElement);
        cardContainer.appendChild(positionLabel);

        // Append container to spread area
        spreadArea.appendChild(cardContainer);
        cardElements.push(cardElement); // Store the card element itself for animation
    });

    // Scale the spread area after layout classes are applied
    scaleSpreadArea();

    // IMPORTANT: Delay adding animation classes slightly
    // This allows the browser to render the initial state first, ensuring transitions work consistently
    setTimeout(() => {
        // Trigger animations with calculated delays using global constants
        cardElements.forEach((cardEl, index) => {
            const dealStartTime = index * DEAL_STAGGER_DELAY;
            const flipStartTime = dealStartTime + FLIP_DELAY_AFTER_DEAL_START;

            // Set timeout for the deal animation (adding .is-dealing class)
            setTimeout(() => {
                cardEl.style.setProperty('--deal-delay', '0s'); // Delay handled by setTimeout
                cardEl.classList.add('is-dealing');
            }, dealStartTime);

            // Set timeout for the flip animation (adding .is-flipping class)
            setTimeout(() => {
                cardEl.style.setProperty('--flip-delay', '0s'); // Delay handled by setTimeout
                cardEl.classList.add('is-flipping');
            }, flipStartTime);
        });
    }, 10); // Putting the delay back - might still help consistency
}

// --- New Function to Scale Spread Area ---
function scaleSpreadArea() {
    if (!spreadArea || !spreadAreaWrapper || !interpretationArea || !statsArea) return; // Updated checks

    const availableWidth = spreadAreaWrapper.clientWidth - 30; // Subtract padding (15px each side)
    let scaleFactor = 1;
    let baseHeight = DEFAULT_SPREAD_AREA_MIN_HEIGHT;

    // Reset transform and base height first
    spreadArea.style.transform = 'scale(1)';

    if (currentSpreadType === 'celticCross') {
        baseHeight = `${CELTIC_CROSS_BASE_HEIGHT}px`;
        if (availableWidth < CELTIC_CROSS_BASE_WIDTH) {
            scaleFactor = availableWidth / CELTIC_CROSS_BASE_WIDTH;
            spreadArea.style.transform = `scale(${scaleFactor})`;
        }
    } else if (currentSpreadType === 'horseshoe') { // ADDED Horseshoe Scaling
        baseHeight = `${HORSESHOE_BASE_HEIGHT}px`;
        if (availableWidth < HORSESHOE_BASE_WIDTH) {
            scaleFactor = availableWidth / HORSESHOE_BASE_WIDTH;
            spreadArea.style.transform = `scale(${scaleFactor})`;
        }
    }

    // Set min-height based on spread type and scaling
    // If scaled, height adjusts proportionally. If not scaled, use base height.
    if (scaleFactor < 1) {
         const scaledHeight = (currentSpreadType === 'celticCross' ? CELTIC_CROSS_BASE_HEIGHT : HORSESHOE_BASE_HEIGHT) * scaleFactor;
         spreadArea.style.minHeight = `${scaledHeight}px`;
    } else {
         spreadArea.style.minHeight = baseHeight;
    }

    console.log(`Spread Area Scaled: Type=${currentSpreadType}, AvailableWidth=${availableWidth}, Scale=${scaleFactor.toFixed(2)}, MinHeight=${spreadArea.style.minHeight}`);

    // --- Match Interpretation/Stats Area Height to Spread Wrapper Height ---
    requestAnimationFrame(() => {
        const wrapperHeight = spreadAreaWrapper.offsetHeight;
        if (wrapperHeight > 0) { // Ensure we have a valid height
            interpretationArea.style.height = `${wrapperHeight}px`;
            statsArea.style.height = `${wrapperHeight}px`; // Apply to stats area too
            console.log(`Interpretation/Stats area height set to: ${wrapperHeight}px`);
        } else {
            console.warn('Could not get valid spreadAreaWrapper height.');
        }
    });
}

// --- Setup Resize Observer ---
function setupResizeObserver() {
    if (!spreadAreaWrapper) return;

    const resizeObserver = new ResizeObserver(entries => {
        // We only observe one element, so entries[0] is fine
        scaleSpreadArea();
    });

    resizeObserver.observe(spreadAreaWrapper);
    console.log('ResizeObserver set up for spreadAreaWrapper');
}

// --- Placeholder functions for dealing and interpretation (to be implemented) ---
function handleDealSpread() {
    console.log(`Dealing spread: ${currentSpreadType}`);
    if (deck.length === 0) {
        console.error('Deck not loaded.');
        return;
    }

    interpretButton.disabled = true;
    interpretationText.textContent = ''; // Clear previous interpretation

    // Add/Remove specific layout class based on spread type
    spreadArea.classList.remove('celtic-cross-layout', 'horseshoe-layout'); // Reset both
    if (currentSpreadType === 'celticCross') {
        spreadArea.classList.add('celtic-cross-layout');
    } else if (currentSpreadType === 'horseshoe') { // ADDED
        spreadArea.classList.add('horseshoe-layout');
    }

    // Call scale immediately after potentially adding/removing layout class
    scaleSpreadArea();

    // --- Animation Reset --- 
    // Attempt to force reset animations on existing cards before removing
    const existingCards = spreadArea.querySelectorAll('.card');
    existingCards.forEach(cardEl => {
        cardEl.classList.remove('is-dealing', 'is-flipping');
        cardEl.style.removeProperty('--deal-delay'); // Clear CSS variables too
        cardEl.style.removeProperty('--flip-delay');
        // Force reflow might not be needed if we delay adding classes later
        // void cardEl.offsetWidth; 
    });
    // Give a tiny moment for the removal to register before clearing
    setTimeout(() => {
        spreadArea.innerHTML = ''; // Clear previous spread visually
        interpretationText.textContent = 'Spread dealt. Click "Get Interpretation".';
        interpretButton.disabled = true; // Disable until cards are shown/flipped
        currentSpread = []; // Clear logical spread

        const spreadInfo = spreadDefinitions[currentSpreadType];

        if (!spreadInfo) {
            console.error(`Invalid spread type: ${currentSpreadType}`);
            return;
        }

        const shuffledDeck = shuffleDeck([...deck]);
        const drawnCards = shuffledDeck.slice(0, spreadInfo.count);

        currentSpread = drawnCards.map((card, index) => ({
            ...card,
            isReversed: Math.random() < 0.5, // random orientation per card
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
        const cardId = card.id; // Use card ID for tracking

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
    let statsHtml = 'No stats recorded yet.';
    if (Object.keys(stats).length > 0) {
        statsHtml = '';
        for (const spreadType in stats) {
            const spreadName = spreadDefinitions[spreadType]?.name || spreadType;
            statsHtml += `<h3>${spreadName}</h3><ul>`;
            for (const position in stats[spreadType]) {
                statsHtml += `<li><strong>${position}:</strong><ul>`;
                // Sort cards by frequency for this position
                const sortedCards = Object.entries(stats[spreadType][position])
                                          .sort(([, countA], [, countB]) => countB - countA);

                sortedCards.forEach(([cardId, count]) => {
                    // Find card name from deck using id
                    const cardInfo = deck.find(c => c.id === cardId);
                    const cardName = cardInfo ? cardInfo.name : cardId; // Fallback to ID if not found
                    statsHtml += `<li><img src="${cardInfo.image_url}" alt="${cardName}" class="stat-card"/> ${cardName}: ${count}</li>`;
                });
                statsHtml += `</ul></li>`;
            }
            statsHtml += `</ul>`;
        }
    }
    statsText.innerHTML = statsHtml;
}
