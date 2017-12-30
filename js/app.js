var points = 0;
var attempts = 4;
var moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

var previousClicked;
var click = 0;
$('.card').on('click', function () {
    ++click;

    $(this).addClass('match');

    if (click == 1) {
        previousClicked = $(this);
    }

    if (click == 2) {
        click = 0;
        var clicked = this;
        var clickedObject = $(this).find('i').attr('class');

        var previousClickedObject = previousClicked.find('i').attr('class');
        if (clickedObject === previousClickedObject) {
            points++;
            console.log("Match");
        } else {
            setTimeout(function () {
                $(previousClicked).removeClass('match');
                $(clicked).removeClass('match');
            }, 1000);

            if (moves === 4) {
                removeStar();
            } else if (moves === 7) {
                removeStar();
            } else if (moves === 10) {
                removeStar();
            }
            updateMoves();
        }
    }
});

function updateMoves() {
    moves++;
    $('.moves').text(moves);
}

function removeStar() {
    attempts--;
    $("#star-" + attempts).removeClass("fa-star");
    $("#star-" + attempts).addClass("fa-star-o");
}

function restart() {
    click = 0;
    previousClicked = null;

    reshuffle();
}

function reshuffle() {
    cardContainer.innerHTML = "";
    shuffle(cards);
}

$('.restart').on('click', function () {
    restart();
})
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
