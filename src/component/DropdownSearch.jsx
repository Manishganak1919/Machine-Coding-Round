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
