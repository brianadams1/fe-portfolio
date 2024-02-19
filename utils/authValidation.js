import Joi from "joi";

const isEmail = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .max(100);
const isPassword = Joi.string().trim().min(6).max(100).required();

const isString100 = Joi.string().trim().min(3).max(100);

const loginValidation = Joi.object({
  email: isEmail.label("Email"),
  password: Joi.string().min(6).max(100).required().label("Password"),
});

const updateUserValidation = Joi.object({
  name: isString100.required().label("Name"),
  email: isEmail.label("Email"),
  old_password: isPassword.label("Current password"),
  password: isPassword.label("Password"),
  password_confirm: isPassword
    .valid(Joi.ref("password"))
    .label("Password Confirm")
    .options({ messages: { "any.only": "{{#label}} not match" } }),
});

export { loginValidation, updateUserValidation };
