import React,  { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MessageContext = createContext();

const MessageContextProvider = (props) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
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
    <MessageContext.Provider value={{ conversations, loading, token, deleteConversation }}>
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageContextProvider;
