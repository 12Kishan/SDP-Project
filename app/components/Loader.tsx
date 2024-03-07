import React from 'react'
import ReactLoading from 'react-loading'

function Loader() {
    return (
        <div>
            <div className="h-full w-full flex justify-center pt-3 items-center">
                <ReactLoading type='spin' className='h-50 w-50' color='#111827' />
            </div>
        </div>
    )
}

export default Loader