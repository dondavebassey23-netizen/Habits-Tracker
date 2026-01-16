import User from "../models/User.js";

export const updateReminderTime = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { reminderTime } = req.body;

    if (!reminderTime) {
      const error = new Error("Reminder time is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { reminderTime },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reminder time updated successfully",
      data: {
        reminderTime: user.reminderTime,
      },
    });
  } catch (error) {
    next(error);
  }
};
