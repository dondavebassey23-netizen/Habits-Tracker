import { markCompletion } from "../services/completionService.js";
import { calculateStreak } from "../services/streakService.js";

export const markCompletionHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { habitId } = req.body;

    const completion = await markCompletion({ habitId, userId });

    res.status(201).json({
      success: true,
      message: "Habit marked as completed",
      data: completion,
    });
  } catch (error) {
    next(error);
  }
};

export const getStreakHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { habitId } = req.params;

    const streak = await calculateStreak(userId, habitId);

    res.status(200).json({
      success: true,
      message: "Streak fetched successfully",
      data: { streak },
    });
  } catch (error) {
    next(error);
  }
};

