import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Item from '../components/Item';
import Loading from "../components/Loading";
import NoItem from '../components/NoItem';
import LoginUserCard from '../components/LoginUserCard';
import { UserContext } from '../contexts/UserContext';
import { ItemContext } from '../contexts/ItemContext';

const MyPost = (props) => {
  const { user, getUserById } = useContext(UserContext);
  const { items, getItemsByUserId, loading } = useContext(ItemContext);
 
  useEffect(() => {
    getItemsByUserId(props.match.params.id);
  });

  useEffect(() => {
    getUserById(props.match.params.id);
  });
  
  const card = items.map((item, i) => (
    <Link to={`/detail/${item.id}`} className="card item-card" key={i}>
      <Item data={item} />
    </Link>
  ));

  return (
    <div>
      <Navbar></Navbar>
      {/* display number of items */}
      <div className="container-fluid item-list">
        <div className="row">
          <div className="col-lg-3 col-md-3"></div>
          <div className="col-lg-9 col-md-9">
            {items.length > 0 ? (
              <p>Showing {items.length} items</p>
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
              {items.length === 0 && loading === true ? (
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
      </div>
    </div>
  );
}

export default MyPost;