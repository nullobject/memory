import { copy, get, head, set, update, values } from 'fkit'

import { isMatchingPair } from './utils'

// Disables the given cards in the cards map.
function disableCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    update(card.id, card => card.disable(), cardsMap)
  , cardsMap)
}

// Deselects the given cards in the cards map.
function deselectCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    update(card.id, card => card.deselect(), cardsMap)
  , cardsMap)
}

// Selects the given cards in the cards map.
function selectCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    update(card.id, card => card.select(), cardsMap)
  , cardsMap)
}

// Removes the given cards in the cards map.
function removeCards (cards, cardsMap) {
  return cards.reduce((cardsMap, card) =>
    update(card.id, card => card.remove(), cardsMap)
  , cardsMap)
}

export default class Game {
  get cards () {
    return values(this.cardsMap)
  }

  get activeCards () {
    return this.cards.filter(card => card.state !== 'normal')
  }

  get selectedCards () {
    return this.cards.filter(card => card.state === 'selected')
  }

  get disabledCards () {
    return this.cards.filter(card => card.state === 'disabled')
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
    const selectedCards = this.selectedCards
    const card = cardsMap[id]

    // Ensure the card is able to be selected.
    if (card.state !== 'normal') return this

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

    // Deselect selected cards.
    cardsMap = deselectCards(this.selectedCards, cardsMap)

    // Remove disabled cards.
    cardsMap = removeCards(this.disabledCards, cardsMap)

    return copy(this, { cardsMap })
  }
}
