import { GETUSERS, ADD_QUESTION_USER, ANSWER_QUESTION_USER } from "./types";

export function receiveUsers(users) {
    return {
        type: GETUSERS,
        payload: {users},
    };
}

export function AddQuestionUser({ authedUser, questionId }) {
    return {
        type: ADD_QUESTION_USER,
        payload: { authedUser, questionId },
    };
}

export function AnswerQuestionUser({ authedUser, questionId, answer }) {
    return {
        type: ANSWER_QUESTION_USER,
        payload: { answer, questionId, authedUser },
    };
}
