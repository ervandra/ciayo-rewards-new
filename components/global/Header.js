import NProgress from 'nprogress';
import styled from 'styled-components';
import MainMenu from '../menus/MainMenu';
import { Router } from '../../routes';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
  window.scrollTo(0, 0);
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const MyHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 30;
  position: relative;
  background: #f0f0f0;
  box-shadow: 0 0 8px ${props => props.theme.shadow};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  @supports ((position: -webkit-sticky) or (position: sticky)) {
    position: -webkit-sticky;
    position: sticky;
  }
`;

const Header = () => (
  <MyHeader>
    <MainMenu />
  </MyHeader>
);

export default Header;
