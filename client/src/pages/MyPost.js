import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Item from '../components/Item';
import Loading from "../components/Loading";
import NoItem from '../components/NoItem';
import LoginUserCard from '../components/LoginUserCard';
import { UserContext } from '../contexts/UserContext';
import { ItemContext } from '../contexts/ItemContext';

const MyPost = (props) => {
  const { user } = useContext(UserContext);
  const { byUserItems, getItemsByUserId, loading } = useContext(ItemContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleClick = e => {
    setCurrentPage(Number(e.target.id));
  }
 
  useEffect(() => {
    getItemsByUserId(props.match.params.id);
  }, []); 

  // Logic for displaying items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = byUserItems.slice(indexOfFirstItem, indexOfLastItem);
  
  const card = currentItems.map((item, i) => (
    <Link to={`/detail/${item.id}`} className="card item-card" key={i}>
      <Item data={item} />
    </Link>
  ));

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(byUserItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
    
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number} id={number} onClick={handleClick}>{number}</li>
    );
  });

  return (
    <div>
      <Navbar></Navbar>
      {/* display number of items */}
      <div className="container-fluid item-list">
        <div className="row">
          <div className="col-lg-3 col-md-3"></div>
          <div className="col-lg-9 col-md-9">
            {byUserItems.length > 0 ? (
              <p>Showing {byUserItems.length} items</p>
            ) : (
              null
            )} 
          </div>
        </div>
        <div className="row list-outer">

          {/* User's info */}
          <div className="col-lg-3 col-md-3">
            <LoginUserCard user={user} />
          </div>

          <div className="col-lg-9 col-md-9">
            <div className="list-group">
              {/* display message if there is no items  */}
              {byUserItems.length === 0 && loading === true ? (
                <NoItem />
              ) : (
                null
              )}

              {/* Loading Message */}
              {loading === false ? (
                <Loading />
              ) : (
                null
              )}

              {card}
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

export default MyPost;