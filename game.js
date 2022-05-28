const colors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    level = level + 1;
    var randomSequence = Math.floor(Math.random() * 4);
    randomSelectedColor = colors[randomSequence];
    gamePattern.push(randomSelectedColor);

    $('#' + randomSelectedColor).fadeTo(300, 0.1).fadeTo(300, 1.0);

    playSound(randomSelectedColor);
    $('#level-title').text('Level ' + level);
}

$(".btn").click(function () {
    if (level === 0)
        return;

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animateButtonPress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    return audio.play();
}

function animateButtonPress(currentColor) {
    $('#' + currentColor).addClass('pressed');

    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 150);
}

function checkAnswer(answerIndex) {
    if (!(userClickedPattern[answerIndex] === gamePattern[answerIndex]))
        startOver();

    if (answerIndex + 1 === level) {
        userClickedPattern = [];
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}

function startOver() {
    $('body').addClass('game-over');

    setTimeout(function () {
        $('body').removeClass('game-over');
    }, 350);

    $('#level-title').text('Game Over, your score was: ' + level + ', click to play again.');
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

    var audio = new Audio('sounds/wrong.mp3');
    return audio.play();
}

$('#level-title').click(function () {
    if (level === 0) {
        $('#level-title').text('Level ' + level);
        nextSequence();
    }
});