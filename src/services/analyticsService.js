import Habit from "../models/Habit.js";
import Completion from "../models/Completion.js";
import { calculateStreak } from "./streakService.js";

export const getUserAnalytics = async (userId) => {
  const habits = await Habit.find({ user: userId });

  const analytics = [];

  for (const habit of habits) {
    const completions = await Completion.find({
      user: userId,
      habit: habit._id,
    }).sort({ date: 1 });

    const totalCompletions = completions.length;

    // Current streak (from streakService)
    const currentStreak = await calculateStreak(userId, habit._id);

    // Longest streak calculation
    let longestStreak = 0;
    let streak = 0;
    let lastDate = null;

    completions.forEach((c) => {
      const date = new Date(c.date);
      date.setHours(0, 0, 0, 0);

      if (!lastDate) {
        streak = 1;
      } else {
        const diffDays = (date - lastDate) / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          streak++;
        } else if (diffDays > 1) {
          streak = 1;
        }
      }

      if (streak > longestStreak) {
        longestStreak = streak;
      }

      lastDate = date;
    });

    analytics.push({
      habitId: habit._id,
      title: habit.title,
      frequency: habit.frequency,
      totalCompletions,
      currentStreak,
      longestStreak,
      createdAt: habit.createdAt,
    });
  }

  return analytics;
};
