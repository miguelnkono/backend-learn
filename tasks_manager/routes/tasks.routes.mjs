import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/tasks.controllers.mjs";

const router = Router();

router.route("/").get(getTasks);
router.route("/:id").get(getTask);
router.route("/").post(createTask);
router.route("/:id").patch(updateTask);
router.route("/:id").delete(deleteTask);

export default router;
