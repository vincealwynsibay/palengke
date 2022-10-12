import React, { useEffect } from 'react'
import { Route } from 'react-router'
import { BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import { seedProducts } from './lib/seedProducts'
interface Props {}

function App({}: Props) {
  
  
  seedProducts()
  return (
    <div>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App