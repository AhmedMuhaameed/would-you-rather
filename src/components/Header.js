import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { handleLogout } from "../actions/shared";

class Header extends Component {
    render() {
        const { currentUser, history } = this.props;
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">Would You Rather ?</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/add">
                            New Question
                        </Nav.Link>
                        <Nav.Link as={Link} to="/board">
                            Leader Board
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Text style={{ marginRight: "30px" }}>
                        <b>Logged in as :</b>
                        {currentUser.name}
                    </Navbar.Text>
                    <Image
                        src={currentUser.avatarURL}
                        alt={`${currentUser.name} avatar`}
                        roundedCircle
                        style={{ width: "auto", height: 60, marginRight: "30px" }}
                    ></Image>
                    <Nav.Link
                        as={Button}
                        onClick={() => {
                            this.props.dispatch(handleLogout());
                            history.push("/");
                        }}
                    >
                        Logout
                    </Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.loginReducer,
});

export default withRouter(connect(mapStateToProps)(Header));
