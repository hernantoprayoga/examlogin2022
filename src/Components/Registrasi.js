import React, { Component, useState } from "react";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { firebaseAuthentication } from "../config/firebase";
import "./login.css";
import loginIcon from "../image/icon_user.png";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";

import PasswordChecklist from "react-password-checklist";

export default class Registrasi extends Component {
  state = {
    email: "",
    password: "",
    validate: false,
    validatepw: "",
  };

  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnFocus = () => {
    this.setState({ validate: true });
  };
  handleOnBlur = () => {
    this.setState({ validate: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebaseAuthentication
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebaseAuthentication.currentUser
          .sendEmailVerification()
          .then(() => {
            alert("Mohon verifikasi email anda");
            this.props.history.push("/login");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  render() {
    const { email, password, validatepw } = this.state;
    return (
      <section className="hero is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form onSubmit={this.handleSubmit} className="inputicon box">
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
                        <input type="password" className="input" value={password} onChange={this.handleChangeField} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur} placeholder="Password" name="password" required />
                        <span className="icon is-small is-left">
                          <AiFillLock />
                        </span>
                      </p>
                    </div>
                  </div>
                  <PasswordChecklist
                    className="style inputtext"
                    rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                    minLength={8}
                    value={password}
                    valueAgain={validatepw}
                    messages={{
                      minLength: "Gunakan Minimal 8 Karakter",
                      specialChar: " Gunakan Minimal 1 Simbol",
                      number: "Gunakan Minimal 1 Angka",
                      capital: "Gunakan Minimal 1 Huruf Kapital",
                      lowercase: "Gunakan Minimal 1 Huruf Kecil",
                    }}
                  />

                  <div className="columns is-mobile is-centered mb-3">
                    <button type="submit" className="button buttonsize is-dark is-responsive">
                      Daftar
                    </button>
                  </div>
                  <label className="columns is-mobile is-centered mb-3 reset">
                    Sudah Punya akun?
                    <a href="/login" className=" ml-1 has-text-link">
                      Masuk
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
