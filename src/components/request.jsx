import { Link } from "react-router";

export default function Request({ user, children }) {
  return (
    <Link
      to={`/profile/${user.username}`}
      className="flex-1 flex flex-col gap-2 sm:gap-0 mx-4 sm:mx-8 sm:flex-row sm:justify-between sm:items-center mb-4 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-white/10 dark:active:bg-white/20 rounded-md px-4 py-2"
    >
      <div className="flex gap-2 items-center">
        <img
          src={user.picture}
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <div>
          <div className="text-sm sm:text-xl font-bold">{user.username}</div>
          <div className="text-xs sm:text-sm max-w-30 sm:max-w-50 truncate">
            {user.firstName + " " + user.lastName}
          </div>
        </div>
      </div>
      {children}
    </Link>
  );
}
