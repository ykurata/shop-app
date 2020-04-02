import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
// import phone2 from "../images/phone.jpg"

import Navbar from "./Navbar";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
    };
  };

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
    console.log(this.state.items);
    let items;

    items = this.state.items.map((item, i) => (
      <div className="card list-group-item" key={i} id={item.id}>
        <Link to={'/detail'} className="card-link">
          <div className="card-body row">
            <div className="col-lg-2 col-md-2">
              {/* <img src={phone2} alt="..." className="rounded list-item-img" /> */}
              <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
            </div>
            <div className="col-lg-10 col-md-10">
              <h5 className="item-title">{item.name}</h5>
              <p className="date"><Moment format="MM/DD/YYYY">{item.createdAt}</Moment></p>
              <p className="description">{item.description}</p>
            </div>
          </div>
        </Link>
      </div>
    ));

    return (
      <div>
        <Navbar></Navbar>
        {/* display number of items */}
        <div className="container item-list">
          {this.state.items.length > 1 ? (
            <p>Showing {this.state.items.length} items</p>
          ) : (
            <p>Showing {this.state.items.length} item</p>
          )} 

          <div className="list-group">
            {/* display message if there is no items  */}
            {this.state.items.length === 0 ? (
              <div className="text-center mt-5">
                <h5>No Items</h5>
              </div>
            ) : (
              null
            )}

            {items}
          </div>
        </div>
      </div>
    );
  }
}

export default List;