import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { handleAddQuestion } from "../actions/questions";
import LoadingOverlay from "react-loading-overlay";

class NewQuestion extends Component {
    state = {
        optionOne: "",
        optionTwo: "",
        loading: true,
    };
    componentDidMount() {
        this.setState({ loading: false });
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const author = this.props.authedUser.id;
        const firstAnswer = this.state.optionOne;
        const seconedAnswer = this.state.optionTwo;
        if (this.state.optionOne.length !== 0 || this.state.optionTwo.length !== 0) {
            this.props.history.push("/questions");
            this.props.dispatch(handleAddQuestion({ firstAnswer, seconedAnswer, author }));
        } else {
            alert("Please Enter answers of the question");
        }
    };
    render() {
        return (
            <LoadingOverlay active={this.state.loading} spinner text="please wait..">
                <Form onSubmit={this.onSubmit} className="add-form">
                    <Form.Group>
                        <div>Would You Rather..</div>
                        <Form.Label>option 1</Form.Label>
                        <Form.Control size="sm" as="textarea" rows={2} name="optionOne" onChange={this.onChange} />
                        <Form.Label>option 2</Form.Label>
                        <Form.Control size="sm" as="textarea" rows={2} name="optionTwo" onChange={this.onChange} />

                        <Button type="submit" className="login-btn">ADD QUESTION</Button>
                    </Form.Group>
                </Form>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => ({
    authedUser: state.loginReducer,
});

export default connect(mapStateToProps)(NewQuestion);
