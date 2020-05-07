import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

import Navbar from "./Navbar";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      search: "",
      loading: false
    };
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios.get("/item/all") 
      .then(res => {
        this.setState({
          items: res.data,
          loading: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const filteredItems = this.state.items.filter((item) => {
      const query = this.state.search.toLowerCase();
      return (
        item.name.toLowerCase().indexOf(query) >= 0 ||
        item.category.toLowerCase().indexOf(query) >=0
      );
    });

    let items;

    items = filteredItems.map((item, i) => (
      <Link to={`/detail/${item.id}`} className="card item-card" key={i}>
        <div className="card-body row">
          <div className="col-lg-3 col-md-3 col-sm-2">
            {item.image.length !== 0 ? (
              <img src={item.image[0]} alt="..." className="rounded list-item-img" />
            ) : (
              <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
            )}
          </div>
          <div className="col-lg-9 col-md-9 col-sm-10">
            <h5 className="item-title">{item.name}</h5>
            <p className="date"><Moment format="MM/DD/YYYY">{item.createdAt}</Moment></p>
            <p className="description">{item.description}</p>
          </div>
        </div>
      </Link>
    ));

    return (
      <div>
        <Navbar></Navbar>
        {/* display number of items */}
        <div className="container-fluid item-list">
          <div className="row">
            <div className="col-lg-3 col-md-3"></div>
            <div className="col-lg-9 col-md-9">
              {filteredItems.length > 0 ? (
                <p>Showing {filteredItems.length} items</p>
              ) : (
                null
              )} 
            </div>
          </div>
          <div className="row list-outer">
            {/* Search input and select form category */}
            <div className="col-lg-3 col-md-3">
              <div className="input-group md-form form-sm form-1 pl-0 mb-5 search-form">
                <div className="input-group-prepend">
                  <span className="input-group-text purple lighten-3" id="basic-text1"><i className="fas fa-search text-white"
                      aria-hidden="true"></i></span>
                </div>
                <input onChange={this.onChange} name="search" value={this.state.search} className="form-control my-0 py-1" type="text" placeholder="Search item..." aria-label="Search" />
              </div>
              <select onChange={this.onChange} name="search" className="browser-default custom-select mb-5">
                <option value="">Categories</option>
                <option value="Phone/Laptop">Phone/Laptop</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Music">Music</option>
                <option value="Furniture">Furniture</option>
                <option value="Camera">Camera</option>
              </select>
            </div>
            <div className="col-lg-9 col-md-9">
              <div className="list-group">
                {/* display message if there is no items  */}
                {filteredItems.length === 0 && this.state.loading === true ? (
                  <div className="text-center mt-5">
                    <h5>No Items</h5>
                  </div>
                ) : (
                  null
                )}

                {/* Loading Message */}
                {this.state.loading === false ? (
                  <div className="text-center mt-5">
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>  
                ) : (
                  null
                )}

                {items}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;