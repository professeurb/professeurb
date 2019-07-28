import React, { Component } from "react";
import style from './grid.module.css'
import brick_large from "./brick_large.svg";
import ground_large from "./ground_large.svg";
import brick from "./brick.svg";
import ground from "./ground.svg";
import brick_small from "./brick_small.svg";
import ground_small from "./ground_small.svg";
import range from 'lodash/range'

// Arguments:
// * grid: array

export default class Mapper extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const { grid, size = 1 } = this.props
        // let size = this.props.size ? this.props.size : 1
        let h = grid.length
        let w = grid[0].length
        return (
            <div className={style.table}>
                {range(h).map(i => (
                    <div key={'r' + i} className={style.row}>
                        {range(w).map(j => (
                            <div key={'r' + i + 'c' + j} className={size === 0 ? style.col_small : size === 2 ? style.col_large : style.col}>
                                {
                                    grid[i][j] === 0 ? <img src={size === 0 ? ground_small : size === 2 ? ground_large : ground} alt="" className={style.cell} /> :
                                        grid[i][j] === 1 ? <img src={size === 0 ? brick_small : size === 2 ? brick_large : brick} alt="" className={style.cell} /> : ""
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}
