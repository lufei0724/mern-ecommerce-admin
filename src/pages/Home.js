import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";

const Home = () => {
  return (
    <Container className="mt-5">
      <h1>Welcome to EC Admin</h1>
      <p>
        Cras mauris elit, fermentum laoreet porta eget, eleifend id diam. Ut
        urna lorem, rutrum a tellus a, iaculis dapibus diam. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Aliquam sodales rutrum pretium.
      </p>
    </Container>
  );
};

export default Home;
