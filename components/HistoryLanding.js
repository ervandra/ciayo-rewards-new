/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { isMobile } from 'react-device-detect';
import { Link } from '../routes';
import {
  parseThousands,
  convertTimestamp,
  generateUniqueKey,
} from '../lib/utils';
import { media } from './global/base';

const HistoryItem = dynamic(() => import('../components/HistoryItem'), {
  loading: () => null,
});

const Loading = dynamic(() => import('../components/global/Loader'), {
  loading: () => null,
});

const Wrapper = styled.div`
  text-align: center;
  .myscroll-box {
    height: 66px;
    margin: 1rem 1rem 0.5rem;
    padding: 1rem 0;
    background-color: #eaeaea;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    ${media.desktop`
      margin: 1rem 0 0.5rem;
    `} h3 {
      font-size: 20px;
      .my-points {
        font-weight: bold;
      }
    }
  }

  p {
    margin: 0 1rem;
    color: #999999;
    font-size: 0.75rem;
    text-align: center;
  }

  img {
    display: inline-block;
    max-width: 37.5%;
  }
`;

const NoHistory = styled.div`
  padding: 1.5rem 0;
  text-align: center;
  h2 {
    font-weight: bold;
    font-size: 1.5rem;
    margin: 1rem;
  }
  p {
    color: #333;
    font-size: 0.875rem;
  }
  a {
    width: 90%;
    margin: 1rem 0;
  }
`;

const HistoryLanding = ({
  histories,
  balance,
  expired,
  seasonBreak,
  handleCloseModal,
}) => {
  const handleCloseDesktop = () => {
    if (!isMobile) {
      handleCloseModal();
    }
  };

  return (
    <div>
      {histories ? (
        <Wrapper>
          <div className="myscroll-box">
            <h3>
              Jumlah Scroll:{' '}
              <span className="my-points">{parseThousands(balance)}</span>
            </h3>
          </div>

          {!seasonBreak && (
            <p>
              Scroll yang didapat akan kadaluarsa pada{' '}
              <strong>{convertTimestamp(expired, 1)} WIB.</strong>
            </p>
          )}
          <div className="history-item">
            {histories.length > 0 ? (
              histories.map((history, index) => (
                <HistoryItem
                  key={generateUniqueKey('history-item', index)}
                  title={history.title}
                  date={history.created_at}
                  type={history.point >= 0 ? 'plus' : 'minus'}
                  points={history.point}
                  total={history.balance + history.point}
                />
              ))
            ) : (
              <NoHistory>
                <img
                  src="/static/assets/images/no-history.png"
                  alt="No History"
                />
                <h2>Hmm, Masih Kosong</h2>
                <hr />
                <p>Diisi dengan jawab trivia yuk.</p>
                <Link to="/quiz">
                  <a
                    className="button hollow-trivia"
                    title="Go To Quiz"
                    onClick={() => handleCloseDesktop()}
                    role="button"
                    tabIndex="0"
                  >
                    Jawab Trivia Hari Ini
                  </a>
                </Link>
              </NoHistory>
            )}
          </div>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </div>
  );
};

HistoryLanding.propTypes = {
  histories: PropTypes.array,
  balance: PropTypes.number.isRequired,
  expired: PropTypes.number.isRequired,
  seasonBreak: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func,
};

export default HistoryLanding;
