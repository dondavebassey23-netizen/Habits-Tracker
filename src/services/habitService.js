import Habit from "../models/Habit.js";
import Completion from "../models/Completion.js";
import Notification from "../models/Notification.js";

export const createHabit = async ({ title, description, frequency, userId }) => {
  const habit = await Habit.create({
    title,
    description,
    frequency,
    user: userId,
  });

  // 🔔 Create notification
  await Notification.create({
    user: userId,
    title: "Habit Created 🎯",
    message: `Your habit "${title}" was created successfully.`,
  });

  return habit;
};

export const getUserHabits = async (userId) => {
  const habits = await Habit.find({ user: userId, isActive: true }).sort({
    createdAt: -1,
  });

  return habits;
};

export const updateHabit = async (habitId, userId, updateData) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: habitId, user: userId },
    updateData,
    { new: true }
  );

  if (!habit) {
    const error = new Error("Habit not found");
    error.statusCode = 404;
    throw error;
  }

  return habit;
};

export const deleteHabit = async (habitId, userId) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: habitId, user: userId },
    { isActive: false },
    { new: true }
  );

  if (!habit) {
    const error = new Error("Habit not found");
    error.statusCode = 404;
    throw error;
  }

  // 🔔 Create notification
  await Notification.create({
    user: userId,
    title: "Habit Deleted 🗑️",
    message: `Your habit "${habit.title}" was deleted.`,
  });

  return habit;
};

export const getPendingHabitsForToday = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const habits = await Habit.find({ user: userId, isActive: true });

  const completedToday = await Completion.find({
    user: userId,
    completedAt: { $gte: today },
  }).select("habit");

  const completedHabitIds = completedToday.map((c) => c.habit.toString());

  const pendingHabits = habits.filter(
    (habit) => !completedHabitIds.includes(habit._id.toString())
  );

  // 🔔 Create notification if there are pending habits
  if (pendingHabits.length > 0) {
    await Notification.create({
      user: userId,
      title: "Pending Habits ⏰",
      message: `You have ${pendingHabits.length} habit(s) still pending today. Keep going! 💪`,
    });
  }

  return pendingHabits;
};
