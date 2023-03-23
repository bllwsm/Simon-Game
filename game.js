/*   created 3 arrays where 'gamePattern' stores the 
selected color from the next sequence function and 
'userClickedPattern' stores users input   */
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false; //this var turns to true once a key is pressed and start game
var level = 0; //we use this var to increment the levels

/* this keypress function changes the var 'started' to "true" once game has started.
The if statment only loops once*/
$(document).click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

/* on the click of any button, 'userCLickedPattern' array is updated and
 it also checks if the awnser is correct*/
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSounds(userChosenColour);
  animatePress(userChosenColour);
  checkAwnser(userClickedPattern.length - 1);
});

/*This function generates the game pattern by selecting a
random colour and pushing it to the 'gamePattern' array, 
it also increments the levels and resets the users clicked pattern aray to*/
function nextSequence() {
  userClickedPattern = []; //array set to empty to begin new level

  // The levels are incremented each time the function runs
  level++;
  $("#level-title").text("Level " + level);

  // Generates a random number from 0-4 and selects the relevant item from the array buttonsColor
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  /*Animation and sounds for this function */
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSounds(randomChosenColor);
}

// This Function checks the awnser by comparing the users clicked pattern with the game pattern
function checkAwnser(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

// This function restarts all values to the beginning and the game restarts
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//play sound function
function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Pressdown animation function
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
