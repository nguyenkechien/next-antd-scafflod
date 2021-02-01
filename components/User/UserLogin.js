/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import { CenterPage } from '../Container';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import FormSubmit from '../../containers/Form';
import { FormID } from '../../constants/ConstTypes';

export const propsType = {
  router: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
  submiting: PropTypes.bool.isRequired,
};

/**
 *
 * @param {propsType} props
 */
const UserLogin = props => {
  return (
    <CenterPage>
      <FormSubmit
        name={FormID.login}
        onFinish={props.userLogin}
        onChange={fields => {
          console.log(`fields`, fields);
        }}
      >
        <Form.Item
          rules={[{ required: true, message: 'Please input your Username!' }]}
          name="username"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={props.submiting}
          >
            {props.submiting ? 'Logging in' : 'Log in'}
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </FormSubmit>
    </CenterPage>
  );
};

export default UserLogin;

UserLogin.propTypes = propsType;
