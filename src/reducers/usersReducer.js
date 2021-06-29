import { GETUSERS, ADD_QUESTION_USER, ANSWER_QUESTION_USER } from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case GETUSERS:
            return {
                ...state,
                ...action.payload.users,
            };
        case ADD_QUESTION_USER:
            const authedUser = action.payload.authedUser;
            const questionId = action.payload.questionId;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: [...state[authedUser].questions, questionId],
                },
            };
        case ANSWER_QUESTION_USER:
            return {
                ...state,
                [action.payload.authedUser]: {
                    ...state[action.payload.authedUser],
                    answers: {
                        ...state[action.payload.authedUser].answers,
                        [action.payload.questionId]: action.payload.answer,
                    },
                },
            };
        default:
            return state;
    }
}
