import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const MyPost = (props) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/item/get/by-user/${props.match.params.id}`) 
      .then(res => {
        setItems(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id])
  
  useEffect(() => {
    axios.get(`/user/get/${props.match.params.id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);


  const card = items.map((item, i) => (
    <Link to={`/detail/${item.id}`} className="card item-card" key={i}>
      <div className="card-body row">
        <div className="col-lg-3 col-md-3 col-sm-2">
          {item.image === null || item.image.length === 0  ? (
            <div className="list-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
          ) : (
            <img src={item.image[0]} alt="..." className="rounded list-item-img" />
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
              {items.length === 0 && loading === true ? (
                <div className="text-center mt-5">
                  <h5>No Items</h5>
                </div>
              ) : (
                null
              )}

              {/* Loading Message */}
              {loading === false ? (
                <Loading />
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

export default MyPost;