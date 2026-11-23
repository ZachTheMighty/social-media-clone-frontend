import ContentTemplate from "./content_template";

export default function PostCard({ post, full = false }) {
  return (
    <div
      onClick={() => {
        !full && navigate(`/posts/${post.id}`);
      }}
      className={`sm:w-183 ${!full && "hover:bg-[#F6F8F9] dark:hover:bg-[#181C1F] cursor-pointer`"} rounded-2xl px-4 py-2 my-1 `}
    >
      <ContentTemplate content={post} deleteFn={deletePost} full={full} />
    </div>
  );
}
