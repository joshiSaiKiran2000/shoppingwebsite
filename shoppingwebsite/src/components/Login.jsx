import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import {  Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch} from 'react-redux'
import { setLogout  } from "../store/reducers";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isNav, setIsNav] = useState(false);

  console.log("props : ", props);
  const dispatch = useDispatch();
  const onSubmitSuccess = (jwtToken) => {
    // Cookies.set('jwt_token', jwtToken, {
    //   expires: '1',
    // });
    Cookies.set('jwt_token', jwtToken, { expires: 1 });
    const name = Cookies.get('jwt_token');
    dispatch(setLogout(true));
    console.log('token : ',name)
    setIsNav(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userName.length ==0 || password.length==0)
    {
      alert('Enter the userName and Password correctly');
      return;
    }
    const obj = JSON.stringify({
      username: userName,
      password: password,
    });
    // const obj = {
    //   username: userName,
    //   password: password,
    // }
    // 83r5^_  = "83r5^_/"
    console.log("JSON obj : ", obj);
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // mor_2314
    // 83r5^_"
    try {
      let result = await axios.post(
        "https://fakestoreapi.com/auth/login",
        obj,
        customConfig
      );
      console.log("result : ", result);
      console.log('login successfully ')
      onSubmitSuccess(result.data.token);
      setUserName("");
      setPassword("");
      toast.success("Login Successfully !");
    } catch (error) {
      console.log('login error : ',error)
      alert('Entered UserName or Password is incorrect ,Please check')
      return
    }
  };
  return (
    <>
      {isNav ? (
        <Navigate to="/" replace={true} />
      ) : (
        <div className="container">
          <div className="login">
            <h1>Login to Shop</h1>
            <form action="">
              <div className="email">
                <label htmlFor="email">UserName :</label>
                <input
                  type="text"
                  name="text"
                  value={userName}
                  placeholder="Enter your UserName ..."
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="password">
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" className="submit" onClick={onSubmit} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login