// Tarot card functionality
class TarotDeck {
    constructor() {
        this.cards = [];
        this.loadCards();
    }

    async loadCards() {
        try {
            const response = await fetch('tarot_data.json');
            const data = await response.json();

            // Convert the object to an array of cards
            for (const [key, card] of Object.entries(data)) {
                this.cards.push({
                    id: key,
                    name: card.name,
                    arcana: card.arcana,
                    suit: card.suit || null,
                    description: card.description,
                    image_url: card.image_url
                });
            }

            console.log(`Loaded ${this.cards.length} cards`);
        } catch (error) {
            console.error('Error loading tarot cards:', error);
        }
    }

    // Use the Web Crypto API for true randomness
    async shuffle() {
        if (this.cards.length === 0) {
            console.error('No cards to shuffle');
            return;
        }

        console.log('Shuffling deck...');

        // Create an array of the same length as this.cards filled with random values
        const randomValues = new Uint32Array(this.cards.length);
        window.crypto.getRandomValues(randomValues);

        // Create an array of indices
        const indices = Array.from({ length: this.cards.length }, (_, i) => i);

        // Sort the indices based on the random values
        indices.sort((a, b) => randomValues[a] - randomValues[b]);

        // Reorder the cards based on the shuffled indices
        this.cards = indices.map(i => this.cards[i]);

        console.log('Deck shuffled');
    }

    // Draw a specific number of cards
    async drawCards(count) {
        if (this.cards.length === 0) {
            console.error('No cards to draw');
            return [];
        }

        await this.shuffle();

        // Draw the specified number of cards
        const drawnCards = this.cards.slice(0, count);

        // Add reversed property with 50% chance
        return drawnCards.map(card => {
            const randomValue = new Uint8Array(1);
            window.crypto.getRandomValues(randomValue);
            const isReversed = randomValue[0] % 2 === 0;

            return {
                ...card,
                isReversed
            };
        });
    }
}

// Spread definitions
const spreads = {
    mirrors: {
        name: "Five Card Spread",
        description: "A comprehensive reading that explores multiple aspects of your question or situation.",
        positions: [
            "Past Influence",
            "Present Situation",
            "Hidden Influence",
            "Advice",
            "Potential Outcome"
        ],
        layout: "mirrors-layout",
        cardCount: 5
    },
    threshold: {
        name: "Four Card Spread",
        description: "A reading that examines the influences and potential outcomes of your current situation.",
        positions: [
            "Current Situation",
            "Challenge",
            "Action to Take",
            "Potential Outcome"
        ],
        layout: "threshold-layout",
        cardCount: 4
    },
    echoes: {
        name: "Three Card Spread",
        description: "A classic reading showing past, present, and future influences.",
        positions: [
            "Past",
            "Present",
            "Future"
        ],
        layout: "echoes-layout",
        cardCount: 3
    },
    single: {
        name: "Single Card",
        description: "A focused reading with one card that addresses the core of your question.",
        positions: [
            "Core Insight"
        ],
        layout: "single-layout",
        cardCount: 1
    }
};

// Export the TarotDeck class and spreads object
window.TarotDeck = TarotDeck;
window.spreads = spreads;

