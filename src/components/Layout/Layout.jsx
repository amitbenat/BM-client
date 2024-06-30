import MainNavBar from './MainNavBar';

const Layout = (props) => {
  return (
    <>
      <MainNavBar />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
