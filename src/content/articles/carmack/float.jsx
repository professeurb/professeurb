import React from 'react'
import style from './float.module.css'

function Floto() {
    let valeurs = [37, 16, 12, 28, 35, 14, 28, 31, 12, 76, 26, 22, 47, 33, 12, 41, 67, 53, 42]
    return (
        <svg width="500pt" height="40pt" viewBox="0 0 468 40">
            <line x1={10} x2={458} y1={20} y2={20} style={{ stroke: "#000" }} />
            {[10, 10 + 14, 10 + 9 * 14, 10 + 32 * 14].map(x => (<line x1={x} x2={x} y1={20} y2={15} style={{ stroke: "#000" }} />))}
            {/* {valeurs.map((v, index) =>
                <text x={22 + 24 * index} y={35}
                    style={{ fill: index >= 1 ? index >= 8 ? index >= 15 ? "blue" : "" : "red" : "" }}>{v}</text>)} */}
            <text x={3 + 14} y={30} className={style.small}>{"31"}</text>
            <text x={3 + 2 * 14} y={30} className={style.small}>{"30"}</text>
            <text x={3 + 9 * 14} y={30} className={style.small}>{"23"}</text>
            <text x={3 + 10 * 14} y={30} className={style.small}>{"22"}</text>
            <text x={3 + 32 * 14} y={30} className={style.small}>{"00"}</text>
            <text x={3 + 21 * 14} y={15} className={style.basic}>{"M"}</text>
            <text x={3 + (2 + 9) * 7} y={15} className={style.basic}>{"e"}</text>
            <text x={17} y={15} className={style.basic}>{"0"}</text>
        </svg >
    )
}

export default Floto
