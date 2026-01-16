// import Notification from "../models/Notification.js";

// export const getNotifications = async (req, res, next) => {
//   try {
//     const notifications = await Notification.find({ user: req.user.id }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json({
//       success: true,
//       data: notifications,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const markAsRead = async (req, res, next) => {
//   try {
//     await Notification.findByIdAndUpdate(req.params.id, { read: true });

//     res.status(200).json({
//       success: true,
//       message: "Notification marked as read",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

import {
  getUserNotifications,
  markNotificationAsRead,
} from "../services/notificationService.js";

export const getNotificationsHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const notifications = await getUserNotifications(userId);

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsReadHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const notification = await markNotificationAsRead(id, userId);

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: {
        id: notification._id,
        isRead: notification.isRead,
      },
    });
  } catch (error) {
    next(error);
  }
};


