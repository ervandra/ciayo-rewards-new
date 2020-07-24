/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
import React, { Component /* , useState, useContext */ } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Slider from 'react-slick';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import { getDeepObject, parseThousands, generateUniqueKey } from '../lib/utils';
import { UserContext } from './global/UserContext';
import { media } from './global/base';

const Shipping = dynamic(() => import('./Shipping'), {
  loading: () => null,
});

const VerifyComponent = dynamic(() => import('./global/Verify'), {
  loading: () => null,
});

const ItemStyle = styled.div`
  ${media.mobile`
    /* margin-left: -12px;
    margin-right: -12px; */
    margin-top: -20px;
  `};

  .item-container {
    overflow-x: hidden;
  }

  .reward-body-description {
    margin-top: 0.8rem;
  }

  .px-0 {
    padding-right: 0;
    padding-left: 0;
  }

  .item-detail {
    h1 {
      font-weight: lighter;
    }
  }
  .reward-description {
    color: black;
  }
  a {
    color: #fff;
  }

  .reward-wrapper {
    ${media.mobile`
      // margin: 0 -1rem;
    `};
  }
`;

const ModalStyle = styled.div`
  .mobile-style {
    color: #222;
    margin-left: 1.5rem;
    h4 {
      font-weight: bold;
      margin-bottom: 0rem;
      padding-top: 1.5rem;
    }
  }
`;
// const Item = ({ reward, redirectConfirm, redirectVerify }) => {
//   const context = useContext(UserContext);
//   const [state, setState] = useState({
//     showModal: false,
//     showVerify: false,
//     showNotEnoughPoints: false,
//     showSoldOut: false,
//   });
//   const { showModal, showVerify, showNotEnoughPoints, showSoldOut } = state;

//   const handleOpenModal = () => {
//     setState(prev => ({ ...prev, showModal: true }));
//   };
//   const handleCloseModal = () => {
//     setState(prev => ({ ...prev, showModal: false }));
//   };
//   const handleOpenVerify = () => {
//     setState(prev => ({ ...prev, showVerify: true }));
//   };
//   const handleCloseVerify = () => {
//     setState(prev => ({ ...prev, showVerify: false }));
//   };
//   const handleOpenNotEnoughPoints = () => {
//     setState(prev => ({ ...prev, showNotEnoughPoints: true }));
//   };
//   const handleCloseNotEnoughPoints = () => {
//     setState(prev => ({ ...prev, showNotEnoughPoints: false }));
//   };
//   const handleOpenSoldOut = () => {
//     setState(prev => ({ ...prev, showSoldOut: true }));
//   };
//   const handleCloseSoldOut = () => {
//     setState(prev => ({ ...prev, showSoldOut: false }));
//   };
//   const handleSoldOut = () => {
//     setState(prev => ({ ...prev, showModal: false, showSoldOut: true }));
//   };
//   const handleSubmitRedeem = url => {
//     const { user } = context;
//     if (user) {
//       if (user.is_confirmed) {
//         if (user.balance >= reward.price && reward.quantity > 0) {
//           if (isMobile) {
//             return redirectConfirm(url);
//           }
//           return handleOpenModal();
//         }
//         if (reward.quantity === 0) {
//           return handleOpenSoldOut();
//         }
//         return handleOpenNotEnoughPoints();
//       }
//       if (isMobile) {
//         return redirectVerify();
//       }
//       return handleOpenVerify();
//     }
//     return Router.push('/login');
//   };

//   const themeColor = {
//     color: getDeepObject(['response', 'season', 'font_color'], context.config),
//     backgroundColor: getDeepObject(
//       ['response', 'season', 'color'],
//       context.config
//     ),
//   };
//   const images = getDeepObject(['images'], reward);
//   const imageList = images
//     ? images.map((image, index) => (
//         <div className="slides" key={generateUniqueKey('imagelist', index)}>
//           <img src={image} alt="ITEM IMG" />
//         </div>
//       ))
//     : '';

