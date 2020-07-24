/* eslint-disable camelcase */
/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { PAYMENT_URL } from '../constants';
import { UserContext, UserConsumer } from '../components/global/UserContext';
import { Link } from '../routes';

const Loading = dynamic(() => import('../components/global/Loader'), {
  loading: () => null,
});

const PlusWrapper = styled.div`
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 20%;
    margin-bottom: 1vh;
  }

  p {
    text-align: center;
  }

  a {
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    min-width: 18%;
    max-width: 30%;
    @media only screen and (max-width: 792px) {
      min-width: 70%;
      font-size: 0.7rem !important;
    }
  }
`;

// const MobileWrapper = styled.div`
//   min-width: 100%;
//   min-height: 100vh;
//   color: #ffffff;
//   text-align: center;

//   .terms-of-service-mobile {
//     margin-top: 2vh;
//     text-align: center;
//     font-size: 0.75rem;
//     color: #222 !important;
//   }

//   .tos {
//     text-decoration: underline;
//     &:hover {
//       color: #df6e22;
//     }
//   }

//   h1 {
//     margin-bottom: 1vh;
//     height: 25px;
//   }

//   h4 {
//     margin-bottom: 0px;
//   }

//   .normal-price {
//     display: block;
//     text-align: center;
//     text-decoration: line-through;
//   }

//   .trial {
//     margin-top: 7vh;
//     font-size: 0.85rem;
//   }

//   .list-benefit {
//     background-color: #fff;
//     color: #222222;
//     width: 85%;
//     height: 32vh;
//     display: block;
//     margin-left: auto;
//     margin-right: auto;
//     border-radius: 8px;
//   }

//   .list-item {
//     width: 80%;
//     height: 4vh;
//     margin-left: 2vw;
//     margin-right: auto;
//     margin-bottom: 1.8vh;
//     display: flex;
//     img {
//       width: 6vh;
//       height: 8vh;
//       margin-left: 0px;
//       margin-right: 0px;
//       padding-top: 2vh;
//       padding-bottom: 2vh;
//     }

//     p {
//       height: 100%;
//       margin-bottom: 0px;
//       margin-left: 3vw;
//       padding-top: 16px;
//     }
//   }

//   #discounted-price-mobile {
//     font-size: 42px !important;
//   }

//   .body-mobile {
//     min-width: 100%;
//     min-height: 76vh;
//     background-color: #ae2b26;
//     background-repeat: no-repeat;
//     background-image: url('/static/assets/images/premium/svg/plus-image.svg');
//     background-position: 100%;
//     background-size: 90%;
//     border-top-left-radius: 8px;
//     border-top-right-radius: 8px;
//   }
//   img {
//     width: 65%;
//     display: block;
//     margin-left: auto;
//     margin-right: auto;
//     padding-top: 4vh;
//     padding-bottom: 4vh;
//     &#plus-button-mobile {
//       margin-left: 10px;
//       margin-right: 0px;
//       width: 54px;
//     }
//   }
// `;

const StyledPremiumDiv = styled.div`
  margin: 0px 0px 0px 0px;
  color: white;
  text-align: center;
  position: static;
  width: 496px;
  max-width: 100%;
  height: 234px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #ae2b26;
  background-size: 32%;
  background-repeat: no-repeat;
  background-image: url('/static/assets/images/premium/svg/plus-image.svg');
  background-position: 100%;

  @media only screen and (max-width: 640px) {
    background-size: 64%;
    h1 {
      font-size: 1rem;
    }

    .trial {
      font-size: 0.85rem;
      margin-top: 4vh;
    }
  }

  h4 {
    text-decoration: line-through;
    font-weight: 400 !important;
    justify-content: center !important;
    margin-bottom: 0px !important;
  }

  #discounted-price {
    font-size: 42px;
  }

  #teaser-top {
    margin-bottom: 0px;
  }

  #combined-shape {
    margin-bottom: 16px;
  }

  img {
    width: 50%;
    padding-top: 24px;
  }
  p {
    margin-bottom: 0px !important;
  }
`;

const DetailsDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  background-color: #ffffff;
  width: 494px;
  max-width: 100%;
  height: 447px;
  img {
    float: left;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    margin-left: 40px;
    margin-top: auto;
    margin-bottom: auto;

    @media only screen and (max-width: 640px) {
      margin-left: 15px;
      margin-right: 10px;
    }
  }
  hr {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
  }

  p {
    margin-top: 6px !important;
    margin-bottom: 0px !important;
  }

  .details {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .term-of-service {
    text-align: center;
    font-size: 0.75rem;
  }

  .tos {
    text-decoration: underline;
    &:hover {
      color: #df6e22;
    }
  }

  #desc {
    color: #999999;
    font-weight: 400px;
    font-size: 0.75rem;
  }

  .hide-desktop {
    display: block;
  }

  @media only screen and (max-width: 640px) {
    .hide-desktop {
      display: none !important;
    }

    .term-of-service {
      font-size: 0.65rem;
    }
  }
`;

const UpgradeButton = styled.button`
  width: 90%;
  height: 42px;
  border-radius: 8px;
  background-color: #df6e22;
  display: flex;
  color: #ffffff;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vh;
  :hover {
    background-color: #df6e50;
  }

  #go-button {
    margin: auto 0;
  }

  #plus-button {
    margin-left: 10px;
    margin-right: 0px;
    width: 54px;
    height: 12px;
  }
