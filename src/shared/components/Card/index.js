import React from 'react'

import './index.css'

const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  )
}

export default Card
