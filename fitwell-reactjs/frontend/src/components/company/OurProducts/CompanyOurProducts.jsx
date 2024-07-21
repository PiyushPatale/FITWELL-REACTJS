import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import LoaderComp from "../../Loader";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../store/slices/productsSlice.jsx";

const CompanyOurProducts = (props) => {
  const [data, setData] = useState(null);
  const { setmyAlert } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsState.products);

  const getProductsInfo = async () => {
    try {
      setIsLoading(true);
      const res = await ProductService.getProductsList();
      if (!res.error) {
        dispatch(setProducts(res.data));
        setData(res.data);
      } else {
        setmyAlert(res.msg, "error");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    setIsLoading(true);
    const res = await ProductService.deleteProduct({ productId: id });
    if (!res.error) {
      setmyAlert(res.msg, "success");
      getProductsInfo();
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if(products ===null || products === undefined ){

      getProductsInfo();
    }else{
      setData(products);
    }
    
  }, []);
  let count = 1;
  return (
    <div className="container-fluid px-4">
      <div className="dashboard-content" id="dashboard-order-page">
        <h1 className="past-order-heading"> Our Products</h1>
        <div className="container">
          <div className="container-fluid px-4 overflow-scroll">
            <div className="row my-5">
              {isLoading ? (
                <LoaderComp />
              ) : (
                <div className="col">
                  <table className="table bg-white rounded shadow-sm  table-hover">
                    <thead>
                      <tr>
                        <th scope="col" width="50">
                          Sr.
                        </th>
                        <th scope="col">Product ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price(₹)</th>
                        <th scope="col">Status</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.ourProducts !== undefined &&
                        data.ourProducts !== null &&
                        data.ourProducts.map((item) => (
                          <tr>
                            <th scope="row">{count++}</th>
                            <td>{item._id}</td>
                            <td>
                              <button
                                type="button"
                                // class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target={`#Modal${item._id}`}
                                style={{
                                  border: "none",
                                  backgroundColor: "inherit",
                                  fontWeight: "bold",

                                  // color : '#09f'
                                }}
                              >
                                <i>{item.name}</i>
                              </button>
                            </td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td style={{ color: "green" }}>
                              <select
                                name="productStatus"
                                id="productStatus"
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  padding: "0",
                                  margin: "0",
                                  width : '5vw',
                                  boxShadow : 'none',
                                  border : 'none',
                                  borderBox :'0'
                                }}
                              >
                                <option style={{color : 'green'}} value="inStock">In Stocks</option>
                                <option style={{color : 'red'}} value="outOfStock">Out of Stock</option>
                              </select>
                            </td>
                            <td style={{ padding: "0%" }}>
                              <button
                                type="submit"
                                style={{
                                  border: "none",
                                  fontWeight : 'bold',
                                  backgroundColor: "transparent",
                                  padding: "auto",
                                }}
                                onClick={() => handleDeleteProduct(item._id)}
                              >
                                <i
                                  className="fa-solid fa-trash"
                                  style={{
                                    color: "red",
                                    backgroundColor: "transparent",
                                    fontWeight : '900',
                                    cursor: "pointer",
                                    padding: "0%",
                                  }}
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      {data &&
                        data.ourProducts !== undefined &&
                        data.ourProducts !== null &&
                        data.ourProducts.map((item) => (
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
                                      Category : {item.category}
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
                                    Price :{" "}
                                    <span
                                      id="product-modal-price card-text-product"
                                      style={{ color: "green" }}
                                    >
                                      Rs.{item.price}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOurProducts;
