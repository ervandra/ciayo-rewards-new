import React from 'react';
import styled from 'styled-components';

const PremiumBannerStyle = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: #fff;
  max-height: 600px;
  img {
    width: 100%;
  }
  p {
    text-align: center;
    padding-top: 50px;
  }
`;

const PremiumBanner = () => (
  <PremiumBannerStyle>
    <img
      src="https://cdn.ciayo.com/static/banner-redeem-rewards-desktop.jpg"
      className="hide-desktop"
      alt="desktop-banner"
    />
    <img
      src="https://cdn.ciayo.com/static/banner-redeem-rewards-mobile.jpg"
      className="hide-mobile"
      alt="mobile-banner"
    />
  </PremiumBannerStyle>
);

export default PremiumBanner;
