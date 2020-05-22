export const UserReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USER_BY_ID': 
      return {
        ...state, 
        user: action.payload
      }
    case 'POST_AVATAR':
      return {
        ...state,
        user: action.payload
      }
    default: 
      return state;  
  }
}