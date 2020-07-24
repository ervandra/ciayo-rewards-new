/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Router, { withRouter } from 'next/router';
import Modal from 'react-modal';
import { parseCookies } from 'nookies';
import { Link } from '../routes';
import { REWARDS_API_URL, TRIVIA_URL } from '../constants';
import { getUserToken, parseThousands, getDeepObject } from '../lib/utils';
import { UserContext, UserConsumer } from '../components/global/UserContext';
import { getRewardDetail } from '../lib/api';
import { media } from '../components/global/base';

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

const Wrapper = styled.div`
  /* width: 100%; */
  margin: 0 auto;
  margin-top: 2.5rem;
  ${media.desktop`
    margin-top: 0;
  `} img {
    max-width: 80px;
    max-height: 80px;
  }

  .reward-body {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .shipping {
    margin-bottom: 1.25rem;
    .breadcrumbs-home {
      font-weight: bold;
    }
  }

  .reward-item-info {
    margin: 0.75rem 0;
    height: 100%;
    h4 {
      font-weight: lighter;
    }
    h6 {
      font-weight: bold;
    }
  }

  .item-image-container {
    margin-bottom: 1.25rem;
    display: flex;
    border: 1px solid #cccccc;
    border-radius: 8px;
    img {
      margin: 0.75rem 1rem;
    }
  }

  .tracking-info {
    text-align: center;
    border-color: #e6e7e8;
    background-color: #e6e7e8;
    border-radius: 12px;
    font-size: small;
  }

  h5 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .user-email {
    font-weight: bold;
  }
  .choosen-item {
    margin-bottom: 2rem;
    color: #000;
  }
  .choosen-item h5 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0m;
  }
  .choosen-item img {
    width: 80px;
    height: 80px;
  }
  .choosen-item .choosen-item-info {
    height: 100%;
    border: 1px solid #d3d3d3;
    border-left: none;
    padding: 0.5rem 1rem;
    height: 80px;
    overflow: auto;
  }
  .choosen-item .choosen-item-info h4 {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 0.25rem;
  }
  .choosen-item .choosen-item-info h6 {
    font-size: 0.875rem;
    font-weight: 700;
    color: #df6e22;
    margin: 0;
  }

  .grid-share {
    display: flex;
    justify-content: space-evenly;
    ${media.tablet`
     justify-content: center;
   `};
  }
  .redeem-success-button {
    text-align: center;
  }
  .redeem-success-button button {
    margin: 5px 0 !important;
    display: inline-block !important;
  }
  .a-button {
    font-size: 0.75rem;
    font-weight: bold;
    color: #999;
    text-decoration: underline;
  }
`;

const FacebookShareStyle = styled.div`
  border-radius: 4px;
  background-color: #4d69a1;
  font-weight: bold;
  color: #fff;
  max-width: 120px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  width: 7rem;
  ${media.tablet`
    margin-right: 1rem;
  `};
`;

const FacebookShare = ({ url }) => (
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
    target="popup"
  >
    <FacebookShareStyle>Facebook</FacebookShareStyle>
  </a>
);

const TwitterShareStyle = styled.div`
  border-radius: 4px;
  background-color: #42a5f5;
  font-weight: bold;
  color: #fff;
  max-width: 120px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  width: 7rem;
  ${media.tablet`
    margin-right: 1rem;
  `};
`;

const TwitterShare = ({ url }) => (
  <a
    href={`https://www.twitter.com/intent/tweet/?&url=${url}&text=CIAYO%20Comics%20REWARDS%20%7C%20Game%20Berhadiah%20Merchandise%20Seru`}
    target="popup"
  >
    <TwitterShareStyle>Twitter</TwitterShareStyle>
  </a>
);
class Shipping extends Component {
  state = {
    submitSuccess: false,
    showNotEnough: false,
    showSoldOut: false,
    showNotToday: false,
    formLoading: false,
    fname: '',
    faddress: '',
    fphone: '',
    fnotes: '',
    shareUrl: `${TRIVIA_URL}/redeem/${this.props.itemName}`,
    active: '',
  };

