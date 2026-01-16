import {
  createHabit,
  getUserHabits,
  updateHabit,
  deleteHabit,
} from "../services/habitService.js";

export const createHabitHandler = async (req, res, next) => {
  try {
    const { title, description, frequency } = req.body;

    const habit = await createHabit({
      title,
      description,
      frequency,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Habit created successfully",
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

export const getHabitsHandler = async (req, res, next) => {
  try {
    const habits = await getUserHabits(req.user._id);

    res.status(200).json({
      success: true,
      data: habits,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHabitHandler = async (req, res, next) => {
  try {
    const habit = await updateHabit(
      req.params.id,
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Habit updated successfully",
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHabitHandler = async (req, res, next) => {
  try {
    const habit = await deleteHabit(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};
