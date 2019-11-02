import React from 'react'
import style from './figure.module.css'

// http://tutorials.jenkov.com/svg/line-element.html

function Figure() {
    let valeurs = [37, 16, 12, 28, 35, 14, 28, 31, 12, 76, 26, 22, 47, 33, 12, 41, 67, 53, 42]
    return (
        <svg width="500pt" height="60pt" viewBox="0 0 500 60">
            <line x1={10} x2={466} y1={40} y2={40} style={{ stroke: "#000" }} />
            {[10, 34, 202, 370, 466].map(x => (<line x1={x} x2={x} y1={40} y2={35} style={{ stroke: "#000" }} />))}
            {valeurs.map((v, index) =>
                <text x={22 + 24 * index} y={35} className={style.small}
                    style={{ fill: index >= 1 ? index >= 8 ? index >= 15 ? "blue" : "" : "red" : "" }}>{v}</text>)}
            <text x={22} y={56} className={style.basic}>debut</text>
            <text x={478} y={56} className={style.basic}>fin</text>
            <text x={202 - 12} y={56} className={style.basic}>{"i"}</text>
            <text x={202} y={56} className={style.basic}>{"\u2192"}</text>
            <text x={370 + 12} y={56} className={style.basic}>{"j"}</text>
            <text x={370} y={56} className={style.basic}>{"\u2190"}</text>
            <text x={22} y="15" className={style.basic}>{"pivot"}</text>
            <text x={(34 + 202) / 2} y="15" className={style.basic} style={{ fill: "red" }}>{"\u2264 pivot"}</text>
            <text x={(202 + 370) / 2} y="15" className={style.basic}>?</text>
            <text x={(370 + 466) / 2} y="15" className={style.basic} style={{ fill: "blue" }}>{"> pivot"}</text>
        </svg >
    )
}

export default Figure
