import React from 'react';
import Moment from 'react-moment';

import Atag from './Atag';

const UserInfoCard = (props) => {
  let sendingData = {
    itemsData: props.itemsData,
    itemData: props.itemData
  }

  return (
    <div className="user-info-container">
      <div className="user-info text-center">
        <div className="user-icon">
          {props.userData.image ? (
            <img src={props.userData.image} className="rounded-circle detail-user-avatar" alt="avatar" />
          ) : (
            <i className="fas fa-user-circle fa-5x"></i>
          )}
        </div>
        <div className="user-name">
          <h5>{props.userData.username}</h5>
          <p className="user-joined-date">Joined <Moment format="MMM YYYY">{props.userData.createdAt}</Moment></p>
        </div>
        <div>
          <Atag {...sendingData} />
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
