import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthContext from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [user] = useContext(AuthContext);
  return (
    <>
      <Header />
      <Container>
        {user ? (
          <Switch>
            <Route path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect to="/login" />
          </Switch>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default App;
