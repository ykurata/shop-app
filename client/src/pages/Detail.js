import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";
import UserInfoCard from "../components/UserInfoCard";
import { ItemContext } from '../contexts/ItemContext';

const Detail = (props) => {
  const { getItemById, getItemsByUserId, itemUserId, postedUser, byUserItems, itemInfo } = useContext(ItemContext);
  const [item, setItem] = useState("");
  const [userId] = useState(localStorage.getItem("userId"));
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  
  const changeMessage = e => {
    setMessage(e.target.value);
  }
  
  useEffect(() => {
    getItemById(props.match.params.id);
  }, []);

  useEffect(() => {
    getItemsByUserId(itemUserId);
  }, [itemUserId]);

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
    itemData: itemInfo,
    itemsData: byUserItems,
    userData: postedUser
  }
  
  return (
    <div>
      <Navbar></Navbar>

      <div className="container main-detail">
        <div className="row detatil-row">
          <div className="col-lg-9">
            <h3 className="title">{itemInfo.name}</h3>
            <h5 className="detail-price">${itemInfo.price}</h5>

            {/* Image container */}
            <div className="row image-row">
              <div className="col-lg-8 col-md-9 img-container">
                <div className="img-outer-element">
                  <div className="img-inner-element">
                    {itemInfo.image && itemInfo.image[0] ? (
                      <img src={itemInfo.image[0]} alt="..." className="rounded item-img" />
                    ) : (
                      <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                    )}
                  </div>
                </div>
              </div>
              {/* Side thumbnails */}
              <div className="col-lg-4 col-md-3">
                <div className="thumbnail-container row">
                  {itemInfo.image && itemInfo.image[1] ? (
                    <img className="thumbnail" alt="item" src={itemInfo.image[1]}></img>
                  ) : (
                    <div className="thumbnail"></div>
                  )}

                  {itemInfo.image && itemInfo.image[2] ? (
                    <img className="thumbnail-margin-top"  alt="item" src={itemInfo.image[2]}></img>
                  ) : (
                    <div className="thumbnail-margin-top "></div>
                  )}

                  {itemInfo.image && itemInfo.image[3] ? (
                    <img className="thumbnail-margin-top" alt="item" src={itemInfo.image[3]}></img>
                  ) : (
                    <div className="thumbnail-margin-top "></div>
                  )}
                </div>
                {/* display Update Image button only for logged in user's post */}
                {parseInt(userId) === parseInt(itemUserId) ? (
                  <a href={`/image/${itemInfo.id}`} className="btn btn-primary mt-3 mb-2" role="button">Update Image</a>
                ) : (
                  null
                )}      
              </div>
            </div>

            <div className="detail-description">
              <h4>Description</h4>
              <p>{itemInfo.description}</p>
              {/* display Edit Post button only for logged in user's post */}
              {parseInt(userId) === parseInt(itemUserId) ? (
                <a href={`/update/${itemInfo.id}`} className="btn btn-primary mt-2 mb-3" role="button">Edit Post</a>
              ) : (
                null
              )}
            </div>
          </div>
          <div className="col-lg-3 align-items-center">
            <h6 className="posted-date">Posted &nbsp;<Moment format="MM/DD/YYYY">{itemInfo.createdAt}</Moment></h6>
            
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