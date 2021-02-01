import { Form } from 'antd';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const FormSubmit = ({
  startSubmit,
  children,
  onFinish,
  onChange,
  name,
  ...props
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(`Form`, form);
  }, []);

  return (
    <Form
      form={form}
      name={name}
      onFieldsChange={(_, allFields) => onChange(allFields)}
      onFinish={values => {
        startSubmit(name);
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
  startSubmit: PropTypes.func,
};

FormSubmit.defaultProps = {
  onChange: () => {},
  onFinish: () => {},
  startSubmit: () => {},
  children: null,
};

export default FormSubmit;
