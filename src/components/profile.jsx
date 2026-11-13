import { useParams } from "react-router";
import { useUsers } from "../contexts/users_context";
import { useAuth } from "../contexts/auth_context";
import fetchCustom from "../utils/fetch_custom";

export default function Profile() {
  const { username } = useParams();
  const { users, isLoading } = useUsers();
  const { loggedInUser, setUser } = useAuth();

  if (isLoading) return;

  const request = loggedInUser.sentRequests.find(
    (request) => request.receiver?.username === username,
  );

  const user =
    loggedInUser.username === username
      ? loggedInUser
      : users.find((user) => user.username === username);

  const sendFollowRequest = () => {
    fetchCustom(`requests/${username}`, true, "post")
      .then((response) => response.json())
      .then((request) => {
        const array = loggedInUser.sentRequests.find(
          (req) => req.id === request.id,
        )
          ? loggedInUser.sentRequests.map((req) =>
              req.id === request.id ? request : req,
            )
          : [...loggedInUser.sentRequests, request];
        setUser({
          ...loggedInUser,
          sentRequests: array,
        });
      });
  };

  const cancelFollowRequest = () => {
    fetchCustom(`requests/${request.id}`, true, "delete")
      .then((response) => response.json())
      .then((request) => {
        const array = loggedInUser.sentRequests.filter(
          (req) => req.id !== request.id,
        );
        setUser({
          ...loggedInUser,
          sentRequests: array,
        });
      });
  };

  const unFollow = () => {};

  return (
    <div className="pt-8 max-w-xl mx-auto px-4 sm:px-0">
      <div className="flex items-center gap-6">
        <img
          src={user.picture}
          className="w-30 h-30 object-cover rounded-full"
        />
        <div>
          <div className="font-bold text-2xl">{user.username}</div>
          <div className="text-sm">{user.firstName + " " + user.lastName}</div>
          <div className="flex gap-5 mt-2 text-sm">
            <Numbers name="posts" numbers={user.posts} />
            <Numbers name="followers" numbers={user.followers} />
            <Numbers name="following" numbers={user.following} />
          </div>
        </div>
      </div>
      {user === loggedInUser ? (
        <button className="bg-gray-100 w-full py-3 font-bold text-sm mt-8 rounded-xl hover:bg-gray-200 active:scale-x-98 transition-transform">
          Edit profile
        </button>
      ) : request?.status === "PENDING" ? (
        <button
          onClick={cancelFollowRequest}
          className="bg-gray-100 dark:bg-white/10 w-full py-3 font-bold text-sm mt-8 rounded-xl hover:bg-gray-200 hover:dark:bg-white/20 active:scale-x-98 transition-transform"
        >
          Cancel request
        </button>
      ) : loggedInUser.following.find((u) => u.username === username) ? (
        <button
          onClick={unFollow}
          className="bg-gray-100 dark:bg-white/10 w-full py-3 font-bold text-sm mt-8 rounded-xl hover:bg-gray-200 hover:dark:bg-white/20 active:scale-x-98 transition-transform"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={sendFollowRequest}
          className="bg-[#4a5df9] text-white w-full py-3 hover:bg-[#4150f7] active:scale-x-98 rounded-xl mt-8 font-bold text-sm transition-transform"
        >
          Follow
        </button>
      )}
    </div>
  );
}

function Numbers({ name, numbers }) {
  return (
    <div className="flex gap-1">
      <div className="font-bold">{numbers.length}</div>
      <div>{name}</div>
    </div>
  );
}
