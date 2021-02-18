import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="light" expand="xl">
      <Container>
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Navbar>
          <Nav>
            <NavLink to="/signin" className="nav-link">
              Signin
            </NavLink>
            <NavLink to="/signup" className="nav-link">
              Signup
            </NavLink>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Header;
