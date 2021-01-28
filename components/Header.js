import PropTypes from 'prop-types';
import Link from 'next/link';
import getConfig from 'next/config';
import { color_primary } from '../constants/CustomTheme';
import styled from 'styled-components';
import { Container } from './Container';
import NavigationBar from '../containers/NavigationBar';

const { publicRuntimeConfig } = getConfig();

const Header = ({ logo, title, route }) => {
  return (
    <HeaderContainer>
      <HeaderBar id="header_bar" className="container">
        <Link href="/">
          <div className="logo-container">
            <img className="logo" alt={logo.alt} src={logo.src} />
            <span className="sys-name">{title}</span>
          </div>
        </Link>
        <div className="menu-container">
          <NavigationBar route={route} />
        </div>
      </HeaderBar>
    </HeaderContainer>
  );
};
export default Header;

Header.propTypes = {
  logo: PropTypes.object,
  title: PropTypes.string,
  route: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: publicRuntimeConfig.title || '',
  logo: {
    src: '',
    alt: '',
  },
};

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 999;
  background-color: ${color_primary};
  padding: 0 20px;
`;
const HeaderBar = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  h1 {
    text-align: center;
    line-height: 60px;
    font-size: 1.6rem;
    font-weight: 500;
    color: #fff;
  }
  .logo-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    height: 100%;
    .sys-name {
      display: inline-block;
      margin-left: 10px;
      font-size: 20px;
      color: #fff;
      font-weight: 600;
    }
  }
  .logo {
    width: 30px;
    height: 30px;
  }
`;
