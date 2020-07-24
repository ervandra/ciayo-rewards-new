import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Link } from '../routes';
import { UserContext } from './global/UserContext';
import { generateUniqueKey, parseThousands, truncateTitle } from '../lib/utils';

const TopRewardsStyle = styled.div`
  .top-rewards-title {
    margin: 0 1rem;
    width: 90%;
    h4 {
      font-size: 1rem;
      padding-bottom: 0.75rem;
    }
  }
  .top-reward-list {
    display: flex;
    margin-right: 1rem;
    margin-bottom: 1rem;
    padding-left: 1rem;
    flex-wrap: nowrap;
    min-height: 240px;
    justify-content: flex-start;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    .top-reward {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h4 {
        height: 38px;
        font-weight: normal;
      }
    }
    .img-item {
      margin-right: 1rem;
      margin-bottom: 1.25rem;
      margin-top: 0px;
      margin-left: 0px;
      max-width: 170px;
      border-style: solid;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      transform-origin: 50% 50%;
      border-width: thin;
      border-color: #fff;
      border-radius: 14px;
      padding: 10px;
      flex: 0 0 auto;
      &:hover {
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25),
          0 10px 10px rgba(0, 0, 0, 0.22);
      }
    }
    .reward-price {
      color: ${props => props.theme.orange};
      font-weight: bold;
    }
    .plus-reward {
      position: relative;
      color: #fff;
      border-color: #d83536;
      background: #d83536 url(/static/assets/images/premium/top-reward-plus.png)
        left bottom no-repeat;
      background-size: 170px;
      span {
        color: #fff;
      }
      &:after {
        position: absolute;
        content: '';
        left: -8px;
        top: -8px;
        width: 100px;
        height: 100px;
        background: url(/static/assets/images/premium/plus-ribbon@2x.png)
          no-repeat;
        transform-origin: 50% 50%;
        transform: scale(0.85);
      }
    }
  }
`;

const Loading = dynamic(() => import('../components/global/Loader'), {
  loading: () => null,
});

const TopRewards = ({ rewards, plusRewards }) => {
  const context = useContext(UserContext);
  const { loading } = context;

  const plusRewardsList = plusRewards.map((reward, index) => (
    <Link
      route="redeemitem"
      key={generateUniqueKey(reward.name, index)}
      params={{ id: `${reward.alias}` }}
    >
      <div
        className="img-item plus-reward"
        key={generateUniqueKey(reward.alias, index)}
      >
        <div className="top-reward">
          <div className="img-reward">
            <img src={reward.thumbnail} alt="REWARD" />
          </div>
          <h4>{truncateTitle(reward.name)}</h4>
          <span className="reward-price">
            {parseThousands(reward.price)} Scrolls
          </span>
        </div>
      </div>
    </Link>
  ));

  const rewardsList = rewards.map((reward, index) => (
    <Link
      route="redeemitem"
      key={generateUniqueKey(reward.name, index)}
      params={{ id: `${reward.alias}` }}
    >
      <div className="img-item" key={generateUniqueKey(reward.alias, index)}>
        <div className="top-reward">
          <div className="img-reward">
            <img src={reward.thumbnail} alt="REWARD" />
          </div>
          <h4>{truncateTitle(reward.name)}</h4>
          <span className="reward-price">
            {parseThousands(reward.price)} Scrolls
          </span>
        </div>
      </div>
    </Link>
  ));

  return (
    <TopRewardsStyle>
      {rewards.length > 0 && (
        <>
          <div className="top-rewards-title flex-container align-justify align-middle">
            <h4>Paling Populer</h4>
          </div>

          <div className="top-reward-list">
            {loading ? (
              <Loading />
            ) : (
              <>
                {plusRewardsList}
                {rewardsList}
              </>
            )}
          </div>
        </>
      )}
    </TopRewardsStyle>
  );
};

TopRewards.propTypes = {
  rewards: PropTypes.array.isRequired,
  plusRewards: PropTypes.array.isRequired,
};

export default TopRewards;
