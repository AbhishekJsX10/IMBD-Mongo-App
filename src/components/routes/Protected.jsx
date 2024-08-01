

// Protected route component that ensures only authenticated users can access the enclosed routes
// Unauthenticated users are redirected to the home page

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PropTypes from "prop-types";

const Protected = ({ children }) => {
  // Access the authentication context
  // Destructure the `user` and `isLoading` state from the `useAuth` hook
  const { user, isLoading } = useAuth();
  
  // If the authentication state is still loading, return null to prevent rendering
  if (isLoading) {
    return null;
  }

  // If the user is authenticated, render the children components
  // Otherwise, redirect to the home page
  return <>{user ? children : <Navigate to={"/"} />}</>;
};

export default Protected;

Protected.propTypes = {
  // Define the expected prop types
  // `children` should be a React node (i.e., JSX or a component)
  children: PropTypes.node.isRequired,
};
