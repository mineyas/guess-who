import React from "react";

const RadioButtonGroup = ({ label, options, selectedOption, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="radio-container">
        {options.map((option) => (
          <label
            key={option}
            className={`radio-label ${
              selectedOption === option ? "bg-accent4 text-white" : ""
            }`}
          >
            <input
              type="radio"
              name={label}
              value={option}
              checked={selectedOption === option}
              onChange={() => onChange(label, option === "Yes")}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
