// Returns `true` if the given cards contains a pair of matching cards, `false`
// otherwise.
export function isMatchingPair (cards) {
  if (cards.length >= 2) {
    const [a, b] = cards
    return a.equals(b)
  } else {
    return false
  }
}
