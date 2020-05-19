import React, { useState } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";

import Navbar from "../components/Navbar";

const Signup = (props) => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState("");

  const onChange = e => {
    const value = e.target.value;
    setUserInput({
      ...userInput,
      [e.target.name]: value
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
      password2: userInput.password2
    };

    axios.post("/user/register", newUser)
      .then(res => {
        const { token } = res.data;
        const decoded = jwt_decode(token);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem("userId", decoded.id);
        props.history.push("/");
      })
      .catch(err => {
        setValidationErrors(err.response.data);
        setError(err.response.data.error);
      });
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="form">
        <form className="text-center border border-light pt-5" onSubmit={onSubmit}>
          <p className="h4 mb-4">Sign Up</p>
          {error ? 
            <p className="error">
              {error}
            </p>
          : null}
          {validationErrors ? 
            <p className="error">
              {validationErrors.username}</p>
          : null}
          <input onChange={onChange} type="text" name="username" id="defaultRegisterFormName" className="form-control form-control-lg mb-4" placeholder="Name"></input>
          {validationErrors ? 
            <p className="error">
              {validationErrors.email}</p>
          : null}
          <input onChange={onChange} type="email" name="email" id="defaultLoginFormEmail" className="form-control form-control-lg mb-4" placeholder="E-mail" />
          {validationErrors ? 
            <p className="error">
              {validationErrors.password}</p>
          : null}
          <input onChange={onChange} type="password" name="password" id="password" className="form-control form-control-lg mb-4" placeholder="Password" />
          {validationErrors ? 
            <p className="error">
              {validationErrors.password2}</p>
          : null}
          <input onChange={onChange} type="password" name="password2" id="password2" className="form-control form-control-lg mb-4" placeholder="Confirm Password" />
          <button className="btn btn-primary btn-block btn-lg my-4" type="submit">Sign Up</button>
          <p>Already a member?
              <a href="/login">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;