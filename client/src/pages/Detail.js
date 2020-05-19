import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";
import UserInfoCard from "../components/UserInfoCard";

const Detail = (props) => {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState("");
  const [image, setImage] = useState([]);
  const [userId] = useState(localStorage.getItem("userId"));
  const [token] = useState(localStorage.getItem("token"));
  const [itemUserId, setItemUserId] = useState("");
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const changeMessage = e => {
    setMessage(e.target.value);
  }
  
  useEffect(() => {
    axios.get(`/item/get/${props.match.params.id}`) 
      .then(res => {
        setItem(res.data);
        setImage(res.data.image);
        setItemUserId(res.data.userId);
        axios.all([
          axios.get(`/item/get/by-user/${res.data.userId}`),
          axios.get(`/user/get/${res.data.userId}`)
        ])
        .then(axios.spread((item, user) => {
          setItems(item.data);
          setUser(user.data);
        }))
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const sendMessage = e => {
    e.preventDefault();
    if (message === "") {
      setValidationError("Please enter a message");
    } else {
      const newConversation = {
        receiverId: itemUserId
      }
      const newMessage = {
        text: message
      }
    
      axios.post(`/message/create-conversation/${props.match.params.id}`, newConversation, { headers: { Authorization: `Bearer ${token}`}})
        .then(res => {
          axios.post(`/message/${res.data.id}`, newMessage, { headers: { Authorization: `Bearer ${token}`}})
            .then(res => {
              console.log(res.data);
              toast("Successfully sent a message!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          setValidationError(err.response.data.error);
        }); 
    }
    setMessage("");
  }
  
  let data = {
    itemData: item,
    itemsData: items,
    userData: user
  }
  
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
                    {image && image[0] ? (
                      <img src={image[0]} alt="..." className="rounded item-img" />
                    ) : (
                      <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                    )}
                  </div>
                </div>
              </div>
              {/* Side thumbnails */}
              <div className="col-lg-4 col-md-3">
                <div className="thumbnail-container row">
                  {image && image[1] ? (
                    <img className="thumbnail" alt="item" src={image[1]}></img>
                  ) : (
                    <div className="thumbnail"></div>
                  )}

                  {image && image[2] ? (
                    <img className="thumbnail-margin-top"  alt="item" src={image[2]}></img>
                  ) : (
                    <div className="thumbnail-margin-top "></div>
                  )}

                  {image && image[3] ? (
                    <img className="thumbnail-margin-top" alt="item" src={image[3]}></img>
                  ) : (
                    <div className="thumbnail-margin-top "></div>
                  )}
                </div>
                {/* display Update Image button only for logged in user's post */}
                {parseInt(userId) === parseInt(itemUserId) ? (
                  <a href={`/image/${item.id}`} className="btn btn-primary mt-3 mb-2" role="button">Update Image</a>
                ) : (
                  null
                )}      
              </div>
            </div>

            <div className="detail-description">
              <h4>Description</h4>
              <p>{item.description}</p>
              {/* display Edit Post button only for logged in user's post */}
              {parseInt(userId) === parseInt(itemUserId) ? (
                <a href={`/update/${item.id}`} className="btn btn-primary mt-2 mb-3" role="button">Edit Post</a>
              ) : (
                null
              )}
            </div>
          </div>
          <div className="col-lg-3 align-items-center">
            <h6 className="posted-date">Posted &nbsp;<Moment format="MM/DD/YYYY">{item.createdAt}</Moment></h6>
            
              <UserInfoCard {...data} />
            
            {/* hide message input for own post */}
            {parseInt(userId) === parseInt(itemUserId) ? (
              null
            ) : (
              <span>
                {validationError? (
                  <p className="error">{validationError}</p>
                ):(
                  null
                )}
                <textarea name="message" onChange={changeMessage} value={message} className="form-control mt-3" data-toggle="collapse" data-target="#collapse"  placeholder="Type a message..." />
                <button onClick={sendMessage} id="collapse" className="collapse btn btn-primary btn-lg btn-block message-button" type="button">
                  Send Message
                </button>
                <ToastContainer autoClose={2000} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;