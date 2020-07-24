/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { Link } from '../routes';
import { parseThousands, generateUniqueKey } from '../lib/utils';
import { UserContext, UserConsumer } from './global/UserContext';

const Load = dynamic(() => import('../components/global/scrollMore'), {
  loading: () => null,
});

const Loading = dynamic(() => import('../components/global/Loader'), {
  loading: () => null,
});

const StyledContent = styled.div`
  text-align: left;

  .grayscale-text {
    color: #cccccc;
  }

  .grayscale-img {
    filter: grayscale(100%);
  }

  .theme-color {
    color: #df6e22;
  }

  img {
    width: 100%;
  }
  li,
  a {
    margin: 20px auto;
    padding: 20px;
    width: 40%;
    border: 2px solid black;
    cursor: pointer;
    &:hover span {
      text-decoration: underline;
    }
  }

  .redeem-list {
    margin-bottom: 2rem;
  }
  .redeem-item {
    padding: 0.75rem;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    position: relative;
    -webkit-transition: all 0.3s ease;
    -o-transition: all ease 0.3s;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .redeem-item,
  .redeem-item .redeem-img {
    overflow: hidden;
  }
  .redeem-item .redeem-img img {
    display: block;
    width: 100%;
    -webkit-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-transition: all 0.3s ease;
    -o-transition: all ease 0.3s;
    transition: all 0.3s ease;
  }
  .redeem-item:hover img {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  .redeem-item .redeem-info {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100%;
  }
  .redeem-item h4 {
    margin: 0 0 0.5rem;
    -ms-flex-negative: 1;
    flex-shrink: 1;
  }

  @media screen and (min-width: 768px) {
    .smaller-font {
      font-size: 0.72rem !important;
    }
  }

  .redeem-item h4,
  .redeem-item h5 {
    font-size: 0.875rem;
    font-weight: 700;
  }
  .redeem-item h5 {
    margin: 0 0 1rem;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }
  .redeem-item h6 {
    margin: 0;
    font-size: 0.625rem;
    font-weight: 700;
  }
  .redeem-item h6.sold-out {
    color: #999;
  }
  .redeem-item .progress-bar {
    height: 8px;
  }
  .redeem-item + .redeem-item {
    margin-top: 1rem;
  }
  .redeem-item .redeem-link {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
  }
  .redeem-item:hover {
    -webkit-box-shadow: 0 0 4px 2px #eee;
    box-shadow: 0 0 4px 2px #eee;
  }
  .redeem-item:hover .redeem-img img {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  .redeem-item:hover h4 {
    text-decoration: underline;
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

class RewardsContent extends Component {
  render() {
    const timestamp = this.context.config
      ? this.context.config.metadata.timestamp
      : Math.round(new Date().valueOf() / 1000);
    const date = new Date(timestamp * 1000);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const { dayData, indexDay } = this.props;

    const isPastNine = (parHour, parMinute, parIndexDay, type) => {
      if (parIndexDay === 0) {
        return '';
      }
      return `grayscale-${type}`;
    };

    const isPastNineThemeColor = (parHour, parMinute, parIndexDay, type) => {
      if (parIndexDay === 0) {
        return 'theme-color';
      }
      return `grayscale-${type}`;
    };

    const comingSoonPage = (
      <StyledComingSoon>
        <img
          src="/static/assets/images/redeem/coming-soon@3x.png"
          alt="coming-soon"
        />
        <p>
          <strong>Coming Soon</strong>
        </p>
      </StyledComingSoon>
    );
    return (
      <StyledContent>
        {this.props.loading ? (
          <Loading />
        ) : dayData.length > 0 ? (
          <div className="grid-x grid-margin-x grid-margin-y small-up-1 medium-up-3 redeem-list">
            {dayData.map((data, index) => {
              const {
                alias,
                thumbnail,
                name,
                price,
                quantity,
                max,
                redeemed,
              } = data;

              return (
                <Link
                  route="redeemitem"
                  params={{ id: `${alias}` }}
                  key={generateUniqueKey('redeemItem', index)}
                >
                  <div className="cell">
                    <div className="redeem-item">
                      <div className="grid-x grid-margin-x align-stretch">
                        <div className="cell small-4 medium-6">
                          <div className="redeem-img">
                            <img
                              className={
                                quantity === 0
                                  ? `grayscale-img`
                                  : isPastNine(hour, minute, indexDay, `img`)
                              }
                              src={thumbnail}
                              alt="thumbnail-redeem"
                            />
                          </div>
                        </div>
                        <div className="cell small-8 medium-6">
                          <h4
                            className={`${
                              quantity === 0
                                ? `grayscale-text`
                                : isPastNine(hour, minute, indexDay, `text`)
                            } ${name.length > 50 ? 'smaller-font' : ''}`}
                          >
                            {name}
                          </h4>
                          <h5
                            className={
                              quantity === 0
                                ? `grayscale-text`
                                : isPastNineThemeColor(
                                    hour,
                                    minute,
                                    indexDay,
                                    `text`
                                  )
                            }
                          >
                            <span className="redeem-points">
                              {parseThousands(price)}
                            </span>{' '}
                            scrolls
                          </h5>
                          <div className="redeem-stock">
                            {quantity === 0 ? (
                              <h6 className="grayscale-text">Terjual Habis</h6>
                            ) : (
                              <h6
                                className={isPastNineThemeColor(
                                  hour,
                                  minute,
                                  indexDay,
                                  `text`
                                )}
                              >
                                Terjual: {redeemed} / {max}{' '}
                              </h6>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>{comingSoonPage}</div>
        )}

        {/* {this.props.loading2 ? <Loading /> : <React.Fragment />}
        {dayData.length > 0 ? (
          <Load getMoreRedeems={() => this.props.getMoreRedeems()} />
        ) : (
          <React.Fragment />
        )} */}
      </StyledContent>
    );
  }
}

RewardsContent.contextType = UserContext;

export default RewardsContent;
