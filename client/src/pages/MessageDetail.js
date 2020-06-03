import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import socketIOClient from "socket.io-client";

import Navbar from "../components/Navbar";
import LoginUserCard from '../components/LoginUserCard';
import { MessageContext } from '../contexts/MessageContext';

const MessageDetail = (props) => {
  const { getMessages, getConversation, createNewMessage, messages, conversation, item, receiver, sender, senderId } = useContext(MessageContext);
  const [userId] = useState(localStorage.getItem("userId"));
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState([]);

  const messageChange = e => {
    setMessage(e.target.value);
  }
  
  const socket = socketIOClient('https://yasuko-shop-app.herokuapp.com/');

  useEffect(() => {
    socket.on("newMessage", msg => {
      setNewMessage([...newMessage, msg]);
    });
  }, [newMessage, socket])

  useEffect(() => {
    getMessages(props.match.params.id);
    getConversation(props.match.params.id);
  }, []);
 
  const createMessage = e => {
    e.preventDefault();
    const newMsg = {
      conversationId: props.match.params.id,
      userId: userId,
      text: message
    }
    createNewMessage(props.match.params.id, newMsg);
    socket.emit("newMessage", message);
    setMessage("");
  }

  const newMsg = newMessage.map((message, i) => (
                    <div className="message" key={i}>
                      <div className="talk-bubble-right float-right"> 
                        <span>{message}</span>
                      </div>
                      <span className="float-right message-date"><Moment format="MM/DD/YYYY"></Moment></span>
                    </div>
  ));  

  const recievedMessage = messages.map((item) => {
    if (parseInt(item.userId) === parseInt(userId)) {
      return  <div className="message" key={item.id}>
                <div className="talk-bubble-right float-right"> 
                  <span>{item.text}</span>
                </div>
                <span className="float-right message-date"><Moment format="MM/DD/YYYY">{item.createdAt}</Moment></span>
              </div>
    } else {
      return <div className="message" key={item.id}>
              <div className="talk-bubble-left float-left"> 
                <span>{item.text}</span>
              </div>
              <span className="float-left message-date"><Moment format="MM/DD/YYYY">{item.createdAt}</Moment></span>
            </div> 
    }
  });


  return (
    <div>
      <Navbar></Navbar>
      {/* display number of items */}
      <div className="container-fluid item-list">
        <div className="row list-outer">
          <div className="col-lg-9 col-md-9">
              <div className="card message-card" >
                <div className="row message-card-row">
                  <div className="col-lg-2 col-md-2 col-sm-2 col-2 message-image">
                    {item.image ? (
                      <img src={item.image[0]} alt="..." className="rounded message-list-item-img" />
                    ) : (
                      <div className="message-list-item-no-image text-center"><i className="fas fa-image fa-3x icon-message-list-no-image"></i></div>
                    )}
                  </div>
                  <div className="col-lg-10 col-md-10 col-md-10 col-10">
                    
                    <div className="row message-inside-row">
                      <div className="col-lg-9 col-md-9 col-sm-9 col-9">
                      <p className="message-item-title"><b>{item.name}</b></p> 
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                        <p className="message-date"><Moment fromNow ago>{conversation.createdAt}</Moment>&nbsp;ago</p>
                      </div>
                    </div>
                    <p className="message-username">$ {item.price}</p>
                      
                  </div>
                </div>
              </div>
              {/* Message input and display area */}
              <div className="card text-area p-2 mb-3">
                <div className="row">
                  <div className="col-md-12 mb-2 display-message">
                    {recievedMessage}
                    
                    {newMessage.length > 0? (
                      <div>{newMsg}</div>
                    ) : (
                      null
                    )}   
                  </div>  
                  {/* Message input */}
                  <div className="col-md-12">
                    <div className="input-group">
                      <input onChange={messageChange} value={message} type="text" name="message" className="form-control text-input" placeholder="Type a message..."/>
                      <div className="input-group-append">
                        <button onClick={createMessage} className="btn btn-outline-secondary" type="submit">Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Display reciever or sender info*/}
          {parseInt(senderId) === parseInt(userId) ? (
            <div className="col-lg-3 col-md-3">
              <LoginUserCard user={receiver} />
            </div>
          ) : (
            <div className="col-lg-3 col-md-3">
              <LoginUserCard user={sender} />
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default MessageDetail;