import { useState } from 'react'
import './App.css'
import Sidebar from './components/navigation/sidebar'
import Button from './components/button/Button'

function App() {
  return (
    <>
      <Sidebar />
      <main>
        <h1>Good afternoon, Alex</h1>
        <Button onClick={() => alert("Hi!")} className='primary-btn'>+ Add new asset</Button>
      </main>

    </>
  )
}

export default App
