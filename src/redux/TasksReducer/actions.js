import { TASKS_FETCH_REQUEST, TASKS_FETCH_SUCCESS, TASKS_FETCH_FAILURE } from "../actionTypes";

export const fetchTasksRequest = () => {
  return { type: TASKS_FETCH_REQUEST }
};

export const fetchTasksSuccess = (payload) => {
  return { type: TASKS_FETCH_SUCCESS, payload };
};

export const fetchTasksFailure = (error) => {
  return { type: TASKS_FETCH_FAILURE, payload: error };
};
