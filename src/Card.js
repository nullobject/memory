import { eqBy, get, set } from 'fkit'

export default class Card {
  constructor (shape, id) {
    this.id = id
    this.shape = shape
    this.state = 'normal'
  }

  /**
   * Selects the card.
   *
   * @returns {Card} The new card state.
   */
  select () {
    return set('state', 'selected', this)
  }

  /**
   * Deselects the card.
   *
   * @returns {Card} The new card state.
   */
  deselect () {
    return set('state', 'normal', this)
  }

  /**
   * Removes the card from the board.
   *
   * @returns {Card} The new card state.
   */
  remove () {
    return set('state', 'removed', this)
  }

  /**
   * Returns `true` if this card matches the given card.
   *
   * @param {Card} other The other card.
   * @returns {Card} The new card state.
   */
  equals (other) {
    return eqBy(get('shape'), this, other)
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
