import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import sortBy from "sort-by";
import Question from "./Question";

class Dashboard extends Component {
    state = {
        key: "",
    };

    handleChange = (e) => {
        this.setState({ key: e });
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
    render() {
        const { key } = this.state;
        const { questions } = this.props;
        const { authedUser } = this.props;

        const answeredQuestions = Object.keys(questions).filter(
            (questionId) =>
                questions[questionId].optionOne.votes.includes(authedUser.id) ||
                questions[questionId].optionTwo.votes.includes(authedUser.id)
        );
        const unAnsweredQuestions = Object.keys(questions).filter(
            (questionId) =>
                !questions[questionId].optionOne.votes.includes(authedUser.id) &&
                !questions[questionId].optionTwo.votes.includes(authedUser.id)
        );
        const answered = this.formatQuestions(answeredQuestions);
        return (
            <Tabs
                activeKey={this.state.key || "UNANSWERED_QUESTIONS"}
                onSelect={(k) => this.handleChange(k)}
                id="uncontrolled-tab-example"
                defaultActiveKey="UNANSWERED_QUESTIONS"
            >
                <Tab eventKey="UNANSWERED_QUESTIONS" title={`UNANSWERED QUESTIONS | ${unAnsweredQuestions.length}`}>
                    {unAnsweredQuestions &&
                        this.formatQuestions(unAnsweredQuestions).map((question) => <Question {...question} key={question.id} />)}
                </Tab>
                <Tab eventKey="ANSWERED_QUESTIONS" title={`ANSWERED QUESTIONS | ${answeredQuestions.length}`}>
                {answeredQuestions &&
                        this.formatQuestions(answeredQuestions).map((question) => <Question answeredQuestions={answered} {...question} key={question.id} />)}
                </Tab>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.usersReducer,
    questions: state.questionsReducer,
    authedUser: state.loginReducer,
});

export default connect(mapStateToProps)(Dashboard);
