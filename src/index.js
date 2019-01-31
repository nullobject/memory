import React from 'react'
import nanobus from 'nanobus'
import { Signal } from 'bulb'
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
const bus = nanobus()
const busSignal = fromBus(bus)
const gameSignal = busSignal.scan(transformer, game).dedupe()
const selectedCardsSignal = gameSignal.map(get('selectedCards'))

// A signal that emits an event every time the user selects a pair of cards.
const deselectAllSignal = selectedCardsSignal
  .filter(cards => eq(2, cards.length))
  .delay(DESELECT_DELAY)
  .always('deselect-all')

const subscriptions = [
  // Plug the deselect signal into the bus.
  deselectAllSignal.subscribe(a => bus.emit(a)),

  gameSignal.subscribe(game => render(<GameView bus={bus} game={game} />, root))
]

if (module.hot) {
  module.hot.dispose(() => {
    console.log('Unsubscribing...')
    subscriptions.forEach(s => s.unsubscribe())
  })
}

/**
 * Creates a new signal from a bus.
 *
 * @param bus A bus.
 * @returns A new signal.
 */
function fromBus (bus) {
  return new Signal(emit => {
    const handler = (type, data) => emit.value({ ...data, type })
    bus.addListener('*', handler)
    return () => bus.removeListener('*', handler)
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
