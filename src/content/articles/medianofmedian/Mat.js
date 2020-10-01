import React, { Component } from "react";
import anime from "animejs";

class Mat extends Component {
  componentDidUpdate(prevProps, _) {
    if (this.props.animate) {
      let len = this.props.cards.length;
      anime({
        targets: this.props.cards
          .map(card => card.props.cardRef.current)
          .concat(
            this.props.cards.map(card => card.props.cardRef.current.children[0])
          ),
        translateX: (_, index) => {
          if (index < len)
            return [
              prevProps.cards[index].props.left -
                this.props.cards[index].props.left,
              0
            ];
          return null;
        },
        translateY: (_, index) => {
          if (index < len)
            return [
              prevProps.cards[index].props.top -
                this.props.cards[index].props.top,
              0
            ];
          return null;
        },
        color: (_, index) => {
          if (index >= len) {
            return [
              prevProps.cards[index - len].props.color,
              this.props.cards[index - len].props.color
            ];
          }
          return null;
        },
        // delay: (elt, index) => index * 12,
        complete: this.props.resolve,
        duration: this.props.duration,
        easing: "easeInOutQuad",
        elasticity: 1
      });
    }
  }

  render() {
    const { cards } = this.props;

    return (
      <div
        className="mat"
        style={{
          position: "relative" /* it is a container */,
          width: "849px !important",
          height: "250px",
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#fafafa",
          border: "1px solid",
          borderRadius: "10px",
          borderColor: "#bbb"
        }}
      >
        {cards}
      </div>
    );
  }
}

export default Mat;
