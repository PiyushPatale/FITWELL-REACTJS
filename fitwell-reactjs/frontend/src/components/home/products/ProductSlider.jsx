import React, { useRef } from "react";
import "./Products.css";
// import { Container } from 'react-bootstrap';

const ProductSlider = ({ id, children }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    console.log("Direction:", direction);
    const container = containerRef.current;
    console.log("Container:", container);
    const shift = 270;
    if (container) {
      const scrollAmount = direction === "left" ? -shift : shift;
      container.scrollLeft += scrollAmount;
      console.log("Scroll Amount:", scrollAmount);
    }
  };

  return (
    // <div >

    <div id={id}>
      <div ref={containerRef} className="KO_item-container">
        {children}
      </div>
      <div onClick={() => scroll("left")} className="arrow arrow-left">
        <i
          id="latestProductsCategory"
          className="fa fa-angle-double-left"
          aria-hidden="true"
        ></i>
      </div>


      <div onClick={() => scroll("right")} className="arrow arrow-right">
        <i
          id="latestProductsCategory"
          className="fa fa-angle-double-right"
          aria-hidden="true"
        ></i>
      </div>
    </div>
    // </div>
  );
};

export default ProductSlider;
