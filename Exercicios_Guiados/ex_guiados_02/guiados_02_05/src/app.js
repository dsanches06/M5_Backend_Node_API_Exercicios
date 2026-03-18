import express from "express";
import logger from "./middlewares/loggerMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(logger);

/* router */
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
