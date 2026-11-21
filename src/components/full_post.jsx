import { useParams } from "react-router";
import PostCard from "./post_card.jsx";
import NotFound from "./not_found.jsx";
import { useAuth } from "../contexts/auth_context.jsx";
import CommentForm from "./comment_form.jsx";

export default function FullPost() {
  const { loggedInUser } = useAuth();
  const { postId } = useParams();

  const post = loggedInUser.allPosts.find((p) => p.id === +postId);

  if (!post) return <NotFound />;

  return (
    <div className="pt-8 pb-30 max-w-183 mx-auto px-4 sm:px-0">
      <PostCard post={post} full={true} />
      <CommentForm post={post} />
    </div>
  );
}
