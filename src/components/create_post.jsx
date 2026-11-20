import PostForm from "./post_form";
import fetchCustom from "../utils/fetch_custom.js";
import { useAuth } from "../contexts/auth_context.jsx";
import { useState } from "react";

export default function CreatePost() {
  const { loggedInUser, setUser } = useAuth();
  const [errors, setErrors] = useState("s");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetchCustom(
      "posts",
      true,
      "post",
      JSON.stringify(formData),
    );
    const data = await response.json();
    if (!response.ok) return setErrors(data.errors);
    setErrors(null);
    setUser({ ...loggedInUser, allPosts: [...loggedInUser.allPosts, data] });
  };
  return (
    <PostForm
      handleSubmit={handleSubmit}
      errors={errors}
      formData={formData}
      setFormData={setFormData}
      text="create"
    />
  );
}
