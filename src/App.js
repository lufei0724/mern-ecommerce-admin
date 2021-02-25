import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const PrivateRoute = ({ children, ...rest }) => {
  const { loginUser } = { ...rest };
  return (
    <Route
      {...rest}
      render={() => (loginUser ? children : <Redirect to="/signin" />)}
    />
  );
};

function App() {
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("mern-ecom-user");
    if (user) setLoginUser(user);
  }, []);

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact loginUser={loginUser}>
          <Home />
        </PrivateRoute>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/signin">
          <Signin loginUser={loginUser} setLoginUser={setLoginUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