//   return (
//     <section className="item-container">
//       <div className="grid-container">
//         <div className="grid-x grid-margin-x grid-margin-large">
//           <div className="cell large-shrink">
//             <div className="slider-container">
//               <Slider
//                 className="main-slider"
//                 dots
//                 infinite={images && images.length > 1}
//                 arrows={images && images.length > 1}
//                 ref={slider => (this.slider1 = slider)}
//                 adaptiveHeight
//               >
//                 {imageList}
//               </Slider>
//             </div>
//           </div>
//           <div className="cell auto">
//             <div className="item-detail">
//               <h1
//                 onClick={() =>
//                   isMobile
//                     ? this.handleSubmitRedeem(1, reward.alias)
//                     : this.handleSubmitRedeem(0, reward.alias)
//                 }
//               >
//                 {reward.name}
//               </h1>
//               <h3>
//                 {parseThousands(reward.price)}{' '}
//                 {reward.price > 1 ? 'scrolls' : 'scroll'}
//               </h3>
//               {reward.quantity <= 0 ? (
//                 <div className="item-stock sold-out">
//                   <h6>Sold Out</h6>
//                   <div className="progress-bar" />
//                 </div>
//               ) : (
//                 <div className="item-stock">
//                   <h6 style={{ color: themeColor.backgroundColor }}>
//                     Sold: {reward.redeemed}/{reward.max}
//                   </h6>
//                   <div className="progress-bar">
//                     <div
//                       className="progress-meter"
//                       style={{
//                         width: `${(reward.redeemed / reward.max) * 100}%`,
//                         backgroundColor: themeColor.backgroundColor,
//                       }}
//                     />
//                   </div>
//                 </div>
//               )}
//               <h5>Description</h5>
//               <p>{reward.description}</p>
//               {!reward.is_today ? (
//                 <div className="redeem-button">
//                   <button
//                     className="button btn-sold-out secondary disabled"
//                     disabled
//                   >
//                     Redeem
//                   </button>
//                 </div>
//               ) : (
//                 <div className="redeem-button">
//                   <BrowserView>
//                     <button
//                       onClick={() => this.handleSubmitRedeem(0, reward.alias)}
//                       className="button btn-redeem"
//                       style={this.props.themeColor}
//                     >
//                       Redeem
//                     </button>
//                   </BrowserView>
//                   <MobileView>
//                     <button
//                       onClick={() => this.handleSubmitRedeem(1, reward.alias)}
//                       className="button btn-redeem"
//                       style={this.props.themeColor}
//                     >
//                       Redeem
//                     </button>
//                   </MobileView>
//                 </div>
//               )}
//               {/* <button onClick={() => this.handleOpenVerify()}>
//                   Open Modal Verify
//                 </button> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal
//         isOpen={this.state.showModal}
//         contentLabel="Redeem Now"
//         onRequestClose={this.handleCloseModal}
//         className="reveal small shipping-info reveal-halloween"
//         ariaHideApp={false}
//         overlayClassName="overlay"
//       >
//         <Shipping
//           item={item}
//           closeModal={() => this.handleCloseModal()}
//           handleSoldOut={() => this.handleSoldOut()}
//         />
//         <button
//           className="close-reveal modal-close ci"
//           onClick={this.handleCloseModal}
//         >
//           &times;
//         </button>
//       </Modal>

//       <Modal
//         isOpen={this.state.showVerify}
//         contentLabel="Verify Email"
//         onRequestClose={() => this.handleCloseVerify()}
//         className="reveal medium verify-email"
//         ariaHideApp={false}
//         overlayClassName="overlay"
//       >
//         <section>
//           {this.context.user ? (
//             !this.context.user.is_confirmed ? (
//               <VerifyComponent />
//             ) : (
//               <h4>You are verified, enjoy your CIAYO Account!!!</h4>
//             )
//           ) : (
//             <p>Please login first before accessing this page</p>
//           )}
//         </section>

