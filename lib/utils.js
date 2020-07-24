/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { parseCookies } from 'nookies';
import actions from '../redux/action';

export const getTokenByKey = (key, cookies) => {
  const cookie = cookies
    ? cookies.match(new RegExp(`(^| )${key}=([^;]+)`))
    : null;
  if (cookie) {
    return cookie[2];
  }
  return null;
};

export const truncateTitle = (input, limitWord = 35) =>
  input.length > limitWord ? `${input.substring(0, 35)} ...` : input;

export const generateUniqueKey = (pre, index) => `${pre}_${index}`;

export const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  return (document.cookie = `${name}=${value || ''}${expires}; path=/`);
};

export const removeCookie = key => {
  document.cookie = `${key}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const getCookieByKey = (key, cookies) => {
  const cookie = cookies.match(new RegExp(`(^| )${key}=([^;]+)`));
  if (cookie) {
    return cookie[2];
  }
};

export const getUserToken = () => {
  const token = getTokenByKey('token', document.cookie);
  return token;
};

export const getDeepObject = (path, object) =>
  path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), object);

export const appendDigit = (input, digit, count) => {
  let output = input;
  for (let i = 0; i < count; i += 1) {
    output = digit + output;
  }
  return output.slice(-count);
};

export const getDayName = day => {
  const dayName = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return dayName[day];
};

export const convertTimestamp = (timestamp, mode) => {
  const shortMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Ags',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];
  const longMonth = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const date = new Date(timestamp * 1000);
  let dateText;
  if (!mode) {
    dateText = `${date.getDate()} ${
      shortMonth[date.getMonth()]
    } ${date.getFullYear()}`;
  } else if (mode === 1) {
    dateText = `${appendDigit(date.getDate(), '0', 2)} ${
      longMonth[date.getMonth()]
    } ${date.getFullYear()}, ${appendDigit(
      date.getHours(),
      '0',
      2
    )}.${appendDigit(date.getMinutes(), '0', 2)}`;
  } else if (mode === 2) {
    dateText = `${appendDigit(date.getDate(), '0', 2)} ${
      longMonth[date.getMonth()]
    } ${date.getFullYear()}, pukul ${appendDigit(
      date.getHours(),
      '0',
      2
    )}.${appendDigit(date.getMinutes(), '0', 2)}`;
  }
  return dateText;
};

export const parseThousands = number => {
  if (typeof number === 'number') {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return number;
};

export const shortenThousands = number => {
  if (typeof number === 'number') {
    if (number >= 1000000) {
      return `${Math.floor(number / 100000) / 10}m`;
    }
    if (number >= 1000) {
      return `${Math.floor(number / 100) / 10}k`;
    }
    return number;
  }
  return number;
};

export const shortenString = (text, length) => {
  const textLength = length && length > 0 ? length : 120;
  if (text.length <= textLength) {
    return text;
  }
  const result = text.substring(0, textLength);
  return `${result.substring(0, result.lastIndexOf(' '))}...`;
};

export const checkEmail = email =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email);

export const maskEmail = email => {
  if (email && email !== '') {
    let result = '';
    result += email.substring(0, 1);
    for (let i = 1; i < email.indexOf('@') - 1; i += 1) {
      if (/^[A-Za-z0-9]+$/i.test(email[i]) === true) {
        result += '*';
      } else {
        result += email[i];
      }
    }
    result =
      result +
      email.substring(email.indexOf('@') - 1, email.indexOf('@')) +
      email.substring(email.indexOf('@'), email.length);
    return result;
  }
};

export const hexToRgba = (hex, opacity) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, ${opacity}`
    : null;
};

export const getRewardsDate = (
  startSeason,
  endSeason,
  intervalDay,
  currentTime = new Date()
) => {
  const newArray = [];
  let counterDate = 1;
  let counter3Day = 1;
  let counterWeek = 1;
  for (
    let i = new Date(startSeason.getTime());
    i <= endSeason;
    i.setDate(i.getDate() + intervalDay)
  ) {
    const j = new Date(i.getTime());
    const l = new Date(j.setDate(j.getDate() + intervalDay));
    if (i < new Date(currentTime) && l < new Date(currentTime)) {
      if (intervalDay === 7 && counterDate < 8) {
        counterWeek += 1;
      }
      counterDate += intervalDay;
      counter3Day += intervalDay;
      continue;
    }
    newArray.push({
      dayTitle: `${
        intervalDay !== 7
          ? `Hari ${intervalDay === 1 ? counterDate : counter3Day}`
          : `Minggu ${counterWeek}`
      }`,
    });
    counterDate += intervalDay;
    counter3Day += intervalDay;
    if (intervalDay === 7) {
      counterWeek += 1;
    }
  }
  return newArray;
};

export const isSessionStorageAvail = () => {
  const test = 'test';
  if (typeof window !== 'undefined') {
    const { sessionStorage } = window;
    try {
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};

export const initialize = ctx => {
  const { token = null } = parseCookies(ctx);
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      ctx.store.dispatch(actions.authenticate(token));
    }
  }
};
