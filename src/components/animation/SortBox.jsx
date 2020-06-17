import React, { Component } from 'react'
import Mat from '@components/animation/Mat.jsx'
import { AnimButton } from '@components/animation/AnimButton.jsx'
import range from 'lodash/range'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Card from 'react-bootstrap/Card'

class Carte extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Card
        className='text-center p-1'
        style={{
          position: 'absolute',
          width: 55,
          height: 90,
          border: '1px solid',
          borderRadius: 10,
          margin: 0,
          padding: '5 !important',
          backgroundColor: '#fff',
          left: this.props.left,
          top: this.props.top,
          transform:
            'translateX(0px) translateY(0px) rotate(' +
            this.props.rotate +
            'deg)',
          zIndex: this.props.zIndex,
          opacity: this.props.opacity,
        }}
        ref={this.props.cardRef}
      >
        <Card.Body style={{ padding: 5 }}>
          <p>{this.props.value}</p>
        </Card.Body>
        {/* <h1
          style={{
            marginTop: 5,
            fontFamily: 'Oswald',
            textAlign: 'center',
            fontSize: '20pt',
            fontWeight: this.props.weight,
            color: this.props.color,
          }}
        >
          {this.props.value}
        </h1> */}
      </Card>
    )
  }
}

function generateCards(len = 50) {
  let cards = []
  let cnt = 1

  range(len).forEach(i => {
    cnt = cnt + Math.floor(Math.random() * 3)
    let card = {
      id: i,
      top: 145,
      left: 60 * i + 37,
      zIndex: 1,
      rotate: 1 - 2 * Math.random(),
      value: cnt,
      opacity: 1,
      cardRef: React.createRef(),
      color: '#000000',
    }
    cards.push(card)
  })

  // pre-shuffle cards
  // for (let i = cards.length - 1; i >= 1; i--) {
  //   let j = Math.floor(Math.random() * (i + 1))
  //   if (j < i) {
  //     // exchange cards
  //     let x = cards[i]
  //     cards[i] = cards[j]
  //     cards[j] = x
  //     // exchange positions
  //     x = cards[i].left
  //     cards[i].left = cards[j].left
  //     cards[j].left = x
  //   }
  // }

  return cards
}

export default class SortBox extends Component {
  static defaultProps = {
    generator: generateCards,
    // shuffler: this.shuffle
  }

  constructor(props) {
    super(props)

    this.count = props.countOfCards

    this.state = {
      animButtonDisabled: false,
      shuffleButtonDisabled: false,
      cards: props.generator(this.count),
      duration: 1000,
      animate: true,
      resolve: () => {},
    }
  }

  async animState(newState, duration) {
    await new Promise(resolve => {
      // console.log(newState);
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
      0,
    )
    await this.props.sort(waiter, this.change.bind(this))
    this.setState({
      shuffleButtonDisabled: false,
    })
  }

  async shuffle() {
    await this.animState(
      {
        shuffleButtonDisabled: true,
        animButtonDisabled: true,
        animate: false,
        cards: range(this.count).map(index => {
          return {
            ...this.state.cards[index],
            pos: '',
            opacity: 1,
          }
        }),
      },
      0,
    )

    await this.animState(
      {
        cards: range(this.count).map(index => {
          return {
            ...this.state.cards[index],
            left: 60 * index + 37,
            top: 145,
          }
        }),
      },
      200,
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
          100,
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
          50 + 25 * Math.abs(1 + i - j),
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
          50 + 25 * Math.abs(2 + i - j),
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
      shuffleButtonDisabled: false,
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
    return (
      <>
        <Card className="cardtainer">
          <Card.Body>
            <Mat
              cards={this.state.cards.map(card => (
                <Carte {...card} key={card.id} />
              ))}
              duration={this.state.duration}
              animate={this.state.animate}
              resolve={this.state.resolve}
            />
          </Card.Body>
          <Card.Footer>
            <ButtonToolbar>
              <ButtonGroup>
                <Button
                  onClick={this.shuffle.bind(this)}
                  disabled={this.state.shuffleButtonDisabled}
                >
                  Mélanger
                </Button>
              </ButtonGroup>
              <AnimButton
                name='Sélectionner'
                anim={this.anim.bind(this)}
                disabled={this.state.animButtonDisabled}
              />
            </ButtonToolbar>
          </Card.Footer>
        </Card>
      </>
    )
  }
}
