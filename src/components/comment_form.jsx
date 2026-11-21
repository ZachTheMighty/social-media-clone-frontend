import { useState } from "react";
import { useAuth } from "../contexts/auth_context.jsx";
import fetchCustom from "../utils/fetch_custom.js";
import Editor from "./editor.jsx";

export default function CommentForm({ post }) {
  const { loggedInUser, setUser } = useAuth();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetchCustom(
      `posts/${post.id}/comments`,
      true,
      "post",
      JSON.stringify({ comment }),
    );

    const data = await response.json();
    if (!response.ok) return setErrors(data.errors);
    setErrors(null);
    setUser({
      ...loggedInUser,
      allPosts: loggedInUser.allPosts.map((p) => (p.id === data.id ? data : p)),
    });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Editor
        formData={comment}
        setFormData={setComment}
        placeholder="Type comment..."
        height={200}
      />
      {Array.isArray(errors) && (
        <ul className="list-disc mt-3">
          {errors.map((error, index) => {
            return (
              <li key={index} className="text-red-500 font-bold text-xs">
                {error.msg}
              </li>
            );
          })}
        </ul>
      )}
      <button className="flex justify-end ml-auto text-white dark:text-black rounded-full font-bold text-end mt-4 bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 text-sm px-4 py-2 cursor-pointer">
        Comment
      </button>
    </form>
  );
}
