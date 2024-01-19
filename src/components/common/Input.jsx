import React from "react";

const Input = ({ name, label, value, onChange, nameRef, type, error }) => {
  const autoFocus = name === "email";
  return (
    <>
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <input
          onChange={onChange}
          value={value}
          ref={nameRef}
          {...(autoFocus && { autoFocus: true })} //So if name is username we set it to true
          type={type}
          className="form-control"
          name={name}
          id={name}
          error={error}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};

export default Input;
