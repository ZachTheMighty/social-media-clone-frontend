import { useAuth } from "../contexts/auth_context";

export default function Profile() {
  const { user } = useAuth();

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
            <Numbers name="followers" numbers={user.followedBy} />
            <Numbers name="following" numbers={user.following} />
          </div>
        </div>
      </div>
      <button className="bg-[#4a5df9] text-white w-full py-3 hover:bg-[#4150f7] active:bg-[#4a5df9] active:scale-x-98 rounded-xl mt-8 font-bold text-sm">
        Follow
      </button>
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
