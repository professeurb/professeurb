import React, { Component } from 'react'
import SortBox from './SortBox.js'
import range from 'lodash/range'

export default class InsertSortBox extends Component {
  async insertSort(sync, change) {
    let cardVals = []

    await change(cards => {
      return range(cards.length).map(index => {
        cardVals.push(cards[index].value)
        return {
          ...cards[index],
          left: index === 0 ? 37 : 97 + index * 58,
          top: index === 0 ? 145 : 125,
          zIndex: 1,
        }
      })
    }, 400)

    await sync()

    for (let i = 1; i < 13; i++) {
      let x = cardVals[i]

      await change(cards => {
        return range(cards.length).map(index => {
          cardVals.push(cards[index].value)
          return {
            ...cards[index],
            top: index === i ? 65 : cards[index].top,
            zIndex: 1,
          }
        })
      }, 400)

      await sync()

      let j = i - 1

      while (j >= 0 && cardVals[j] > x) {
        cardVals[j + 1] = cardVals[j]

        await change(cards => {
          return range(cards.length).map(index => {
            cardVals.push(cards[index].value)
            return {
              ...cards[index],
              left: index === j ? 60 * (j + 1) + 37 : cards[index].left,
            }
          })
        }, 600)

        await sync()

        j--
      }

      j++

      cardVals[j] = x

      console.log(cardVals)

      await change(cards => {
        return range(cards.length).map(index => {
          let ii
          if (index < j) {
            ii = index
          } else if (index === j) {
            ii = i
          } else if (index <= i) {
            ii = index - 1
          } else {
            ii = index
          }
          return {
            ...cards[ii],
            zIndex: index === j ? 8 : 1,
            left: index === j ? 60 * index + 37 : cards[ii].left,
            top: index <= i ? 145 : 125,
          }
        })
      }, 300 + 50 * Math.abs(1 + i - j))
    }
  }

  render() {
    return <SortBox {...this.props} sort={this.insertSort.bind(this)} />
  }
}
