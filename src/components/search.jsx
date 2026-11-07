import { useState } from "react";
import SearchBar from "./search_bar";

export default function Seearch() {
  const [search, setSearch] = useState("");

  return (
    <div className="pt-8 max-w-xl mx-auto px-4 sm:px-0">
      <SearchBar search={search} setSearch={setSearch} />
    </div>
  );
}
