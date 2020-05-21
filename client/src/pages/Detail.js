import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";
import UserInfoCard from "../components/UserInfoCard";
import { ItemContext } from '../contexts/ItemContext';
import { MessageContext } from '../contexts/MessageContext';

const Detail = (props) => {
  const { getItemById, 
          getItemsByUserId, 
          itemUserId, 
          postedUser, 
          byUserItems, 
          item } = useContext(ItemContext);
  const { validationError, createConversation } = useContext(MessageContext);      
  const [userId] = useState(localStorage.getItem("userId"));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
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
      setError("Please enter a message");
    } else {
      const newConversation = {
        receiverId: itemUserId
      }
      const newMessage = {
        text: message
      }
      createConversation(props.match.params.id, newConversation, newMessage);
    }
    setMessage("");
  }
  
  let data = {
    itemData: item,
    itemsData: byUserItems,
    userData: postedUser
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
                    {item.image && item.image[0] ? (
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
                  {item.image && item.image[1] ? (
                    <img className="thumbnail" alt="item" src={item.image[1]}></img>
                  ) : (
                    <div className="thumbnail"></div>
                  )}

                  {item.image && item.image[2] ? (
                    <img className="thumbnail-margin-top"  alt="item" src={item.image[2]}></img>
                  ) : (
                    <div className="thumbnail-margin-top "></div>
                  )}

                  {item.image && item.image[3] ? (
                    <img className="thumbnail-margin-top" alt="item" src={item.image[3]}></img>
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
                {error? (
                  <p className="error">{error}</p>
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