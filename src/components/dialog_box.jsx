import { X } from "lucide-react";
import SearchBar from "./search_bar";
import { useState } from "react";
import Request from "./request";
import { useParams } from "react-router";
import { useUsers } from "../contexts/users_context";
import { useAuth } from "../contexts/auth_context";

export default function DialogBox({ content, dialogRef }) {
  const [query, setQuery] = useState("");
  const { username } = useParams();
  const { loggedInUser } = useAuth();
  const { users } = useUsers();
  const user =
    loggedInUser.username === username
      ? loggedInUser
      : users.find((user) => user.username === username);

  const title = content[0]?.toUpperCase() + content?.slice(1);

  const filteredUsers = user[content]?.filter((user) =>
    `
  ${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()} ${user.username.toLowerCase()}
  `.includes(query.toLowerCase().trim()),
  );

  const closeDialog = () => {
    dialogRef.current.close();
    setQuery("");
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      onClose={closeDialog}
      className="m-auto w-140 h-189 outline-none rounded-3xl dark:bg-[#0e1113] dark:text-white backdrop:bg-black/60"
    >
      <div className="border-b border-b-black/10 dark:border-b-white/10 p-4 relative text-base">
        <X
          onClick={closeDialog}
          className="absolute left-6 top-3 hover:rotate-90 transition-transform duration-300 ease-in-out"
          size={35}
          strokeWidth={1.5}
        />
        <div className="text-center font-bold">{title}</div>
      </div>
      <div className="px-8">
        <div className="px-16 py-4">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
        {filteredUsers?.length === 0 ? (
          <div className="text-black/50 dark:text-white/50 text-center mt-40 text-sm sm:text-base">
            No results found.
          </div>
        ) : (
          <div onClick={closeDialog}>
            {filteredUsers?.map((user) => (
              <Request user={user} key={user.username} />
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
}
