// src/services/streakService.js
import Completion from "../models/Completion.js";

export const calculateStreak = async (userId, habitId) => {
  const completions = await Completion.find({ user: userId, habit: habitId }).sort({ date: 1 });

  if (!completions.length) return 0;

  let streak = 0;
  let lastDate = null;

  for (const record of completions) {
    const currentDate = new Date(record.date);
    currentDate.setHours(0, 0, 0, 0); // normalize

    if (!lastDate) {
      streak = 1; // first completion
    } else {
      const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak++; // consecutive day
      } else if (diffDays > 1) {
        streak = 1; // reset streak
      }
      // diffDays === 0 => multiple completions same day, ignore
    }

    lastDate = currentDate;
  }

  return streak;
};
