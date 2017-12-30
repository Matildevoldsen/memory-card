var points = 0;
var attempts = 4;
var moves = 0;
var stars = 3;

var sec = 0;
var seconds;
var minutes;

var startTimerVar;

const cardContainer = document.getElementById("card-container");

var cards = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa fa-cube',
    'fa-bicycle',
    'fa-leaf',
    'fa-bomb',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa fa-cube',
    'fa-bicycle',
    'fa-leaf',
    'fa-bomb',
];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }


    printCards(array);
    return array;
}

function printCards(cards) {
    for (card in cards) {
        var cardEl = document.createElement("li");
        cardEl.setAttribute('class', 'card');
        cardEl.setAttribute('id', card);
        cardPicture = document.createElement("i");
        cardPicture.setAttribute('class', 'fa ' + cards[card]);

        cardEl.appendChild(cardPicture);

        cardContainer.appendChild(cardEl);
    }
}

shuffle(cards);

$('.restart').on('click', function () {
    restart();
});

$('.replay').on('click', function () {
    $('#won').addClass('hidden');
    restart();
});

function restart() {
    click = 0;
    seconds = 0;
    minutes = 0;
    clearInterval(startTimerVar);
    $('.minutes').innerHTML = "";
    $('.seconds').innerHTML = "";
    attempts = 4;
    moves = 0;
    $('.moves').text("0");
    $("#star-1").removeClass('fa-star-o');
    $("#star-2").removeClass('fa-star-o');
    $("#star-3").removeClass('fa-star-o');
    $("#star-1").addClass('fa-star');
    $("#star-2").addClass('fa-star');
    $("#star-3").addClass('fa-star');
    previousClicked = null;

    reshuffle();
}

function reshuffle() {
    cardContainer.innerHTML = "";
    shuffle(cards);
}

var previousClicked;
var click = 0;
$('.card').on('click', function () {
    //Click Functionality. It ensures only two cards open.
    ++click;

    starTimer();

    //To make sure it'll be resetted if no cards is matched.
    if (points === 0 && clicked === 2) {
        $('.card').removeClass('match');
    }

    //Opening the clicked card.
    $(this).addClass('match');

    //Setting the previous clicked card
    if (click == 1) {
        previousClicked = $(this);
    }

    if (click == 2) {
        //Reseting cards clicked
        click = 0;
        //Setting the current clicked card
        var clicked = this;
        //Setting the card object (bomb, leaf, e.t.c)
        var clickedObject = $(this).find('i').attr('class');
        //Setting the previous clicked card object.
        var previousClickedObject = previousClicked.find('i').attr('class');
        //Checking if clickedObject equals previousClickedObject. If true it'll be a match.
        console.log(clicked.id);
        console.log(previousClicked.prop("id"));
        if (clickedObject === previousClickedObject && clicked.id !== previousClicked.prop("id")) {
            points++;

            if (points === 8) {
                won();
            }
        } else {
            //Ensuring the cards will appear for a short while, afterwards disappear
            closeCards(clicked);

            //Removing one star after several attempts.
            if (moves === 4) {
                removeStar();
            } else if (moves === 7) {
                removeStar();
            }
            //Update moves.
            updateMoves();
        }
    }
});

function won() {
    $('#won').show();
    $('#won').css('display', 'flex');
    $('#won').css('display', '-webkit-flex');
    $('#winner-text').text("Congrats! You won the game. It took you: " + minutes + "m " + seconds + "s. You got " + stars + " stars.");

}

function closeCards(clicked) {
    setTimeout(function () {
        $(previousClicked).removeClass('match');
        $(clicked).removeClass('match');
    }, 1000);
}

function updateMoves() {
    moves++;
    $('.moves').text(moves);
}

function removeStar() {
    attempts--;
    stars--;
    $("#star-" + attempts).removeClass("fa-star");
    $("#star-" + attempts).addClass("fa-star-o");
}

function starTimer() {
    startTimerVar = setInterval(function () {
        seconds = pad(++sec % 60);
        minutes = pad(parseInt(sec / 60, 10));
        $(".seconds").html(seconds);
        $(".minutes").html(minutes);
    }, 1000);
}

function pad(val) {
    return val > 9 ? val : "0" + val;
}