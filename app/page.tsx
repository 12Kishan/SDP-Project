import Header from './components/Header-Footer/Header'
import Content from './components/mycontent/content'
import Footer from './components/Header-Footer/Footer'

export default async function Home() {
  return (
    <main>
      <Header />
      <Content />
      <Footer />
    </main>
  )
}
