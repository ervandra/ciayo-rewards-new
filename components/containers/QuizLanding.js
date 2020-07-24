/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from '../../routes';
import { UserContext } from '../global/UserContext';
import { media } from '../global/base';

const StyledDiv = styled.div`
  img {
    max-width: 480px;
    max-height: 180px;
    ${media.desktop`
      width: 100%;
      max-height: 100%;
      margin-top: -1rem;
    `};
  }
`;

const LandingStyled = styled.section`
  box-shadow: 0 -1px 0 0 #ffff inset;
  margin-bottom: 3rem;

  .grid-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    max-width: 61rem;
    margin: 0 auto;
  }

  .quiz-wrapper {
    border-color: #e6e7e8;
    background-color: #e6e7e8;
    padding-bottom: 0.5rem;
    border-radius: 12px;
    text-align: center;
    width: 90%;
    ${media.desktop`
      width:100%;
      max-height: 72px;
    `} margin: 0 auto;
    h3 {
      font-size: 1rem;
      margin: 1rem 1.5rem;
      margin-bottom: 0.75rem;
      padding-top: 1.25rem;
      /* text-align: center; */
      font-weight: bold;
      ${media.desktop`
      width: 100%;
      padding-top: 0.5rem;
      `};
    }
  }

  .grid-x {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
  }

  .grid-margin-x {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }

  .quiz-item {
    display: flex;
  }

  /* .landing h3 {
    font-size: 1rem;
    margin: 1rem 1rem;
    text-align: center;
    font-weight: 700;
  } */

  #quiz-landing .button {
    border-radius: 8px;
    width: 90%;
    margin: 0.75rem auto;
    display: block;
    ${media.desktop`
      display: inline-block;
      width: 30%;
      margin: 0.75rem 1.5rem;
      margin-right: 0;
    `};
  }
  #quiz-landing .order-1 {
    -ms-flex-order: 1;
    order: 1;
  }

  #quiz-landing .order-2 {
    -ms-flex-order: 2;
    order: 2;
  }
  #quiz-landing .quiz-heading {
    width: 100%;
  }
  #quiz-landing .quiz-heading .button {
    display: none;
  }

  @media (min-width: 1024px) {
    #quiz-landing .order-1 {
      -ms-flex-order: 2;
      order: 2;
    }

    #quiz-landing .order-2 {
      -ms-flex-order: 1;
      order: 1;
    }

    #quiz-landing h3 {
      text-align: left;
      font-size: 1.25rem;
      ${media.desktop`
        text-align: center;
      `};
    }
    #quiz-landing .quiz-heading .button {
      display: block;
    }
    #quiz-landing .quiz-content .button {
      display: none;
    }
  }
`;

const QuizLanding = ({ banner, seasonBreak, isStarted }) => {
  const context = useContext(UserContext);
  const isTriviaAvailable = context.user
    ? context.user.is_trivia_available
    : false;

  return (
    <LandingStyled>
      <section id="quiz-landing" className="landing">
        <div className="quiz-content">
          {seasonBreak ? (
            <>
              <StyledDiv>
                <img
                  src="https://media.ciayo.com/trivia/season/1546503225-banner-trivia-logged-in-break-season.cd80823d.jpg"
                  alt="Answer Trivia, Get Scrolls, and Win Merch. Soon."
                />
              </StyledDiv>
            </>
          ) : (
            <>
              <StyledDiv>
                <Link route="/redeem">
                  <img
                    src={
                      context.user && context.user.is_premium
                        ? banner.premium
                        : banner.auth
                    }
                    alt="Answer Trivia, Get Scrolls, and Win Merch!"
                  />
                </Link>
              </StyledDiv>
            </>
          )}
        </div>

        <div className="quiz-wrapper">
          {seasonBreak ? (
            <>
              <h3>
                Siap dapat scroll dan menangin hadiah?{' '}
                <a className="button" disabled>
                  Kembali Besok Untuk Trivia Berikutnya
                </a>
              </h3>
            </>
          ) : (
            <>
              <h3>
                Siap dapat scroll dan menangin hadiah?{' '}
                <Link to="/quiz">
                  <a className="button" title="Go To Quiz">
                    {isTriviaAvailable
                      ? 'Jawab Trivia Hari Ini'
                      : 'Lihat Hasil Trivia Hari Ini'}
                  </a>
                </Link>
              </h3>
            </>
          )}
        </div>
      </section>
    </LandingStyled>
  );
};

/* isStarted ? 'Segera Hadir' : @ line 193 */

QuizLanding.propTypes = {
  banner: PropTypes.object.isRequired,
  seasonBreak: PropTypes.bool.isRequired,
  isStarted: PropTypes.bool.isRequired,
};

export default QuizLanding;
