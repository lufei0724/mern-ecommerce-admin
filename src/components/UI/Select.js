import Form from "react-bootstrap/Form";

const Select = (props) => {
  const {
    controlId,
    label,
    options,
    defaultValue,
    helpText,
    value,
    onChange,
  } = props;

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
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
      <Form.Text className="text-muted">{helpText}</Form.Text>
    </Form.Group>
  );
};

export default Select;
