import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    axios.get("/item/all") 
      .then(res => {
        setItems(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <ItemContext.Provider value={{ items, loading }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider;
