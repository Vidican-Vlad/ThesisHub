import logo from './logo.svg';
import './App.css';
import { Login } from "./Components/Login"
import { Register } from "./Components/Register"
import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthPage } from './Pages/AuthPage';
import { HomePage } from './Pages/HomePage';
import { CreateProposalPage } from './Pages/CreateProposalPage';
import { ProposalPage } from './Pages/ProposalPage';
import { MessagesPage } from './Pages/MessagesPage';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/auth' element={<AuthPage/>}/>
          <Route path='/proposal/create' element = {<CreateProposalPage/>}/>
          <Route path='/proposal/:proposalID' element ={<ProposalPage/>}/>
          <Route path="/messages/" element = {<MessagesPage/>}/>
        </Routes>
      </Router>
  )
}

export default App;
