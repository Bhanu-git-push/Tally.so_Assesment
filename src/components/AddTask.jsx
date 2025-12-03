import { useState } from "react";
import axios from "axios";
import { addTask } from "../api/fetchTasksAPI";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "../context/ThemeContext";

const AddTask = ({ closeModal, onTaskAdded }) => {
  const { theme, toggleTheme } = useTheme();
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    date: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addTask(newTask);
      alert(`Task "${newTask.title}" has been added successfully!`);
      onTaskAdded(res.data); // notify parent to refresh/add
      closeModal(); // close modal
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999]">
      {/* Background blur */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/50"></div>

      {/* Modal */}
      <div
        className={`relative rounded-xl p-6 w-96 shadow-2xl z-10 transition-all duration-300
          ${
            theme === "light"
              ? "bg-white text-black"
              : "bg-gray-900 text-white shadow-[0_0_25px_rgba(0,0,0,0.8)]"
          }
        `}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title */}
          <div className="text-left">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              className={`w-full rounded p-2 text-sm outline-none border
                ${
                  theme === "light"
                    ? "bg-white border-gray-300"
                    : "bg-gray-800 border-gray-700 text-white"
                }
              `}
              required
            />
          </div>

          {/* Description */}
          <div className="text-left">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              className={`w-full rounded p-2 text-sm outline-none border h-20
                ${
                  theme === "light"
                    ? "bg-white border-gray-300"
                    : "bg-gray-800 border-gray-700 text-white"
                }
              `}
              required
            ></textarea>
          </div>

          {/* Created Date */}
          <div className="text-left">
            <label className="block text-sm font-medium mb-1">Created Date</label>
            <input
              type="date"
              name="date"
              value={newTask.date}
              onChange={handleChange}
              className={`w-full rounded p-2 text-sm outline-none border
                ${
                  theme === "light"
                    ? "bg-white border-gray-300"
                    : "bg-gray-800 border-gray-700 text-white"
                }
              `}
              required
            />
          </div>

          {/* Status */}
          <div className="text-left">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={newTask.status}
              onChange={handleChange}
              className={`w-full rounded p-2 text-sm outline-none border
                ${
                  theme === "light"
                    ? "bg-white border-gray-300"
                    : "bg-gray-800 border-gray-700 text-white"
                }
              `}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-4">
            {/* Add Task Button */}
            <div
              role="button"
              onClick={handleSubmit}
              className={`px-4 py-2 rounded font-semibold transition-all duration-300 cursor-pointer
                ${
                  theme === "light"
                    ? "bg-orange-300 text-black hover:bg-orange-400"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }
              `}
            >
              Add Task
            </div>

            {/* Cancel Button */}
            <div
              role="button"
              onClick={closeModal}
              className={`px-4 py-2 rounded font-semibold transition-all duration-300 cursor-pointer
                ${
                  theme === "light"
                    ? "bg-gray-200 text-black hover:bg-gray-300"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }
              `}
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
