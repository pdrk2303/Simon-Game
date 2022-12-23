
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var hasGameStarted = false;
 
$(document).keypress( function (event) {
    console.log(event.key);
    if (hasGameStarted === false) {

        hasGameStarted = true;
        $("#level-title").text("Level +"+level);
        nextSequence();
    }
})


$(".btn").click( function(event) {

    // var userChosenColour = event.target.id; 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {

    level++; 
    $("#level-title").text("Level "+level);

    userClickedPattern = [];    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    }, 100);

    // $("#"+currentColour).addClass("pressed").delay(100).removeClass("pressed");
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        
    } else {
        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    hasGameStarted = false;
}
