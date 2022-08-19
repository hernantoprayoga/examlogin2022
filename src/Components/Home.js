import React, { Component } from "react";
import { Button, Container, Paper } from "@material-ui/core";
import { firebaseAuthentication } from "../config/firebase";
import image from "../image/stick-figures-holding-word-welcome-vector-banner-text-welcome-welcome-together-people-big-colorful-letters-114865217.jpg";

export default class Home extends Component {
  componentDidMount() {
    firebaseAuthentication.onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push("/login");
      }
    });
  }
  handleLogOut = () => {
    firebaseAuthentication.signOut();
  };

  handleChangePw = () => {
    this.props.history.push("/forgot-password");
  };

  render() {
    return (
      <Container>
        <Paper className="mt-3">
          <Button
            style={{
              backgroundColor: "#21b6ae",
            }}
            variant="contained"
            onClick={this.handleLogOut}
          >
            Logout
          </Button>
          <Button
            className="ml-5"
            style={{
              backgroundColor: "clay",
            }}
            variant="contained"
            onClick={this.handleChangePw}
          >
            Ubah Password
          </Button>
        </Paper>
        <img src={image} alt="icon" />
      </Container>
    );
  }
}
