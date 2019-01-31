import React from 'react'
import injectSheet from 'react-jss'
import { elem } from 'fkit'

import CardView from './CardView'

const styles = {
  '@global body': {
    userSelect: 'none'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: 100,
    height: '5em',
    width: '5em',
  }
}

const GameView = ({ bus, classes, game }) => {
  const cardViews = game.cards.map(card =>
    <CardView
      bus={bus}
      card={card}
      key={card.toString()}
      selected={elem(card, game.selectedCards)}
    />
  )

  return (
    <div className={classes.root}>{cardViews}</div>
  )
}

export default injectSheet(styles)(GameView)
