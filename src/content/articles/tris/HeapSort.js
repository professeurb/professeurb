import React, { Component } from 'react'
import SortBox from './SortBox.js'
import range from 'lodash/range'

export default class HeapSortBox extends Component {
  async heapSort(sync, change) {
    let cardVals = []

    await change(cards => {
      return range(cards.length).map(index => {
        cardVals.push(cards[index].value)
        return {
          ...cards[index],
        }
      })
    }, 0)

    // console.log(cardVals.length)

    // 0 1,2 3,4,5,6 7,8,9,10,11,12,13
    // 145 125 105 85

    // Initial positions

    let cardtop = 5
    for (let i = 0; i < cardVals.length; i = 2 * i + 1) {
      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index],
            left: cards[index].left - (index >= i && index <= 2 * i ? 20 : 0),
            top: index >= i && index <= 2 * i ? cardtop : cards[index].top,
          }
        })
      }, 400)
      cardtop += 45
      //   console.log(i)
    }

    console.log(range(cardVals.length))
    console.log(range(cardVals.length).map(i => Math.floor((i + 1) / 2) - 1))

    // siftUp

    for (let i = 1; i < cardVals.length; i++) {
      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index],
            top: cards[index].top - (index === i ? 20 : 0),
          }
        })
      }, 400)

      await sync()

      let a = i
      while (a > 0) {
        let b = Math.floor((a + 1) / 2) - 1
        await change(
          cards =>
            range(cards.length).map(index => ({
              ...cards[index],
              top: cards[index].top - (index === b ? 20 : 0),
            })),
          400
        )

        await sync()

        if (cardVals[b] < cardVals[a]) {
          let tmp = cardVals[a]
          cardVals[a] = cardVals[b]
          cardVals[b] = tmp
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index === a ? b : index === b ? a : index],
                zIndex: index === a ? 1 : index === b ? 2 : 0,
                top:
                  index === a
                    ? cards[a].top + 20
                    : index === b
                    ? cards[b].top + (index === 0 ? 20 : 0)
                    : cards[index].top,
                left:
                  index === a
                    ? cards[a].left
                    : index === b
                    ? cards[b].left
                    : cards[index].left,
              }
            })
          }, 1000)
        } else {
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                top: cards[index].top + (index === a || index === b ? 20 : 0),
              }
            })
          }, 400)
          break
        }

        await sync()

        a = b
      }
    }

    // siftDown

    let pos = cardVals.length - 1
    while (pos > 0) {
      // We exchange extremal cards

      let tmp = cardVals[0]
      cardVals[0] = cardVals[pos]
      cardVals[pos] = tmp
      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index === 0 ? pos : index === pos ? 0 : index],
            zIndex: index === 0 ? 1 : index === pos ? 2 : 0,
            top:
              index === 0
                ? cards[0].top - 20
                : index === pos
                ? 145
                : cards[index].top,
            left:
              index === 0
                ? cards[0].left
                : index === pos
                ? cards[pos].left + 20
                : cards[index].left,
          }
        })
      }, 1000)

      await sync()

      // we do the sifting down

      let a = 0
      let b = 1
      while (b < pos) {
        let curr = a
        await change(cards => {
          return range(cards.length).map(index => {
            return {
              ...cards[index],
              top: cards[index].top - (index === b ? 20 : 0),
            }
          })
        }, 400)

        await sync()

        if (cardVals[a] < cardVals[b]) {
          curr = b
        } else {
          // b down
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                top: cards[index].top + (index === b ? 20 : 0),
              }
            })
          }, 400)
        }

        await sync()

        if (b + 1 < pos) {
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                top: cards[index].top - (index === b + 1 ? 20 : 0),
              }
            })
          }, 400)

          await sync()

          if (cardVals[curr] < cardVals[b + 1]) {
            if (b === curr) {
              await change(cards => {
                return range(cards.length).map(index => {
                  return {
                    ...cards[index],
                    top: cards[index].top + (index === b ? 20 : 0),
                  }
                })
              }, 400)
            }
            curr = b + 1
          } else {
            await change(cards => {
              return range(cards.length).map(index => {
                return {
                  ...cards[index],
                  top: cards[index].top + (index === b + 1 ? 20 : 0),
                }
              })
            }, 400)
          }

          await sync()
        }

        if (a === curr) {
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                top: cards[index].top + (index === a ? 20 : 0),
              }
            })
          }, 400)

          break
        }

        let tmp = cardVals[a]
        cardVals[a] = cardVals[curr]
        cardVals[curr] = tmp
        await change(cards => {
          return range(cards.length).map(index => {
            return {
              ...cards[index === a ? curr : index === curr ? a : index],
              zIndex: index === a ? 1 : index === curr ? 2 : 0,
              top:
                index === a
                  ? cards[a].top + 20
                  : index === curr
                  ? cards[curr].top + (index === a ? 20 : 0)
                  : cards[index].top,
              left:
                index === a
                  ? cards[a].left
                  : index === curr
                  ? cards[curr].left
                  : cards[index].left,
            }
          })
        }, 1000)

        await sync()

        a = curr
        b = 2 * a + 1
      }
      if (b >= pos) {
        await change(cards => {
          return range(cards.length).map(index => {
            return {
              ...cards[index],
              top: cards[index].top + (index === a ? 20 : 0),
            }
          })
        }, 400)
      }
      pos -= 1
    }

    await change(cards => {
      return range(cards.length).map(index => {
        return {
          ...cards[index],
          left: cards[index].left + (index === 0 ? 20 : 0),
          top: index === 0 ? 145 : cards[index].top,
        }
      })
    }, 400)
  }

  render() {
    return <SortBox {...this.props} sort={this.heapSort.bind(this)} />
  }
}
