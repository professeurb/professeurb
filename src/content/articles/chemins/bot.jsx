import React, { Component } from "react";
import anime from "animejs";
import bot from "./bot.svg";

export default class Bot extends Component {
    constructor(props) {
        super(props);
        this.botRef = React.createRef();
        const { size = 1 } = props;
        this.scale = [20, 30, 60][size];
    }

    componentWillReceiveProps(newProps) {
        let oldx = this.props.x * this.scale
        let newx = newProps.x * this.scale
        let oldy = this.props.y * this.scale
        let newy = newProps.y * this.scale
        let old_angle = this.props.orientation
        let new_angle = newProps.orientation
        let old_opacity = this.props.opacity
        let new_opacity = newProps.opacity
        // console.log(oldx, newx, oldy, newx)
        this._animate = () => {
            anime({
                easing: 'linear',
                targets: this.botRef.current,
                translateX: [oldx, newx],
                translateY: [oldy, newy],
                rotate: [old_angle, new_angle],
                opacity: [old_opacity, new_opacity],
                duration: old_opacity !== new_opacity ? 200 : new_opacity === 1 ? 1000 : 500,
                complete: newProps.resolve
            })
        }
    }

    componentDidUpdate() {
        this._animate && this._animate();
    }

    render() {
        const { x = 0, y = 0, orientation = 0, opacity = 1 } = this.props
        return (
            <img src={bot}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: this.scale,
                    height: this.scale,
                    transform: `translateX(${x * this.scale}px) translateY(${y * this.scale}px) rotate(${orientation}deg)`,
                    opacity: opacity
                }}
                alt=""
                ref={this.botRef} />
        )
    }
}
