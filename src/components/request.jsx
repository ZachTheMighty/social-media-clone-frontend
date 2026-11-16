import { Link } from "react-router";
import formatTime from "../utils/format_time";

export default function Request({ user, children, request }) {
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
          <div className="text-[10px] sm:text-xs text-black/50 dark:text-white/50 flex gap-2">
            <div>Sent at {formatTime(request.updatedAt)}</div>
            {request.status !== "PENDING" && (
              <div>
                {request.status} at {formatTime(request.updatedAt)}
              </div>
            )}
          </div>
        </div>
      </div>
      {children}
    </Link>
  );
}
