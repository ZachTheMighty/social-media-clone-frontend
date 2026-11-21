import { X } from "lucide-react";
import fetchCustom from "../utils/fetch_custom";
import { useAuth } from "../contexts/auth_context";
export default function ConfirmDialogBox({ content, dialogRef, post }) {
  const { loggedInUser, setUser } = useAuth();
  const closeDialog = (event) => {
    event.stopPropagation();
    dialogRef.current.close();
  };

  const deletePost = (event) => {
    fetchCustom(`posts/${post.id}`, true, "delete")
      .then((response) => response.json())
      .then((data) =>
        setUser({
          ...loggedInUser,
          allPosts: loggedInUser.allPosts.filter((p) => p.id !== data.id),
        }),
      );
    closeDialog(event);
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      onClick={(event) => event.stopPropagation()}
      className="m-auto outline-none rounded-xl dark:bg-[#0e1113] dark:text-white backdrop:bg-black/60 px-4 py-4"
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Delete {content}?</div>
        <div
          onClick={(event) => closeDialog(event)}
          className="bg-gray-200 hover:bg-gray-300 active:bg-gray-200 rounded-full text-gray-500 p-1"
        >
          <X />
        </div>
      </div>
      <div className="text-[14px]">
        Are you sure you want to delete your {content}? You can't undo this.
      </div>
      <div className="flex justify-end gap-2 mt-8 text-[14px] font-bold">
        <div
          onClick={(event) => closeDialog(event)}
          className="rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-200 rounded-full p-2"
        >
          Cancel
        </div>
        <div
          onClick={(event) => deletePost(event)}
          className="rounded-full bg-red-600 hover:bg-red-700 active:bg-red-600 text-white p-2"
        >
          Delete
        </div>
      </div>
    </dialog>
  );
}
