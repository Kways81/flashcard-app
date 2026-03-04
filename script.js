// Grab all three screens
const homeScreen = document.getElementById('home-screen');
const studyScreen = document.getElementById('study-screen');
const addScreen = document.getElementById('add-screen');

// Function to show one screen and hide the others
function showScreen(screen) {
  homeScreen.hidden = true;
  studyScreen.hidden = true;
  addScreen.hidden = true;
  screen.hidden = false;
}

// Flip card elements
const flipBtn = document.getElementById('flip-btn');
const cardLabel = document.getElementById('card-label');
const cardText = document.getElementById('card-text');

let isFlipped = false;

// Reset the card back to question side
function resetCard() {
  cardLabel.textContent = 'Question';
  cardText.textContent = 'What is a variable?';
  flipBtn.hidden = false;
  isFlipped = false;

  // Remove got it / missed it buttons if they exist
  const gotItBtn = document.getElementById('got-it-btn');
  const missedItBtn = document.getElementById('missed-it-btn');
  if (gotItBtn) gotItBtn.remove();
  if (missedItBtn) missedItBtn.remove();
}

// When any deck button is clicked, go to study screen
const deckButtons = document.querySelectorAll('.deck-btn');
deckButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
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
    cardText.textContent = 'A variable is a container for storing data values';
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