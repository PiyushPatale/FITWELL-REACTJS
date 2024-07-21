import React from "react";
import "./Home.css";
import slider1 from "../../../assets/img/corousel_item1.png";
import slider2 from "../../../assets/img/corousel_item2.png";
import slider3 from "../../../assets/img/corousel_item3.png";
import home1 from "../../../assets/img/home1.jpg";
import home2 from "../../../assets/img/home2.jpg";
import home3 from "../../../assets/img/home3.jpg";
import home5 from "../../../assets/img/home5.jpg";
import home6 from "../../../assets/img/home6.jpg";
import home7 from "../../../assets/img/home7.jpg";
import home8 from "../../../assets/img/home8.jpg";
import Pricing from "../pricing/Pricing";
import {Link} from 'react-router-dom'


const Home = (props) => {
  const {setmyAlert} = props;
  return (
    <div>
      <div>
        <div class="sliderContainerHome" id="carousel">
          <div
            id="carouselExampleAutoplaying"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={slider1} class="mainHomeSlider" alt="slide 1" />
              </div>
              <div class="carousel-item">
                <img src={slider2} class="mainHomeSlider" alt="slide 2" />
              </div>
              <div class="carousel-item">
                <img src={slider3} class="mainHomeSlider" alt="slide 3" />
              </div>
            </div>
            <button
              class="carousel-control-prev w-10 h-auto "
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden"></span>
            </button>
            <button
              class="carousel-control-next w-10 h-auto"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true" 
              ></span>
              <span class="visually-hidden"></span>
            </button>
          </div>
        </div>

        <div id="infobutton">
          <button class="infohome">
            <Link to="/AboutUs">Want More Info?</Link>
          </button>
        </div>
        <div class="sliderContainer" id="frontinfo">
          <div class="firstline">SHAPE YOUR BODY</div>
          <div class="secondline">
            BE <span id="colorToOrange" style={{fontSize : '60px'}}>STRONG</span> TRAINING{" "}
            <span id="colorToOrange" style={{fontSize : '60px'}}>HARD</span>{" "}
          </div>
        </div>

        <div class="reasonToChoose ">
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
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
                nihil perspiciatis.
              </p>
            </div>
            <div class="resonToChoose-Item">
              <i class="fa-brands fa-nutritionix fa-2xl my-5"></i>
              <h5>HEALTHY NUTRITION PLAN</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
                nihil perspiciati.
              </p>
            </div>
            <div class="resonToChoose-Item">
              <i class="fa-solid fa-table  fa-2xl my-5"></i>
              <h5>TRAINING PLAN</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
                nihil perspiciatis.
              </p>
            </div>
            <div class="resonToChoose-Item">
              <i class="fa-solid fa-handshake-angle  fa-2xl my-5"></i>
              <h5>UNIQUE TO YOUR NEEDS</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
                nihil perspiciatis.
              </p>
            </div>
          </div>
        </div>

        <div class="ourClasses ">
          <div class="ourClasses-lines my-3">
            <div class=" ourClasses-firstLine">
              <h3>OUR CLASSES</h3>
            </div>
            <div class=" ourClasses-secondLine my-3">
              <h2>WHAT WE CAN OFFER</h2>
            </div>
          </div>

          <div class="ouClasses-cards">
            <div class="card border-0 my-3" style={{ width: "20rem" }}>
              <img src={home2} class="card-img-top-home" alt="..." />
              <div class="card-body bg-black HomeWhatWeOffer justify-content-center py-0">
                <span class="card-desc-1">STRENGTH</span>
                <span class="card-desc-2">WEIGHTLIFTING</span>
              </div>
            </div>
            <div class="card border-0 my-3" style={{ width: "20rem" }}>
              <img src={home3} class="card-img-top-home" alt="..." />
              <div class="card-body bg-black HomeWhatWeOffer justify-content-center">
                <span class="card-desc-1">CARDIO</span>
                <span class="card-desc-2">INDOOR EXERCISES</span>{" "}
              </div>
            </div>
            <div class="card border-0 my-3" style={{ width: "20rem" }}>
              <img src={home5} class="card-img-top-home" style={{height : "213px"}} alt="..." />
              <div class="card-body HomeWhatWeOffer justify-content-center bg-black">
                <span class="card-desc-1">FLEXIBILITY</span>
                <span class="card-desc-2">YOGA</span>{" "}
              </div>
            </div>
          </div>

          <div class="ouClasses-cards-2">
            <div class="card border-0 my-3" style={{ width: "20rem" }}>
              <img src={home6} class="card-img-top-home" alt="..." />
              <div class="card-body HomeWhatWeOffer justify-content-center bg-black">
                <span class="card-desc-1">FITNESS</span>
                <span class="card-desc-2">ZUMBA CLASSES</span>{" "}
              </div>
            </div>
            <div class="card border-0 my-3" style={{ width: "20rem" }}>
              <img src={home7} class="card-img-top-home" alt="..." />
              <div class="card-body HomeWhatWeOffer justify-content-center bg-black">
                <span class="card-desc-1">STRENGTH</span>
                <span class="card-desc-2">KETBELL POWER</span>
              </div>
            </div>
            <div class="card border-0 my-3" style={{ width: "20rem" }}>
              <img src={home8} class="card-img-top-home" alt="..." />
              <div class="card-body HomeWhatWeOffer justify-content-center bg-black">
                <span class="card-desc-1">STRENGTH</span>
                <span class="card-desc-2">Boxing</span>
              </div>
            </div>
          </div>
        </div>

        <div class="appointment ">
          <div class="appoint-img">
            <img
              src={home1}
              alt="REGISTER_NOW_AND_GET_EXCITING_DEALS"
              class="REGISTER_NOW_AND_GET_EXCITING_DEALS overflow-x-hidden"
              style={{margin : "0px"}}
            />
          </div>
          <div class="appoint-info container">
            <div class="appoint-firstLine">
              <h2>REGISTER NOW AND GET EXCITING DEALS</h2>
            </div>
            <div class=" appoint-secondline">
              <div class="col-sm" style={{color : "orangered", fontSize : "30px"}}>
                {18}
                <p class="text-light">Total Members</p>
              </div>
              <div class="col-sm" style={{color : "orangered", fontSize : "30px"}}>
                {5}
                <p class="text-light">Total Collaborators</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pricing setmyAlert={setmyAlert} />
    </div>
  );
};

export default Home;
