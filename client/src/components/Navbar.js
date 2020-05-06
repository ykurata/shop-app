import React, { Component } from 'react';
import axios from 'axios';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId"),
      notifications: ""
    };
  }

  componentDidMount() {
    this.getUser();
    this.getNotifications();
  }

  getUser() {
    axios.get(`/user/get/${this.state.userId}`)
      .then(res => {
        this.setState({ 
          user: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getNotifications() {
    axios.get(`/message/notifications/${this.state.userId}`, { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        this.setState({ notifications: res.data });
      })
      .catch(err => {
        console.log(err);
      })
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
                    <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                        {this.state.user.image ? (
                          <img src={this.state.user.image} className="rounded-circle z-depth-0 navbar-img"
                          alt="avatar" />
                        ) : 
                          <span style={{ fontSize: "0.8rem"}}>
                            <i className="fas fa-user-circle fa-3x"></i>
                          </span> 
                        }
                    </div>
                    <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                      aria-labelledby="navbarDropdownMenuLink-55">
                      <a className="dropdown-item" href="/profile-image">Profile Image</a>
                      <a className="dropdown-item" href={`/items-by-user/${this.state.userId}`}>My Post</a>
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
      <nav className="navbar navbar-expand-md navbar-dark">
        <a className="navbar-brand" href="/">Yajiji</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
          aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Search</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/create">Post Item
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/message">Message
              {this.state.notifications.length > 0 ? (
                <span className="badge badge-pill badge-danger" >new</span>
              ) : (
                null
              )}
              </a>
            </li>
          </ul>
          {navlist}
        </div>
      </nav>
    </div>  
    );
  }  
}

export default Navbar;