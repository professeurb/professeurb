import React, { Component } from "react";
import SortBox from "./SortBox.js";
import range from "lodash/range";

export default class MergeSortBox extends Component {
  async mergeSort(sync, change) {
    let cardVals = [];

    await change((cards) => {
      return range(cards.length).map((index) => {
        cardVals.push(cards[index].value);
        return {
          ...cards[index],
          top: 125,
        };
      });
    }, 400);

    async function merge(left, right, first, laster) {
      const n = laster - first;
      const half = Math.floor(n / 2 + 0.75);
      const m = (right - left + 2 - 57 * n) / 2;

      let i = first;
      let j = first + half;
      let pos = 0;
      let tmp = [];

      await change((cards) => {
        return range(cards.length).map((index) => {
          return {
            ...cards[index],
            top:
              index >= first && index < laster
                ? index === i || index === j
                  ? 95
                  : 115
                : 125,
            zIndex: index === i || index === j ? 8 : 1,
          };
        });
      }, 400);

      await sync();

      while (i < first + half && j < laster) {
        if (cardVals[i] <= cardVals[j]) {
          await change((cards) => {
            return range(cards.length).map((index) => {
              return {
                ...cards[index],
                left: index === i ? left + m + 57 * pos : cards[index].left,
                top: index === i ? 15 : cards[index].top,
                zIndex: index === i ? 4 : cards[index].zIndex,
              };
            });
          }, 300 + 50 * Math.abs(i - pos - first));

          tmp.push(i);
          i++;

          if (i < first + half) {
            await change((cards) => {
              return range(cards.length).map((index) => {
                return {
                  ...cards[index],
                  top: index === i ? 95 : cards[index].top,
                  zIndex: index === i || index === j ? 8 : 1,
                };
              });
            }, 400);
          }
        } else {
          await change((cards) => {
            return range(cards.length).map((index) => {
              return {
                ...cards[index],
                left: index === j ? left + m + 57 * pos : cards[index].left,
                top: index === j ? 15 : cards[index].top,
                zIndex: index === j ? 4 : cards[index].zIndex,
              };
            });
          }, 300 + 50 * Math.abs(j - pos - first));

          tmp.push(j);
          j++;

          if (j < laster) {
            await change((cards) => {
              return range(cards.length).map((index) => {
                return {
                  ...cards[index],
                  top: index === j ? 95 : cards[index].top,
                  zIndex: index === i || index === j ? 8 : 1,
                };
              });
            }, 400);
          }
        }

        await sync();

        pos++;
      }

      if (i < first + half) {
        while (i < first + half) {
          await change((cards) => {
            return range(cards.length).map((index) => {
              return {
                ...cards[index],
                left: index === i ? left + m + 57 * pos : cards[index].left,
                top: index === i ? 15 : cards[index].top,
                zIndex: index === i ? 8 : 1,
              };
            });
          }, 200 + 50 * Math.abs(i - pos - first));

          tmp.push(i);
          i++;
          pos++;
        }
      } else {
        // j < r
        while (j < laster) {
          await change((cards) => {
            return range(cards.length).map((index) => {
              return {
                ...cards[index],
                left: index === j ? left + m + 57 * pos : cards[index].left,
                top: index === j ? 15 : cards[index].top,
                zIndex: index === j ? 8 : 1,
              };
            });
          }, 200 + 50 * Math.abs(j - pos - first));

          tmp.push(j);
          j++;
          pos++;
        }
      }

      // On redescend le tout

      let cardVals2 = cardVals.slice();

      for (let i = 0; i < n; i++) {
        cardVals[first + i] = cardVals2[tmp[i]];
      }

      await change((cards) => {
        return range(cards.length).map((index) => {
          let ii =
            index >= first && index < laster ? tmp[index - first] : index;
          return {
            ...cards[ii],
            top: n < 13 ? 125 : 145,
            zIndex: 1,
            left: n < 13 ? cards[ii].left : 60 * index + 37,
          };
        });
      }, 400);
    }

    async function aux(left, right, first, laster) {
      const n = laster - first;

      if (n <= 1) return;

      const half = Math.floor(n / 2 + 0.75);
      const m = (right - left + 2 - 57 * n) / 2;
      const mid = left + m + 57 * half - 2;

      await change((cards) => {
        return range(cards.length).map((index) => {
          return {
            ...cards[index],
            left:
              index >= first && index < first + half
                ? left + m / 2 + 57 * (index - first)
                : index >= first + half && index < laster
                ? mid + m / 2 + 57 * (index - first - half)
                : cards[index].left,
          };
        });
      }, 400);

      if (n > 2) {
        await sync();
      }

      await aux(left, mid, first, first + half);
      await aux(mid, right, first + half, laster);

      await merge(left, right, first, laster);
    }

    await aux(0 - 20, 849 + 20, 0, 13);
  }

  render() {
    return <SortBox {...this.props} sort={this.mergeSort.bind(this)} />;
  }
}
