import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';

import Avatar from "../pages/Avatar";

const Navbar = () => {
  const { user, token, userId, getUserById } = useContext(UserContext);
  const { logOut } = useContext(AuthContext);
  
  useEffect(() => {
    getUserById(userId);
  }, []);

  let navlist;

  if (token) { 
    navlist = <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item mt-2">
                <a className="nav-link" href="/message">Message
                {/* {badge} */}
                </a>
              </li>
              <li className="nav-item avatar dropdown">
                <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                    {user.image ? (
                      <img src={user.image} className="rounded-circle z-depth-0 navbar-img"
                      alt="avatar" />
                    ) : 
                      <span style={{ fontSize: "0.8rem"}}>
                        <i className="fas fa-user-circle fa-3x"></i>
                      </span> 
                    }
                </div>
                <div className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink-55">
                  <a className="dropdown-item" href="/profile-image" data-toggle="modal" data-target="#avatarModal" >Profile Image</a>
                  <a className="dropdown-item" href={`/items-by-user/${userId}`}>My Post</a>
                  <a className="dropdown-item" onClick={logOut} href="/logout">Log Out</a>
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
          </ul>
          {navlist}
        </div>
      </nav>
        
      <div className="modal fade" id="avatarModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="col-12 modal-title text-center" id="exampleModalLabel">
                Profile Image
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </h5>
            </div>
            <div className="modal-body">
              <Avatar/>
            </div>
          </div>
        </div>
      </div>
      
    </div>  
  );
}

export default Navbar;