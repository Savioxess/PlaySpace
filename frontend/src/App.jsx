import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import PostState from './context/posts/PostState'
import NotFound from './components/NotFound'
import User from './components/User'

function App() {
  return (
    <div className="bg-black/90 bg-fixed bg-no-repeat min-h-screen bg-cover">
      <PostState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/user' element={<User />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PostState>
    </div>
  )
}

export default App
