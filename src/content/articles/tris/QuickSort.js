import React, { Component } from 'react'
import SortBox from './SortBox.js'
import range from 'lodash/range'

export default class QuickSortBox extends Component {
  async quickSort(sync, change) {
    let cardVals = []

    await change(cards => {
      return range(cards.length).map(index => {
        cardVals.push(cards[index].value)
        return {
          ...cards[index],
        }
      })
    }, 0)

    async function aux(left, right, first, laster) {
      //   console.log('Aaa', first, laster)
      const n = laster - first

      if (n <= 1) {
        // console.log('G')
        await change(cards => {
          return range(cards.length).map(index => {
            return {
              ...cards[index],
              left: index === first ? left : cards[index].left,
              top: index === first ? 145 : cards[index].top,
            }
          })
        }, 100)

        await sync()

        return
      }

      let leftTight = left + 55 + (4 - left - 57 * n + right) / 2
      // left + 55 + (right - left - 55 - (n - 1) * 55 - 2 * (n - 2)) / 2

      // Select pivot

      let pivot = cardVals[first]

      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index],
            top:
              index > first && index < laster
                ? 95
                : index === first
                ? 15
                : cards[index].top,
            left:
              index > first && index < laster
                ? leftTight + 57 * (index - first - 1)
                : index === first
                ? left
                : cards[index].left,
            zIndex: index === first ? 8 : cards[index].zIndex,
          }
        })
      }, 400)

      let posLeft = first + 1
      let posRight = laster

      // Invariant:
      // posLeft - 1 is empty
      // everything < posLeft - 1 is smaller than the pivot
      // everything >= posRight is greater than the pivot

      while (posLeft < posRight) {
        // First, we look at posLeft

        await change(cards => {
          return range(cards.length).map(index => {
            return {
              ...cards[index],
              top: index === posLeft ? 65 : cards[index].top,
            }
          })
        }, 400)

        await sync()

        while (posLeft < posRight && cardVals[posLeft] <= pivot) {
          cardVals[posLeft - 1] = cardVals[posLeft]
          await change(cards => {
            let newCards = range(cards.length).map(index => {
              if (index === posLeft - 1) {
                return {
                  ...cards[posLeft],
                  left: left + 57 * (posLeft - first - 1),
                  top: 125,
                  zIndex: 4,
                }
              }
              if (index === posLeft) {
                return cards[posLeft - 1]
              }
              return cards[index]
            })
            // console.log(newCards.map(card => card.value))
            return newCards
          }, 400)

          posLeft += 1

          if (posLeft < posRight) {
            await change(cards => {
              return range(cards.length).map(index => {
                return {
                  ...cards[index],
                  top: index === posLeft ? 65 : cards[index].top,
                }
              })
            }, 400)
          }

          await sync()
        }

        // console.log('A')

        // either posLeft == posRight
        // or posLeft < posRight && cards[posLeft] > pivot

        if (posLeft < posRight) {
          posRight -= 1

          while (posRight > posLeft) {
            // console.log('B')

            await change(cards => {
              return range(cards.length).map(index => {
                return {
                  ...cards[index],
                  top: index === posRight ? 65 : cards[index].top,
                }
              })
            }, 400)

            await sync()

            if (cardVals[posRight] > pivot) {
              await change(cards => {
                return range(cards.length).map(index => {
                  return {
                    ...cards[index],
                    left:
                      index === posRight
                        ? right - 60 - 57 * (laster - 1 - posRight)
                        : cards[index].left,
                    top: index === posRight ? 125 : cards[index].top,
                  }
                })
              }, 400)
              posRight -= 1
            } else {
              break
            }
          }

          //   console.log('C')

          // We have card at posLeft > pivot and
          // either posRight = posLeft or
          // card at posRight < pivot

          if (posLeft < posRight) {
            // console.log('D')
            cardVals[posLeft - 1] = cardVals[posRight]
            cardVals[posRight] = cardVals[posLeft]

            await change(cards => {
              return range(cards.length).map(index => {
                if (index === posRight) {
                  return {
                    ...cards[index],
                    left: left + 57 * (posLeft - first - 1),
                    top: 125,
                    zIndex: 6,
                  }
                }
                return {
                  ...cards[index],
                }
              })
            }, 300 + 50 * (posRight - posLeft + 1))

            await change(cards => {
              return range(cards.length).map(index => {
                if (index === posLeft - 1) {
                  return { ...cards[posRight], zIndex: 1 }
                }
                if (index === posLeft) {
                  return { ...cards[posLeft - 1] }
                }
                if (index === posRight) {
                  return {
                    ...cards[posLeft],
                    left: right - 60 - 57 * (laster - 1 - posRight),
                    top: 125,
                    zIndex: 6,
                  }
                }
                return { ...cards[index] }
              })
            }, 300 + 50 * (posRight - posLeft + 1))

            posLeft += 1
          } else {
            // posLeft === posRight
            // console.log('E', posLeft, posRight, pivot)
            await sync()
            await change(cards => {
              //   console.log(cards.map(card => card.value))
              return range(cards.length).map(index => {
                if (index === posLeft) {
                  return {
                    ...cards[posLeft],
                    left: right - 60 - 57 * (laster - 1 - posRight),
                    top: 125,
                  }
                }
                return { ...cards[index] }
              })
            }, 400)
          }
        }
      }

      //   console.log('F')
      await change(cards => {
        return range(cards.length).map(index => {
          if (index === posLeft - 1) {
            return {
              ...cards[index],
              left: left + 60 * (posLeft - 1 - first),
              top: 145,
              zIndex: 8,
            }
          }
          return { ...cards[index], zIndex: 1 }
        })
      }, 300 + 50 * (posLeft - 1 - first))

      await sync()

      await aux(left, left + 60 * (posLeft - 1 - first), first, posLeft - 1)
      await aux(left + 60 * (posLeft - first), right, posLeft, laster)
    }

    await aux(37, 60 * 13 + 37, 0, 13)
  }

  render() {
    return <SortBox {...this.props} sort={this.quickSort.bind(this)} />
  }
}
