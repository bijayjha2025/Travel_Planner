import { Navbar } from './components/layout/navbar.jsx'
import  Home  from './pages/home.jsx'
import Planner from './pages/planner.jsx'
import Authpage from './pages/Authpage.jsx'

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Community from './pages/community.jsx'
import Explore from './pages/explore.jsx'
import Recommendation from './pages/recommendation.jsx'
import Trip from './pages/trip.jsx'
import Destination from './pages/destination.jsx'


function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, search])

  return null
}


export default function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <div className='min-h-screen bg-gradient-to-br from-[#f7ddb0] via-[#A8B5A2] to-[#7A5C45]'>
     <Navbar />

     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/home' element={<Home />} />
       <Route path='/community' element={<Community />} />
       <Route path='/explore' element={<Explore />} />
       <Route path='/recommendation' element={<Recommendation />} />
       <Route path='/trip' element={<Trip />} />
       <Route path='/destination' element={<Destination />} />
       <Route path='/planner' element={<Trip />} />
       <Route path='/login' element={<Authpage />} />
       <Route path='/auth' element={<Authpage />} />
     </Routes>
    </div>
    </BrowserRouter>
  )
}

