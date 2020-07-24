import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';
import { Link } from '../routes';
import { getRewardDetail } from '../lib/api';
import { media } from '../components/global/base';

const Item = dynamic(() => import('../components/Item'), {
  loading: () => null,
});

const Wrapper = styled.div`
  ${media.desktop`
  .breadcrumbs {
      margin-top: -40px;
      background-color: #ae2b26;
      li {
        color: #fff;
        &::before {
          color: #fff;
        }
      }
      a {
        color: #fff;
      }
    }
  `} .breadcrumbs-home {
    font-weight: bold;
  }
  margin-top: 3rem;
  ${media.desktop`
    margin-top: 2.5rem;
  `};
`;

const StyledDiv = styled.div`
  max-width: 992px;
  margin: 20px auto;
  margin-top: 0;
  ${media.desktop`
    margin-top: 3rem;
  `} img {
    width: 100%;
  }

  .wrapper {
    margin-top: 100px;
  }
`;

const RedeemItem = ({ rewardData }) => {
  const handleRedirectConfirm = item => {
    Router.push(`/redeem/${item}/confirm`);
  };

  const handleRedirectVerify = () => {
    Router.push(`/verify`);
  };

  return (
    <Wrapper>
      <div className="breadcrumbs">
        <ul>
          <li>
            <Link to="/">
              <a className="breadcrumbs-home" title="Go To Home">
                Home
              </a>
            </Link>
          </li>
          <li className="current-page">Deskripsi Barang</li>
        </ul>
      </div>

      <StyledDiv>
        <Item
          reward={rewardData}
          redirectConfirm={alias => handleRedirectConfirm(alias)}
          redirectVerify={() => handleRedirectVerify()}
        />
      </StyledDiv>
    </Wrapper>
  );
};

RedeemItem.getInitialProps = async ({ res, query }) => {
  const {
    data: { response = null },
  } = await getRewardDetail(query.id);

  if (response === null) {
    if (res) {
      res.redirect('/redeem');
    } else {
      Router.push('/redeem');
    }
  }

  return { rewardData: response };
};

RedeemItem.propTypes = {
  rewardData: PropTypes.object,
};

export default RedeemItem;
