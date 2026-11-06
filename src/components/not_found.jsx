import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 min-h-screen flex flex-col gap-2 justify-center items-center">
      <div className="font-bold text-5xl">404</div>
      <div className="text-[#646464] font-bold text-xl text-center">
        The Page You're Looking For Doesn't Exist, bitch.
      </div>
      <button
        onClick={() => navigate(-1)}
        className="bg-black text-white px-6 py-1 font-bold"
      >
        GO BACK
      </button>
    </div>
  );
}
