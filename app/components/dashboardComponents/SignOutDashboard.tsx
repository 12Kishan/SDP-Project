import React from 'react'
import { signOut } from 'next-auth/react';
import { FiLogOut } from "react-icons/fi";


interface Props {
    myBool: boolean;
}

function SignOutDashboard({ myBool }: Props) {
    return (
        <button className='flex p-2 w-full cursor-pointer rounded hover:bg-gray-800 text-gray-300 text-sm items-center gap-x-4 mt-9' onClick={() => { signOut({ callbackUrl: '/', redirect: true }) }}>
            <FiLogOut className='h-6 w-6' />
            <span className={`${!myBool && "hidden"} origin-left duration-200`}>
                Sign Out
            </span>
        </button>
    )
}

export default SignOutDashboard