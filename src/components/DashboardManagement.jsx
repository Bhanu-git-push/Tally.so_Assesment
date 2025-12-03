import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
} from "../redux/TasksReducer/actions";
import { getTasks, deleteTask } from "../api/fetchTasksAPI";

const DashboardManagement = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((state) => state.AuthenticationReducer);
  const { tasks, isLoading, isError } = useSelector(
    (state) => state.taskFetchReducer
  );

  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const tasksPerPage = 5;
  const safeTasks = tasks || [];
  const totalPages = Math.ceil(safeTasks.length / tasksPerPage);

  const fetchData = async () => {
    dispatch(fetchTasksRequest());
    try {
      const data = await getTasks();
      dispatch(fetchTasksSuccess(data));
    } catch (error) {
      dispatch(fetchTasksFailure(error));
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAccordion = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditTaskModal(true);
  };

  const handleTaskUpdated = async () => {
    setEditTaskModal(false);
    setSelectedTask(null);
    await fetchData();
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      const updatedTasks = safeTasks.filter((task) => task.id !== id);
      dispatch(fetchTasksSuccess(updatedTasks));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const calculateDeadline = (createdDate) => {
    if (!createdDate) return null;
    const date = new Date(createdDate);
    date.setDate(date.getDate() + 14);
    return date.toISOString().split("T")[0];
  };

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = safeTasks.slice(indexOfFirstTask, indexOfLastTask);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleShowAllToggle = () => {
    setShowAll((prev) => !prev);
    if (showAll) setCurrentPage(1); // Reset pagination when switching back
  };

  if (!isAuth) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme === "light" ? "bg-gray-100" : "bg-black"
        }`}
      >
        <p className="text-red-500 font-bold text-lg">
          Please log in to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-4 min-h-screen ${
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <div
          role="button"
          onClick={() => setShowAddModal(true)}
          className={`font-bold py-2 px-4 rounded ${
            theme === "light"
              ? "bg-orange-300 text-black"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Add Task
        </div>
      </div>

      {/* Task List */}
      <div className="flex flex-col items-center space-y-2">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <TailSpin height={50} width={50} color="#4f46e5" />
          </div>
        )}

        {isError && (
          <p className="text-red-400 text-center font-semibold py-4">
            Failed to load tasks. Please try again.
          </p>
        )}

        {!isLoading && !isError && safeTasks.length === 0 && (
          <p className="text-gray-400 text-center py-4">No tasks available.</p>
        )}

        {!isLoading &&
          !isError &&
          (showAll ? safeTasks : currentTasks).map((task, index) => {
            const displayIndex = showAll
              ? index + 1
              : (currentPage - 1) * tasksPerPage + (index + 1);
            const deadlineDate = calculateDeadline(task.date);

            return (
              <div
                key={task.id}
                className={`w-1/2 rounded-md overflow-hidden transition-shadow duration-300 ${
                  theme === "light"
                    ? "bg-white shadow-lg hover:shadow-2xl"
                    : "bg-gray-800 shadow-[0_10px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
                }`}
              >
                {/* Accordion Button */}
                <div
                  role="button"
                  onClick={() => toggleAccordion(task.id)}
                  className={`w-full flex justify-between items-center p-2.5 rounded-md transition-all duration-300 cursor-pointer ${
                    theme === "light"
                      ? "bg-[#f0dde1] text-black hover:bg-[#e2c7ce]"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                >
                  <div className="flex flex-col text-left leading-tight">
                    <div className="flex gap-2 items-center">
                      <h4 className="text-sm font-medium">{displayIndex}.</h4>
                      <h4 className="text-sm font-semibold">{task.title}</h4>
                    </div>
                    <p
                      className={`text-xs ${
                        theme === "light" ? "text-gray-900" : "text-gray-300"
                      }`}
                    >
                      Created on: {task.date}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded min-w-[100px] text-center ${
                      theme === "light"
                        ? task.status.toLowerCase() === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        : task.status.toLowerCase() === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden text-left ${
                    openAccordionId === task.id
                      ? "max-h-[500px] opacity-100 scale-y-100 p-3"
                      : "max-h-0 opacity-0 scale-y-95 p-0"
                  }`}
                >
                  <label className="block text-sm font-medium mb-1">
                    Description:
                  </label>
                  <textarea
                    readOnly
                    value={task.description}
                    className={`w-full h-16 border rounded p-2 text-sm ${
                      theme === "light"
                        ? "bg-white text-black border-gray-300"
                        : "bg-gray-800 text-white border-gray-600"
                    }`}
                  />

                  <div className="flex flex-row items-center justify-between mt-2">
                    <label className="block text-sm font-medium mb-1">
                      Dead-line:{" "}
                      <span className="text-sm font-semibold">
                        {deadlineDate || "N/A"} (14 days after creation)
                      </span>
                    </label>

                    <div className="flex gap-2">
                      <div
                        role="button"
                        onClick={() => handleEditTask(task)}
                        className="w-[90px] text-center bg-yellow-500 text-white text-sm rounded py-1 hover:bg-yellow-600"
                      >
                        Edit
                      </div>

                      <div
                        role="button"
                        onClick={() => {
                          if (
                            user &&
                            (user.firstName === "Admin1" ||
                              user.firstName === "Admin2" ||
                            user.firstName === "Admin2")
                          ) {
                            handleDeleteTask(task.id);
                          }
                        }}
                        className={`w-[90px] text-center text-sm rounded py-1 transition-colors duration-300 ${
                          user &&
                          (user.firstName === "Admin1" ||
                            user.firstName === "Admin3" ||
                          user.firstName === "Admin3")
                            ? `${
                                theme === "light"
                                  ? "bg-red-500 text-white hover:bg-red-600"
                                  : "bg-red-600 text-white hover:bg-red-700"
                              } cursor-pointer`
                            : `${
                                theme === "light"
                                  ? "bg-gray-200 text-gray-400"
                                  : "bg-gray-700 text-gray-500"
                              } cursor-not-allowed`
                        }`}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Pagination */}
      {!showAll && (
        <div className="flex justify-center mt-4 gap-3">
          <div
            role="button"
            onClick={prevPage}
            className={`px-3 py-1 font-medium rounded cursor-pointer transition-colors duration-300 ${
              currentPage === 1 ||
              isLoading ||
              isError ||
              safeTasks.length === 0
                ? theme === "light"
                  ? "bg-orange-200 text-orange-500 cursor-not-allowed"
                  : "bg-blue-700 text-blue-300 cursor-not-allowed"
                : theme === "light"
                ? "bg-orange-300 text-black hover:bg-orange-400"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev
          </div>

          <span
            className={`px-3 py-1 font-bold rounded ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {isLoading || isError || safeTasks.length === 0 ? 0 : currentPage}
          </span>

          <div
            role="button"
            onClick={nextPage}
            className={`px-3 py-1 font-medium rounded cursor-pointer transition-colors duration-300 ${
              currentPage === totalPages ||
              isLoading ||
              isError ||
              safeTasks.length === 0
                ? theme === "light"
                  ? "bg-orange-200 text-orange-500 cursor-not-allowed"
                  : "bg-blue-700 text-blue-300 cursor-not-allowed"
                : theme === "light"
                ? "bg-orange-300 text-black hover:bg-orange-400"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </div>
        </div>
      )}

      {/* Show All / Pagination Toggle */}
      <div
        role="button"
        onClick={handleShowAllToggle}
        className={`flex items-center justify-center w-32 px-2 py-2 mt-4 rounded text-center font-medium transition-colors duration-300 mx-auto ${
          theme === "light"
            ? showAll
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
            : showAll
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {showAll ? "Show Pagination" : "Show All Tasks"}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddTask
          closeModal={() => setShowAddModal(false)}
          onTaskAdded={fetchData}
        />
      )}

      {editTaskModal && (
        <EditTask
          closeModal={() => {
            setEditTaskModal(false);
            setSelectedTask(null);
          }}
          taskData={selectedTask}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default DashboardManagement;
