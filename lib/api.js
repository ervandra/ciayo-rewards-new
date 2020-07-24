import Axios from 'axios';
import { getUserToken } from './utils';
import { GET_USER_PROFILE } from '../redux/types';

Axios.defaults.baseURL = process.env.REACT_APP_REWARDS_API_URL;

export const getUserProfile = async token => {
  try {
    const { data } = await Axios.post(`/login`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      return data;
    }
  } catch (err) {
    return null;
  }
  return null;
};

export const getUserProfileFromAPI = token => ({
  type: GET_USER_PROFILE,
  payload: new Promise((res, rej) => {
    if (token !== null) {
      getUserProfile(token)
        .then(response => {
          res(response);
        })
        .catch(err => rej(null));
    } else {
      res(null);
    }
  }),
});

export const getRewardsConfig = async () => {
  try {
    const { data } = await Axios.get('/config', {});
    if (data) {
      return data;
    }
  } catch (err) {
    return null;
  }
  return null;
};

export const getTriviaQuestions = async token =>
  Axios.get('/trivia', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getRewardDetail = async itemName =>
  Axios.get(`/reward/${itemName}`);

export const getTopRewards = async (plus = 0) =>
  Axios.get(`/reward?top=1&per_page=${plus === 1 ? '3' : '2'}&premium=${plus}`);

export const getGrandPrize = async (plus = 0) =>
  Axios.get(`/reward?grand_prize=1&premium=${plus}`);

export const getRewardsPrize = async (plus = 0, current = 0, diff = 0) =>
  Axios.get(`/reward?current=${current}&diff=${diff}&premium=${plus}`);

export const getHistoryTransaction = () =>
  Axios.get('/transaction', {
    headers: { Authorization: `Bearer ${getUserToken()}` },
  });
