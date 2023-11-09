import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

import axios from "axios";
import "./Home.css";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/reducers";
import Cookies from "js-cookie";
import { Navigate } from "react-router";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, SetIsloading] = useState(true);
  const [error,setError] = useState(false)

  let token = Cookies.get("jwt_token");
  console.log("token : ", token);

  async function apiCall() {
    try {
      const prod = await axios.get("https://fakestoreapi.com/products");
      setProducts(prod.data);
      SetIsloading(false);
    } catch (error) {
      console.log("error ", error);
      setError(true)
      SetIsloading(false);
    }
  }
  useEffect(() => {
    apiCall();
  }, []);

  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.cartItems);
  console.log("carts : ", carts);
  
  function onAddHandler(options) {
    dispatch(addToCart(options));
    console.log("add to cart");
    toast.success("Added To Cart");
  }

  return (
    <>
      {!token ? (
        <Navigate to="/login" replace={true} />
      ) : isLoading ? (
        <div className="loader">
           <TailSpin color="black" radius={"8px"} />
        </div>
      ) : error ? (
        <h1>No items Found</h1>
      ) : (
        <div className="shopping-cart-wrapper">
          {products.map((item, index) => {
            return (
              <ProductItem
                key={index}
                rating={item.rating}
                title={item.title}
                id={item.id}
                price={item.price}
                imgSrc={item.image}
                handler={onAddHandler}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const ProductItem = ({ id, title, price, imgSrc, handler, rating }) => {
  return (
    <div className="product_card">
      <img src={imgSrc} alt={"img"} />
      <h4>{title}</h4>
      <p>$ {price}</p>
      <div className="rating">
        <div className="points">rating : {rating.rate}</div>
        <div className="members">count : {rating.count}</div>
      </div>
      <button
        onClick={() => handler({ id, title, price, imgSrc, quantity: 1 })}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Home;