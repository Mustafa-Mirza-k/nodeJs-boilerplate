import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z\s'-]+$/)
    .message("{{#label}} should contains only characters")
    .min(3)
    .message("{{#label}} should contains atleast 3 characters")
    .max(30)
    .required(),

  email: Joi.string()
    .email()
    .message("Please provide a valid {{#label}}")
    .required(),
  password: Joi.string().alphanum().min(3).max(30).required(),
});

export default userSchema;
