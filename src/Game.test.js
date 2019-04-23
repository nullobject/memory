import Game from './Game'
import { isMatchingPair } from './utils'

jest.mock('./utils', () => ({
  isMatchingPair: jest.fn(() => false)
}))

let a, b, c

describe('Game', () => {
  beforeEach(() => {
    a = { id: 1, state: 'normal', select: jest.fn(() => a), deselect: jest.fn(() => a), disable: jest.fn(() => a), remove: jest.fn(() => a) }
    b = { id: 2, state: 'selected', select: jest.fn(() => b), deselect: jest.fn(() => b), disable: jest.fn(() => b), remove: jest.fn(() => b) }
    c = { id: 3, state: 'disabled', select: jest.fn(() => c), deselect: jest.fn(() => c), disable: jest.fn(() => c), remove: jest.fn(() => c) }
  })

  describe('#cards', () => {
    it('returns the cards', () => {
      const game = new Game([a, b, c])
      expect(game.cards).toEqual([a, b, c])
    })
  })

  describe('#selectedCards', () => {
    it('returns the selected cards', () => {
      const game = new Game([a, b, c])
      expect(game.selectedCards).toEqual([b])
    })
  })

  describe('#selectCards', () => {
    it('selects the card with the given ID', () => {
      const game = new Game([a, b, c])
      expect(a.select).not.toHaveBeenCalled()
      game.selectCard(1)
      expect(a.select).toHaveBeenCalled()
    })

    it('increments the guesses', () => {
      const game = new Game([a, b, c])
      const result = game.selectCard(1)
      expect(result.guesses).toBe(1)
    })

    it('does not allow selecting cards that are already selected', () => {
      const game = new Game([a, b, c])
      game.selectCard(2)
      expect(b.select).not.toHaveBeenCalled()
    })

    it('does not allow selecting cards that are disabled', () => {
      const game = new Game([a, b, c])
      game.selectCard(3)
      expect(c.select).not.toHaveBeenCalled()
    })
  })

  describe('#endTurn', () => {
    it('removes matching cards', () => {
      isMatchingPair.mockReturnValue(true)

      const game = new Game([a, b, c])

      expect(b.remove).not.toHaveBeenCalled()

      game.endTurn()

      expect(a.remove).not.toHaveBeenCalled()
      expect(b.remove).toHaveBeenCalled()
      expect(c.remove).not.toHaveBeenCalled()
    })

    it('deselects selected cards', () => {
      isMatchingPair.mockReturnValue(false)

      const game = new Game([a, b, c])

      expect(b.deselect).not.toHaveBeenCalled()

      game.endTurn()

      expect(a.deselect).not.toHaveBeenCalled()
      expect(b.deselect).toHaveBeenCalled()
      expect(c.deselect).not.toHaveBeenCalled()
    })
  })
})
