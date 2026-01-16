// src/services/completionService.js

import Completion from "../models/Completion.js";
import Habit from "../models/Habit.js";

export const markCompletion = async ({ habitId, userId }) => {
  // Ensure habit exists and belongs to user
  const habit = await Habit.findOne({ _id: habitId, user: userId });
  if (!habit) {
    const error = new Error("Habit not found");
    error.statusCode = 404;
    throw error;
  }

  // Normalize today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Prevent duplicate completion for same day
  const existing = await Completion.findOne({
    habit: habitId,
    user: userId,
    date: today,
  });

  if (existing) {
    const error = new Error("Habit already marked as completed today");
    error.statusCode = 400;
    throw error;
  }

  const completion = await Completion.create({
    habit: habitId,
    user: userId,
    date: today,
  });

  return completion;
};
