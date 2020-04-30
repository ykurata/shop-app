import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import socketIOClient from "socket.io-client";

import Navbar from "./Navbar";

class MessageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("jwtToken"),
      message: "",
      messages: [],
      con: "",
      item: "",
      newMessage: [],
      sender: "",
      receiver: "",
      senderId: ""
    }
  }

  messageChange = e => {
    this.setState({
      message: e.target.value
    });
  }

  componentDidMount() {
    this.socket = socketIOClient("http://localhost:5000");
    this.socket.on("newMessage", msg => {
      this.setState({ newMessage: [...this.state.newMessage, msg] });
    })
    this.getMessages();
    this.getConversation();
  }

  getConversation() {
    axios.get(`/message/get-conversation/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        this.setState({ 
          con: res.data,
          item: res.data.Item,
          senderId: res.data.senderId
        });
        axios.all([
          axios.get(`/user/get/${res.data.senderId}`),
          axios.get(`/user/get/${res.data.receiverId}`)
        ])
        .then(axios.spread((sender, receiver) => {
          this.setState({ sender: sender.data });
          this.setState({ receiver: receiver.data });
        }))
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  getMessages() {
    axios.get(`/message/get-message/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        this.setState({ messages: res.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  createMessage = e => {
    e.preventDefault();
    const newMsg = {
      conversationId: this.props.match.params.id,
      userId: this.state.userId,
      text: this.state.message
    }
    axios.post(`/message/${this.props.match.params.id}`, newMsg, { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    this.socket.emit("newMessage", this.state.message);
    this.setState({ message: "" });  
  }

  render() {
    const { item, messages, sender, receiver } = this.state;
  
    const message = this.state.newMessage.map((message, i) => (
                      <div className="message" key={i}>
                        <div className="talk-bubble-right float-right"> 
                          <span>{message}</span>
                        </div>
                        <span className="float-right message-date"><Moment format="MM/DD/YYYY"></Moment></span>
                      </div>
    ));  

    const recievedMessage = messages.map((item) => {
      if (parseInt(item.userId) === parseInt(this.state.userId)) {
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
                      {item ? (
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
                          <p className="message-date"><Moment format="MM/DD/YYYY">{item.createdAt}</Moment></p>
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
                     
                      {this.state.newMessage.length > 0? (
                        <div>{message}</div>
                      ) : (
                        null
                      )}   
                    </div>  
                    {/* Message input */}
                    <div className="col-md-12">
                      <div className="input-group">
                        <input onChange={this.messageChange} value={this.state.message} type="text" name="message" className="form-control text-input" placeholder="Type a message..."/>
                        <div className="input-group-append">
                          <button onClick={this.createMessage} className="btn btn-outline-secondary" type="submit">Send</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            {/* Posted User's info */}
            {parseInt(this.state.senderId) === parseInt(this.state.userId) ? (
              <div className="col-lg-3 col-md-3">
                <div className="user-info-container ">
                  <div className="user-info text-center m-auto">
                    <div className="user-icon">
                      {receiver.image ? (
                        <img src={receiver.image} className="rounded-circle detail-user-avatar" alt="avatar" />
                      ) : (
                        <i className="fas fa-user-circle fa-5x"></i>
                      )}
                    </div>
                    <div className="user-name">
                      <h5>{receiver.username}</h5>
                      <p className="user-joined-date">Joined <Moment format="MMM YYYY">{receiver.createdAt}</Moment></p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-lg-3 col-md-3">
                <div className="user-info-container ">
                  <div className="user-info text-center m-auto">
                    <div className="user-icon">
                      {sender.image ? (
                        <img src={sender.image} className="rounded-circle detail-user-avatar" alt="avatar" />
                      ) : (
                        <i className="fas fa-user-circle fa-5x"></i>
                      )}
                    </div>
                    <div className="user-name">
                      <h5>{sender.username}</h5>
                      <p className="user-joined-date">Joined <Moment format="MMM YYYY">{sender.createdAt}</Moment></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    );
  }
}

export default MessageDetail;