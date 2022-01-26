const generateDeckBtn = document.querySelector('.generate-deck-btn')
const drawCardsBtn = document.querySelector('.draw-cards-btn')
const cardDisplay = document.querySelector('.card-holder')
const cardDisplay1 = document.querySelector('.card-1')
const cardDisplay2 = document.querySelector('.card-2')
const humanScore = document.querySelector('.human-score')
const computerScore = document.querySelector('.computer-score')
const cardsRemaining = document.querySelector('.cards-remaining')
const title = document.querySelector('.title')
let deckId = ''
let humanSc = 0
let computerSc = 0
let remaining = 0

function generateDeck() {
    drawCardsBtn.addEventListener('click', drawCards)
    title.textContent = "Simplified War Game"
    cardDisplay1.innerHTML = ''
    cardDisplay2.innerHTML = ''
    humanScore.innerHTML = ''
    computerScore.innerHTML = ''
    humanSc = 0
    computerSc = 0
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remaining = data.remaining
            cardsRemaining.textContent = data.remaining
        })

}

function drawCards() {
    if (deckId) {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(data => {
                cardsRemaining.textContent = data.remaining
                remaining = data.remaining
                cardDisplay1.innerHTML = `<img src="${data.cards[0].image}">`
                cardDisplay2.innerHTML = `<img src="${data.cards[1].image}">`
                checkWinner(data.cards[0], data.cards[1])
            })
    } else {
        alert('Please draw a deck first!')
    }
}

generateDeckBtn.addEventListener('click', generateDeck)
drawCardsBtn.addEventListener('click', drawCards)

function checkWinner(card1, card2) {
    switch (card1.value) {
        case 'JACK':
            card1.value = 11
            break;
        case 'QUEEN':
            card1.value = 12
            break;
        case 'KING':
            card1.value = 13
            break;
        case 'ACE':
            card1.value = 14
            break;
        default:
            card1.value = Number(card1.value)
            break;
    }

    switch (card2.value) {
        case 'JACK':
            card2.value = 11
            break;
        case 'QUEEN':
            card2.value = 12
            break;
        case 'KING':
            card2.value = 13
            break;
        case 'ACE':
            card2.value = 14
            break;
        default:
            card2.value = Number(card2.value)
            break;
    }

    if (card1.value > card2.value) {
        computerSc += 1
    } else if (card1.value < card2.value) {
        humanSc += 1
    }

    humanScore.textContent = humanSc
    computerScore.textContent = computerSc
    if (remaining !== 0) {
        cardsRemaining.textContent = remaining
    } else {
        if (humanSc > computerSc) {
            cardsRemaining.textContent = '0'
            remaining = 0
            drawCardsBtn.removeEventListener('click', drawCards)
            title.textContent = 'Human Wins'
        } else if (humanSc < computerSc) {
            cardsRemaining.textContent = '0'
            remaining = 0
            drawCardsBtn.removeEventListener('click', drawCards)
            title.textContent = 'Computer Wins'
        } else {
            cardsRemaining.textContent = '0'
            remaining = 0
            drawCardsBtn.removeEventListener('click', drawCards)
            title.textContent = "It's a tie!"
        }
    }
}