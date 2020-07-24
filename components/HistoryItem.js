/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { parseThousands, convertTimestamp } from '../lib/utils';

const HistoryItemStyle = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .cell-title {
    text-align: left;
    h4 {
      font-size: 0.85rem;
      font-weight: normal;
      margin-bottom: 0.25rem;
    }
    h6 {
      font-size: 0.8rem;
      font-weight: normal;
    }
  }

  .cell-scrolls {
    color: #999;
    font-size: 0.8rem;
    h5 {
      color: #999;
      font-size: 0.8rem;
    }
  }

  .cell-total {
    color: #222;
    font-size: 0.8rem;
    h5 {
      color: #222;
      font-size: 0.8rem;
    }
  }
`;

const HistoryItem = ({ title, date, type, points, total }) => (
  <>
    <HistoryItemStyle>
      <div className="cell-title">
        <h4>{title}</h4>
        <div>
          <h6>{convertTimestamp(date)}</h6>
        </div>
      </div>
      <div className="cell-scrolls">
        <h5>
          <span className="history-points">
            {type === 'minus' ? '' : '+'}
            {parseThousands(points)}
          </span>
        </h5>
      </div>
      <div className="cell-total">
        <h5>
          <span className="">{parseThousands(total)}</span>
        </h5>
      </div>
    </HistoryItemStyle>
    <div
      style={{
        backgroundColor: '#e2e2e2',
        height: '1px',
        width: '100%',
        margin: '1rem 0',
      }}
    />
  </>
);

HistoryItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default HistoryItem;
