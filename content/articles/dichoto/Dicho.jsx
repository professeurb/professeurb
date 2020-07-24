import React, { Component } from 'react'
import { AnimButton } from '@components/animation/AnimButton.jsx'
import Carte from '@components/animation/Carte.jsx'
import range from 'lodash/range'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import anime from 'animejs'

export default class DichoBox extends Component {
  generateCards(count) {
    let cards = []
    let cnt = 1
    range(count).forEach(i => {
      cnt = cnt + 1 + Math.floor(Math.random() * 1.6)
      let card = {
        id: i,
        top: 145,
        left: 17 + 51 * (i - 1),
        zIndex: 1,
        rotate: 1 - 2 * Math.random(),
        value: cnt,
        color: '#000',
        duration: 100,
        delay: i * 10,
        visible: true,
      }
      cards.push(card)
    })
    cards[0].left = 15
    cards[0].top = 10
    cards[0].rotate = 8
    cards[0].zIndex = 2

    cards[0].value =
      cards[1].value +
      Math.floor(Math.random() * (cards[count - 1].value - cards[1].value))

    return cards
  }

  constructor(props) {
    super(props)

    this.count = props.countOfCards

    this.state = {
      animButtonDisabled: false,
      shuffleButtonDisabled: false,
      cards: this.generateCards(this.count),
    }
  }

  async animState(newState, duration) {
    this.setState({ ...newState })
    await new Promise(resolve => {
      anime({ duration: duration, complete: resolve })
    })
  }

  async change(cardChanger, duration) {
    await this.animState({ cards: cardChanger(this.state.cards) }, duration)
  }

  async binarySearch(sync) {
    let change = this.change.bind(this)
    await sync()

    this.setState({
      shuffleButtonDisabled: true,
    })

    let cardVals = []
    let a = 1
    let b = this.state.cards.length - 1

    this.state.cards.forEach((card, _) => {
      cardVals.push(card.value)
    })

    await change(cards => {
      return cards.map((card, index) => {
        return index == 0
          ? {
              ...card,
              top: 10,
              rotate: 10,
              color: '#000',
              duration: 400,
            }
          : { ...card, top: 120, color: '#000', duration: 300 }
      })
    }, 400)

    while (a <= b) {
      await sync()

      let m = Math.floor((a + b) / 2)

      await this.change(
        cards =>
          cards.map((card, index) => {
            return {
              ...card,
              top: index === m ? 80 : card.top,
            }
          }),
        400,
      )

      await sync()

      if (cardVals[m] === cardVals[0]) {
        await this.change(
          cards =>
            cards.map((card, index) =>
              index >= a && index <= b && index !== m
                ? {
                    ...card,
                    top: 145,
                    color: '#AAA',
                  }
                : card,
            ),
          400,
        )
        b = a - 1
      } else {
        if (cardVals[m] < cardVals[0]) {
          await this.change(
            cards =>
              cards.map((card, index) => {
                if (index >= a && index <= m) {
                  return {
                    ...card,
                    top: 145,
                    color: '#AAA',
                  }
                } else {
                  return card
                }
              }),
            400,
          )
          a = m + 1
        } else {
          await this.change(
            cards =>
              cards.map((card, index) => {
                if (index >= m && index <= b) {
                  return {
                    ...card,
                    top: 145,
                    color: '#AAA',
                  }
                } else {
                  return card
                }
              }),
            400,
          )
          b = m - 1
        }
      }
    }

    this.setState({
      shuffleButtonDisabled: false,
    })
  }

  async renew() {
    this.setState({
      animButtonDisabled: true,
      shuffleButtonDisabled: true,
    })

    await this.change(
      cards =>
        cards.map((card, index) => {
          return {
            ...card,
            visible: false,
          }
        }),
      200,
    )

    this.setState({ cards: [] })
    await new Promise(resolve => {
      anime({ duration: 400, complete: resolve })
    })

    this.setState({
      animButtonDisabled: false,
      shuffleButtonDisabled: false,

      cards: this.generateCards(this.count),
    })
  }

  render() {
    return (
      <Card className='cardtainer' style={{ width: 691 }}>
        <Card.Body
          style={{
            height: 227,
          }}
        >
          {this.state.cards.map(card => (
            <Carte {...card} key={card.id} />
          ))}
        </Card.Body>
        <Card.Footer>
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                onClick={this.renew.bind(this)}
                disabled={this.state.shuffleButtonDisabled}
              >
                Nouvelles valeurs
              </Button>
            </ButtonGroup>
            <AnimButton
              name='Recherche'
              anim={this.binarySearch.bind(this)}
              disabled={this.state.animButtonDisabled}
            />
          </ButtonToolbar>
        </Card.Footer>
      </Card>
    )
  }
}
