import React from 'react'
import './AboutUs.css'
import home1 from "../../../assets/img/home1.jpg"
import OurTeam from './OurTeam'

const AboutUs = () => {
  return (
    <div>
      <div class="topbg"> 
        <img src={home1} alt="" srcset="" style={{maxWidth: '100%' }}/>
        <div class="toptitle">
            ABOUT US
        </div>
    </div>

    <div class="reasonToChoose">
        <div class=" reasonToChoose-firstLine">
            <h3>WHY TO CHOOSE</h3>
        </div>
        <div class=" reasonToChoose-secondLine">
            <h2>PUSH YOUR LIMITS FORWARD</h2>
        </div>
      <div class="resonToChoose-reasonItems">
        <div class="resonToChoose-Item">
          <i class="fa-solid fa-dumbbell fa-2xl my-5"></i>
          <h5>MODERN EQUIPMENTS</h5>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit nihil perspiciatis odit fugiat error rem blanditiis maiores impedit culpa beatae.</p>
        </div>
        <div class="resonToChoose-Item">
        <i class="fa-brands fa-nutritionix fa-2xl my-5"></i> 
          <h5>HEALTHY NUTRITION PLAN</h5>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit nihil perspiciatis odit fugiat error rem blanditiis maiores impedit culpa beatae.</p>
        </div>
        <div class="resonToChoose-Item">
          <i class="fa-solid fa-table  fa-2xl my-5"></i>
          <h5>TRAINING PLAN</h5>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit nihil perspiciatis odit fugiat error rem blanditiis maiores impedit culpa beatae.</p>
        </div>
        <div class="resonToChoose-Item">
          <i class="fa-solid fa-handshake-angle  fa-2xl my-5"></i>
          <h5>UNIQUE TO YOUR NEEDS</h5>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit nihil perspiciatis odit fugiat error rem blanditiis maiores impedit culpa beatae.</p>
      </div>
      </div>
    </div>
    <OurTeam />
    </div>
  )
}

export default AboutUs