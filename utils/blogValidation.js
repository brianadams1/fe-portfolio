import Joi from "joi";

const isBlogTitle = Joi.string().trim().max(255).required().label("Title")
const isBlogContent = Joi.string().min(3).required().label("Content")
// OBJECT VALIDATION
export const isBlog = Joi.object({
    title: isBlogTitle,
    content: isBlogContent,
    photos: Joi.array().items(Joi.number())
  });
