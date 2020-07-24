import React from 'react';
import { Router } from 'next/router';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { parseCookies } from 'nookies';
import { getTopRewards } from '../lib/api';

const LoginContainer = dynamic(
  () => import('../components/containers/LoginContainer'),
  { loading: () => null }
);

const Login = ({ topRewards }) => <LoginContainer rewards={topRewards} />;

Login.getInitialProps = async ctx => {
  const { res } = ctx;
  const topRewards = await getTopRewards()
    .then(response => response.data.response)
    .catch(err => {
      console.log(err);
      return [];
    });
  const { token = null } = parseCookies(ctx);
  if (token !== null) {
    if (res) {
      res.redirect('/');
    } else {
      Router.push('/');
    }
  }
  return { topRewards };
};

Login.propTypes = {
  topRewards: PropTypes.array,
};

export default Login;
