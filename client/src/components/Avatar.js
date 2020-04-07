import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from "./Navbar";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      sendImage: null,
      token: localStorage.getItem("jwtToken")
    }
  }

  imageChange = e => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
      sendImage: e.target.files[0]
    });
  }

  render() {
    return (
      <div className="main-avatar">
        <Navbar></Navbar>

        <div className="container">
          <div className="row">
            <div className="col">
            </div>
            <div className="col-6">
              <form>
                <div style={{ height: "70px"}}></div>
                <div className="outer-avatar text-center mt-auto">
                  {this.state.image ? ( 
                    <img className="rounded-circle z-depth-0 preview-avatar" src={this.state.image}></img>
                  ) : (
                    <span style={{fontSize: "35px", color: "grey"}}>
                      <i className="fas fa-user-circle fa-10x preview-avatar"></i>
                    </span> 
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
                    <button className="btn btn-primary" type="submit" style={{ width: "200px"}}>Submit</button>
                  </div>
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