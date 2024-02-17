import Joi from "joi";

export const userValidation = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().label("Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).max(100).required().label("Password"),
  confirm_password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .valid(Joi.ref("password"))
    .label("Password Confirm")
    .options({ messages: { "any.only": "{{#label}} not match" } }),
});
