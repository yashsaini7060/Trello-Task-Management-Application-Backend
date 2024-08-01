import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import Task from '../models/task.model.js'
import AppError from '../utils/appError.js';


export const getAllTasks = asyncHandler( async (req, res, next) => {

  const userId = req.user.id;
  const tasks = await Task.find({userId})

  if (!tasks) {
    return next(
      new AppError('Task could not be feached, please try again', 400)
    );
  }

  res.status(201).json({
    success: true,
    message: 'All Tasks',
    tasks
  });

})



export const createTask = asyncHandler( async (req, res, next) => {
  console.log("here")
  console.log(req.body)
  const{title, description, status, priority, deadline} = req.body

  const userId = req.user.id;
  
  if (!title || !status|| !userId ) {
    return next(new AppError('All fields are required', 400));
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    deadline,
    userId
  });

  if (!task) {
    return next(
      new AppError('Task could not be created, please try again', 400)
    );
  }

  await task.save();

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    task
  });

})



export const updateTask = asyncHandler(async (req, res, next) => {

  const id = req.params.id;

  const task = await Task.findById(id)

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      $set: req.body, // This will only update the fields which are present
    },
    {
      runValidators: true, // This will run the validation checks on the new data
    }
  )


  if(!updateTask){
    return next(new AppError('Invalid task id or task not found.', 400));

  }

 // Sending the response after success
 res.status(200).json({
  success: true,
  message: 'Task updated successfully',
  updatedTask
});
})