import styled from 'styled-components';
import { transitionTime } from '../constants/CustomTheme';
import PropTypes from 'prop-types';

const HambergerIcon = props => (
  <StyledHambergerIcon {...props}>
    {[1, 2, 3, 4].map(k => (
      <span key={k} className={`line line-${k}`}></span>
    ))}
  </StyledHambergerIcon>
);

export default HambergerIcon;

HambergerIcon.propTypes = { collapsed: PropTypes.bool };

HambergerIcon.defaultProps = { collapsed: true };

const StyledHambergerIcon = styled.button`
  background-color: transparent;
  border-radius: 0;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  width: 30px;
  height: 25px;
  position: relative;
  .line {
    height: 2px;
    background-color: #fff;
    display: block;
    position: absolute;
    right: 0;
    transition: right ${transitionTime} ease-in-out;
    transform: translateX(0);
    width: 100%;
    &-1 {
      top: 0;
      width: 50%;
      right: ${props => (!props.collapsed ? '50%' : '0')};
      transition-delay: 0.1s;
    }
    &-2 {
      top: 30%;
      width: 80%;
      right: ${props => (!props.collapsed ? '20%' : '0')};
      transition-delay: 0.2s;
    }
    &-3 {
      top: 60%;
      width: 60%;
      right: ${props => (!props.collapsed ? '40%' : '0')};
      transition-delay: 0.3s;
    }
    &-4 {
      top: 90%;
    }
  }
`;
