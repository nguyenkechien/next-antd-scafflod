import PropTypes from 'prop-types';
import styled from 'styled-components';

const Slide = ({ title }) => {
  console.log('render');
  return (
    <div>
      <ContentStyle>{title}</ContentStyle>
    </div>
  );
};
export default Slide;

Slide.propTypes = {
  title: PropTypes.string.isRequired,
};

const ContentStyle = styled.div`
  height: 160px;
  width: 100%;
  color: #fff;
  line-height: 160px;
  text-align: center;
  background: #364d79;
`;
