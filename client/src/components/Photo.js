import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import phone2 from "../images/phone.jpg"

import Navbar from "./Navbar";

class Photo extends Component {

  render() {
    return (
      <div>
        <Navbar></Navbar>

        <div className="container main-photo">
          <div className="text-center title">
            <h4>Add photos to your add</h4>
          </div>
          <div className="row photo-row"> 
            <div className="col-lg-4 col-md-6 upload-img-container">
              <div className="upload-img-outer-element">
                <div className="upload-img-inner-element">
                  <img src={phone2} alt="..." className="rounded upload-img" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 upload-img-container">
              <div className="upload-img-outer-element">
                <div className="upload-img-inner-element">
                  <img src={phone2} alt="..." className="rounded upload-img" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 upload-img-container">
              <div className="upload-img-outer-element">
                <div className="upload-img-inner-element">
                  <img src={phone2} alt="..." className="rounded upload-img" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 upload-img-container">
              <div className="upload-img-outer-element">
                <div className="upload-img-inner-element">
                  <img src="" alt="..." className="rounded upload-img" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 upload-img-container">
              <div className="upload-img-outer-element">
                <div className="upload-img-inner-element">
                  <img src="" alt="..." className="rounded upload-img" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 upload-img-container">
              <div className="upload-img-outer-element">
                <div className="upload-img-inner-element">
                  <img src="" alt="..." className="rounded upload-img" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Photo;