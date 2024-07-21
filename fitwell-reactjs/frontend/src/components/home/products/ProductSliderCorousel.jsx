import React from "react";
import "./Products.css";
import proSlider1 from "../../../assets/img/slider/rev1.png";
import proSlider2 from "../../../assets/img/slider/rev2.png";
import proSlider3 from "../../../assets/img/slider/rev3.png";

const ProductSliderCorousel = () => {
  return (
    
      <div class="sliderContainer" style={{marginBottom : '5vh'}}>
        <div
          id="carouselExampleAutoplaying"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item carouselProducts active">
              <img src={proSlider1} class="d-block w-100" alt="slide1" />
            </div>
            <div class="carousel-item carouselProducts">
              <img
                src={proSlider2}
                class="d-block w-100"
                style={{ height: "30vw" }}
                alt="slide2"
              />
            </div>
            <div class="carousel-item carouselProducts">
              <img src={proSlider3} class="d-block w-100" alt="slide3" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
  
  );
};

export default ProductSliderCorousel;
