import { GET_USER_PROFILE, AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { getUserProfile } from '../../lib/api';

const addUserProfile = payload => dispatch =>
  getUserProfile(payload)
    .then(res => {
      console.log('it got called', res);
      dispatch({
        type: GET_USER_PROFILE,
        payload: res,
      });
    })
    .catch(err => console.log(err));

const authenticate = token => dispatch =>
  dispatch({ type: AUTHENTICATE, payload: token });

const deauthenticate = () => dispatch => dispatch({ type: DEAUTHENTICATE });

export default { addUserProfile, authenticate, deauthenticate };
