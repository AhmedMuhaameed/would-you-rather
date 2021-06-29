import { LOGIN, LOGOUT } from "./types";

export function login(user) {
    return {
        type: LOGIN,
        payload: user,
    };
}

export function logout(user) {
    return {
        type: LOGOUT,
    };
}
