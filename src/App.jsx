import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Experience from './pages/Experience'
import GameWithPlayButton from './components/Game'
import GameCenter from './components/Game'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-base-light dark:bg-neutral-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/game' element={<GameCenter />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}