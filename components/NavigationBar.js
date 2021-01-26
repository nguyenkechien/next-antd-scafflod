/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NavigationBar = ({ listMenu, isAuthenticated, route, logout }) => {
  const [current, setCurrentItem] = useState(route);
  // const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  useEffect(() => setCurrentItem(router.asPath), [router.asPath]);
  return (
    <NavigationContainer>
      <NavigationGroup selectKey={current}>
        {listMenu.map(item =>
          !item.hidden ? (
            <NavigationItem
              attr={item.href.toLowerCase()}
              key={item.href.toLowerCase()}
            >
              <Link href={item.href}>
                <a>{item.title}</a>
              </Link>
            </NavigationItem>
          ) : null,
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
  logout: PropTypes.func.isRequired,
};

NavigationBar.defaultProps = {
  listMenu: [],
  isAuthenticated: false,
};

const NavigationContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const NavigationGroup = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .${props => props.selectKey} {
    color: #000 !important;
    &::after {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;
const NavigationItem = styled.div`
  margin: 0 auto;
  color: #000;
  position: relative;
  cursor: pointer;
  &::after {
    content: '';
    transition: all 0.2s;
    transform: translate(-50%, -50%) scale(0);
    width: calc(100% - 30px);
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 2px;
    background-color: #000;
  }
  > a {
    padding: 10px 15px;
    color: inherit !important;
    display: inline-block;
  }
  /* &.selected, */
  &:hover {
    color: #000 !important;
    &::after {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

// .ant-menu {
//   background-color: initial;
//   border-bottom: 0;
//   &-item,
//   &-submenu-title {
//     color: #fff !important;
//     border-bottom: 0 !important;
//     &:hover {
//       color: rgba(0, 0, 0, 0.5) !important;
//     }
//     > a {
//       color: inherit !important;
//     }
//
//   }
// }
