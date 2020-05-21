import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  const [allItems, setAllItems] = useState([]);
  const [byUserItems, setByUserItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [postedUser, setPostedUser] = useState("");
  const [itemUserId, setItemUserId] = useState("");
  const [errors, setErrors] = useState([]);
  const [token] = useState(localStorage.getItem("jwtToken"));
  
  // Get a list of all items
  useEffect(() => {
    axios.get("/item/all") 
      .then(res => {
        setAllItems(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Get a specific item by item's id 
  const getItemById = (itemId) => {
    axios.get(`/item/get/${itemId}`) 
    .then(res => {
      setItem(res.data);
      setPostedUser(res.data.User);
      setItemUserId(res.data.userId);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // Get a list of items by user Id
  const getItemsByUserId = (userId) => {
    axios.get(`/item/items/${userId}`) 
      .then(res => {
        setByUserItems(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Updated an item 
  const updateItem = (itemId, updatedItem) => {
    axios.put(`/item/update/${itemId}`, updatedItem, { headers: { Authorization: `Bearer ${token}`}})
    .then(res => {
      toast("Successfully Updated!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    })
    .catch(err => {
      setErrors(err.response.data);
    });
  }

  return (
    <ItemContext.Provider value={{ 
      allItems, 
      byUserItems, 
      loading, 
      item,
      postedUser,
      itemUserId,
      errors,
      getItemById,
      getItemsByUserId,
      updateItem,
    }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider;
