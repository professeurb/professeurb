import React, { Component } from 'react'
// import 'bulma/css/bulma.min.css'

export default class Center extends Component {
  render () {
    return (
      <div
        // className='box'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 40,
          marginBottom: 40
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
