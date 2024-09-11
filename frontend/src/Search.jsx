import { useState } from "react";

export default function Search({ setQuery }) {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", input);
    setQuery(input);
    setInput("");
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
