// https://medium.com/about-codecademy/building-animations-in-react-from-scratch-c66a582c9b65
// https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/

import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import anime from 'animejs'

class Carte extends Component {
  constructor() {
    super()

    this.ref = React.createRef()
  }

  componentDidUpdate(prevs, _) {
    // console.log(this.ref.current.children[0].children[0])
    if (this.props.visible) {
      if (this.props.duration != 0) {
        anime({
          targets: this.ref.current,
          translateX: [prevs.left - this.props.left, 0],
          translateY: [prevs.top - this.props.top, 0],
          rotate: [prevs.rotate, this.props.rotate],
          duration: this.props.duration,
          // delay: this.props.delay,
          easing: 'easeInOutSine',
          elasticity: 1,
        })

        if (prevs.color != this.props.color) {
          anime({
            targets: this.ref.current.children[0].children[0],
            color: this.props.color,
            duration: 1000, // this.props.duration,
            easing: 'easeInOutSine',
            elasticity: 1,
          })
        }
      }
    } else {
      anime({
        targets: this.ref.current,
        translateY: 30,
        opacity: 0,
        duration: 100,
        delay: this.props.delay,
        easing: 'easeInOutSine',
        // complete: resolve,
        elasticity: 1,
      })
    }
  }

  componentDidMount() {
    anime({
      targets: this.ref.current,
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 100,
      delay: this.props.delay,
      easing: 'easeInOutSine',
      elasticity: 1,
    })
  }

  render() {
    return (
      <Card
        className='text-center p-1'
        style={{
          position: 'absolute',
          width: 44,
          height: 72,
          border: '1px solid',
          borderRadius: 10,
          margin: 0,
          padding: '5 !important',
          backgroundColor: '#fff',
          left: this.props.left,
          top: this.props.top,
          transform:
            'translateX(0px) translateY(0px) rotate(' +
            this.props.rotate +
            'deg)',
          zIndex: this.props.zIndex,
        }}
        ref={this.ref}
      >
        <Card.Body style={{ padding: 3 }}>
          <p
            style={{
              textAlign: 'center',
              fontSize: '16pt',
              color: this.props.color,
            }}
          >
            {this.props.value}
          </p>
        </Card.Body>
      </Card>
    )
  }
}

export default Carte
