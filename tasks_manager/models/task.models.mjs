import mongoose from "mongoose";

// Set up the structure of all our tasks
const taskSchema = new mongoose.Schema({
  name: {
    type: String, // the type of the name: string
    required: [true, "Please provide a name"], // the name is required
    trim: true, // the name should not have any white space
    maxlength: [255, "Name can not be more than 20 characters"], // the name should not be more than 20 characters
  },
  completed: {
    type: Boolean, // the type of the completed attribute: boolean
    default: false, // set up the default value: false
    required: true, // the completed is required
  },
});

// Create a model from the schema using the function model()
const Task = mongoose.model("Task", taskSchema);

export default Task;
