import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Form, Button, Image } from "react-bootstrap";
import { handleAnswerQuestion } from "../actions/questions";
class QuestionAsk extends Component {
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
        } else {
            alert("Please Select Answer");
        }
    };
    render() {
        const { id, avatarURL, author, optionOne, optionTwo } = this.props;
        return (
            <Card style={{ width: "60rem" }}>
                <Card.Body>
                    <Card.Title>
                        <Image src={avatarURL} roundedCircle />
                        <span><b>{author}</b></span> asks Would you rather :
                    </Card.Title>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Check type="radio" label={optionOne.text} id={id} name="answer" value="optionOne" onChange={this.onChange} />
                        <Form.Check type="radio" label={optionTwo.text} id={id} name="answer" value="optionTwo" onChange={this.onChange} />

                        <Button type="submit">Submit Question Answer</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.usersReducer,
    questions: state.questionsReducer,
    authedUser: state.loginReducer,
});

export default connect(mapStateToProps)(QuestionAsk);
