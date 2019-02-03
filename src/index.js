import React from 'react'
import { Bus } from 'bulb'
import { copy, eq, get, shuffle } from 'fkit'
import { render } from 'react-dom'

import Card from './Card'
import Game from './Game'
import GameView from './GameView'

// The shapes to use for the pairs of cards.
const SHAPES = ['🐡', '🐙', '🐔', '🐛', '🐶', '🐝', '🐵', '🐰']

// The number of milliseconds to wait before deslecting cards.
const DESELECT_DELAY = 1000

const root = document.getElementById('root')
const shapes = shuffle(SHAPES.concat(SHAPES))
const cards = shapes.map((shape, index) => new Card(shape, index))
const game = new Game(cards)
const bus = new Bus()
const gameSignal = bus.scan(transformer, game).dedupe()
const selectedCardsSignal = gameSignal.map(get('selectedCards'))

// A signal that emits an event every time the user selects a pair of cards.
const deselectAllSignal = selectedCardsSignal
  .filter(cards => eq(2, cards.length))
  .delay(DESELECT_DELAY)
  .always({ type: 'deselect-all' })

const subscriptions = [
  // Connect the deselect signal to the bus.
  bus.connect(deselectAllSignal),

  // Render the UI whenever the state changes.
  gameSignal.subscribe(game => render(<GameView bus={bus} game={game} />, root))
]

if (module.hot) {
  module.hot.dispose(() => {
    console.log('Unsubscribing...')
    subscriptions.forEach(s => s.unsubscribe())
  })
}

function transformer(game, event) {
  console.log(event)
  if (event.type === 'select') {
    game = game.selectCard(event.card)
  } else if (event.type === 'deselect-all') {
    game = game.deselectAllCards()
  }

  return game
}
