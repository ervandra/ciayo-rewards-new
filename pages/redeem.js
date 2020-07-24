/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import PremiumBanner from '../components/containers/PremiumBanner';
import { UserContext } from '../components/global/UserContext';
import GrandPrizeCard from '../components/containers/GrandPrizeCard';
import { media } from '../components/global/base';
import RewardsCard from '../components/containers/RewardsCard';

const StyledDiv = styled.div`
  margin: 0.75rem 1rem 0.5rem 1rem;
  ${media.desktop`
    margin: 0.75rem auto;
    max-width: 962px;
  `} h3 {
    text-align: left;
    font-size: 1rem;
    color: black;
    padding-top: 10px;
    line-height: 24px;
    margin-bottom: 0.25rem;
  }
`;

const Wrapper = styled.div`
  p,
  b {
    color: #222;
  }
  h2 {
    color: #222;
    font-size: 1.25rem;
  }
  img {
    max-width: 200px;
  }
  .breakline {
    background-color: #ccc;
    height: 1px;
    margin-bottom: 1rem;
  }
  .summary {
    border-color: #eaeaea;
    background-color: #eaeaea;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    ${media.desktop`
      justify-content: space-between;
    `} .vertical-line {
      width: 1px;
      background-color: #999;
      margin: 0 1.5rem 0 0.5rem;
      ${media.desktop`
        margin: 0 2.5rem 0 1rem;
      `};
    }

    span {
      font-size: 2rem;
    }
    .row-1 {
      display: flex;
      flex-direction: column;
      justify-self: flex-start;
      margin: 0 auto 0 0;
      ${media.desktop`
      margin: 0 auto;
      `};
    }
    .row-2 {
      display: flex;
      flex-direction: column;
      justify-self: flex-end;
      margin: 0 auto;
    }
  }
  .break {
    margin: 4rem auto 0;
  }
  .grey-link {
    color: #999;
    text-decoration: underline;
    font-size: 0.85rem;
  }
`;

const SEO = dynamic(() => import('../components/global/SEO'), {
  loading: () => null,
});

const Loading = dynamic(() => import('../components/global/Loader'), {
  loading: () => null,
});

const BreakStyle = styled.div`
  text-align: center;
`;

const Redeem = () => {
  const context = useContext(UserContext);
  const response = context.config ? context.config.response : null;

  const breakSeason = (
    <Wrapper>
      <div className="quiz-finish break">
        <div className="grid-container">
          <div className="grid-x grid-margin-x">
            <div className="cell">
              <div className="awesome break-season text-center">
                <p>
                  <img
                    src="/static/assets/images/break-season.png"
                    alt="Break Season"
                    width="230"
                  />
                </p>
                <h2>It's Time for a Break!</h2>
                <hr />
                <p>
                  We’re cooking a special event for you to enjoy real soon.
                  Check back often to make sure you don’t miss a thing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );

  return (
    <>
      {context.loading ? (
        <Loading />
      ) : (
        <>
          {response &&
            !response.season.break && (
              <>
                <PremiumBanner />
                <StyledDiv>
                  <h3>
                    <strong>Daftar Hadiah</strong>
                  </h3>
                  <p>
                    Daftar akan berubah tiap hari, jadi pilih baik-baik! Hadiah
                    selalu bisa diambil di lain hari.
                  </p>
                </StyledDiv>
                <GrandPrizeCard />
                <RewardsCard cardTitle="Hadiah Harian" intervalDay={1} />
                <RewardsCard cardTitle="Hadiah Tiga Harian" intervalDay={3} />
                <RewardsCard cardTitle="Hadiah Mingguan" intervalDay={7} />
              </>
            )}
          {response && response.season.break && breakSeason}
        </>
      )}
      <hr />
      <SEO />
    </>
  );
};

Redeem.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Redeem);
