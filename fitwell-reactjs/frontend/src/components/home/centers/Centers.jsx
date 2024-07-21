import React from "react";
import "./Centers.css";
import CenterBanner from "../../../assets/img/services/image.jpeg";
import Center1 from "../../../assets/img/services/service-11.jpg";
import Center2 from "../../../assets/img/services/service-12.jpg";
import Center3 from "../../../assets/img/services/service-13.jpg";
import Center4 from "../../../assets/img/services/service-14.jpg";
import Center5 from "../../../assets/img/services/service-15.jpg";
import Center6 from "../../../assets/img/services/service-16.jpg";
import Center7 from "../../../assets/img/services/service-17.jpg";
import Center8 from "../../../assets/img/services/service-18.jpg";
import Center9 from "../../../assets/img/services/service-19.jpg";
import {Link} from 'react-router-dom'

const Centers = () => {
  return (
    <div>
      <div class="topbg">
        <img src={CenterBanner} alt="" srcset="" style={{ maxWidth: "100%" }} />
        <div class="toptitleCenter">Nearby Centers</div>
      </div>

      <h2 id="se1">LET'S STAY FIT</h2>
      <h2 id="titleCenter">Fitness and activity centres near you!!</h2>

      <section class="services">
        <div class="center mb-3">
          <img src={Center1} alt="Center1" />
          <h4 id="se2">RHEA'S ZUMBA</h4>
          <p class="centersP" >
            We offer zumba classes for ladies. Please contact us on the below
            mentioned number for more details and enquiry.
          </p>
          <p class="centersP" >
            <i class="fas fa-phone-alt" style={{ color: "orange" }}></i>{" "}
            +91-1283937283
          </p>
          <Link to="https://www.google.com/maps/place/rheas+zumba">
            <i class="fas fa-map-marker-alt" style={{ color: "orange" }}></i>{" "}
            <span style={{ color: "white" }}>: Our Location</span>
          </Link>
          <div class="ratings">
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
          </div>
        </div>
        <div class="center mb-3">
          <img src={Center2} alt="Service center" />
          <h4 id="se2">SAM'S ZUMBA CENTRE</h4>
          <p class="centersP" >
            We offer zumba classes and other services for ladies. Please contact
            us on the mentioned number for more details and enquiry.
          </p>

          <p class="centersP" >
            <i class="fas fa-phone-alt" style={{ color: "orange" }}></i>{" "}
            +91-1283937283
          </p>
          <p class="centersP" >
            <Link to="https://www.google.com/maps/place/sams+zumba">
              <i class="fas fa-map-marker-alt" style={{ color: "orange" }}></i>{" "}
              <span style={{ color: "white" }}>: Our Location</span>
            </Link>
          </p>
          <div class="ratings">
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
          </div>
        </div>
        <div class="center mb-3">
          <img src={Center3} alt="Service center" />
          <h4 id="se2">VANI'S VIPASSANA</h4>
          <p class="centersP" >
            We believe that fitness isn't just about physical exercise - but
            also about mental wellbeing. We offer wide variety of programs.
            Contact us for more info about the same.
          </p>
          <p class="centersP" >
            <i class="fas fa-phone-alt" style={{ color: "orange" }}></i>{" "}
            +91-1283937283
          </p>
          <p class="centersP" >
            <Link to="https://www.google.com/maps/place/vipassana+kendra+igatpuri">
              <i class="fas fa-map-marker-alt" style={{ color: "orange" }}></i>{" "}
              <span style={{ color: "white" }}>: Our Location</span>
            </Link>
          </p>
          <div class="ratings">
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
          </div>
        </div>
        <div class="center mb-3">
          <img src={Center4} alt="Service center" />
          <h4 id="se2">RISHI YOGA</h4>
          <p class="centersP" >
            We are proud to offer yoga classes for all levels, led by certified
            instructors who will guide you through each pose and help you
            improve your flexibility, strength, and mindfulness. Join us today.
          </p>
          <p class="centersP" >
            <i class="fas fa-phone-alt" style={{ color: "orange" }}></i>{" "}
            +91-1283937283
          </p>
          <p class="centersP" >
            <Link to="https://www.google.com/maps/place/rishi+yoga">
              <i class="fas fa-map-marker-alt" style={{ color: "orange" }}></i>{" "}
              <span style={{ color: "white" }}>: Our Location</span>
            </Link>
          </p>
          <div class="ratings">
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
          </div>
        </div>
        <div class="center mb-3">
          <img src={Center5} alt="Service center" />
          <h4 id="se2">GYMKHANA</h4>
          <p class="centersP" >
            We offer zumba classes and other services for ladies. Please contact
            us on the mentioned number for more details and enquiry.
          </p>

          <p class="centersP" >
            <i class="fas fa-phone-alt" style={{ color: "orange" }}></i>{" "}
            +91-1283937283
          </p>
          <p class="centersP" >
            <Link to="https://www.google.com/maps/place/chembur+gymkhana">
              <i class="fas fa-map-marker-alt" style={{ color: "orange" }}></i>{" "}
              <span style={{ color: "white" }}>: Our Location</span>
            </Link>
          </p>
          <div class="ratings">
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
          </div>
        </div>
        <div class="center mb-3">
          <img src={Center6} alt="Service center" />
          <h4 id="se2">RANBHOOMI</h4>
          <p class="centersP" >
            We offer personalized training programs for both indoor and outdoor
            sports. We have trained experts for conducting coaching sessions
            both in the morning and evening. Contact for more info.
          </p>
          <p class="centersP" >
            <i class="fas fa-phone-alt" style={{ color: "orange" }}></i>{" "}
            +91-1283937283
          </p>
          <p class="centersP" >
            <Link to="https://www.google.com/maps/place/ranbhoomi+turf">
              <i class="fas fa-map-marker-alt" style={{ color: "orange" }}></i>{" "}
              <span style={{ color: "white" }}>: Our Location</span>
            </Link>
          </p>
          <div class="ratings">
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
          </div>
        </div>
        <div class="center mb-3">
          <img src={Center7} alt="Service center" />
          <h4 id="se2">NIVEK-POOL</h4>
          <p class="centersP" >
            Our swimming facilities offer a refreshing way to stay in shape and
            improve your overall health. Come take a dip in our pool and
            experience the benefits of swimming for yourself!
          </p>
          <p class="centersP" >
            <i class="fas fa-phone-alt" style={{ color: "orange" }}></i>{" "}
            +91-1283937283
          </p>
          <p class="centersP" >
            <Link to="https://www.google.com/maps/place/nivek+nashik">
              <i class="fas fa-map-marker-alt" style={{ color: "orange" }}></i>{" "}
              <span style={{ color: "white" }}>: Our Location</span>
            </Link>
          </p>
          <div class="ratings">
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
          </div>
        </div>
        <div class="center mb-3">
          <img src={Center8} alt="Service center" />
          <h4 id="se2">GOLD'S GYM</h4>
          <p class="centersP" >
            We are the best gym facility in town. With modern-equipments, and
            trainers available to guide you through your journey. OPEN 24*7.
          </p>
          <p class="centersP" >
            <i class="fas fa-phone-alt" style={{ color: "orange" }}></i>{" "}
            +91-1283937283
          </p>
          <p class="centersP" >
            <Link to="https://www.google.com/maps/place/golds+gym">
              <i class="fas fa-map-marker-alt" style={{ color: "orange" }}></i>{" "}
              <span style={{ color: "white" }}>: Our Location</span>
            </Link>
          </p>
          <div class="ratings">
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
          </div>
        </div>
        <div class="center mb-3">
          <img src={Center9} alt="Service center" />
          <h4 id="se2">MARTIAL ARTS</h4>
          <p class="centersP" >
            We're dedicated to helping you build strength and courage. Join our
            academy choose to learn from different range of martial arts.
            Karate, kungfu, boxing, mma, etc.
          </p>
          <p class="centersP" >
            <i class="fas fa-phone-alt" style={{ color: "orange" }}></i>{" "}
            +91-1283937283
          </p>
          <p class="centersP" >
            <Link to="https://www.google.com/maps/place/golds+gym">
              <i class="fas fa-map-marker-alt" style={{ color: "orange" }}></i>{" "}
              <span style={{ color: "white" }}>: Our Location</span>
            </Link>
          </p>
          <div class="ratings">
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
            <i class="fa fa-star checked m-1"></i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Centers;
