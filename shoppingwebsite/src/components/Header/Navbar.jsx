import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FiMenu } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import Cookies from "js-cookie";
import { setLogout} from '../../store/reducers'
const Navbar = () => {
  const [showNavList, setShowNavList] = useState(false);
  const [isBtn, setIsBtn] = useState(true);
  let { cartItems,flag } = useSelector((state) => state.cart);
  // let flag = false;

  let token = Cookies.get("jwt_token");
  
  const dispatch = useDispatch();
  if(token)
  {
    dispatch(setLogout(true));
  }
  else{
    dispatch(setLogout(false));
  }
  const onLogout = () => {
    const tk = Cookies.remove("jwt_token");
    console.log("deleted token : ", tk);
    dispatch(setLogout(false));
  };
  useEffect(()=>{
    let token = Cookies.get("jwt_token");
    if (token !== undefined) {
      flag = true
    }
  },[isBtn])
  function toggleNavList() {
    console.log("click");
    setShowNavList(!showNavList);
  }
  return (
    <>
      <nav className="nav">
        <ul
          className="nav-list"
          style={{ display: showNavList ? "flex" : null }}
        >
          <Link to={"/"}>
            <li className="nav-list-item">
              <a href="#" className="link nav-link">
                Home
              </a>
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="nav-list-item">
              <a href="#" className="link nav-link">
                About
              </a>
            </li>
          </Link>
          <Link to={"/contact"}>
            <li className="nav-list-item">
              <a href="#" className="link nav-link">
                Contact
              </a>
            </li>
          </Link>
          <Link to={"/blog"}>
            <li className="nav-list-item">
              <a href="#" className="link nav-link">
                Blog
              </a>
            </li>
          </Link>
          <Link to={"/cart"}>
            <li className="nav-list-item cart">
              <button className="shopping-cart-icon">
                <FaShoppingCart />
              </button>
              <span>{cartItems.length}</span>
            </li>
          </Link>
          <Link to={"/signup"}>
            <li className="nav-list-item">
              {flag ? (
                <button
                 
                  className="btn"
                  onClick={onLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  
                  className="btn"
                >
                  SignUp
                </button>
              )}
            </li>
          </Link>
          <Link to={"/login"}>
            <li className="nav-list-item">
              <button
                className="btn"
                style={{ cursor: `${flag ? 'not-allowed':''}` }}
                disabled={flag}
              >
                LogIn{" "}
              </button>
            </li>
          </Link>
        </ul>
        <button
          type="button"
          onClick={toggleNavList}
          className="menu btn--icon nav__hamburger"
          aria-label="toggle navigation"
        >
          {showNavList ? <CgClose /> : <FiMenu />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;