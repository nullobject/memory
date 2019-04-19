import { append, copy, set, values } from 'fkit'

import { isMatchingPair, isPair } from './utils'

// Disables the given cards in the cards map.
function disableCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    set(card.id, card.disable(), cardsMap)
  , cardsMap)
}

// Removes the given cards in the cards map.
function removeCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    set(card.id, card.remove(), cardsMap)
  , cardsMap)
}

export default class Game {
  constructor (cards) {
    // A map from card IDs to cards.
    this.cardsMap = cards.reduce((cardsMap, card) =>
      set(card.id, card, cardsMap)
    , {})

    // The list of selected cards.
    this.selectedCards = []

    // The number of guesses the player has made.
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
      cardsMap = disableCards(selectedCards, cardsMap)
    }

    // Increment the number of guesses.
    const guesses = this.guesses + (isPair(selectedCards) ? 1 : 0)

    return copy(this, { cardsMap, selectedCards, guesses })
  }

  endTurn () {
    let cardsMap = this.cardsMap

    // Remove the selected cards.
    if (isMatchingPair(this.selectedCards)) {
      cardsMap = removeCards(this.selectedCards, cardsMap)
    }

    // Deselect all cards.
    return copy(this, { cardsMap, selectedCards: [] })
  }
}
