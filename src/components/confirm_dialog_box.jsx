import { X } from "lucide-react";
export default function ConfirmDialogBox({ content, dialogRef, deleteFn }) {
  const closeDialog = (event) => {
    event.stopPropagation();
    dialogRef.current.close();
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
          className="bg-gray-200 hover:bg-gray-300 active:bg-gray-200 rounded-full text-gray-500 p-1 cursor-pointer"
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
          className="rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-200 rounded-full p-2 cursor-pointer"
        >
          Cancel
        </div>
        <div
          onClick={(event) => {
            deleteFn();
            closeDialog(event);
          }}
          className="rounded-full bg-red-600 hover:bg-red-700 active:bg-red-600 text-white p-2 cursor-pointer"
        >
          Delete
        </div>
      </div>
    </dialog>
  );
}
