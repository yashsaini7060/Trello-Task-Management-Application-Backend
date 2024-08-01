import { Router } from "express";

import { isLoggedIn } from "../middlewares/auth.middleware.js";

import { getAllTasks, createTask, updateTask } from "../controllers/task.controller.js";

const router = Router();

router  
  .route('/')
  .get(isLoggedIn, getAllTasks)
  .post( isLoggedIn, createTask)


router
  .route('/:id')
  .post(isLoggedIn, updateTask)


export default router;
