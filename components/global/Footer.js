import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: #f0f0f0;
  text-align: center;
  justify-content: center;
  display: block;
  border-top: 1px solid #ddd;
  .no-margin {
    margin-top: 0px;
    margin-bottom: 0px;
    opacity: 0.2;
  }
  .footer-logo {
    width: 20%;
    filter: grayscale(100%);
    opacity: 0.5;
  }
  & .copyright {
    font-size: 0.75rem;
    color: #999;
    line-height: 48px;
    height: 48px;
  }
  & .button-container {
    display: none;
    padding: 1rem;
    border-bottom: 1px solid #00000008;
  }
  & .footer-back-to-ciayo-comics {
    display: inline-block;
    margin: 0;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: bold;
  }

  @media (max-width: 1023px) {
    .button-container {
      display: block;
    }
  }
`;
const Footer = () => (
  <StyledFooter>
    <div className="button-container">
      <img
        className="footer-logo"
        src="/static/assets/images/logo-ciayo-comics.png"
        alt="CIAYO Comics Logo"
      />
    </div>
    <hr className="no-margin" />
    <div className="copyright">&copy; 2019. CIAYO Corp</div>
  </StyledFooter>
);

export default Footer;
