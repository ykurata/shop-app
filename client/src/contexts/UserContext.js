import React,  { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [userId] = useState(localStorage.getItem("userId"));

  const getUserById = (userId) => {
    axios.get(`/user/get/${userId}`)
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const logOut = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href="/"
  }

  const postAvatar = (formData) => {
    axios.post("/user/image", formData, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <UserContext.Provider value={{ user, token, userId, getUserById, logOut, postAvatar }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
