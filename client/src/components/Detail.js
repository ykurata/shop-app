import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

import Navbar from "./Navbar";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      user: ""
    };
  };

  componentDidMount() {
    this.getItemAndUser();
  }

  getItemAndUser() {
    axios.get(`/item/get/${this.props.match.params.id}`) 
      .then(res => {
        this.setState({
          item: res.data
        });
        axios.get(`/user/get/${res.data.userId}`)
          .then(res => {
            this.setState({
              user: res.data
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { item, user } = this.state;
    return (
      <div>
        <Navbar></Navbar>

        <div className="container main-detail">
          <div className="row detatil-row">
            <div className="col-lg-9">
              <h3 className="title">{item.name}</h3>
              <h5 className="detail-price">${item.price}</h5>

              {/* Image container */}
              <div className="row image-row">
                <div className="col-lg-8 col-md-9 img-container">
                  <div className="img-outer-element">
                    <div className="img-inner-element">
                      {item.image ? (
                        <img src={item.image[0]} alt="..." className="rounded item-img" />
                      ) : (
                        <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Side thumbnails */}
                <div className="col-lg-4 col-md-3">
                  <div className="thumbnail-container row">
                    {item.image  ? (
                      <img className="thumbnail" alt="item" src={item.image[1]}></img>
                    ) : (
                      <div className="thumbnail"></div>
                    )}

                    {item.image ? (
                      <img className="thumbnail-margin-top"  alt="item" src={item.image[2]}></img>
                    ) : (
                      <div className="thumbnail-margin-top "></div>
                    )}

                    {item.image ? (
                      <img className="thumbnail-margin-top" alt="item" src={item.image[3]}></img>
                    ) : (
                      <div className="thumbnail-margin-top "></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="detail-description">
                <h4>Description</h4>
                <p>{item.description}</p>
              </div>
            </div>
            <div className="col-lg-3 align-items-center">
              <h6 className="posted-date">Posted &nbsp;<Moment format="MM/DD/YYYY">{item.createdAt}</Moment></h6>
              <div className="user-info-container ">
                <div className="user-info text-center">
                  <div className="user-icon">
                    {user.image ? (
                      <img src={this.state.user.image} className="rounded-circle detail-user-avatar" alt="avatar" />
                    ) : (
                      <i className="fas fa-user-circle fa-5x"></i>
                    )}
                  </div>
                  <div className="user-name">
                    <h5>{user.username}</h5>
                  </div>
                  <div>
                    <a href="/">View 5 Other Items</a>
                  </div>
                </div>
              </div>
              <button type="button" className="btn btn-primary btn-lg btn-block message-button">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;