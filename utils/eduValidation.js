import Joi from "joi";

const maxYear = new Date().getFullYear();
const isString100 = Joi.string().trim().min(3).max(100);
const isYear = Joi.number().positive().max(maxYear);

export const isEducation = Joi.object({
  institutionName: isString100.required().label("Institution Name"),
  startYear: isYear.required().label("Start Year"),
  endYear: isYear.min(Joi.ref("startYear")).label("End Year").allow(null),
  major: Joi.string().trim().label("Major").allow(null, ""),
  degree: Joi.string().trim().label("Degree").allow(null, ""),
});
