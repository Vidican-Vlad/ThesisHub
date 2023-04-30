import logo from './logo.svg';
import './App.css';
import { Login } from "./Components/Login"
import { Register } from "./Components/Register"
import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthPage } from './Pages/AuthPage';
import { HomePage } from './Pages/HomePage';
import { CreateProposalPage } from './Pages/CreateProposalPage';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/proposal/create' element = {<CreateProposalPage/>}/>
      </Routes>
    </Router>
    
  )
}

export default App;
