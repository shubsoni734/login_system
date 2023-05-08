import React from "react";
import Header from "./Header";
import Footer from "./Footer";
// import Home from "../../Screens/Home";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "80vh",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
