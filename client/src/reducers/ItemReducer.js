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
    case 'GET_ITEMS_BY_USERID':
      return {
        ...state, 
        byUserItems: action.payload,
        loading: true
      }  
    case 'ADD_ITEM':
      return {
        ...state, 
        item: action.payload,
      }   
    case 'UPDATE_ITEM':
      return {
        ...state, 
        item: action.payload,
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


