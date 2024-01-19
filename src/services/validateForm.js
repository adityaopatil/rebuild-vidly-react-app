import Joi from "joi-browser";

export function validateForm(data, schema) {
  const { error } = Joi.validate(data, schema, { abortEarly: false });

  if (!error) return null;

  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }

  return errors;
}

export function validateIndividualProperty(name, value, schema) {
  const obj = { [name]: value };
  const schemaProp = { [name]: schema[name] };
  const { error } = Joi.validate(obj, schemaProp);

  return error ? error.details[0].message : null;
}
