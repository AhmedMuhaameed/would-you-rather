import { LOGIN ,LOGOUT} from "../actions/types";


export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN:
            const currentUser = action.payload;
            return currentUser;
        case LOGOUT:
            return {};
        default:
            return state;
    }
}
