import { combineReducers, legacy_createStore } from "redux";
import { reducer as AuthenticationReducer } from "./authentication/reducers.js";
// import { reducer as UserFetchReducer } from "./UsersDataReducer/reducers.js"
import { reducer as taskFetchReducer} from "./TasksReducer/Reducers.js"

const rootReducer = combineReducers({
  AuthenticationReducer,
  taskFetchReducer,
//   UserFetchReducer
});

export const store = legacy_createStore(rootReducer);