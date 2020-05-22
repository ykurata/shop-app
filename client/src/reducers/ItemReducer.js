export const itemReducer = (state, action) => {
  switch(action.type) {
    case 'GET_ALL_ITEMS':
      return {
        ...state,
        loading: true,
        allItems: action.payload,
      }
    case 'GET_ITEM_BY_ID':
      return {
        ...state, 
        item: action.payload,
        postedUser: action.payload.User,
        itemUserId: action.payload.userId,
      }
    case 'ITEM_ERROR':
      return {
        ...state,
        errors: action.payload
      }    
    default: 
      return state;  
  }
}


