import Card from './Card'

describe('Card', () => {
  const card = new Card('a', 0)

  describe('#select', () => {
    it('selects the card', () => {
      const result = card.select()
      expect(result).toHaveProperty('selected', true)
    })
  })

  describe('#deselect', () => {
    it('deselects the card', () => {
      card.selected = true
      const result = card.deselect()
      expect(result).toHaveProperty('selected', false)
    })
  })

  describe('#disable', () => {
    it('disables the card', () => {
      const result = card.disable()
      expect(result).toHaveProperty('disabled', true)
    })
  })

  describe('#remove', () => {
    it('removes the card', () => {
      const result = card.remove()
      expect(result).toHaveProperty('position', [0, 1000])
      expect(result).toHaveProperty('rotation', [45, 0, 0])
      expect(result).toHaveProperty('zIndex', 100)
    })
  })

  describe('#equals', () => {
    const a = new Card('a')
    const b = new Card('b')

    it('returns true if the cards are matching', () => {
      expect(a.equals(a)).toBe(true)
    })

    it('returns false otherwise', () => {
      expect(a.equals(b)).toBe(false)
    })
  })
})