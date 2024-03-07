import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function SidebarHeader() {
  return (
    <Link className="flex gap-x-2 lg:gap-x-4 items-center" href={'/'}>
      <Image src="/logo.png" alt='logo' height={50} width={50}
        className={`cursor-pointer duration-500`}
      />
      <div className={`font-bold text-white mx-0 md:mx-2 lg-mx-2 duration-200 text-base md:text-lg lg:text-xl`}>QuizBee</div>
    </Link>
  )
}


//${open && "rotate-[360deg]"}........${!open && "scale-0"}