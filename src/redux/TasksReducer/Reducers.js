import { TASKS_FETCH_REQUEST, TASKS_FETCH_SUCCESS, TASKS_FETCH_FAILURE } from "../actionTypes";

const initialState = {
  tasks: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TASKS_FETCH_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case TASKS_FETCH_SUCCESS:
      return { ...state, isLoading: false, tasks: payload };
    case TASKS_FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
