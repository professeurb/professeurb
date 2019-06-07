import React, { Component } from 'react'
import SortBox from './SortBox.js'
import range from 'lodash/range'

export default class SelectSortBox extends Component {
  async selectSort(sync, change) {
    let cardVals = []

    await change(cards => {
      return range(cards.length).map(index => {
        cardVals.push(cards[index].value)
        return {
          ...cards[index],
          left: 97 + index * 58,
          top: 125,
        }
      })
    }, 400)

    // console.log(cardVals)

    await sync()

    for (let i = 0; i < 13; i++) {
      let curr = i

      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index],
            top: index === i ? 65 : cards[index].top,
          }
        })
      }, 400)

      await sync()

      for (let j = i + 1; j < 13; j++) {
        await change(cards => {
          return range(cards.length).map(index => {
            return {
              ...cards[index],
              top: index === j ? 65 : cards[index].top,
            }
          })
        }, 400)

        await sync()

        if (cardVals[curr] > cardVals[j]) {
          curr = j
        }

        await change(cards => {
          return range(cards.length).map(index => {
            return {
              ...cards[index],
              top: index >= i ? (index === curr ? 65 : 125) : 145,
            }
          })
        }, 400)
      }

      // On a la prochaîne carte, c'est curr.

      if (i !== curr) {
        console.log(i, curr)
        console.log(cardVals)

        cardVals[curr] = cardVals[i]

        await change(cards => {
          return range(cards.length).map(index => {
            return {
              ...cards[index],
              top: index === curr ? 15 : cards[index].top,
            }
          })
        }, 400)

        console.log('A')

        await sync()

        await change(cards => {
          return range(cards.length).map(index => {
            return {
              ...cards[index === i ? curr : index === curr ? i : index],
              left:
                index === i || index === curr
                  ? 97 + curr * 58
                  : cards[index].left,
            }
          })
        }, 300 + 50 * Math.abs(curr - i))

        await sync()
      }

      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index],
            left: index === i ? 60 * i + 37 : cards[index].left,
            top: index === i ? 145 : cards[index].top,
            zIndex: index === i ? 8 : 1,
          }
        })
      }, 300 + 50 * Math.abs(1 + curr - i))

      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index],
            zIndex: 1,
          }
        })
      }, 0)
    }
  }

  render() {
    return <SortBox {...this.props} sort={this.selectSort.bind(this)} />
  }
}
