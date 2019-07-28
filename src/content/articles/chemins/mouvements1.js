import React, { Component } from "react";
import Mapper from "./map.jsx";
import Robot from "./bot.jsx";

class Move1 extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 1, orient: 0, opacity: 1, resolve: () => {} };
  }

  async componentDidMount() {
    while (true) {
      await new Promise(r => this.setState({ orient: -90, resolve: r }));
      await new Promise(r => this.setState({ opacity: 0, resolve: r }));
      await new Promise(r => this.setState({ orient: 0, resolve: r }));
      await new Promise(r => this.setState({ opacity: 1, resolve: r }));
    }
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Mapper grid={[[1, 2], [0, 2]]} size={2} />
        <Robot
          size={2}
          x={this.state.x}
          y={this.state.y}
          orientation={this.state.orient}
          opacity={this.state.opacity}
          resolve={this.state.resolve}
        />
      </div>
    );
  }
}

class Move2 extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 1, orient: 0, opacity: 1, resolve: () => {} };
  }

  async componentDidMount() {
    while (true) {
      await new Promise(r => this.setState({ y: 0, resolve: r }));
      await new Promise(r => this.setState({ opacity: 0, resolve: r }));
      await new Promise(r => this.setState({ y: 1, resolve: r }));
      await new Promise(r => this.setState({ opacity: 1, resolve: r }));
    }
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Mapper grid={[[0, 2], [0, 0]]} size={2} />
        <Robot
          size={2}
          x={this.state.x}
          y={this.state.y}
          orientation={this.state.orient}
          opacity={this.state.opacity}
          resolve={this.state.resolve}
        />
      </div>
    );
  }
}

class Move3 extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 1, orient: 0, opacity: 1, resolve: () => {} };
  }

  async componentDidMount() {
    while (true) {
      await new Promise(r => this.setState({ y: 0, resolve: r }));
      await new Promise(r => this.setState({ opacity: 0, resolve: r }));
      await new Promise(r => this.setState({ y: 1, resolve: r }));
      await new Promise(r => this.setState({ opacity: 1, resolve: r }));
    }
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Mapper grid={[[0, 1], [0, 1]]} size={2} />
        <Robot
          size={2}
          x={this.state.x}
          y={this.state.y}
          orientation={this.state.orient}
          opacity={this.state.opacity}
          resolve={this.state.resolve}
        />
      </div>
    );
  }
}

class Move4 extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 1, orient: 0, opacity: 1, resolve: () => {} };
  }

  async componentDidMount() {
    while (true) {
      await new Promise(r => this.setState({ y: 0, resolve: r }));
      await new Promise(r => this.setState({ orient: 90, resolve: r }));
      await new Promise(r => this.setState({ x: 1, resolve: r }));
      await new Promise(r => this.setState({ opacity: 0, resolve: r }));
      await new Promise(r =>
        this.setState({ x: 0, y: 1, orient: 0, resolve: r })
      );
      await new Promise(r => this.setState({ opacity: 1, resolve: r }));
    }
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Mapper grid={[[0, 0], [0, 1]]} size={2} />
        <Robot
          size={2}
          x={this.state.x}
          y={this.state.y}
          orientation={this.state.orient}
          opacity={this.state.opacity}
          resolve={this.state.resolve}
        />
      </div>
    );
  }
}

export class Moves extends Component {
  render() {
    return (
      <div
        style={{
          padding: "10px 0px",
          justifyContent: "space-around",
          display: "inline-flex",
          width: "100%"
        }}
      >
        <Move1 />
        <Move2 />
        <Move3 />
        <Move4 />
      </div>
    );
  }
}
