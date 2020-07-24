import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import base, { media } from './base';
import theme from './theme';

const Header = dynamic(() => import('./Header'), {
  loading: () => null,
});
const Meta = dynamic(() => import('./Meta'), {
  loading: () => null,
});

const Footer = dynamic(() => import('./Footer'), {
  loading: () => null,
});

const GlobalStyle = createGlobalStyle`
  ${base}
`;

const StyledPage = styled.div`
  background: ${props => props.theme.white};
  color: ${props => props.theme.body};
`;

const Container = styled.div`
  #quiz-landing {
    margin-bottom: 1rem;
  }

  & .ciayo-container {
    overflow: hidden;
    max-width: 61rem;
    margin: 0 auto;
    padding: 0 0;
    //min-height: calc(100vh - 180px);
  }
  & .ciayo-container .landing {
    padding: 0;
  }
  & h4 {
    font-size: 0.875rem;
    margin: 0 0 0.5rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }
  .info {
    padding: 0 1rem;
    ${media.desktop`
      padding: 0;
    `};
  }
  & .info div,
  .info p {
    color: #222;
    font-size: 0.875rem;
    line-height: 1.4;
  }
  & .info h4 {
    color: #222;
    font-size: 1rem;
  }
  & .info h3 {
    font-weight: bold;
  }
  /* & .info div span::after {
    content: 'Read More';
    font-weight: 700;
    color: #df6e22;
  } */
  & .info .ci.ci-chevron-down,
  .info .ci.ci-chevron-up {
    color: #df6e22;
    font-size: 1.3rem;
  }
  & .ciayo-container .break-season {
    padding: 50px;
    text-align: center;
    img {
      max-width: 200px;
    }
  }

  hr {
    max-width: 90%;
    ${media.desktop`
      max-width: 100%;
    `};
  }

  #seo-text {
    padding: 1.5rem 0;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    #seo-text {
      padding: 1.5rem 1rem;
      -webkit-box-shadow: 0 -1px 0 0 #eee inset;
      box-shadow: inset 0 -1px 0 0 #eee;
    }
  }
  #seo-text h1 {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    color: #999999;
    margin: 0;
  }
  @media (min-width: 1024px) {
    #seo-text h1 {
      font-size: 1.25rem;
    }
  }
  #seo-text h2 {
    font-size: 0.9375rem;
    font-weight: 400;
    color: #999;
    margin: 0 0 1rem;
  }
  @media (min-width: 1024px) {
    #seo-text h2 {
      font-size: 1rem;
    }
  }
  #seo-text p {
    font-size: 0.75rem;
    padding: 1rem;
    line-height: 1.4;
    border: 1px solid #999999;
    border-radius: 8px;
    color: #999999;
    margin: 0;
  }
  @media (min-width: 1024px) {
    #seo-text p {
      font-size: 0.875rem;
    }
  }
  .button {
    font-weight: 700;
    font-size: 0.9rem;
  }
`;

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <StyledPage>
            <Meta />
            <GlobalStyle />
            <Header />
            <Container id="content">{children}</Container>
            <Footer />
          </StyledPage>
        </ModalProvider>
      </ThemeProvider>
    );
  }
}

Page.propTypes = {
  children: PropTypes.element,
};

export default Page;
