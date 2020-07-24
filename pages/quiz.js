import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parseCookies } from 'nookies';
import Router from 'next/router';
import { Link } from '../routes';
import QuizContainer from '../components/containers/QuizContainer';
import { media } from '../components/global/base';
import { getTriviaQuestions } from '../lib/api';

const Wrapper = styled.div`
  margin-top: 2.5rem;
  ${media.desktop`
  .quiz {
      margin-top: -40px;
      background-color: #ae2b26;
      li {
        color: #fff;
        &::before {
          color: #fff;
        }
      }
      a {
        color: #fff;
      }
    }
  `};
`;

const Quiz = ({ allQuestions }) => (
  <Wrapper>
    <div className="breadcrumbs quiz">
      <ul>
        <li>
          <Link to="/">
            <a>
              <strong>Beranda</strong>
            </a>
          </Link>
        </li>
        <li className="current-page">Trivia</li>
      </ul>
    </div>
    <QuizContainer allQuestions={allQuestions} />
  </Wrapper>
);

Quiz.getInitialProps = async ctx => {
  const { res } = ctx;
  const { token = null } = parseCookies(ctx);
  const allQuestions = await getTriviaQuestions(token)
    .then(response => response.data.response)
    .catch(err => {
      console.log(err);
      return [];
    });
  if (token === null) {
    if (res) res.redirect('/login');
    Router.push('/login');
  }
  return { allQuestions };
};

Quiz.propTypes = {
  allQuestions: PropTypes.array,
};

export default Quiz;
