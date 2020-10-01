import React, { Component } from "react";
// import SortBox from "./SortBox.js";
import range from "lodash/range";
import shuffle from "lodash/shuffle";
import Mat from "./Mat.js";
import { AnimButton } from "components/AnimButton.jsx";
import { Button, Control } from "bloomer";

class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="card"
        style={{
          position: "absolute",
          width: 55,
          height: 90,
          border: "1px solid",
          borderRadius: 10,
          margin: 0,
          paddingTop: 2,
          backgroundColor: "#fff",
          left: this.props.left,
          top: this.props.top,
          transform:
            "translateX(0px) translateY(0px) rotate(" +
            this.props.rotate +
            "deg)",
          zIndex: this.props.zIndex,
          opacity: this.props.opacity,
        }}
        ref={this.props.cardRef}
      >
        <h1
          style={{
            marginTop: 5,
            fontFamily: "Oswald",
            textAlign: "center",
            fontSize: "20pt",
            fontWeight: this.props.weight,
            color: this.props.color,
          }}
        >
          {this.props.value}
        </h1>
      </div>
    );
  }
}

function generateCards(len) {
  let cards = [];
  let cnt = 0;

  let values = [];
  range(len).forEach((i) => {
    cnt = cnt + 1; // Math.floor(Math.random() * 3);
    values.push(cnt);
  });

  // shuffle values

  values = shuffle(values);

  range(len).forEach((i) => {
    let card = {
      id: i,
      top: 5 + Math.floor(i % 5) * 40 - Math.random() * 2,
      left: 68 * Math.floor(i / 5) + 15 + 4 * Math.floor(i % 5),
      zIndex: Math.floor(i % 5),
      rotate: 2 - 4 * Math.random(),
      value: values[i],
      pos: "",
      opacity: 1,
      cardRef: React.createRef(),
      color: "#000000",
    };
    cards.push(card);
  });

  return cards;
}

export default class MomBox extends Component {
  constructor(props) {
    super(props);

    this.count = props.countOfCards;

    this.state = {
      animButtonDisabled: false,
      shuffleButtonDisabled: false,
      cards: generateCards(this.count),
      duration: 1000,
      animate: true,
      resolve: () => {},
    };
  }

  async animState(newState, duration) {
    await new Promise((resolve) => {
      this.setState({
        ...newState,
        animate: true,
        duration: duration,
        resolve: resolve,
      });
    });
  }

  async change(cardChanger, duration) {
    await this.animState({ cards: cardChanger(this.state.cards) }, duration);
  }

  async anim(waiter) {
    await waiter();
    await this.animState(
      {
        shuffleButtonDisabled: true,
        animate: false,
        cards: this.state.cards.map((card, index) => {
          return {
            ...card,
            pos: index + 1,
          };
        }),
      },
      0
    );
    await this.quickSelect(waiter, this.change.bind(this));
    this.setState({
      shuffleButtonDisabled: false,
    });
  }

  async shuffle() {
    await this.animState(
      {
        shuffleButtonDisabled: true,
        animButtonDisabled: true,
        animate: true,
        cards: this.state.cards.map((card) => {
          return {
            ...card,
            color: "#FFFFFF",
          };
        }),
      },
      400
    );

    let values = [];
    let cnt = 0;

    range(this.count).forEach((i) => {
      cnt = cnt + 1; // Math.floor(Math.random() * 3);
      values.push(cnt);
    });

    // shuffle values

    values = shuffle(values);

    this.setState({
      shuffleButtonDisabled: false,
      animButtonDisabled: false,
      animate: true,
      // shuffleButtonDisabled: false,
      cards: this.state.cards.map((card, index) => {
        return {
          ...card,
          value: values[index],
          color: "#000000",
        };
      }),
    });
  }