//         <button
//           className="close-reveal modal-close ci"
//           onClick={() => this.handleCloseVerify()}
//         >
//           &times;
//         </button>
//       </Modal>

//       <Modal
//         isOpen={this.state.showNotEnoughPoints}
//         contentLabel="Not Enough Scrolls"
//         onRequestClose={() => this.handleCloseNotEnoughPoints()}
//         className="reveal small special"
//         overlayClassName="overlay"
//       >
//         <div className="reveal-title">
//           <div className="reveal-image">
//             <img
//               src="/static/assets/images/not-enough-coin-redeem.png"
//               alt="Not Enough Scrolls"
//             />
//           </div>
//           <h4>Not Enough Scrolls!</h4>
//         </div>
//         <div className="reveal-content text-center">
//           <p>
//             Your scroll balance is insufficient. <br />
//             Please collect more scrolls to proceed.
//           </p>
//           <div
//             className="button small secondary hollow"
//             onClick={() => this.handleCloseNotEnoughPoints()}
//             onKeyPress={() => this.handleCloseNotEnoughPoints()}
//             role="button"
//             tabIndex={0}
//           >
//             Ok
//           </div>
//         </div>
//         <button
//           className="close-reveal modal-close ci"
//           onClick={() => this.handleCloseNotEnoughPoints()}
//         >
//           &times;
//         </button>
//       </Modal>

//       <Modal
//         isOpen={this.state.showSoldOut}
//         contentLabel="Not Enough Scrolls"
//         onRequestClose={this.handleCloseSoldOut}
//         className="reveal small special"
//         ariaHideApp={false}
//         overlayClassName="overlay"
//       >
//         <div className="reveal-title">
//           <div className="reveal-image">
//             <img
//               src="/static/assets/images/not-enough-coin-redeem.png"
//               alt="Out of Stock"
//             />
//           </div>
//           <h4>Out of Stock</h4>
//         </div>
//         <div className="reveal-content text-center">
//           <p>
//             The product you wish to redeem is turn out to be out of stock.
//             Better be fast next time.
//           </p>
//           <div
//             className="button small secondary hollow"
//             onClick={this.handleCloseSoldOut}
//             onKeyPress={this.handleCloseSoldOut}
//             role="button"
//             tabIndex={0}
//           >
//             Ok
//           </div>
//         </div>

//         <button
//           className="close-reveal modal-close ci"
//           onClick={this.handleCloseSoldOut}
//         >
//           &times;
//         </button>
//       </Modal>
//     </section>
//   );
// };
class Item extends Component {
  state = {
    showModal: false,
    showVerify: false,
    showNotEnoughPoints: false,
    showSoldOut: false,
  };

  handleOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleOpenVerify = () => {
    this.setState({
      showVerify: true,
    });
  };

  handleCloseVerify = () => {
    this.setState({
      showVerify: false,
    });
  };

  handleOpenNotEnoughPoints = () => {
    this.setState({
      showNotEnoughPoints: true,
    });
  };

  handleCloseNotEnoughPoints = () => {
    this.setState({
      showNotEnoughPoints: false,
    });
  };

  handleOpenSoldOut = () => {
    this.setState({
      showSoldOut: true,
    });
  };

  handleCloseSoldOut = () => {
    this.setState({
      showSoldOut: false,
    });
  };

  handleSubmitRedeem = url => {
    const { user } = this.context;
    const { reward, redirectConfirm, redirectVerify } = this.props;
    if (user) {
      if (user.is_confirmed) {
        if (user.balance >= reward.price && reward.quantity > 0) {
          if (isMobile) return redirectConfirm(url);
          return this.handleOpenModal();
        }
        if (reward.quantity === 0) return this.handleOpenSoldOut();
        return this.handleOpenNotEnoughPoints();
      }
      if (isMobile) return redirectVerify();
      return this.handleOpenVerify();
    }
    return Router.push('/login');
  };

