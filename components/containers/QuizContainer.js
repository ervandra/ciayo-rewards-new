/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { Link } from '../../routes';
import { UserContext } from '../global/UserContext';
import { parseThousands, getDeepObject, hexToRgba } from '../../lib/utils';
import { REWARDS_API_URL } from '../../constants';
import { media } from '../global/base';

const Loading = dynamic(() => import('../global/Loader'), {
  loading: () => null,
});

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

const StyledComingSoon = styled.div`
  align-self: auto;
  text-align: center;
  p {
    font-size: 36px;
    color: #cccccc;
  }
  img {
    width: 180px;
    margin: 100px auto 10px auto;
  }
`;

class QuizContainer extends Component {
  state = {
    loading: true,
    finished: false,
    submitting: false,
    summary: {},
    curQuestion: {},
    selected: ``,
    answer: ``,
    hover: ``,
  };

  previousContext;

  componentDidMount() {
    const { allQuestions } = this.props;
    if (allQuestions) {
      this.setQuestion(allQuestions);
      this.setState({ loading: false });
    }
    this.previousContext = this.context;
  }

  componentDidUpdate() {
    const { user = null } = this.context;
    const { allQuestions } = this.props;
    if (this.previousContext.user !== user) {
      this.previousContext.user = user;
      this.setQuestion(allQuestions);
    }
  }

  setQuestion = allQuestion => {
    const { user = null } = this.context;
    const is_trivia_available = user ? user.is_trivia_available : false;
    const { loading } = this.context;
    if (!loading) {
      if (!is_trivia_available) {
        this.getSummary();
      } else {
        if (allQuestion.length > 0) {
          for (let i = 0; i < allQuestion.length; i++) {
            if (!allQuestion[i].answered) {
              const forCurQuestion = { ...allQuestion[i], no: i + 1 };
              return this.setState({
                curQuestion: forCurQuestion,
                loading: false,
              });
            }
          }
        }
        this.submitSummary();
      }
    }
  };

