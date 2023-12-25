import React from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Content from '@/app/components/content'
import { getServerSession } from 'next-auth'
import { authOptions } from './../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

async function page() {
    return (<>
        <Header />
        after login..
        <Content />
        <Footer />
    </>
    )
}

export default page