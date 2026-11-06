import { Search, CircleX } from "lucide-react";
import { useState } from "react";

export default function Seearch() {
  const [search, setSearch] = useState("");

  return (
    <div className="pt-8 max-w-xl mx-auto px-4 sm:px-0">
      <div className="flex justify-between items-center bg-gray-100 rounded-full px-4 ">
        <div className="flex-1 flex items-center gap-2">
          <Search className="text-gray-400" size={20} />
          <input
            className="flex-1 focus:outline-0 px-4 pl-0 py-3"
            placeholder="Search people..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <CircleX
          onClick={() => setSearch("")}
          stroke="#eceef0"
          size={20}
          className="fill-current text-[#c7c7c7] hover:text-gray-500 active:text-[#c7c7c7]"
        />
      </div>
    </div>
  );
}
