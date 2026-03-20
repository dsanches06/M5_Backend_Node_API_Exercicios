import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import logger from "./middlewares/loggerMiddleware.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);

/* Iniciar o servidor */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ClickUp API em http://localhost:${PORT}`);
});
