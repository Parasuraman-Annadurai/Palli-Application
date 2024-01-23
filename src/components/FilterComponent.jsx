import React, { useState } from "react";

const FilterComponent = ({ filter, applyFilter,setPopoverVisible }) => {
  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (fieldName, value) => {
    setFilterValues({ ...filterValues, [fieldName]: value });
  };

  const handleApplyFilter = () => {
    applyFilter(filterValues);
    setPopoverVisible(false)
  }


  const handleClearFilter = () => {
    applyFilter({...filterValues,...{}});
    setPopoverVisible(false)
  };
  return (
  <div className="filter-main-container">
      <div className="filter-container">
      <div>
        {filter.map((filterItem) => {
          switch (filterItem.filter_type) {
            case "CharFilter":
              return (
                <div key={filterItem.name}>
                  <label htmlFor={filterItem.name} className="filter-label">
                    {filterItem.label === null
                      ? filterItem.name
                      : filterItem.label}
                  </label>
                  <input
                    type="text"
                    id={filterItem.name}
                    placeholder={filterItem.name}
                    value={filterValues[filterItem.name] || ""}
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
                    value={filterValues[`${filterItem.name}_min`] || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        `${filterItem.name}_min`,
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="number"
                    id={`${filterItem.name}_max`}
                    placeholder={`Max ${filterItem.name}`}
                    value={filterValues[`${filterItem.name}_max`] || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        `${filterItem.name}_max`,
                        e.target.value
                      )
                    }
                  />
                </div>
              );
            case "ChoiceFilter":
              return (
                <div key={filterItem.name} className="choice-filter-container">
                  <label htmlFor={filterItem.name} className="filter-label">
                    {filterItem.label}
                  </label>
                  <select
                    id={filterItem.name}
                    value={filterValues[filterItem.name] ? filterValues[filterItem.name]: ""}
                    onChange={(e) =>
                      handleFilterChange(filterItem.name, e.target.value)
                    }
                  >
                    <option value="" disabled hidden>
                      {`Select ${filterItem.label}`}
                    </option>
                    <option value="all">All</option>
                    {filterItem.extra.choices.map((choice) => (
                      <option key={choice.key} value={choice.key}>
                        {choice.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
      <button onClick={handleApplyFilter} className="btn primary-medium">
        Apply
      </button>
      <button onClick={handleClearFilter} className="btn primary-default">
        Clear
      </button>
    </div>
  </div>
  );
};

export default FilterComponent;
