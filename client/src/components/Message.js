import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

import phone from '../image/phone.jpg';

import Navbar from "./Navbar";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("jwtToken"),
      user: "",
      conversations: "",
      loading: false
    }
  }

  componentDidMount() {
    this.getConversations();
    this.getUser();
  }

  getConversations() {
    axios.get(`/message/get-conversations/${this.state.userId}`, { headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(res => {
        this.setState({
          conversations: res.data,
          loading: true
        });
        axios.get(``)
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUser() {
    axios.get(`/user/get/${this.state.userId}`)
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { user, conversations } = this.state;
    
    // let Conversations = conversations.map(con => {
    //   <Link to="/" className="card item-card message-card" >
    //     <div className="row message-card-row">
    //       <div className="col-lg-2 col-md-2 col-sm-2 col-2 message-image">
    //           <div className="no-image text-center"><i className="fas fa-image fa-3x icon-image"></i></div>
    //         {/* <img src={phone} alt="..." className="rounded message-list-item-img" /> */}
    //       </div>
    //       <div className="col-lg-10 col-md-10 col-md-10 col-10">
            
    //         <div className="row message-inside-row">
    //           <div className="col-lg-9 col-md-9 col-sm-9 col-9">
    //             <p className="message-item-title"><b>iPhone 11</b></p> 
    //           </div>
    //           <div className="col-lg-2 col-md-2 col-sm-2 col-3">
    //             <p className="message-date">04/20/2020</p>
    //           </div>
    //         </div>
    //         <p className="text mb-2">Is this item still available?</p>
    //         <p className="message-username">Yasuko</p>
              
    //       </div>
    //     </div>
    //   </Link>
    // })

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
                {conversations.length === 0 && this.state.loading === false ? (
                  <div className="text-center mt-5">
                    <h5>No Message</h5>
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

                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;