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
        <div className="container item-list">
          <div className="list-group">
            <Link to="/" className="card message-card" >
              <div className="row message-card-row">
                {/* <div className="col-lg-1 col-md-1 col-sm-2 text-center">
                  <div className="custom-control form-control-lg custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label mt-2"></label>
                  </div>
                </div>  */}
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
    );
  }
}

export default Message;