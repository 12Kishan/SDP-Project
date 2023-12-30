'use client';
import React from 'react'
import Link from 'next/link';

function SignInBtn() {
    return (
        <Link href='/login' className="mt-1 mx-2 block px-2 py-3 text-white font-bold rounded-full bg-transparent border-solid border-2 hover:bg-white hover:text-gray-900 mb-1 sm:ml-2 dm:mt-5 text-center">Sign in / Sign up</Link>
    )
}

export default SignInBtn