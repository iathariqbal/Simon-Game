var colorSequence = [];
var clickEnabled = true;
var level = 0;
var currentElement = 0;
var gameOver = false;

function gameStart() {
  currentElement = 0;
  level++;
  $("h1").text("Level " + level);
  var random = Math.floor(Math.random() * 4);
  clickEnabled = false;
  
  switch (random) {
    case 0:
      colorSequence.push("blue");
      animateButtons("blue");
      addSound("blue");
      break;
    case 1:
      colorSequence.push("green");
      animateButtons("green");
      addSound("green");
      break;
    case 2:
      colorSequence.push("red");
      animateButtons("red");
      addSound("red");
      break;
    case 3:
      colorSequence.push("yellow");
      animateButtons("yellow");
      addSound("yellow");
      break;
  }
}
function addSound(btn) {
  var audio = new Audio("sounds/" + btn + ".mp3");
  audio.play();
}
$("body").keydown(function() {
  if (clickEnabled === true) { 
    gameStart();
  }
  if (gameOver === true) {
    colorSequence = [];
    clickEnabled = true;
    level = 0;
    currentElement = 0;
    gameOver = false;
    $("h1").text("Press A Key to Start");
    console.log(colorSequence);
  }
});
$(".btn").click(function(event) {

  if (this.id !== colorSequence[currentElement]) {
    addSound("wrong");
    clickEnabled = false;
    gameOver = true;
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press any key to restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100)
  } else if (this.id === colorSequence[currentElement]) {
    addSound(this.id);
    animateButtons(this.id);
    currentElement++;
    if (colorSequence.length === currentElement) {
      setTimeout(function() {
        gameStart(); //new level starts
      }, 1000);

    }
  }
});

function animateButtons(color) {
  $("." + color).addClass("pressed");

  setTimeout(function() {
    $("." + color).removeClass("pressed");
  }, 100)
}
