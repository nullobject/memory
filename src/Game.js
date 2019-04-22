import { copy, get, set, values } from 'fkit'

import { isMatchingPair, isPair } from './utils'

// Disables the given cards in the cards map.
function disableCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    set(card.id, card.disable(), cardsMap)
  , cardsMap)
}

// Deselects the given cards in the cards map.
function deselectCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    set(card.id, card.deselect(), cardsMap)
  , cardsMap)
}

// Selects the given cards in the cards map.
function selectCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    set(card.id, card.select(), cardsMap)
  , cardsMap)
}

// Removes the given cards in the cards map.
function removeCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    set(card.id, card.remove(), cardsMap)
  , cardsMap)
}

export default class Game {
  get cards () {
    return values(this.cardsMap)
  }

  get selectedCards () {
    return this.cards.filter(get('selected'))
  }

  constructor (cards) {
    // A map from card IDs to cards.
    this.cardsMap = cards.reduce((cardsMap, card) =>
      set(card.id, card, cardsMap)
    , {})

    // The number of guesses the player has made.
    this.guesses = 0
  }

  selectCard (cardId) {
    let cardsMap = this.cardsMap
    const selectedCards = this.selectedCards
    const card = cardsMap[cardId]

    // Ensure the card is not already selected.
    if (cardsMap[cardId].selected) return this

    // Ensure that we can only select a single pair of cards.
    if (isPair(selectedCards)) return this

    // Select the card.
    cardsMap = selectCards([card], cardsMap)

    // Disable matching pairs.
    if (isMatchingPair(selectedCards)) {
      cardsMap = disableCards(selectedCards, cardsMap)
    }

    // Increment the number of guesses.
    const guesses = this.guesses + (isPair(selectedCards) ? 1 : 0)

    return copy(this, { cardsMap, guesses })
  }

  endTurn () {
    let cardsMap = this.cardsMap
    const selectedCards = this.selectedCards

    // Deselect all cards.
    cardsMap = deselectCards(selectedCards, cardsMap)

    // Remove the selected cards.
    if (isMatchingPair(selectedCards)) {
      cardsMap = removeCards(selectedCards, cardsMap)
    }

    return copy(this, { cardsMap })
  }
}
