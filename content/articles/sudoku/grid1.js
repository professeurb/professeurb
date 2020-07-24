import React, { Component } from 'react'
import Sudoker from './Sudoker.js'

export default class Grid1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      n: 0,
      dir: 1,
    }
  }

  checkLine(grid, l, v) {
    for (let c = 0; c < 9; c++) {
      if (grid[l][c] % 10 === v) {
        return false
      }
    }
    return true
  }

  checkColumn(grid, c, v) {
    for (let l = 0; l < 9; l++) {
      if (grid[l][c] % 10 === v) {
        return false
      }
    }
    return true
  }

  checkBlock(grid, l, c, v) {
    let bl = 3 * Math.floor(l / 3)
    let bc = 3 * Math.floor(c / 3)
    for (let l = bl; l < bl + 3; l++) {
      for (let c = bc; c < bc + 3; c++) {
        if (grid[l][c] % 10 === v) {
          return false
        }
      }
    }
    return true
  }

  async step(sync, change) {
    // Reinitialize the grid
    await change(grid => {
      return grid.map(l => {
        return l.map(c => (c < 20 ? 0 : c))
      })
    })

    while (this.state.n < 81) {
      await change(oldGrid => {
        // console.log(oldGrid)
        while (true) {
          console.log(this.state.n)
          let l = Math.floor(this.state.n / 9)
          let c = this.state.n - 9 * l
          let cell = oldGrid[l][c]
          if (cell < 20) {
            cell %= 10
            if (cell === 9) {
              this.state.dir = -1
              this.state.n += this.state.dir
              let grid = [...oldGrid]
              let line = [...grid[l]]
              line[c] = 0
              grid[l] = line
              return grid
            } else {
              cell += 1
              this.state.dir = 1
              if (
                this.checkLine(oldGrid, l, cell) &&
                this.checkColumn(oldGrid, c, cell) &&
                this.checkBlock(oldGrid, l, c, cell)
              ) {
                let grid = [...oldGrid]
                let line = [...grid[l]]
                line[c] = cell
                grid[l] = line
                this.state.n += this.state.dir
                return grid
              } else {
                let grid = [...oldGrid]
                let line = [...grid[l]]
                line[c] = cell + 10
                grid[l] = line
                return grid
              }
            }
          } else {
            this.state.n = this.state.n + this.state.dir
          }
        }
      })

      await sync()
    }
  }

  render() {
    return <Sudoker {...this.props} solve={this.step.bind(this)} />
  }
}
