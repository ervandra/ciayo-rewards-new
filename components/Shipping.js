/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
// import { SimpleShareButtons } from 'react-simple-share';
import { UserContext } from './global/UserContext';
import { REWARDS_API_URL, TRIVIA_URL } from '../constants';
import { parseThousands, getDeepObject } from '../lib/utils';
import { Link } from '../routes';
import { media } from './global/base';

const Wrapper = styled.div`
  img {
    max-width: 80px;
    max-height: 80px;
  }

  h5 {
    font-size: 1rem;
    font-weight: bold;
    color: #222;
  }

  .item-image-container {
    margin-bottom: 1.25rem;
    display: flex;
    border: 1px solid #e6e7e8;
    border-radius: 8px;
    img {
      margin: 0.75rem 1rem;
    }
  }

  .user-email {
    font-weight: bold;
  }

  .reward-item-info {
    margin: 0.75rem 0;
    height: 100%;
    h4 {
      font-weight: lighter;
      color: #222;
      font-size: 0.9rem;
      margin: 0;
    }
    h6 {
      font-weight: bold;
      font-size: 0.9rem;
    }
  }

  .tracking-info {
    text-align: center;
    border-color: #e6e7e8;
    background-color: #e6e7e8;
    color: #222;
    border-radius: 12px;
    font-size: 1rem;
  }

  .choosen-item {
    margin-bottom: 2rem;
    color: #000;
  }
  .choosen-item h5 {
    font-size: 0.875rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
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

  .grid-share {
    display: flex;
    justify-content: space-evenly;
    ${media.tablet`
     justify-content: center;
   `};
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
    formLoading: false,
    fname: '',
    faddress: '',
    fphone: '',
    fnotes: '',
    id: '',
    itemImg: '',
    title: '',
    point: '',
    shareUrl: `${TRIVIA_URL}`,
    active: '',
  };

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

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      formLoading: true,
    });
    const body = {
      reward: this.state.id,
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
        this.props.handleSoldOut();
      })
      .finally(() => {
        this.setState({
          formLoading: false,
        });
      });
  };

  componentWillMount() {
    this.setState({
      id: this.props.item.id,
      itemImg: this.props.item.thumbnail,
      title: this.props.item.name,
      point: this.props.item.price,
    });

    if (typeof window !== 'undefined') {
      this.setState({
        shareUrl: `${window.location.origin}/redeem/${this.props.item.alias}`,
      });
    }
  }

  render() {
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
      <Wrapper>
        <div className="shipping-fragment">
          <div className="grid-container">
            <div className="grid-x grid-margin-x">
              <div className="cell">
                <div className="tracking-info">
                  <p>
                    Resi akan dikirim ke:
                    <br />
                    <strong style={{ color: '#222' }}>
                      {this.context.user.email}
                    </strong>
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

                {/* <div className="choosen-item">
                  {!this.state.submitSuccess && <h5>You choose</h5>}
                  <div className="grid-x align-stretch">
                    <div className="cell shrink">
                      <img src={this.state.itemImg} alt="CHOOSEN ITEM" />
                    </div>
                    <div className="cell auto">
                      <div className="choosen-item-info">
                        <h4>{this.state.title}</h4>
                        <h6 style={{ color: themeColor.backgroundColor }}>
                          {parseThousands(this.state.point)} scrolls
                        </h6>
                      </div>
                    </div>
                  </div>
                </div> */}

                {!this.state.submitSuccess && <h5>Anda Memilih</h5>}
                <div className="item-image-container">
                  <img src={this.state.itemImg} alt="CHOOSEN ITEM" />
                  <div className="cell auto">
                    <div className="reward-item-info">
                      <h4>{this.state.title}</h4>
                      <h6 style={{ color: themeColor.backgroundColor }}>
                        {parseThousands(this.state.point)} scrolls
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
                            this.setState({ active: $event.target.name });
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
                            this.setState({ active: $event.target.name });
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
                            this.setState({ active: $event.target.name });
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
                            this.setState({ active: $event.target.name });
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
                        <h6>Beritahu temanmu kalau kamu dapat mech gratis:</h6>
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
                        <Link to="/">
                          <button className="a-button">Kembali ke Beranda</button>
                        </Link>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

Shipping.contextType = UserContext;

export default Shipping;
