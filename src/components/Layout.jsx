


// Layout component to wrap pages with consistent Navbar and Footer
// This eliminates the need to include Navbar and Footer on every individual page

// imports
import Footer from "./Footer";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      {/* Render Navbar at the top of the page */}
      <Navbar />
      
      {/* Main content of the page */}
      <main>{children}</main>
      
      {/* Render Footer at the bottom of the page */}
      <Footer />
    </>
  );
};

// PropTypes for type-checking props
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Ensures that children is a valid React node
};

export default Layout;
