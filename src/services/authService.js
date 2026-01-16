import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async ({ fullName, email, phoneNo, password }) => {
  // Check if a user already exists with the same email OR phone number
  const existingUser = await User.findOne({
    $or: [{ email }, { phoneNo }],
  });

  if (existingUser) {
    const error = new Error("User with email or phone number already exists");
    error.statusCode = 400;
    throw error;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user (not verified yet)
  const user = await User.create({
    fullName,
    email,
    phoneNo,
    password: hashedPassword,
    isVerified: false,
  });

  // Generate email verification token
  const token = crypto.randomBytes(32).toString("hex");

  user.emailVerificationToken = token;
  user.emailVerificationExpires = Date.now() + 1000 * 60 * 60; // 1 hour
  await user.save();

  // Build verification link
  const verifyLink = `${process.env.BACKEND_URL}/api/auth/verify-email/${token}`;

  // Send verification email
  await sendEmail({
    to: user.email,
    subject: "Verify your Habit Tracker account",
    html: `
      <h2>Welcome to Habit Tracker 👋</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyLink}">Verify Email</a>
      <p>This link expires in 1 hour.</p>
    `,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 400;
    throw error;
  }

  // 🔐 BLOCK LOGIN IF NOT VERIFIED
  if (!user.isVerified) {
    const error = new Error("Please verify your email before logging in");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};
