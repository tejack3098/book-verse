import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchForm = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      navigate("search?q=" + query);
      setQuery("");
    } else {
      alert('Type your search!')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your search..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <input type="submit" value="Search" />
    </form>
  );
};
