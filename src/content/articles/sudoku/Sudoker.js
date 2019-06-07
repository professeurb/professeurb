import React, { Component } from 'react'
import Grid from './Grid.js'
import { AnimButton } from 'components/AnimButton.jsx'

export default class Sudoker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [
        [0, 21, 0, 0, 0, 0, 0, 0, 26],
        [0, 0, 0, 0, 29, 0, 0, 22, 0],
        [0, 25, 26, 0, 21, 28, 0, 27, 0],
        [28, 29, 0, 22, 0, 0, 0, 0, 27],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [21, 0, 0, 0, 0, 29, 0, 23, 22],
        [0, 28, 0, 23, 24, 0, 27, 26, 0],
        [0, 24, 0, 0, 28, 0, 0, 0, 0],
        [27, 0, 0, 0, 0, 0, 0, 21, 0],
      ],
      animButtonDisabled: false,
      animate: true,
      resolve: () => {},
      duration: 1000,
    }
  }

  async animState(newState, duration) {
    await new Promise(resolve => {
      this.setState({
        ...newState,
        animate: true,
        duration: duration,
        resolve: resolve,
      })
    })
  }

  async change(update, duration) {
    await this.animState({ grid: update(this.state.grid) }, duration)
  }

  async anim(waiter) {
    await waiter()
    await this.props.solve(waiter, this.change.bind(this))
  }

  render() {
    return (
      <>
        <Grid grid={this.state.grid} resolve={this.state.resolve} />
        <AnimButton
          name="Résoudre"
          anim={this.anim.bind(this)}
          disabled={this.state.animButtonDisabled}
        />
      </>
    )
  }
}
