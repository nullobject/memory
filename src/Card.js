import { copy } from 'fkit'

export const COLUMNS = 4
export const SIZE = [128, 128]

export default class Card {
  constructor (shape, index) {
    this.selected = false
    this.disabled = false
    this.id = index
    this.shape = shape
    this.position = [(index % COLUMNS) * SIZE[0], Math.floor(index / COLUMNS) * SIZE[1]]
    this.rotation = [0, 0, 0]
    this.zIndex = index
  }

  // Selects the card.
  select () {
    return copy(this, { selected: true })
  }

  // Deselects the card.
  deselect () {
    return copy(this, { selected: false })
  }

  // Disables the card.
  disable () {
    return copy(this, { disabled: true })
  }

  // Removes the card from the board.
  remove () {
    return copy(this, {
      position: [this.position[0], 1000],
      rotation: [45, 0, 0],
      zIndex: 100
    })
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
