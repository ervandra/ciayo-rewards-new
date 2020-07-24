import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { Link } from '../../routes';
import { getGrandPrize } from '../../lib/api';
import {
  generateUniqueKey,
  parseThousands,
  truncateTitle,
  isSessionStorageAvail,
} from '../../lib/utils';
import { UserContext } from '../global/UserContext';
import { media } from '../global/base';

const GrandPrizeCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  height: 100%;
  border-radius: 12px;
  background: #f8a832
    url('/static/assets/images/premium/grand-prize-reward-background.png') right
    bottom no-repeat;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  min-height: 360px;
  ${media.desktop`
    margin: 0.75rem auto;
    max-width: 962px;
  `} .column-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    ${media.desktop`
      margin: 0.5rem;
    `} h1 {
      font-weight: bold;
      color: #fff;
    }
    .col1-row-2 {
      text-align: right;
      ${media.desktop`
        display: flex;
        flex-direction: row;
      `} .col1-row2-col-1 {
        font-size: 0.875rem;
        color: #fff;
        ${media.desktop`
          margin-right: 0.5rem;
        `};
      }
      .col1-row2-col-2 {
        color: #fff;
        margin-top: 2px;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 0.625rem;
        font-weight: bold;
      }
      .box-timer {
        width: 28px;
        height: 15px;
        margin-left: 2px;
        background-color: #fff;
        color: #fff;
        border-radius: 4px;
        ${media.desktop`
          width: 40px;
          height: 18px;
        `} .number-timer {
          color: #222;
          margin-right: 0.25rem;
          ${media.desktop`
            font-size: 0.75rem;
            margin: 0 0.25rem;
          `};
        }
      }
      span {
        margin-left: 2px;
      }
    }
  }

  .column-2 {
    ${media.desktop`
    display: flex;
    flex-direction: row;
    `};
  }

  .card-style {
    &:hover {
      border-color: #df6e22;
    }
    &.sold-out {
      opacity: 0.5;
    }
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    margin: 1rem 0 0.5rem 0;
    ${media.desktop`
      width: 31%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    `} .image-stock {
      display: flex;
      flex-direction: column;
      img {
        max-width: 124px;
        margin: 1rem 1rem 0.5rem;
      }
      .progress-stock {
        margin: 0 1rem 1rem;
        h4 {
          font-size: 0.75rem;
          font-weight: normal;
        }
        .small-progress-bar {
          height: 10px;
        }
      }
    }
    .title-button {
      margin: 1rem 1rem 1rem 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .name {
        font-weight: normal;
        min-height: 60px;
        margin-bottom: 2rem;
        font-size: 1rem;
      }
      .price {
        color: #df6e22;
        font-size: 1rem;
      }
    }
    .grandprize {
      margin-bottom: 0;
    }
    &.plus {
      background: #d83536
        url('/static/assets/images/premium/reward-card-bg-plus.png') left
        no-repeat;
      background-size: 100%;
      border-color: #d83536;
      .progress-stock {
        h4 {
          color: #fff;
        }
      }
      .name {
        color: #fff;
      }
      .price {
        color: #fff;
      }
      .grandprize {
        background-color: #222;
        img {
          margin: 0 0 5px 3px;
          max-width: 54px;
        }
      }
    }
  }
