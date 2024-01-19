import React from "react";

const DropDownList = ({ label, name, value, onChange, error, optValue }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="form-control"
        aria-label="Default select example"
        value={value}
        onChange={onChange}
      >
        <option value=""></option>
        {optValue.map((o) => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDownList;
