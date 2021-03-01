import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

const menu = [
  { path: "/dashboard", text: "Dashboard" },
  { path: "/categories", text: "Categories" },
  { path: "/products", text: "Products" },
  { path: "/orders", text: "Orders" },
];

const Sidebar = (props) => {
  const activeNavLink = {
    color: "#007bff",
  };

  return (
    <Row>
      <Col md={2} as="nav" className={`bg-light ${styles.sidebar}`}>
        <div className={styles.sidebarSticky}>
          <ul className="nav flex-column">
            {menu.map((m) => (
              <li className="nav-item" key={m.path}>
                <NavLink
                  to={m.path}
                  className={`nav-link ${styles.navLinkInSidebar}`}
                  activeStyle={activeNavLink}
                >
                  {m.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Col>
      <Col md={9} lg={10} as="main" className={`ml-sm-auto px-4 pt-3`}>
        <div>{props.children}</div>
      </Col>
    </Row>
  );
};

export default Sidebar;
