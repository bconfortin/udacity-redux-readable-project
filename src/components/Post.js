import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleDeletePostById, handleVoteOnPostById} from "../actions/posts";
import {upperCaseFirstLetter} from "../utils/api/helpers";
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import Moment from 'react-moment'
import 'moment-timezone'
import EditPost from './EditPost'
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Post extends Component {
    handleDeletePost = (event, id) => {
        event.preventDefault()
        let confirmation = window.confirm("Are you sure you want to delete this post? This operation can't be undone.")
        if (confirmation) {
            this.props.dispatch(handleDeletePostById(id))
        }
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
        } = this.props

        return (
            <div className="col-12 col-sm-12 col-md-6">
                <div className="material-card">
                    <div className="material-card-header">
                        <div className="row">
                            <div className="col">
                                <p className="mbottom-0 font-0-9em">
                                    <Link to={`/${category}`} className="link-color-cyan text-uppercase font-700">{upperCaseFirstLetter(category)}</Link>
                                </p>
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
                        <div className="padver-15">
                            <p className="mbottom-15 line-height-1-8">{body}</p>
                            <Link to={`/${category}/${id}`} className="btn btn-primary btn-cyan btn-sm">Read more</Link>
                        </div>
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
            </div>
        )
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

export default connect(null, mapDispatchToProps)(Post)
