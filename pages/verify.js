/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { parseCookies } from 'nookies';
import { Router } from 'next/router';
import { UserContext } from '../components/global/UserContext';

const VerifyComponent = dynamic(() => import('../components/global/Verify'), {
  loading: () => null,
});

const Loading = dynamic(() => import('../components/global/Loader'), {
  loading: () => null,
});

const Wrapper = styled.div``;

const Verify = () => {
  const context = useContext(UserContext);
  const { user = null, loading = true } = context;

  return (
    <Wrapper>
      <section id="content">
        {loading ? (
          <Loading />
        ) : user ? (
          !user.is_confirmed ? (
            <VerifyComponent />
          ) : (
            <h4>You are verified, enjoy your CIAYO Account!!!</h4>
          )
        ) : (
          <h4>Please login first before accessing this page</h4>
        )}
      </section>
    </Wrapper>
  );
};

Verify.getInitialProps = async ctx => {
  const { res } = ctx;
  const { token = null } = parseCookies(ctx);
  if (token === null) {
    if (res) {
      res.redirect('/login');
    } else {
      Router.push('/login');
    }
  }
};

export default Verify;
