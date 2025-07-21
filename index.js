require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const healthProfileRoutes = require("./src/routes/userHealthProfileRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const mealLogRoutes = require("./src/routes/mealLogRoutes");
const goalRoutes = require("./src/routes/goalRoutes");
const { SERVER_PORT } = require("./src/config/allEnv");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Initialize AdminJS dynamically
    const AdminJS = (await import("adminjs")).default;
    const AdminJSExpress = (await import("@adminjs/express")).default;
    const adminOptions = (await import("./src/admin/admin.config.js")).default;

    const admin = new AdminJS(adminOptions);
    const adminRouter = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter);

    app.get("/", (req, res) => res.json({ message: "It's working!" }));

    app.use("/api/auth", authRoutes);
    app.use("/api/healthProfile", healthProfileRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/meals", mealLogRoutes);
    app.use("/api/goals", goalRoutes);

    const PORT = SERVER_PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`🛠 AdminJS available at http://localhost:${PORT}${admin.options.rootPath}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
