import { useState, useEffect, cloneElement } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Product from "./pages/Product";
import Order from "./pages/Order";

const PrivateRoute = ({ children, ...rest }) => {
  const { auth } = { ...rest };
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated ? (
          cloneElement(children, { auth })
        ) : (
          <Redirect to="/signin" />
        )
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
    <Switch>
      <Layout auth={auth} setAuth={setAuth}>
        <PrivateRoute path="/" exact auth={auth}>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/product" auth={auth}>
          <Product />
        </PrivateRoute>
        <PrivateRoute path="/order" auth={auth}>
          <Order />
        </PrivateRoute>
        <Route path="/signup">
          <Signup auth={auth} setAuth={setAuth} />
        </Route>
        <Route path="/signin">
          <Signin auth={auth} setAuth={setAuth} />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
