import { useSession } from 'next-auth/react'
import React from 'react'

function Home() {
  const {data} = useSession()
  return (<>
      <div>Home</div>
      <div className='w-full '>
               <h1>hello this first testing line to check my code jksdsjanfsdfghjewrtyudghbj yrdcvbhjnkdfcghbjk</h1> 
            </div>
      <br/>
      {data?.user?.email}
    </>
  )
}

export default Home