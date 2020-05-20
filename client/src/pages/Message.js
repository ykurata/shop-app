import React, { useContext } from 'react';

import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';
import Navbar from "../components/Navbar";
import LoginUserCard from '../components/LoginUserCard';
import MessageCard from '../components/MessageCard';

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
              {/* display message if there is no items  */}
              {conversations.length === 0 && loading === true ? (
                <div className="text-center mt-5">
                  <h5>No Message</h5>
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

              {conversationList}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;