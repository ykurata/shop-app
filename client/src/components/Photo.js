import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import phone2 from "../images/phone.jpg"

import Navbar from "./Navbar";

class Photo extends Component {

  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
     file: []
    };
    this.imageChange = this.imageChange.bind(this)
    this.uploadFiles = this.uploadFiles.bind(this)
  }

  imageChange = e => {
    this.setState({ file: [...this.state.file, URL.createObjectURL(e.target.files[0]) ]})
  }

  uploadFiles(e) {
    e.preventDefault()
    console.log(this.state.file)
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>

        <div className="container main-photo">
          <form>
            <div className="text-center title">
              <h4>Add photos to your add</h4>
            </div>
            <div className="row photo-row"> 
              <div className="col-lg-4 col-md-6 upload-img-container text-center">
                <span>
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <img src={this.state.file[0]} alt="..." className="rounded upload-img" />
                    </div>
                  </div>
                  <label className="btn btn-info mt-4">
                    Select Image
                    <input
                      type="file"
                      name="file"
                      onChange={this.imageChange}
                      hidden
                    />
                  </label>
                </span>
              </div>

              <div className="col-lg-4 col-md-6 upload-img-container text-center">
                <span>
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <img src={this.state.file[1]} alt="..." className="rounded upload-img" />
                    </div>
                  </div>
                  <label className="btn btn-info mt-4">
                    Select Image
                    <input
                      type="file"
                      name="file"
                      onChange={this.imageChange}
                      hidden
                    />
                  </label>
                </span>
              </div>

              <div className="col-lg-4 col-md-6 upload-img-container text-center">
                <span>
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <img src={this.state.file[2]} alt="..." className="rounded upload-img" />
                    </div>
                  </div>
                  <label className="btn btn-info mt-4">
                    Select Image
                    <input
                      type="file"
                      name="file"
                      onChange={this.imageChange}
                      hidden
                    />
                  </label>
                </span>
              </div>
              <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Photo;