import React, { Component } from 'react'
import Sudoker from './Sudoker.js'

export default class Grid2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solved: false,
    }
  }

  async step(change, sync, cases, lsets, csets, bsets) {
    if (cases.length > 0) {
      let cell = cases.shift()
      let l = cell[0]
      let c = cell[1]
      let b = cell[2]

      console.log(l, c, b)

      let values = lsets[l] & csets[c] & bsets[b]
      console.log(l, c, b, lsets[l], csets[c], bsets[b], values)
      let v = 1
      let witness = 1
      while (values !== 0) {
        if (values % 2 === 1) {
          //   essaye valeur
          await change(oldGrid => {
            let grid = [...oldGrid]
            let line = [...grid[l]]
            line[c] = v
            grid[l] = line
            return grid
          })
          await sync()
          lsets[l] ^= witness
          csets[c] ^= witness
          bsets[b] ^= witness
          await this.step(change, sync, cases, lsets, csets, bsets)
          lsets[l] ^= witness
          csets[c] ^= witness
          bsets[b] ^= witness
        }
        v += 1
        witness *= 2
        values >>= 1
      }

      if (this.state.solved) {
        return
      }

      await change(oldGrid => {
        let grid = [...oldGrid]
        let line = [...grid[l]]
        line[c] = 0
        grid[l] = line
        return grid
      })
      await sync()

      cases.unshift(cell)
    } else {
      this.setState({ solved: true })
    }
  }

  async solve(sync, change) {
    // Initialisation
    let lsets = [511, 511, 511, 511, 511, 511, 511, 511, 511]
    let csets = [511, 511, 511, 511, 511, 511, 511, 511, 511]
    let bsets = [511, 511, 511, 511, 511, 511, 511, 511, 511]

    let cases = []

    this.setState({ solved: false })

    await change(grid => {
      ;[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(l => {
        ;[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(c => {
          let b = 3 * Math.floor(l / 3) + Math.floor(c / 3)
          let v = grid[l][c]
          if (v === 0) {
            // empty cell
            cases.push([l, c, b])
          } else {
            v %= 10
            v = 2 ** (v - 1)
            lsets[l] ^= v
            csets[c] ^= v
            bsets[b] ^= v
          }
        })
      })
      return grid.map(l => {
        return l.map(c => (c < 20 ? 0 : c))
      })
    })

    // console.log(lsets)
    // console.log(csets)
    // console.log(bsets)
    // console.log(cases)

    // Résolution

    await this.step(change, sync, cases, lsets, csets, bsets)
  }

  render() {
    return <Sudoker {...this.props} solve={this.solve.bind(this)} />
  }
}
