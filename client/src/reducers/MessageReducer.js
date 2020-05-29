export const MessageReducer = (state, action) => {
  switch(action.type) {
    case 'GET_CONS_BY_USERID': 
      return {
        ...state, 
        conversations: action.payload,
        loading: true
      }
    case 'GET_CON_BY_ID':
      return  {
        ...state, 
        conversation: action.payload,
        item: action.payload.Item,
        receiver: action.payload.Item.User,
        senderId: action.payload.senderId,
        sender: action.payload
      }
    case 'GET_MESSAGES_BY_CONID':
      return {
        ...state,
        messages: action.payload
      }  
    case 'CREATE_CON_AND_MESSAGE':
      return {
        ...state,
        messages: action.payload
      }
    case 'CREATE_NEW_MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    case 'DELETE_CON':
      return {
        ...state,
        conversations: action.payload
      } 
    case 'MESSAGE_ERROR':
      return {
        ...state,
        validationError: action.payload
      }                    
    default: 
      return state;  
  }
}