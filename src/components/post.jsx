import { Link } from "react-router";
import parse from "html-react-parser";
import { ThumbsUp, ThumbsDown, MessageCircle, Trash, Pen } from "lucide-react";
import { format } from "timeago.js";
import fetchCustom from "../utils/fetch_custom";
import { useAuth } from "../contexts/auth_context";
import { useRef, useState } from "react";
import ConfirmDialogBox from "./confirm_dialog_box";

export default function Post({ post }) {
  const [content, setContent] = useState("");
  const dialogRef = useRef(null);
  const { loggedInUser, setUser } = useAuth();
  const vote = post.votes.find(
    (vote) =>
      vote.postId === post.id && vote.user.username === loggedInUser.username,
  );
  const handleVote = (event, state) => {
    event.preventDefault();
    fetchCustom(`posts/${post.id}/votes/${state}`, true, "post")
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

  const upVoted = post.votes.filter((vote) => vote.state === "UP").length;
  const downVoted = post.votes.filter((vote) => vote.state === "DOWN").length;

  return (
    <Link
      to={`/posts/${post.id}`}
      className="inline-block sm:w-183 hover:bg-[#F6F8F9] dark:hover:bg-[#181C1F] rounded-2xl px-4 py-2 my-1 cursor-pointer"
    >
      <div className="flex items-center justify-between text-xs gap-1">
        <div className="flex items-center gap-1">
          <Link
            to={`/profile/${post.author.username}`}
            className="font-bold text-[#333D42] dark:text-[#B7CAD4] hover:text-[#0A499B] dark:hover:text-[#90A9FD] flex items-center gap-1"
          >
            <img
              src={post.author.picture}
              className="w-6 h-6 rounded-full object-cover"
            />
            <div>{post.author.username}</div>
          </Link>
          <div>•</div>
          <div className="text-[#5C6C74] dark:text-[#8BA2AD]">
            {format(post.createdAt)}
          </div>
          <div>•</div>
          <div className="text-[#5C6C74] dark:text-[#8BA2AD]">
            Edited {format(post.updatedAt)}
          </div>
        </div>
        {post.author.username === loggedInUser.username && (
          <div className="flex gap-2">
            <Link to={`/posts/${post.id}/edit`}>
              <Pen
                size={16}
                className="hover:text-[#6A5CFF] active:text-black"
              />
            </Link>
            <Trash
              size={16}
              className="hover:text-red-500 active:text-black"
              onClick={(event) => {
                event.preventDefault();
                dialogRef.current.showModal();
                setContent("post");
              }}
            />
            <ConfirmDialogBox
              content={content}
              dialogRef={dialogRef}
              post={post}
            />
          </div>
        )}
      </div>
      <div className="my-2 font-bold text-lg line-clamp-2">{post.title}</div>
      <div className="text-sm line-clamp-3 sm:line-clamp-6">
        {parse(post.content)}
      </div>
      <div className="pt-2 flex gap-2">
        <div
          className={`flex items-center rounded-full font-bold text-xs ${vote?.state === "UP" ? "bg-[#D93900] text-white" : vote?.state === "DOWN" ? "bg-[#6A5CFF] text-white" : "bg-[#E5EBEE] dark:bg-[#2A3236]"}`}
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

        <div className="bg-[#E5EBEE] hover:bg-[#DBE4E9] dark:bg-[#2A3236] dark:hover:bg-[#333D42] flex items-center rounded-full font-bold text-xs px-3 py-2 gap-1">
          <MessageCircle size={16} />
          {post.comments.length}
        </div>
      </div>
    </Link>
  );
}
