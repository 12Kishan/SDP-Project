import Header from './components/Header'
import Content from './components/content'
import Footer from './components/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main>
      <Header />
      <Content />
      <Footer />
    </main>
  )
}
