import React, {Component} from "react";
import {Switch, Route, Link } from "react-router-dom";
import queryString from 'query-string';
import PostsService from "../services/posts.services";
import LikeService from "../services/like.services";
import CommentService from '../services/comment.service';

import Home from "../components/home.component"
import MyPage from "../components/mypage.component"

export default class PostPage extends Component{
    constructor(props){
        super(props);
        this.saveLike = this.saveLike.bind(this)
        this.changeLike = this.changeLike.bind(this)
        this.saveDislike = this.saveDislike.bind(this)
        this.changeDislike = this.changeDislike.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.saveComment = this.saveComment.bind(this)
        this.state = {
            id:0,
            description:"",
            media:"",
            comments:[],
            content:"",
            like:false,
            dislike:false,
            init:false,
            
            //config
            loaded:false
        };
    }
    
    saveLike(){
        LikeService.createLike(this.state.id)
        .then(() =>{
            this.setState({
                like:true,
                init:true
            })
        })
        .catch( err =>{
            console.log(err)
        })
    }

    changeLike(){
        if(this.state.like===true){
            var data = {
                change:false
            }
        }
        else{
            data ={
                change: true
            }
        }
        LikeService.updateLike(this.state.id,data)
        .then( result => {
            this.setState({
                like: result.data.like,
                dislike: result.data.dislike
            })
        })
    }

    onChangeContent(e){
        this.state({
            content: e.target.value
        });
    }

    saveComment(){
        var data = {
            content: this.state.content
        }
        CommentService.create(this.state.id,data)
        .then(response => {
           this.setState({
               content: response.data.content
           })
        })
        .catch(err => {
            console.log(err)
        })
    }

    saveDislike(){
        LikeService.createLike(this.state.id)
        .then(() =>{
            this.setState({
                dislike:true,
                init:true
            })
        })
        .catch( err =>{
            console.log(err)
        })
    }

    changeDislike(){
        if(this.state.dislike===true){
            var data = {
                change:false
            }
        }
        else{
            data ={
                change: true
            }
        }
        LikeService.updateDislike(this.state.id,data)
        .then( result => {
            this.setState({
                like: result.data.like,
                dislike: result.data.dislike
            })
        })
    }

    componentDidMount(){
       const values = queryString.parse(this.props.location.search)
       const id = values.id
       this.setState({id:id})
        PostsService.get(this.state.id)
        .then(response => {
            this.setState({
                description: response.data.description,
                media: response.data.media
            })
        })
        .catch(err => {
            console.log(err)
        })
        LikeService.get(this.state.id)
        .then(response => {
            this.setState({
                like: response.data.like,
                dislike: response.data.dislike
            })
        })
        .catch(err => {
            console.log(err)
        })
        CommentService.get(this.state.id)
        .then(response => {
            this.setState({
                comments: response.data
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
                    <p onClick={this.onClickDelete}>Delete Post</p>
                    </li>
                </div>
                </nav>

                <div className="container mt-3">
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path="/user" component={MyPage} />
                </Switch>
                </div>

                <div>
                    <h4>Post</h4>
                    <div>
                        <img src={this.state.media} alt=""/>
                        <div>
                         <label>
                            <strong>Description:</strong>
                        </label>{" "}
                            {this.state.description}
                        </div>
                        {this.state.init ? (
                           <div>
                               <button onClick={this.changeLike} className="btn btn-success">
                                    Like
                                </button>
                                <button onClick={this.changeDislike} className="btn btn-success">
                                    Dislike
                                </button>
                           </div>
                        ) : (
                            <div>
                                <button onClick={this.saveLike} className="btn btn-success">
                                    Like
                                </button>
                                <button onClick={this.saveDislike} className="btn btn-success">
                                    Dislike
                                </button>
                            </div>
                        ) }
                       
                    </div>
                    <div>
                        <div className="form-group">
                            <label htmlFor="password">Leave a comment</label>
                            <input
                            type="text"
                            className="form-control"
                            id="content"
                            required
                            value={this.state.content}
                            onChange={this.onChangeContent}
                            name="content"
                            />
                        </div>
                        <button onClick={this.saveComment} className="btn btn-success">
                            Comment
                        </button>
                    </div>
                    <div>
                    {this.state.comments.map (comment => {
                        return(
                            <div>
                                <p>{comment.creator}</p>
                                <p>{comment.content}</p>
                            </div>
                        )
                    })}
                    </div>
                </div>
                
            </div>
        )     
    }  
} 