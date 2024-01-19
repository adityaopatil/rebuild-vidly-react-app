import { useEffect, useRef, useState } from "react";
import Joi from "joi-browser";
import Input from "./common/Input";
import { login } from "../services/authService";

const FormLogin = () => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);

  const schema = {
    email: Joi.string().required().min(3).label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const error = validate();
    if (error) {
      setErrors(error);
      return;
    }

    try {
      const res = await login(account.email, account.password);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const error = { ...errors };
        error.email = err.response.data;
        setErrors(error);
      }
    }
  };

  const validate = () => {
    const { error } = Joi.validate(account, schema, { abortEarly: false });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schemaProp = { [name]: schema[name] };
    // console.log(schema[name]);
    // console.log(schemaProp);
    const { error } = Joi.validate(obj, schemaProp);

    return error ? error.details[0].message : null;
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setAccount({ ...account, [name]: value });

    const error = { ...errors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) {
      error[name] = errorMessage;
    } else delete error[name];

    setErrors(error);
  };

  return (
    <div className="FormLogin">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          nameRef={nameRef}
          label="Username"
          value={account.email}
          onChange={handleOnChange}
          type="email"
          error={errors.email}
        />
        <Input
          name="password"
          nameRef={nameRef}
          label="Password"
          value={account.password}
          onChange={handleOnChange}
          type="password"
          error={errors.password}
        />
        <button disabled={validate()} type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
