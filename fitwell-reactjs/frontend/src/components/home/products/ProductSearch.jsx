import React from "react";
import { Buffer } from "buffer";

import "./Products.css";
// import ProductSliderCorousel from "./ProductSliderCorousel";

const ProductSearch = ({
  formHandler,
  handleOnSubmit,
  formHandlerFilter,
  handleOnSubmitFilter,
  searchResult,
  searchResultCount,
  search,
  filter,
  handleAddToCart,
  handleBackSubmit
}) => {
  return (
    <div>
      {/* <ProductSliderCorousel /> */}
      
      <div class="latestProducts py-0">
        <div class="latestProductsHeader">
          <div class="latestTradings">
          <button class="bg-black d-flex flex-row" style={{border : 'none'}} onClick={handleBackSubmit}>
            <i
              id="rightArrow"
              class="fa fa-solid fa-2x fa-angle-left mx-2"
              // aria-hidden="true"
            >
            </i>
            <h3 style={{color : 'white', textDecoration : 'underline', textDecorationColor : 'gray'}}>Back to Main Product Page</h3>
          </button>
          </div>
          <div
            class="filters d-flex py-2"
            style={{
              flexDirection: "row",
              width: "20%",
              alignContent: "center",
            }}
          >
            <input
              class="d-none "
              type="text"
              name="search"
              value={search}
              // onChange={(e) => formHandler(e)}
            />
            <select
              name="filter"
              onChange={(e) => formHandlerFilter(e)}
              id="filterID"
              style={{
                color: "black",
                borderRadius: "5px",
                fontWeight: "bold",
                fontSize: "2vh",
                padding: "0",
                margin: "0",
              }}
            >
              <option value="">Select Filters</option>
              <option value="pricelow">Lowest Price</option>
              <option value="pricehigh">Highest Price</option>
              <option value="energy">Energy & Endurance</option>
              <option value="nutrients">Nutrients</option>
              <option value="repair">Recovery & Repair</option>
              <option value="protein">Whey Protein</option>
            </select>
            <button
              style={{
                marginLeft: "1vw",
                borderRadius: "5px",
                fontWeight: "bold",
                color: "white",
                width: "20vw",
                fontSize: "2vh",
              }}
              class="bg-secondary"
              onClick={() => handleOnSubmitFilter()}
            >
              Apply Filter
            </button>
          </div>

          <div class="search-container d-flex flex-row my-2">
            <input
              class="m-0"
              type="text"
              placeholder="Search..."
              name="search"
              // value={search}
              onChange={(e) => formHandler(e)}
            />
            <input
              class=" d-none"
              type="text"
              name="filter"
              value="pricelow"
              onChange={(e) => formHandler(e)}
            />
            <button class="searchIcon m-0" onClick={() => handleOnSubmit()}>
              <i class="fa p-1 fa-search m-auto"></i>
            </button>
          </div>
        </div>
        <div class="productsSection">
          <div class="row row-cols-2 row-cols-md-5 container-fluid mx-0 my-4">
            {searchResultCount === 0 ? (
              <h1 style={{ textAlign: "center", color: "#f00", width: "100%" }}>
                No Product Found !
              </h1>
            ) : (
              <h3
                style={{
                  textAlign: "left",
                  width: "100%",
                  color: "#0f0",
                  marginBottom: "20px",
                }}
              >
                {searchResultCount} Results Found for Your Search : {search}
              </h3>
            )}
            {searchResult !== null &&
              searchResult &&
              searchResult.map((item) => (
                <div className="col mx-0">
                  <div className="inner-col">
                    <div className="card h-auto bg-dark">
                      <button
                        type="button"
                        className="btn-decs-container"
                        data-bs-toggle="modal"
                        data-bs-target={`#Modal${item._id}`}
                      >
                        <div className="decs-container">
                          <img
                            className="card-img-top-product"
                            alt="p1"
                            src={`data:image/${
                              item.img.contentType
                            };base64,${Buffer.from(item.img.data).toString(
                              "base64"
                            )}`}
                          />
                          <div className="card-body-product p-2">
                            <h5
                              style={{
                                fontFamily: "Ubuntu, sans-serif",
                              }}
                              className="card-title text-white"
                            >
                              {item.name}
                            </h5>
                            <p className="card-text-product">{item.category}</p>
                          </div>
                        </div>
                      </button>
                      <div
                        className="card-footer"
                        style={{
                          paddingLeft: "0%",
                          paddingRight: "0%",
                        }}
                      >
                        <p className="card-footer-price card-text-product">
                          Price : Rs.
                          <span id="product-modal-price card-text-product">
                            {item.price}
                          </span>
                        </p>
                        <button
                          className="card-footer-AddToCart"
                          data-bs-toggle="modal"
                          data-bs-target={`#Modal${item._id}`}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {searchResult !== null &&
              searchResult &&
              searchResult.map((item) => (
                <div className="modal" id={`Modal${item._id}`}>
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5 text-center"
                          id="exampleModalLabel"
                        >
                          {item.name}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="modal-product_img">
                          <img
                            className="card-img-top-modal"
                            alt="p2"
                            src={`data:image/${
                              item.img.contentType
                            };base64,${Buffer.from(item.img.data).toString(
                              "base64"
                            )}`}
                          />
                        </div>
                        <div className="modal-product-description">
                          <h3
                            style={{ textAlign: "center" }}
                            className="card-text-product"
                          >
                            Category {item.category}
                          </h3>
                          <h3>About</h3>
                          <p className="productsP">{item.description}</p>
                        </div>
                      </div>
                      <div
                        className="modal-footer bg-black"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "larger",
                        }}
                      >
                        <p className="card-footer-price card-text-product">
                          Price : Rs.{" "}
                          <span id="product-modal-price card-text-product">
                            {item.price}
                          </span>
                        </p>

                        <button
                          type="submit"
                          className="btn bg-dark"
                          onClick={() => {
                            handleAddToCart(item._id);
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
