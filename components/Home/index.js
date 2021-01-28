import { Button } from 'antd';
import Link from 'next/link';
import IfComp from 'if-comp';
import Counter from '../../containers/home/counter';
import { CenterContainer } from '../Container';
import Slider from '../Slider';

const sliders = [
  {
    title: 'hello 1',
  },
  {
    title: 'hello 2',
  },
  {
    title: 'hello 3',
  },
];

const Home = () => {
  return (
    <CenterContainer>
      <Slider sliders={sliders} />
      <h1>Hello Next.js</h1>
      <Link prefetch href="/user/list">
        <Button type="primary">UserList Page</Button>
      </Link>
      <IfComp
        expression={true}
        trueComp={
          <div style={{ marginTop: '20px' }}>
            Redux Counter Demo:
            <Counter />
          </div>
        }
      />
    </CenterContainer>
  );
};
export default Home;
