import { append, copy, set, values } from 'fkit'

// Returns `true` if the length of the given array is two, `false` otherwise.
function isPair (cards) {
  return cards.length === 2
}

function isMatchingPair (cards) {
  if (isPair(cards)) {
    const [a, b] = cards
    return a.equals(b)
  } else {
    return false
  }
}

// Disables each card from the set of selected cards.
function disableCards (cardsMap, selectedCards) {
  return selectedCards.reduce((cardsMap, card) =>
    set(card.id, card.disable(), cardsMap)
  , cardsMap)
}

export default class Game {
  constructor (cards) {
    this.cardsMap = cards.reduce((cardsMap, card) =>
      set(card.id, card, cardsMap)
    , {})
    this.selectedCards = []
    this.guesses = 0
  }

  get cards () {
    return values(this.cardsMap)
  }

  selectCard (card) {
    // Ensure the card is not already selected.
    if (this.selectedCards.includes(card)) {
      return this
    }

    // Ensure that we can only select a pair of cards.
    if (isPair(this.selectedCards)) {
      return this
    }

    let cardsMap = this.cardsMap

    // Select the card.
    const selectedCards = append(card, this.selectedCards)

    if (isMatchingPair(selectedCards)) {
      cardsMap = disableCards(cardsMap, selectedCards)
    }

    // Increment the number of guesses.
    const guesses = this.guesses + (isPair(selectedCards) ? 1 : 0)

    return copy(this, { cardsMap, selectedCards, guesses })
  }

  deselectAllCards () {
    return copy(this, { selectedCards: [] })
  }
}
