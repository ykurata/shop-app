import jwt_decode from "jwt-decode";

export const AuthReducer = (state, action) => {
  switch(action.type) {
    case 'LOG_IN': 
      localStorage.setItem('jwtToken', action.payload.token);
      localStorage.setItem('userId', jwt_decode(action.payload.token).id); 
      return {
        ...state,
        token: action.payload.token,
        userId: jwt_decode(action.payload.token).id
      }
    case 'REGISTER':  
      localStorage.setItem('jwtToken', action.payload.token);
      localStorage.setItem('userId', jwt_decode(action.payload.token).id); 
      return {
        ...state,
        token: action.payload.token,
        userId: jwt_decode(action.payload.token).id
      } 
    case 'AUTH_ERROR':  
      return {
        ...state,
        validationErrors: action.payload.data,
        error: action.payload.data.error,
      }     
    default: 
      return state;    
  }
}