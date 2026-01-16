import { registerUser, loginUser } from "../services/authService.js";

import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";


export const register = async (req, res, next) => {
  try {
    const { fullName, email, phoneNo, password } = req.body;

    const user = await registerUser({ fullName, email, phoneNo, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNo: user.phoneNo,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Welcome to Habit Tracker 🎉",
      html: `
        <h2>Welcome, ${user.fullName}!</h2>
        <p>Your account has been successfully verified. You can now start building great habits 🚀</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser({ email, password });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNo: user.phoneNo,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
