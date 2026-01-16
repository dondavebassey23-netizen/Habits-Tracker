import { getPendingHabitsForToday } from "../services/habitService.js";

export const getTodayReminders = async (req, res, next) => {
  try {
    const pendingHabits = await getPendingHabitsForToday(req.user.id);

    res.status(200).json({
      success: true,
      data: pendingHabits,
    });
  } catch (error) {
    next(error);
  }
};
