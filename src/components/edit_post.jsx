import PostForm from "./post_form";
import fetchCustom from "../utils/fetch_custom.js";
import { useAuth } from "../contexts/auth_context.jsx";
import { useState } from "react";
import { useParams } from "react-router";
import NotFound from "./not_found.jsx";

export default function EditPost() {
  const { loggedInUser, setUser } = useAuth();
  const [errors, setErrors] = useState("s");
  const { postId } = useParams();
  const post = loggedInUser.posts.find((p) => p.id === +postId);
  const [formData, setFormData] = useState({
    title: post?.title,
    content: post?.content,
  });

  if (!post) return <NotFound />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetchCustom(
      `posts/${post.id}/`,
      true,
      "put",
      JSON.stringify(formData),
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
    <PostForm
      handleSubmit={handleSubmit}
      errors={errors}
      formData={formData}
      setFormData={setFormData}
      text="edit"
    />
  );
}
