import React, { Component } from 'react'
import style from './grid.module.css'
import range from 'lodash/range'

export default class Grid extends Component {
  async componentDidUpdate() {
    await new Promise(resolve => setTimeout(resolve, 10))
    this.props.resolve()
  }

  render() {
    const { grid } = this.props
    return (
      <div className={style.table}>
        {range(9).map(i => (
          <div key={i} className={style.row}>
            {range(9).map(j => (
              <div key={9 * (i + 1) + j} className={style.col}>
                <div
                  className={
                    grid[i][j] > 20
                      ? style.cell
                      : grid[i][j] > 10
                      ? style.cell2
                      : ''
                  }
                >
                  {grid[i][j] !== 0 ? (grid[i][j] % 10) : ''}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}
