/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';
import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { REWARDS_API_URL } from '../../constants';
import RewardsContent from '../RewardsContent';
import { getDeepObject } from '../../lib/utils';
import { UserContext, UserConsumer } from '../global/UserContext';

const DayContainerStyle = styled.div`
  padding: 0 1rem 0;
`;

const DayButton = styled.button`
  margin-right: 15px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  color: #999;
  font-size: 0.75rem;
  cursor: pointer;
  outline: none;
  border-radius: 12px;
  display: inline-block;
  padding: 6px 14px;
  white-space: nowrap;
  line-height: 1.5;

  &.active {
    background-color: #ae2b26;
    color: rgb(254, 254, 254);
  }

  &:hover {
    background-color: #ccc;
    color: #999;
  }
`;

const DayWrapper = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: row;
  margin-right: 10px;
  overflow-x: scroll;
  padding: 15px 0;
`;

class DayContainer extends Component {
  state = {
    dayData: [],
    currentDay: 0,
    selectedDay: '',
    redeemsLoading: false,
    redeemsLoading2: false,
    redeemsMore: true,
    redeemsCurrentPage: 2,
  };

  componentWillMount() {
    this.getData(0);
  }

  getData = (index, option) => {
    const urlAPI = `${REWARDS_API_URL}reward?day=${index}&page=1&per_page=12`;

    this.setState({
      currentDay: index,
      redeemsLoading: true,
      selectedDay: option,
      redeemsMore: true,
    });
    Axios.get(urlAPI, {
      // eslint-disable-next-line react/destructuring-assignment
      headers: { Authorization: `Bearer ${this.context.userToken}` },
    })
      .then(res => {
        const resData = res.data;
        if (resData.response.length) {
          this.setState({
            dayData: resData.response,
          });
        } else {
          this.setState({
            dayData: [],
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          redeemsLoading: false,
        });
      });
  };

  getMoreRedeems = () => {
    // eslint-disable-next-line react/destructuring-assignment
    if (!this.state.redeemsLoading && this.state.redeemsMore) {
      this.setState({
        redeemsLoading2: true,
      });
      Axios.get(
        // eslint-disable-next-line react/destructuring-assignment
        `${REWARDS_API_URL}reward?day=${this.state.currentDay}&page=${
        // eslint-disable-next-line react/destructuring-assignment
        this.state.redeemsCurrentPage
        }&per_page=12`,
        // eslint-disable-next-line react/destructuring-assignment
        { headers: { Authorization: `Bearer ${this.context.userToken}` } }
      )
        .then(res => {
          let nextPage = 0;
          let more = true;
          if (
            // eslint-disable-next-line react/destructuring-assignment
            this.state.redeemsCurrentPage <
            getDeepObject(
              ['data', 'metadata', 'pagination', 'information', 'last_page'],
              res
            )
          ) {
            // eslint-disable-next-line react/destructuring-assignment
            nextPage = this.state.redeemsCurrentPage + 1;
          } else {
            more = false;
          }
          const redeems = [...this.state.dayData];
          redeems.push(...res.data.response);
          this.setState({
            dayData: redeems,
            redeemsMore: more,
            getMoreRedeems: nextPage,
          });
        })
        .catch(err => {
          console.log(err.response.data.state.message);
        })
        .finally(() => {
          this.setState({
            redeemsLoading2: false,
          });
        });
    }
  };

  render() {
    const timestamp = this.props.config
      ? this.props.config.metadata.timestamp
      : Math.round(new Date().valueOf() / 1000);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];

    // untuk insert dynamic button sesuai tanggal
    const arrayDate = [];
    let j = 0;
    const date = new Date(timestamp * 1000);
    const initDate = new Date(date.setDate(date.getDate() - 1));
    const startDate = initDate.getDate();
    const startHour = initDate.getHours();
    const startMinute = initDate.getMinutes();
    const startSecond = initDate.getSeconds();
    const startMonth = months[initDate.getMonth()];
    arrayDate.push({
      objectDate: initDate,
      date: startDate,
      month: startMonth,
      hour: startHour,
      minute: startMinute,
      second: startSecond,
    });
    while (j < 8) {
      const newDate = initDate.setDate(initDate.getDate() + 1);
      const thisHour = new Date(newDate).getHours();
      const thisMinute = new Date(newDate).getMinutes();
      const thisSecond = new Date(newDate).getSeconds();
      const thisDate = new Date(newDate).getDate();
      const thisMonth = months[new Date(newDate).getMonth()];
      arrayDate.push({
        objectDate: new Date(newDate), // <-- wrong logic, don't use this
        date: thisDate,
        month: thisMonth,
        hour: thisHour,
        minute: thisMinute,
        second: thisSecond,
      });
      j++;
    }

    const { dayData } = this.state;

    const breakPage = (
      <div className="break-season">
        <img
          src="/static/assets/images/redeem/no-result-230@3x.png"
          alt="break-season"
        />
        <p>It's Time for a Break!</p>
        <hr />
        <p>
          We’re cooking a special event for you to enjoy real soon. Check back
          often to make sure you don’t miss a thing.
        </p>
      </div>
    );

    const isBeforeNine =
      startHour <= 20 && startMinute <= 59 && startSecond <= 59;
    const isAfterNine = startHour >= 21 && startMinute >= 0 && startSecond >= 0;

    return (
      <DayContainerStyle>
        {this.context.config && this.context.config.response.season.break ? (
          breakPage
        ) : (
            <div>
              <DayWrapper>
                {arrayDate.map((obj, index) => {
                  const option = `${obj.date} ${obj.month}`;
                  let finalIndex = index;
                  // if (obj.date > 27 || obj.month !== 'Mar') {
                  //   // workaround for now, still looking for optimal solution
                  //   return '';
                  // }

                  if (isAfterNine) {
                    finalIndex -= 1;
                  }

                  if (index === 0) {
                    let caption = '';

                    if (isBeforeNine) {
                      caption = `${obj.date} ${obj.month}`;
                    } else if (isAfterNine) {
                      caption = `${obj.date} ${obj.month}`;
                      return ``;
                    }

                    return (
                      <DayButton
                        key={obj.date.toString()}
                        onClick={() => this.getData(finalIndex, option)}
                        className={
                          this.state.selectedDay === undefined
                            ? 'active'
                            : option === this.state.selectedDay
                              ? 'active'
                              : ''
                        }
                      >
                        {caption} - 21:00 WIB
                      </DayButton>
                    );
                  }

                  if (index === 1) {
                    let caption = '';

                    if (obj.hour <= 20 && obj.minute <= 59 && obj.second <= 59) {
                      // caption = `Today`;
                      caption = `${obj.date} ${obj.month}`;
                    } else if (
                      obj.hour >= 21 &&
                      obj.minute >= 0 &&
                      obj.second >= 0
                    ) {
                      caption = `${obj.date} ${obj.month}`;
                    }

                    return (
                      <DayButton
                        key={obj.date.toString()}
                        onClick={() => this.getData(finalIndex, option)}
                        className={
                          isAfterNine
                            ? this.state.selectedDay === undefined
                              ? 'active'
                              : option === this.state.selectedDay
                                ? 'active'
                                : ''
                            : option === this.state.selectedDay
                              ? 'active'
                              : ''
                        }
                      >
                        {caption} - 21:00 WIB
                      </DayButton>
                    );
                  }

                  if (index === 8) {
                    const caption = `${obj.date} ${obj.month}`;

                    if (isAfterNine) {
                      return (
                        <DayButton
                          key={obj.date.toString()}
                          onClick={() => this.getData(finalIndex, option)}
                          className={
                            option === this.state.selectedDay ? 'active' : ''
                          }
                        >
                          {caption} - 21:00 WIB
                        </DayButton>
                      );
                    }
                    return '';
                  }

                  return (
                    <DayButton
                      key={obj.date.toString()}
                      onClick={() => this.getData(finalIndex, option)}
                      className={
                        option === this.state.selectedDay ? 'active' : ''
                      }
                    >
                      {`${obj.date} ${obj.month}`} - 21:00 WIB
                    </DayButton>
                  );
                })}
              </DayWrapper>
              <hr />

              <RewardsContent
                loading={this.state.redeemsLoading}
                loading2={this.state.redeemsLoading2}
                dayData={dayData}
                indexDay={this.state.currentDay}
                getMoreRedeems={() => this.getMoreRedeems()}
              />
            </div>
          )}
      </DayContainerStyle>
    );
  }
}

DayContainer.contextType = UserContext;

export default DayContainer;
