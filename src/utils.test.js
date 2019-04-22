import { isMatchingPair } from './utils'

describe('isMatchingPair', () => {
  const a = { equals: jest.fn(() => true) }
  const b = { equals: jest.fn(() => true) }

  it('returns true when given a matching pair', () => {
    expect(isMatchingPair([a, b])).toBe(true)
    expect(a.equals).toHaveBeenLastCalledWith(b)
  })

  it('returns false otherwise', () => {
    expect(isMatchingPair([a])).toBe(false)
    expect(isMatchingPair([])).toBe(false)
  })
})
