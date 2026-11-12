import { useState } from "react";
import SearchBar from "./search_bar";
import { Link } from "react-router";
import { useUsers } from "../contexts/users_context";

export default function Search() {
  const [query, setQuery] = useState("");
  const { users, isLoading } = useUsers();

  const loweredQuery = query.toLowerCase().trim();

  if (isLoading) return;

  const filteredUsers = users.filter((user) =>
    `
      ${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()} ${user.username.toLowerCase()}
    `.includes(loweredQuery),
  );

  return (
    <div className="pt-8 max-w-xl mx-auto px-4 sm:px-0">
      <SearchBar query={query} setQuery={setQuery} />
      <div className="mt-8">
        <div className="font-bold text-xl mb-4 mx-4">All users</div>
        <div className="max-h-120 sm:max-h-180 overflow-scroll">
          {filteredUsers.length === 0 ? (
            <div className="text-center text-gray-500">No results found.</div>
          ) : (
            filteredUsers.map((user) => (
              <Link
                key={user.username}
                to={`/profile/${user.username}`}
                className="flex items-center gap-3 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-white/10 dark:active:bg-white/20 rounded-md px-4 py-2"
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
