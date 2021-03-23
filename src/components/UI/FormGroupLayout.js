import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormGroupLayout = (props) => {
  const { controlId, label, helpText, horizontal } = props;

  const formGroupProps = {
    controlId,
  };

  const formLabelProps = {};

  const colProps = {};

  if (horizontal) {
    formGroupProps.as = Row;
    formLabelProps.column = true;
    formLabelProps.lg = 3;
    colProps.lg = 9;
  }

  return (
    <Form.Group {...formGroupProps}>
      <Form.Label {...formLabelProps}>{label}</Form.Label>
      {horizontal ? <Col {...colProps}>{props.children}</Col> : props.children}
      <Form.Text className="text-muted">{helpText}</Form.Text>
    </Form.Group>
  );
};

export default FormGroupLayout;
