import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import socketIOClient from "socket.io-client";

import Navbar from "./Navbar";

class MessageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      sentMessage: [],
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
      this.setState({ sentMessage: [...this.state.sentMessage, msg] });
    })
  }

  createMessage = e => {
    e.preventDefault();
    this.socket.emit("newMessage", this.state.message);
    this.setState({ message: "" });
  }

  render() {
    const message = this.state.sentMessage.map(message => (
                      <div className="message">
                        <div className="talk-bubble-right float-right"> 
                          <span>{message}</span>
                        </div>
                        <span className="float-right message-date">04/20/2020</span>
                      </div>
    ));  
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
                        <div className="no-image text-center"><i className="fas fa-image fa-3x icon-image"></i></div>
                      {/* <img src={phone} alt="..." className="rounded message-list-item-img" /> */}
                    </div>
                    <div className="col-lg-10 col-md-10 col-md-10 col-10">
                     
                      <div className="row message-inside-row">
                        <div className="col-lg-9 col-md-9 col-sm-9 col-9">
                          <p className="message-item-title"><b>iPhone 11</b></p> 
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                          <p className="message-date">04/20/2020</p>
                        </div>
                      </div>
                      <p className="message-username">Yasuko</p>
                        
                    </div>
                  </div>
                </div>
                {/* Message input and display area */}
                <div className="card text-area p-2">
                  <div className="row">
                    <div className="col-md-12 mb-2 display-message">
                      {this.state.sentMessage.length > 0? (
                        <div>{message}</div>
                      ) : (
                        null
                      )}
                      
                      {/* <div className="message">
                        <div className="talk-bubble-right float-right"> 
                          <span>Hello is this item still available?</span>
                        </div>
                        <span className="float-right message-date">04/20/2020</span>
                      </div>
                      <div className="message">
                        <div className="talk-bubble-left float-left"> 
                          <span>Yes it's still available kuku chan kawaii nanonano</span>
                        </div>
                        <span className="float-left message-date">04/20/2020</span>
                      </div>       */}
                    </div>  
                    {/* Message input */}
                    <div className="col-md-12">
                      <div className="input-group">
                        <input onChange={this.messageChange} value={this.state.message} type="text" name="message" className="form-control text-input" placeholder="Type a message..."/>
                        <div className="input-group-append">
                          <button onClick={this.createMessage} className="btn btn-outline-secondary" type="button">Send</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

              {/* User's info */}
            <div className="col-lg-3 col-md-3">
              <div className="user-info-container ">
                <div className="user-info text-center m-auto">
                  <div className="user-icon">
                    <i className="fas fa-user-circle fa-5x"></i>
                    {/* {user.image ? (
                      <img src={user.image} className="rounded-circle detail-user-avatar" alt="avatar" />
                    ) : (
                      <i className="fas fa-user-circle fa-5x"></i>
                    )} */}
                  </div>
                  <div className="user-name">
                    <h5>Yasuko</h5>
                    <p className="user-joined-date">Joined <Moment format="MMM YYYY">Date</Moment></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default MessageDetail;