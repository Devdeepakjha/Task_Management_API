import { Router } from "express";
import { tasks } from "../data.js";

const router = Router();

//get all data's
router.get("/", (req, res) => {
  res.json({
    data: tasks,
  });
});

//add a task
router.post("/", (req, res) => {
  const { title } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  const task = {
    id: tasks.length + 1,
    title: title.trim(),
    completed: false,
  };

  tasks.push(task);

  res.status(201).json({
    data: task,
  });
});

//get one task
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task Not Found",
    });
  }

  res.json({
    data: task,
  });
});

//modifying or updating a task
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).josn({
      error: "Task Not Found",
    });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        error: "Title must be a non-empty string",
      });
    }
    task.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "Completed must be a boolean",
      });
    }
    task.completed = completed;
  }

  res.json({
    data: task,
  });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Invalid task ID",
    });
  }

  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  tasks.splice(index, 1);

  res.status(204).send();
});

export default router;
