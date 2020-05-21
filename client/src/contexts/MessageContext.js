import React,  { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const MessageContext = createContext();

const MessageContextProvider = (props) => {
  const [conversations, setConversations] = useState([]);
  const [conInfo, setConInfo] = useState({
    conversation: "",
    item: "",
    receiver: "",
    senderId: ""
  });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [validationError, setValidationError] = useState("");
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [userId] = useState(localStorage.getItem("userId"));
  
  // Get login user's conversations
  useEffect(() => {
    axios.get(`/message/get-conversations/${userId}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        setConversations(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, userId]);

  //Get a conversation by conversation Id
  const getConversation = (conId) => {
    axios.get(`/message/get-conversation/${conId}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        setConInfo({
          conversation: res.data,
          item: res.data.Item,
          receiver: res.data.Item.User,
          senderId: res.data.senderId
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  // Get messages by conversation Id
  const getMessages = (conId) => {
    axios.get(`/message/get-message/${conId}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        setMessages(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Create a new conversation and the first message in the conversation 
  const createConversation = (itemId, newConversation, newMessage) => {
    axios.post(`/message/create-conversation/${itemId}`, newConversation, { headers: { Authorization: `Bearer ${token}`}})
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
  
  // Delete a selected conversation
  const deleteConversation = (conId) => {
    axios.delete(`/message/delete-conversation/${conId}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log("deleted conversation");
        window.location = '/message'
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <MessageContext.Provider 
      value={{ 
        conversations, 
        loading, 
        userId, 
        token, 
        messages, 
        conInfo,
        validationError,
        getMessages, 
        deleteConversation,
        getConversation,
        createConversation,
      }}
      >
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageContextProvider;
