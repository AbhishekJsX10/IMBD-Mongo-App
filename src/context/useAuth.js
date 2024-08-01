

import { useContext } from "react";
import { AuthContext } from "./authProvider";

// Custom hook to access authentication context
export const useAuth = () => {
  // Access the AuthContext using useContext and return it
  return useContext(AuthContext);
};
