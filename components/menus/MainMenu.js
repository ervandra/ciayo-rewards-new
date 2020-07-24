/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic';
import Modal from 'react-modal';
import { Link } from '../../routes';
import { UserConsumer, UserContext } from '../global/UserContext';
import { parseThousands } from '../../lib/utils';
import Loader from '../global/Loader';
import { media } from '../global/base';

const HistoryContainer = dynamic(
  () => import('../containers/HistoryContainer'),
  {
    loading: () => null,
  }
);

const LoginButton = dynamic(() => import('../global/user/LoginButton'));

const MainMenuStyle = styled.nav`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  position: relative;

  a {
    height: 100%;
    color: #999;
    height: 56px;
    line-height: 53px;
    border-bottom: 4px solid #0000;
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${props => props.theme.s};
    display: flex;
    align-items: center;
    padding: 0 1rem;
    min-width: 136px;
    justify-content: center;
    white-space: nowrap;
    cursor: pointer;
    &:hover,
    &:focus {
      border-color: ${props => props.theme.lightBg};
    }
    &.active {
      border-color: ${props => props.theme.brand};
      color: ${props => props.theme.brand};
    }
  }

  .nav-menu a.back-to-ciayo-comics {
    display: none;
  }

  .avatar {
    max-width: 100%;
    max-height: 40px;
    border-radius: 50%;
    width: 80%;
    height: 80%;
    margin-left: 10%;
    margin-top: 10%;
    box-shadow: 0 0 1px ${props => props.theme.shadow};
  }
  .logo {
    order: 1;
    position: absolute;
    left: 0;
    top: 0;
  }

  .nav-menu {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    max-width: 960px;
    flex: 1 1 100%;
    order: 3;
    justify-content: center;
    & span.ci {
      font-size: ${props => props.theme.s};
    }

    @media only screen and (max-width: 1100px) {
      max-width: 1099px;
    }
    @media only screen and (max-width: 1200px) {
      justify-content: flex-start;
    }
  }

  .nav-profile {
    white-space: nowrap;
    order: 2;
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    & > div {
      display: flex;
      font-size: 0.75rem;
      line-height: 14px;
    }
    .loader-container {
      height: 50px;
      margin-right: 1rem;
    }
  }

  .logo img {
    display: block;
    width: 192px;
    height: 48px;
  }

  .user-avatar {
    margin-left: 0.5rem;
    border-radius: 30rem;
    overflow: hidden;
    display: block;
    width: 32px;
    height: 32px;
    img {
      display: block;
      position: relative;
      &.avatar-border {
        max-width: 32px;
        position: absolute;
        z-index: 5;
        right: 12px;
        top: 12px;
        border-radius: 0;
      }
    }
  }

  .user-point {
    font-weight: 700;
    cursor: pointer;
    -webkit-transition: all 0.1s ease;
    -o-transition: all ease 0.1s;
    transition: all 0.1s ease;
    white-space: normal;
    text-align: right;
    color: #df6e22;
  }
  .user-point span {
    display: inline;
  }
  .user-point span.text {
    display: none;
    padding-right: 0.25rem;
    color: #df6e22;
    font-weight: 400;
  }
  .user-name {
    display: none;
  }

  .nav-profile .logged_in_state {
    max-width: 200px;
    padding: 0.75rem;
  }
  @media (min-width: 1100px) {
    .user-point {
      padding: 0 1rem;
      border: 1px solid #f8a832;
      border-radius: 4px;
      line-height: 34px;
      font-size: 0.75rem;
      color: #df6e22;
    }
    .user-point span {
      display: inline-block;
    }
    .user-point span.text {
      display: inline-block;
      color: #df6e22;
    }
    .user-point:focus,
    .user-point:hover {
      background: #df6e22;
      color: #fff;
    }
    .user-point:focus .text,
    .user-point:hover .text {
      color: #fff;
    }
    .nav-profile > div,
    .nav-profile .logged_in_state {
      max-width: 100%;
    }

    .user-name {
      display: block;
      margin-left: 1rem;
      max-width: 140px;
      overflow: hidden;
      white-space: nowrap;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      font-size: 0.875rem;
      font-weight: bold;
      line-height: 2rem;
    }

    .back-to-ciayo-comics {
      display: block;
      font-size: 0.875rem;
      min-width: 182px;
      color: ${props => props.theme.brand};
    }
    .nav-menu {
      order: 2;
    }
    .user-avatar {
      margin-left: 1rem;
    }

    a {
      min-width: 136px;
    }
    .nav-menu a.back-to-ciayo-comics {
      display: block;
    }

    .logo img {
      width: 224px;
      height: 56px;
    }

    .back-to-ciayo-comics {
      display: block;
      font-size: 0.875rem;
      min-width: 182px;
      color: ${props => props.theme.brand};
    }
    .nav-menu {
      order: 2;
    }
  }

  @media (min-width: 1100px) {
    a {
      min-width: 136px;
    }
    .nav-menu a.back-to-ciayo-comics {
      display: block;
    }

    .logo img {
      width: 224px;
      height: 56px;
    }
  }
  @media only screen and (max-width: 1366px) and (min-width: 1100px) {
    .nav-menu {
      padding-left: 192px;
    }
  }

  @media (max-width: 1099px) {
    .nav-menu {
      margin-top: 56px;
      background: #ffffff;
    }
    .nav-menu a {
      text-align: center;
      flex: 1 1;
    }
    .user-point {
      margin-top: 10px;
    }

    .logo img {
      height: 100%;
      width: 160px;
      margin-top: 8px;
    }
  }
  @media (max-width: 1099px) and (min-width: 768px) {
    .logo {
      flex: 1 1 50%;
      max-width: 50%;
      padding: 0;
    }
  }

  @media screen and (min-width: 24rem) {
    .user-point {
      white-space: nowrap;
      text-align: left;
    }
  }
  .banner-rewards {
    max-width: 224px;
    max-height: 56px;
  }

  h2 {
    &.balance-history {
      cursor: pointer;
    }
  }

  #login {
    padding-left: 20px;
  }
`;