document.addEventListener('DOMContentLoaded', () => {
    const spreadSelect = document.getElementById('spreadSelect');
    const drawButton = document.getElementById('drawButton');
    const resetButton = document.getElementById('resetButton');
    const interpretationButton = document.getElementById('getInterpretation');
    const spreadArea = document.getElementById('spreadArea');
    const interpretationText = document.getElementById('interpretationText');
    const statsText = document.getElementById('statsText');
    const spreadTitle = document.getElementById('spreadTitleText'); // Assuming you have an element for this
    const interpretationArea = document.getElementById('interpretationArea');
    const statsArea = document.getElementById('statsArea');
    const interpretationTabButton = document.getElementById('interpretationTab');
    const statsTabButton = document.getElementById('statsTab');

    let tarotData = {};
    let currentReading = {
        spread: null,
        cards: []
    };
    let cardElements = []; // Store DOM elements for cards

    // --- Fetch Tarot Data --- //
    fetch('tarot_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            tarotData = data;
            populateSpreadSelector();
            console.log('Tarot data loaded successfully.');
        })
        .catch(error => {
            console.error('Error loading tarot data:', error);
            spreadArea.innerHTML = '<p style="color: red;">Error loading card data. Please refresh.</p>';
            drawButton.disabled = true;
        });

    // --- Populate Spread Selector --- //
    function populateSpreadSelector() {
        if (!tarotData.spreads) {
            console.error('Spread data is missing.');
            return;
        }
        Object.keys(tarotData.spreads).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = tarotData.spreads[key].name;
            spreadSelect.appendChild(option);
        });
        spreadSelect.disabled = false;
        drawButton.disabled = false;
    }

    // --- Event Listeners --- //
    drawButton.addEventListener('click', handleDrawCards);
    resetButton.addEventListener('click', resetReading);
    interpretationButton.addEventListener('click', handleGetInterpretation);
    interpretationTabButton.addEventListener('click', () => showTab('interpretation'));
    statsTabButton.addEventListener('click', () => showTab('stats'));

    // --- Draw Cards --- //
    function handleDrawCards() {
        const selectedSpreadKey = spreadSelect.value;
        if (!selectedSpreadKey || !tarotData.spreads || !tarotData.spreads[selectedSpreadKey]) {
            console.error('Invalid spread selected.');
            return;
        }

        resetReading(); // Clear previous reading first

        const spread = tarotData.spreads[selectedSpreadKey];
        currentReading.spread = spread;
        spreadTitle.textContent = spread.name; // Update title
        spreadArea.className = 'spread-area'; // Reset class list
        if (spread.layout_class) {
             spreadArea.classList.add(spread.layout_class);
        }

        const availableCards = [...tarotData.cards]; // Create a copy to modify
        cardElements = []; // Clear previous card elements

        for (let i = 0; i < spread.num_cards; i++) {
            if (availableCards.length === 0) {
                console.warn('Not enough cards in the deck for this spread.');
                break;
            }

            // Select random card
            const randomIndex = Math.floor(Math.random() * availableCards.length);
            const cardData = { ...availableCards.splice(randomIndex, 1)[0] }; // Draw and remove card, create copy
            cardData.isReversed = Math.random() < 0.3; // ~30% chance of being reversed
            cardData.position = spread.positions[i] || `Card ${i + 1}`; // Assign position from spread

            currentReading.cards.push(cardData);

            // Create card element
            const cardElement = createCardElement(cardData, i);
            spreadArea.appendChild(cardElement);
            cardElements.push(cardElement); // Store for later use
        }

        // Trigger dealing animation
        requestAnimationFrame(() => {
             cardElements.forEach((el, index) => {
                el.querySelector('.card').classList.add('is-dealing');
             });
        });

        interpretationButton.disabled = false;
        resetButton.disabled = false;
        drawButton.disabled = true; // Disable draw until reset
        spreadSelect.disabled = true;
        scaleSpreadArea(); // ADDED: Scale complex spreads if needed
    }

    // --- Create Card Element --- //
    function createCardElement(cardData, index) {
        const container = document.createElement('div');
        container.classList.add('card-container');

        const card = document.createElement('div');
        card.classList.add('card');
        if (cardData.isReversed) {
            card.classList.add('reversed');
        }
        card.style.setProperty('--deal-delay', `${index * 0.15}s`); // Stagger dealing
        card.style.setProperty('--flip-delay', `${index * 0.1}s`); // Stagger flipping

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
        const frontImg = document.createElement('img');
        frontImg.src = 'images/card_back.png'; // Path to your card back image
        frontImg.alt = 'Card Back';
        cardFront.appendChild(frontImg);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        const backImg = document.createElement('img');
        backImg.src = `images/${cardData.image}`; // Assumes images are in an 'images' folder
        backImg.alt = cardData.name;
        cardBack.appendChild(backImg);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        // Add click listener for flipping individual cards
        card.addEventListener('click', () => flipCard(card));

        container.appendChild(card);

        // Add position label
        const label = document.createElement('div');
        label.classList.add('position-label');
        // Determine label position based on spread layout if needed
        const labelPositionClass = getLabelPositionClass(currentReading.spread.layout_class, index + 1);
        label.classList.add(labelPositionClass);
        label.textContent = cardData.position;
        container.appendChild(label);

        return container;
    }

    // Determine label CSS class based on layout and index (customize as needed)
    function getLabelPositionClass(layoutClass, cardIndex) {
        if (layoutClass === 'celtic-cross-layout') {
            // Example: Celtic Cross specific positions
            if (cardIndex === 4) return 'label-left';
            if (cardIndex === 6) return 'label-right';
            if ([7, 8, 9, 10].includes(cardIndex)) return 'label-right';
            if (cardIndex === 3) return 'label-below';
            if (cardIndex === 5) return 'label-above';
            // Default for center cards or others
            return 'label-below';
        }
        if (layoutClass === 'horseshoe-layout') {
             // Example: Horseshoe specific positions
             if ([1, 2, 3, 4, 5].includes(cardIndex)) return 'label-above';
             return 'label-below';
        }
        // Default for simple spreads
        return 'label-below';
    }

    // --- Flip Card --- //
    function flipCard(cardElement) {
        if (!cardElement.classList.contains('is-flipped') && cardElement.classList.contains('is-dealing')) {
            cardElement.classList.add('is-flipping');
            cardElement.classList.add('is-flipped'); // Mark as flipped
        }
    }

    // --- Reset Reading --- //
    function resetReading() {
        spreadArea.innerHTML = '';
        interpretationText.innerHTML = 'Interpretation will appear here...';
        statsText.innerHTML = 'Statistics will appear here...';
        spreadTitle.textContent = ''; // Clear title
        currentReading = { spread: null, cards: [] };
        cardElements = [];
        interpretationButton.disabled = true;
        resetButton.disabled = true;
        drawButton.disabled = false;
        spreadSelect.disabled = false;
        spreadArea.className = 'spread-area'; // Reset layout class
        showTab('interpretation'); // Default to interpretation tab
        interpretationText.scrollTop = 0; // Scroll to top
        statsText.scrollTop = 0;
         // Reset scale if applied
        spreadArea.style.transform = 'scale(1)';
    }

    // --- Get Interpretation --- //
    async function handleGetInterpretation() {
        if (currentReading.cards.length === 0 || !currentReading.spread) {
            interpretationText.textContent = 'Please draw cards first.';
            return;
        }

        interpretationText.textContent = 'Getting interpretation from Claude...';
        interpretationButton.disabled = true;
        showTab('interpretation'); // Switch to interpretation tab

        // Ensure all cards are flipped before interpreting
        cardElements.forEach(el => {
             const card = el.querySelector('.card');
             if (!card.classList.contains('is-flipped')) {
                 flipCard(card);
             }
        });

        // Prepare data for API
        const readingData = {
            spread: {
                name: currentReading.spread.name,
                description: currentReading.spread.description,
                positions: currentReading.spread.positions
            },
            cards: currentReading.cards.map(card => ({
                name: card.name,
                description: card.description, // Send description for context
                isReversed: card.isReversed,
                arcana: card.arcana // Added for potential use in prompt/stats
            }))
        };

        try {
            // Use the Vercel serverless function endpoint
            const response = await fetch('/api/interpret', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reading: readingData }), // Match serverless function expected body
            });

            if (!response.ok) {
                 const errorBody = await response.text();
                 console.error('API Error Response:', errorBody);
                 throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            interpretationText.innerHTML = result.interpretation || 'No interpretation received.';
            if (result.fallback) {
                interpretationText.innerHTML += '<p><i>(Generated fallback interpretation)</i></p>';
            }
            calculateAndDisplayStats(); // Calculate stats after interpretation

        } catch (error) {
            console.error('Error getting interpretation:', error);
            interpretationText.innerHTML = `<p style="color: red;">Error: Could not get interpretation. ${error.message}. Please check the console and ensure the API endpoint is working.</p>`;
        } finally {
            interpretationButton.disabled = false; // Re-enable button
        }
    }

    // --- Calculate Stats --- //
    function calculateAndDisplayStats() {
        if (currentReading.cards.length === 0) {
            statsText.textContent = 'Draw cards to see statistics.';
            return;
        }

        const numCards = currentReading.cards.length;
        const reversedCount = currentReading.cards.filter(card => card.isReversed).length;
        const majorArcanaCount = currentReading.cards.filter(card => card.arcana === 'major').length;
        const minorArcanaCount = currentReading.cards.filter(card => card.arcana === 'minor').length;

        const suits = { Wands: 0, Cups: 0, Swords: 0, Pentacles: 0 };
        currentReading.cards.forEach(card => {
            if (card.suit && suits.hasOwnProperty(card.suit)) {
                suits[card.suit]++;
            }
        });

        let statsHTML = `<h3>Reading Statistics</h3>
            <p><strong>Total Cards:</strong> ${numCards}</p>
            <p><strong>Reversed Cards:</strong> ${reversedCount} (${((reversedCount / numCards) * 100).toFixed(1)}%)</p>
            <p><strong>Major Arcana:</strong> ${majorArcanaCount}</p>
            <p><strong>Minor Arcana:</strong> ${minorArcanaCount}</p>
            <h4>Suit Distribution (Minor Arcana):</h4>
            <ul>
        `;
        Object.entries(suits).forEach(([suit, count]) => {
            if (count > 0) { // Only show suits that appear
                statsHTML += `<li>${suit}: ${count}</li>`;
            }
        });
         if (Object.values(suits).every(c => c === 0) && minorArcanaCount > 0) {
            statsHTML += '<li>No specific Minor Arcana suits present.</li>';
        }
        statsHTML += '</ul>';

        statsText.innerHTML = statsHTML;
        showTab('stats'); // Optionally switch to stats tab after calculation
    }

     // --- Tab Switching --- //
    function showTab(tabName) {
        if (tabName === 'interpretation') {
            interpretationArea.classList.remove('hidden');
            statsArea.classList.add('hidden');
            interpretationTabButton.classList.add('active');
            statsTabButton.classList.remove('active');
        } else if (tabName === 'stats') {
            interpretationArea.classList.add('hidden');
            statsArea.classList.remove('hidden');
            interpretationTabButton.classList.remove('active');
            statsTabButton.classList.add('active');
        }
    }

    // --- Scale Complex Spread Areas --- //
    function scaleSpreadArea() {
        if (!currentReading.spread || !currentReading.spread.layout_class) return;

        const wrapper = spreadArea.parentElement; // Assuming spreadArea is inside spread-area-wrapper
        const availableWidth = wrapper.offsetWidth - 40; // Subtract padding
        let requiredWidth = 0;

        if (currentReading.spread.layout_class === 'celtic-cross-layout') {
            requiredWidth = 650; // Approximate width needed for layout
        }
        if (currentReading.spread.layout_class === 'horseshoe-layout') {
             requiredWidth = 700; // Approximate width needed for layout
        }

        if (requiredWidth > 0 && availableWidth < requiredWidth) {
            const scale = availableWidth / requiredWidth;
            spreadArea.style.transform = `scale(${scale})`;
            // Adjust height if necessary - this can be tricky with absolute positioning
            const requiredHeight = spreadArea.offsetHeight * scale;
            // wrapper.style.minHeight = `${requiredHeight + 40}px`; // Adjust wrapper height
        } else {
            spreadArea.style.transform = 'scale(1)';
            // wrapper.style.minHeight = ''; // Reset wrapper height
        }
    }

    // Add resize listener to rescale spreads
    window.addEventListener('resize', scaleSpreadArea);

    // Initial setup
    showTab('interpretation'); // Start with interpretation tab
    resetButton.disabled = true;
    interpretationButton.disabled = true;
    spreadSelect.disabled = true;
    drawButton.disabled = true;

});
