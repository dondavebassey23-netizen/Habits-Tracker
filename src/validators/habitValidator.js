import Joi from "joi";

export const createHabitSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Habit title is required",
    "string.min": "Habit title must be at least 3 characters",
  }),

  description: Joi.string().max(300).allow("").optional(),

  frequency: Joi.string().valid("daily", "weekly", "custom").required().messages({
    "any.only": "Frequency must be daily, weekly, or custom",
    "string.empty": "Frequency is required",
  }),
});

export const updateHabitSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(300).allow("").optional(),
  frequency: Joi.string().valid("daily", "weekly", "custom").optional(),
});
