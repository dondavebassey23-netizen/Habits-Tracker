import Notification from "../models/Notification.js";

export const createNotification = async ({ userId, title, message, type = "system" }) => {
  const notification = await Notification.create({
    user: userId,
    title,
    message,
    type,
  });

  return notification;
};

export const getUserNotifications = async (userId) => {
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
  return notifications;
};

export const markNotificationAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }

  return notification;
};
