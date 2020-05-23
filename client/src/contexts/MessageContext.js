import React,  { createContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { MessageReducer } from '../reducers/MessageReducer';

export const MessageContext = createContext();

const MessageContextProvider = (props) => {
  const initialState = {
    conversations: [],
    loading: false, 
    conversation: "",
    item: "",
    receiver: "",
    senderId: "",
    messages: [],
    validationError: "",
    messages: []
  }
 
  const [state, dispatch] = useReducer(MessageReducer, initialState);
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [userId] = useState(localStorage.getItem("userId"));
  
  // Get login user's conversations
  useEffect(() => {
    axios.get(`/message/get-conversations/${userId}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        dispatch({
          type: 'GET_CONS_BY_USERID',
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, userId]);

  //Get a conversation by conversation Id
  const getConversation = (conId) => {
    axios.get(`/message/get-conversation/${conId}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        dispatch({
          type: 'GET_CON_BY_ID',
          payload: res.data,
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
        dispatch({
          type: 'GET_MESSAGES_BY_CONID',
          payload: res.data,
        });
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
              dispatch({
                type: 'CREATE_CON_AND_MESSAGE',
                payload: res.data
              })
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
          dispatch({
            type: 'MESSAGE_ERROR',
            payload: err.response.data.error
          })
        }); 
  }

  // Create a new message by conversation Id
  const createNewMessage = (conId, newMsg) => {
    axios.post(`/message/${conId}`, newMsg, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        dispatch({
          type: 'CREATE_NEW_MESSAGE',
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: 'MESSAGE_ERROR',
          payload: "Something went wrong"
        })
      });
  }
  
  // Delete a selected conversation
  const deleteConversation = (conId) => {
    axios.delete(`/message/delete-conversation/${conId}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        dispatch({
          type: 'DELETE_CON',
          payload: "Deleted conversation"
        })
        window.location = '/message'
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <MessageContext.Provider 
      value={{ 
        conversations: state.conversations, 
        loading: state.loading, 
        messages: state.messages, 
        conversation: state.conversation,
        item: state.item,
        receiver: state.receiver,
        senderId: state.senderId,
        validationError: state.validationError,
        userId, 
        token, 
        getMessages, 
        deleteConversation,
        getConversation,
        createConversation,
        createNewMessage
      }}
      >
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageContextProvider;
