import React, { useState } from "react";
import { IconButton, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const Form = styled("form")({
  width: "70%",
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "12px",
  border: "1px solid #E39E22",
  padding: "5px 30px",
});

const InputField = styled("input")({
  width: "80%",
  backgroundColor: "#F1F1E6",
  border: "none",
  "&:focus": {
    outline: "none",
  },
});

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        placeholder="Search TV Show"
        value={searchQuery}
        onChange={handleSearch}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Form>
  );
};

export default SearchBar;
