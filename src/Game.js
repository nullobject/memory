import { all, append, copy, head, set, values } from 'fkit'

export default class Game {
  constructor (cards) {
    this.cardsMap = cards.reduce((cardsMap, card) =>
      set(card.id, card, cardsMap)
    , {})
    this.selectedCards = []
  }

  get cards () {
    return values(this.cardsMap)
  }

  selectCard (card) {
    // Ensure the card is not already selected.
    if (this.selectedCards.includes(card)) {
      return this
    }

    // Ensure that we can only select two cards.
    if (this.selectedCards.length >= 2) {
      return this
    }

    // Select the card.
    const selectedCards = append(card, this.selectedCards)

    let game = copy(this, { selectedCards })

    // If the selected cards are matching then disable them.
    if (game.selectedCards.length >= 2 && game.selectedCardsAreEqual()) {
      game = game.disableSelectedCards()
    }

    return game
  }

  // Returns true if all the selected cards are equal.
  selectedCardsAreEqual () {
    const first = head(this.selectedCards)
    return all(card => card.equals(first), this.selectedCards)
  }

  // Deselects all cards.
  deselectAllCards () {
    return copy(this, { selectedCards: [] })
  }

  // Disables the selected cards.
  disableSelectedCards () {
    // Disable each card from the set of selected cards.
    const cardsMap = this.selectedCards.reduce((cardsMap, card) =>
      set(card.id, card.disable(), cardsMap)
    , this.cardsMap)
    return copy(this, { cardsMap })
  }
}
