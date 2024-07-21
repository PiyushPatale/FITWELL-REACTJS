import React, { useEffect, useState } from 'react';
import LoaderComp from '../../Loader'
import "./Services.css";
import home4 from '../../../assets/img/home4.jpg'
import service1 from '../../../assets/img/services/service-1.jpg'
import service2 from '../../../assets/img/services/service-2.jpg'
import service3 from '../../../assets/img/services/service-3.jpg'
import service4 from '../../../assets/img/services/service-4.jpg'
import service5 from '../../../assets/img/services/service-5.jpg'
import service6 from '../../../assets/img/services/service-6.jpg'
import service7 from '../../../assets/img/services/service-7.jpg'
import service8 from '../../../assets/img/services/service-8.jpg'
import service9 from '../../../assets/img/services/service-9.jpg'

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let didMount = true; 
    const setLoadingFalse = () => {
        setTimeout(() => {
            if (didMount) {
                setIsLoading(false);
            }
        }, 1500); 
    };

    setLoadingFalse(); 
    return () => {
        didMount = false;
    };
}, [isLoading]); //

  return (
    <div>
      {
        isLoading && (
          <LoaderComp/>
        )
      }
      <div class="topbg">
      <img src={home4} alt="" srcset="" style={{maxWidth: "100%"}} />
      <div class="toptitleService">
        SERVICES
      </div>
    </div>

    <h2 id="se1">WHAT WE DO ?</h2>
    <h2 id="titleService">PUSH YOUR LIMITS FORWARD</h2>

    <section class="services">
      <div class="service mb-3">
        <img src={service1} alt="Service 1" />
        <h4 id="se2">BODY BUILDING</h4>
        <p class="servicesP" >
          "Welcome to our gym, where we help you build your dream body. Our
          expert trainers and state-of-the-art equipment will help you achieve
          your fitness goals. Join us today and become the best version of
          yourself!"
        </p>
      </div>
      <div class="service mb-3">
        <img src={service2} alt='service 2' />
        <h4 id="se2">GROUP CLASSES</h4>
        <p class="servicesP" >
          We offer a wide variety of group classes, from high-intensity interval
          training to yoga and Pilates. Our experienced instructors are here to
          guide and motivate you every step of the way, helping you achieve your
          fitness goals in a fun and supportive environment. Come join us for a
          class today!
        </p>
      </div>
      <div class="service mb-3">
        <img src={service3} alt='service 3' />
        <h4 id="se2">DIET PLAN</h4>
        <p class="servicesP" >
          We believe that fitness isn't just about exercise - it's also about
          proper nutrition. That's why we offer personalized diet plans to help
          you achieve your health goals. Contact us today to get started on your
          journey towards a healthier you!
        </p>
      </div>
      <div class="service mb-3">
        <img src={service4} alt='service 4' />
        <h4 id="se2">SWIMMING</h4>
        <p class="servicesP" >
          Our swimming facilities offer a refreshing way to stay in shape and
          improve your overall health. Come take a dip in our pool and
          experience the benefits of swimming for yourself!"
        </p>
      </div>
      <div class="service mb-3">
        <img src={service5} alt='service 5' />
        <h4 id="se2">YOGA</h4>
        <p class="servicesP" >
          We are proud to offer yoga classes for all levels, led by certified
          instructors who will guide you through each pose and help you improve
          your flexibility, strength, and mindfulness. Join us today and
          experience the many benefits of this ancient practice.
        </p>
      </div>
      <div class="service mb-3">
        <img src={service6} alt='service 6' />
        <h4 id="se2">PERSONAL TRAINING</h4>
        <p class="servicesP" >
          We offer personalized training programs designed to help you achieve
          your fitness goals. Our certified trainers are dedicated to helping
          you succeed and will work with you every step of the way."
        </p>
      </div>
      <div class="service mb-3">
        <img src={service7} alt='service 7' />
        <h4 id="se2">MOUNT CLIMBING</h4>
        <p class="servicesP" >
          We are proud to offer top-notch mount climbing services to help you
          reach new heights. With expert trainers, state-of-the-art equipment,
          and a supportive community, we are here to help you conquer any
          mountain."
        </p>
      </div>
      <div class="service mb-3">
        <img src={service8} alt='service 8' />
        <h4 id="se2">BOXING</h4>
        <p class="servicesP" >
          We're proud to offer top-notch boxing training services to help you
          reach your fitness goals. Our experienced coaches are here to guide
          and support you every step of the way. Let's get ready to knock out
          those fitness goals together!"
        </p>
      </div>
      <div class="service mb-3">
        <img src={service9} alt='service 9' />
        <h4 id="se2">STRENGTH TRAINING</h4>
        <p class="servicesP" >
          we're dedicated to helping you build strength and achieve your fitness
          goals. Our state-of-the-art equipment and knowledgeable trainers are
          here to guide you every step of the way on your journey to a stronger,
          healthier you."
        </p>
      </div>
    </section>
    </div>
  )
}

export default Services