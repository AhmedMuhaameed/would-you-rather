import { _saveQuestion } from "../utils/_DATA";
import { saveQuestionAnswer } from "../utils/api";
import { AddQuestionUser, AnswerQuestionUser } from "./users";
import { ADD_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS } from "./types";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        payload: { questions },
    };
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        payload: { question },
    };
}

function answerQuestion({ authedUser, questionId, answer }) {
    return {
        type: ANSWER_QUESTION,
        payload: { authedUser, questionId, answer },
    };
}

export function handleAddQuestion({ firstAnswer, seconedAnswer, author }) {
    return (dispatch) => {
        return _saveQuestion({ firstAnswer, seconedAnswer, author }).then((question) => {
            dispatch(AddQuestionUser({ authedUser: author, questionId: question.id }));
            dispatch(addQuestion(question));
        });
    };
}

export function handleAnswerQuestion({ authedUser, questionId, answer }) {
    return (dispatch) => {
        return saveQuestionAnswer({ authedUser, questionId, answer }).then(() => {
            dispatch(AnswerQuestionUser({ authedUser, questionId, answer }));
            dispatch(answerQuestion({ authedUser, questionId, answer }));
        });
    };
}
