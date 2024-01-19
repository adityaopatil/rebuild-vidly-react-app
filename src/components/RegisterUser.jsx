import React from "react";
import Input from "./common/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Joi from "joi-browser";
import { postUser } from "../services/userService";
import {
  validateForm,
  validateIndividualProperty,
} from "../services/validateForm";

const RegisterUser = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    name: "",
    isAdmin: false,
  });
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
    isAdmin: Joi.boolean().label("IsAdmin"),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const error = validateForm(account, schema);
    console.log(error);

    if (error) {
      setErrors(error);
      return;
    }

    try {
      const response = await postUser(account);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status >= 400) {
        const error = { ...errors };
        error.email = err.response.data;
        setErrors(error);
      }
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setAccount({ ...account, [name]: value });

    const error = { ...errors };
    const errorMessage = validateIndividualProperty(name, value, schema);
    if (errorMessage) {
      error[name] = errorMessage;
    } else delete error[name];

    setErrors(error);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          label="Username"
          value={account.email}
          onChange={handleOnChange}
          type="email"
          error={errors.email}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
          onChange={handleOnChange}
          type="password"
          error={errors.password}
        />
        <Input
          name="name"
          label="Name"
          value={account.name}
          onChange={handleOnChange}
          type="text"
          error={errors.name}
        />
        <Input
          name="isAdmin"
          label="IsAdmin"
          value={account.isAdmin}
          onChange={handleOnChange}
          type="text"
          error={errors.isAdmin}
        />
        <button
          disabled={validateForm(account, schema)}
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
