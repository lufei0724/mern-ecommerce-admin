import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";

const PrivateRoute = ({ children, ...rest }) => {
  const { auth } = { ...rest };
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated ? children : <Redirect to="/signin" />
      }
    />
  );
};

function App() {
  const initAuthState = {
    isAuthenticated: false,
  };
  const [auth, setAuth] = useState(initAuthState);

  useEffect(() => {
    const user = localStorage.getItem("mern-ecom-user");
    if (user) setAuth({ isAuthenticated: true });
  }, []);

  return (
    <Layout auth={auth} setAuth={setAuth}>
      <Switch>
        <PrivateRoute path="/" exact auth={auth}>
          <Home />
        </PrivateRoute>
        <Route path="/signup">
          <Signup auth={auth} setAuth={setAuth} />
        </Route>
        <Route path="/signin">
          <Signin auth={auth} setAuth={setAuth} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
