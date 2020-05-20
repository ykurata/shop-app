import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  const [allItems, setAllItems] = useState([]);
  const [byUserItems, setByUserItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemInfo, setItemInfo] = useState("");
  const [postedUser, setPostedUser] = useState("");
  const [itemUserId, setItemUserId] = useState("");
  
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
      setItemInfo(res.data);
      setPostedUser(res.data.User);
      setItemUserId(res.data.userId);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const getItemsByUserId = (userId) => {
    axios.get(`/item/get/by-user/${userId}`) 
      .then(res => {
        setByUserItems(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <ItemContext.Provider value={{ 
      allItems, 
      byUserItems, 
      loading, 
      itemInfo,
      postedUser,
      itemUserId,
      getItemById,
      getItemsByUserId 
    }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider;
