import React from 'react'
import 'typeface-francois-one'
import 'typeface-oswald'
// import './tris.css'

const Card = ({ id, top, left, zIndex, rotate, value, pos }) => {
  return (
    <div
      className="card"
      style={{
        position: 'absolute',
        width: 55,
        height: 90,
        border: '1px solid',
        borderRadius: 10,
        margin: 0,
        paddingTop: 2,
        backgroundColor: '#fff',
        left: left,
        top: top,
        transform: 'rotate(' + rotate + 'deg)',
        zIndex: zIndex,
      }}
      data-id={id}
    >
      <h1
        style={{
          marginTop: 5,
          fontFamily: 'Francois One',
          textAlign: 'center',
          fontSize: '20pt',
        }}
      >
        {value}
      </h1>
      <h2
        style={{
          marginTop: 20,
          fontFamily: 'Oswald',
          color: '#aaaaaa',
          textAlign: 'center',
          fontSize: '12pt',
          fontWeight: 300,
        }}
      >
        {pos}
      </h2>
    </div>
  )
}

export default Card
