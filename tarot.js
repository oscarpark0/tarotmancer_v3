const dealButton = document.getElementById('dealButton');
const interpretButton = document.getElementById('interpretButton');
const spreadArea = document.getElementById('spreadArea');
const spreadAreaWrapper = document.getElementById('spreadAreaWrapper');
const interpretationArea = document.getElementById('interpretationArea');
const interpretationText = document.getElementById('interpretationText');
const statsText = document.getElementById('statsText');
const statsArea = document.getElementById('statsArea');
const cardModal = document.getElementById('cardModal');
const modalCardImage = document.getElementById('modalCardImage');
const modalCardInfo = document.getElementById('modalCardInfo');
const modalClose = document.getElementById('modalClose');

let deck = [];
let currentSpread = [];
let currentSpreadType = 'threeCard'; 
let stats = {};


const INTERPRET_API_URL = '/interpret'; 
const CARD_BACK_URL = 'https://ik.imagekit.io/tarotmancer/cardback.webp';
const DEAL_STAGGER_DELAY = 150; 
const FLIP_DELAY_AFTER_DEAL_START = 500; 

const CELTIC_CROSS_BASE_WIDTH = 700;
const CELTIC_CROSS_BASE_HEIGHT = 900;
const HORSESHOE_BASE_WIDTH = 900;
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
    await loadDeck();
    loadStats();
    displayStats(currentSpreadType);
    setupEventListeners();
    setupResizeObserver();
    setupCardModal();

    // Keyboard shortcuts: D = Deal, I = Interpret, R = Reroll stars (if present), Esc = Close modal
    document.addEventListener('keydown', (e) => {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;
        const key = e.key.toLowerCase();
        if (key === 'd' && dealButton && !dealButton.disabled) {
            e.preventDefault();
            handleDealSpread();
        } else if (key === 'i' && interpretButton && !interpretButton.disabled) {
            e.preventDefault();
            handleGetInterpretation();
        } else if (key === 'r' && window.skyMain && typeof window.skyMain.reRoll === 'function') {
            e.preventDefault();
            window.skyMain.reRoll();
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
        spreadArea.textContent = 'Error loading tarot deck. Please check console.';
        if (dealButton) dealButton.disabled = true;
    }
}

function setupEventListeners() {
    const spreadButtons = document.querySelectorAll('.spread-button');
    spreadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            spreadButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
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
    const cardElements = [];
    spread.forEach((card, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.style.cursor = 'pointer';
        cardElement.dataset.cardIndex = index;

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

        // Add click handler for zoom
        cardElement.addEventListener('click', () => {
            if (cardElement.classList.contains('is-flipping')) {
                openCardModal(card);
            }
        });

        const positionLabel = document.createElement('div');
        positionLabel.classList.add('position-label');
        positionLabel.textContent = card.position;

        if (currentSpreadType === 'celticCross') {
            if (index <= 2 || index === 3 || index === 5) {
                positionLabel.classList.add('label-below');
            } else if (index === 4) {
                positionLabel.classList.add('label-above');
            } else if (index >= 6) {
                positionLabel.classList.add('label-right');
            }
        } else if (currentSpreadType === 'horseshoe') {
            // Position labels on outer edge of horseshoe for better visibility
            if (index === 0) {
                positionLabel.classList.add('label-horseshoe-left');
            } else if (index === 1) {
                positionLabel.classList.add('label-horseshoe-top-left');
            } else if (index === 2) {
                positionLabel.classList.add('label-above');
            } else if (index === 3) {
                positionLabel.classList.add('label-horseshoe-top-right');
            } else if (index === 4) {
                positionLabel.classList.add('label-horseshoe-right');
            } else if (index === 5 || index === 6) {
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

    scaleSpreadArea();

    cardElements.forEach((cardEl, index) => {
        setTimeout(() => {
            cardEl.classList.add('is-dealing');
        }, index * DEAL_STAGGER_DELAY);

        setTimeout(() => {
            cardEl.classList.add('is-flipping');
        }, index * DEAL_STAGGER_DELAY + FLIP_DELAY_AFTER_DEAL_START);
    });
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

    Array.from(spreadArea.children).forEach(child => {
        const card = child.querySelector('.card');
        if (card) {
            card.classList.remove('is-dealing', 'is-flipping');
        }
    });

    setTimeout(() => {
        spreadArea.innerHTML = '';
        spreadArea.classList.remove('celtic-cross-layout', 'horseshoe-layout');
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

    interpretationText.innerHTML = ''; 
    let accumulatedText = '';
    interpretButton.disabled = true;

    const spreadDetails = currentSpread.map((card, index) => {
        const position = spreadDefinitions[currentSpreadType]?.positions[index] || `Card ${index + 1}`;
        const reversed = card.isReversed ? ' (Reversed)' : '';
        return `${position}: ${card.name}${reversed}`;
    }).join('\n');

    const prompt = `Please provide a thorough and insightful tarot reading interpretation for the following ${spreadDefinitions[currentSpreadType].name} spread:\n\n${spreadDetails}\n\n-Format your response neatly to allow the reader to easily understand the meaning of the spread.\n-Include a summary of the spread, a description of the overall meaning of the spread, and a description of the meaning of each card in the spread. Begin your response with "Dear Seeker".`;

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

function loadStats() {
    const savedStats = localStorage.getItem('tarotStats');
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
        console.log('Stats loaded and validated from localStorage.');
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
    
    // Close on background click
    cardModal.addEventListener('click', closeCardModal);
    
    // Close on X button
    modalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCardModal();
    });
}

function openCardModal(card) {
    if (!cardModal || !modalCardImage || !modalCardInfo) return;
    
    modalCardImage.src = card.image_url;
    modalCardImage.alt = card.name;
    
    if (card.isReversed) {
        modalCardImage.classList.add('reversed');
    } else {
        modalCardImage.classList.remove('reversed');
    }
    
    const reversedText = card.isReversed ? ' (Reversed)' : '';
    modalCardInfo.textContent = `${card.name}${reversedText}`;
    
    cardModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCardModal() {
    if (!cardModal) return;
    
    cardModal.classList.remove('active');
    document.body.style.overflow = '';
}
