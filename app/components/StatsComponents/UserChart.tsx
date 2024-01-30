'use client'
import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

type Props = {
    correct: number
    incorrect: number
}

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function UserChart({ correct, incorrect }: Props) {
    const data = {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
            labels: 'chart',
            data: [correct, incorrect],
            backgroundColor: ['green', 'red'],
            borderColor: ['white', 'white'],
            circumference: 180,
            rotation:270
        }]
    }
    const options = {
        
    }
    return (
        <Doughnut
            className='mt-3'
            data={data}
            options={options}
        />
    )
}

export default UserChart