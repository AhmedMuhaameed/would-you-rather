import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Question from "./Question";
import QuestionDetails from "./QuestionDetails"
class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        const { history } = this.props;
        return Object.keys(this.props.currentUser).length ? (
            <Layout>
                <Route path="/questions" exact component={Dashboard} />
                <Route path="/questions/:question_id" exact component={QuestionDetails} />
                <Route path="/add" exact component={NewQuestion} />
                <Route path="/leaderboard" exact component={LeaderBoard} />
            </Layout>
        ) : (
            <Login />
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.loginReducer,
});
export default connect(mapStateToProps)(App);
