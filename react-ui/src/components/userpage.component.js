import React, {Component} from "react";
import {Switch, Route, Link } from "react-router-dom";
import queryString from 'query-string'
import UserService from "../services/user.service";
import PostsService from "../services/posts.services";
import FollowService from "../services/follow.services"

import Home from "../components/home.component"
import MyPage from "../components/mypage.component"
import PostPage from "../components/postpage.component"


export default class UserPage extends Component{
    constructor(props){
        super(props);
        this.onClickFollow = this.onClickFollow.bind(this)
        this.state = {
            nick:"",
            photo:"",
            private: false,
            posts:[],
            follow:false,
            viewer:"",
            
            loaded:false
        };
    }

    onClickFollow(){
        FollowService.create(this.state.nick)
        .then(() =>{
            this.setState({follow:true})
        })
        .catch(err =>{
            console.log(err)
        })
    }

    componentDidMount(){
        const values = queryString.parse(this.props.location.search)
       const nick = values.nick
       this.setState({nick:nick})
        UserService.get()
        .then(response => {
            this.setState({
                private: response.data.private,
                photo: response.data.photo,

                loaded:true
            })
        })
        .catch(err =>{
            console.log(err)
        })
        FollowService.get(this.state.nick)
        .then(response => {
            if(response.length){
                this.setState({
                    follow:true
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
        PostsService.get(this.state.nick)
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
        
    }
   

    render(){
        return(
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
                    <li className="nav-item">
                    <p onClick={this.onClickFollow}>Follow User</p>
                    </li>
                </div>
                </nav>

                <div className="container mt-3">
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path="/user" component={MyPage} />
                    <Route path="/user:nick" component={UserPage} />
                    <Route path="/post:id" component={PostPage} />
                </Switch>
                </div>

                {this.state.follow ? (
                    <div>
                    <h4>Posts</h4>
                    {this.state.posts.map (post => {
                        return(
                            <div>
                                <Link to={"/post"+post.id}>
                                <img src={post.media} alt=""/>
                                </Link>
                            </div>
                        )
                    })}
                </div>
              ) : (
                <div>
                  <p>Follow this user to see their posts.</p>
                </div>
              )}
            </div>
        )     
    }
    
} 