  handleSoldOut = () => {
    this.handleCloseModal();
    this.handleOpenSoldOut();
  };

  render() {
    const isPremium = this.context.user ? this.context.user.is_premium : false;
    const themeColor = {
      color: getDeepObject(
        ['response', 'season', 'font_color'],
        this.context.config
      ),
      backgroundColor: getDeepObject(
        ['response', 'season', 'color'],
        this.context.config
      ),
    };
    const imgStyle = {
      maxWidth: '4rem',
      height: '0.9rem',
      marginLeft: '0.4rem',
      marginBottom: '0.3rem',
    };
    const { reward } = this.props;
    const images = getDeepObject(['images'], reward);

    const imageList = images
      ? images.map((image, index) => (
          <div className="slides" key={generateUniqueKey('imagelist', index)}>
            <img src={image} alt="ITEM IMG" />
          </div>
        ))
      : '';

    return (
      <section className="item-container" style={{ overflowX: 'hidden' }}>
        <ItemStyle>
          <div className="grid-container px-0">
            <div className="grid-x grid-margin-x grid-margin-large reward-wrapper">
              <div className="cell large-shrink">
                <div className="slider-container">
                  <Slider
                    className="main-slider"
                    dots
                    infinite={images && images.length > 1}
                    arrows={images && images.length > 1}
                    ref={slider => (this.slider1 = slider)}
                    adaptiveHeight
                  >
                    {imageList}
                  </Slider>
                </div>
              </div>
              <div className="cell auto reward-body-description">
                <div className="item-detail">
                  <h1 onClick={() => this.handleSubmitRedeem(reward.alias)}>
                    {reward.name}
                  </h1>
                  <h3>
                    {parseThousands(reward.price)}{' '}
                    {reward.price > 1 ? 'scrolls' : 'scroll'}
                  </h3>
                  {reward.quantity <= 0 ? (
                    <div className="item-stock sold-out">
                      <h6>Terjual Habis</h6>
                      <div className="progress-bar" />
                    </div>
                  ) : (
                    <div className="item-stock">
                      <h6 style={{ color: 'black' }}>
                        Terjual: {reward.redeemed}/{reward.max}
                      </h6>
                      <div className="progress-bar">
                        <div
                          className="progress-meter"
                          style={{
                            width: `${(reward.redeemed / reward.max) * 100}%`,
                            backgroundColor: '#68ca37',
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <h5>Deskripsi</h5>
                  <p className="reward-description">{reward.description}</p>
                  {!isPremium && reward.for_premium ? (
                    <div className="redeem-button">
                      <a
                        href="https://www.ciayo.com/id/plus"
                        title="Tombol Hadiah"
                        className="button btn-redeem"
                        style={themeColor}
                      >
                        Go
                        <img
                          src="/static/assets/images/premium/plus-text.png"
                          alt="Plus Text"
                          style={imgStyle}
                        />
                      </a>
                    </div>
                  ) : !reward.is_today ? (
                    <div className="redeem-button">
                      <button
                        type="button"
                        className="button btn-sold-out secondary disabled"
                        disabled
                      >
                        Ambil Hadiah
                      </button>
                    </div>
                  ) : (
                    <div className="redeem-button">
                      <button
                        type="button"
                        onClick={() => this.handleSubmitRedeem(reward.alias)}
                        className="button btn-redeem"
                        style={themeColor}
                      >
                        <a title="Tombol Hadiah">Ambil Hadiah</a>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={this.state.showModal}
            contentLabel="Redeem Now"
            onRequestClose={this.handleCloseModal}
            className="reveal small shipping-info reveal-halloween"
            ariaHideApp={false}
            overlayClassName="overlay"
          >
            <Shipping
              item={reward}
              closeModal={() => this.handleCloseModal()}
              handleSoldOut={() => this.handleSoldOut()}
            />
            <button
              type="button"
              className="close-reveal modal-close ci"
              onClick={this.handleCloseModal}
            >
              &times;
            </button>
          </Modal>

          <Modal
            isOpen={this.state.showVerify}
            contentLabel="Verify Email"
            onRequestClose={() => this.handleCloseVerify()}
            className="reveal medium verify-email"
            ariaHideApp={false}
            overlayClassName="overlay"
          >
            <section>
              {this.context.user ? (
                !this.context.user.is_confirmed ? (
                  <VerifyComponent />
                ) : (
                  <h4>Kamu sudah terverifikasi, ayo serbu hadiahnya!!!</h4>
                )
              ) : (
                <p>
                  Kamu harus login terlebih dahulu sebelum mengetahui status
                  verifikasi kamu
                </p>
              )}
            </section>

            <button
              type="button"
              className="close-reveal modal-close ci"
              onClick={() => this.handleCloseVerify()}
            >
              &times;
            </button>
          </Modal>

          <Modal
            isOpen={this.state.showNotEnoughPoints}
            contentLabel="Not Enough Scrolls"
            onRequestClose={() => this.handleCloseNotEnoughPoints()}
            className="reveal small special"
            overlayClassName="overlay"
          >
            <ModalStyle>
              <div className="reveal-title">
                <div className="reveal-image">
                  <img
                    src="/static/assets/images/oops-owl.png"
                    alt="Not Enough Scrolls"
                  />
                </div>
                <h4>Scroll Kurang, Huu</h4>
              </div>
              <div className="hide-mobile mobile-style">
                <h4>Scroll Kurang, Huu</h4>
              </div>
              <div className="reveal-content text-center">
                <p>
                  Jumlah scroll kamu belum cukup untuk mengambil hadiah ini.
                  Semangat kumpulin scroll!
                </p>
                <div
                  className="button small secondary hollow"
                  onClick={() => this.handleCloseNotEnoughPoints()}
                  onKeyPress={() => this.handleCloseNotEnoughPoints()}
                  role="button"
                  tabIndex={0}
                >
                  Oke
                </div>
              </div>
              <button
                type="button"
                className="close-reveal modal-close ci"
                onClick={() => this.handleCloseNotEnoughPoints()}
              >
                &times;
              </button>
            </ModalStyle>
          </Modal>

          <Modal
            isOpen={this.state.showSoldOut}
            contentLabel="Not Enough Scrolls"
            onRequestClose={this.handleCloseSoldOut}
            className="reveal small special"
            ariaHideApp={false}
            overlayClassName="overlay"
          >
            <ModalStyle>
              <div className="reveal-title">
                <div className="reveal-image">
                  <img
                    src="/static/assets/images/oops-owl.png"
                    alt="Out of Stock"
                  />
                </div>
                <h4>Stok Sudah Habis</h4>
              </div>
              <div className="hide-mobile mobile-style">
                <h4>Stok Sudah Habis</h4>
              </div>
              <div className="reveal-content text-center">
                <p>
                  Stok hadiah yang hendak diambil sudah habis. Coba balik besok
                  atau lihat-lihat hadiah yang lain.
                </p>
                <div
                  className="button small secondary hollow"
                  onClick={this.handleCloseSoldOut}
                  onKeyPress={this.handleCloseSoldOut}
                  role="button"
                  tabIndex={0}
                >
                  Oke
                </div>
              </div>

              <button
                type="button"
                className="close-reveal modal-close ci"
                onClick={this.handleCloseSoldOut}
              >
                &times;
              </button>
            </ModalStyle>
          </Modal>
        </ItemStyle>
      </section>
    );
  }
}

Item.contextType = UserContext;

Item.propTypes = {
  reward: PropTypes.object.isRequired,
  redirectConfirm: PropTypes.func.isRequired,
  redirectVerify: PropTypes.func.isRequired,
};

export default Item;
