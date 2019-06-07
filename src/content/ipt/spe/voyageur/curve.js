import React, { Component } from 'react'
import * as d3 from 'd3'

// \draw [draw=black!80,top color=white,bottom color=black!20,] ({7+(0.3-1.5*cos(7 r))/((26-10*cos(7 r)+25*cos(7 r)*cos(7 r))^0.5)}, {sin(7 r)-7/5+1.5/((26-10*cos(7 r)+25*cos(7 r)*cos(7 r))^0.5)}) circle (0.3);
// \draw [domain=3:13, samples=100] plot (\x, {sin(\x r)-\x/5});
// % \draw [very thick, <-, domain=4.91:11.196, samples=100] plot ({\x+(0.3-1.5*cos(\x r))/((26-10*cos(\x r)+25*cos(\x r)*cos(\x r))^0.5)}, {sin(\x r)-\x/5+1.5/((26-10*cos(\x r)+25*cos(\x r)*cos(\x r))^0.5)});
// \draw [very thick, ->, domain=7.1:11, samples=100, dashed] plot ({\x+(0.3-1.5*cos(\x r))/((26-10*cos(\x r)+25*cos(\x r)*cos(\x r))^0.5)}, {sin(\x r)-\x/5+1.5/((26-10*cos(\x r)+25*cos(\x r)*cos(\x r))^0.5)});
// \draw [very thick, <-, domain=5:6.9, samples=100] plot ({\x+(0.3-1.5*cos(\x r))/((26-10*cos(\x r)+25*cos(\x r)*cos(\x r))^0.5)}, {sin(\x r)-\x/5+1.5/((26-10*cos(\x r)+25*cos(\x r)*cos(\x r))^0.5)});

function f2(t) {
  let x =
    t +
    (0.3 - 1.5 * Math.cos(t)) /
      (26 - 10 * Math.cos(t) + 25 * Math.cos(t) ** 2) ** 0.5
  let y =
    Math.sin(t) -
    t / 5 +
    1.5 / (26 - 10 * Math.cos(t) + 25 * Math.cos(t) ** 2) ** 0.5
  return [x, y]
}

function draw(node) {
  let defs = d3.select(node).append('defs')

  let gradient = defs
    .append('linearGradient')
    .attr('id', 'svgGradient')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '0%')
    .attr('y2', '100%')

  gradient
    .append('stop')
    .attr('class', 'start')
    .attr('offset', '0%')
    .attr('stop-color', 'white')
    .attr('stop-opacity', 1)

  gradient
    .append('stop')
    .attr('class', 'end')
    .attr('offset', '100%')
    .attr('stop-color', '#cccccc')
    .attr('stop-opacity', 1)

  let arrow = defs
    .append('marker')
    .attr('id', 'head')
    .attr('orient', 'auto')
    .attr('markerWidth', 4)
    .attr('markerHeight', 8)
    .attr('refX', 1.5)
    .attr('refY', 4)

  arrow
    .append('path')
    // .attr('fill', 'black')
    .attr('d', 'M0,0.5 L1.5,4 L0,7.5 L4,4 Z')
  //     <marker id='head' orient="auto"
  //     markerWidth='2' markerHeight='4'
  //     refX='0.1' refY='2'>
  //     <!-- triangle pointing right (+x) -->
  //     <path d='M0,0 V4 L2,2 Z' fill="black"/>
  //   </marker>

  let g = d3.select(node).append('svg:g')
  let w = 760
  let h = 400
  let x = d3
    .scaleLinear()
    .domain([3, 14])
    .range([0, w])
  let y = d3
    .scaleLinear()
    .domain([-7, 0])
    .range([h, 0])

  g.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', '2px')
    .attr('d', d => {
      return d3.line()(
        d3
          .scaleLinear()
          .domain([3, 13])
          .ticks(100)
          .map(t => {
            return [x(t), y(Math.sin(t) - t / 5)]
          })
      )
    })
  g.append('path')
    .attr('fill', 'none')
    .attr('stroke', '#999')
    .attr('stroke-width', '2px')
    .attr('stroke-dasharray', [10, 10])
    // .attr('marker-end', 'url(#head)')
    .attr('d', d => {
      return d3.line()(
        d3
          .scaleLinear()
          .domain([7.1, 11])
          .ticks(100)
          .map(t => {
            let [xx, yy] = f2(t)
            return [x(xx), y(yy)]
          })
      )
    })
  g.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', '2px')
    // .attr('stroke-dasharray', [10, 10])
    .attr('marker-end', 'url(#head)')
    .attr('d', d => {
      return d3.line()(
        d3
          .scaleLinear()
          .domain([6.9, 5])
          .ticks(100)
          .map(t => {
            let [xx, yy] = f2(t)
            return [x(xx), y(yy)]
          })
      )
    })
  g.append('circle')
    .attr('stroke', 'black')
    .attr('stroke-width', '2px')
    .attr('fill', 'url(#svgGradient)')
    .attr('cx', x(f2(7)[0]))
    .attr('cy', y(f2(7)[1]))
    .attr('r', 15.8)
}

class Curve extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount() {
    draw(this.myRef.current)
  }

  componentDidUpdate() {
    draw(this.myRef.current)
  }

  render() {
    return <svg ref={this.myRef} width={700} height={200} />
  }
}

export default Curve
