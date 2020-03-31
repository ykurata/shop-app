import React, { Component } from 'react';
import phone2 from "../images/phone.jpg"

import Navbar from "./Navbar";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>

        <div className="item-form">
          <form>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" id="itemTitle" placeholder="Item's Title"/>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" id="category">
                <option>Phone/Laptop</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Furniture</option>
                <option>Music</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">$</span>
                </div>
                <input type="text" class="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="form-group">
              
              <textarea className="form-control" id="description" rows="5"></textarea>
            </div>
          
            <button type="button" className="btn btn-primary btn-lg btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;