import { useEffect, useState } from "react";
import SearchBar from "./search_bar";
import fetchCustom from "../utils/fetch_custom";
import { Link } from "react-router";

export default function Seearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustom("http://localhost:8080/users", true)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="pt-8 max-w-xl mx-auto px-4 sm:px-0">
      <SearchBar search={search} setSearch={setSearch} />
      {isLoading ? (
        <div>Loading users...</div>
      ) : (
        <div className="mt-8">
          <div className="font-bold text-xl mb-4 mx-4">All users</div>
          <div className="max-h-130 sm:max-h-160 overflow-scroll">
            {users.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center gap-3 hover:bg-gray-100 active:bg-gray-200 rounded-md px-4 py-2"
              >
                <img
                  src={user.picture}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="text-sm">
                  <div className="font-bold">{user.username}</div>
                  <div className="text-gray-500">
                    {user.firstName + " " + user.lastName}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