class MainMenu extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  redirectHistoryMobile = () => {
    this.props.router.push('/history');
  };

  render() {
    const { router } = this.props;
    const { loading, config, user } = this.context;
    return (
      <React.Fragment>
        <MainMenuStyle>
          <div className="logo">
            <Link to="index">
              <img
                className="banner-rewards"
                src={
                  config
                    ? config.response.season.logo
                    : '/static/assets/images/logo.png'
                }
                alt="CIAYO Comic Rewards"
              />
            </Link>
          </div>
          <div className="nav-menu">
            <Link to="index">
              <a className={`${router.pathname === '/' ? 'active' : ''}`}>
                <span className="ci ci-home-outline hide-desktop" />
                <span className="text">Beranda</span>
              </a>
            </Link>
            <Link to="/redeem">
              <a
                className={`${
                  router.asPath.includes('/redeem') ? 'active' : ''
                }`}
              >
                <span className="ci ci-comics-outline hide-desktop" />
                <span className="text">Hadiah</span>
              </a>
            </Link>
            <a
              className="text back-to-ciayo-comics"
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.ciayo.com"
            >
              <span className="text">KEMBALI KE CIAYO COMICS</span>
            </a>
          </div>
          <div className="nav-profile">
            {loading ? (
              <Loader />
            ) : user ? (
              <div
                className="logged_in_state"
                onClick={() =>
                  isMobile ? this.redirectHistoryMobile() : this.toggleModal()
                }
              >
                <span className="user-point">
                  <span className="text">Jumlah scroll:</span>
                  <span>
                    {parseThousands(user.balance)}
                    <span className="hide-mobile">
                      {user.balance > 0 ? ' Scrolls' : ' Scroll'}
                    </span>
                  </span>{' '}
                </span>
                <span className="user-name">{user.display_name}</span>
                <span className="user-avatar">
                  <img className="avatar" src={user.avatar} alt="user-avatar" />
                  {user.avatar_border && (
                    <img
                      className="avatar-border"
                      src={user.avatar_border}
                      alt="user-border"
                    />
                  )}
                </span>
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
        </MainMenuStyle>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Scroll History"
          onRequestClose={this.toggleModal}
          ariaHideApp={false}
          className="modal-point-history"
          overlayClassName="overlay"
        >
          <h2 style={{ color: '#222' }}>RIWAYAT SCROLL</h2>
          <HistoryContainer
            handleCloseModal={this.toggleModal}
            status={user || null}
          />

          <button className="modal-close" onClick={() => this.toggleModal()}>
            <span className="ci ci-close" />
          </button>
        </Modal>
      </React.Fragment>
    );
  }
}

MainMenu.propTypes = {
  router: PropTypes.object.isRequired,
};

const MainMenuWithRouter = withRouter(MainMenu);

MainMenu.contextType = UserContext;

export default MainMenuWithRouter;
