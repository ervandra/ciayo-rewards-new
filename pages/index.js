/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { UserContext } from '../components/global/UserContext';
import HowToPlay from '../components/HowToPlay';
import Rules from '../components/Rules';
import TopRewards from '../components/TopRewards';
import { getTopRewards } from '../lib/api';

const SEO = dynamic(() => import('../components/global/SEO'), {
  loading: () => null,
});

const HomeContainer = dynamic(
  () => import('../components/containers/HomeContainer'),
  { loading: () => null }
);

const QuizLanding = dynamic(
  () => import('../components/containers/QuizLanding'),
  { loading: () => null }
);

const Loading = dynamic(() => import('../components/global/Loader'), {
  loading: () => null,
});

const Home = ({ topRewards, plusTopRewards }) => {
  const context = useContext(UserContext);

  const timestamp = context.config
    ? context.config.metadata.timestamp
    : Math.round(new Date().valueOf() / 1000);
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const isStarted =
    day <= 26 && month === 1 && hour < 21 && minute <= 59 && second <= 59;

  const quizLanding = {
    banner: context.config
      ? context.config.response.season.banner
      : {
          auth: '/static/assets/images/banner-auth.jpg',
          premium: '/static/assets/images/banner-auth.jpg',
          unauth: '/static/assets/images/banner-unauth.jpg',
        },
    break: context.config ? context.config.response.season.break : true,
  };
  const homeContainerBanner = context.config
    ? context.config.response.season.banner
    : {
        auth: '/static/assets/images/banner-auth.jpg',
        premium: '/static/assets/images/banner-auth.jpg',
        unauth: '/static/assets/images/banner-unauth.jpg',
      };
  return (
    <>
      <div className="ciayo-container">
        {context.loading ? (
          <Loading />
        ) : context.user ? (
          <QuizLanding
            banner={quizLanding.banner}
            seasonBreak={quizLanding.break}
            isStarted={isStarted}
          />
        ) : (
          <HomeContainer banner={homeContainerBanner} />
        )}
      </div>
      <div className="ciayo-container">
        <TopRewards rewards={topRewards} plusRewards={plusTopRewards} />
        <hr />
        <HowToPlay />
        <hr />
        <Rules seasonBreak={quizLanding.break} isStarted={isStarted} />
      </div>
      <hr
        style={{
          marginBottom: '0px',
          marginLeft: '0px',
          marginRight: '0px',
          paddingRight: '2.5rem',
        }}
      />
      <SEO />
    </>
  );
};

Home.getInitialProps = async () => {
  const topRewards = await getTopRewards()
    .then(response => response.data.response)
    .catch(err => {
      console.log(err);
      return [];
    });
  const plusTopRewards = await getTopRewards(1)
    .then(response => response.data.response)
    .catch(err => {
      console.log(err);
      return [];
    });

  return { topRewards, plusTopRewards };
};

Home.propTypes = {
  topRewards: PropTypes.array,
  plusTopRewards: PropTypes.array,
};

export default Home;
