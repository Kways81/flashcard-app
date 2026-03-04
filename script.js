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