import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transitionTime } from '../constants/CustomTheme';
import HambergerIcon from './HambergerIcon';

const NavigationBar = ({
  listMenu,
  isAuthenticated,
  route,
  userLogout,
  collapsed,
  toogleCollapsed,
}) => {
  const [current, setCurrentItem] = useState(route);
  const router = useRouter();
  useEffect(() => setCurrentItem(router.asPath), [router.asPath]);

  return (
    <NavigationContainer>
      <HambergerIcon
        className="hide-md"
        collapsed={collapsed}
        onClick={toogleCollapsed}
      />
      <NavigationGroup data-mobile selectKey={current} collapsed={collapsed}>
        {listMenu.map(
          item =>
            !item.hidden && (
              <NavigationItem
                data-key={item.href.toLowerCase()}
                key={item.href.toLowerCase()}
              >
                <Link href={item.href}>
                  <a>{item.title}</a>
                </Link>
              </NavigationItem>
            ),
        )}
        {isAuthenticated && (
          <NavigationItem onClick={() => userLogout()}>Logout</NavigationItem>
        )}
      </NavigationGroup>
    </NavigationContainer>
  );
};

export default NavigationBar;

NavigationBar.propTypes = {
  listMenu: PropTypes.array,
  route: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.any,
  userLogout: PropTypes.func.isRequired,
  toogleCollapsed: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

NavigationBar.defaultProps = {
  listMenu: [],
  isAuthenticated: false,
};

const NavigationContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const NavigationGroup = styled.ul`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &[data-mobile] {
    @media screen and (max-width: 992px) {
      transition: right ${transitionTime};
      max-width: 100%;
      position: absolute;
      top: 60px;
      right: ${props => (!props.collapsed ? 0 : '-300px')};
      width: 30%;
      height: calc(100vh - 60px);
      flex-direction:column;
      justify-content: flex-start;
      background-color: #fff;
      box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
      &::after {
        content: '';
        position: fixed;
        width: ${props => (!props.collapsed ? '100%' : '0')};
        opacity: ${props => (!props.collapsed ? 1 : 0)};
        transition: opacity ${transitionTime};
        height: 100vh;
        top: 0;
        right: 0;
        background-color: rgb(0 0 0 / 12%);
        z-index: -1;
      }
      > li {
          width: 100%;
          margin-left: 0;
          a {
            display: inline-block;
            width: 100%;
          }
        }
      }
    @media screen and (max-width: 600px) {
      width: 50%;
    }
  }
  > li {
    &[data-key="${props => props.selectKey}"], &:hover {
      color: #000 !important;
      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
`;
const NavigationItem = styled.li`
  margin: 0 auto;
  color: #000;
  position: relative;
  cursor: pointer;
  padding: 10px 15px;
  list-style: none;
  &::after {
    content: '';
    transition: all ${transitionTime};
    transform: translate(-50%, -50%) scale(0);
    width: calc(100% - 30px);
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 1.5px;
    background-color: #000;
  }
  > a {
    color: inherit !important;
    display: inline-block;
  }
`;
