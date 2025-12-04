import React, { useState } from "react";
import { updateTask } from "../api/fetchTasksAPI";
import { useTheme } from "../context/ThemeContext";

const EditTask = ({ closeModal, taskData, onTaskUpdated }) => {
  const { theme, toggleTheme } = useTheme();
  const [newTask, setNewTask] = useState(taskData); // pre-fill data

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updated = await updateTask(taskData.id, newTask);
      alert(`Task "${newTask.title}" Updated`);
      onTaskUpdated(updated);
      closeModal();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999]">
      {/* Background Blur */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>

      {/* Modal */}
      <div
        className={`relative w-96 rounded-lg p-6 shadow-xl transition-all ${
          theme === "light"
            ? "bg-white text-gray-900"
            : "bg-gray-900 text-gray-200"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Edit Task</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title */}
          <div className="text-left">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              className={`w-full rounded p-2 text-sm mt-1 outline-none border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-800"
                  : "bg-gray-800 border-gray-700 text-gray-200"
              }`}
              required
            />
          </div>

          {/* Description */}
          <div className="text-left">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              className={`w-full rounded p-2 text-sm mt-1 outline-none border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-800"
                  : "bg-gray-800 border-gray-700 text-gray-200"
              }`}
              required
            ></textarea>
          </div>

          {/* Status */}
          <div className="text-left">
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={newTask.status}
              onChange={handleChange}
              className={`w-full rounded p-2 text-sm mt-1 outline-none border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-800"
                  : "bg-gray-800 border-gray-700 text-gray-200"
              }`}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-4">

            {/* Update Button */}
            <div
              role="button"
              onClick={handleSubmit}
              className={`px-5 py-2 rounded-md font-semibold text-center transition-all
              ${
                theme === "light"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Update
            </div>

            {/* Cancel Button */}
            <div
              role="button"
              onClick={closeModal}
              className={`px-5 py-2 rounded-md font-semibold text-center transition-all
              ${
                theme === "light"
                  ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              Cancel
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;