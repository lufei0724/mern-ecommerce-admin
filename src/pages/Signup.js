import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Input from "../components/UI/Input";
import userService from "../services/user";
import { Redirect } from "react-router-dom";

const Signup = (props) => {
  const { auth, setAuth } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    userService
      .signUp({ username, email, password })
      .then((data) => {
        setAuth({ isAuthenticated: true });
      })
      .catch((error) => console.log(error.message));
  };

  if (auth.isAuthenticated) return <Redirect to="/" />;

  return (
    <Container style={{ marginTop: "40px" }}>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Create account</h2>
          <Form onSubmit={handleSignUp}>
            <Input
              controlId={"signup-username"}
              label={"Your name"}
              type={"text"}
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Input
              controlId={"signup-email"}
              label={"Email"}
              type={"email"}
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Input
              controlId={"signup-password"}
              label={"Password"}
              type={"password"}
              placeholder={"At least 6 characters"}
              helpText={"Password must be at least 6 characters."}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant="primary" type="submit">
              Create your account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
