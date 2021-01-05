import Home from './../components/Home';

Home.getInitialProps = async (props: { ctx: { isServer: Boolean } }) => {
  const { isServer } = props.ctx;
  return { isServer };
};

export default Home;
