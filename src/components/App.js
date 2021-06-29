import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        const { history } = this.props;
        return Object.keys(this.props.currentUser).length ? (
            <Layout>
                <Route path="/" exact component={Dashboard} />
                <Route path="/add" exact component={NewQuestion} />
                <Route path="/board" exact component={LeaderBoard} />
            </Layout>
        ) : (
            <Login />
            // <Route exact path="/login" name="Login Page" component={Login} />
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.loginReducer,
});
export default connect(mapStateToProps)(App);
