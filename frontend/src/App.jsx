import { Navbar } from './components/layout/navbar.jsx'
import  Home  from './pages/home.jsx'
import Planner from './pages/planner.jsx'
import Login from './pages/login.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
    <div className='min-h-screen bg-gradient-to-br from-[#f7ddb0] via-[#A8B5A2] to-[#7A5C45]'>
     <Navbar />

     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/planner' element={<Planner />} />
       <Route path='/login' element={<Login />} />
     </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