  getSummary = () => {
    const { userToken = null } = this.context;
    this.setState({
      loading: true,
    });
    Axios.get(`${REWARDS_API_URL}trivia/redeem`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(res => {
        this.setState({
          summary: res.data.response,
          finished: true,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  submitSummary = () => {
    const { addScrolls } = this.context;
    const { userToken = null } = this.context;
    this.setState({
      loading: true,
    });
    Axios.post(`${REWARDS_API_URL}trivia/redeem`, ``, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(res => {
        this.setState({
          summary: res.data.response,
          finished: true,
        });
        addScrolls(res.data.response.point);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  submitAnswer = id => {
    const {
      state,
      state: { selected },
    } = this;
    const { userToken = null } = this.context;
    const { allQuestions } = this.props;
    if (selected && !state.answer) {
      this.setState({
        submitting: true,
      });
      const answer = {
        question: id,
        answer: selected,
      };
      Axios.post(`${REWARDS_API_URL}trivia`, answer, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
        .then(res => {
          this.setState({
            answer: res.data.response.correct_answer,
          });
          allQuestions.map(question => {
            return question.question.id === id
              ? (question.answered = true)
              : '';
          });
        })
        .catch(err => {
          console.log(err.response);
        })
        .finally(() => {
          this.setState({
            submitting: false,
          });
        });
    }
  };

  nextQuestion = () => {
    const { allQuestions } = this.props;
    this.setState({
      selected: ``,
    });
    this.setState({
      answer: ``,
    });
    this.setQuestion(allQuestions);
  };

  redirectHome = () => {
    Router.push('/');
  };

  render() {
    const {
      curQuestion,
      selected,
      answer,
      hover,
      submitting,
      summary,
      loading,
      finished,
    } = this.state;
    const { allQuestions } = this.props;
    const { user = null, config = null } = this.context;
    const balance = user ? user.balance : 0;
    const question = curQuestion;
    const questionText = {
      ...curQuestion.question,
    };

    const themeColor = {
      color: getDeepObject(['response', 'season', 'font_color'], config),
      backgroundColor: getDeepObject(['response', 'season', 'color'], config),
    };

    const options =
      questionText && questionText.options ? (
        questionText.options.map((option, index) => {
          const alphabetOptions = ['A. ', 'B. ', 'C. ', 'D. ', 'E, '];
          return (
            <li
              className={`
              ${
                selected === option && answer === ''
                  ? 'selected'
                  : 'not-selected'
                }
              ${
                answer &&
                  selected === option /* &&  this.state.option !== answer */
                  ? 'wrong'
                  : 'answered'
                }
              ${
                answer &&
                  answer !== '' &&
                  answer === option &&
                  answer === selected
                  ? answer === option
                    ? 'true'
                    : ''
                  : 'answered'
                }
            `}
              style={
                (selected === option && answer === '') || hover === option
                  ? { backgroundColor: `rgba(${hexToRgba('#eaeaea', 1)})` }
                  : {}
              }
              key={index}
              onClick={() =>
                answer === '' ? this.setState({ selected: option }) : ''
              }
              onMouseOver={() =>
                this.setState({
                  hover: option,
                })
              }
              onMouseOut={() => this.setState({ hover: '' })}
            >
              {`${alphabetOptions[index]}${option}`}
            </li>
          );
        })
      ) : (
          <React.Fragment />
        );

    const maxQuestion = config ? config.response.max_questions : 0;
    const questionPage = curQuestion ? (
      <Wrapper>
        <div className="quiz-progress">
          <div className="grid-container">
            <div className="grid-x grid-margin-x">
              <div className="cell">
                <h5 style={{ color: '#222' }}>
                  Trivia <span className="current-quiz">{question.no}</span> of{' '}
                  <span className="total-quiz">{maxQuestion}</span>
                </h5>
                <div className="progress-bar">
                  <div
                    className="progress-meter"
                    style={{
                      width: `${(question.no / maxQuestion) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-container">
          <div className="grid-container">
            <div className="grid-x grid-margin-x">
              <div className="cell">
                <div className="quiz-question">
                  <div className="question-number">{question.no}.</div>
                  <h3>{questionText.question}</h3>
                </div>
                <div className="quiz-answers">
                  <ul>{options}</ul>
                </div>
                <div className="quiz-button">
                  {answer || question.answered ? (
                    <div
                      className="button btn-check"
                      onClick={() => this.nextQuestion(allQuestions)}
                      style={themeColor}
                      role="button"
                      tabIndex={0}
                    >
                      {question.no === maxQuestion ? 'Cek Score' : 'Lanjut'}
                    </div>
                  ) : submitting ? (
                    <button
                      type="submit"
                      className="button is-loading disabled"
                    >
                      <span className="ci ci-loader ci-spin" />
                    </button>
                  ) : (
                        <div
                          className={`button btn-check ${
                            selected === '' ? 'secondary' : ''
                            }`}
                          onClick={() => this.submitAnswer(curQuestion.question.id)}
                          style={themeColor}
                          role="button"
                          tabIndex={0}
                          disabled={selected === ''}
                        >
                          Jawab
                        </div>
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    ) : (
        <Loading />
      );

    const summaryPage = (
      <Wrapper>
        <div className="quiz-finish">
          <div className="grid-container">
            <div className="grid-x grid-margin-x">
              <div className="cell">
                <div className="awesome text-center">
                  <p>
                    <img
                      src="/static/assets/images/awesome.png"
                      alt="Awesome"
                    />
                  </p>
                  <h3>Trivia Selesai</h3>
                  <div className="breakline" />
                  <p>
                    Ada{' '}
                    <strong className="right-answers" style={{ color: '#222' }}>
                      {getDeepObject(['data', 'correct'], summary)
                        ? getDeepObject(['data', 'correct'], summary)
                        : '0'}{' '}
                      jawaban benar
                    </strong>{' '}
                    dari {maxQuestion} pertanyaan. Hebat! Terus baca CIAYO
                    Comics supaya skormu makin oke.
                    <br />
                    <b>Jangan lupa kembali besok untuk trivia yang baru, ya.</b>
                  </p>
                  <div className="point-earning summary">
                    <div className="row-1">
                      <h5>Scroll Yang Didapat</h5>
                      <span>
                        <strong style={{ color: '#222' }}>
                          {summary.point}
                        </strong>
                      </span>
                    </div>

                    <div className="vertical-line" />

                    <div className="row-2">
                      <h5>Total Scrolls</h5>
                      <span>
                        <strong style={{ color: '#222' }}>
                          {parseThousands(balance)}
                        </strong>
                      </span>
                    </div>
                  </div>
                  <div className="finish-button">
                    <Link to="/redeem">
                      <a className="button">Lihat Hadiah Hari Ini</a>
                    </Link>
                    <Link to="/">
                      <a className="grey-link">
                        <strong>Kembali ke Beranda</strong>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );

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

    const comingSoonPage = (
      <StyledComingSoon>
        <img
          src="/static/assets/images/redeem/coming-soon@3x.png"
          alt="coming-soon"
        />
        <p>
          <strong>Coming Soon</strong> <br />
          Start on 26th Feb 21:00 GMT+7
        </p>
      </StyledComingSoon>
    );

    const timestamp = config
      ? config.metadata.timestamp
      : Math.round(new Date().valueOf() / 1000);
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (
      <Wrapper>
        <section>
          {loading ? (
            <Loading />
          ) : getDeepObject([`season`, `break`], config.response) ? (
            breakSeason
          ) : !finished ? (
            questionPage
          ) : (
                  summaryPage
                )}
        </section>
      </Wrapper>
    );
  }
}

QuizContainer.contextType = UserContext;

export default QuizContainer;
