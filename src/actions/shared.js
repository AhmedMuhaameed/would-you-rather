import { getInitialData } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { login,logout } from "./login";
export function handleInitialData() {
    return (dispatch) => {
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        });
    };
}

export function handleLogin(currentUser) {
    return (dispatch) => {
        return getInitialData().then(({ users }) => {
            const current = Object.values(users).find((x) => x.id === currentUser.id);
            if (current) dispatch(login(current));
            else {
                return "User not found";
            }
        });
    };
}

export function handleLogout() {
    return (dispatch) => {
        return dispatch(logout());
    };
}
