import React from 'react'
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Login from './components/Login';
import SignUp from './components/SignUp';
import About from './components/About';
import Contact from './components/Contact';
import { Route, Routes,BrowserRouter as Router } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
const App = () => {

  return (
    <>
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<div><Home /></div>}></Route>
                <Route exact path="/cart" element={<div><Cart /></div>}></Route>
                <Route exact path="/login" element={<div><Login /></div>}></Route>
                <Route exact path="/signup" element={<div><SignUp /></div>}></Route>
                <Route exact path="/about" element={<div><About /></div>}></Route>
                <Route exact path="/contact" element={<div><Contact /></div>}></Route>
            </Routes>
            <Toaster />
        </Router>
    </>
  )
}

export default App