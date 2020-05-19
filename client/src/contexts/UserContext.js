import React,  { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [userId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    axios.get(`/user/get/${userId}`)
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, token, userId }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
