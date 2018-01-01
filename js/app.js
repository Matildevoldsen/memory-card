var points = 0;
var attempts = 4;
var moves = 0;
var stars = 3;

var sec = 0;
let seconds;
let minutes;

let cardContainer = null;
let isRestarted = false;
let timer;

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

function replay() {
    $('.modal__overlay').addClass('hidden');
    $('.modal__overlay').hide();
    $('.modal').hide();
}

$(document).ready(function () {
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

    function redoShuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        reprintCards(array);
        return array;
    }

    function reprintCards(cards) {
        // $('#card-container').innerHTML = "";
        // console.log($('#card-container'));
        // cardContainer = $('#card-container');
        // for (card in cards) {
        //     let cardEl = $("<li class='card' id='" + card + "'><i class='fa " + cards[card] + "' </li>");
        //     // let cardEl = document.createElement("li");
        //     // cardEl.setAttribute('class', 'card');
        //     // cardEl.setAttribute('id', card);
        //     // let cardPicture = document.createElement("i");
        //     // cardPicture.setAttribute('class', 'fa ' + cards[card]);
        //     //
        //     // cardEl.appendChild(cardPicture);
        //
        //     cardContainer.append(cardEl);

        $('.deck').empty();
        $('.deck').innerHTML = "";

        let cardList = cards;
        cardList.forEach(createCard);
    }

    let index;

    function createCard(card, index) {
        let cardEl = $("<li class='card' id='" + index + "'><i class='fa " + card + "' </li>");
        $('.deck').append(cardEl);
        index++;
        $('.card').click(clickedCard);
    }

    function printCards(cards) {
        cardContainer = $('#card-container');
        for (card in cards) {
            let cardEl = $("<li class='card' id='" + card + "'><i class='fa " + cards[card] + "' </li>");
            // let cardEl = document.createElement("li");
            // cardEl.setAttribute('class', 'card');
            // cardEl.setAttribute('id', card);
            // let cardPicture = document.createElement("i");
            // cardPicture.setAttribute('class', 'fa ' + cards[card]);
            //
            // cardEl.appendChild(cardPicture);

            cardContainer.append(cardEl);
        }
    }

    shuffle(cards);

    $('.restart').on('click', function () {
        restart();
    });

    $('.replay').on('click', function () {
        $('#won').addClass('hidden');
        replay();
        restart();
    });

    function won() {
        $('#won').show();
        $('#won').css('display', 'flex');
        $('#won').css('display', '-webkit-flex');
        $('#winner-text').text("Congrats! You won the game. It took you: " + timer.data('seconds') + "s. You got " + stars + " stars.");

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

    function pad(val) {
        return val > 9 ? val : "0" + val;
    }

    let previousClicked;
    let click = 0;
    $('.card').click(clickedCard);

    function clickedCard() {
        console.log(this);
        //Click Functionality. It ensures only two cards open.
        ++click;

        $('.timer').empty();
        timer = $('.timer').timer();

        //To make sure it'll be resetted if no cards is matched.
        if (points === 0 && click === 2) {
            $('.card').removeClass('match');
        }

        //Opening the clicked card.
        $(this).addClass('match');

        //Setting the previous clicked card
        if (click == 1) {
            isRestarted = false;
            previousClicked = $(this);
        }


        if (click == 2) {
            //Reseting cards clicked
            click = 0;
            //Setting the current clicked card
            let clicked = this;
            //Setting the card object (bomb, leaf, e.t.c)
            let clickedObject = $(this).find('i').attr('class');
            //Setting the previous clicked card object.
            let previousClickedObject = previousClicked.find('i').attr('class');
            //Checking if clickedObject equals previousClickedObject. If true it'll be a match.
            if (isRestarted === true) {
                clicked = this;
                clickedObject = $(this).find('i').attr('class');
            }

            if (clickedObject === previousClickedObject && clicked.id !== previousClicked.prop("id")) {
                //Update moves.
                updateMoves();
                points++;

                if (points === 8) {
                    won();
                    $('.timer').timer('pause');
                }
            } else if (clicked.id !== previousClicked.prop("id")) {
                //Update moves.
                updateMoves();
                //Ensuring the cards will appear for a short while, afterwards disappear
                closeCards(clicked);

                //Removing one star after several attempts.
                if (moves === 4) {
                    removeStar();
                } else if (moves === 7) {
                    removeStar();
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
            }
        }
    }

    function restart() {
        $('.timer').timer('remove');

        click = 0;
        seconds = 0;
        minutes = 0;
        isRestarted = true;

        cardContainer = null;

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

        cardContainer = null;

        redoShuffle(cards);
    }
});