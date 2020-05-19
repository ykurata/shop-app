import React from 'react';

const Atag = (props) => {
  if (props.itemsData.length === 1) {
    return null;
  } else if (props.itemsData.length === 2) {
    return <a href={`/items-by-user/${props.itemData.userId}`}>View {props.itemsData.length -1} other item</a>
  } else if (props.itemsData.length > 2) {
    return <a href={`/items-by-user/${props.itemData.userId}`}>View {props.itemsData.length -1} other item</a>
  } else {
    return null;
  }
}

export default Atag;
