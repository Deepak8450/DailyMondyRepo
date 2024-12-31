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
              <div className='read-more'>
                <h1 id='title'>Welcome To our Daily-Mandi</h1>
                <p className='description'>At Daily Mandi, we are committed to bringing you the finest selection of grains and the freshest Vegetables directly from local farmers. Our mission is to support sustainable agriculture and provide our customers with nutritious, high-quality produce. Whether you're looking for staple grains like <b>Rice ,Wheat</b> and seasonal Vegetables, we ensure that every products meets our stringent quality standards.</p>
              </div>
    </div>
    
  )
}
