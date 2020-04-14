import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

import Navbar from "./Navbar";

class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user: "",
      loading: false
    };
  };

  componentDidMount() {
    this.getItems();
    this.getUser();
  }

  getItems() {
    axios.get(`/item/get/by-user/${this.props.match.params.id}`) 
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

  getUser() {
    axios.get(`/user/get/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { items, user } = this.state;
   
    const card = items.map((item, i) => (
      <div className="card list-group-item" key={i}>
        <Link to={`/detail/${item.id}`} className="card-link">
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
      </div>
    ));

    return (
      <div>
        <Navbar></Navbar>
        {/* display number of items */}
        <div className="container-fluid item-list">
          <div className="row">
            <div className="col-lg-3 col-md-3"></div>
            <div className="col-lg-9 col-md-9">
              {items.length > 0 ? (
                <p>Showing {items.length} items</p>
              ) : (
                null
              )} 
            </div>
          </div>
          <div className="row list-outer">

            {/* User's info */}
            <div className="col-lg-3 col-md-3">
              <div className="user-info-container ">
                <div className="user-info text-center m-auto">
                  <div className="user-icon">
                    {user.image ? (
                      <img src={user.image} className="rounded-circle detail-user-avatar" alt="avatar" />
                    ) : (
                      <i className="fas fa-user-circle fa-5x"></i>
                    )}
                  </div>
                  <div className="user-name">
                    <h5>{user.username}</h5>
                    <p className="user-joined-date">Joined <Moment format="MMM YYYY">{user.createdAt}</Moment></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-9">
              <div className="list-group">
                {/* display message if there is no items  */}
                {items.length === 0 && this.state.loading === true ? (
                  <div className="text-center mt-5">
                    <h5>No Items</h5>
                  </div>
                ) : (
                  null
                )}

                {/* Loading Message */}
                {this.state.loading === false ? (
                  <div className="text-center mt-5">
                    <h5>Loading Items...</h5>
                  </div>  
                ) : (
                  null
                )}

                {card}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPost;