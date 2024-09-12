import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { fetchSearchData } from "./apiService";

export default function Search({ setQuery }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (value) => {
        if (value) {
          try {
            const result = await fetchSearchData("stations", value);
            console.log("Suggestions:", result.content);
            setSuggestions(result.content);
            setShowSuggestions(true);
          } catch (error) {
            console.error("Error fetching suggestions:", error);
          }
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }, 300), // 300ms debounce
    [] // Dependencies: empty array ensures the function is created only once
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion);
    setInput(suggestion.name);
    setQuery(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", input);
    setQuery(input);
    setInput("");
    setShowSuggestions(false);
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{
            border: "1px solid #ccc",
            listStyleType: "none",
            padding: 0,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
              }}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
