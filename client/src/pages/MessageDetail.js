import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import socketIOClient from "socket.io-client";

import Navbar from "../components/Navbar";
import LoginUserCard from '../components/LoginUserCard';

const MessageDetail = (props) => {
  const [userId] = useState(localStorage.getItem("userId"));
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [con, setCon] = useState("");
  const [item, setItem] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [senderId, setSenderId] = useState("");

  const messageChange = e => {
    setMessage(e.target.value);
  }

  const socket = socketIOClient('https://yasuko-shop-app.herokuapp.com/');

  useEffect(() => {
    socket.on("newMessage", msg => {
      setNewMessage([...newMessage, msg]);
    });
  }, [newMessage, socket])

  useEffect(() =>{  
    // Get a conversation
    axios.get(`/message/get-conversation/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        setCon(res.data);
        setItem(res.data.Item);
        setSenderId(res.data.senderId);
        axios.all([
          axios.get(`/user/get/${res.data.senderId}`),
          axios.get(`/user/get/${res.data.receiverId}`)
        ])
        .then(axios.spread((sender, receiver) => {
          setSender(sender.data);
          setReceiver(receiver.data);
        }))
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      })
    
    // Get messages in a conversation  
    axios.get(`/message/get-message/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        setMessages(res.data);
      })
      .catch(err => {
        console.log(err);
      })  
  }, [token, props.match.params.id])

  const createMessage = e => {
    e.preventDefault();
    const newMsg = {
      conversationId: props.match.params.id,
      userId: userId,
      text: message
    }
    axios.post(`/message/${props.match.params.id}`, newMsg, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
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
    })
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
                      <div className="no-image text-center"><i className="fas fa-image fa-3x icon-image"></i></div>
                    )}
                  </div>
                  <div className="col-lg-10 col-md-10 col-md-10 col-10">
                    
                    <div className="row message-inside-row">
                      <div className="col-lg-9 col-md-9 col-sm-9 col-9">
                      <p className="message-item-title"><b>{item.name}</b></p> 
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                        <p className="message-date"><Moment fromNow ago>{con.createdAt}</Moment>&nbsp;ago</p>
                      </div>
                    </div>
                    <p className="message-username">$ {item.price}</p>
                      
                  </div>
                </div>
              </div>
              {/* Message input and display area */}
              <div className="card text-area p-2">
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

          {/* Posted User's info */}
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