import React from 'react'
import { Bus } from 'bulb'
import { concat, get, shuffle } from 'fkit'
import { render } from 'react-dom'

import Card from './Card'
import Game from './Game'
import GameView from './GameView'

// The shapes to use for the pairs of cards.
const SHAPES = ['🐡', '🐙', '🐔', '🐛', '🐶', '🐝', '🐵', '🐰']

// The number of milliseconds to wait before deslecting cards.
const DESELECT_DELAY = 1000

// Returns `true` if the length of the given array is two, `false` otherwise.
const isPair = as => as.length === 2

const root = document.getElementById('root')
const shapes = shuffle(concat(SHAPES, SHAPES))
const cards = shapes.map((shape, index) => new Card(shape, index))
const game = new Game(cards)
const bus = new Bus()
const gameSignal = bus.scan(transformer, game).dedupe()

// A signal that emits the selected pairs of cards.
const pairsSignal = gameSignal.map(get('selectedCards')).filter(isPair)

// A signal that deselects cards a short while after a pair of cards have been
// selected.
const deselectSignal = pairsSignal.delay(DESELECT_DELAY).always('deselect-all')

const subscriptions = [
  // Connect the deselect signal to the bus.
  bus.connect(deselectSignal),

  // Render the UI whenever the state changes.
  gameSignal.subscribe(game => render(<GameView bus={bus} game={game} />, root))
]

if (module.hot) {
  module.hot.dispose(() => {
    console.log('Unsubscribing...')
    subscriptions.forEach(s => s.unsubscribe())
  })
}

function transformer (game, event) {
  if (event === 'deselect-all') {
    game = game.deselectAllCards()
  } else if (event.type === 'select') {
    game = game.selectCard(event.card)
  }

  console.log(game)
  return game
}
