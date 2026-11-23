import { useState } from "react";
import { useAuth } from "../contexts/auth_context";
import fetchCustom from "../utils/fetch_custom";
import Editor from "./editor";

export default function EditContent({ content, contentName, setIsEditable }) {
  const { loggedInUser, setUser } = useAuth();
  const [c, setC] = useState(content);

  const handleEdit = (event) => {
    event.preventDefault();
    fetchCustom(
      `${contentName}s/${content.id}`,
      true,
      "put",
      JSON.stringify({ postId: content?.postId, content: c.content }),
    )
      .then((response) => response.json())
      .then((data) => {
        setUser({
          ...loggedInUser,
          allPosts: loggedInUser.allPosts.map((p) =>
            p.id === data.id ? data : p,
          ),
        });
        setIsEditable((prevIsEditable) => !prevIsEditable);
      });
  };

  return (
    <form onSubmit={(event) => handleEdit(event)}>
      <Editor
        formData={content}
        setFormData={setC}
        placeholder={`Edit ${contentName}...`}
        height={content.title ? 500 : 200}
      />
      <div className="flex justify-end gap-2 font-bold mt-2">
        <div
          onClick={(event) => {
            event.stopPropagation();
            setIsEditable((prevIsEditable) => !prevIsEditable);
          }}
          className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 active:bg-gray-100 dark:active:bg-white/10 cursor-pointer px-4 py-2 rounded-full"
        >
          Cancel
        </div>
        <button
          onClick={(event) => event.stopPropagation()}
          className="bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 active:bg-black dark:active:bg-white text-white dark:text-black cursor-pointer px-4 py-2 rounded-full"
        >
          Save edits
        </button>
      </div>
    </form>
  );
}
