"use client";
import { sortingOptions } from "@/data/shop";
import React, { useEffect, useState } from "react";

export default function Sorting({ products, setFinalSorted }) {
  const [selectedOptions, setSelectedOptions] = useState(sortingOptions[0]);

  useEffect(() => {
    if (selectedOptions.text == "Default") {
      setFinalSorted([...products]);
    } else if (selectedOptions.text == "Alphabetically, A-Z") {
      setFinalSorted(
        [...products].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (selectedOptions.text == "Alphabetically, Z-A") {
      setFinalSorted(
        [...products].sort((a, b) => b.name.localeCompare(a.name))
      );
    }
  }, [products, selectedOptions]);

  return (
    <>
      {" "}
      <div className="btn-select">
        <span className="text-sort-value">{selectedOptions.text}</span>
        <span className="icon icon-arrow-down" />
      </div>
      <div className="dropdown-menu">
        {sortingOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedOptions(item)}
            className={`select-item ${item == selectedOptions ? "active" : ""}`}
          >
            <span className="text-value-item">{item.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}
