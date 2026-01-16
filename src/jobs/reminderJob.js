import cron from "node-cron";
import Habit from "../models/Habit.js";
import Completion from "../models/Completion.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

// Helper: normalize date
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// ==========================
// DAILY REMINDER (8AM)
// ==========================
cron.schedule("0 8 * * *", async () => {
  console.log("⏰ Running daily reminder job...");

  const users = await User.find();

  for (const user of users) {
    const habits = await Habit.find({ user: user._id });

    if (habits.length === 0) continue;

    await sendEmail({
      to: user.email,
      subject: "Daily Habit Reminder 💪",
      html: `<p>Hi ${user.fullName},</p>
             <p>This is your daily reminder to complete your habits today. Stay consistent!</p>`
    });
  }

  console.log("✅ Daily reminders sent");
});


// ==========================
// MISSED HABIT ALERT (9AM)
// ==========================
cron.schedule("0 9 * * *", async () => {
  console.log("⚠️ Running missed habit check...");

  const yesterday = normalizeDate(new Date(Date.now() - 86400000));

  const users = await User.find();

  for (const user of users) {
    const habits = await Habit.find({ user: user._id });

    for (const habit of habits) {
      const completed = await Completion.findOne({
        user: user._id,
        habit: habit._id,
        date: yesterday
      });

      if (!completed) {
        await sendEmail({
          to: user.email,
          subject: "You missed a habit 😕",
          html: `<p>Hi ${user.fullName},</p>
                 <p>You missed your habit "<b>${habit.title}</b>" yesterday. Let’s get back on track today!</p>`
        });
      }
    }
  }

  console.log("✅ Missed habit alerts sent");
});


// ==========================
// STREAK WARNING (7PM)
// ==========================
cron.schedule("0 19 * * *", async () => {
  console.log("🔥 Running streak warning job...");

  const today = normalizeDate(new Date());

  const users = await User.find();

  for (const user of users) {
    const habits = await Habit.find({ user: user._id });

    for (const habit of habits) {
      const completedToday = await Completion.findOne({
        user: user._id,
        habit: habit._id,
        date: today
      });

      if (!completedToday) {
        await sendEmail({
          to: user.email,
          subject: "Streak at Risk ⚠️",
          html: `<p>Hi ${user.fullName},</p>
                 <p>Your streak for "<b>${habit.title}</b>" is at risk. Complete it today to keep your streak alive!</p>`
        });
      }
    }
  }

  console.log("✅ Streak warnings sent");
});
