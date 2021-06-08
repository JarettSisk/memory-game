const gameContainer = document.getElementById("game");
let scoreEl = document.querySelector("#score");
const timerEl = document.querySelector("#timer");
const startGameButton = document.querySelector("#start-button");
const greatJobEl = document.querySelector("#great-job");
let difficulty = 3;
let gameOver = false;
let colors = [];
greatJobEl.style.display = "none"



// we need the buttons so we can loop over them
let difficultyButtons = document.querySelectorAll(".difficulty-button");
// set easy to be the initial state
difficultyButtons[0].style.backgroundColor = "lightgreen";

// Use event deligation to check for button clicks
document.querySelector("#difficulty-section").addEventListener("click", function(e) {
  for(button of difficultyButtons) {
    // check to see which button is clicked, and change the state.
    if (e.target.innerText === button.innerText) {
      difficulty = parseInt(e.target.dataset.difficulty);
      e.target.style.backgroundColor = "lightgreen";
    } else {
      button.style.backgroundColor = "";
    }
  }
});

// Generate array of new random colors
function generateColors() {
  for(let i = 0; i < difficulty; i++) {
    let newColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    colors.push(newColor);
    colors.push(newColor);
  }
};

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.dataset.color = color;
    // to give each card its own ID
    newDiv.dataset.id = Math.random();

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let tempCards = [];
let score = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  
  let card = event.target  
  // If you still have available clicks and card has not already been flipped

  if (card.dataset.color !== card.style.backgroundColor && gameOver === false && tempCards.length < 2) {
    // Change card to be "face up"
    card.style.backgroundColor = card.dataset.color;
    // Add card to temp array
    tempCards.push({color: card.dataset.color, id: card.dataset.id})
    
  }

  
    if (tempCards.length === 2) {
      // this ensures this statement does not run more that once.
      tempCards[3] = "hack";

      setTimeout(function() {
        // If both card colors match and the ids are not the same
        if (tempCards[0].color === tempCards[1].color) {
          // We could ad a score increment here
          score++;
          scoreEl.innerText = score;
          tempCards = [];
        } else {
          // we turn the cards back to "face down"
          document.querySelector(`div[data-id="${tempCards[0].id}"`).style.backgroundColor = "";
          document.querySelector(`div[data-id="${tempCards[1].id}"`).style.backgroundColor = "";
          // reset the array
          tempCards = [];
        }
      }, 400);
      
    }
    
}

// Start the game
startGameButton.addEventListener("click", function() {
  // Reset the game vars
  resetGameboard();
  // generate random colors
  generateColors();
  let shuffledColors = shuffle(colors);
  createDivsForColors(shuffledColors);

  // timer / endgame
  let timer = 30;
  timerEl.innerText = timer;

  let timeInterval = setInterval(function() {
    timer--;
    timerEl.innerText = timer;
    if (timer <= 0 || score === difficulty) {
      greatJobEl.style.display = "inline";
      gameOver = true;
      clearInterval(timeInterval);
      startGameButton.style.display = "inline-block";
    }

  }, 1000);

});

// Reset all the stats / vars
function resetGameboard() {
  greatJobEl.style.display = "none"
  gameContainer.innerHTML = "";
  startGameButton.style.display = "none";
  gameOver = false;
  colors = [];
  maxClicks = 2;
  currentClicks = 0;
  tempCards = [];
  score = 0;
  scoreEl.innerText = 0;
}
  




