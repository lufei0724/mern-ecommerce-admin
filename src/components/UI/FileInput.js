import { forwardRef } from "react";
import Form from "react-bootstrap/Form";
import FormGroupLayout from "./FormGroupLayout";

const FileInput = forwardRef((props, ref) => {
  const { controlId, label, helpText, horizontal } = props;

  return (
    <FormGroupLayout
      controlId={controlId}
      label={label}
      helpText={helpText}
      horizontal={horizontal}
    >
      <Form.Control type="file" ref={ref} />
    </FormGroupLayout>
  );
});

export default FileInput;
