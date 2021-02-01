import { Form } from 'antd';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const FormSubmit = ({ children, onFinish, onChange, name, ...props }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(form);
  }, []);

  return (
    <Form
      form={form}
      name={name}
      onFieldsChange={(_, allFields) => onChange(allFields)}
      onFinish={values => {
        onFinish({ formId: name, values });
      }}
      {...props}
    >
      {children}
    </Form>
  );
};

FormSubmit.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.any,
  onChange: PropTypes.func,
  onFinish: PropTypes.func,
};

FormSubmit.defaultProps = {
  onChange: () => {},
  onFinish: () => {},
  children: null,
};

export default FormSubmit;
