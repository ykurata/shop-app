import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

import phone from '../image/phone.jpg';

import Navbar from "./Navbar";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        {/* display number of items */}
        <div className="container-fluid item-list">
          <div className="row">
            <div className="col-lg-3 col-md-3"></div>
            {/* <div className="col-lg-9 col-md-9">
              {items.length > 0 ? (
                <p>Showing {items.length} items</p>
              ) : (
                null
              )} 
            </div> */}
          </div>
          <div className="row list-outer">

            {/* User's info */}
            <div className="col-lg-3 col-md-3">
              <div className="user-info-container ">
                <div className="user-info text-center m-auto">
                  <div className="user-icon">
                    {/* {user.image ? (
                      <img src={user.image} className="rounded-circle detail-user-avatar" alt="avatar" />
                    ) : (
                      <i className="fas fa-user-circle fa-5x"></i>
                    )} */}
                  </div>
                  <div className="user-name">
                    <h5>Yasuko</h5>
                    <p className="user-joined-date">Joined <Moment format="MMM YYYY">Date</Moment></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-9">
              <div className="list-group">
                {/* display message if there is no items  */}
                {/* {items.length === 0 && this.state.loading === true ? (
                  <div className="text-center mt-5">
                    <h5>No Items</h5>
                  </div>
                ) : (
                  null
                )} */}

                {/* Loading Message */}
                {/* {this.state.loading === false ? (
                  <div className="text-center mt-5">
                    <h5>Loading Items...</h5>
                  </div>  
                ) : (
                  null
                )} */}

                <Link to="/" className="card message-card" >
                  <div className="row message-card-row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                        <div className="no-image text-center"><i className="fas fa-image fa-3x mt-3"></i></div>
                      {/* <img src={phone} alt="..." className="rounded message-list-item-img" /> */}
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <h6><b>iPhone 11</b></h6> 
                      <p className="text mb-2">Is this item still available?</p>
                      <p className="message-username">Yasuko</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;