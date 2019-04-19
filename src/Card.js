import { copy } from 'fkit'

export const COLUMNS = 4
export const SIZE = [128, 128]

export default class Card {
  constructor (shape, index) {
    this.disabled = false
    this.id = index
    this.shape = shape
    this.position = [(index % COLUMNS) * SIZE[0], Math.floor(index / COLUMNS) * SIZE[1]]
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
