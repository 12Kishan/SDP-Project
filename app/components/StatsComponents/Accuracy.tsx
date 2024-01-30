import React from 'react'
import { GoGoal } from "react-icons/go";

type Props = {
  correct: number
  incorrect: number
}
function Accuracy({ correct, incorrect }: Props) {
  return (
    <>
      <div className='text-center flex items-center justify-center gap-x-2'>
        <div>Accuracy</div>
        <GoGoal className='h-5 w-5'/>
      </div>
      <div className="">
        {Math.floor(((correct / (correct + incorrect)) * 100) * 100) / 100}%
      </div>
    </>
  )
}

export default Accuracy