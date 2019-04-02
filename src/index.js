import React from 'react'
import { Bus } from 'bulb'
import { concat, get, shuffle } from 'fkit'
import { render } from 'react-dom'

import Card from './Card'
import Game from './Game'
import GameView from './GameView'
import { isPair } from './utils'

// The shapes to use for the pairs of cards.
const SHAPES = ['🐡', '🐙', '🐔', '🐛', '🐶', '🐝', '🐵', '🐰']

// The number of milliseconds to wait before deslecting cards.
const DESELECT_DELAY = 1000

const root = document.getElementById('root')
const shapes = shuffle(concat(SHAPES, SHAPES))
const cards = shapes.map((shape, index) => new Card(shape, index))
const game = new Game(cards)
const bus = new Bus()

// A signal that emits the game state.
const gameSignal = bus.scan(transformer, game).dedupe()

// A signal that emits selected pairs of cards.
const pairsSignal = gameSignal.map(get('selectedCards')).filter(isPair)

// A signal that emits a `deselect-all` event a short time after a pair of
// cards has been selected.
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

  return game
}
