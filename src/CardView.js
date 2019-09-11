import React from 'react'
import injectSheet from 'react-jss'
import classnames from 'classnames'

const styles = {
  root: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: '25%',
    padding: 4,
    transition: 'opacity 0.1s',
    width: '25%',
    '&$selected $flipper': {
      transform: 'rotateY(180deg)'
    }
  },
  flipper: {
    transition: '0.3s',
    transformStyle: 'preserve-3d'
  },
  front: {
    backgroundColor: 'papayawhip',
    transform: 'rotateX(0deg)' // hack to fix backface visibility issue in Firefox
  },
  back: {
    backgroundColor: 'mintcream',
    transform: 'rotateY(180deg)'
  },
  face: {
    alignItems: 'baseline',
    backfaceVisibility: 'hidden',
    border: '1px solid #ccc',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute'
  },
  square: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  },
  selected: {},
  removed: { opacity: 0.25 }
}

const CardView = ({ bus, card, classes }) => {
  const selected = card.state !== 'normal'
  const removed = card.state === 'removed'
  const className = classnames(
    classes.root,
    {
      [classes.selected]: selected,
      [classes.removed]: removed
    }
  )

  const handleClick = () => {
    if (card.state === 'normal') {
      bus.next({ type: 'select-card', id: card.id })
    }
  }

  return (
    <div className={className} onClick={handleClick}>
      <div className={classnames(classes.square, classes.flipper)}>
        <div className={classnames(classes.square, classes.face, classes.front)}>❓</div>
        <div className={classnames(classes.square, classes.face, classes.back)}>{card.shape}</div>
      </div>
    </div>
  )
}

export default injectSheet(styles)(CardView)
