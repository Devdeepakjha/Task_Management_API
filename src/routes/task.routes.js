import { Router } from "express";
import { tasks } from "../data.js";
import {
  getTasks,
  addTask,
  getTaskbyID,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

//get all tasks
router.get("/", getTasks);

//add a task
router.post("/", addTask);

//get one task
router.get("/:id", getTaskbyID);

//modifying or updating a task
router.patch("/:id", updateTask);

//DELETE
router.delete("/:id", deleteTask);

export default router;
