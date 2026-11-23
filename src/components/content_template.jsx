import { Link } from "react-router";
import parse from "html-react-parser";
import { ThumbsUp, ThumbsDown, MessageCircle, Trash, Pen } from "lucide-react";
import { format } from "timeago.js";
import fetchCustom from "../utils/fetch_custom";
import { useAuth } from "../contexts/auth_context";
import { useRef, useState } from "react";
import ConfirmDialogBox from "./confirm_dialog_box";
import EditContent from "./edit_content.jsx";
import { useNavigate } from "react-router";

export default function ContentTemplate({ content, full = false }) {
  const [isEditable, setIsEditable] = useState(false);
  const dialogRef = useRef(null);
  const { loggedInUser, setUser } = useAuth();
  const navigate = useNavigate();

  const contentName = content.title ? "post" : "comment";

  const vote = content.votes.find(
    (vote) =>
      vote[`${contentName}Id`] === content.id &&
      vote.user.username === loggedInUser.username,
  );

  const upVoted = content.votes.filter((vote) => vote.state === "UP").length;
  const downVoted = content.votes.filter(
    (vote) => vote.state === "DOWN",
  ).length;

  const handleVote = (event, state) => {
    event.stopPropagation();
    fetchCustom(
      `${contentName}s/${content.id}/votes/${state}`,
      true,
      "post",
      JSON.stringify({ postId: content?.postId }),
    )
      .then((response) => response.json())
      .then((updatedPost) =>
        setUser({
          ...loggedInUser,
          allPosts: loggedInUser.allPosts.map((p) =>
            p.id === updatedPost.id ? updatedPost : p,
          ),
        }),
      );
  };
  const deleteContent = () => {
    fetchCustom(
      `${contentName}s/${content.id}`,
      true,
      "delete",
      JSON.stringify({ postId: content?.postId }),
    )
      .then((response) => response.json())
      .then((data) => {
        content.title
          ? setUser({
              ...loggedInUser,
              allPosts: loggedInUser.allPosts.filter((p) => p.id !== data.id),
            })
          : setUser({
              ...loggedInUser,
              allPosts: loggedInUser.allPosts.map((p) =>
                p.id === data.id ? data : p,
              ),
            });
      });
  };

  return (
    <div
      onClick={() => {
        !full && content.title && navigate(`/${contentName}s/${content.id}`);
      }}
      className={`${content.title && `sm:w-183 ${!full && "hover:bg-[#F6F8F9] dark:hover:bg-[#181C1F] cursor-pointer`"} rounded-2xl px-4 py-2 my-1 `}`}
    >
      <div className="flex items-center justify-between text-xs gap-1">
        <div className="flex items-center gap-1">
          <Link
            to={`/profile/${content.author.username}`}
            className="font-bold text-[#333D42] dark:text-[#B7CAD4] hover:text-[#0A499B] dark:hover:text-[#90A9FD] flex items-center gap-1"
          >
            <img
              src={content.author.picture}
              className="w-6 h-6 rounded-full object-cover"
            />
            <div>{content.author.username}</div>
          </Link>
          <div>•</div>
          <div className="text-[#5C6C74] dark:text-[#8BA2AD]">
            {format(content.createdAt)}
          </div>
          <div>•</div>
          <div className="text-[#5C6C74] dark:text-[#8BA2AD]">
            Edited {format(content.updatedAt)}
          </div>
        </div>
        {content.author.username === loggedInUser.username && (
          <div className="flex gap-2">
            {!isEditable && (
              <Pen
                onClick={(event) => {
                  event.stopPropagation();
                  setIsEditable((prevEditable) => !prevEditable);
                }}
                size={16}
                className="hover:text-[#6A5CFF] active:text-black cursor-pointer"
              />
            )}
            <Trash
              size={16}
              className="hover:text-red-500 active:text-black cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                dialogRef.current.showModal();
              }}
            />
            <ConfirmDialogBox
              content={contentName}
              dialogRef={dialogRef}
              deleteFn={deleteContent}
            />
          </div>
        )}
      </div>
      {content.title && (
        <div className={`my-2 font-bold text-lg ${!full && "line-clamp-2"}`}>
          {content.title}
        </div>
      )}
      <div
        className={`text-sm ${!full && content.title && "line-clamp-3 sm:line-clamp-6"}`}
      >
        {isEditable ? (
          <EditContent
            content={content}
            contentName={contentName}
            setIsEditable={setIsEditable}
          />
        ) : (
          <div className="my-4">{parse(content.content)}</div>
        )}
      </div>
      <div className="pt-2 flex gap-2">
        <div
          className={`flex items-center rounded-full font-bold text-xs ${vote?.state === "UP" ? "bg-[#D93900] text-white" : vote?.state === "DOWN" ? "bg-[#6A5CFF] text-white" : "bg-[#E5EBEE] dark:bg-[#2A3236]"} cursor-pointer`}
        >
          <div
            onClick={(event) => handleVote(event, "UP")}
            className={`p-2 rounded-full ${vote?.state === "UP" ? "hover:bg-[#AE2C00]" : vote?.state === "DOWN" ? "hover:bg-[#523DFF]" : "hover:text-[#FF4500] hover:bg-[#DBE4E9] dark:hover:bg-[#333D42] "}`}
          >
            <ThumbsUp
              size={16}
              className={`${vote?.state === "UP" && "fill-white"}`}
            />
          </div>
          <div className="cursor-text">{upVoted - downVoted}</div>
          <div
            onClick={(event) => handleVote(event, "DOWN")}
            className={`p-2 rounded-full ${vote?.state === "DOWN" ? "hover:bg-[#523DFF]" : vote?.state === "UP" ? "hover:bg-[#AE2C00]" : "hover:text-[#6A5CFF] hover:bg-[#DBE4E9] dark:hover:bg-[#333D42] "}`}
          >
            <ThumbsDown
              size={16}
              className={`${vote?.state === "DOWN" && "fill-white"}`}
            />
          </div>
        </div>
        <div className="bg-[#E5EBEE] hover:bg-[#DBE4E9] dark:bg-[#2A3236] dark:hover:bg-[#333D42] flex items-center rounded-full font-bold text-xs px-3 py-2 gap-1 cursor-pointer">
          <MessageCircle size={16} />
          {content.title ? content.comments.length : "Reply"}
        </div>
      </div>
    </div>
  );
}
