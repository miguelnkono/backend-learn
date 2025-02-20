import asyncWrapper from "../middlewares/async.middlewares.mjs";
import Task from "../models/task.models.mjs";
import { createCustomError } from "../errors/custom-error.errors.mjs";

// function to get all the taskes
// export const getTasks = async (req, res) => {
//   try {
//     // the method find({}) will return all the tasks in the database. It returns an array
//     const tasks = await Task.find({}).sort({ name: 1 });

//     // differents ways to send response to the user
//     // res.status(200).json({ tasks, amount: tasks.length });  // this res includes the specify the amount
//     res.status(200).json({ tasks });
//     // res.status(200).json({ success: true, data: { tasks } });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// function to create a task
// export const createTask = async (req, res) => {
//   try {
//     // we are getting the name and completed from the body of the request
//     const { name, completed } = req.body;
//     // the method create() function will create a task and store that in the database
//     const task = await Task.create({ name, completed });
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// function to get a task
// export const getTask = async (req, res) => {
//   try {
//     // getting the id of the task we want to get
//     const { id: taskID } = req.params;
//     // the method findById() will return only a single element
//     const task = await Task.findOne({ _id: taskID });
//     if (!task) {
//       // alwalys use the `return` key word
//       return res
//         .status(404)
//         .json({ message: `The task with id ${taskID} doesn't exist!` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(
      createCustomError(`The task with id ${taskID} doesn't exist!`, 404),
    );
  }
  res.status(200).json({ task });
});

// function to update a task
// export const updateTask = async (req, res) => {
//   // updating a task
//   try {
//     // getting the id of the task we want to update
//     const { id: taskID } = req.params;
//     // getting the name and completed from the body of the request
//     const { name, completed } = req.body;
//     // the method findByIdAndUpdate() will update a task
//     const task = await Task.findByIdAndUpdate(
//       { _id: taskID },
//       { name, completed },
//       {
//         new: true, // this will return the updated task
//         runValidators: true, // this will run the validators
//       },
//     );
//     if (!task) {
//       return res
//         .status(404)
//         .json({ message: `The task with id ${taskID} doesn't exist!` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const { name, completed } = req.body;
  const task = await Task.findByIdAndUpdate(
    { _id: taskID },
    { name, completed },
    { new: true, runValidators: true },
  );
  if (!task) {
    return next(
      createCustomError(`The task with id ${taskID} doesn't exist!`, 404),
    );
  }
  res.status(200).json({ task });
});

// function to delete a task
// export const deleteTask = async (req, res) => {
//   // deleting a task
//   try {
//     // getting the id of the task we want to delete
//     const { id: taskID } = req.params;
//     // the method findByIdAndDelete() will delete a task
//     const task = await Task.findByIdAndDelete({ _id: taskID });
//     if (!task) {
//       return res
//         .status(404)
//         .json({ message: `The task with id ${taskID} doesn't exist!` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });
  if (!task) {
    return next(
      createCustomError(`The task with id ${taskID} doesn't exist!`, 404),
    );
  }
  res.status(200).json({ task });
});
