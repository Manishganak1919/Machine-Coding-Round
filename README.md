/********** How to add search bar in select dropdown**********//

Live demo:- https://exquisite-kelpie-2d40e4.netlify.app/

Step no 01: create a component "DropdownSearch.jsx" or Any name

code of DropdownSearch.jsx:
/***************|*******/

import { useEffect, useRef, useState } from "react";

const DropdownSearch = ({ options, label, id, selectedVal, handleChange }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const selectOption = (option) => {
    setQuery("");
    handleChange(option[label]);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getDisplayValue = () => {
    return query || selectedVal || "";
  };

  const filterOptions = (options) => {
    return options.filter((option) =>
      option[label].toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="relative w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
          }}
          onClick={toggleDropdown}
          className="w-full p-2 border-2 border-green-600 rounded-md text-green-600 bg-white focus:outline-none focus:border-green-700"
          placeholder="Search..."
        />
        <div
          className={`absolute right-2 top-2 transform ${
            isOpen ? "rotate-180" : ""
          } transition-transform`}
        >
          ▼
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border-2 border-green-600 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
          {filterOptions(options).map((option, index) => (
            <div
              onClick={() => selectOption(option)}
              className={`p-2 cursor-pointer hover:bg-green-50 ${
                option[label] === selectedVal ? "bg-green-100" : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSearch;

/***************|*******/

code of : App.jsx
/***************|*******/
/***************|*******/

import "./App.css";
import DropdownSearch from "./component/DropdownSearch";
import { animals } from "./utlis/animal.js";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("Select the animal");

  return (
    <div className="App p-4 sm:p-6 md:p-8 bg-green-200 min-h-screen">
      <div className="w-full my-8">
        <h2 className="text-4xl font-semibold">
          Add search bar in select dropdown
        </h2>
      </div>
      <DropdownSearch
        options={animals}
        label="name"
        id="id"
        selectedVal={value}
        handleChange={(val) => setValue(val)}
      />
      {value !== "Select the animal" && (
        <div className="mt-[250px] p-2 border border-green-600 rounded-md text-green-600 bg-green-50">
          Selected Item: {value}
        </div>
      )}
    </div>
  );
}

/***************|*******/
/***************|*******/
