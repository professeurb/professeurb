import React, { Component } from 'react'
import SortBox from './SortBox.js'
import range from 'lodash/range'

export default class TimSortBox extends Component {
  async timSort(sync, change) {
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

    async function merge(left, right, first, mid, laster) {
      const n = laster - first
      const m = (right - left + 2 - 57 * n) / 2

      let i = first
      let j = mid
      let pos = 0
      let tmp = []

      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index],
            top:
              index >= first && index < laster
                ? index === i || index === j
                  ? 95
                  : 115
                : 125,
            zIndex: index === i || index === j ? 8 : 1,
          }
        })
      }, 400)

      await sync()

      while (i < mid && j < laster) {
        if (cardVals[i] <= cardVals[j]) {
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                left: index === i ? left + m + 57 * pos : cards[index].left,
                top: index === i ? 15 : cards[index].top,
                zIndex: index === i ? 4 : cards[index].zIndex,
              }
            })
          }, 300 + 50 * Math.abs(i - pos - first))

          tmp.push(i)
          i++

          if (i < mid) {
            await change(cards => {
              return range(cards.length).map(index => {
                return {
                  ...cards[index],
                  top: index === i ? 95 : cards[index].top,
                  zIndex: index === i || index === j ? 8 : 1,
                }
              })
            }, 400)
          }
        } else {
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                left: index === j ? left + m + 57 * pos : cards[index].left,
                top: index === j ? 15 : cards[index].top,
                zIndex: index === j ? 4 : cards[index].zIndex,
              }
            })
          }, 300 + 50 * Math.abs(j - pos - first))

          tmp.push(j)
          j++

          if (j < laster) {
            await change(cards => {
              return range(cards.length).map(index => {
                return {
                  ...cards[index],
                  top: index === j ? 95 : cards[index].top,
                  zIndex: index === i || index === j ? 8 : 1,
                }
              })
            }, 400)
          }
        }

        await sync()

        pos++
      }

      if (i < mid) {
        while (i < mid) {
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                left: index === i ? left + m + 57 * pos : cards[index].left,
                top: index === i ? 15 : cards[index].top,
                zIndex: index === i ? 8 : 1,
              }
            })
          }, 200 + 50 * Math.abs(i - pos - first))

          tmp.push(i)
          i++
          pos++
        }
      } else {
        // j < r
        while (j < laster) {
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                left: index === j ? left + m + 57 * pos : cards[index].left,
                top: index === j ? 15 : cards[index].top,
                zIndex: index === j ? 8 : 1,
              }
            })
          }, 200 + 50 * Math.abs(j - pos - first))

          tmp.push(j)
          j++
          pos++
        }
      }

      // On redescend le tout

      let cardVals2 = cardVals.slice()

      for (let i = 0; i < n; i++) {
        cardVals[first + i] = cardVals2[tmp[i]]
      }

      await change(cards => {
        return range(cards.length).map(index => {
          let ii = index >= first && index < laster ? tmp[index - first] : index
          return {
            ...cards[ii],
            top: n < 13 ? 125 : 145,
            zIndex: 1,
            left: n < 13 ? cards[ii].left : 60 * index + 37,
          }
        })
      }, 400)
    }

    async function nextSlice(pos) {
      let first = pos
      let laster = pos + 1
      let left = 67 * first - 11
      let right = left + 67
      let n = 1
      let m = (right - left + 2 - 57 * n) / 2
      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index],
            left:
              index === laster - 1
                ? left + m + 57 * (laster - first - 1)
                : cards[index].left,
          }
        })
      }, 400)
      if (
        laster < cardVals.length &&
        cardVals[laster - 1] <= cardVals[laster]
      ) {
        while (
          laster < cardVals.length &&
          cardVals[laster - 1] <= cardVals[laster]
        ) {
          laster += 1
          right += 67
          n += 1
          m = (right - left + 2 - 57 * n) / 2
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                left:
                  index >= first && index <= laster - 1
                    ? left + m + 57 * (index - first)
                    : cards[index].left,
              }
            })
          }, 400)
        }
      } else if (
        laster < cardVals.length &&
        cardVals[laster - 1] > cardVals[laster]
      ) {
        while (
          laster < cardVals.length &&
          cardVals[laster - 1] > cardVals[laster]
        ) {
          laster += 1
          right += 67
          n += 1
          m = (right - left + 2 - 57 * n) / 2
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                left:
                  index >= first && index <= laster - 1
                    ? left + m + 57 * (index - first)
                    : cards[index].left,
              }
            })
          }, 400)
        }
        // we reverse a decreasing run
        let a = pos
        let b = laster - 1
        while (a < b) {
          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                top: index === b ? 15 : cards[index].top,
              }
            })
          }, 400)

          await change(cards => {
            return range(cards.length).map(index => {
              if (index === a) {
                return cards[b]
              }
              if (index === b) {
                return { ...cards[a], left: left + m + 57 * (b - first) }
              }
              return cards[index]
            })
          }, 400)

          await change(cards => {
            return range(cards.length).map(index => {
              return {
                ...cards[index],
                top: index === a ? 125 : cards[index].top,
                left:
                  index === a ? left + m + 57 * (a - first) : cards[index].left,
              }
            })
          }, 400)

          let tmp = cardVals[a]
          cardVals[a] = cardVals[b]
          cardVals[b] = tmp

          a++
          b--
        }
      }
      return laster
    }

    let hasMerged = false
    let pos = 0
    let slices = [0]
    while (pos < cardVals.length) {
      pos = await nextSlice(pos)
      console.log(slices, pos)
      while (
        slices.length >= 2 &&
        (pos - slices[slices.length - 1] >=
          slices[slices.length - 1] - slices[slices.length - 2] ||
          (slices.length >= 3 &&
            pos - slices[slices.length - 2] >=
              slices[slices.length - 2] - slices[slices.length - 3]))
      ) {
        let left = 67 * slices[slices.length - 2] - 11
        let right = 67 * pos - 11
        // console.log(
        //   'Merge',
        //   slices[slices.length - 2],
        //   slices[slices.length - 1],
        //   pos,
        //   slices
        // )
        await merge(
          left,
          right,
          slices[slices.length - 2],
          slices[slices.length - 1],
          pos
        )
        hasMerged = true
        slices.pop()
      }

      slices.push(pos)
    }

    pos = slices.pop()
    while (slices.length >= 2) {
      let left = 67 * slices[slices.length - 2] - 11
      let right = 67 * pos - 11
      //   console.log(
      //     'Merge',
      //     slices[slices.length - 2],
      //     slices[slices.length - 1],
      //     pos,
      //     slices
      //   )
      await merge(
        left,
        right,
        slices[slices.length - 2],
        slices[slices.length - 1],
        pos
      )
      slices.pop()
      hasMerged = true
    }

    if (!hasMerged) {
      await change(cards => {
        return range(cards.length).map(index => {
          return {
            ...cards[index],
            top: 145,
            zIndex: 1,
            left: 60 * index + 37,
          }
        })
      }, 400)
    }
  }

  render() {
    return <SortBox {...this.props} sort={this.timSort.bind(this)} />
  }
}
