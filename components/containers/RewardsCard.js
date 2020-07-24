/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '../../routes';
import { getRewardsPrize } from '../../lib/api';
import {
  generateUniqueKey,
  parseThousands,
  truncateTitle,
  getRewardsDate,
  isSessionStorageAvail,
} from '../../lib/utils';
import Loading from '../global/Loader';
import { UserContext } from '../global/UserContext';
import { media } from '../global/base';

const RewardsCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem;
  padding: 1rem;
  height: 100%;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  min-height: 360px;
  ${media.desktop`
    margin: 2rem auto;
    max-width: 962px;
  `} .column-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
    ${media.desktop`
      margin: 0.5rem;
    `} h1 {
      font-weight: bold;
      color: #222;
    }
    .col1-row-2 {
      text-align: right;
      ${media.desktop`
        display: flex;
        flex-direction: row;
      `} .col1-row2-col-1 {
        font-size: 0.875rem;
        color: #222;
        ${media.desktop`
          margin-right: 0.5rem;
        `};
      }
      .col1-row2-col-2 {
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
        background-color: #222;
        color: #222;
        border-radius: 4px;
        ${media.desktop`
          width: 40px;
          height: 18px;
        `} .number-timer {
          color: #fff;
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
    flex-wrap: wrap;
    justify-content: flex-start;
    `};
  }

  .date-picker {
    overflow: scroll;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: baseline;
    ${media.desktop`
      margin: 0 0.5rem;
    `};
    .individual {
      font-size: 0.75rem;
      cursor: pointer;
      margin-right: 0.25rem;
      margin-bottom: 0.75rem;
      color: #999;
      text-transform: uppercase;
      font-weight: bold;
      min-width: 85px;
      outline: none;
      &.selected {
        color: #df6e22;
        border: 2px solid;
        border-radius: 14.5px;
      }
    }
  }

  .coming-soon {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    text-align: center;
    margin: 3rem 0 0 0;
    p {
      font-size: 36px;
      color: #cccccc;
    }
    img {
      width: 180px;
      margin: 2rem auto;
    }
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

const RewardsCard = ({ intervalDay, cardTitle }) => {
  // context with Hooks
  const context = useContext(UserContext);
  const { user, loading, config } = context;
  const isPremium = user ? user.is_premium : false;
  const interval = intervalDay - 1; // the index is actually starts from 0

  // state with Hooks
  const [state, setTimer] = useState({ hour: '-', minute: '-', second: '-' });
  const [isRunning, setTogglePause] = useState(true);
  const [rewardsDataReguler, setDataReguler] = useState([]);
  const [rewardsDataPlus, setDataPlus] = useState([]);
  const [currentDay, setDay] = useState(0);
  const [rewardsLoading, setLoading] = useState(true);

  // logic for day button
  const startSeason = config
    ? new Date(config.response.season.begin * 1000)
    : new Date();
  const endSeason = config
    ? new Date(config.response.season.expired * 1000)
    : new Date(new Date().getTime + 2.628e9);
  const currentTime = isSessionStorageAvail()
    ? JSON.parse(window.sessionStorage.getItem(`timestampNow-${intervalDay}`))
    : new Date(config.metadata.timestamp * 1000);
  const arrayDate = getRewardsDate(
    startSeason,
    endSeason,
    intervalDay,
    currentTime
  );
  const dayList = arrayDate.map((date, index) => (
    <div
      className={`individual ${currentDay === index ? 'selected' : ''}`}
      key={generateUniqueKey(date.dayTitle, index)}
      onClick={() => setDay(index)}
      role="button"
      tabIndex={0}
    >
      <span className="day-text">{date.dayTitle}</span>
    </div>
  ));
  // end of logic day button

  // timer logic
  const { hour, minute, second } = state;
  useEffect(() => {
    if (config) {
      const timestampNow = config.metadata.timestamp * 1000;
      if (isSessionStorageAvail()) {
        window.sessionStorage.setItem(
          `timestampNow-${intervalDay}`,
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
      if (rewardsDataPlus.length > 0) {
        endedAt = new Date(rewardsDataPlus[0].ended_at * 1000);
        let timeNow = new Date();
        if (isSessionStorageAvail()) {
          timeNow = JSON.parse(
            window.sessionStorage.getItem(`timestampNow-${intervalDay}`)
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
        } else if (currentDay !== 0) {
          setTimer({ hour: '-', minute: '-', second: '-' });
        } else {
          setTimer({ hour: hours, minute: minutes, second: seconds });
          if (isSessionStorageAvail()) {
            window.sessionStorage.setItem(
              `timestampNow-${intervalDay}`,
              JSON.stringify(timeNow + 1000)
            );
          } else {
            console.log('failed to update timer with sessionstorage');
          }
        }
      } else {
        setTimer({ hour: '-', minute: '-', second: '-' });
      }
    }
  }, isRunning ? 1000 : null);

  // data fetch using useEffect
  useEffect(
    () => {
      const getRewardsReguler = async () => {
        setLoading(true);
        await getRewardsPrize(0, currentDay, interval)
          .then(response => setDataReguler(response.data.response))
          .catch(err => {
            console.log(err);
            return setDataReguler([]);
          })
          .finally(() => setLoading(false));
      };
      const getRewardsPlus = async () => {
        await getRewardsPrize(1, currentDay, interval)
          .then(response => setDataPlus(response.data.response))
          .catch(err => {
            console.log(err);
            return setDataPlus([]);
          });
      };
      getRewardsReguler();
      getRewardsPlus();
    },
    [currentDay]
  );

  const rewardsPlusList = rewardsDataPlus.map((reward, index) => (
    <div
      className={`card-style plus ${
        reward.redeemed === reward.max || currentDay !== 0 ? 'sold-out' : ''
      }`}
      key={generateUniqueKey(reward.name, index)}
    >
      <div className="image-stock">
        <img src={reward.thumbnail} alt="Grand Prize" />
        <div className="progress-stock">
          <h4>Terjual {`${reward.redeemed}/${reward.max}`}</h4>
          <div className="item-stock">
            <div className="progress-bar small-progress-bar">
              <div
                className="progress-meter"
                style={{
                  width: `${
                    (reward.redeemed / reward.max) * 100 === 100
                      ? '0'
                      : `${(reward.redeemed / reward.max) * 100}`
                  }%`,
                  backgroundColor: '#68ca37',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="title-button">
        <h4 className="name">{truncateTitle(reward.name, 45)}</h4>
        <h4 className="price">{parseThousands(reward.price)} Scrolls</h4>
        {isPremium ? (
          <Link to={`/redeem/${reward.alias}`}>
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

  const rewardsDataList = rewardsDataReguler.map((reward, index) => (
    <div
      className={`card-style ${
        reward.redeemed === reward.max || currentDay !== 0 ? 'sold-out' : ''
      }`}
      key={generateUniqueKey(reward.name, index)}
    >
      <div className="image-stock">
        <img src={reward.thumbnail} alt="Grand Prize" />
        <div className="progress-stock">
          <h4>Terjual {`${reward.redeemed}/${reward.max}`}</h4>
          <div className="item-stock">
            <div className="progress-bar small-progress-bar">
              <div
                className="progress-meter"
                style={{
                  width: `${
                    (reward.redeemed / reward.max) * 100 === 100
                      ? '0'
                      : `${(reward.redeemed / reward.max) * 100}`
                  }%`,
                  backgroundColor: '#68ca37',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="title-button">
        <h4 className="name">{truncateTitle(reward.name)}</h4>
        <h4 className="price">{parseThousands(reward.price)} Scrolls</h4>
        <Link to={`/redeem/${reward.alias}`}>
          <a className="button grandprize">Lihat</a>
        </Link>
      </div>
    </div>
  ));

  const comingSoonPage = (
    <div className="coming-soon">
      <img
        src="/static/assets/images/redeem/coming-soon@3x.png"
        alt="coming-soon"
      />
      <p>
        <strong>Coming Soon</strong>
      </p>
    </div>
  );

  return (
    <>
      {!loading && (
        <RewardsCardStyle>
          <div className="column-1">
            <div className="col1-row-1">
              <h1>{cardTitle}</h1>{' '}
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
          <div className="date-picker">{dayList}</div>
          <div className="column-2">
            {rewardsLoading ? (
              <Loading />
            ) : rewardsDataList.length > 0 || rewardsPlusList.length > 0 ? (
              <>
                {rewardsPlusList} {rewardsDataList}
              </>
            ) : (
              comingSoonPage
            )}
          </div>
        </RewardsCardStyle>
      )}
    </>
  );
};

RewardsCard.propTypes = {
  intervalDay: PropTypes.number.isRequired,
  cardTitle: PropTypes.string.isRequired,
};

export default RewardsCard;
