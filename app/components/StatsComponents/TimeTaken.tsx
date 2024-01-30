import React from 'react'
import { MdTimelapse } from "react-icons/md";

type Props = {
  timeTaken: string
}
function TimeTaken({ timeTaken }: Props) {
  return (
    <>
      <div className='text-center flex items-center justify-center gap-x-2'>
        <div>Time Taken</div>
        <MdTimelapse className='h-5 w-5'/>
      </div>
      <div className="">
        {timeTaken}
      </div>
    </>
  )
}

export default TimeTaken