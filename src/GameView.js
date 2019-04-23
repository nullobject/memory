import React from 'react'
import injectSheet from 'react-jss'

import CardView from './CardView'
import background from './background.png'

const styles = {
  '@global': {
    html: {
      height: '100%',
      width: '100%'
    },
    body: {
      alignItems: 'center',
      background: `radial-gradient(circle, hsla(180, 20%, 20%, 0.5), hsla(0, 0%, 0%, 0.75)), url(${background})`,
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      margin: 0,
      overflow: 'hidden',
      userSelect: 'none',
      width: '100%'
    }
  },
  root: {
    fontSize: 100,
    height: '5em',
    position: 'relative',
    width: '5em'
  }
}

const GameView = ({ bus, classes, game }) => {
  const cardViews = game.cards.map((card, index) => (
    <CardView bus={bus} card={card} key={card.toString()} />
  ))

  return (
    <div className={classes.root}>{cardViews}</div>
  )
}

export default injectSheet(styles)(GameView)
