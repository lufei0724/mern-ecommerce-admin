import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink, Link } from "react-router-dom";

const LoginLinks = () => {
  return (
    <Nav>
      <NavLink to="/signin" className="nav-link">
        Signin
      </NavLink>
      <NavLink to="/signup" className="nav-link">
        Signup
      </NavLink>
    </Nav>
  );
};

const LoggedInLinks = (props) => {
  const { setAuth } = props;

  const handleSignOut = () => {
    localStorage.removeItem("mern-ecom-token");
    localStorage.removeItem("mern-ecom-user");
    setAuth({
      isAuthenticated: false,
    });
  };

  return (
    <Nav>
      <span className="nav-link" onClick={handleSignOut}>
        Sign Out
      </span>
    </Nav>
  );
};

const Header = (props) => {
  const { auth, setAuth } = props;
  console.log(auth);
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="xl"
      className="sticky-top p-0"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Navbar>
          {auth.isAuthenticated ? (
            <LoggedInLinks setAuth={setAuth} />
          ) : (
            <LoginLinks />
          )}
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Header;
