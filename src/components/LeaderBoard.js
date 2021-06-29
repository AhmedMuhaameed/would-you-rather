import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, ListGroup } from "react-bootstrap";

class LeaderBoard extends Component {
    render() {
        const users = Object.values(this.props.users);
        users.sort((a, b) =>
            (Object.keys(a.answers).length + a.questions.length) < (Object.keys(b.answers).length + b.questions.length)
                ? 1
                : (Object.keys(a.answers).length + a.questions.length) > (Object.keys(b.answers).length + b.questions.length)
                ? -1
                : 0
        );
        return (
            <ListGroup >
                {users.map((user) => (
                    <Card key={user.id} >
                        <Card.Img variant="top" src={user.avatarURL}  style={{ width: '18rem' }}/>
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>Answerd questions: {Object.keys(user.answers).length}</Card.Text>
                            <Card.Text>Created questions: {user.questions.length}</Card.Text>
                            <Card.Text>Score: {Object.keys(user.answers).length + user.questions.length }</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </ListGroup>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.usersReducer,
    authedUser: state.loginReducer,
});

export default connect(mapStateToProps)(LeaderBoard);