  static async getInitialProps(ctx) {
    const { res, query } = ctx;
    const { token = null } = parseCookies(ctx);
    if (token === null) {
      if (res) {
        res.redirect('/login');
      } else {
        Router.push('/login');
      }
    }
    const { data = null } = await getRewardDetail(query.id);
    if (data === null) {
      if (res) {
        res.redirect('/redeem');
      } else {
        Router.push('/redeem');
      }
    }
    return { rewardData: data, itemName: query.id };
  }

  // componentDidMount() {
  //   const {
  //     router,
  //     router: { query: id },
  //   } = this.props;
  //   if (!isMobile) {
  //     router.push(`/redeem/${id}`);
  //   }
  // }

  handleInputFocus = e => {
    if (
      e.target.name === 'fphone' &&
      e.target.value !== '' &&
      !/^[0-9+\b]+$/.test(e.target.value)
    ) {
      console.log('Phone Wrong');
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  // this function is not used, use handleSubmit() instead
  onSubmit = e => {
    e.preventDefault();

    const fname = this.fname.value;
    const faddress = this.faddress.value;
    const fphone = this.fphone.value;
    const fnotes = this.fnotes.value;

    const body = {
      reward: this.props.rewardData.response.id,
      recipient_name: fname,
      recipient_address: faddress,
      recipient_phone: fphone,
      note: fnotes,
    };

    // console.log(body);

    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      },
    };

    Axios.post(`${REWARDS_API_URL}reward/redeem`, body, config)
      .then(res => {
        this.setState({
          submitSuccess: true,
        });
        this.context.reduceScrolls(res.data.response.reward.price);
      })
      .catch(err => {
        console.log(err);
        this.handleOpenSoldOutModal();
      })
      .finally(() => {
        // console.log('finally');
      });
  };

  handleOpenNotEnoughModal = () => {
    this.setState({
      showNotEnough: true,
    });
  };

  handleCloseNotEnoughModal = () => {
    this.setState({
      showNotEnough: false,
    });
  };

  handleOpenSoldOutModal = () => {
    this.setState({
      showSoldOut: true,
    });
  };

  handleCloseSoldOutModal = () => {
    this.setState({
      showSoldOut: false,
    });
  };

  handleOpenNotTodayModal = () => {
    this.setState({
      showNotToday: true,
    });
  };

  handleCloseNotTodayModal = () => {
    this.setState({
      showNotToday: false,
    });
  };

