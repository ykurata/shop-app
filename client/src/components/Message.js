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
        <div className="container item-list">
          
            <div className="list-group">
              <Link to="/" className="card message-card" >
                <div className="card-body row message-card-row">
                  <div className="col-lg-1 col-md-1 text-center">
                    <div className="custom-control form-control-lg custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                      <label className="custom-control-label mt-2"></label>
                    </div>
                  </div> 
                  <div className="col-lg-1 col-md-1 col-sm-1">
                      <div className="no-image text-center"><i className="fas fa-image fa-3x mt-3"></i></div>
                    {/* <img src={phone} alt="..." className="rounded message-list-item-img" /> */}
                  </div>
                  <div className="col-lg-9 col-md-9 col-sm-9 ml-4">
                    <h6><b>iPhone 11</b></h6> 
                    <p className="text mb-2">Is this item still available?</p>
                    <p className="message-username">Yasuko</p>
                  </div>
                </div>
              </Link>
            </div>
        
        </div>
      </div>
    );
  }
}

export default Message;