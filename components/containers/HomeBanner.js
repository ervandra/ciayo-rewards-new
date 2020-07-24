import React, { Component } from 'react';
import styled from 'styled-components';
import { UserConsumer } from '../global/UserContext';

const HomeBannerStyle = styled.div`
  position: relative;
  margin: 1.5rem auto;
`;

class SEO extends Component {
  render() {
    return (
      <UserConsumer>
        {context => (
          <HomeBannerStyle>
            <img
              src="https://media.ciayo.com/banner/1530520398-cmt1440px-web.jpg"
              alt={context.user ? context.user.display_name : 'CMT'}
            />
          </HomeBannerStyle>
        )}
      </UserConsumer>
    );
  }
}

export default SEO;
