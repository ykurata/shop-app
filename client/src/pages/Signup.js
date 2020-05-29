import React, { useState, useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import Navbar from "../components/Navbar";

const Signup = (props) => {
  const { validationErrors, error, signup, login } = useContext(AuthContext);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

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

    signup(newUser);
  }

  const demoLogin = e => {
    e.preventDefault();
    const demoUser = {
      email: "yasuko@gmail.com",
      password: "password"
    }
    login(demoUser);
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
        <form className="text-center" onSubmit={demoLogin}>
          <button className="btn btn-primary btn-lg my-4" type="submit">Demo Login</button>
        </form>

      </div>
    </div>
  );
}

export default Signup;