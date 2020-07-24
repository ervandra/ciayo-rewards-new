import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { media } from '../global/base';

const HomeContainerStyle = styled.div`
  .quiz-wrapper {
    border-color: #e6e7e8;
    background-color: #e6e7e8;
    padding-bottom: 1rem;
    border-radius: 12px;
    width: 90%;
    margin: 0 auto;
    ${media.desktop`
      width: 100%;
      padding: 0.15rem 0;
      height: 72px;
      text-align:center;
    `} h3 {
      font-size: 1rem;
      margin: 1rem 1.5rem;
      margin-bottom: 0.75rem;
      padding-top: 1.25rem;
      text-align: center;
      font-weight: bold;
      ${media.desktop`
      padding: 0.5rem 0;
      font-size: 20px;
      display:inline;
      ;`};
    }
    a {
      width: 90%;
      margin: 1rem auto;
    }
  }
`;

const StyledDiv = styled.div`
  img {
    max-width: 480px;
    max-height: 180px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    ${media.desktop`
      width: 100%;
      display:inline;
      text-align: center;
      max-height: 100%;
    `};
  }

  h3 {
    text-align: center;
    font-weight: 700;
    margin: 0 1rem;
  }

  a {
    background-color: rgb(223, 112, 34);
    color: rgb(254, 254, 254);
    border: none;
    text-decoration: none;
    display: inline-block;
    ${media.desktop`
      max-height: 40px;
      max-width: 200px;
    `} .no-transparent {
      background-color: #fff !important;
    }
    :hover {
      background-color: rgb(180, 112, 34);
    }
    &.button {
      display: block;
      border-radius: 8px;
      ${media.desktop`
        display: inline-block;
        width: 30%;
        margin-right: 1rem;
      `};
    }
  }
`;

const HomeContainer = ({ banner }) => {
  const [originalUrl, setURL] = useState('https://rewards.ciayo.com');
  useEffect(() => {
    setURL(window.location.href);
  }, []);

  return (
    <HomeContainerStyle>
      <section id="quiz-landing" className="landing">
        <div className="cell small-12 medium-6 order-1">
          <div className="quiz-content">
            <StyledDiv>
              <img src={banner.unauth} alt="Quiz Banner" />
            </StyledDiv>
          </div>
        </div>

        <div className="quiz-wrapper">
          <div className="home-not-login">
            <StyledDiv>
              <h3>Masuk untuk langsung main!</h3>
              <a
                className="button"
                href={`https://account.ciayo.com/?back=${originalUrl}`}
                rel="noopener"
              >
                Masuk
              </a>
              <a
                className="button hollow no-transparent"
                href={`https://account.ciayo.com/register?back=${originalUrl}`}
                rel="noopener"
              >
                Daftar
              </a>
            </StyledDiv>
          </div>
        </div>
      </section>
    </HomeContainerStyle>
  );
};

HomeContainer.propTypes = {
  banner: PropTypes.object.isRequired,
};

export default HomeContainer;
