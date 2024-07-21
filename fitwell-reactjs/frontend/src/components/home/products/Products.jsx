import React, { useEffect, useState } from "react";
import "./Products.css";
import ProductSliderCorousel from "./ProductSliderCorousel";
import ProductService from "../../../services/ProductService";
import { Buffer } from "buffer";
import UserActionService from "../../../services/UserActionService";
import LoaderComp from "../../Loader";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../store/slices/productsSlice.jsx";
import ProductSearch from "./ProductSearch.jsx";
import ProductSlider from "./ProductSlider.jsx";

const mapCategoryTitle = [
  { title: "Latest Product", category: "LatestCategory" },
  { title: "Whey Proteins", category: "ProteinCategory" },
  { title: "Nutrients : Vitamins & Minerals", category: "NutrientsCategory" },
  { title: "Energy & Endurance", category: "EnergyCategory" },
  { title: "Recovery & Repairs", category: "RecoveryCategory" },
];

const Products = (props) => {
  // const navigate = useNavigate();
  const { setmyAlert } = props;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsState.products);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = useSelector((state) => state.user.userDetails);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const initialData = {
    search: "",
    filter: "pricelow",
  };
  const [result, setResult] = useState(initialData);
  const [resultFilter, setResultFilter] = useState(initialData);
  const [searchResultData, setSearchResultData] = useState(null);
  const [searchResultCountData, setSearchResultCountData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [searchFormData, setSearchFormData] = useState(null);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const res = await ProductService.getProducts();
      if (!res.error) {
        dispatch(setProducts(res.data));
        setData(res.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const formHandler = (e) => {
    const { name, value } = e.target;
    result[name] = value;
    setResult({ ...result });
  };
  const formHandlerFilter = (e) => {
    const { name, value } = e.target;
    resultFilter[name] = value;
    setResultFilter({ ...resultFilter });
  };

  const handleOnSubmit = async () => {
    try {
      setIsLoading(true);
      console.log("🚀 ~ handleOnSubmit ~ searchQuery:", result);
      const res = await ProductService.getProductsSearchResult(result);
      if (!res.error) {
        setSearchResultData(res.data.searchResult);
        setSearchResultCountData(res.data.searchResultCount);
        setSearchData(res.data.search);
        setFilterData(res.data.filter);
        setSearchFormData(res.data);
        setResultFilter(result);
        setResult(initialData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ handleOnSubmit ~ error:", error);
      return { error: true, msg: error.message };
    }
  };
  const handleOnSubmitFilter = async () => {
    try {
      setIsLoading(true);
      const res = await ProductService.getProductsSearchResult(resultFilter);
      if (!res.error) {
        setSearchResultData(res.data.searchResult);
        setSearchResultCountData(res.data.searchResultCount);
        setSearchData(res.data.search);
        setFilterData(res.data.filter);
        setSearchFormData(res.data);

        setIsLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ handleOnSubmit ~ error:", error);
      return { error: true, msg: error.message };
    }
  };

  const handleAddToCart = async (productid) => {
    if (
      isLoggedIn === undefined ||
      isLoggedIn == null ||
      userDetails === undefined ||
      userDetails === null ||
      isLoggedIn === false
    ) {
      setmyAlert("SignIn To Buy Product", "error");
    } else {
      const obj = {
        productid: productid,
        userid: userDetails._id,
      };
      const res = await UserActionService.addToCart(obj);
      setmyAlert(res.msg, res.error ? "error" : "success");
    }
  };
  const handleBackSubmit = async () => {
    setSearchData(null);
  };

  useEffect(() => {
    if (products == null || products === undefined) {
      getProducts();
    } else {
      setData(products);
    }
  }, [
    data,
    searchData,
    searchFormData,
    searchResultCountData,
    searchResultData,
    filterData,
  ]);

  return (
    <div>
      <ProductSliderCorousel />
      {searchData === null ? (
        isLoading ? (
          <LoaderComp />
        ) : (
          <>
            {mapCategoryTitle &&
              mapCategoryTitle.map((it, index) => (
                <div key={index}>
                  <div className="latestProductsHeader" >
                    <div className="latestTradings">
                      <h3 className="title_LT">{it.title}</h3>
                      <i
                        id="rightArrow"
                        className="fa fa-solid fa-2x fa-angle-right"
                        aria-hidden="true"
                      ></i>
                    </div>
                    {it.category === "LatestCategory" ? (
                      <div className="search-container">
                        <input
                          style={{ marginTop: "0%" }}
                          type="text"
                          placeholder="Search.."
                          name="search"
                          onChange={(e) => formHandler(e)}
                        />
                        <input
                          className="d-none"
                          type="text"
                          name="filter"
                          value="pricelow"
                          onChange={(e) => formHandler(e)}
                        />
                        <button
                          className="searchIcon"
                          onClick={() => handleOnSubmit()}
                        >
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className="productsSection">
                    {/* <div
                      id={`arrowLeft${it.category}`}
                      className="arrow arrow-left"
                      
                    >
                      <i
                        id="latestProductsCategory"
                        className="fa fa-angle-double-left"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div
                      id={`arrowRight${it.category}`}
                      className="arrow arrow-right"
                      
                    >
                      <i
                        id="latestProductsCategory"
                        className="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                    </div> */}

                    {/* <div  className="allProduct mx-3"> */}
                      <ProductSlider id={it.category}
                        children={
                          data &&
                          data[it.category] !== undefined &&
                          data[it.category] !== null &&
                          data[it.category].map((item) => (
                            <div className="col mx-2">
                              <div className="inner-col">
                                <div className="card h-auto bg-dark" style={{borderTopRightRadius : '10px', borderTopLeftRadius : '10px'}}>
                                  <button
                                    type="button"
                                    className="btn-decs-container"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#${it.category}Modal${item._id}`}
                                  >
                                    <div className="decs-container">
                                      <img
                                        className="card-img-top-product"
                                        style={{borderTopRightRadius : '5px', borderTopLeftRadius : '5px'}}
                                        alt="p1"
                                        src={`data:image/${
                                          item.img.contentType
                                        };base64,${Buffer.from(
                                          item.img.data
                                        ).toString("base64")}`}
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
                                        <p className="card-text-product">
                                          {item.category}
                                        </p>
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
                                      data-bs-target={`#${it.category}Modal${item._id}`}
                                    >
                                      Add To Cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      />
                    {/* </div> */}
                    <div id={`${it.category}${"Modal"}`}>
                      {data &&
                        data[it.category] !== undefined &&
                        data[it.category] !== null &&
                        data[it.category].map((item) => (
                          <div
                            className="modal"
                            id={`${it.category}Modal${item._id}`}
                          >
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
                                      };base64,${Buffer.from(
                                        item.img.data
                                      ).toString("base64")}`}
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
                                    <p className="productsP">
                                      {item.description}
                                    </p>
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
              ))}
          </>
        )
      ) : isLoading ? (
        <LoaderComp />
      ) : (
        <>
          <ProductSearch
            formHandler={formHandler}
            handleOnSubmit={handleOnSubmit}
            formHandlerFilter={formHandlerFilter}
            handleOnSubmitFilter={handleOnSubmitFilter}
            searchResult={searchResultData}
            searchResultCount={searchResultCountData}
            search={searchData}
            filter={filterData}
            handleAddToCart={handleAddToCart}
            handleBackSubmit={handleBackSubmit}
          />
        </>
      )}
    </div>
  );
};

export default Products;
