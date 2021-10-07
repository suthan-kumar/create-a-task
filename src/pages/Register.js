import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Axios from "../api/Axios";

function Register() {
  const [user, setUser] = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidForm = () => {
    return name && email && password;
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const createUser = async (user) => {
    try {
      const { data } = await Axios.post("auth/register", user);
      setUser(data);
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidForm()) {
      const user = { name, email, password };
      createUser(user);
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
            <h3 className="text-center my-2">Register</h3>

            <form className="m-2" onSubmit={handleSubmit}>
              <input
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="form-control mt-1"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="form-control mt-1"
                type="password"
                placeholder="Password"
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
                Already have an Account? <Link to="/login">Login Here</Link>{" "}
              </p>
            </form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
