import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      price: "",
      description: "",
      errors: [],
      token: localStorage.getItem("jwtToken"),
    };
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      category: this.state.category,
      price: this.state.price,
      description: this.state.description
    }

    axios.post("/item", newItem, { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        console.log(res.data);
        window.location = `/image/${res.data.id}`;
        toast("Successfully Submitted!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .catch(err => {
        this.setState({
          errors: err.response.data
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>

        <div className="form">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Title</label>
              {this.state.errors ? 
                <p className="error">{this.state.errors.name}</p>
              : null}
              <input type="text" onChange={this.onChange} className="form-control" name="name" id="name" placeholder="Item's Title"/>
            </div>
            <div className="form-group">
              <label>Category</label>
              {this.state.errors ? 
                <p className="error">{this.state.errors.category}</p>
              : null}
              <select className="form-control" id="category" name="category" onChange={this.onChange}>
                <option>--Select--</option>
                <option>Phone/Laptop</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Furniture</option>
                <option>Music</option>
                <option>Camera</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price</label>
              {this.state.errors ? 
                <p className="error">{this.state.errors.price}</p>
              : null}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="number" name="price" onChange={this.onChange} className="form-control" aria-label="Amount (to the nearest dollar)" />
                <div className="input-group-append">
                  <span className="input-group-text">.00</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              {this.state.errors ? 
                <p className="error">{this.state.errors.description}</p>
              : null}
              <textarea className="form-control"  onChange={this.onChange} id="description" name="description" rows="5"></textarea>
            </div>
            <ToastContainer autoClose={2000} />
            <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Update;