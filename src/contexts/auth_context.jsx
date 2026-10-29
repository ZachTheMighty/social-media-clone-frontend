import { createContext, useEffect, useState, useContext } from "react";
import fetchCustom from "../utils/fetch_custom.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustom("http://localhost:8080/tokens/auth", true)
      .then((response) => response.json())
      .then((data) => setIsAuth(data.isAuth))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext value={{ isAuth, setIsAuth, isLoading }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
