import Joi from "joi";

export const isCreateProject = Joi.object({
  title: isString255.required().label("Title"),
  description: isText.required().label("Description"),
  startDate: Joi.date().less("now").required().label("Start Date"),
  endDate: Joi.date()
    .min(Joi.ref("startDate"))
    .less("now")
    .label("Start Date")
    .allow(null, ""),
  status: Joi.string()
    .valid("ON_PROGRESS", "MAINTENANCE", "COMPLETE")
    .label("Project Status"),
  url: isURI.label("URL").allow(null, ""),
  github: isURI.label("Github").allow(null, ""),
  gitlab: isURI.label("Github").allow(null, ""),
  company: isString100.label("Company").allow(null, ""),
  photos: Joi.array().items(Joi.number()),
  skills: Joi.array().items(Joi.number()),
});
