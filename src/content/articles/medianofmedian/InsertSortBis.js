import React, { Component } from "react";
import SortBox from "./SortBox.js";

export default class InsertSortBisBox extends Component {
  async insertSort(sync, change) {
    let cardVals = [];

    await change(
      cards =>
        cards.map((card, index) => {
          cardVals.push(card.value);
          return {
            ...card,
            left: index === 0 ? 60 * index + 37 : 97 + index * 58,
            top: index === 0 ? 145 : 125,
            zIndex: 1,
            opacity: 1
          };
        }),
      400
    );

    await sync();

    for (let i = 1; i < 13; i++) {
      // On sort la carte à insérer

      await change(
        cards =>
          cards.map((card, index) => {
            if (index === i) return { ...card, top: 45 };
            return card;
          }),
        400 - 20 * i
      );

      await sync();

      let curr = i;
      let prev = i - 1;
      if (prev > 4) {
        prev = 4;
      }

      let x = cardVals[curr];

      while (prev >= 0) {
        // On regarde le prochain candidat

        await change(
          cards =>
            cards.map((card, index) => {
              return {
                ...card,
                top: card.top + (index === prev ? -10 : 0)
              };
            }),
          300 - 15 * i
        );

        if (cardVals[prev] <= x) {
          await change(
            cards =>
              cards.map((card, index) => {
                return {
                  ...card,
                  top: card.top + (index === prev ? 10 : 0)
                };
              }),
            300 - 15 * i
          );
          break;
        }

        cardVals[curr] = cardVals[prev];

        await change(
          cards =>
            cards.map((_, index) => {
              if (index === curr) return cards[prev];
              if (index === prev) return cards[curr];
              return cards[index];
            }),
          0
        );

        await change(
          cards =>
            cards.map((card, index) => {
              if (index === curr) {
                return {
                  ...card,
                  zIndex: 8,
                  left:
                    curr < 4
                      ? 37 + curr * 60
                      : curr === 4
                      ? 67 + curr * 59
                      : 97 + curr * 58,
                  top: 145
                };
              }
              return { ...cards[index], zIndex: 1 };
            }),
          600 - 30 * i
        );

        await sync();
        curr = prev;
        prev--;
      }

      cardVals[curr] = x;

      await change(
        cards =>
          cards.map((card, index) => {
            return {
              ...card,
              zIndex: index === curr ? 8 : 1,
              left:
                index === curr
                  ? index < 4
                    ? 37 + index * 60
                    : index === 4
                    ? 67 + index * 59
                    : 97 + index * 58
                  : card.left,
              top: index <= i ? 145 : 125
            };
          }),
        300 + 50 * Math.abs(1 + i - curr) - 15 * i
      );
    }

    await sync();

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
    return <SortBox {...this.props} sort={this.insertSort.bind(this)} />;
  }
}
