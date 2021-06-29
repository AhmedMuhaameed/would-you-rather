import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
class Login extends Component {
    state = {
        authedUser: "",
    };
    handleChange = (event) => {
        this.setState({ authedUser: event.target.value });
    };
    render() {
        const { classes, users } = this.props;
        const { authedUser } = this.state;
        return (
            <div className="containter">
                <Card border="primary" style={{ width: "18rem" }}>
                    <Card.Header>Would You Rather Game select one of these users to signup</Card.Header>
                    <Card.Body>
                        <Card.Title>Primary Card Title</Card.Title>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Select User
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
