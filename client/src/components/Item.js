import React from 'react'
import Moment from 'react-moment';

const Item = (props) => {
  return (
    <div className="card-body row">
      <div className="col-lg-3 col-md-3 col-sm-2">
        {props.data.image === null || props.data.image.length === 0  ? (
          <div className="list-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
        ) : (
          <img src={props.data.image[0]} alt="..." className="rounded list-item-img" />
        )}
      </div>
      <div className="col-lg-9 col-md-9 col-sm-10">
        <h5 className="item-title">{props.data.name}</h5>
        <p className="date"><Moment format="MM/DD/YYYY">{props.data.createdAt}</Moment></p>
        <p className="description">{props.data.description}</p>
      </div>
    </div>
  );
}

export default Item
