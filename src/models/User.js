import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNo: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\+[1-9]\d{9,14}$/,
        "Phone number must be in international format e.g. +14155552671",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
    "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
  ],     
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

      emailVerificationToken: {
      type: String,
    },

    emailVerificationExpires: {
      type: Date,
    },

    reminderTime: {
  type: String, // "08:00", "21:30"
  default: "08:00"
    },

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

