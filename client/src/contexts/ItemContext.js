import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  const [allItems, setAllItems] = useState([]);
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
  }, [])

  return (
    <ItemContext.Provider value={{ allItems, loading }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider;
