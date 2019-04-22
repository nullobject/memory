import { copy, get, head, set, values } from 'fkit'

import { isMatchingPair } from './utils'

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

  /**
   * Selects the card with the given ID.
   *
   * @param {Number} cardId The card ID.
   * @returns {Game} The new game state.
   */
  selectCard (cardId) {
    let cardsMap = this.cardsMap
    let guesses = this.guesses
    const selectedCards = this.selectedCards
    const card = cardsMap[cardId]

    // Ensure the card is not already selected.
    if (cardsMap[cardId].selected) return this

    // Ensure that we can only select a single pair of cards.
    if (selectedCards.length >= 2) return this

    // Select the card.
    cardsMap = selectCards([card], cardsMap)

    if (selectedCards.length === 1) {
      const pair = [head(selectedCards), card]

      // Disable matching pairs.
      if (isMatchingPair(pair)) {
        cardsMap = disableCards(pair, cardsMap)
      }

      // Increment guesses.
      guesses++
    }

    return copy(this, { cardsMap, guesses })
  }

  /**
   * Ends the current turn. This will deselect the selected cards and remove any
   * matching pairs from the board.
   *
   * @returns {Game} The new game state.
   */
  endTurn () {
    let cardsMap = this.cardsMap
    const selectedCards = this.selectedCards

    // Deselect selected cards.
    cardsMap = deselectCards(selectedCards, cardsMap)

    // Remove matching pairs.
    if (isMatchingPair(selectedCards)) {
      cardsMap = removeCards(selectedCards, cardsMap)
    }

    return copy(this, { cardsMap })
  }
}
