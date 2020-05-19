import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";

const Update = (props) => {
  const [item, setItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    itemId: ""
  })
  const [errors, setErrors] = useState([]);
  const [token] = useState(localStorage.getItem("jwtToken"));

  const onChange = e => {
    setItem({
      ...item, [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    axios.get(`/item/get/${props.match.params.id}`)
      .then(res => {
        setItem({
          name: res.data.name,
          category: res.data.category,
          price: res.data.price, 
          description: res.data.description,
          itemId: res.data.id
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const onSubmit = e => {
    e.preventDefault();

    const updatedItem = {
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description
    }

    axios.put(`/item/update/${props.match.params.id}`, updatedItem, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        toast("Successfully Updated!", {
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
            <input type="text" value={item.name} onChange={onChange} className="form-control form-control-lg" name="name" id="name" placeholder="Item's Title"/>
          </div>
          <div className="form-group">
            <label>Category</label>
            {errors ? 
              <p className="error">{errors.category}</p>
            : null}
            <select className="form-control form-control-lg" id="category" name="category" value={item.category} onChange={onChange}>
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
              <input type="number" name="price" value={item.price} onChange={onChange} className="form-control form-control-lg" aria-label="Amount (to the nearest dollar)" />
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
            <textarea className="form-control form-control-lg" value={item.description} onChange={onChange} id="description" name="description" rows="5"></textarea>
          </div>
          <ToastContainer autoClose={2000} />
          <button type="submit" className="btn btn-primary btn-lg btn-block mb-3">Update</button>
          <a href={`/detail/${item.itemId}`}>Back to Detail Page</a>
        </form>
      </div>
    </div>
  );
}

export default Update;