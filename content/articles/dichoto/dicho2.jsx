import React, { Component } from 'react'
import SortBox from '@components/animation/SortBox.jsx'
import Mat from '@components/animation/Mat.jsx'
import { AnimButton } from '@components/animation/AnimButton.jsx'
import range from 'lodash/range'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Card from 'react-bootstrap/Card'

export default class DichoBox extends Component {
  async binarySearch(sync, change) {
    let cardVals = []
    let a = 1
    let b = 0

    await change(cards => {
      b = cards.length - 1
      return cards.map((card, index) => {
        cardVals.push(card.value)
        return {
          ...card,
          top: index >= 1 ? 120 : 10,
          opacity: 1,
        }
      })
    }, 400)

    while (a <= b) {
      await sync()

      let m = Math.floor((a + b) / 2)

      await change(
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
        await change(
          cards =>
            cards.map((card, index) =>
              index >= a && index <= b && index !== m
                ? {
                    ...card,
                    top: 145,
                    opacity: 0.5,
                  }
                : card,
            ),
          400,
        )
        b = a - 1
      } else {
        if (cardVals[m] < cardVals[0]) {
          await change(
            cards =>
              cards.map((card, index) => {
                if (index >= a && index <= m) {
                  return {
                    ...card,
                    top: 145,
                    opacity: 0.5,
                  }
                } else {
                  return card
                }
              }),
            400,
          )
          a = m + 1
        } else {
          await change(
            cards =>
              cards.map((card, index) => {
                if (index >= m && index <= b) {
                  return {
                    ...card,
                    top: 145,
                    opacity: 0.5,
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
  }

  render() {
    return <SortBox {...this.props} sort={this.binarySearch.bind(this)} />
  }
}
