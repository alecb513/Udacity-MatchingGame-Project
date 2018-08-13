let cardsArray = [' fa fa-anchor', ' fa fa-anchor',
    ' fa fa-bicycle', ' fa fa-bicycle',
    ' fa fa-bolt', ' fa fa-bolt',
    ' fa fa-bomb', ' fa fa-bomb',
    ' fa fa-cube', ' fa fa-cube',
    ' fa fa-diamond', ' fa fa-diamond',
    ' fa fa-leaf', ' fa fa-leaf',
    ' fa fa-paper-plane-o', ' fa fa-paper-plane-o'];

let newCardsArray = [];
let timesClicked = [];
let moves = 1;
let score = 0;
let starCounter = 0;
let starDisplay = 3
let timer;

let hours = 0;
let minutes = 0;
let seconds = 0;

let card = document.querySelectorAll('.deck li');
let cardChild = document.querySelectorAll('.deck li i');
let stars = document.querySelectorAll('.stars li i');
let modal = document.querySelector('modal');
let moveCounter = document.querySelector('.moves');
let deck = document.querySelector('.deck');

function startGame() {
    startTime();
    shuffle(cardsArray);
    assignCard();
    deck.removeEventListener('click', startGame, true);
}

deck.addEventListener('click', startGame, true);

//Modal
function gameOver() {

    modal.classList.add('modalClass');
    modal.style.display = 'flex';
    document.querySelector('.starScore').innerHTML = starDisplay + ' Stars!';
    document.querySelector('.finishTime').innerHTML = 'Finish Time: ' + hours + minutes + ':' + seconds;

}
//shuffle
function shuffle(cardsArray) {
    var currentIndex = cardsArray.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardsArray[currentIndex];
        cardsArray[currentIndex] = cardsArray[randomIndex];
        cardsArray[randomIndex] = temporaryValue;
    }
    return cardsArray;
}

function assignCard() {
    for (i = 0; i < cardChild.length; i++) {
        cardChild[i].className = cardsArray.pop();
        newCardsArray.push(cardChild[i]);
    }
}
//When Card is clicked...
function cardClick(picked) {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('tempNoClick');
    let cardPicked = this.children[0].classList.value;
    timesClicked.push(cardPicked);

    if (timesClicked.length % 2) {
        countMoves();
    }

    //Matches
    if (timesClicked[0] === timesClicked[1]) {

        score += 1;
        moves += 1;

        if (score == 8) {
            gameOver();
            stopTime();
        }

        for (i = 0; i < timesClicked.length; i++) {
            if (timesClicked[0] === timesClicked[1]) {
                for (i = 0; i < card.length; i++) {
                    if (card[i].classList.contains('open')) {
                        card[i].classList.add('match');
                        timesClicked = [];
                    }
                }
            }
        }
    }
    //Does not Match
    if (timesClicked.length > 2) {

        moves += 1;
        timesClicked = [];

        for (i = 0; i < card.length; i++) {
            if (card[i].classList.contains('open')) {
                card[i].classList.remove('open');
                card[i].classList.remove('show');
                card[i].classList.remove('tempNoClick')
            }
        }
        if (moves != 1 && moves % 2) {
            removeStars();
        }
    }
}
//Makes Cards Clickable
for (var i = 0; i < cardChild.length; i++) {
    card[i].addEventListener('click', cardClick);
}

///Make Time
function startTime() {

    timer = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        second.innerHTML = formatTime();
    }, 1000);

    function formatTime() {
        let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
        let min = seconds > 9 ? String(minutes) : '0' + String(minutes);

        return min + ':' + sec;
    }
}

//Reload Page
document.querySelector('.restart').addEventListener('click', function () {
    location.reload();
});

//Removes Stars
function removeStars() {
    for (i = 0; i < stars.length; i++) {
        stars[starCounter].classList.remove('fa', 'fa-star');
    }
    starCounter += 1;
    starDisplay -= 1;
}

function countMoves() {
    moveCounter.innerHTML = moves;
}
function stopTime() {
    clearInterval(timer);
}