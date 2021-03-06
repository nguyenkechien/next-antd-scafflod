import styled from 'styled-components';
import PropTypes from 'prop-types';
import { height_menu } from '../constants/CustomTheme';

export const Container = props => (
  <StyledContainer {...props}>{props.children}</StyledContainer>
);

export const ContentContainer = props => (
  <StyledContentContainer {...props}>{props.children}</StyledContentContainer>
);

export const CenterContainer = props => (
  <StyledCenterContainer>{props.children}</StyledCenterContainer>
);
export const CenterPage = props => (
  <StyledCenterPage>{props.children}</StyledCenterPage>
);

export const StyledContainer = styled.div`
  width: 100%;
  height: auto;
  max-width: 1280px;
  margin: 0 auto;
  @media screen and (max-width: 992px) {
    max-width: 100%;
  }
`;

export const StyledContentContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh - ${height_menu} - 150px);
  margin: ${height_menu} 0 20px;
  padding: 10px 20px;
  background-color: #fff;
  overflow-x: hidden;
`;

export const StyledCenterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledCenterPage = styled(StyledCenterContainer)`
  min-height: calc(100vh - ${height_menu} - 150px);
  justify-content: center;
`;

Container.propTypes = { children: PropTypes.any.isRequired };
ContentContainer.propTypes = { children: PropTypes.any.isRequired };
CenterContainer.propTypes = { children: PropTypes.any.isRequired };
CenterPage.propTypes = { children: PropTypes.any.isRequired };
