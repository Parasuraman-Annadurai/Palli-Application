import React, { useState, useEffect } from "react";
import "./UnifiedFilterComponent.css"; // Import the CSS file

const UnifiedFilterComponent = ({ filter }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (fieldName, value) => {
    // Implement your logic to handle filter changes
  };

  return (
    <div className="filter-container">
      <div
        className={`filter-title ${showFilters ? "active" : ""}`}
        onClick={() => setShowFilters(!showFilters)}
      >
        Show Filters
      </div>
      <div className={`filter-dropdown ${showFilters ? "active" : ""}`}>
        {filter.map((filterItem) => {
          console.log(filterItem);

          switch (filterItem.filter_type) {
            case "CharFilter":
              return (
                <div key={filterItem.name}>
                  <label htmlFor={filterItem.name} className="filter-label">
                    {filterItem.label === null ? filterItem.name : filterItem.label}
                  </label>
                  <input
                    type="text"
                    id={filterItem.name}
                    placeholder={filterItem.name}
                    value={""} // You might want to set this to a state variable
                    onChange={(e) =>
                      handleFilterChange(filterItem.name, e.target.value)
                    }
                  />
                </div>
              );
            case "RangeFilter":
              return (
                <div key={filterItem.name}>
                  <label htmlFor={filterItem.name} className="filter-label">
                    {filterItem.label}
                  </label>
                  <input
                    type="number"
                    id={filterItem.name}
                    placeholder={`Min ${filterItem.name}`}
                    value={""} // You might want to set this to a state variable
                    onChange={(e) =>
                      handleFilterChange(`${filterItem.name}_min`, e.target.value)
                    }
                  />
                  <input
                    type="number"
                    id={`${filterItem.name}_max`}
                    placeholder={`Max ${filterItem.name}`}
                    value={""} // You might want to set this to a state variable
                    onChange={(e) =>
                      handleFilterChange(`${filterItem.name}_max`, e.target.value)
                    }
                  />
                </div>
              );
            // Add more cases for other filter types if needed
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default UnifiedFilterComponent;
