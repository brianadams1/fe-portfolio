import Joi from "joi";

const isBlogTitle = Joi.string()
  .trim()
  .min(3)
  .max(255)
  .required()
  .label("Title");
const isBlogContent = Joi.string().trim().min(3).required().label("Content");
// OBJECT VALIDATION
export const isCreateBlog = Joi.object({
  title: isBlogTitle,
  content: isBlogContent,
});

export const isUpdateBlog = Joi.object({
  title: isBlogTitle,
  content: isBlogContent,
  photos: Joi.array().items(Joi.number()),
});
