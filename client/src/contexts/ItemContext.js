import React, { createContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { itemReducer } from '../reducers/ItemReducer';

export const ItemContext = createContext();

const ItemContextProvider = (props) => {
  const initialState = {
    allItems: [],
    loading: false, 
    item: "",
    postedUser: "",
    itemUserId: ""
  }
  const [state, dispatch] = useReducer(itemReducer, initialState)
  const [byUserItems, setByUserItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [token] = useState(localStorage.getItem("jwtToken"));

  // Get a list of all items
  useEffect(() => {
    axios.get("/item/all") 
      .then(res => {
        dispatch({
          type: 'GET_ALL_ITEMS',
          payload: res.data,
        })
      })
      .catch(err => {
        dispatch({
          type: 'ITEM_ERROR',
          payload: 'Somwthing went wrong'
        });
      });
  }, []);

  // Get a specific item by item's id 
  const getItemById = (itemId) => {
    axios.get(`/item/get/${itemId}`) 
      .then(res => {
        dispatch({
          type: 'GET_ITEM_BY_ID',
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: 'ITEM_ERROR',
          payload: 'Somwthing went wrong'
        });
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

  // Create a new item
  const createItem = (item) => {
    axios.post("/item", item, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log(res.data);
        window.location = `/image/${res.data.id}`;
        toast("Successfully Submitted!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .catch(err => {
        setErrors(err.response.data);
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
      allItems: state.allItems, 
      loading: state.loading,
      byUserItems, 
      item: state.item,
      postedUser: state.postedUser,
      itemUserId: state.itemUserId,
      errors,
      getItemById,
      getItemsByUserId,
      createItem,
      updateItem,
    }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider;
