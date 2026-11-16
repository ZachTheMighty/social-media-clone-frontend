import { useAuth } from "../contexts/auth_context";
import Link from "./link.jsx";
import Post from "./post.jsx";

export default function Dashboard() {
  const { loggedInUser } = useAuth();

  const posts = [
    ...loggedInUser.posts,
    ...loggedInUser.following.map((user) => user.posts).flat(),
  ];
  return (
    <div className="pt-8 pb-30 max-w-183 mx-auto px-4 sm:px-0">
      {posts.length === 0 ? (
        <div className="text-center text-black/50 dark:text-white/50">
          Your feed is empty, either <Link to="/posts/new">create</Link> posts
          or <Link to="/search">follow</Link> others
        </div>
      ) : (
        posts
          .toSorted(
            (postA, postB) =>
              new Date(postB.createdAt) - new Date(postA.createdAt),
          )
          .map((post, index) => (
            <>
              <Post key={post.id} post={post} />
              {index !== posts.length - 1 && (
                <hr className="text-black/10 dark:text-white/10"></hr>
              )}
            </>
          ))
      )}
    </div>
  );
}
