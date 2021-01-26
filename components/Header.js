import PropTypes from 'prop-types';
import Link from 'next/link';
import getConfig from 'next/config';
import { color_primary } from '../constants/CustomTheme';
import styled from 'styled-components';
import { Container } from './Container';
import NavigationBar from './NavigationBar';

const {
  publicRuntimeConfig: { staticFolder },
  publicRuntimeConfig,
} = getConfig();

const Header = ({ title, listMenu, isAuthenticated, route, userLogout }) => {
  return (
    <HeaderContainer>
      <HeaderBar id="header_bar" className="container">
        <Link href="/">
          <div className="logo-container">
            <img className="logo" alt="logo" src={`${staticFolder}/logo.png`} />
            <span className="sys-name">{title}</span>
          </div>
        </Link>
        <div className="menu-container">
          <NavigationBar
            listMenu={listMenu}
            isAuthenticated={isAuthenticated}
            route={route}
            logout={userLogout}
          />
        </div>
      </HeaderBar>
    </HeaderContainer>
  );
};
export default Header;

Header.propTypes = {
  title: PropTypes.string,
  listMenu: PropTypes.array,
  isAuthenticated: PropTypes.any,
  route: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: publicRuntimeConfig.title || '',
  listMenu: [],
  isAuthenticated: false,
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
