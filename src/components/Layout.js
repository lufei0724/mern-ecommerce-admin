import Header from "../components/Header";

const Layout = (props) => {
  const { auth, setAuth } = props;
  return (
    <div>
      <Header auth={auth} setAuth={setAuth} />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
