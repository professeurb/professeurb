import React, { Component } from 'react'
// import './tris.css'
import Card from './Card.js'
import GroupItemsHOC from './GroupItemsHOC'
import { animateGroups } from './animations'

class Mat extends Component {
  render() {
    const { cards } = this.props

    return (
      <div className="mat" style={{
        position: 'relative', /* it is a container */
        width: '849px !important',
        height: '250px',
        marginTop: '20px',
        marginBottom: '20px',
        backgroundColor: '#fafafa',
        border: '1px solid',
        borderRadius: '10px',
        borderColor: '#bbb'
      }}>
        {cards.map(card => (
          <Card {...card} key={card.id} />
        ))}
      </div>
    )
  }
}

export default GroupItemsHOC(animateGroups)(Mat)
