import { applyMethod, copy, set, update, values } from 'fkit'

import { isMatchingPair } from './utils'

/**
 * Applies the given method on the cards in the cards map.
 *
 * @param {String} method The method name.
 * @param {Array} cards The list of cards.
 * @param {Object} cardsMap The cards map.
 * @returns {Object} The new cards map.
 * @private
 */
function updateCards (method, cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    update(card.id, applyMethod(method, null), cardsMap)
  , cardsMap)
}

export default class Game {
  get cards () {
    return values(this.cardsMap)
  }

  get selectedCards () {
    return this.cards.filter(card => card.state === 'selected')
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
   * @param {Number} id The card ID.
   * @returns {Game} The new game state.
   */
  selectCard (id) {
    let cardsMap = this.cardsMap
    let guesses = this.guesses
    const card = cardsMap[id]
    const selectedCards = this.selectedCards

    // Ensure the card is able to be selected.
    if (card.state !== 'normal') return this

    // Ensure that we can only select a single pair of cards.
    if (selectedCards.length >= 2) return this

    // Select the card.
    cardsMap = updateCards('select', [card], cardsMap)

    // Increment guesses.
    if (selectedCards.length >= 1) {
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

    if (isMatchingPair(selectedCards)) {
      // Remove matching cards.
      cardsMap = updateCards('remove', selectedCards, cardsMap)
    } else {
      // Deselect selected cards.
      cardsMap = updateCards('deselect', selectedCards, cardsMap)
    }

    return copy(this, { cardsMap })
  }
}
