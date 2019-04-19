import { copy } from 'fkit'

export default class Card {
  constructor (shape, index) {
    this.disabled = false
    this.id = index
    this.shape = shape
    this.zIndex = index
  }

  // Disables the card.
  disable () {
    return copy(this, { disabled: true })
  }

  // Returns true if a given card is equal to the card.
  equals (other) {
    return other.shape === this.shape
  }

  // Returns the string representation of the card.
  toString () {
    return 'card-' + this.id
  }
}
