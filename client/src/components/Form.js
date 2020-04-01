import React, { Component } from 'react';
import axios from 'axios';
import phone2 from "../images/phone.jpg"

import Navbar from "./Navbar";
import Axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "",
      price: "",
      description: "",
      token: localStorage.getItem("jwtToken"),
    };
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      title: this.state.title,
      category: this.state.category,
      price: this.state.price,
      description: this.state.description
    }

    axios.post("/item", newItem, { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
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
              <input type="text" onChange={this.onChange} className="form-control" name="title" id="title" placeholder="Item's Title"/>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" id="category" name="category" onChange={this.onChange}>
                <option>Phone/Laptop</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Furniture</option>
                <option>Music</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="text" name="price" onChange={this.onChange} className="form-control" aria-label="Amount (to the nearest dollar)" />
                <div className="input-group-append">
                  <span className="input-group-text">.00</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control"  onChange={this.onChange} id="description" name="description" rows="5"></textarea>
            </div>
            <button type="button" className="btn btn-primary btn-lg btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;