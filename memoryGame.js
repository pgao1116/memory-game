const gameContainer = document.querySelector(".gameBoard");
const resetBtn = document.querySelector("#reset"); 
const startbtn = document.querySelector("#start");  
const timer = document.querySelector("#timer");

let start = false;
const clickedCards = [];
let time = 0;
let interval;
const win = [];

//start button's event listener
startbtn.addEventListener("click", function(e) {
  e.preventDefault();
  start = true;
  interval = setInterval(function() {
    time++;
    timer.innerText = time;
    if (time === 60) {
      clearInterval(interval);
      alert("You lose!");
      location.reload();
    }
    if (win.length === 16) {
      clearInterval(interval);
      alert("You win!");
      location.reload();
    }
  }, 1000);
});

resetBtn.addEventListener("click", function() {
  location.reload();
});

const COLORS = [
  "red",
  "blue",
  "green",
  "pink",
  "orange",
  "teal",
  "purple",
  "black",
  "red",
  "blue",
  "green",
  "orange",
  "pink",
  "teal",
  "purple",
  "black",

];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.id = "game";

    // call a function handleCardClick when a div is clicked on
    newDiv.style.backgroundColor = "white";
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.appendChild(newDiv); 
  }
}

function handleCardClick(event) {
  //if the first card is clicked, push it into the array
  if (clickedCards.length === 0) {
    event.target.style.backgroundColor = event.target.classList[0];
    clickedCards.push(event.target);
  } 
  else if (clickedCards.length === 1) {
    event.target.style.backgroundColor = event.target.classList[0];
    clickedCards.push(event.target);
    //if the two cards clicked are the same, they will stay flipped
      if (clickedCards[0].classList[0] === clickedCards[1].classList[0]) {
      setTimeout(function() {
        clickedCards.length = 0;
      }, 750);  
      clickedCards[0].removeEventListener("click", handleCardClick);
      clickedCards[0].classList.add("flipped");
      clickedCards[1].removeEventListener("click", handleCardClick);
      clickedCards[1].classList.add("flipped");
      win.push(clickedCards[0]);
      win.push(clickedCards[1]);
    }
      else {
      //if the two cards clicked are different, they will flip back
      setTimeout(function() {
        clickedCards[0].style.backgroundColor = "white";
        clickedCards[1].style.backgroundColor = "white";
        clickedCards.length = 0;
      }, 750);
    }
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);
