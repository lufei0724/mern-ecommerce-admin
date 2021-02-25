import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <Row>
      <Col md={2} as="nav" className={`bg-light ${styles.sidebar}`}>
        <div className={styles.sidebarSticky}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to="/product" className="nav-link active">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/order" className="nav-link">
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </Col>
      <Col md={9} as="main" className={`ml-sm-auto px-4`}>
        <div>{props.children}</div>
      </Col>
    </Row>
  );
};

export default Sidebar;
