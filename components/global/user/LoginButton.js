/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { parseCookies } from 'nookies';
import { getDeepObject } from '../../../lib/utils';
import { UserContext, UserConsumer } from '../UserContext';
import { LOGIN_URL, TRIVIA_URL } from '../../../constants';

const UserLogin = styled.div`
  float: right;

  a {
    font-weight: bold;
    color: #000;
    font-size: 0.75rem;
    text-transform: uppercase;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    height: 56px;
    line-height: 56px;
    white-space: nowrap;
    justify-content: flex-end;
  }

  .ci {
    margin-left: 0.5rem;
    font-size: 1.25rem;
  }

  /* .text {
    display: none;
    padding-right: 0.25rem;
    color: $black;
    font-weight: normal;
  }
  */
  .text-secondary {
    display: none;
  }

  @media screen and (min-width: 24rem) {
    .text-secondary {
      display: inline;
    }

    a {
      font-size: 0.875rem;
    }
  }
`;

// const handleCheckUserLogin = originalUrl => {
//   const { token = null } = parseCookies();
//   if (token) {
//     // window.location.reload();
//     context.updateUserProfile();
//   } else {
//     window.location.assign(`https://account.ciayo.com/?back=${originalUrl}`);
//   }
// };

const LoginButton = () => {
  const [originalUrl, setURL] = useState('https://rewards.ciayo.com');
  useEffect(() => {
    setURL(window.location.href);
  }, []);
  const [hover, setHover] = useState(false);
  const context = useContext(UserContext);
  const handleCheckUserLogin = originalUrl => {
    const { token = null } = parseCookies();
    if (token) {
      return window.location.reload();
      // return context.updateUserProfile();
    }
    return window.location.assign(
      `https://account.ciayo.com/?back=${originalUrl}`
    );
  };
  const themeColor =
    {
      color: getDeepObject(
        ['response', 'season', 'font_color'],
        context.config
      ),
      backgroundColor: getDeepObject(
        ['response', 'season', 'color'],
        context.config
      ),
    } || {};

  return (
    <UserLogin
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      <a // href={`https://account.ciayo.com/?back=${originalUrl}`}
        onClick={() => handleCheckUserLogin(originalUrl)}
        title="Login / Register"
        style={hover === true ? themeColor : {}}
      >
        <span className="text">
          Login
          <span className="text-secondary"> / Register</span>
        </span>
        <span className="ci ci-my-account" />
      </a>
    </UserLogin>
  );
};

// class LoginButton extends Component {
//   state = {
//     hover: false,
//   };

//   render() {
// const themeColor = {
//   color: getDeepObject(
//     ['response', 'season', 'font_color'],
//     this.context.config
//   ),
//   backgroundColor: getDeepObject(
//     ['response', 'season', 'color'],
//     this.context.config
//   ),
// };

//     return <UserLogin onMouseOver={() => {
//           this.setState({ hover: true });
//         }} onMouseOut={() => {
//           this.setState({ hover: false });
//         }}>
//         <a href={`https://account.ciayo.com/?back=${originalUrl}`} title="Login / Register" style={this.state.hover === true ? themeColor : {}}>
//           <span className="text">
//             Login
//             <span className="text-secondary"> / Register</span>
//           </span>
//           <span className="ci ci-my-account" />
//         </a>
//       </UserLogin>;
//   }
// }

// LoginButton.contextType = UserContext;

export default LoginButton;
