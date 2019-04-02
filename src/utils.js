// Returns `true` if the given cards contains a pair of cards, `false`
// otherwise.
export function isPair (cards) {
  return cards.length === 2
}

// Returns `true` if the given cards contains a pair of matching cards, `false`
// otherwise.
export function isMatchingPair (cards) {
  if (isPair(cards)) {
    const [a, b] = cards
    return a.equals(b)
  } else {
    return false
  }
}
