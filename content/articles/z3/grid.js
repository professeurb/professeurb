import React, { Component } from 'react'
import style from './grid.module.css'

// import * as d3 from 'd3'

// function draw(node) {
//   let g = d3.select(node).append('svg:g')
//   g.append('line')
//     .attr('x1', 10)
//     .attr('x2', 10)
//     .attr('y1', 10)
//     .attr('y2', 409)
//     .attr('stroke', 'black')
//     .attr('stroke-width', '2px')
//   g.append('line')
//     .attr('x1', 409)
//     .attr('x2', 409)
//     .attr('y1', 10)
//     .attr('y2', 409)
//     .attr('stroke', 'black')
//     .attr('stroke-width', '2px')
//   g.append('line')
//     .attr('x1', 10)
//     .attr('x2', 409)
//     .attr('y1', 10)
//     .attr('y2', 10)
//     .attr('stroke', 'black')
//     .attr('stroke-width', '2px')
//   g.append('line')
//     .attr('x1', 10)
//     .attr('x2', 409)
//     .attr('y1', 409)
//     .attr('y2', 409)
//     .attr('stroke', 'black')
//     .attr('stroke-width', '2px')
//   for (let i = 1; i < 7; i++) {
//     g.append('line')
//       .attr('x1', 10)
//       .attr('x2', 409)
//       .attr('y1', 57 * i + 10)
//       .attr('y2', 57 * i + 10)
//       .attr('stroke', 'black')
//       .attr('stroke-width', '1px')
//   }
// }

export default class Grid extends Component {
  // constructor(props) {
  //   super(props)
  //   this.myRef = React.createRef()
  // }

  // componentDidMount() {
  //   draw(this.myRef.current)
  // }

  // componentDidUpdate() {
  //   draw(this.myRef.current)
  // }

  render() {
    let grid = [
      ['', '4', '', '', '', '', ''],
      ['', '', '6', '3', '', '', '6'],
      ['', '', '', '', '', '5', '5'],
      ['', '', '', '4', '', '', ''],
      ['4', '7', '', '', '', '', ''],
      ['2', '', '', '7', '4', '', ''],
      ['', '', '', '', '', '1', ''],
    ]
    // return <svg ref={this.myRef} width={419} height={419} />
    return (
      <div class='flex flex-wrap justify-center'>
        <div className={style.grid}>
          {grid.map((line, index) => (
            <div key={index} className={style.boardRow}>
              {line.map((val, i) => (
                <div key={7 * (index + 1) + i} className={style.square}>
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

// . 4 . . . . .
// . . 6 3 . . 6
// . . . . . 5 5
// . . . 4 . . .
// 4 7 . . . . .
// 2 . . 7 4 . .
// . . . . . 1 .
