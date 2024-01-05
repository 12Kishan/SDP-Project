'use client';

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Dashboard() {

    const { data } = useSession()


    return (<>
       <div>{data?.user?.email}</div>
    </>
    )

}

export default Dashboard