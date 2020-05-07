import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      sendImage: null,
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId"),
      error: "",
      isLoading: false
    }
  }

  imageChange = e => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
      sendImage: e.target.files[0]
    });
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    axios.get(`/user/get/${this.state.userId}`)
    .then(res => {
      this.setState({
        image: res.data.image
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  submitAvatar = e => {
    e.preventDefault();

    if (this.state.sendImage === null) {
      this.setState({
        error: "Please select an image"
      });
    }
    
    this.setState({ isLoading: true });

    const formData = new FormData();
    formData.append("image", this.state.sendImage);

    axios.post("/user/image", formData, { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        this.setState({
          isLoading: false
        })
        console.log(res.data);
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
    console.log(this.state.image);
    return (
      <div className="main-avatar">
        <Navbar></Navbar>

        <div className="container">
          <div className="row">
            <div className="col">
            </div>
            <div className="col-lg-6 col-md-12">
              <form onSubmit={this.submitAvatar}> 
                <div style={{ height: "70px"}}></div>
                <div className="outer-avatar text-center">
                  {this.state.image ? ( 
                    <img className="rounded-circle preview-avatar" src={this.state.image} alt="avatar"></img>      
                  ) : (
                    <span className="fa-span">
                      <i className="fas fa-user-circle fa-10x preview-avatar"></i>
                    </span> 
                  )}
                  
                  {this.state.error? (
                    <p className="error text-center">{this.state.error}</p>
                  ) : (
                    null
                  )}

                  <div className="mt-3">
                    <label className="btn btn-outline-info">
                      Select Image
                      <input
                        type="file"
                        name="image"
                        hidden
                        onChange={this.imageChange}
                      />
                    </label>
                  </div>
                  <div className="mt-3">
                    {this.state.isLoading === false ? (
                      <button className="btn btn-primary" type="submit" style={{ width: "200px"}}>Submit</button>
                    ) : (
                      <button className="btn btn-primary" type="button" disabled style={{ width: "200px"}}>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                      </button>
                    )}
                  </div>
                  <ToastContainer autoClose={2000} />
                </div>
              </form> 
            </div>
            <div className="col">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Avatar;