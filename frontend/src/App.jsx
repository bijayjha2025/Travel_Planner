import { Navbar } from './components/layout/navbar.jsx'
import  Home  from './pages/home.jsx'
import Planner from './pages/planner.jsx'
import Authpage from './pages/Authpage.jsx'

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const target = document.getElementById(id)

      if (target) {
        window.scrollTo({ top: target.offsetTop - 88, left: 0, behavior: 'smooth' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}


function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <div className='min-h-screen bg-gradient-to-br from-[#f7ddb0] via-[#A8B5A2] to-[#7A5C45]'>
     <Navbar />

     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/planner' element={<Planner />} />
       <Route path='/login' element={<Authpage />} />
       <Route path='*' element={<Navigate to='/' replace />} />
     </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
