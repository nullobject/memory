import React from 'react'
import injectSheet from 'react-jss'
import classnames from 'classnames'

const styles = {
  root: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: '25%',
    padding: 4,
    perspective: 800,
    width: '25%',
    '&$selected $flipper': {
      transform: 'rotateY(180deg)'
    },
    '&$disabled $front': {
      color: '#3cb371'
    }
  },
  flipper: {
    position: 'relative',
    transition: '0.3s',
    transformStyle: 'preserve-3d'
  },
  front: {
    color: 'papayawhip',
    zIndex: 2
  },
  back: {
    color: 'mintcream',
    transform: 'rotateY(180deg)'
  },
  face: {
    alignItems: 'baseline',
    backfaceVisibility: 'hidden',
    background: 'radial-gradient(#e66465, #9198e5)',
    border: '1px solid #ccc',
    boxShadow: '0 3px 6px #0007',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute'
  },
  square: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  },
  disabled: {},
  selected: {}
}

const CardView = ({ bus, card, classes, selected }) => {
  const className = classnames(
    classes.root,
    {
      [classes.disabled]: card.disabled,
      [classes.selected]: selected
    }
  )

  const handleClick = () => {
    if (!card.disabled) {
      bus.value({ type: 'select', card })
    }
  }

  return (
    <div className={className} onClick={handleClick}>
      <div className={classnames(classes.square, classes.flipper)}>
        <div className={classnames(classes.square, classes.face, classes.front)}>{card.disabled ? '✅' : '❓'}</div>
        <div className={classnames(classes.square, classes.face, classes.back)}>{card.shape}</div>
      </div>
    </div>
  )
}

export default injectSheet(styles)(CardView)
