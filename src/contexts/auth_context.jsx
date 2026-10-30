import { createContext, useEffect, useState, useContext } from "react";
import fetchCustom from "../utils/fetch_custom.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCustom("http://localhost:8080/tokens/auth", true)
      .then((response) => response.json())
      .then((data) => {
        setIsAuth(data.isAuth);
        setUser(data.user);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext value={{ isAuth, setIsAuth, isLoading, user, setUser }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
