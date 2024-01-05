'use client';
import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import SignInBtn from '../Buttons/signInBtn';
import SignOutBtn from '../Buttons/signOutBtn';
import { useSession } from 'next-auth/react';

function Header() {
  const { data } = useSession()
  const [isOpen, setIsOpen] = useState(false);
  return (<>
    <div className="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <Link href={'/'} className='flex justify-center items-center'>
          <Image src={'/logo.png'} alt='LOGO' height={50} width={50} />
          <div className="font-bold text-white mx-4">QuizBee</div>
        </Link>
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)} type="button" className="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <nav className={`${isOpen ? 'block' : 'hidden'} px-2 pt-2 pb-4 sm:flex sm:p-0 items-center`}>
        <Link href="#" className="mt-1 mx-2 block px-2 py-3 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2">Quiz</Link>
        <Link href="#" className="mt-1 mx-2 block px-2 py-3 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2">Service</Link>
        <Link href="#" className="mt-1 mx-2 block px-2 py-3 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2">About</Link>

        {data && <SignOutBtn />}
        {!data && <SignInBtn />}
      </nav>
    </div>
  </>
  )
}

export default Header