/* eslint-disable react/destructuring-assignment */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SEO from '../global/SEO';
import { LOGIN_URL, TRIVIA_URL } from '../../constants';
import { UserContext } from '../global/UserContext';
import { getDeepObject } from '../../lib/utils';
import { media } from '../global/base';

const Wrapper = styled.div`
  box-shadow: 0 -1px 0 0 #eeeeee inset;
  text-align: center;
  .mobile-flex {
    flex-direction: column;
    align-items: center;
    ${media.desktop`
      flex-direction: row;
    `};
  }
  .body-login {
    padding: 1rem 1rem 0;
  }
`;

const LoginContainer = () => {
  const context = useContext(UserContext);
  const [originalUrl, setURL] = useState('https://rewards.ciayo.com');
  useEffect(() => {
    setURL(window.location.href);
  }, []);

  const themeColor = {
    color: getDeepObject(['response', 'season', 'font_color'], context.config),
    backgroundColor: getDeepObject(
      ['response', 'season', 'color'],
      context.config
    ),
  };

  return (
    <Wrapper>
      <section id="content">
        <div className="cell body-login">
          <h2>Masuk atau Daftar untuk Rebut Hadiahnya</h2>
          <div className="flex-container align-center align-top how-to mobile-flex">
            <div className="how">
              <img
                src="/static/assets/images/login/ic_trivia_login.png"
                alt="Log In/Register"
              />
              <h5>Masuk / Daftar</h5>
            </div>
            <div className="separator">
              <img
                src="/static/assets/images/login/ic_red_arrow_right.png"
                alt="Arrow"
              />
            </div>
            <div className="how">
              <img
                src="/static/assets/images/login/ic_trivia_quiz.png"
                alt="Quiz"
              />
              <h5>Jawab kuis dan dapatkan scrolls</h5>
            </div>
            <div className="separator">
              <img
                src="/static/assets/images/login/ic_red_arrow_right.png"
                alt="Arrow"
              />
            </div>

            <div className="how">
              <img
                src="/static/assets/images/login/ic_trivia_rewards.png"
                alt="Rewards"
              />
              <h5>Pilih hadiahnya</h5>
            </div>
            <div className="separator">
              <img
                src="/static/assets/images/login/ic_red_arrow_right.png"
                alt="Arrow"
              />
            </div>

            <div className="how">
              <img
                src="/static/assets/images/login/ic_trivia_delivery.png"
                alt="Delivery"
              />
              <h5>Hadiah akan dikirim ke alamat kamu</h5>
            </div>
          </div>

          <div className="login-first-buttons text-center">
            <a
              href={`https://account.ciayo.com/?back=${originalUrl}`}
              className="button"
              style={themeColor}
            >
              Masuk
            </a>
            <a
              href={`https://account.ciayo.com/register?back=${originalUrl}`}
              className="button"
              style={{
                color: 'rgb(223, 110, 34)',
                backgroundColor: '#fff',
                border: '2px solid rgb(233, 110, 34)',
              }}
            >
              Daftar
            </a>
          </div>
        </div>
        <SEO />
      </section>
    </Wrapper>
  );
};

export default LoginContainer;
