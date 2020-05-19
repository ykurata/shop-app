import React from 'react';
import Moment from 'react-moment';

const LoginUserCard = (props) => {
  return (
    <div className="user-info-container ">
      <div className="user-info text-center m-auto">
        <div className="user-icon">
          {props.user.image ? (
            <img src={props.user.image} className="rounded-circle detail-user-avatar" alt="avatar" />
          ) : (
            <i className="fas fa-user-circle fa-5x"></i>
          )}
        </div>
        <div className="user-name">
          <h5>{props.user.username}</h5>
          <p className="user-joined-date">Joined <Moment format="MMM YYYY">{props.user.createdAt}</Moment></p>
        </div>
      </div>
    </div>
  );
}

export default LoginUserCard;
