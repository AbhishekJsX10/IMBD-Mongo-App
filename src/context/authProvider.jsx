


import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";

// Create a context for authentication
export const AuthContext = createContext();

// Provider component to wrap around parts of the app that need authentication
export const AuthProvider = ({ children }) => {
  // State variables
  const [user, setUser] = useState(null); // Stores the current authenticated user
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state during authentication checks

  // Function to sign in with Google using a popup
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // Function to sign out the current user
  function logout() {
    return signOut(auth);
  }

  // Effect to handle authentication state changes
  useEffect(() => {
    // Set up an observer on the Auth object to listen for changes to the user's sign-in state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Update user state if a user is authenticated
      } else {
        setUser(null); // Clear user state if no user is authenticated
      }
      setIsLoading(false); // Set loading state to false once the check is complete
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    // Provide the authentication state and functions to the rest of the app
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validation for AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children prop must be a React node
};
