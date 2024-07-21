import React, { useState } from "react";
import "./AddProduct.css";
import ProductService from "../../../services/ProductService";
import LoaderComp from "../../Loader";

const CompanyAddProduct = (props) => {
  //Used for setting Alert arguments: setmyAlert(msg, type)
  const { setmyAlert } = props;
  const [isLoading, setIsLoading] = useState(false);
  const initialData = {
    name: "",
    description: "",
    price: "",
    category: "",
    productImage: null,
  };
  const [data, setData] = useState(initialData);

  const formHandler = (e) => {
    const { name, value } = e.target;
    if (name === "productImage") {
      data[name] = e.target.files[0];
      setData({ ...data });
    } else {
      data[name] = value;
      setData({ ...data });
    }
  };
  const handleAddProduct = async () => {
    setIsLoading(true);
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    const res = await ProductService.addProduct(formData);
    if (!res.error) {
      setmyAlert(res.msg, "success");
      setData(initialData);
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsLoading(false);
  };

  return (
    <div class="container-fluid">
      <h2 style={{ textAlign: "center", fontWeight: "600" }}>
        Add New Product
      </h2>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <div class="form-container add-product-container">
          <div class="addProductFormAdmin">
            <label className="adminAddProductLabel" for="name">
              Product Name
              <input
                class="addProductInputTextSelect"
                type="text"
                id="name"
                placeholder="Product Name"
                name="name"
                value={data.name}
                required
                onChange={formHandler}
              />
            </label>
            <label className="adminAddProductLabel" for="description">
              Description
              <textarea
                class="addProductInputTextSelect"
                type="text"
                id="description"
                placeholder="Enter Description of new Product"
                name="description"
                value={data.description}
                required
                onChange={formHandler}
              ></textarea>
            </label>
            <label className="adminAddProductLabel" for="price">
              Price
              <input
                class="addProductInputTextSelect"
                type="number"
                min="1"
                id="price"
                value={data.price}
                placeholder="Enter Product Price($)"
                name="price"
                required
                onChange={formHandler}
              />
            </label>
            <label className="adminAddProductLabel" for="category">
              Category of the Product
            </label>
            <select
              class="addProductInputTextSelect"
              name="category"
              id="category"
              value={data.category}
              onChange={formHandler}
            >
              <option
                class="addProductInputTextSelect"
                value="#"
              >
                Select Category
              </option>
              <option
                class="addProductInputTextSelect"
                value="Energy & Endurance"
              >
                Energy & Endurance
              </option>
              <option
                class="addProductInputTextSelect"
                value="Recovery & Repair"
              >
                Recovery & Repair
              </option>
              <option class="addProductInputTextSelect" value="Whey Proteins">
                Whey Proteins
              </option>
              <option class="addProductInputTextSelect" value="Nutrients">
                Nutrients
              </option>
            </select>
            <label className="adminAddProductLabel" for="productImage">
              Product Image [Image type : png(only)]
              <input
                class="addProductInputTextSelect product-img"
                type="file"
                id="productImage"
                name="productImage"
                placeholder="Upload Image"
                required
                onChange={formHandler}
              />
            </label>

            <button
              class="addProductButton"
              id="add-product-btn"
              onClick={() => {
                handleAddProduct();
              }}
            >
              Add Preduct
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyAddProduct;
