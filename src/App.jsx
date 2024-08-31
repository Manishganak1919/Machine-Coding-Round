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
