import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
const Header = () => {
  const [user, setUser] = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    setUser(null);
    setTimeout(() => {
      history.replace("/login");
    }, 500);
  };
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand>Create a Task</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="nav navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Tasks
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
