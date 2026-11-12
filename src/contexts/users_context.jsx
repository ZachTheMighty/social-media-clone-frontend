import { createContext, useContext, useEffect, useState } from "react";
import fetchCustom from "../utils/fetch_custom";

const UsersContext = createContext(null);

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustom("users", true)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .finally(() => setIsLoading(false));
  }, []);

  return <UsersContext value={{ users, isLoading }}>{children}</UsersContext>;
}

export function useUsers() {
  return useContext(UsersContext);
}
