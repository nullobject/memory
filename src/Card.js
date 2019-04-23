import { copy } from 'fkit'

export const COLUMNS = 4
export const SIZE = [128, 128]

export default class Card {
  constructor (shape, index) {
    this.id = index
    this.shape = shape
    this.state = 'normal'
    this.position = [(index % COLUMNS) * SIZE[0], Math.floor(index / COLUMNS) * SIZE[1]]
    this.rotation = [0, 0, 0]
    this.zIndex = index
  }

  /**
   * Selects the card.
   *
   * @returns {Card} The new card state.
   */
  select () {
    return copy(this, { state: 'selected' })
  }

  /**
   * Deselects the card.
   *
   * @returns {Card} The new card state.
   */
  deselect () {
    return copy(this, { state: 'normal' })
  }

  /**
   * Removes the card from the board.
   *
   * @returns {Card} The new card state.
   */
  remove () {
    return copy(this, {
      state: 'disabled',
      position: [this.position[0], 1000],
      rotation: [45, 0, 0],
      zIndex: 100
    })
  }

  /**
   * Returns `true` if this card matches the given card.
   *
   * @param {Card} other The other card.
   * @returns {Card} The new card state.
   */
  equals (other) {
    return other.shape === this.shape
  }

  /**
   * Returns the string representation of the card.
   *
   * @returns {String} The string representation.
   */
  toString () {
    return 'card-' + this.id
  }
}
