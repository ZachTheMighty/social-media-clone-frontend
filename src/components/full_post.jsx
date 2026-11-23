import { useParams } from "react-router";
import NotFound from "./not_found.jsx";
import { useAuth } from "../contexts/auth_context.jsx";
import CommentForm from "./comment_form.jsx";
import ContentTemplate from "./content_template.jsx";

export default function FullPost() {
  const { loggedInUser } = useAuth();
  const { postId } = useParams();

  const post = loggedInUser.allPosts.find((p) => p.id === +postId);

  if (!post) return <NotFound />;

  return (
    <div className="pt-8 pb-30 max-w-183 mx-auto px-4 sm:px-0">
      <ContentTemplate content={post} full={true} />
      <CommentForm postId={post.id} />
      <div className="flex flex-col gap-8">
        {post.comments
          .toSorted(
            (commentA, commentB) =>
              new Date(commentB.createdAt) - new Date(commentA.createdAt),
          )
          .map((comment) => (
            <ContentTemplate key={comment.id} content={comment} />
          ))}
      </div>
    </div>
  );
}
