import PropTypes from 'prop-types';
import Link from 'next/link';
import getConfig from 'next/config';
import { color_primary } from '../constants/CustomTheme';
import { useState } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
const {
  publicRuntimeConfig: { staticFolder },
  publicRuntimeConfig,
} = getConfig();

const { Item } = Menu;

const Header = ({ title, nav, userLogout, ...props }) => {
  const [current, setCurrentItem] = useState(props.route);

  const handleClick = e => {
    console.log(e);
    setCurrentItem(e.key);
  };

  const ListMenu = () => {
    return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        {nav.map(item => (
          <Item key={item.href.toLowerCase()} hidden={item.hidden}>
            <Link href={item.href}>
              <a>{item.title}</a>
            </Link>
          </Item>
        ))}
        <Item key="logout" onClick={userLogout} hidden={!props.isAuthenticated}>
          Logout
        </Item>
        {/* <Item key="mail">Navigation One</Item>
        <Item key="app">Navigation Two</Item>
        <SubMenu key="SubMenu" title="Navigation Three - Submenu">
          <ItemGroup title="Item 1">
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
          </ItemGroup>
          <ItemGroup title="Item 2">
            <Item key="setting:3">Option 3</Item>
            <Item key="setting:4">Option 4</Item>
          </ItemGroup>
        </SubMenu>
        <Item key="alipay">
          <Link href="/">
            <a>Navigation Four - Link</a>
          </Link>
        </Item> */}
      </Menu>
    );
  };

  return (
    <NavigationBar id="header_bar" className="container">
      <Link href="/">
        <div className="logo-container">
          <img className="logo" alt="logo" src={`${staticFolder}/logo.png`} />
          <span className="sys-name">{title}</span>
        </div>
      </Link>
      <div className="menu-container">
        <ListMenu />
      </div>
    </NavigationBar>
  );
};
export default Header;

Header.propTypes = {
  title: PropTypes.string,
  nav: PropTypes.array,
  isAuthenticated: PropTypes.any,
  route: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: publicRuntimeConfig.title || '',
  nav: [],
  isAuthenticated: false,
};

const NavigationBar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: ${color_primary};
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

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
  .menu-container {
    .ant-menu {
      background-color: ${color_primary};
      border-bottom: 0;
      &-item,
      &-submenu-title {
        color: #fff !important;
        border-bottom: 0 !important;
        &:hover {
          color: rgba(0, 0, 0, 0.5) !important;
        }
        > a {
          color: inherit !important;
        }
        &-selected {
          color: #000 !important;
          border-bottom: 2px solid #000 !important;
        }
      }
    }
  }
`;
