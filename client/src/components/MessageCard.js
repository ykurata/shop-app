import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { MessageContext } from '../contexts/MessageContext';

const MessageCard = (props) => {
  const { deleteConversation } = useContext(MessageContext);

  return (
    <Link to={`/message-detail/${props.data.id}`} id={props.data.id} className="card item-card message-card" >
      <div className="row message-card-row" id={props.data.id}>
        <div className="col-lg-2 col-md-2 col-sm-2 col-2 message-image">
          {props.data.Item.image ? (
            <img src={props.data.Item.image[0]} alt="..." className="rounded message-list-item-img" />
          ) : (
            <div className="no-image text-center"><i className="fas fa-image fa-3x icon-image"></i></div>
          )}  
        </div>
        <div className="col-lg-10 col-md-10 col-md-10 col-10">
          
          <div className="row message-inside-row">
            <div className="col-lg-9 col-md-9 col-sm-9 col-9">
              <p className="message-item-title"><b>{props.data.Item.name}</b></p> 
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-3 p-0">
              <p className="message-date" ><Moment fromNow ago>{props.data.createdAt}</Moment>&nbsp;ago</p>
              <button 
                id={props.data.id} 
                className="btn btn-link delete-conversation pt-3"
                onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteConversation(props.data.id) } }
              ><i className="far fa-trash-alt"></i>&nbsp;Delete
              </button>
            </div>
          </div>
          {props.data.Messages.length > 0 ? (
            <p className="text mb-2">{props.data.Messages[props.data.Messages.length-1].text}</p>
          ) : (
            null
          )}
          
          <p className="message-username">{props.data.Item.User.username}</p>
        </div>
      </div>
    </Link>
  );
}

export default MessageCard;
