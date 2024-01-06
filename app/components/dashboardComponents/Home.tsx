import { useSession } from 'next-auth/react'
import React from 'react'

function Home() {
  const {data} = useSession()
  return (<>
      <div>Home</div>
      <br/>
      {data?.user?.email}
    </>
  )
}

export default Home