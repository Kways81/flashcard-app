// Our card data
const decks = {
  JavaScript: [
    { question: 'What is a variable?', answer: 'A container for storing data values' },
    { question: 'What does typeof do?', answer: 'Returns the data type of a value' },
  ],
  CSS: [
    { question: 'What does flexbox do?', answer: 'It arranges elements in a row or column' },
  ],
  HTML: [
    { question: 'What is a div?', answer: 'A block level container element' },
  ]
};

let currentDeck = [];
let currentCardIndex = 0;

// Grab all three screens
const homeScreen = document.getElementById('home-screen');
const studyScreen = document.getElementById('study-screen');
const addScreen = document.getElementById('add-screen');

// Flip card elements
const flipBtn = document.getElementById('flip-btn');
const cardLabel = document.getElementById('card-label');
const cardText = document.getElementById('card-text');

let isFlipped = false;

// Function to show one screen and hide the others
function showScreen(screen) {
  homeScreen.hidden = true;
  studyScreen.hidden = true;
  addScreen.hidden = true;
  screen.hidden = false;
}

// Reset the card back to question side
function resetCard() {
  cardLabel.textContent = 'Question';
  cardText.textContent = currentDeck[currentCardIndex].question;
  flipBtn.hidden = false;
  isFlipped = false;

  const gotItBtn = document.getElementById('got-it-btn');
  const missedItBtn = document.getElementById('missed-it-btn');
  if (gotItBtn) gotItBtn.remove();
  if (missedItBtn) missedItBtn.remove();

  // Update counter
  document.getElementById('card-counter').textContent = 'Card ' + (currentCardIndex + 1) + ' / ' + currentDeck.length;
}

// When any deck button is clicked, go to study screen
const deckButtons = document.querySelectorAll('.deck-btn');
deckButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const deckName = btn.querySelector('span').textContent;
    currentDeck = decks[deckName];
    currentCardIndex = 0;

    resetCard();
    showScreen(studyScreen);
  });
});

// When add card button is clicked, go to add screen
document.getElementById('add-card-btn').addEventListener('click', function() {
  showScreen(addScreen);
});

// When back button is clicked, go home
document.getElementById('back-btn').addEventListener('click', function() {
  showScreen(homeScreen);
});

// When add screen back button is clicked, go home
document.getElementById('add-back-btn').addEventListener('click', function() {
  showScreen(homeScreen);
});

// Flip card logic
flipBtn.addEventListener('click', function() {
  if (isFlipped === false) {
    cardLabel.textContent = 'Answer';
    cardText.textContent = currentDeck[currentCardIndex].answer;
    flipBtn.hidden = true;

    const gotItBtn = document.createElement('button');
    gotItBtn.textContent = 'Got it ✅';
    gotItBtn.id = 'got-it-btn';

    const missedItBtn = document.createElement('button');
    missedItBtn.textContent = 'Missed it ❌';
    missedItBtn.id = 'missed-it-btn';

    document.getElementById('study-screen').appendChild(gotItBtn);
    document.getElementById('study-screen').appendChild(missedItBtn);

    isFlipped = true;
  }
});

// Got it / Missed it logic
let score = 0;

document.getElementById('study-screen').addEventListener('click', function(e) {
  if (e.target.id === 'got-it-btn') {
    score++;
    nextCard();
  } else if (e.target.id === 'missed-it-btn') {
    nextCard();
  }
});

function nextCard() {
  currentCardIndex++;

  if (currentCardIndex >= currentDeck.length) {
    // All cards done - show results
    cardLabel.textContent = 'Done! 🎉';
    cardText.textContent = 'You got ' + score + ' out of ' + currentDeck.length + ' correct!';
    flipBtn.hidden = true;

    const gotItBtn = document.getElementById('got-it-btn');
    const missedItBtn = document.getElementById('missed-it-btn');
    if (gotItBtn) gotItBtn.remove();
    if (missedItBtn) missedItBtn.remove();

    // Add a go home button
    const homeBtn = document.createElement('button');
    homeBtn.textContent = 'Back to Home';
    homeBtn.id = 'home-btn';
    document.getElementById('study-screen').appendChild(homeBtn);

    score = 0;
  } else {
    resetCard();
  }
}

// Home button after finishing
document.getElementById('study-screen').addEventListener('click', function(e) {
  if (e.target.id === 'home-btn') {
    showScreen(homeScreen);
  }
});

// Save card logic
document.getElementById('save-btn').addEventListener('click', function() {
  const deckName = document.getElementById('deck-select').value;
  const question = document.getElementById('question-input').value;
  const answer = document.getElementById('answer-input').value;

  // Check fields are not empty
  if (question === '' || answer === '') {
    alert('Please fill in both the question and answer!');
    return;
  }

  // Add the new card to the deck
  decks[deckName].push({ question: question, answer: answer });

  // Clear the form
  document.getElementById('question-input').value = '';
  document.getElementById('answer-input').value = '';

  // Go back home
  showScreen(homeScreen);

  alert('Card added to ' + deckName + '!');
});