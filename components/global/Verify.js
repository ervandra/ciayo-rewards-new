/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/sort-comp */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { UserContext } from './UserContext';
import { REWARDS_API_URL } from '../../constants';
import { checkEmail } from '../../lib/utils';

const VerifyStyle = styled.div`
  margin-top: 1rem;
  h3 {
    color: #222;
    font-size: 1rem;
  }
`;

const buttonBlock = {
  width: '100%',
  height: '2.5rem',
};

class Verify extends Component {
  state = {
    submitSuccess: false,
    formLoading: false,
    formError: '',
    digits: ['', '', '', '', ''],
    newEmail: '',
    resend: true,
    resendTime: 0,
    showButton: false,
    changeEmail: false,
    changeEmailError: '',
  };

  inputField = [];

  handlePaste = e => {
    e.preventDefault();
    const clipboardData =
      e.clipboardData || e.originalEvent.clipboardData || window.clipboardData;
    const getPasteData = clipboardData.getData('text');
    const pasteData = getPasteData.split('');
    const newDigits = ['', '', '', '', ''];
    let lastIndex = 0;
    pasteData.map((key, index) => {
      if (index < this.state.digits.length) {
        newDigits[index] = key;
        lastIndex = index;
      }
      return '';
    });
    this.setState({
      digits: newDigits,
    });
    this.inputField[lastIndex].focus();
  };

  handleInputFocus = (e, index) => {
    const newDigits = [...this.state.digits];
    newDigits[e.target.name] = e.target.value;
    this.setState({
      digits: newDigits,
    });
    if (
      index < this.inputField.length - 1 &&
      this.inputField[index].value !== ''
    ) {
      this.inputField[index + 1].focus();
    }
  };

  handleMoveCursor = (e, index) => {
    if (e.keyCode === 37) {
      if (index > 0) {
        e.preventDefault();
        this.inputField[index - 1].focus();
      }
    } else if (event.keyCode === 39) {
      if (index < this.inputField.length - 1) {
        e.preventDefault();
        this.inputField[index + 1].focus();
      }
    } else if (event.keyCode === 8) {
      if (index > 0 && this.inputField[index].value === '') {
        this.inputField[index - 1].focus();
      }
    }
  };

