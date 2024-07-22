import Joi from "joi";

const authSchema = Joi.object({
  email: Joi.string()
    .email()
    .message("Please provide a valid {{#label}}")
    .required(),
  password: Joi.string().alphanum().required(),
});

export default authSchema;
