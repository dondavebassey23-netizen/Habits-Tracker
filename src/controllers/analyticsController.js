import { getUserAnalytics } from "../services/analyticsService.js";



export const getAnalyticsHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const analytics = await getUserAnalytics(userId);

    res.status(200).json({
      success: true,
      message: "Analytics fetched successfully",
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};
