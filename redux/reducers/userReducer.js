import { GET_USER_PROFILE, AUTHENTICATE, DEAUTHENTICATE } from '../types';

const initialState = {
  user: null,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...state, user: action.payload };
    case AUTHENTICATE:
      console.log('authenticated!');
      return { ...state, token: action.payload };
    case DEAUTHENTICATE:
      console.log('deauthenticated :(');
      return { token: null };
    default:
      return state;
  }
};

export default reducer;
