import React, { Component } from "react";
import SortBox from "./SortBox.js";
import range from "lodash/range";

export default class DichoBox extends Component {
  async binarySearch(sync, change) {
    let cardVals = [];

    await change((cards) => {
      return range(cards.length).map((index) => {
        cardVals.push(cards[index].value);
        // console.log(index, cards[index].top)
        return {
          ...cards[index],
          top: index >= 1 ? 120 : 10,
          opacity: 1,
        };
      });
    }, 400);

    await sync();

    let a = 1;
    let b = 12;

    while (a <= b) {
      let m = Math.floor((a + b) / 2);

      await change((cards) => {
        return range(cards.length).map((index) => {
          cardVals.push(cards[index].value);
          return {
            ...cards[index],
            top: index === m ? 80 : cards[index].top,
          };
        });
      }, 400);

      await sync();

      if (cardVals[m] === cardVals[0]) {
        await change((cards) => {
          return range(cards.length).map((index) => {
            if (index >= a && index <= b && index !== m) {
              return {
                ...cards[index],
                top: 145,
                opacity: 0.5,
              };
            } else {
              return {
                ...cards[index],
              };
            }
          });
        }, 400);
        b = a - 1;
      } else {
        if (cardVals[m] < cardVals[0]) {
          await change((cards) => {
            return range(cards.length).map((index) => {
              if (index >= a && index <= m) {
                return {
                  ...cards[index],
                  top: 145,
                  opacity: 0.5,
                };
              } else {
                return {
                  ...cards[index],
                };
              }
            });
          }, 400);
          a = m + 1;
        } else {
          await change((cards) => {
            return range(cards.length).map((index) => {
              if (index >= m && index <= b) {
                return {
                  ...cards[index],
                  top: 145,
                  opacity: 0.5,
                };
              } else {
                return {
                  ...cards[index],
                };
              }
            });
          }, 400);
          b = m - 1;
        }
      }

      if (a <= b) {
        await sync();
      }
    }
  }

  render() {
    return <SortBox {...this.props} sort={this.binarySearch.bind(this)} />;
  }
}
