import fetchCustom from "../utils/fetch_custom.js";
import Editor from "./editor.jsx";
import Input from "./input.jsx";
import { useState } from "react";

export default function PostForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState("s");

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
  };

  return (
    <div className="pt-8 max-w-2xl mx-auto px-4 sm:px-0">
      <div className="text-center">Create post</div>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex-1 flex flex-col"
      >
        <Input
          text="title"
          type="text"
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
        <div className="mb-1">Body text</div>
        <Editor formData={formData} setFormData={setFormData} />
        <div
          className={`flex ${!errors ? "justify-between" : "justify-end"} items-center`}
        >
          {!errors && (
            <div className="text-green-500 font-bold">
              Successfully created post!
            </div>
          )}
          <button className="bg-black rounded-full px-4 py-3 text-white font-bold mt-2 hover:opacity-90 dark:bg-white dark:text-black active:opacity-100">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
