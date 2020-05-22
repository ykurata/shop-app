import React, { createContext, useReducer } from 'react';
import axios from 'axios';

import { AuthReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const initialState = {
    token: "",
    userId: "",
    validationErrors: [],
    error: ""
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  
  const login = (credentials) => {
    axios.post("/user/login", credentials)
      .then(res => {
        dispatch({
          type: 'LOG_IN',
          payload: res.data,
        });
        window.location = "/";
      })
      .catch(err => {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response
        });
      });
  }
  
  const signup = (userInfo) => {
    axios.post("/user/register", userInfo)
      .then(res => {
        dispatch({
          type: 'REGISTER',
          payload: res.data,
        });
        window.location = "/";
      })
      .catch(err => {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response
        });
      });
  }
  
  return (
    <AuthContext.Provider 
      value={{ 
        validationErrors: state.validationErrors, 
        error: state.error, 
        login, 
        signup }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;