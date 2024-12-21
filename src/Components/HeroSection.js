import React from 'react'
import './Hero.css'

import heroImg from "./productImg/heroImg.jfif";

export default function HeroSection() {
  return (
    <div>
      <div className='hero-page'>
               <img src={heroImg} id='heroImg'/>
               <div className='hero-heading'>
                <h1>Fresh Vegetables, Delivered Daily to Your DoorStep !</h1>
                <p>Experience the goodness of farm-fresh produce, handpicked and delivered with care. shop now and taste the difference.</p>
                <button id='readmore'>Read More</button>
               </div>
              </div>
    </div>
    
  )
}
