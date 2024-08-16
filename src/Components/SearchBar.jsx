import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// Ensure this file is created for your CSS

const SearchBar = ({ handleSearch, category }) => {
  const [nameCriteria, setNameCriteria] = useState("");

  const handleNameChange = (e) => {
    const { value } = e.target;
    setNameCriteria(value); // Update name criteria based on input value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(nameCriteria, category); // Trigger search with current criteria and category
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar-container">
        <input
          type="text"
          value={nameCriteria}
          onChange={handleNameChange}
          placeholder="Search for products by name..."
        />
        <button type="submit" className="search-icon-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
