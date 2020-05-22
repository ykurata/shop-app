import React, { createContext, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  
  const [validationErrors, setValidationErrors ] = useState([]);
  const [error, setError ] = useState("");
 
  const login = (credentials) => {
    axios.post("/user/login", credentials)
      .then(res => {
        const { token } = res.data;
        const decoded = jwt_decode(token);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem("userId", decoded.id);
        window.location = "/";
      })
      .catch(err => {
        setValidationErrors(err.response.data);
        setError(err.response.data.error);
      });
  }

  const signup = (userInfo) => {
    axios.post("/user/register", userInfo)
      .then(res => {
        const { token } = res.data;
        const decoded = jwt_decode(token);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem("userId", decoded.id);
        window.location = "/";
      })
      .catch(err => {
        setValidationErrors(err.response.data);
        setError(err.response.data.error);
      });
  }
  
  return (
    <AuthContext.Provider value={{ validationErrors, error, login, signup }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;