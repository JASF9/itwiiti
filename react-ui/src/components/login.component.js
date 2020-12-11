import React, { Component} from "react";
import { Router, Route, Link } from "react-router-dom";
import AuthService from "../services/auth.services";

import Home from "../components/home.component"

export default class Login extends Component {
    constructor(props){
        super(props);
        this.onChangeNick = this.onChangeNick.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            nick: "",
            password: "",

            logged: false
        }
    }

    onChangeNick(e){
        this.state({
            nick: e.target.value
        });
    }

    onChangePassword(e){
        this.state({
            password: e.target.value
        });
    }

    onSubmit(){
        var data={
            nick: this.state.nick,
            password: this.state.password,
        }

        AuthService.login(data)
        .then(response => {
            this.setState({
                nick: response.data.nick,
                password: response.data.password,

                logged: true
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return (
            <div className="submit-form">
              {this.state.logged ? (
                <div>
                  <h4>You have logged in!</h4>
                  <Router>
                    <div>
                      <Link to="/">
                        <button>Go to Home</button>
                      </Link>
                      <Route path="/" component={Home} />
                    </div>
                  </Router>
                </div>
              ) : (
                <div>

                  <div className="form-group">
                    <label htmlFor="nick">Nick</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nick"
                      required
                      value={this.state.nick}
                      onChange={this.onChangeNick}
                      name="nick"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      required
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      name="password"
                    />
                  </div>
      
                  <button onClick={this.onSubmit} className="btn btn-success">
                    Log in
                  </button>
                </div>
              )}
            </div>
          );
    }
}

