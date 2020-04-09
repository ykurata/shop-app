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
     file1: null,
     file2: null,
     file3: null,
     file4: null
    };
  }

  // imageChange = e => {
  //   this.setState({ file: [...this.state.file, URL.createObjectURL(e.target.files[0]) ]})
  // }

  imageChange = e => {
    this.setState({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });
  }
  
  clearImage1 = e => {
    this.setState({ file1: null });
  }

  clearImage2 = e => {
    this.setState({ file2: null });
  }

  clearImage3 = e => {
    this.setState({ file3: null });
  }

  clearImage4 = e => {
    this.setState({ file4: null });
  }
  

  onSubmit = e => {
    e.preventDefault();
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
              <div className="col-lg-3 col-md-6 upload-img-container text-center">
                {this.state.file1  ? (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <img src={this.state.file1} alt="..." className="rounded upload-img" />
                      </div>
                    </div>
                    <label className="btn btn-info mt-3 mr-2">
                      Select Image
                      <input
                        type="file"
                        name="file1"
                        onChange={this.imageChange}
                        hidden
                      />
                    </label>
                    <label className="btn btn-secondary btn-sm mt-3" onClick={this.clearImage1}>
                      <i className="fas fa-times fa-2x"></i>
                    </label>
                  </span>
                ) : (
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                      <label className="btn btn-info mt-4">
                        Select Image
                        <input
                          type="file"
                          name="file1"
                          onChange={this.imageChange}
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-3 col-md-6 upload-img-container text-center">
                {this.state.file2 ? (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <img src={this.state.file2} alt="..." className="rounded upload-img" />
                      </div>
                    </div>
                    <label className="btn btn-info mt-3 mr-2">
                      Select Image
                      <input
                        type="file"
                        name="file1"
                        onChange={this.imageChange}
                        hidden
                      />
                    </label>
                    <label className="btn btn-secondary btn-sm mt-3" onClick={this.clearImage2}>
                      <i className="fas fa-times fa-2x"></i>
                    </label>
                  </span>
                ) : (
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                      <label className="btn btn-info mt-4">
                        Select Image
                        <input
                          type="file"
                          name="file2"
                          onChange={this.imageChange}
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-3 col-md-6 upload-img-container text-center">
                {this.state.file3 ? (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <img src={this.state.file3} alt="..." className="rounded upload-img" />
                      </div>
                    </div>
                    <label className="btn btn-info mt-3 mr-2">
                      Select Image
                      <input
                        type="file"
                        name="file1"
                        onChange={this.imageChange}
                        hidden
                      />
                    </label>
                    <label className="btn btn-secondary btn-sm mt-3" onClick={this.clearImage3}>
                      <i className="fas fa-times fa-2x"></i>
                    </label>
                  </span>
                ) : (
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                      <label className="btn btn-info mt-4">
                        Select Image
                        <input
                          type="file"
                          name="file3"
                          onChange={this.imageChange}
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-3 col-md-6 upload-img-container text-center">
                {this.state.file4 ? (
                    <span>
                      <div className="upload-img-outer-element">
                        <div className="upload-img-inner-element">
                          <img src={this.state.file4} alt="..." className="rounded upload-img" />
                        </div>
                      </div>
                      <label className="btn btn-info mt-3 mr-2">
                        Select Image
                        <input
                          type="file"
                          name="file1"
                          onChange={this.imageChange}
                          hidden
                        />
                      </label>
                      <label className="btn btn-secondary btn-sm mt-3" onClick={this.clearImage4}>
                        <i className="fas fa-times fa-2x"></i>
                      </label>
                    </span>
                  ) : (
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                        <label className="btn btn-info mt-4">
                          Select Image
                          <input
                            type="file"
                            name="file4"
                            onChange={this.imageChange}
                            hidden
                          />
                        </label>
                      </div>
                    </div>
                  )}
              </div>
          
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Photo;