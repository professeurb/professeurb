import React, { Component } from "react";
import Mat from "./Mat.js";
import { AnimButton } from "components/AnimButton.jsx";
import { Button, Control } from "bloomer";
// import './tris.css'
import range from "lodash/range";

function generateCards(len = 50) {
  let cards = [];
  let cnt = 1;

  range(len - 1).forEach((i) => {
    cnt = cnt + Math.floor(Math.random() * 6 + 1);
    let card = {
      id: i + 1,
      top: 145,
      left: 60 * (i + 1) + 37,
      opacity: 1,
      value: cnt,
      pos: i + 1,
    };
    cards.push(card);
  });

  cards.unshift({
    id: 0,
    left: 37,
    value:
      cards[0].value +
      Math.floor(Math.random() * (cards[len - 2].value - cards[0].value) + 0.5),
    opacity: 1,
    top: 10,
    pos: "",
  });

  return cards;
}

export default class SortBox extends Component {
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
    this.setState({ shuffleButtonDisabled: true });
    // await this.animState(
    //   {
    //     shuffleButtonDisabled: true,
    //     animate: false,
    //     cards: range(this.count).map(index => {
    //       return {
    //         ...this.state.cards[index],
    //         pos: index + 1
    //       };
    //     })
    //   },
    //   0
    // );
    await this.props.sort(waiter, this.change.bind(this));
    this.setState({ shuffleButtonDisabled: false });
  }

  async shuffle() {
    this.setState({ cards: generateCards(this.count) });
  }

  render() {
    // console.log(this.count)
    return (
      <>
        <Mat
          cards={this.state.cards}
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
              Nouvelles valeurs
            </Button>
          </Control>
          <AnimButton
            name="Rechercher"
            anim={this.anim.bind(this)}
            disabled={this.state.animButtonDisabled}
          />
        </div>
      </>
    );
  }
}
