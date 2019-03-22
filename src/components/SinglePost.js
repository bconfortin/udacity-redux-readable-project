import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleDeletePostById, handleGetPostById, handleVoteOnPostById} from "../actions/posts";
import {upperCaseFirstLetter} from "../utils/api/helpers";
import {Link, Redirect} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import Moment from 'react-moment'
import 'moment-timezone'
import Comments from "./Comments";
import NewComment from "./NewComment";
import EditPost from "./EditPost";
import Dropdown from "react-bootstrap/Dropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 Post detail is available at /:category/:post_id

 Post is displayed with the following:
 1) Title
 2) Body
 3) Author
 4) Number of comments
 5) Current score
 6) Voting mechanism to upvote or downvote the post
 7) Buttons or links for editing or deleting that post

 Listed comments are displayed with the following:
 1) Author
 2) Current score
 3) Voting mechanism to upvote or downvote the comment
 4) Buttons or links for editing or deleting that comment

 The voting mechanism works and correctly displays the new vote score after clicking for both the post and comments.

 All comments for a post are displayed below the post body.

 A mechanism for adding a new comment is visible on the detail page and functional.
 */

class SinglePost extends Component {
    state = {
        toHome: false
    }

    componentDidMount() {
        this.getPostsById()
    }

    getPostsById = () => {
        const {dispatch} = this.props
        const id = this.props.match.params.post_id

        console.log(this.props)

        if (id) {
            dispatch(handleGetPostById(id))
        }
    }

    handleDeletePost = (event, id) => {
        event.preventDefault()
        this.props.dispatch(handleDeletePostById(id))
            .then(() => this.setState(() => ({
                toHome: true
            })))
    }

    render() {
        const {
            upVote,
            downVote,
            title,
            author,
            body,
            category,
            voteScore,
            id,
            commentCount,
            timestamp,
            deletePost,
        } = this.props

        if (this.state.toHome) {
            return <Redirect to='/' />
        }

        return (
            <div className="row mbottom-30">
                <div className="col-12">
                    <div className="material-card">
                        <div className="material-card-header">
                            <div className="row">
                                <div className="col">
                                    <p className="mbottom-0 font-0-9em"><Link to={`/${category}`} className="link-color-cyan text-uppercase font-700">{upperCaseFirstLetter(category)}</Link></p>
                                </div>
                                <div className="col">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic" className="ellipsis">
                                            <FontAwesomeIcon icon={['fa', 'ellipsis-v']} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                id &&
                                                <EditPost title={title} author={author} body={body} category={category} id={id}/>
                                            }
                                            <Dropdown.Item onClick={(event) => this.handleDeletePost(event, id)}>Delete post</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <h3 className="font-1-3em font-400 mbottom-0 color-555 pright-40">{title}</h3>
                            <p className="color-blue-gray-500 mbottom-0 font-0-9em font-300">by: <span className="link link-color-cyan">{author}</span> | <Moment format="\o\n \t\h\e do \o\f MMMM, YYYY, \a\t HH:mm:ss" tz="America/Sao_Paulo">{new Date(timestamp)}</Moment></p>
                        </div>
                        <div className="material-card-body">
                            <p className="marver-15 line-height-1-8">{body}</p>
                        </div>
                        <div className="material-card-footer">
                            <div className="row font-0-9em">
                                <div className="col">
                                    <span className="link link-color-red" onClick={(event) => downVote(id, event)}><FontAwesome name="angle-down"/></span>
                                    <span className="marhor-10 inline-block">{voteScore} {voteScore === 1 ? 'person liked this' : 'people liked this'}</span>
                                    <span className="link link-color-cyan" onClick={(event) => upVote(id, event)}><FontAwesome name="angle-up"/></span>
                                </div>
                                <div className="col text-right">
                                    <FontAwesome name="commenting-o mright-10"/>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {id && <Comments postId={id}/>}
                        </div>
                    </div>
                    <NewComment parentId={id}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.posts.postById
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        downVote: (id, event) => {
            event.preventDefault()
            dispatch(handleVoteOnPostById(id, {option: 'downVote'}))
        },
        upVote: (id, event) => {
            event.preventDefault()
            dispatch(handleVoteOnPostById(id, {option: 'upVote'}))
        },
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)
