import { Fragment } from "react";
import { useAuth } from "../contexts/auth_context";
import Link from "./link.jsx";
import PostCard from "./post_card.jsx";

export default function Dashboard() {
  const { loggedInUser } = useAuth();

  return (
    <div className="pt-8 pb-30 max-w-183 mx-auto px-4 sm:px-0">
      {loggedInUser.allPosts?.length === 0 ? (
        <div className="text-center text-black/50 dark:text-white/50">
          Your feed is empty, either <Link to="/posts/new">create</Link> posts
          or <Link to="/search">follow</Link> others
        </div>
      ) : (
        loggedInUser.allPosts
          ?.toSorted(
            (postA, postB) =>
              new Date(postB.createdAt) - new Date(postA.createdAt),
          )
          .map((post, index) => (
            <Fragment key={post.id}>
              <PostCard post={post} />
              {index !== loggedInUser.allPosts?.length - 1 && (
                <hr className="text-black/10 dark:text-white/10"></hr>
              )}
            </Fragment>
          ))
      )}
    </div>
  );
}
