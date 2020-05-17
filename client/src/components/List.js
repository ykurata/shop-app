import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

import Navbar from "./Navbar";

const List = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const onChange = e => {
    setSearch(e.target.value);
  }

  const handleClick = e => {
    setCurrentPage(Number(e.target.id));
  }

  useEffect(() =>{
    axios.get("/item/all") 
      .then(res => {
        setItems(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  
  const filteredItems = items.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().indexOf(query) >= 0 ||
      item.category.toLowerCase().indexOf(query) >=0
    );
  });

  // Logic for displaying items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
    
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number} id={number} onClick={handleClick}>{number}</li>
    );
  });

  let showItems;

  showItems = currentItems.map((item, i) => (
    <Link to={`/detail/${item.id}`} className="card item-card" key={i}>
      <div className="card-body row">
        <div className="col-lg-3 col-md-3 col-sm-2">
          {item.image.length !== 0 ? (
            <img src={item.image[0]} alt="..." className="rounded list-item-img" />
          ) : (
            <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
          )}
        </div>
        <div className="col-lg-9 col-md-9 col-sm-10">
          <h5 className="item-title">{item.name}</h5>
          <p className="date"><Moment format="MM/DD/YYYY">{item.createdAt}</Moment></p>
          <p className="description">{item.description}</p>
        </div>
      </div>
    </Link>
  ));

  let numberOfItems;
  if (filteredItems.length === 0) {
    numberOfItems = null;
  } else if (filteredItems.length < indexOfLastItem ) {
    numberOfItems = <p>Showing {indexOfFirstItem + 1} - {filteredItems.length}&nbsp; of &nbsp;{filteredItems.length}&nbsp; items</p>
  } else if (filteredItems.length > 5) {
    numberOfItems = <p>Showing {indexOfFirstItem + 1} - {indexOfLastItem}&nbsp; of &nbsp;{filteredItems.length}&nbsp; items</p>
  } else if (filteredItems.length < 5) {
    numberOfItems = <p>Showing {filteredItems.length} items</p>
  } 

  return (
    <div>
      <Navbar></Navbar>
      {/* display number of items */}
      <div className="container-fluid item-list">
        <div className="row">
          <div className="col-lg-3 col-md-3"></div>
          <div className="col-lg-9 col-md-9">
            {numberOfItems}
          </div>
        </div>
        <div className="row list-outer">
          {/* Search input and select form category */}
          <div className="col-lg-3 col-md-3">
            <div className="input-group md-form form-sm form-1 pl-0 mb-5 search-form">
              <div className="input-group-prepend">
                <span className="input-group-text purple lighten-3" id="basic-text1"><i className="fas fa-search text-white"
                    aria-hidden="true"></i></span>
              </div>
              <input onChange={onChange} name="search" value={search} className="form-control my-0 py-1" type="text" placeholder="Search item..." aria-label="Search" />
            </div>
            <select onChange={onChange} name="search" className="browser-default custom-select mb-5">
              <option value="">Categories</option>
              <option value="Phone/Laptop">Phone/Laptop</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Music">Music</option>
              <option value="Furniture">Furniture</option>
              <option value="Camera">Camera</option>
            </select>
          </div>
          <div className="col-lg-9 col-md-9">
            <div className="list-group">
              {/* display message if there is no items  */}
              {filteredItems.length === 0 && loading === true ? (
                <div className="text-center mt-5">
                  <h5>No Items</h5>
                </div>
              ) : (
                null
              )}

              {/* Loading Message */}
              {loading === false ? (
                <div className="text-center mt-5">
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>  
              ) : (
                null
              )}

              {showItems}
            </div>
          </div>
        </div>
        <div className="container-fluid text-center">
          <ul className="pagination justify-content-center">
            {renderPageNumbers}
          </ul>
        </div>  
      </div>
    </div>
  );
}

export default List;