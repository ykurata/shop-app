import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";

const Form = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    description: ""
  });
  const [errors, setErrors] = useState([]);
  const [token] = useState(localStorage.getItem("jwtToken"));

  const onChange = e => {
    setNewItem({
      ...newItem, [e.target.name]: e.target.value
    });
  }
  
  const onSubmit = e => {
    e.preventDefault();

    const item = {
      name: newItem.name,
      category: newItem.category,
      price: newItem.price,
      description: newItem.description
    }

    axios.post("/item", item, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log(res.data);
        window.location = `/image/${res.data.id}`;
        toast("Successfully Submitted!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .catch(err => {
        setErrors(err.response.data);
      });
  }


  return (
    <div>
      <Navbar></Navbar>

      <div className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Title</label>
            {errors ? 
              <p className="error">{errors.name}</p>
            : null}
            <input type="text" onChange={onChange} className="form-control form-control-lg" name="name" id="name" placeholder="Item's Title"/>
          </div>
          <div className="form-group">
            <label>Category</label>
            {errors ? 
              <p className="error">{errors.category}</p>
            : null}
            <select className="form-control form-control-lg" id="category" name="category" onChange={onChange}>
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
            {errors ? 
              <p className="error">{errors.price}</p>
            : null}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input type="number" name="price" onChange={onChange} className="form-control form-control-lg" aria-label="Amount (to the nearest dollar)" />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            {errors ? 
              <p className="error">{errors.description}</p>
            : null}
            <textarea className="form-control form-control-lg"  onChange={onChange} id="description" name="description" rows="5"></textarea>
          </div>
          <ToastContainer autoClose={2000} />
          <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;