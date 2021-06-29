import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Form, Button, Image, ProgressBar } from "react-bootstrap";

class QuestionAsk extends Component {
    calcPercentage = (arr1,arr2)=>{
        return Math.round(arr1.length / (arr1.length + arr2.length) *100);
    }
    render() {
        const { answeredQuestions} = this.props;
        return (
            <div>
                {answeredQuestions.map((question) => (
                    <Card style={{ width: "60rem" }} key={question.id}>
                        <Card.Body>
                            <Card.Title>
                                <Image src={question.avatarURL} roundedCircle />
                                <span><b>{question.author}</b></span> asks Would you rather :
                            </Card.Title>
                            <label>{question.optionOne.text}</label>
                            <ProgressBar now={this.calcPercentage(question.optionOne.votes,question.optionTwo.votes)}  label={`${this.calcPercentage(question.optionOne.votes,question.optionTwo.votes)}%`}/>

                            <label>{question.optionTwo.text}</label>
                            <ProgressBar now={this.calcPercentage(question.optionTwo.votes,question.optionOne.votes)} label={`${this.calcPercentage(question.optionTwo.votes,question.optionOne.votes)}%`}/>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.usersReducer,
    questions: state.questionsReducer,
    authedUser: state.loginReducer,
});
export default connect(mapStateToProps)(QuestionAsk);
