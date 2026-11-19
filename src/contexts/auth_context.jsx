import { createContext, useEffect, useState, useContext } from "react";
import fetchCustom from "../utils/fetch_custom.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCustom("tokens/auth", true)
      .then((response) => response.json())
      .then((data) => {
        setIsAuth(data.isAuth);
        setUser(data.user);
        setUser((prevUser) => {
          if (!prevUser) return;
          return {
            ...prevUser,
            allPosts: [
              ...prevUser.posts,
              ...prevUser.following.map((user) => user.posts).flat(),
            ],
          };
        });
      })
      .finally(() => setIsLoading(false));
  }, [isAuth]);

  return (
    <AuthContext
      value={{ isAuth, setIsAuth, isLoading, loggedInUser: user, setUser }}
    >
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
