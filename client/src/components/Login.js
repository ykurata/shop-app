import React, { Component } from 'react';
// import axios from 'axios';
// import jwt_decode from "jwt-decode";

import Navbar from "./Navbar";


class Login extends Component {

  render() {
    return(
      <div>
        <Navbar></Navbar>
          <div className="form">
            <form className="text-center border border-light pt-5" onSubmit={this.onSubmit}>
                <p className="h4 mb-4">Log in</p>
                {/* {this.state.error ? 
                  <p className="error">{this.state.error}</p>
                : null}
                {this.state.validationErrors ? 
                  <p className="error">{this.state.validationErrors.email}</p>
                : null} */}
                <input onChange={this.onChange} type="email" name="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" />
                {/* {this.state.validationErrors ? 
                  <p className="error">{this.state.validationErrors.password}</p>
                : null} */}
                <input onChange={this.onChange} type="password" name="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password" />
                <button className="btn btn-primary btn-block my-4" type="submit">Log In</button>
                <p>Not a member?
                    <a href="/signup">Register</a>
                </p>
            </form>
          </div>   
    </div>
    );
  }
}

export default Login;