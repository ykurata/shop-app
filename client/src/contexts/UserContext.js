import React,  { createContext, useState, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { UserReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const initialState = {
    user: ""
  }
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [userId] = useState(localStorage.getItem("userId"));

  const getUserById = (userId) => {
    axios.get(`/user/get/${userId}`)
    .then(res => {
      dispatch({
        type: 'GET_USER_BY_ID',
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  const postAvatar = (formData) => {
    setLoading(true);
    axios.post("/user/image", formData, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        dispatch({
          type: 'POST_AVATAR',
          payload: res.data,
        });
        setLoading(false);
        toast("Successfully Submitted!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <UserContext.Provider 
      value={{ 
        user: state.user, 
        loading,
        token, 
        userId, 
        getUserById, 
        postAvatar }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
