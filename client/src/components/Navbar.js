import React, { Component } from 'react';
import axios from 'axios';
import phone2 from "../images/phone.jpg"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      token: localStorage.getItem("jwtToken")
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    axios("/user/get", { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        this.setState({ 
          user: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  logOut = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href="/"
  }

  render() {
    let navlist;

    if (this.state.token) {
      navlist = <ul className="navbar-nav ml-auto nav-flex-icons">
                  <li className="nav-item avatar dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                        {this.state.user.image ? (
                          <img src={this.state.user.image} className="rounded-circle z-depth-0 navbar-img"
                          alt="avatar image" />
                        ) : 
                          <i className="fas fa-user-circle fa-3x"></i>
                        }
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                      aria-labelledby="navbarDropdownMenuLink-55">
                      <a className="dropdown-item" onClick={this.logOut} href="/logout">Log Out</a>
                    </div>
                  </li>
                </ul>
    } else {
      navlist = <ul className="navbar-nav ml-auto nav-flex-icons">
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Log In</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">Sign Up</a>
                  </li>
                </ul>
    }
    
    return (
     <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
          aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/create">Post Item
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-555" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">Category
              </a>
              <div className="dropdown-menu dropdown-secondary" aria-labelledby="navbarDropdownMenuLink-555">
                <a className="dropdown-item" href="/">Action</a>
                <a className="dropdown-item" href="/">Another action</a>
                <a className="dropdown-item" href="/">Something else here</a>
              </div>
            </li>

            <form className="form-inline">
              <div className="md-form my-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              </div>
            </form>
          </ul>
          {navlist}
        </div>
      </nav>
    </div>  
    );
  }  
}

export default Navbar;