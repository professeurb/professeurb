import * as React from 'react'
import paper from 'paper'

// https://github.com/psychobolt/react-paperjs/blob/master/src/Paper.container.js

export default class Curve2 extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    if (this.canvas.current) {
      paper.setup(this.canvas.current)
    //   let path = new paper.Path()
    //   path.strokeColor = 'black'
    //   let start = new paper.Point(100, 100)
    //   path.moveTo(start)
    //   path.lineTo(start.add([200, -50]))
    //   paper.view.draw()
    }
  }

  render() {
    return <canvas ref={this.canvas} />
  }
}
