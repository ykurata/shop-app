import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';
import Navbar from "../components/Navbar";
import LoginUserCard from '../components/LoginUserCard';

const Message = (props) => {
  const { user } = useContext(UserContext);
  const { conversations, loading, deleteConversation } = useContext(MessageContext);
  
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
              <button 
                id={con.id} 
                className="btn btn-link delete-conversation pt-3"
                onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteConversation(con.id) } }
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
            <LoginUserCard user={user} />
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