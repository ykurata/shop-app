import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Get a list of all items
  const getAllItems = () => {
    axios.get("/item/all") 
      .then(res => {
        setAllItems(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ItemContext.Provider value={{ allItems, loading, getAllItems }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider;
