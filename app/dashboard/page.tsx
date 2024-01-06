'use client';
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";

function Dashboard() {

    const [open, setOpen] = useState(true)

    return (<>
        <div className="flex">
            <div className={`bg-gray-800 h-screen text-white px-5 pt-7 ${open ? "w-72" : "w-20"}`}>
                <FaArrowLeft className="bg-white text-gray-900 text-2xl"/>
            </div>
            <div className="p-7 font-bold"><h1>HomePage</h1></div>
        </div>
    </>
    )

}

export default Dashboard