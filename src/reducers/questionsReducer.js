import { ADD_QUESTION, RECEIVE_QUESTIONS, ANSWER_QUESTION } from "../actions/types";

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.payload.questions,
            };
        case ADD_QUESTION:
            const { question } = action.payload;
            return {
                ...state,
                [question.id]: question,
            };
        case ANSWER_QUESTION:
            const { authedUser, questionId, answer } = action.payload;
            const selectedAnswer = state[questionId][answer];
            return {
                ...state,
                [questionId]: {
                    ...state[questionId],
                    [answer]: {
                        ...selectedAnswer,
                        votes: [...selectedAnswer.votes, authedUser],
                    },
                },
            };
        default:
            return state;
    }
}
