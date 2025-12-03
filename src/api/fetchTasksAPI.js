import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

// GET all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST a new task
export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// PUT (update a task)
export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data;
};

// DELETE a task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};