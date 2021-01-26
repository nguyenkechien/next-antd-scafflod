import { Button } from 'antd';
import Link from 'next/link';
import IfComp from 'if-comp';
import Counter from '../../containers/home/counter';
import { CenterContainer } from '../Container';

const Home = () => (
  <CenterContainer>
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
export default Home;
