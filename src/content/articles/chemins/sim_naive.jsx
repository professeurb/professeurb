import React, { Component } from "react";
import Mapper from "./map.jsx";
import Robot from "./bot.jsx";
import { AnimButton } from 'components/AnimButton.jsx'

export default class Sim extends Component {
    constructor(props) {
        super(props);
        this.state = { x: props.x, y: props.y, orient: props.orient, opacity: 1, resolve: () => { } };
    }

    async anim(waiter) {
        let grid = this.props.grid
        // Directions: 0 vers le bas, 1 vers la droite
        let dx = [0, 1, 0, -1]
        let dy = [-1, 0, 1, 0]
        let x = this.props.x
        let y = this.props.y
        let dir = (this.props.orient) % 89
        while (grid[y][x] !== 2) {
            let ddir = dir % 4
            if (ddir < 0) { ddir = ddir + 4 }
            let a = dx[ddir]
            let b = dy[ddir]
            console.log(x, y, dir, a, b)
            if (grid[y + b][x + a] === 1) {
                console.log('Tourne à gauche')
                // Wall ahead
                // Turn left
                await waiter();
                dir = dir - 1
                await new Promise(r => this.setState({ orient: 90 * dir, resolve: r }));
            } else if (grid[y + a][x - b] !== 1) {
                console.log('Tout droit, pas de mur')
                // Not following a wall at right hand,
                // Move forward
                await waiter();
                x = x + a
                y = y + b
                await new Promise(r => this.setState({ x: x, y: y, resolve: r }));
            } else if (grid[y + b + a][x + a - b] === 1) {
                // Following a continuing wall at right hand,
                // Move forward
                console.log('Tout droit en suivant un mur')
                await waiter();
                x = x + a
                y = y + b
                await new Promise(r => this.setState({ x: x, y: y, resolve: r }));
            } else {
                console.log('Tourne à droite en longeant un mur')
                // Turn right
                await waiter();
                x = x + a
                y = y + b
                await new Promise(r => this.setState({ x: x, y: y, resolve: r }));
                dir = dir + 1
                await waiter();
                await new Promise(r => this.setState({ orient: 90 * dir, resolve: r }));
                x = x - b
                y = y + a
                await waiter();
                await new Promise(r => this.setState({ x: x, y: y, resolve: r }));
            }
        }
    }

    render() {
        return (
            <>
                <div style={{ position: "relative" }}>
                    <Mapper grid={this.props.grid} size={this.props.size} />
                    <Robot
                        size={this.props.size}
                        x={this.state.x}
                        y={this.state.y}
                        orientation={this.state.orient}
                        opacity={this.state.opacity}
                        resolve={this.state.resolve}
                    />
                </div>
                <AnimButton
                    anim={this.anim.bind(this)}
                    disabled={false}
                />
                {/* <div>{this.state.x}, {this.state.y}, {this.state.orient}</div> */}
            </>
        );
    }
}
