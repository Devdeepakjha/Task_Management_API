import express from "express";
import taskRoutes from "./routes/task.routes.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Task API is running",
  });
});

//Routes
app.use("/api/v1/tasks", taskRoutes);

export default app;
