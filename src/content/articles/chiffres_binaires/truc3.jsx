import React, { Component } from 'react'
import style from './deBruijn.module.css'
import range from 'lodash/range'
import { AnimButton } from 'components/AnimButton.jsx'
import anime from 'animejs'

class Indicator extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.doAnimate = false;
    }

    componentWillReceiveProps(newProps) {
        // console.log(this.props.highlight, "->", newProps.highlight)
        this.doAnimate = newProps.highlight !== this.props.highlight
    }

    async componentDidUpdate() {
        if (this.doAnimate) {
            await new Promise(resolve => anime({
                targets: this.myRef.current,
                scale: 1.2,
                easing: 'easeInOutSine',
                duration: 100,
                backgroundColor: this.props.highlight ? "#000" : "#ddd",
                color: this.props.highlight ? "#fff" : "#000",
                complete: resolve
            }));
            await new Promise(resolve => anime({
                targets: this.myRef.current,
                scale: 1,
                easing: 'easeInOutSine',
                duration: 100,
                complete: resolve
            }));
        }
    }

    render() {
        return <code ref={this.myRef} className={this.props.highlight ? style.crocodile : {}} >{this.props.children}</code>
    }
}

export default class DeBruijn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlight: range(2 ** 4).map(i => false)
        };
        this.word = [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0]
        this.seqRef = React.createRef()
        this.digitRef = range(this.word.length).map(i => React.createRef())
        this.hasRun = false
    }

    async anim(waiter) {
        let i = 0;
        await waiter();
        if (this.hasRun) {
            this.setState({
                highlight: range(2 ** 4).map(i => false)
            })
            range(this.word.length).forEach(j => {
                anime({
                    targets: this.digitRef[j].current,
                    opacity: j < 4 ? 1 : j >= 2 ** 4 ? 0 : 0.32,
                    easing: 'easeInOutSine',
                    duration: 500
                })
            })
            await new Promise(resolve => anime({
                targets: this.seqRef.current,
                left: 10 + 16 * 14,
                easing: 'easeInOutSine',
                duration: 500,
                complete: resolve,
            }));
        }
        let currInd = 8 * this.word[i] + 4 * this.word[i + 1] + 2 * this.word[i + 2] + this.word[i + 3]
        this.setState({ highlight: range(2 ** 4).map(j => j === currInd) })
        await new Promise(resolve => anime({
            duration: 250,
            complete: resolve
        }));
        for (i = 1; i < 2 ** 4; ++i) {
            await waiter();
            range(this.word.length).forEach(j => {
                anime({
                    targets: this.digitRef[j].current,
                    opacity: j < i ? 0.32 : j < i + 4 ? (j >= 2 ** 4 ? 0.48 : 1) : j >= 2 ** 4 ? 0 : 0.32,
                    easing: 'easeInOutSine',
                    duration: 500
                })
            })
            await new Promise(resolve => anime({
                targets: this.seqRef.current,
                left: 10 + (16 - i) * 14,
                easing: 'easeInOutSine',
                duration: 500,
                complete: resolve
            }));
            let currInd = 8 * this.word[i] + 4 * this.word[i + 1] + 2 * this.word[i + 2] + this.word[i + 3]
            this.setState({ highlight: range(2 ** 4).map(j => j === currInd ? true : this.state.highlight[j]) })
        }
        this.hasRun = true
    }

    render() {
        return (
            <>
                <div className={style.bruijn} width="100%">
                    <div className={style.rect}></div>
                    <div className={style.seq} ref={this.seqRef}>
                        {this.word.map((char, index) => <code key={index} style={{ opacity: index >= 2 ** 4 ? 0 : index <= 3 ? 1 : 0.32 }} ref={this.digitRef[index]}>{char}</code>)
                        }
                    </div>
                    <div className={style.squares}>
                        {range(2 ** 4).map(i => <Indicator key={1000 + i} highlight={this.state.highlight[i]}>{(32 + i).toString(2).substring(2, 6)}</Indicator>)}
                    </div>
                </div>
                <AnimButton
                    // name="Trier"
                    anim={this.anim.bind(this)}
                    disabled={false}
                />
            </>
        )
    }
}
