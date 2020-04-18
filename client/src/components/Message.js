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
              <div className="card list-group-item" >
                <Link to="/" className="card-link">
                  <div className="card-body row">
                    <div className="col-lg-3 col-md-3 col-sm-2">
                        {/* <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div> */}
                      <img src={phone} alt="..." className="rounded list-item-img" />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-10">
                      <h5 className="item-title">iPhone 11</h5>
                      <p className="date"><Moment format="MM/DD/YYYY">Date</Moment></p>
                      <p className="description">Bacon ipsum dolor amet buffalo frankfurter spare ribs fjsbvjbsk nsjdvns  vjsdknlvsjdlsjdlsdblsjdlsbdvlsjb.</p>
                    </div>
                  </div>
                </Link>   
              </div>
            </div>
        
        </div>
      </div>
    );
  }
}

export default Message;