import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
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

  const getItemsByUserId = (userId) => {
    axios.get(`/item/get/by-user/${userId}`) 
      .then(res => {
        setItems(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <ItemContext.Provider value={{ allItems, items, loading, getItemsByUserId }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider;
