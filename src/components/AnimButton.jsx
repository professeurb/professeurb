import React from 'react'
import { Control, Button } from 'bloomer'
import { FaPlay, FaPause, FaStepForward } from 'react-icons/fa'

export class AnimButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // anim: props.anim,
      playDisabled: false,
      pauseDisabled: true,
      stepDisabled: false,
      playResolve: () => { },
      stepResolve: () => { },
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
      <Control>
        <div className="buttons has-addons">
          {this.props.name &&
            <Button
              disabled={this.state.playDisabled || this.props.disabled}
              onClick={() => {
                this.state.playResolve()
              }}
            >
              {this.props.name}
            </Button>}
          <Button
            disabled={this.state.playDisabled || this.props.disabled}
            onClick={() => {
              this.state.playResolve()
            }}
          >
            <FaPlay />
          </Button>
          <Button
            disabled={this.state.pauseDisabled || this.props.disabled}
            onClick={() => {
              this.enable()
            }}
          >
            <FaPause />
          </Button>
          <Button
            disabled={this.state.stepDisabled || this.props.disabled}
            onClick={() => {
              this.state.stepResolve()
            }}
          >
            <FaStepForward />
          </Button>
        </div>
      </Control>
    )
  }

  async componentDidMount() {
    while (true) {
      await this.props.anim(this.waiter.bind(this))
      // await this.waiter()
      // for (let i = 0; i < 10; i++) {
      //   console.log(i)
      //   await new Promise(resolve => setTimeout(resolve, 1000))
      //   await this.waiter()
      // }
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
