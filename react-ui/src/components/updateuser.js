import React, {Component} from "react";
import { Router, Route, Link } from "react-router-dom";
import UserService from "../services/user.service";

import Login from "../components/login.component"

export default class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstname = this.onChangeFirstname.bind(this)
        this.onChangeLastname = this.onChangeLastname.bind(this)
        this.onChangeNick = this.onChangeNick.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangePrivate = this.onChangePrivate.bind(this)
        this.saveUser = this.saveUser.bind(this)
        
        this.state = {
            original:"",
            firstname: "",
            lastname: "",
            nick: "",
            password: "",
            private: false,

            submitted: false
        };
    }

    onChangeFirstname(e){
        this.state({
            firstname: e.target.value
        });
    }

    onChangeLastname(e){
        this.state({
            lastname: e.target.value
        });
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

    onChangePrivate(e){
        this.state({
            private: e.target.value
        });
    }

    saveUser(){
        var data ={
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            nick: this.state.nick,
            password: this.state.password,
            private: this.state.private
        };

        UserService.update(this.state.original,data)
        .then(response => {
            this.setState({
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                nick: response.data.nick,
                password: response.data.password,
                private: response.data.private,

                submitted: true
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        UserService.get()
        .then(response => {
            this.setState({
                original: response.data.nick
            })
        })
        .catch(err =>{
            console.log(err)
        })
    }

    render(){
        return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>Your info has been updated.</h4>
                  <Router>
                    <div>
                      <Link to="/login">
                        <button>Login again please</button>
                      </Link>
                      <Route path="/login" component={Login} />
                    </div>
                  </Router>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      required
                      value={this.state.firstname}
                      onChange={this.onChangeFirstname}
                      name="firstname"
                    />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      required
                      value={this.state.lastname}
                      onChange={this.onChangeLastname}
                      name="lastname"
                    />
                  </div>

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

                  <div className="form-group">
                    <label htmlFor="private">Private</label>
                    <input
                      type="checkbox"
                      className="form-control"
                      id="private"
                      required
                      onChange={this.onChangePrivate}
                      defaultChecked = {this.state.private}
                      name="private"
                    />
                  </div>
      
                  <button onClick={this.saveUser} className="btn btn-success">
                    Update
                  </button>
                </div>
              )}
            </div>
          );
        }
    }