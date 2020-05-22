import React, { useContext } from 'react';

import Navbar from "../components/Navbar";
import LoginUserCard from '../components/LoginUserCard';
import MessageCard from '../components/MessageCard';
import Loading from "../components/Loading";
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';

const Message = (props) => {
  const { user } = useContext(UserContext);
  const { conversations, loading } = useContext(MessageContext);
  
  let conversationList;

  conversationList = conversations.map(con => (
    <MessageCard data={con} key={con.id}/>
  ));

  return (
    <div>
      <Navbar></Navbar>
      <div className="container-fluid item-list">
        <div className="row list-outer">

          {/* User's info */}
          <div className="col-lg-3 col-md-3">
            <LoginUserCard user={user} />
          </div>

          <div className="col-lg-9 col-md-9">
            <div className="list-group">
              {/* display No Message if there is no items  */}
              {conversations.length === 0 && loading === true ? (
                <div className="text-center mt-5">
                  <h5>No Message</h5>
                </div>
              ) : (
                null
              )}

              {/* Loading Message */}
              {loading === false ? (
                <Loading />
              ) : (
                null
              )}

              {conversationList}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;