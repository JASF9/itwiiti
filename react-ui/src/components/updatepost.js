import React, {Component} from "react";
import { Router, Route, Link } from "react-router-dom";
import PostsService from "../services/posts.services"
import queryString from 'query-string'

import MyPost from "../components/mypost.component"

export default class UpdatePost extends Component {
    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.savePost = this.savePost.bind(this)
        
        this.state = {
            description: "",
            creator: "",
            file:null,
            id:0,

            submitted: false
        };
    }

    onChangeDescription(e){
        this.state({
            description: e.target.value
        });
    }

    onChangeFile(e){
        this.state({
            file: e.target.files[0]
        });
    }

    savePost(){
        var data ={
            description: this.state.description,
            creator: this.state.creator,
            file: this.state.file
        };

        PostsService.update(this.state.id,data)
        .then(response => {
            this.setState({
                description: response.data.description,
                creator: response.data.creator,

                submitted: true
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
       const values = queryString.parse(this.props.location.search)
       const id = values.id
       this.setState({id:id})
    }

    render(){
        return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You have changed your post.</h4>
                  <Router>
                    <div>
                      <Link to={"/post"+ this.state.id}>
                        <button>Go check it</button>
                      </Link>
                      <Route path="/post:id" component={MyPost} />
                    </div>
                  </Router>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="description">Description(max 240 chars)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      required
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      name="description"
                    />
                  </div>

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
      
                  <button onClick={this.savePost} className="btn btn-success">
                    Make Post
                  </button>
                </div>
              )}
            </div>
          );
        }
    }