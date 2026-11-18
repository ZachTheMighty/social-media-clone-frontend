import { Link } from "react-router";
import parse from "html-react-parser";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { format } from "timeago.js";

export default function Post({ post }) {
  return (
    <div className="sm:w-183 hover:bg-[#F6F8F9] dark:hover:bg-[#181C1F] rounded-2xl px-4 py-2 my-1">
      <div className="flex items-center text-xs gap-1">
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
        <div className="text-[#5C6C74] dark:text-[#8BA2AD]">
          • {format(post.createdAt)}
        </div>
      </div>
      <div className="my-2 font-bold text-lg line-clamp-2">{post.title}</div>
      <div className="text-sm line-clamp-3 sm:line-clamp-6">
        {parse(post.content)}
      </div>
      <div className="pt-2 flex gap-2">
        <div className="bg-[#E5EBEE] dark:bg-[#2A3236] flex items-center rounded-full font-bold text-xs">
          <div className="hover:text-[#FF4500] hover:bg-[#DBE4E9] dark:hover:bg-[#333D42] p-2 rounded-full">
            <ThumbsUp size={16} />
          </div>
          {post.likes - post.dislikes}
          <div className="hover:text-[#6A5CFF] hover:bg-[#DBE4E9] dark:hover:bg-[#333D42] p-2 rounded-full">
            <ThumbsDown size={16} />
          </div>
        </div>

        <div className="bg-[#E5EBEE] hover:bg-[#DBE4E9] dark:bg-[#2A3236] dark:hover:bg-[#333D42] flex items-center rounded-full font-bold text-xs px-3 py-2 gap-1">
          <MessageCircle size={16} />
          {post.comments.length}
        </div>
      </div>
    </div>
  );
}
