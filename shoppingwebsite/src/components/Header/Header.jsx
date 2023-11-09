import React from 'react'
import Navbar from './Navbar';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div>
        <header className='header '>
          <h3>
            <Link to={'/'} style={{textDecoration:'none'}}>
           
            Fashion Flair     
            </Link>
          </h3>
          <Navbar />
        </header>
      </div>
    </>
  );
}

export default Header