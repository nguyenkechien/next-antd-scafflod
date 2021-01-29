import { Button, Checkbox, Form, Radio, Switch } from 'antd';
import PropTypes from 'prop-types';
import { InputFieldType } from '../../constants/ConstTypes';
import logger from '../../core/Logger';
import InputField from './InputField';

const FormModule = ({ fields, children, onChange, name, ...props }) => {
  const renderField = ({ type, prefix, placeholder }) => {
    switch (type) {
      case InputFieldType.SWITCH:
        return (
          <>
            <Switch />
            <span>{placeholder}</span>
          </>
        );
      case InputFieldType.RADIO:
        return <Radio>{placeholder}</Radio>;
      case InputFieldType.CHECKBOX:
        return <Checkbox>{placeholder}</Checkbox>;
      default:
        return (
          <InputField prefix={prefix} placeholder={placeholder} type={type} />
        );
    }
  };

  const renderFields = (
    { type, prefix, placeholder, name, rules, ...field },
    index,
  ) => {
    logger.log(`field`, field);

    return (
      <Form.Item key={index} name={name} rules={rules} {...field}>
        {renderField({ type, prefix, placeholder })}
      </Form.Item>
    );
  };

  return (
    <Form
      name={name}
      fields={fields}
      onFieldsChange={(_, allFields) => onChange(allFields)}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {fields.map(renderFields)}
          <br />
          <br />
          <Form.Item>
            <Button type="primary" htmlType="submit" className="form-button">
              Submit
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};

FormModule.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      errors: PropTypes.arrayOf(PropTypes.string),
      name: PropTypes.any,
    }),
  ).isRequired,
  children: PropTypes.any,
  onChange: PropTypes.func,
};

FormModule.defaultProps = {
  onChange: () => {},
  children: null,
};

export default FormModule;
