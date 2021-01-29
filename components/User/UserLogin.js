/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import { CenterPage } from '../Container';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import FormModule from '../Form';
import { useState } from 'react';
import { InputFieldType } from '../../constants/ConstTypes';

export const propsType = {
  router: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
};
/**
 *
 * @param {propsType} props
 */
const UserLogin = props => {
  const [fields, setFields] = useState([
    {
      name: ['username'],
      value: 'admin',
      type: InputFieldType.TEXT,
      rules: [{ required: true, message: 'Please input your Username!' }],
      prefix: <UserOutlined className="site-form-item-icon" />,
    },
    {
      name: ['password'],
      value: 'admin',
      type: InputFieldType.PASSWORD,
      rules: [{ required: true, message: 'Please input your Password!' }],
      prefix: <LockOutlined className="site-form-item-icon" />,
    },
    {
      name: ['remember'],
      value: true,
      valuePropName: 'checked',
      noStyle: true,
      type: InputFieldType.SWITCH,
      placeholder: 'Remember me',
    },
  ]);
  return (
    <CenterPage>
      <FormModule
        name="login"
        fields={fields}
        onFinish={props.userLogin}
        onChange={_fields => {
          console.log(_fields);
        }}
      />
    </CenterPage>
  );
};

export default UserLogin;

UserLogin.propTypes = propsType;

// <Form
//         ref={formRef}
//         name="login"
//         className="login-form"
//         initialValues={{ remember: true }}
//         onFinish={props.userLogin}
//         onFinishFailed={onFinishFailed}
//       >
//         <Form.Item
//           rules={[{ required: true, message: 'Please input your Username!' }]}
//           name="username"
//         >
//           <InputField
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Username"
//           />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: 'Please input your Password!' }]}
//         >
//           <Input
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Item>
//         <Form.Item>
//           <Form.Item name="remember" valuePropName="checked" noStyle>
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item>

//           <a className="login-form-forgot" href="">
//             Forgot password
//           </a>
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="login-form-button"
//           >
//             Log in
//           </Button>
//           Or <a href="">register now!</a>
//         </Form.Item>
//       </Form>
