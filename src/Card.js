import { copy } from 'fkit'

export default class Card {
  constructor (shape, id) {
    this.disabled = false
    this.id = id
    this.shape = shape
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
