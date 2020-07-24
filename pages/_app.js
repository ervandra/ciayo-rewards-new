import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { parseCookies } from 'nookies';
import Page from '../components/global/Page';
import { UserProvider } from '../components/global/UserContext';
import { initStore } from '../redux';
import { getCookieByKey, getUserToken, initialize } from '../lib/utils';
import { getUser, getConfig } from '../lib/auth';
import { getUserProfile, getUserProfileFromAPI } from '../lib/api';
import { GET_USER_PROFILE } from '../redux/types';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let token = null;
    if (ctx.req && ctx.req !== '') {
      const { cookie } = ctx.req.headers;
      if (cookie && cookie !== '') {
        token = getCookieByKey('token', cookie);
      }
    } else if (process.browser) {
      token = getUserToken();
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // if (!process.browser) {
    //   await initialize(ctx);
    //   const { token = null } = parseCookies(ctx);
    //   const loginAction = getUserProfileFromAPI(token);
    //   ctx.store.dispatch(loginAction);

    //   return loginAction.payload.then(payload => {
    //     ctx.store.dispatch({ type: GET_USER_PROFILE, payload });

    //     return { pageProps, token, userProfile: payload };
    //   });
    // }

    return { pageProps, token };
  }

  state = {
    user: null,
    config: null,
    loading: true,
  };

  componentDidMount() {
    const user = getUser();
    const config = getConfig();
    this.setState({ user, config, loading: false });
  }

  // currently, addscrolls only happens when answering quiz so it always trigger is_trivia_available to false
  addScrolls = balance => {
    this.setState({ loading: true });
    const { user = null } = this.state;
    this.setState({
      user: {
        ...user,
        balance: user.balance + balance,
        is_trivia_available: false,
      },
      loading: false,
    });
  };

  // please improve these ↑ two ↓ function with this https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md

  reduceScrolls = balance => {
    const { user = null } = this.state;
    this.setState({
      user: { ...user, balance: user.balance - balance },
    });
  };

  updateUserProfile = async () => {
    this.setState({ loading: true });
    const { token = null } = parseCookies();
    /* const newUser = */ await getUserProfile(token)
      .then(response => this.setState({ user: response.data.response }))
      .catch(err => console.log(err))
      .finally(() => this.setState({ loading: false }));
    // this.setState({ user: newUser, loading: false });
  };

  render() {
    const { Component, pageProps, token } = this.props;
    const { user, config, loading } = this.state;

    return (
      <React.Fragment>
        <Head>
          <title>CIAYO Comics REWARDS | Game Berhadiah Merchandise Seru</title>
        </Head>
        <UserProvider
          value={{
            user,
            config,
            loading,
            userToken: token,
            addScrolls: balance => this.addScrolls(balance),
            reduceScrolls: balance => this.reduceScrolls(balance),
            updateUserProfile: () => this.updateUserProfile(),
          }}
        >
          <Page>
            <Component {...pageProps} />
          </Page>
        </UserProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
