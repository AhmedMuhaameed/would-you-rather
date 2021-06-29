import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";

class Layout extends Component {
    render() {
        return  this.props.currentUser ? (
            <div>
                <Header />
                <div>{this.props.children}</div>
            </div>
        ) : (
            <h1>please wait</h1>
        );
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.loginReducer,
});
export default connect(mapStateToProps)(Layout);
