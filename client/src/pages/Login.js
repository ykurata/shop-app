import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from "../components/Navbar";

const Login = (props) =>  {
  const { validationErrors, error, login } = useContext(AuthContext);
  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
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

    const user = {
      email: userInput.email,
      password: userInput.password
    };

    login(user);
  }

  return(
    <div>
      <Navbar></Navbar>
        <div className="form">
          <form className="text-center border border-light pt-5" onSubmit={onSubmit}>
              <p className="h4 mb-4">Log in</p>
              {error ? 
                <p className="error">{error}</p>
              : null}
              {validationErrors ? 
                <p className="error">{validationErrors.email}</p>
              : null}
              <input onChange={onChange} type="email" name="email" id="defaultLoginFormEmail" className="form-control form-control-lg mb-4" placeholder="E-mail" />
              {validationErrors ? 
                <p className="error">{validationErrors.password}</p>
              : null}
              <input onChange={onChange} type="password" name="password" id="defaultLoginFormPassword" className="form-control form-control-lg mb-4" placeholder="Password" />
              <button className="btn btn-primary btn-block btn-lg my-4" type="submit">Log In</button>
              <p>Not a member?
                  <a href="/signup">Register</a>
              </p>
          </form>
        </div>   
    </div>
  );
}

export default Login;