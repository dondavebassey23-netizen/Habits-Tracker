import Joi from "joi";

export const completionSchema = Joi.object({
  habitId: Joi.string().required().messages({
    "string.empty": "habitId is required",
  }),
});
