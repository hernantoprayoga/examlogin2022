import React, { Component, useState } from "react";
//import { Button, Container, Grid, TextField } from "@material-ui/core";
//import { Link } from "react-router-dom";
import { firebaseAuthentication } from "../config/firebase";
import "./login.css";
import loginIcon from "../image/icon_user.png";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebaseAuthentication
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        if (res.user.emailVerified) {
          this.props.history.push("/home");
        } else {
          alert("Verifikasi email anda terlebih dahulu!");
          firebaseAuthentication.signOut();
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  render() {
    const { email, password } = this.state;
    return (
      <section className="hero is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form onSubmit={this.handleSubmit} className="bg-success box">
                  <div className="columns is-mobile is-centered">
                    <img className="icon-img" src={loginIcon} alt="icon" />
                  </div>
                  <div className="field">
                    <div className="control inputtext">
                      <p className="control has-icons-left has-icons-right">
                        <input type="text" className="input" value={email} onChange={this.handleChangeField} name="email" placeholder="Email" required />
                        <span className="icon is-small is-left">
                          <BsFillPersonFill />{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control inputtext">
                      <p className="control has-icons-left has-icons-right ">
                        <input type="password" className="input" id="psw" value={password} onChange={this.handleChangeField} name="password" placeholder="password" required />
                        <span className="icon is-small is-left">
                          <AiFillLock />
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="control reset">
                    <label className=" inputtext">
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <a href="/forgot-password" className="reset inputtext ml-6 pl-6 is-italic is-responsive">
                      Forgot Password?
                    </a>
                  </div>

                  <div className="columns is-mobile is-centered mb-3">
                    <button type="submit" className="button buttonsize is-dark is-responsive">
                      Login
                    </button>
                  </div>
                  <label className="columns is-mobile is-centered mb-3 reset">
                    Belum punya akun ?
                    <a href="/registrasi" className=" ml-1 has-text-success">
                      Daftar
                    </a>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
