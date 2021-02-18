import Form from "react-bootstrap/Form";

const Input = (props) => {
  const {
    controlId,
    label,
    type,
    placeholder,
    helpText,
    value,
    onChange,
  } = props;

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Form.Text className="text-muted">{helpText}</Form.Text>
    </Form.Group>
  );
};

export default Input;
