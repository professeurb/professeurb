import React, { Component } from "react";
import SortBox from "./SortBox.js";
import range from "lodash/range";

export default class QuickSortBisBox extends Component {
  async quickSort(sync, change) {
    let cardVals = [];

    await change(
      cards =>
        cards.map(card => {
          cardVals.push(card.value);
          return {
            ...card,
            opacity: 1
          };
        }),
      0
    );

    async function aux(left, right, first, laster) {
      const n = laster - first;

      // We are done
      if (n <= 1) {
        await change(
          cards =>
            cards.map((card, index) => {
              if (index === first)
                return {
                  ...card,
                  left: left,
                  top: 145
                };
              return card;
            }),
          100
        );

        await sync();

        return;
      }

      let leftTight = left + 55 + (4 - left - 57 * n + right) / 2;

      // Select pivot

      let pivot = cardVals[first];

      // Stick out pivot card and also cards to be selected a bit
      await change(
        cards =>
          cards.map((card, index) => {
            if (index === first)
              return { ...card, top: 15, left: left, zIndex: 8 };
            if (index > first && index < laster)
              return {
                ...card,
                top: 95,
                left: leftTight + 57 * (index - first - 1)
              };
            return card;
          }),
        400
      );

      let posLeft = first + 1;
      let posRight = laster;

      // Invariant:
      // posLeft - 1 is empty
      // everything < posLeft - 1 is smaller than the pivot
      // everything >= posRight is greater than the pivot

      while (posLeft < posRight) {
        // First, we look at posLeft

        while (true) {
          // Raise left card
          await change(
            cards =>
              cards.map((card, index) => {
                if (index === posLeft) return { ...card, top: 65 };
                return card;
              }),
            400
          );

          await sync();

          if (posLeft >= posRight || cardVals[posLeft] > pivot) break;

          cardVals[posLeft - 1] = cardVals[posLeft];

          // Exchange cards
          await change(
            cards =>
              cards.map((card, index) => {
                if (index === posLeft - 1) return cards[posLeft];
                if (index === posLeft) return cards[posLeft - 1];
                return card;
              }),
            0
          );

          // Shift card left
          await change(
            cards =>
              cards.map((card, index) => {
                if (index === posLeft - 1)
                  return {
                    ...card,
                    left: left + 57 * (posLeft - first - 1),
                    top: 125,
                    zIndex: 4
                  };
                return card;
              }),
            400
          );

          posLeft += 1;
        }

        // either posLeft == posRight
        // or posLeft < posRight && cards[posLeft] > pivot

        if (posLeft < posRight) {
          while (true) {
            posRight -= 1;

            if (posRight <= posLeft) break;

            await change(
              cards =>
                cards.map((card, index) => {
                  if (index === posRight) return { ...card, top: 65 };
                  return card;
                }),
              400
            );

            await sync();

            if (cardVals[posRight] <= pivot) break;

            // We exchange cards
            await change(
              cards =>
                cards.map((card, index) => {
                  if (index === posRight)
                    return {
                      ...card,
                      left: right - 60 - 57 * (laster - 1 - posRight),
                      top: 125
                    };
                  return card;
                }),
              400
            );
          }

          // We have card at posLeft > pivot and
          // either posRight = posLeft or
          // card at posRight < pivot

          if (posLeft < posRight) {
            cardVals[posLeft - 1] = cardVals[posRight];
            cardVals[posRight] = cardVals[posLeft];

            // Move right card to the left
            await change(
              cards =>
                cards.map((card, index) => {
                  if (index === posRight) {
                    return {
                      ...card,
                      left: left + 57 * (posLeft - first - 1),
                      top: 125,
                      zIndex: 6
                    };
                  }
                  return card;
                }),
              300 + 50 * (posRight - posLeft + 1)
            );

            // change cards order

            await change(
              cards =>
                cards.map((card, index) => {
                  if (index === posLeft - 1) return cards[posRight];
                  if (index === posLeft) return cards[posLeft - 1];
                  if (index === posRight) return cards[posLeft];
                  return card;
                }),
              0
            );

            await change(
              cards =>
                cards.map((card, index) => {
                  if (index === posLeft - 1) {
                    return { ...card, zIndex: 1 };
                  }
                  if (index === posRight) {
                    return {
                      ...card,
                      left: right - 60 - 57 * (laster - 1 - posRight),
                      top: 125,
                      zIndex: 6
                    };
                  }
                  return card;
                }),
              300 + 50 * (posRight - posLeft + 1)
            );

            posLeft += 1;
          } else {
            // posLeft === posRight
            await sync();
            await change(
              cards =>
                cards.map((card, index) => {
                  if (index === posLeft) {
                    return {
                      ...card,
                      left: right - 60 - 57 * (laster - 1 - posRight),
                      top: 125
                    };
                  }
                  return card;
                }),
              400
            );
          }
        }
      }

      await change(
        cards =>
          cards.map((card, index) => {
            if (index === posLeft - 1) {
              return {
                ...card,
                left: left + 60 * (posLeft - 1 - first),
                top: 145,
                zIndex: 8
              };
            }
            return { ...card, zIndex: 1 };
          }),
        300 + 50 * (posLeft - 1 - first)
      );

      await sync();

      // Keep on sorting on proper side
      if (posLeft > 5) {
        await aux(left, left + 60 * (posLeft - 1 - first), first, posLeft - 1);
      }
      if (posLeft < 5) {
        await aux(left + 60 * (posLeft - first), right, posLeft, laster);
      }
    }

    // Start sorting
    await aux(37, 60 * 13 + 37, 0, 13);

    await sync();

    // Put everything in final place
    await change(
      cards =>
        cards.map((card, index) => {
          return {
            ...card,
            left:
              index < 4
                ? 37 + index * 57
                : index === 4
                ? 55 + index * 57
                : 73 + index * 57,
            top: index === 4 ? 45 : card.top,
            opacity: index === 4 ? 1 : 0.5
          };
        }),
      300
    );
  }

  render() {
    return <SortBox {...this.props} sort={this.quickSort.bind(this)} />;
  }
}
