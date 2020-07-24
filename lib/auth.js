import { getUserProfile } from './api';
import { getTokenByKey } from './utils';

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__';
const WINDOW_CONFIG_SCRIPT_VARIABLE = '__CONFIG__';

export const getUserScript = user =>
  `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)};`;

export const getConfigScript = config =>
  `${WINDOW_CONFIG_SCRIPT_VARIABLE} = ${JSON.stringify(config)};`;

export const getSessionFromServer = async req => {
  if (req && req.headers) {
    const { cookie } = req.headers || {};
    const token = getTokenByKey('token', cookie);
    const user = token ? await getUserProfile(token) : null;
    if (user) {
      return user.response;
    }
  }
  return null;
};

export const getSessionFromClient = () => {
  if (typeof window !== 'undefined') {
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || null;
    if (!user) {
      document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
    return user;
  }
  return null;
};

export const getConfig = () => {
  if (typeof window !== 'undefined') {
    const config = window[WINDOW_CONFIG_SCRIPT_VARIABLE] || null;
    return config;
  }
  return null;
};

export const getUser = () => getSessionFromClient();
