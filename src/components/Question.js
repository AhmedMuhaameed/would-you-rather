import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";
import { Card, Form, Button, Image, ProgressBar } from "react-bootstrap";

class Question extends Component {
    handleButtonClick(id) {
        this.props.history.push(`/questions/${id}`);
    }
    render() {
        const { id, avatarURL, author, optionOne, optionTwo } = this.props;
        return (
            <Card style={{ width: "60rem" }}>
                <Card.Body>
                    <Card.Title>
                        <Image src={avatarURL} roundedCircle />
                        <span>
                            <b>{author}</b>
                        </span>{" "}
                        asks Would you rather :
                    </Card.Title>
                    <p>{optionOne.text}</p>
                    <hr />
                    <p>{optionTwo.text}</p>
                    <Button onClick={() => this.handleButtonClick(id)}>View Question</Button>
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
export default withRouter(connect(mapStateToProps)(Question));
