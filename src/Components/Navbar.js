import React from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='header'>
       <nav>
        <span><i class="fa-solid fa-cart-shopping"></i>DailyMondy</span>
      </nav>
      <div className='services'>
          <li><button id='Register'><Link to="/Register">Register</Link></button></li>
          <li><Link to="/Product"><span>Vegetables</span></Link></li>
          <li><Link to="/MyCart"><span>MyCart</span></Link></li>
        </div>
        
    </div>
    
  );
};
