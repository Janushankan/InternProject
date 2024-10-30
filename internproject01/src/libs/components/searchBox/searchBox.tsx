"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "../button";

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search movies...",
  onSearch,
}) => {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <div className="flex items-center bg-gray-200 rounded focus-within:ring-2 focus-within:ring-blue-300">
      <MagnifyingGlassIcon className="w-5 h-5 mx-2 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-gray-700"
      />
      <div className="ml-2">
        <Button text="Search" onClick={handleSearch} variant="customPink" />
      </div>
    </div>
  );
};
