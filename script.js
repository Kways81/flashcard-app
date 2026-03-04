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

// When any deck button is clicked, go to study screen
const deckButtons = document.querySelectorAll('.deck-btn');
deckButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
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
const flipBtn = document.getElementById('flip-btn');
const cardLabel = document.getElementById('card-label');
const cardText = document.getElementById('card-text');

let isFlipped = false;

flipBtn.addEventListener('click', function() {
  if (isFlipped === false) {
    // Show the answer
    cardLabel.textContent = 'Answer';
    cardText.textContent = 'A variable is a container for storing data values';
    flipBtn.textContent = '';

    // Replace flip button with got it / missed it buttons
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