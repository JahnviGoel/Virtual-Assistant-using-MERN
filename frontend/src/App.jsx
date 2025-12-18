import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './Pages/signIn.jsx'
import SignUp from './Pages/SignUp.jsx'

function App() {
  return (
    <Routes>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
  )
}

export default App

