import React, { Component } from 'react'
import Mat from './Mat.js'
import { AnimButton } from 'components/AnimButton.jsx'
import { Button, Control } from 'bloomer'
// import './tris.css'
import range from 'lodash/range'

function generateCards (len = 50) {
  let cards = []
  let cnt = 1

  range(len).forEach(i => {
    cnt = cnt + Math.floor(Math.random() * 6)
    let card = {
      id: i,
      top: 145,
      left: 60 * i + 37,
      zIndex: 1,
      rotate: 0,
      value: cnt,
      pos: '',
    }
    cards.push(card)
  })

  // pre-shuffle cards
  for (let i = cards.length - 1; i >= 1; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    if (j < i) {
      // exchange cards
      let x = cards[i]
      cards[i] = cards[j]
      cards[j] = x
      // exchange positions
      x = cards[i].left
      cards[i].left = cards[j].left
      cards[j].left = x
    }
  }

  return cards
}

export default class SortBox extends Component {
  constructor (props) {
    super(props)

    this.count = props.countOfCards

    // console.log("Count of Cards", this.count, props)

    this.state = {
      animButtonDisabled: false,
      shuffleButtonDisabled: false,
      cards: generateCards(this.count),
      duration: 1000,
      animate: true,
      resolve: () => {},
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

  async change(cardChanger, duration) {
    await this.animState({ cards: cardChanger(this.state.cards) }, duration)
  }

  async anim(waiter) {
    await waiter()
    await this.animState(
      {
        shuffleButtonDisabled: true,
        animate: false,
        cards: range(this.count).map(index => {
          return {
            ...this.state.cards[index],
            pos: index + 1,
          }
        }),
      },
      0
    )
    await this.props.sort(waiter, this.change.bind(this))
  }

  async shuffle() {
    await this.animState(
      {
        animButtonDisabled: true,
        animate: false,
        cards: range(this.count).map(index => {
          return {
            ...this.state.cards[index],
            pos: '',
          }
        }),
      },
      0
    )

    for (let i = this.count - 1; i >= 1; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      if (j < i) {
        await this.animState(
          {
            cards: range(this.count).map(index => {
              return {
                ...this.state.cards[index],
                top: i === index ? 45 : this.state.cards[index].top,
              }
            }),
          },
          100
        )

        await this.animState(
          {
            cards: range(this.count).map(index => {
              return {
                ...this.state.cards[index],
                left: j === index ? 60 * i + 37 : this.state.cards[index].left,
                zIndex: j === index ? 8 : 1,
              }
            }),
          },
          50 + 25 * Math.abs(1 + i - j)
        )

        await this.animState(
          {
            cards: range(this.count).map(index => {
              return {
                ...this.state.cards[index],
                top: 145,
                left: i === index ? 60 * j + 37 : this.state.cards[index].left,
                zIndex: i === index ? 8 : 1,
              }
            }),
          },
          50 + 25 * Math.abs(2 + i - j)
        )

        this.setState({
          animate: false,
          cards: range(this.count).map(index => {
            if (i === index) {
              return {
                ...this.state.cards[j],
                // pos: index
              }
            }
            if (j === index) {
              return {
                ...this.state.cards[i],
                zIndex: 1,
                // pos: index
              }
            }
            return {
              ...this.state.cards[index],
              // pos: index
            }
          }),
        })
      }
    }

    this.setState({
      animButtonDisabled: false,
      animate: false,
      cards: range(this.count).map(index => {
        return {
          ...this.state.cards[index],
          pos: index + 1,
        }
      }),
    })
  }

  render() {
    // console.log(this.count)
    return (
      <>
        <Mat
          cards={this.state.cards}
          duration={this.state.duration}
          animate={this.state.animate}
          resolve={this.state.resolve}
        />
        <div className="field is-grouped">
          <Control>
            <Button
              onClick={this.shuffle.bind(this)}
              disabled={this.state.shuffleButtonDisabled}
            >
              Mélanger
            </Button>
          </Control>
          <AnimButton
            name="Trier"
            anim={this.anim.bind(this)}
            disabled={this.state.animButtonDisabled}
          />
        </div>
      </>
    )
  }
}
