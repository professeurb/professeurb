import React from 'react'
import { FaPlay, FaPause, FaStepForward } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export class AnimButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playDisabled: false,
      pauseDisabled: true,
      stepDisabled: false,
      playResolve: () => {},
      stepResolve: () => {},
    }
  }

  async waiter() {
    if (!this.state.pauseDisabled) {
      return Promise.resolve(true)
    } else {
      this.setState({
        playDisabled: false,
        pauseDisabled: true,
        stepDisabled: false,
      })
      let playPromise = new Promise((resolve, reject) => {
        this.setState({
          playResolve: () => {
            resolve(1)
          },
        })
      })
      let stepPromise = new Promise((resolve, reject) => {
        this.setState({
          stepResolve: () => {
            resolve(2)
          },
        })
      })
      return Promise.race([playPromise, stepPromise]).then(value => {
        if (value === 1) {
          // Play
          this.setState({
            playDisabled: true,
            pauseDisabled: false,
            stepDisabled: true,
          })
        } else {
          // Step
          this.setState({
            playDisabled: true,
            pauseDisabled: true,
            stepDisabled: true,
          })
        }
        return true
      })
    }
  }

  render() {
    return (
      <ButtonGroup>
        <Button
          // className='rounded-l-lg border-r-0'
          disabled={this.state.playDisabled || this.props.disabled}
          onClick={() => {
            this.state.playResolve()
          }}
        >
          {this.props.name && (
            <span className='pr-2'>{this.props.name}</span>
          )}
          <FaPlay className='align-middle' />
        </Button>
        <Button
          // className='border-r-0'
          disabled={this.state.pauseDisabled || this.props.disabled}
          onClick={() => {
            this.enable()
          }}
        >
          <FaPause />
        </Button>
        <Button
          // className='rounded-r-lg'
          disabled={this.state.stepDisabled || this.props.disabled}
          onClick={() => {
            this.state.stepResolve()
          }}
        >
          <FaStepForward className='align-middle' />
        </Button>
      </ButtonGroup>
    )
  }

  async componentDidMount() {
    while (true) {
      await this.props.anim(this.waiter.bind(this))
      this.enable()
    }
  }

  disable() {
    this.setState({
      playDisabled: true,
      pauseDisabled: true,
      stepDisabled: true,
    })
  }

  enable() {
    this.setState({
      playDisabled: false,
      pauseDisabled: true,
      stepDisabled: false,
    })
  }
}
