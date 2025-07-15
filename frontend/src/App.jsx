import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import UrlShortener from './components/UrlShortner'
import Features from './components/Features'
import Analytics from './components/Analytics'
import About from './components/About'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main>
        <Hero />
        <UrlShortener />
        <Features />
        <Analytics />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App