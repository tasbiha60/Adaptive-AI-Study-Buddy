
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Flashcards from './pages/Flashcards'
import PDFUpload from './pages/PDFUpload'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/upload-pdf" element={<PDFUpload />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



