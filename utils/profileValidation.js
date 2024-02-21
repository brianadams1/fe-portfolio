import Joi from "joi";
import { isString100, isText, isURI, isEmail } from "./mainValidation.js";

export const isUpdateProfile = Joi.object({
  email: isEmail.label("Email"),
  firstName: isString100.label("Firstname"),
  lastName: isString100.label("Lastname"),
  dob: Joi.date().less("now").label("Date Of Birth"),
  address: isText.label("Address"),
  city: isString100.label("City"),
  country: isString100.label("Country"),
  job: isString100.label("Job"),
  phone: isString100.label("Phone"),
  bio: isText.label("Bio").allow(null, ""),
  website: isURI.label("Website").allow(null, ""),
  github: isURI.label("Gihub").allow(null, ""),
  gitlab: isURI.label("Gitlab").allow(null, ""),
  instagram: isURI.label("Instagram").allow(null, ""),
  facebook: isURI.label("Facebook").allow(null, ""),
  twitter: isURI.label("Twitter").allow(null, ""),
  linkedin: isURI.label("LinkedIn").allow(null, ""),
  discord: isURI.label("Discord").allow(null, ""),
});