  handleSendVerification = () => {
    const body = {
      version_code: '1.0',
    };
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.context.userToken}`,
      },
    };
    Axios.post(`${REWARDS_API_URL}user/verify-email`, body, config)
      .then(res => {
        this.setState({
          verificationCode: '',
          submitSuccess: true,
        });
      })
      .catch(err => {
        console.log(err.response.data.state.message);
      })
      .finally(() => {
        this.setState({
          formLoading: false,
        });
      });
  };

  handleResendCode = () => {
    this.handleSendVerification();
    if (this.state.resend) {
      this.setState({
        resendTime: 30,
        resend: false,
      });
      const timer = setInterval(() => {
        this.setState({
          resendTime: this.state.resendTime - 1,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        this.setState({
          resend: true,
        });
      }, 30000);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.formError) {
      this.setState({
        formError: '',
      });
    }
    let error = false;
    this.state.digits.map(digit => {
      if (digit === '') {
        error = true;
      }
      return '';
    });
    if (error) {
      this.setState({
        formError: 'Sepertinya kodenya salah. Coba cek lagi.',
      });
    } else {
      this.setState({
        formLoading: true,
      });
      const body = {
        code: this.state.digits.join(''),
      };
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.context.userToken}`,
        },
      };
      Axios.put(`${REWARDS_API_URL}user/verify-email`, body, config)
        .then(res => {
          if (res.data.state.code >= 300) {
            this.setState({
              formError: 'Sepertinya kodenya salah. Coba cek lagi.',
            });
          } else {
            this.setState({
              verificationCode: '',
              submitSuccess: true,
            });
            location.reload();
          }
        })
        .catch(err => {
          console.log(err.response.data.state.message);
        })
        .finally(() => {
          this.setState({
            formLoading: false,
          });
        });
    }
  };

  handleChangeEmail = e => {
    e.preventDefault();
    this.setState({
      changeEmailError: '',
    });
    if (!checkEmail(this.state.newEmail)) {
      this.setState({
        changeEmailError: 'Format Email Salah',
      });
    } else {
      const body = {
        email: this.state.newEmail,
      };
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.context.userToken}`,
        },
      };
      Axios.put(`${REWARDS_API_URL}user`, body, config)
        .then(res => {
          if (res.data.state.code >= 300) {
            this.state({
              changeEmailError: 'Sepertinya kodenya salah. Coba cek lagi.',
            });
          } else {
            this.setState({
              newEmail: '',
            });
            this.handleSendVerification().then(() => {
              this.setState({
                changeEmail: false,
              });
            });
          }
        })
        .catch(err => {
          this.setState({
            changeEmailError: 'Sepertinya kodenya salah. Coba cek lagi.',
          });
        })
        .finally(() => {
          this.setState({
            formLoading: false,
          });
        });
    }
  };

  componentDidMount() {
    if (this.context.user && this.context.user.is_confirmed === false) {
      this.handleSendVerification();
    }
  }

  render() {
    const changeEmailPage = (
      <div className="change-now">
        <h3>Ganti Alamat Email</h3>
        <p>
          Masukkan alamat email yang baru di bawah. Ini akan mengubah alamat
          email akunmu di CIAYO Comics. Pastikan untuk menggunakan email yang
          baru saat masuk ke CIAYO Comics nanti.
        </p>
        <form action="#">
          <div className="form-container">
            <div
              className={`field ${
                this.state.changeEmailError ? 'field-error' : ''
                }`}
            >
              <input
                className={this.state.newEmail ? 'filled' : 'empty'}
                type="text"
                id="change-email"
                name="change-email"
                value={this.state.newEmail}
                onChange={e => {
                  this.setState({ newEmail: e.target.value });
                }}
              />
              <label htmlFor="change-email">New Email Address</label>
              {this.state.changeEmailError ? (
                <div className="error-text">{this.state.changeEmailError}</div>
              ) : (
                  ''
                )}
            </div>
            <div className="field field-buttons">
              <div className="flex-container align-right">
                <button
                  className="button order-1"
                  type="submit"
                  onClick={e => this.handleChangeEmail(e)}
                >
                  Perbarui
                </button>

                <button
                  className="button hollow order-2"
                  type="reset"
                  onClick={() => this.setState({ changeEmail: false })}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );

    const verifyPage = (
      <div className="verify-now">
        <h3>Verifikasi Alamat Email Kamu</h3>
        <p>
          Untuk melanjutkan, cek inbox email kamu di{' '}
          <strong>{this.context.user.email}</strong>. Masukkan kode berupa 5
          digit angka yang barusan kami kirim untuk memverifikasi akunmu.
        </p>

        <form action="#">
          <div className="form-container">
            <div
              className={`verify-codes ${
                this.state.formError ? 'verify-error' : ''
                }`}
            >
              {this.state.digits.map((digit, index) => (
                <div className="field" key={index}>
                  <input
                    type="text"
                    pattern="\d"
                    id="digit1"
                    name={index}
                    ref={input => {
                      this.inputField[index] = input;
                    }}
                    maxLength="1"
                    value={this.state.digits[index]}
                    className={digit !== '' ? 'filled' : 'empty'}
                    required
                    onChange={e => this.handleInputFocus(e, index)}
                    onKeyDown={e => this.handleMoveCursor(e, index)}
                    onPaste={e => this.handlePaste(e)}
                  />
                </div>
              ))}
              {this.state.formError ? (
                <div className="error-text">{this.state.formError}</div>
              ) : (
                  ''
                )}
            </div>
            <div className="field fields-buttons">
              <button
                type="submit"
                className="button"
                style={buttonBlock}
                onClick={e => this.handleSubmit(e)}
              >
                Lanjut
              </button>
            </div>

            <div className="text-center">
              {this.state.resend ? (
                <p className="resend-code">
                  <a
                    className="button"
                    href="#Resend"
                    onClick={() => this.handleResendCode()}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#999',
                      textDecoration: 'underline',
                    }}
                  >
                    Kirim Ulang
                  </a>
                </p>
              ) : (
                  <p className="resend-code waiting">
                    <a
                      href="#Resend"
                      className="button"
                      style={{
                        backgroundColor: 'transparent',
                        color: '#999',
                        textDecoration: 'underline',
                      }}
                    >
                      Kirim Ulang (
                    <span className="waiting-resend">
                        {this.state.resendTime}
                      </span>
                    )
                  </a>
                  </p>
                )}
              <p className="change-your-email" style={{ marginTop: '7rem' }}>
                Bukan emailmu? Ganti di{' '}
                <strong onClick={() => this.setState({ changeEmail: true })}>
                  sini
                </strong>
              </p>
            </div>
          </div>
        </form>
      </div>
    );

    return (
      <VerifyStyle>
        <div className="verify-fragment">
          <div className="grid-container">
            <div className="grid-x grid-margin-x">
              <div className="cell">
                {this.context.user ? (
                  this.context.user.is_confirmed ? (
                    <h4>
                      Akun kamu telah terverifikasi, ayok serbu hadiahnya!!!
                    </h4>
                  ) : this.state.changeEmail ? (
                    changeEmailPage
                  ) : (
                        verifyPage
                      )
                ) : (
                    <React.Fragment />
                  )}
              </div>
            </div>
          </div>
        </div>
      </VerifyStyle>
    );
  }
}

Verify.contextType = UserContext;

export default Verify;
