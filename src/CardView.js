import React from 'react'
import injectSheet from 'react-jss'
import classnames from 'classnames'
import { animated, config, useSpring } from 'react-spring'

import { SIZE } from './Card'

function transform (position, rotation) {
  return `translate(${position[0]}px, ${position[1]}px) rotateX(${rotation[0]}deg) rotateY(${rotation[1]}deg) rotateZ(${rotation[2]}deg) scale(1)`
}

const styles = {
  root: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: SIZE[1],
    padding: 4,
    position: 'absolute',
    perspective: 600,
    width: SIZE[0],
    '&$selected $flipper': {
      transform: 'rotateY(180deg)'
    }
  },
  flipper: {
    position: 'relative',
    transition: '0.3s',
    transformStyle: 'preserve-3d'
  },
  front: {
    backgroundColor: 'papayawhip',
    zIndex: 2
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
    boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute'
  },
  square: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  },
  selected: {}
}

const CardView = ({ bus, card, classes }) => {
  const selected = card.selected || card.disabled
  const className = classnames(
    classes.root,
    { [classes.selected]: selected }
  )

  const handleClick = () => {
    if (!card.disabled) {
      bus.next({ type: 'select-card', cardId: card.id })
    }
  }

  const props = useSpring({
    config: config.wobbly,
    transform: transform(card.position, card.rotation)
  })

  return (
    <animated.div
      className={className}
      onClick={handleClick}
      style={{ ...props, zIndex: card.zIndex }}
    >
      <div className={classnames(classes.square, classes.flipper)}>
        <div className={classnames(classes.square, classes.face, classes.front)}>❓</div>
        <div className={classnames(classes.square, classes.face, classes.back)}>{card.shape}</div>
      </div>
    </animated.div>
  )
}

export default injectSheet(styles)(CardView)