  async quickSelect(sync, change) {
    let cardVals = [];

    // Mise en place
    await change(
      (cards) =>
        cards.map((card, index) => {
          cardVals.push(card.value);
          return {
            ...card,
            opacity: 1,
            top: 5 + Math.floor(index % 5) * 40,
            left: 63 * Math.floor(index / 5) + 95 + 4 * Math.floor(index % 5),
            zIndex: Math.floor(index % 5),
            color: "#000000",
          };
        }),
      400
    );

    await sync();

    // Médiane des groupes de 5
    for (let i = 0; i < cardVals.length; i += 5) {
      // Mise en valeur du groupe de 5
      await change(
        (cards) =>
          cards.map((card, index) => {
            return {
              ...card,
              top:
                5 +
                Math.floor(index % 5) * 40 +
                (index >= i && index < i + 5 ? -30 : 0),
              left:
                index < i
                  ? 68 * Math.floor(index / 5) + 15 + 4 * Math.floor(index % 5)
                  : index >= i + 5
                  ? 63 * Math.floor(index / 5) + 95 + 4 * Math.floor(index % 5)
                  : 68 * Math.floor(index / 5) +
                    100 +
                    4 * Math.floor(index % 5),
              zIndex:
                Math.floor(index % 5) + (index >= i && index < i + 5 ? 5 : 0),
            };
          }),
        200 - 2 * i
      );

      await sync();

      for (let j = i; j < i + 5 && j < cardVals.length; j++) {
        // x est la valeur de la carte à insérer
        let x = cardVals[j];
        // On sort la carte à insérer du paquet
        await change(
          (cards) =>
            cards.map((card, index) => {
              if (index === j) return { ...card, top: card.top - 20 };
              return card;
            }),
          200 - 2 * i
        );

        let curr = j;
        let prev = j - 1; // Math.min(j - 1, i + 2);

        while (prev >= i && cardVals[prev] > x) {
          cardVals[curr] = cardVals[prev];
          curr = prev;
          prev--;
        }

        cardVals[curr] = x;

        // On décale vers le bas les cartes nécessaires
        if (curr < j) {
          await change(
            (cards) =>
              cards.map((card, index) => {
                if (index === curr) return cards[j];
                if (index > curr && index <= j) return cards[index - 1];
                return card;
              }),
            0
          );

          await change(
            (cards) =>
              cards.map((card, index) => {
                if (index > curr && index <= j)
                  return {
                    ...card,
                    top: 5 + Math.floor(index % 5) * 40,
                    left:
                      68 * Math.floor(index / 5) +
                      15 +
                      4 * Math.floor(index % 5),
                    zIndex:
                      Math.floor(index % 5) +
                      (index >= i && index < i + 5 ? 5 : 0),
                  };
                return card;
              }),
            200 - 2 * i
          );
        }

        await change(
          (cards) =>
            cards.map((card, index) => {
              if (index === curr)
                return {
                  ...card,
                  top: 5 + Math.floor(index % 5) * 40,
                  left:
                    68 * Math.floor(index / 5) + 15 + 4 * Math.floor(index % 5),
                  zIndex:
                    Math.floor(index % 5) +
                    (index >= i && index < i + 5 ? 5 : 0),
                };
              return card;
            }),
          200 - 2 * i
        );
      }
    }

    // Tri des médianes

    await change(
      (cards) =>
        cards.map((card, index) => {
          return {
            ...cards[index],
            // left: card.left + (index >= 5 ? 40 : 0),
            color: index % 5 === 2 ? "#000000" : "#C0C0C0",
          };
        }),
      400
    );

    await change(
      (cards) =>
        cards.map((card, index) => {
          return {
            ...cards[index],
            left: card.left + (index >= 5 ? 40 : 0),
            // color: index % 5 === 2 ? "#000000" : "#C0C0C0"
          };
        }),
      400
    );

    for (let i = 7; i < cardVals.length; i += 5) {
      // Décalage du groupe de 5
      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index >= i - 2 && index <= i + 2)
              return {
                ...card,
                top: (index % 5) * 40 - 25,
                left:
                  68 * Math.floor(index / 5) + 4 * Math.floor(index % 5) + 75,
                zIndex: (index % 5) + 5,
              };
            return { ...card, zIndex: index % 5 };
          }),
        400
      );

      // Tri par insertion
      let curr = i;
      let prev = curr - 5;
      while (prev >= 2 && cardVals[prev] > cardVals[curr]) {
        // Sinon, on décale…
        for (let j = prev - 2; j <= prev + 2; j++) {
          let tmp = cardVals[j];
          cardVals[j] = cardVals[j + 5];
          cardVals[j + 5] = tmp;
        }

        curr = prev;
        prev = curr - 5;
      }

      // On décale les cartes en une fois
      if (curr < i) {
        await change(
          (cards) =>
            cards.map((card, index) => {
              if (index >= curr - 2 && index <= curr + 2)
                return cards[i + index - curr];
              if (index > curr + 2 && index <= i + 2) return cards[index - 5];
              return card;
            }),
          0
        );

        await change(
          (cards) =>
            cards.map((card, index) => {
              if (index > curr + 2 && index <= i + 2) {
                return {
                  ...card,
                  left:
                    68 * Math.floor(index / 5) + 15 + 4 * Math.floor(index % 5),
                  top: 5 + (index % 5) * 40,
                };
              }
              return card;
            }),
          300
        );
      }
      // On mets en place
      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index >= curr - 2 && index <= curr + 2) {
              return {
                ...card,
                left:
                  68 * Math.floor(index / 5) + 15 + 4 * Math.floor(index % 5),
                top: 5 + (index % 5) * 40,
              };
            }
            return card;
          }),
        300
      );

      await sync();
    }

    // On a notre médiane des médianes

    await change(
      (cards) =>
        cards.map((card, index) => {
          return {
            ...card,
            color: index === 27 ? "#000000" : "#dcdcdc",
          };
        }),
      400
    );

    await change(
      (cards) =>
        cards.map((card, index) => {
          return {
            ...card,
            color:
              cardVals[index] === cardVals[27]
                ? "#000000"
                : cardVals[index] <= cardVals[27]
                ? "#FF0000"
                : "#0000FF",
          };
        }),
      400
    );
  }

  render() {
    return (
      <>
        <Mat
          cards={this.state.cards.map((card) => (
            <Card {...card} key={card.id} />
          ))}
          duration={this.state.duration}
          animate={this.state.animate}
          resolve={this.state.resolve}
        />
        <div className="field is-grouped">
          <Control>
            <Button
              onClick={this.shuffle.bind(this)}
              disabled={this.state.shuffleButtonDisabled}
            >
              Mélanger
            </Button>
          </Control>
          <AnimButton
            name="Sélectionner"
            anim={this.anim.bind(this)}
            disabled={this.state.animButtonDisabled}
          />
        </div>
      </>
    );
  }
}
