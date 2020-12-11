import React, {Component} from "react";
import { Router, Route, Link } from "react-router-dom";
import UserService from "../services/user.service"

import MyPage from "../components/mypage.component"

export default class SetPhoto extends Component {
    constructor(props) {
        super(props);
        this.onChangeFile = this.onChangeFile.bind(this)
        this.savePhoto = this.savePhoto.bind(this)
        
        this.state = {
            nick: "",
            file:null,

            submitted: false
        };
    }

    onChangeFile(e){
        this.state({
            file: e.target.files[0]
        });
    }

    savePhoto(){
        var data ={
            file: this.state.file,
        };

        UserService.photo(this.state.nick,data)
        .then(response => {
            this.setState({

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
                nick: response.data.nick
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
                  <h4>You have changed your photo.</h4>
                  <Router>
                    <div>
                      <Link to="/user">
                        <button>My Page</button>
                      </Link>
                      <Route path="/user" component={MyPage} />
                    </div>
                  </Router>
                </div>
              ) : (
                <div>

                  <div className="form-group">
                    <label htmlFor="file">Upload a image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      required
                      value={this.state.file}
                      onChange={this.onChangeFile}
                      name="file"
                    />
                  </div>
      
                  <button onClick={this.savePhoto} className="btn btn-success">
                    Upload Photo
                  </button>
                </div>
              )}
            </div>
          );
        }
    }