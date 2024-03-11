import Joi from "joi";

const isEmail = Joi.string()
  .email({ tlds: { allow: false } })
  .max(100);
const isPassword = Joi.string().trim().min(6).max(100);

const isString100 = Joi.string().min(6).max(25).trim();

const loginValidation = Joi.object({
  email: isEmail.label("Email"),
  password: Joi.string().min(6).max(100).required().label("Password"),
});

const updateUserValidation = Joi.object({
  name: isString100.label("Name").replace(/\W+/g, " "),
  email: isEmail.label("Email"),
  old_password: isPassword.label("Old password"),
  password: isPassword.label("New Password"),
  password_confirm: isPassword
    .valid(Joi.ref("password"))
    .label("Confirm New Password")
    .options({ messages: { "any.only": "{{#label}} not match" } }),
});

const createUserValidation = Joi.object({
  name: isString100.required().label("Name").replace(/\W+/g, " "),
  email: isEmail.required().label("Email"),
  password: isPassword.required().label("New Password"),
  password_confirm: isPassword
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm New Password")
    .options({ messages: { "any.only": "{{#label}} not match" } }),
});

export { loginValidation, updateUserValidation, createUserValidation };