`;

// custom Hooks to create declarative "setInterval()"
const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback]
  );
  useEffect(
    () => {
      const tick = () => savedCallback.current();
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },
    [delay]
  );
};

const GrandPrizeCard = () => {
  // context with Hooks
  const context = useContext(UserContext);
  const { user, loading, config } = context;
  const isPremium = user ? user.is_premium : false;

  // state with Hooks
  const [state, setTimer] = useState({ hour: '-', minute: '-', second: '-' });
  const [isRunning, setTogglePause] = useState(true);
  const [grandPrizeDataReguler, setDataReguler] = useState([]);
  const [grandPrizeDataPlus, setDataPlus] = useState([]);

  // timer logic
  const { hour, minute, second } = state;
  useEffect(() => {
    if (config) {
      const timestampNow = config.metadata.timestamp * 1000;
      if (isSessionStorageAvail()) {
        window.sessionStorage.setItem(
          'timestampNowGrandPrize',
          JSON.stringify(timestampNow)
        );
      } else {
        console.log('session storage is not available');
      }
    }
  }, []);
  useInterval(() => {
    if (!loading) {
      let endedAt = null;
      if (grandPrizeDataPlus.length > 0) {
        endedAt = new Date(grandPrizeDataPlus[0].ended_at * 1000);
      } else {
        setTimer({ hour: '-', minute: '-', second: '-' });
      }
      let timeNow = new Date();
      if (isSessionStorageAvail()) {
        timeNow = JSON.parse(
          window.sessionStorage.getItem('timestampNowGrandPrize')
        );
      } else {
        console.log('session storage is not available');
      }
      const seasonEnd = new Date(config.response.season.expired * 1000);
      const endDate = endedAt || seasonEnd;
      const distance = endDate - timeNow;
      const day = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours =
        day * 24 +
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        setTogglePause(false);
      } else {
        setTimer({ hour: hours, minute: minutes, second: seconds });
        if (isSessionStorageAvail()) {
          window.sessionStorage.setItem(
            'timestampNowGrandPrize',
            JSON.stringify(timeNow + 1000)
          );
        } else {
          console.log('failed to update timer with sessionstorage');
        }
      }
    }
  }, isRunning ? 1000 : null);

  // data fetch using useEffect
  useEffect(() => {
    const getGrandPrizeReguler = async () => {
      await getGrandPrize()
        .then(response => setDataReguler(response.data.response))
        .catch(err => {
          console.log(err);
          return setDataReguler([]);
        });
    };
    const getGrandPrizePlus = async () => {
      await getGrandPrize(1)
        .then(response => setDataPlus(response.data.response))
        .catch(err => {
          console.log(err);
          return setDataPlus([]);
        });
    };
    getGrandPrizeReguler();
    getGrandPrizePlus();
  }, []);

  const grandPrizeDataPlusList = grandPrizeDataPlus.map((grandPrize, index) => (
    <div
      className={`card-style plus ${
        grandPrize.redeemed === grandPrize.max ? 'sold-out' : ''
      }`}
      key={generateUniqueKey(grandPrize.name, index)}
    >
      <div className="image-stock">
        <img src={grandPrize.thumbnail} alt="Grand Prize" />
        <div className="progress-stock">
          <h4>Terjual {`${grandPrize.redeemed}/${grandPrize.max}`}</h4>
          <div className="item-stock">
            <div className="progress-bar small-progress-bar">
              <div
                className="progress-meter"
                style={{
                  width: `${
                    (grandPrize.redeemed / grandPrize.max) * 100 === 100
                      ? '0'
                      : `${(grandPrize.redeemed / grandPrize.max) * 100}`
                  }%`,
                  backgroundColor: '#68ca37',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="title-button">
        <h4 className="name">{truncateTitle(grandPrize.name, 45)}</h4>
        <h4 className="price">{parseThousands(grandPrize.price)} Scrolls</h4>
        {isPremium ? (
          <Link to={`/redeem/${grandPrize.alias}`}>
            <a className="button grandprize">Lihat</a>
          </Link>
        ) : (
          <a href="https://www.ciayo.com/id/plus" className="button grandprize">
            Go{' '}
            <img
              src="/static/assets/images/premium/plus-text.png"
              alt="Plus Text"
            />
          </a>
        )}
      </div>
    </div>
  ));

  const grandPrizeDataList = grandPrizeDataReguler.map((grandPrize, index) => (
    <div
      className={`card-style ${
        grandPrize.redeemed === grandPrize.max ? 'sold-out' : ''
      }`}
      key={generateUniqueKey(grandPrize.name, index)}
    >
      <div className="image-stock">
        <img src={grandPrize.thumbnail} alt="Grand Prize" />
        <div className="progress-stock">
          <h4>Terjual {`${grandPrize.redeemed}/${grandPrize.max}`}</h4>
          <div className="item-stock">
            <div className="progress-bar small-progress-bar">
              <div
                className="progress-meter"
                style={{
                  width: `${
                    (grandPrize.redeemed / grandPrize.max) * 100 === 100
                      ? '0'
                      : `${(grandPrize.redeemed / grandPrize.max) * 100}`
                  }%`,
                  backgroundColor: '#68ca37',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="title-button">
        <h4 className="name">{truncateTitle(grandPrize.name)}</h4>
        <h4 className="price">{parseThousands(grandPrize.price)} Scrolls</h4>
        <Link to={`/redeem/${grandPrize.alias}`}>
          <a className="button grandprize">Lihat</a>
        </Link>
      </div>
    </div>
  ));

  return (
    <>
      {!loading &&
        (grandPrizeDataPlus.length > 0 || grandPrizeDataReguler.length > 0) && (
          <GrandPrizeCardStyle>
            <div className="column-1">
              <div className="col1-row-1">
                <h1>
                  Hadiah Utama{' '}
                  <img
                    src="/static/assets/images/premium/grandprize-whitestar.png"
                    alt="White Star"
                    style={{ marginBottom: '2px' }}
                  />
                </h1>{' '}
              </div>
              <div className="col1-row-2">
                <div className="col1-row2-col-1">Berlangsung sampai</div>
                <div className="col1-row2-col-2">
                  <div className="box-timer">
                    <span className="number-timer">{hour}</span>
                  </div>{' '}
                  <span>:</span>{' '}
                  <div className="box-timer">
                    <span className="number-timer">{minute}</span>
                  </div>{' '}
                  <span>:</span>{' '}
                  <div className="box-timer">
                    <span className="number-timer">{second}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="column-2">
              {grandPrizeDataPlusList} {grandPrizeDataList}
            </div>
          </GrandPrizeCardStyle>
        )}
    </>
  );
};

export default GrandPrizeCard;
