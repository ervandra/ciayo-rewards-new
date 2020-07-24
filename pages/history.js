/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { parseCookies } from 'nookies';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Link } from '../routes';
import { UserContext } from '../components/global/UserContext';
import { media } from '../components/global/base';

const HistoryStyle = styled.div`
  margin-top: 2.75rem;
  ${media.desktop`
    margin-top: 0rem;
  `};
`;

const HistoryContainer = dynamic(
  () => import(`../components/containers/HistoryContainer`),
  { loading: () => null }
);

const History = () => {
  const context = useContext(UserContext);

  return (
    <HistoryStyle>
      <div className="breadcrumbs history">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="current-page">Scrolls History</li>
        </ul>
      </div>

      <HistoryContainer status={context.user} />
    </HistoryStyle>
  );
};

History.getInitialProps = async ctx => {
  const { res } = ctx;
  const { token = null } = parseCookies(ctx);
  if (token === null) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }
};

export default History;
