import Joi from "joi";

const isString100 = Joi.string().trim().min(3).max(100)
const isYear = Joi.number().positive().max(maxYear)

export const isUpdateEdu = Joi.object({
    institutionName: isString100.required().label("Institution Name"),
    startYear: isYear.required().label("Start Year"),
    endYear: isYear.label("End Year").allow(null, ""),
    major: Joi.string().trim().label("Major").allow(null, ""),
    degree: Joi.string().trim().label("Degree").allow(null, ""),
  });