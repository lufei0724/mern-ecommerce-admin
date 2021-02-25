import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const { auth, setAuth, children } = props;
  return (
    <div>
      <Header auth={auth} setAuth={setAuth} />
      <Container fluid>
        {auth.isAuthenticated ? <Sidebar children={children} /> : children}
      </Container>
    </div>
  );
};

export default Layout;
