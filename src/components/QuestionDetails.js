import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";
import { Card, Form, Button, Image, ProgressBar } from "react-bootstrap";
import sortBy from "sort-by";
import { handleAnswerQuestion } from "../actions/questions";

class QuestionDetails extends Component {
    state = {
        answer: "",
        questionId: "",
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            questionId: e.target.attributes.id.nodeValue,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const authedUser = this.props.authedUser.id;
        const { answer, questionId } = this.state;
        if (answer.length != 0) {
            this.props.dispatch(handleAnswerQuestion({ authedUser, questionId, answer }));
            this.props.history.push("/questions");
        } else {
            alert("Please Select Answer");
        }
    };
    formatQuestions = (questionsIds) =>
        questionsIds
            .map((questionId) => ({
                author: this.props.questions[questionId].author,
                id: questionId,
                optionOne: this.props.questions[questionId].optionOne,
                optionTwo: this.props.questions[questionId].optionTwo,
                timestamp: this.props.questions[questionId].timestamp,
                avatarURL: this.props.users[this.props.questions[questionId].author].avatarURL,
            }))
            .sort(sortBy("-timestamp"));

    calcPercentage = (arr1, arr2) => {
        return Math.round((arr1.length / (arr1.length + arr2.length)) * 100);
    };
    render() {
        const { questions ,authedUser,users } = this.props;
        let questionId = this.props.match.params.question_id;
        
        const unAnsweredQuestions = Object.keys(questions).filter(
            (questionId) =>
            !questions[questionId].optionOne.votes.includes(authedUser.id) &&
            !questions[questionId].optionTwo.votes.includes(authedUser.id)
            );
        return (
            <div>
                {unAnsweredQuestions.includes(this.props.match.params.question_id) ? (
                    <Card style={{ width: "60rem" }}>
                        <Card.Body>
                            <Card.Title>
                                <Image src={users[questions[questionId].author].avatarURL} roundedCircle />
                                <span>
                                    <b>{questions[questionId].author}</b>
                                </span>{" "}
                                asks Would you rather :
                            </Card.Title>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Check
                                    type="radio"
                                    label={questions[questionId].optionOne.text}
                                    id={questions[questionId].id}
                                    name="answer"
                                    value="optionOne"
                                    onChange={this.onChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label={questions[questionId].optionTwo.text}
                                    id={questions[questionId].id}
                                    name="answer"
                                    value="optionTwo"
                                    onChange={this.onChange}
                                />

                                <Button type="submit">Submit Question Answer</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                ) : (
                    <div>
                        <Card style={{ width: "60rem" }}>
                            <Card.Body>
                                <Card.Title>
                                    <Image src={users[questions[questionId].author].avatarURL} roundedCircle />
                                    <span>
                                        <b>{questions[questionId].author}</b>
                                    </span>{" "}
                                    asks Would you rather :
                                </Card.Title>
                                <label>{questions[questionId].optionOne.text}</label>
                                <ProgressBar
                                    now={this.calcPercentage(questions[questionId].optionOne.votes, questions[questionId].optionTwo.votes)}
                                    label={`${this.calcPercentage(questions[questionId].optionOne.votes, questions[questionId].optionTwo.votes)}%`}
                                />

                                <label>{questions[questionId].optionTwo.text}</label>
                                <ProgressBar
                                    now={this.calcPercentage(questions[questionId].optionTwo.votes, questions[questionId].optionOne.votes)}
                                    label={`${this.calcPercentage(questions[questionId].optionTwo.votes, questions[questionId].optionOne.votes)}%`}
                                />
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.usersReducer,
    questions: state.questionsReducer,
    authedUser: state.loginReducer,
});

export default connect(mapStateToProps)(QuestionDetails);