`;

// const UpgradeButtonMobile = styled.button`
//   width: 90%;
//   height: 6vh;
//   border-radius: 4px;
//   background-color: #df6e22;
//   display: flex;
//   color: #ffffff;
//   justify-content: center;
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 2vh;
//   img {
//     width: 54px;
//     padding-top: 2vh;
//     padding-bottom: 2vh;
//   }

//   #go-button-mobile {
//     margin-top: 2vh;
//     margin-bottom: 2vh;
//   }
// `;

const Wrapper = styled.div`
  width: 496px;
  height: 700px;
  max-height: 700px;
  margin: auto;
  border: 1px solid #cccccc;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
class Plus extends Component {
  static async getInitialProps({ req, res }) {
    let cookie = '';

    if (process.browser) {
      // eslint-disable-next-line prefer-destructuring
      cookie = document.cookie ? document.cookie : '';
    } else {
      cookie = req.headers.cookie ? req.headers.cookie : '';
    }

    if (cookie === '') {
      res.writeHead(302, { Location: '/login' });
      res.end();
    }
  }

  state = {
    loading: true,
  };

  handleRedirect = user => {
    if (user) {
      this.props.router.push('/plus');
    } else {
      this.props.router.push('/login');
    }
  };

  componentDidMount = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const alreadyPlus = (
      <PlusWrapper>
        <img
          src="/static/assets/images/redeem/no-result-230@3x.png"
          alt="break-season"
        />
        <p>
          <strong>Already CIAYO Comic Plus +</strong>
        </p>
        <hr />
        <p>
          Wow, you already redeemed our trial package. We can't give you another
          one
        </p>

        <Link to="/">
          <a className="button small secondary hollow">
            Back to CIAYO Comics Rewards
          </a>
        </Link>
      </PlusWrapper>
    );

    return (
      <UserConsumer>
        {context => {
          const is_premium = context.user
            ? context.user.is_premium
            : false;

          if (this.state.loading) {
            return <Loading />;
          }
          if (is_premium) {
            return alreadyPlus;
          } else {
            return (
              <Wrapper>
                <StyledPremiumDiv>
                  <img
                    src="/static/assets/images/premium/svg/ciayo-comics-grouped.svg"
                    alt="combined-shape"
                    id="combined-shape"
                  />
                  <h1 id="teaser-top">
                    <strong>FREE TRIAL PACKAGE</strong>
                  </h1>{' '}
                  <h4>Rp. 49.000</h4>{' '}
                  <h1 id="teaser-top">
                    <strong>
                      <span id="discounted-price">Rp. 0</span>
                    </strong>
                  </h1>
                  <p className="trial">
                    Try CIAYO Comics Plus for 1 month and get:
                  </p>
                </StyledPremiumDiv>
                <DetailsDiv>
                  <div className="details">
                    <img
                      src="/static/assets/images/premium/svg/ic_rewards-point.svg"
                      alt="bonus-scrolls"
                    />
                    <p>
                      <strong>
                        <span id="highlight">+5000 Rewards Scrolls</span>
                      </strong>

                      <br />
                      <span id="desc">
                        Get 5000 extra rewards scrolls to redeem.
                      </span>
                    </p>
                  </div>
                  <hr width="83%" />
                  <div className="details">
                    <img
                      src="/static/assets/images/premium/svg/ic_premium-comic.svg"
                      alt="premium-comic"
                    />
                    <p>
                      <strong>Exclusive Comics</strong>
                      <br />
                      <span id="desc">
                        Enjoy dedicated comics only for you.
                      </span>
                    </p>
                  </div>
                  <hr width="83%" />
                  <div className="details">
                    <img
                      src="/static/assets/images/premium/svg/early-access.svg"
                      alt="early-access"
                    />
                    <p>
                      <strong>Early Access</strong>
                      <br />
                      <span id="desc">
                        Read'em before normal mortals could.
                      </span>
                    </p>
                  </div>
                  <hr width="83%" />
                  <div className="details">
                    <img
                      src="/static/assets/images/premium/svg/no-ads.svg"
                      alt="no-ads"
                    />
                    <p>
                      <strong>No Ads</strong>
                      <br />
                      <span id="desc">Just you, comics, and more comics.</span>
                    </p>
                  </div>
                  <hr width="83%" />
                  <div className="details">
                    <img
                      src="/static/assets/images/premium/svg/border-avatar.svg"
                      alt="no-ads"
                    />
                    <p>
                      <strong>Avatar Border</strong>
                      <br />
                      <span id="desc">Flex your special border everywhere</span>
                    </p>
                  </div>

                  <a
                    target="_blank"
                    href={`${PAYMENT_URL}`}
                    rel="noopener noreferrer"
                  >
                    <UpgradeButton>
                      <strong id="go-button">Go</strong>
                      <img
                        src="/static/assets/images/premium/svg/plus-brand-icon.svg"
                        alt="plus-brand"
                        id="plus-button"
                      />
                    </UpgradeButton>
                  </a>

                  <div className="term-of-service">
                    <p>
                      By signing up for this subscription package,
                      <br /> you agree to{' '}
                      <a
                        href="https://www.ciayo.com/id/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="tos">Terms of Service</span>
                      </a>
                    </p>
                  </div>
                </DetailsDiv>
              </Wrapper>
            );
          }
        }}
      </UserConsumer>
    );
  }
}

export default withRouter(Plus);
