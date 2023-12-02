let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function (event) {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  let randomNumber = Math.round(Math.random() * 4);
  let chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor);
  $("#" + chosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  let audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
  animatePress(chosenColor);
}

function checkAnswer(currlvl) {
  if (userClickedPattern[currlvl] === gamePattern[currlvl]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  }else{
    $("#level-title").text("GAME OVER, PRESS ANY KEY RESTART");
     $("body").addClass("game-over")
     setTimeout(function(){
        $("body").removeClass("game-over")
        playSound('wrong');
     },200)
    startOver()
  }
}

function startOver(){
    level=0;
    started= false
    gamePattern=[];
}