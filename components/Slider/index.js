import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import Slide from './Slide';

const Slider = ({ sliders }) => {
  console.log(`Slider`, 'render');
  return (
    <Carousel>
      {sliders.map((slide, i) => (
        <div key={i}>
          <Slide title={slide.title} />
        </div>
      ))}
    </Carousel>
  );
};

Slider.propTypes = {
  sliders: PropTypes.array.isRequired,
};
export default Slider;
