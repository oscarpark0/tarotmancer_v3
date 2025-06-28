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
let currentSpreadType = 'threeCard';
let stats = {};
const INTERPRET_API_URL = '/interpret';
const CARD_BACK_URL = 'https://ik.imagekit.io/tarotmancer/cardback.webp';

const DEAL_STAGGER_DELAY = 150;
const FLIP_DELAY_AFTER_DEAL_START = 500;
const CELTIC_CROSS_BASE_WIDTH = 700;
const CELTIC_CROSS_BASE_HEIGHT = 750;
const HORSESHOE_BASE_WIDTH = 700;
const HORSESHOE_BASE_HEIGHT = 600;
const DEFAULT_SPREAD_AREA_MIN_HEIGHT = '250px';

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
};

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

function shuffleDeck(array) {
    let currentIndex = array.length;
    const randomValues = new Uint32Array(currentIndex);
    crypto.getRandomValues(randomValues);
    while (currentIndex !== 0) {
        let randomIndex = randomValues[currentIndex - 1] % currentIndex;
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function dealSpread(numCards) {
    console.log(`Dealing ${numCards} cards...`);
    if (deck.length < numCards) {
        console.error('Not enough cards in deck to deal spread.');
        shuffleDeck();
        if (deck.length < numCards) return;
    }
    currentSpread = deck.slice(0, numCards);
    console.log('Spread dealt:', currentSpread.map(card => card.name));
}

function displaySpread(spread) {
    spreadArea.innerHTML = ''; 
    const cardElements = []; 
    spread.forEach((card, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const cardElement = document.createElement('div');

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

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        cardElement.appendChild(cardInner);

        cardElement.classList.add('card');
        if (card.isReversed) {
            cardElement.classList.add('reversed');
        }

        const positionLabel = document.createElement('div');
        positionLabel.classList.add('position-label');
        positionLabel.textContent = card.position;

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
        } else if (currentSpreadType === 'horseshoe') {
            if (index === 2) {
                positionLabel.classList.add('label-above');
            } else if (index === 5 || index === 6) {
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
        cardElements.push(cardElement); // Store the card element itself for animation
    });

    scaleSpreadArea();
    scaleSpreadArea();

    setTimeout(() => {
        cardElements.forEach((cardEl, index) => {
            const dealStartTime = index * DEAL_STAGGER_DELAY;
            const flipStartTime = dealStartTime + FLIP_DELAY_AFTER_DEAL_START;
            setTimeout(() => {
                cardEl.style.setProperty('--deal-delay', '0s');
                cardEl.classList.add('is-dealing');
            }, dealStartTime);

            setTimeout(() => {
                cardEl.style.setProperty('--flip-delay', '0s');
                cardEl.classList.add('is-flipping');
            }, flipStartTime);
        });
    }, 10); 
}

function scaleSpreadArea() {
    if (!spreadArea || !spreadAreaWrapper || !interpretationArea || !statsArea) return;

    const availableWidth = spreadAreaWrapper.clientWidth - 30; 
    let scaleFactor = 1;
    let baseHeight = DEFAULT_SPREAD_AREA_MIN_HEIGHT;

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

    if (scaleFactor < 1) {
         const scaledHeight = (currentSpreadType === 'celticCross' ? CELTIC_CROSS_BASE_HEIGHT : HORSESHOE_BASE_HEIGHT) * scaleFactor;
         spreadArea.style.minHeight = `${scaledHeight}px`;
    } else {
         spreadArea.style.minHeight = baseHeight;
    }

    console.log(`Spread Area Scaled: Type=${currentSpreadType}, AvailableWidth=${availableWidth}, Scale=${scaleFactor.toFixed(2)}, MinHeight=${spreadArea.style.minHeight}`);

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
        scaleSpreadArea();
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

    spreadArea.classList.remove('celtic-cross-layout', 'horseshoe-layout'); 
    if (currentSpreadType === 'celticCross') {
        spreadArea.classList.add('celtic-cross-layout');
    } else if (currentSpreadType === 'horseshoe') { 
        spreadArea.classList.add('horseshoe-layout');
    }

    scaleSpreadArea();

    const existingCards = spreadArea.querySelectorAll('.card');
    existingCards.forEach(cardEl => {
        cardEl.classList.remove('is-dealing', 'is-flipping');
        cardEl.style.removeProperty('--deal-delay');
        cardEl.style.removeProperty('--flip-delay');
    });
    setTimeout(() => {
        spreadArea.innerHTML = '';
        interpretationText.textContent = 'Spread dealt. Click "Get Interpretation".';
        interpretButton.disabled = true;
        currentSpread = [];

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

        const maxDealDelay = (spreadInfo.count - 1) * DEAL_STAGGER_DELAY;
        const lastDealFinishTime = maxDealDelay + 500;
        const lastFlipStartTime = maxDealDelay + FLIP_DELAY_AFTER_DEAL_START;
        const lastFlipFinishTime = lastFlipStartTime + 800;
        const totalAnimationTime = Math.max(lastDealFinishTime, lastFlipFinishTime);

        setTimeout(() => {
             interpretButton.disabled = false;
        }, totalAnimationTime);

    }, 50); 
}

async function handleGetInterpretation() {
    if (currentSpread.length === 0) {
        interpretationText.textContent = 'Please deal a spread first.';
        return;
    }

    document.querySelector('.tab-button[data-tab="interpretation"]').click();

    interpretationText.textContent = 'Getting interpretation...';
    interpretButton.disabled = true;

    try {
        const spreadDetails = currentSpread.map((card, index) => {
            const position = spreadDefinitions[currentSpreadType]?.positions[index] || `Card ${index + 1}`;
            const reversed = card.isReversed ? ' (Reversed)' : '';
            return `${position}: ${card.name}${reversed}`;
        }).join('\n');

        const prompt = `Provide a tarot reading interpretation for the following ${spreadDefinitions[currentSpreadType].name} spread:\n\n${spreadDetails}\n\nPlease provide a concise, insightful interpretation focusing on the interplay between the cards in their positions.`;

        const requestBody = {
            model: "claude-sonnet-4-20250514",
            max_tokens: 4096,
            messages: [
                { role: "user", content: prompt }
            ]
        };

        const response = await fetch('/api/interpret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error from serverless function:', data);
            throw new Error(data.error || `Server responded with status ${response.status}`);
        }
        if (data.content && data.content.length > 0 && data.content[0].text) {
            interpretationText.textContent = data.content[0].text;
        } else {
            console.error('Unexpected response structure:', data);
            interpretationText.textContent = 'Could not extract interpretation from response.';
        }

    } catch (error) {
        console.error('Error getting interpretation:', error);
        interpretationText.textContent = `Error getting interpretation: ${error.message}`;
    } finally {
        interpretButton.disabled = false;
    }
}

function loadStats() {
    const storedStats = localStorage.getItem('tarotStats');
    if (storedStats) {
        try {
            stats = JSON.parse(storedStats);
            console.log('Loaded stats from localStorage:', stats);
        } catch (e) {
            console.error('Error parsing stats from localStorage:', e);
            stats = {};
        }
    } else {
        stats = {};
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
    let statsHtml = 'No stats recorded yet.';
    if (Object.keys(stats).length > 0) {
        statsHtml = '';
        for (const spreadType in stats) {
            const spreadName = spreadDefinitions[spreadType]?.name || spreadType;
            statsHtml += `<h3>${spreadName}</h3><ul>`;
            for (const position in stats[spreadType]) {
                statsHtml += `<li><strong>${position}:</strong><ul>`;
                const sortedCards = Object.entries(stats[spreadType][position])
                                          .sort(([, countA], [, countB]) => countB - countA);

                sortedCards.forEach(([cardId, count]) => {
                    const cardInfo = deck.find(c => c.id === cardId);
                    const cardName = cardInfo ? cardInfo.name : cardId;
                    statsHtml += `<li><img src="${cardInfo.image_url}" alt="${cardName}" class="stat-card"/> ${cardName}: ${count}</li>`;
                });
                statsHtml += `</ul></li>`;
            }
            statsHtml += `</ul>`;
        }
    }
    statsText.innerHTML = statsHtml;
}
