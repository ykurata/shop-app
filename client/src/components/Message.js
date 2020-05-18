import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from "./Navbar";

const Message = (props) => {
  const [userId] = useState(localStorage.getItem("userId"));
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [user, setUser] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Get conversations
  useEffect(() => {
    axios.get(`/message/get-conversations/${userId}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        setConversations(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, userId]);
 
  useEffect(() => {
    axios.get(`/user/get/${userId}`)
      .then(res => {
        setUser(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userId]);

  const deleteConversation = e => {
    axios.delete(`/message/delete-conversation/${e.target.id}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        toast("Successfully Deleted!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        window.location = '/message'
      })
      .catch(err => {
        console.log(err);
      });
  }

  let conversationList;

  conversationList = conversations.map(con => (
    <Link to={`/message-detail/${con.id}`} key={con.id} id={con.id} className="card item-card message-card" >
      <div className="row message-card-row" id={con.id}>
        <div className="col-lg-2 col-md-2 col-sm-2 col-2 message-image">
          {con.Item.image ? (
            <img src={con.Item.image[0]} alt="..." className="rounded message-list-item-img" />
          ) : (
            <div className="no-image text-center"><i className="fas fa-image fa-3x icon-image"></i></div>
          )}  
        </div>
        <div className="col-lg-10 col-md-10 col-md-10 col-10">
          
          <div className="row message-inside-row">
            <div className="col-lg-9 col-md-9 col-sm-9 col-9">
              <p className="message-item-title"><b>{con.Item.name}</b></p> 
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-3 p-0">
              <p className="message-date" ><Moment fromNow ago>{con.createdAt}</Moment>&nbsp;ago</p>
              <ToastContainer autoClose={2000} />
              <button 
                id={con.id} 
                className="btn btn-link delete-conversation pt-3"
                onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteConversation(e) } }
              ><i className="far fa-trash-alt"></i>&nbsp;Delete
              </button>
            </div>
          </div>
          {con.Messages.length > 0 ? (
            <p className="text mb-2">{con.Messages[con.Messages.length-1].text}</p>
          ) : (
            null
          )}
          
          <p className="message-username">{con.Item.User.username}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <div>
      <Navbar></Navbar>
      <div className="container-fluid item-list">
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
                  <h5>{user.usernme}</h5>
                  <p className="user-joined-date mt-4">Joined <Moment format="MMM YYYY">{user.createdAt}</Moment></p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-9">
            <div className="list-group">
              {/* display message if there is no items  */}
              {conversations.length === 0 && loading === true ? (
                <div className="text-center mt-5">
                  <h5>No Message</h5>
                </div>
              ) : (
                null
              )}

              {/* Loading Message */}
              {loading === false ? (
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

              {conversationList}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;