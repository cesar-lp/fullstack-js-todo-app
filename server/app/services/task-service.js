const TaskModel = require('../models/task-schema.js')
const { ResourceNotFound } = require('../helpers/error');

const getAllTasks = async () => {
  return await TaskModel.find();
}

const createTask = async (task) => {
  const taskToSave = new TaskModel(task);
  return await taskToSave.save();
}

const updateTask = async (_id, task) => {
  const updatedTask = await TaskModel.findOneAndUpdate({ _id }, task, { new: true });

  if (!updatedTask) {
    throw new ResourceNotFound(`Task not found for id ${_id}`);
  }

  return updatedTask;
}

const deleteTask = async (_id) => {
  const deletedTask = await TaskModel.findOneAndDelete({ _id });

  if (!deletedTask) {
    throw new ResourceNotFound(`Task not found for id ${_id}`)
  }

  return deletedTask;
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};