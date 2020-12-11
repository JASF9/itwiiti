import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Route, Switch, Link } from "react-router-dom";
import UserService from "../services/user.service";


import MyPage from "../components/mypage.component"
import UserPage from "../components/userpage.component"

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.retrieveNicks = this.retrieveNicks.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveText = this.setActiveText.bind(this);
        this.searchText = this.searchText.bind(this);
    
        this.state = {
          users: [],
          currentText: null,
          currentIndex: -1,
          searchText: ""
        };
      }

    componentDidMount() {
        this.retrieveNicks();
      }
    
      onChangeText(e) {
        const searchText = e.target.value;
    
        this.setState({
          searchText: searchText
        });
      }
    
      retrieveNicks() {
        UserService.getAll()
          .then(response => {
            this.setState({
              users: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      refreshList() {
        this.retrieveTutorials();
        this.setState({
          currentText: null,
          currentIndex: -1
        });
      }
    
      setActiveText(text, index) {
        this.setState({
          currentText: text,
          currentIndex: index
        });
      }
    
      searchText() {
        UserService.search(this.state.searchText)
          .then(response => {
            this.setState({
              users: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      render() {
        const { searchText, users, currentText, currentIndex } = this.state;
    
        return (
            <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                My Page
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/user" component={MyPage} />
          </Switch>
        </div>
      
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users"
                  value={searchText}
                  onChange={this.onChangeText}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchText}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Users List</h4>
    
              <ul className="list-group">
                {users &&
                  users.map((user, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveText(user, index)}
                      key={index}
                    >
                      {user.nick}
                    </li>
                  ))}
              </ul>
    
            </div>
            <div className="col-md-6">
              {currentText ? (
                <div>
                  <h4>Users</h4>
                  <div>
                    <label>
                      <strong>User:</strong>
                    </label>{" "}
                    {currentText.nick}
                  </div>
                  <div>
                    <img src={currentText.photo} alt="" style={{width:"20%"}} />
                  </div>
                  <Router>
                      <div>
                      <Link
                        to={"/user/" + currentText.nick}
                        className="badge badge-warning"
                        >
                        Go to User Page
                      </Link>
                      <Route path ="/user/:id" component= {UserPage} />
                      </div>
                  </Router>  
                  
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please select a User...</p>
                </div>
              )}
            </div>
          </div>
          </div>
        );

     }
              
}

