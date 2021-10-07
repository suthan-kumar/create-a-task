import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import Axios from "../api/Axios";

function Login() {
  const [user, setUser] = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidForm = () => {
    return email && password;
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const loginUser = async (user) => {
    try {
      const { data } = await Axios.post("auth/login", user);
      setUser(data);
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidForm()) {
      const user = { email, password };
      loginUser(user);
    }
  };

  useEffect(() => {
    handleReset();
  }, []);
  return (
    <div className="mt-4 py-3">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <h3 className="text-center my-2">Login</h3>

            <form className="m-2" onSubmit={handleSubmit}>
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="form-control mt-1"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div className="mt-4 text-center">
                <button className="btn btn-success me-2" type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
              <p className="mt-2 text-center">
                Don't have an Account? <Link to="/register">Register Here</Link>{" "}
              </p>
            </form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
