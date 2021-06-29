import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";
import usersReducer from "./usersReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
    usersReducer,
    loginReducer,
    questionsReducer,
});

export default rootReducer;
