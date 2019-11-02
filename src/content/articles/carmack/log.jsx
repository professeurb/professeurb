import React from 'react'
import { Line } from '@nivo/line'
import range from 'lodash/range'

const commonProperties = {
    width: 300,
    height: 150,
    margin: { top: 20, right: 20, bottom: 25, left: 20 },
    animate: true,
    enablePoints: false,
    enableSlice: false,
    curve: 'basis',
    useMesh: true,
    isInteractive: true,
};

function Logu() {
    let data = range(21).map(index => {
        return { x: index / 20, y: Math.log2(1 + index / 20) - index / 20 }
    })
    console.log(data)
    return (
        <Line
            {...commonProperties}
            data={[{ data: data }]}
            xScale={{
                type: "linear",
                min: 0,
                max: 1,
            }}
            axisBottom={{
                tickValues: 1
            }}
            yScale={{
                type: "linear",
                min: 0,
                max: .1
            }}
            axisLeft={{
                tickValues: 1
            }}
        />
    )
}

export default Logu
