import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
     file1: null,
     file2: null,
     file3: null,
     file4: null,
     sendFile1: null,
     sendFile2: null,
     sendFile3: null,
     sendFile4: null,
     token: localStorage.getItem("jwtToken"),
     itemId: "",
     isLoading: false
    };
  }

  // imageChange = e => {
  //   this.setState({ file: [...this.state.file, URL.createObjectURL(e.target.files[0]) ]})
  // }

  // imageChange = e => {
  //   this.setState({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });
  // }

  imageChange1 = e => {
    this.setState({
      file1: URL.createObjectURL(e.target.files[0]),
      sendFile1: e.target.files[0]
    })
  }

  imageChange2 = e => {
    this.setState({
      file2: URL.createObjectURL(e.target.files[0]),
      sendFile2: e.target.files[0]
    })
  }

  imageChange3 = e => {
    this.setState({
      file3: URL.createObjectURL(e.target.files[0]),
      sendFile3: e.target.files[0]
    })
  }

  imageChange4 = e => {
    this.setState({
      file4: URL.createObjectURL(e.target.files[0]),
      sendFile4: e.target.files[0]
    })
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

  componentDidMount() {
    this.getImage();
  }
  
  getImage() {
    axios.get(`/item/get/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          file1: res.data.image[0],
          file2: res.data.image[1],
          file3: res.data.image[2],
          file4: res.data.image[3],
          itemId: res.data.id,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const formData = new FormData();
    formData.append("image", this.state.sendFile1);
    formData.append("image", this.state.sendFile2);
    formData.append("image", this.state.sendFile3);
    formData.append("image", this.state.sendFile4);

    axios.post(`/image/${this.props.match.params.id}`, formData, { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        console.log(res.data);
        this.setState({
          isLoading: false
        })
        toast("Successfully Submitted!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>

        <div className="container main-photo">
          <form onSubmit={this.onSubmit} className="text-center">
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
                      <label className="btn btn-info mt-3 mr-2">
                        Select Image
                        <input
                          type="file"
                          name="file1"
                          onChange={this.imageChange1}
                          hidden
                        />
                      </label>
                      <label className="btn btn-secondary btn-sm mt-3" onClick={this.clearImage1}>
                        <i className="fas fa-times fa-2x"></i>
                      </label>
                    </div>
                  </span>
                ) : (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <div className="upload-img-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                        <label className="btn btn-info mt-3 mr-2">
                          Select Image
                          <input
                            type="file"
                            name="file1"
                            onChange={this.imageChange1}
                            hidden
                          />
                        </label>
                      </div>
                    </div>
                  </span>
                )}
              </div>

              <div className="col-lg-3 col-md-6 upload-img-container text-center">
                {this.state.file2 ? (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <img src={this.state.file2} alt="..." className="rounded upload-img" />
                      </div>
                      <label className="btn btn-info mt-3 mr-2">
                        Select Image
                        <input
                          type="file"
                          name="file1"
                          onChange={this.imageChange2}
                          hidden
                        />
                      </label>
                      <label className="btn btn-secondary btn-sm mt-3" onClick={this.clearImage2}>
                        <i className="fas fa-times fa-2x"></i>
                      </label>
                    </div>
                  </span>
                ) : (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <div className="upload-img-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                        <label className="btn btn-info mt-4">
                          Select Image
                          <input
                            type="file"
                            name="file2"
                            onChange={this.imageChange2}
                            hidden
                          />
                        </label>
                      </div>
                    </div>
                  </span>
                )}
              </div>

              <div className="col-lg-3 col-md-6 upload-img-container text-center">
                {this.state.file3 ? (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <img src={this.state.file3} alt="..." className="rounded upload-img" />
                      </div>
                      <label className="btn btn-info mt-3 mr-2">
                        Select Image
                        <input
                          type="file"
                          name="file1"
                          onChange={this.imageChange3}
                          hidden
                        />
                      </label>
                      <label className="btn btn-secondary btn-sm mt-3" onClick={this.clearImage3}>
                        <i className="fas fa-times fa-2x"></i>
                      </label>
                    </div>
                  </span>
                ) : (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <div className="upload-img-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                        <label className="btn btn-info mt-4">
                          Select Image
                          <input
                            type="file"
                            name="file3"
                            onChange={this.imageChange3}
                            hidden
                          />
                        </label>
                      </div>
                    </div>
                  </span>
                )}
              </div>

              <div className="col-lg-3 col-md-6 upload-img-container text-center">
                {this.state.file4 ? (
                    <span>
                      <div className="upload-img-outer-element">
                        <div className="upload-img-inner-element">
                          <img src={this.state.file4} alt="..." className="rounded upload-img" />
                        </div>
                        <label className="btn btn-info mt-3 mr-2">
                          Select Image
                          <input
                            type="file"
                            name="file1"
                            onChange={this.imageChange4}
                            hidden
                          />
                        </label>
                        <label className="btn btn-secondary btn-sm mt-3" onClick={this.clearImage4}>
                          <i className="fas fa-times fa-2x"></i>
                        </label>
                      </div>
                    </span>
                  ) : (
                    <span>
                      <div className="upload-img-outer-element">
                        <div className="upload-img-inner-element">
                          <div className="upload-img-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                          <label className="btn btn-info mt-4">
                            Select Image
                            <input
                              type="file"
                              name="file4"
                              onChange={this.imageChange4}
                              hidden
                            />
                          </label>
                        </div>
                      </div>
                    </span>
                  )}
              </div>
              
              <ToastContainer autoClose={2000} />
              {this.state.isLoading === false ? (
                <button style={{ marginTop: "2rem", marginBottom: "2rem" }} type="Submit" className="btn btn-primary btn-lg btn-block">Submit</button>
              ) : (
                <button className="btn btn-primary btn-lg btn-block" type="button" disabled style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
              )}
              <a href={`/detail/${this.state.itemId}`}>Back to Detail Page</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Photo;