  handleSelection = e => {
    e.preventDefault();

    this.setState({
      showNotEnough: true,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      formLoading: true,
    });
    const body = {
      reward: this.props.rewardData.response.id,
      recipient_name: this.state.fname,
      recipient_address: this.state.faddress,
      recipient_phone: this.state.fphone,
      note: this.state.fnotes,
    };

    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.context.userToken}`,
      },
    };

    Axios.post(`${REWARDS_API_URL}reward/redeem`, body, config)
      .then(res => {
        this.setState({
          fname: '',
          faddress: '',
          fphone: '',
          fnotes: '',
          submitSuccess: true,
        });
        this.context.reduceScrolls(res.data.response.reward.price);
      })
      .catch(err => {
        console.log(err);
        if (!this.props.rewardData.response.is_today) {
          return this.handleOpenNotTodayModal();
        }
        if (this.props.rewardData.response.quantity === 0) {
          return this.handleOpenSoldOutModal();
        }
        if (this.context.user.balance < this.props.rewardData.response.price) {
          return this.handleOpenNotEnoughModal();
        }
        this.handleOpenSoldOutModal();
      })
      .finally(() => {
        this.setState({
          formLoading: false,
        });
      });
  };

  render() {
    return (
      <UserConsumer>
        {context => {
          const { thumbnail, name, price } = this.props.rewardData.response;
          const {
            router: {
              query: { id },
            },
          } = this.props;

          const email = context.user ? context.user.email : '';

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

          return (
            <>
              <Wrapper>
                <div className="breadcrumbs shipping">
                  <ul>
                    <li>
                      <Link to="/">
                        <a className="breadcrumbs-home" title="Go To Home">
                          Beranda
                        </a>
                      </Link>
                    </li>
                    <li className="item-page">
                      <Link to={`/redeem/${id}`}>
                        <a
                          className="breadcrumbs-home"
                          title="Go To Redeem Item"
                        >
                          Deskripsi Barang
                        </a>
                      </Link>
                    </li>
                    <li className="current-page">Pengiriman</li>
                  </ul>
                </div>

                <div className="cell reward-body">
                  <div className="tracking-info">
                    <p>
                      Resi akan dikirim ke:
                      <br />
                      <span className="user-email">{email}</span>
                    </p>
                  </div>

                  {this.state.submitSuccess && (
                    <div className="submit-info">
                      <p>
                        Yes! Permintaan kamu sudah diproses. Setelah periode
                        verifikasi (20-23 Desember 2019), hadiah akan dikirimkan
                        ke alamat yang terdaftar. Kami akan mengirimkan email
                        berisi resi jika hadiah kamu disetujui.
                      </p>
                    </div>
                  )}

                  {!this.state.submitSuccess && <h5>Anda Memilih</h5>}
                  <div className="item-image-container">
                    <img src={thumbnail} alt="CHOOSEN ITEM" />
                    <div className="cell auto">
                      <div className="reward-item-info">
                        <h4>{name}</h4>
                        <h6
                          style={{
                            color: themeColor.backgroundColor,
                          }}
                        >
                          {parseThousands(price)} scrolls
                        </h6>
                      </div>
                    </div>
                  </div>

                  {!this.state.submitSuccess ? (
                    <div className="shipping-address form-container">
                      <h5>Informasi Pengiriman</h5>
                      <form
                        onSubmit={e => this.handleSubmit(e)}
                        className={this.state.formLoading ? '' : ''}
                      >
                        <div className="field">
                          <input
                            onFocus={$event => {
                              this.setState({
                                active: $event.target.name,
                              });
                            }}
                            onBlur={() => {
                              this.setState({ active: '' });
                            }}
                            style={
                              this.state.fname || this.state.active === 'fname'
                                ? { borderColor: themeColor.backgroundColor }
                                : {}
                            }
                            type="text"
                            id="name"
                            name="fname"
                            maxLength="50"
                            value={this.state.fname}
                            className={
                              this.state.fname !== '' ? 'filled' : 'empty'
                            }
                            required
                            onChange={e => this.handleInputFocus(e)}
                          />
                          <label htmlFor="name">Nama Penerima*</label>
                        </div>
                        <div className="field">
                          <input
                            onFocus={$event => {
                              this.setState({
                                active: $event.target.name,
                              });
                            }}
                            onBlur={() => {
                              this.setState({ active: '' });
                            }}
                            style={
                              this.state.faddress ||
                                this.state.active === 'faddress'
                                ? { borderColor: themeColor.backgroundColor }
                                : {}
                            }
                            id="address"
                            name="faddress"
                            maxLength="300"
                            value={this.state.faddress}
                            className={
                              this.state.faddress !== '' ? 'filled' : 'empty'
                            }
                            required
                            onChange={e => this.handleInputFocus(e)}
                            type="text"
                          />
                          <label htmlFor="address">Alamat*</label>
                        </div>
                        <div className="field">
                          <input
                            onFocus={$event => {
                              this.setState({
                                active: $event.target.name,
                              });
                            }}
                            onBlur={() => {
                              this.setState({ active: '' });
                            }}
                            style={
                              this.state.faddress ||
                                this.state.active === 'fphone'
                                ? { borderColor: themeColor.backgroundColor }
                                : {}
                            }
                            type="text"
                            id="phone"
                            name="fphone"
                            maxLength="20"
                            value={this.state.fphone}
                            className={
                              this.state.fphone !== '' ? 'filled' : 'empty'
                            }
                            required
                            onChange={e => this.handleInputFocus(e)}
                          />
                          <label htmlFor="phone">Nomor Telepon Aktif*</label>
                        </div>

                        <div className="field">
                          <input
                            onFocus={$event => {
                              this.setState({
                                active: $event.target.name,
                              });
                            }}
                            onBlur={() => {
                              this.setState({ active: '' });
                            }}
                            style={
                              this.state.faddress ||
                                this.state.active === 'fnotes'
                                ? { borderColor: themeColor.backgroundColor }
                                : {}
                            }
                            type="text"
                            id="notes"
                            name="fnotes"
                            value={this.state.fnotes}
                            maxLength="300"
                            className={
                              this.state.fnotes !== '' ? 'filled' : 'empty'
                            }
                            onChange={e => this.handleInputFocus(e)}
                          />
                          <label htmlFor="notes">
                            Catatan (Ukuran/Warna/dll)
                          </label>
                        </div>
                        <div className="field field-buttons">
                          {this.state.formLoading ? (
                            <button
                              type="submit"
                              className="button is-loading disabled"
                              style={this.props.themeColor}
                            >
                              <span className="ci ci-loader ci-spin" />
                            </button>
                          ) : (
                              <button
                                type="submit"
                                className="button"
                                style={themeColor}
                              >
                                Kirim
                              </button>
                            )}
                        </div>
                      </form>
                    </div>
                  ) : (
                      <div className="redeem-success">
                        <div className="simple-share">
                          <h6>Beritahu temanmu kalau kamu dapat merch gratis:</h6>
                          <div className="grid-share">
                            <FacebookShare url={this.state.shareUrl} />
                            <TwitterShare url={this.state.shareUrl} />
                          </div>
                          {/* <SimpleShareButtons
                          whitelist={['Facebook', 'Twitter']}
                          size="48px"
                          url={this.state.shareUrl}
                        /> */}
                        </div>
                        <div className="redeem-success-button">
                          <Link
                            to="/"
                            className="button btn-link"
                            style={themeColor}
                          >
                            <a className="a-button">Kembali ke Beranda</a>
                          </Link>
                        </div>
                      </div>
                    )}
                </div>
              </Wrapper>

              <Modal
                isOpen={this.state.showNotToday}
                contentLabel="Item is not available yet"
                onRequestClose={this.handleCloseNotTodayModal}
                className="reveal small special"
                ariaHideApp={false}
                overlayClassName="overlay"
              >
                <ModalStyle>
                  <div className="reveal-title">
                    <div className="reveal-image">
                      <img
                        src="/static/assets/images/oops-owl.png"
                        alt="Not Available"
                      />
                    </div>
                    <h4>Hadiah ini belum bisa diambil.</h4>
                  </div>
                  <div className="hide-mobile mobile-style">
                    <h4>Hadiah ini belum bisa diambil.</h4>
                  </div>
                  <div className="reveal-content text-center">
                    <p>
                      Belum waktunya untuk ambil hadiah ini ya
                      <br />
                      Yuk cek hadiah yang lain
                    </p>
                    <div
                      className="button small secondary hollow"
                      onClick={this.handleCloseNotTodayModal}
                      onKeyPress={this.handleCloseNotTodayModal}
                      role="button"
                      tabIndex={0}
                    >
                      Ok
                    </div>
                  </div>

                  <button
                    className="close-reveal modal-close ci"
                    onClick={this.handleCloseNotTodayModal}
                  >
                    &times;
                  </button>
                </ModalStyle>
              </Modal>

              <Modal
                isOpen={this.state.showNotEnough}
                contentLabel="Not Enough Scrolls"
                onRequestClose={this.handleCloseNotEnoughModal}
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
                      onClick={this.handleCloseNotEnoughModal}
                      onKeyPress={this.handleCloseNotEnoughModal}
                      role="button"
                      tabIndex={0}
                    >
                      Oke
                    </div>
                  </div>

                  <button
                    className="close-reveal modal-close ci"
                    onClick={this.handleCloseNotEnoughModal}
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
                <div className="reveal-title">
                  <div className="reveal-image">
                    <img
                      src="/static/assets/images/oops-owl.png"
                      alt="Out of Stock"
                    />
                  </div>
                  <h4>Stok Sudah Habis</h4>
                </div>
                <div className="reveal-content text-center">
                  <p>
                    Stok hadiah yang hendak diambil sudah habis. Coba balik
                    besok atau lihat-lihat hadiah yang lain.
                  </p>
                  <div
                    className="button small secondary hollow"
                    onClick={this.handleCloseSoldOutModal}
                    onKeyPress={this.handleCloseSoldOutModal}
                    role="button"
                    tabIndex={0}
                  >
                    Oke
                  </div>
                </div>

                <button
                  className="close-reveal modal-close ci"
                  onClick={this.handleCloseSoldOutModal}
                >
                  &times;
                </button>
              </Modal>
            </>
          );
        }}
      </UserConsumer>
    );
  }
}

const WrappedShipping = withRouter(Shipping);

Shipping.contextType = UserContext;

export default WrappedShipping;
