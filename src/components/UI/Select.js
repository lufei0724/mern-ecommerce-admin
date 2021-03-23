import Form from "react-bootstrap/Form";
import FormGroupLayout from "./FormGroupLayout";

const Select = (props) => {
  const {
    controlId,
    label,
    options,
    defaultValue,
    helpText,
    value,
    onChange,
    horizontal,
  } = props;

  return (
    <FormGroupLayout
      controlId={controlId}
      label={label}
      helpText={helpText}
      horizontal={horizontal}
    >
      <Form.Control
        as="select"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        <option value="none"></option>
        {options.map((option) => (
          <option
            key={option.value}
            data-key={option.value}
            value={option.value}
          >
            {option.text}
          </option>
        ))}
      </Form.Control>
    </FormGroupLayout>
  );
};

export default Select;
