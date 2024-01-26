import { RxCrossCircled, RxCheckCircled } from "react-icons/rx";
import React from 'react'


type props = {
    correct: number,
    wrong: number
}
function Counter({correct, wrong}:props) {
    return (
        <>
            <div className="border-2 border-gray-600 flex items-center rounded-lg py-1 px-2 gap-x-2 justify-center">
                <RxCheckCircled className='text-green-600 w-5 h-5' />
                <div className="text-green-600 text-lg">{correct}</div>
                <RxCrossCircled className='text-red-600 w-5 h-5' />
                <div className="text-red-600 text-lg">{wrong}</div>
            </div>
        </>
    )
}

export default Counter