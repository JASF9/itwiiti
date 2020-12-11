import React, {Component} from "react";
import {Switch, Route, Link } from "react-router-dom";
import UserService from "../services/user.service";
import PostsService from "../services/posts.services";

import Home from "../components/home.component"
import Register from "../components/register.component"
import NewPost from "../components/newpost.component"
import UpdateUser from "../components/updateuser"
import SetPhoto from "../components/setphoto.component"
import MyPost from "../components/mypost.component"

export default class MyPage extends Component{
    constructor(props){
        super(props);
        this.onClickDelete = this.onClickDelete.bind(this)
        this.onClickPrivate = this.onClickPrivate.bind(this)
        this.state = {
            nick:"",
            photo:"",
            private: false,
            posts:[],
            
            //config
            loaded:false
        };
    }
    
    onClickDelete(e){
        UserService.delete(this.state.nick)
        .then( () => {
            this.props.history.push('/register')
        })
        .catch(err => {
            console.log(err)
        })
    }

    onClickPrivate(e){
        if(this.state.private===true){
            var data ={
                private: false
            };
        }
        else{
            data ={
                private:true
            };
        }
        

        UserService.update(this.state.nick,data)
        .then( () => {
            this.props.history.push('/user')
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        UserService.get()
        .then(response => {
            this.setState({
                nick: response.data.nick,
                private: response.data.private,
                photo: response.data.photo,

                loaded:true
            })
        })
        .catch(err =>{
            console.log(err)
        })
        PostsService.get(this.state.nick)
        .then(response => {
            this.setState({
                posts: response.data
            })
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
                    <Link to={"/post"} className="nav-link">
                        New Post
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to={"/user/update"} className="nav-link">
                        Update Info
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to={"/photo"} className="nav-link">
                        Set Photo
                    </Link>
                    </li>
                    <li className="nav-item">
                    <p onClick={this.onClickDelete}>Delete User</p>
                    </li>
                    <li className="nav-item">
                    <p onClick={this.onClickPrivate}>Change private setting</p>
                    </li>
                </div>
                </nav>

                <div className="container mt-3">
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/user" component={MyPage} />
                    <Route exact path="/post" component={NewPost} />
                    <Route path="/post:id" component={MyPost} />
                    <Route path="/user/update" component={UpdateUser} />
                    <Route path="/photo" component={SetPhoto} />
                </Switch>
                </div>

                <div>
                    <h4>My Posts</h4>
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
                
            </div>
        )     
    }
    
} 