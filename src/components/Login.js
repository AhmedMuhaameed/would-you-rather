import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleLogin } from "../actions/shared";
import { Form, Button } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

class Login extends Component {
    state = {
        user: "",
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
        const users = Object.values(this.props.users);
        if (this.props.users && this.state.user !== "select-user" && this.state.user) {
            this.props.history.push('/questions');
            let user = this.state.user ? this.state.user : 1;
            this.props.dispatch(handleLogin(users.find((val) => val.id === user)));
        } else {
            alert("Please Select User");
        }
    };
    render() {
        const { users} = this.props;
        return (
            <LoadingOverlay active={this.state.loading} spinner text="please wait..">
                <h1 className="login-header">please login to continue</h1>
                <Form onSubmit={this.onSubmit} className="login-form">
                    <Form.Group>
                        <Form.Control as="select" size="lg" name="user" onChange={this.onChange}>
                            <option key="Select User" value="select-user">
                                Select User
                            </option>
                            {Object.entries(users).map(([key, value]) => (
                                <option key={value.id} value={value.id}>
                                    {value.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Button type="submit" className="login-btn" >
                            Login
                        </Button>
                    </Form.Group>
                </Form>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.usersReducer,
});
export default withRouter(connect(mapStateToProps)(Login));
