import React, {Component} from 'react'
import {connect} from 'react-redux'
import Moment from "react-moment";
import {handleDeleteCommentById, handleVoteOnCommentById} from "../actions/comments";
import FontAwesome from "react-fontawesome";
import EditComment from "./EditComment";
import Dropdown from "react-bootstrap/Dropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditPost from "./EditPost";

class Comment extends Component {
    render () {
        const {
            author,
            body,
            deleted,
            id,
            parentDeleted,
            parentId,
            timestamp,
            voteScore,
        } = this.props.comment
        const {
            downVote,
            upVote,
            deleteComment
        } = this.props

        return (
            <div className="col-12">
                <div className="material-card">
                    <div className="material-card-header">
                        <div className="row">
                            <div className="col-11">
                                <p className="mbottom-15 line-height-1-8">{body}</p>
                                <p className="color-blue-gray-500 mbottom-0 font-0-9em font-300">
                                    by: <span className="font-1em font-400 mbottom-0 link link-color-cyan">{author}</span> | <Moment format="\o\n \t\h\e do \o\f MMMM, YYYY, \a\t HH:mm:ss" tz="America/Sao_Paulo">{new Date(timestamp)}</Moment>
                                </p>
                            </div>
                            <div className="col-1">
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className="ellipsis">
                                        <FontAwesomeIcon icon={['fa', 'ellipsis-v']} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            id &&
                                            <EditComment author={author} body={body} id={id}/>
                                        }
                                        <Dropdown.Item onClick={(event) => deleteComment(event, id)}>Delete comment</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="material-card-body">
                        <div className="row font-0-9em">
                            <div className="col">
                                <span className="link link-color-red" onClick={(event) => downVote(id, event)}><FontAwesome name="angle-down"/></span>
                                <span className="marhor-10 inline-block">{voteScore} {voteScore === 1 ? 'person liked this' : 'people liked this'}</span>
                                <span className="link link-color-cyan" onClick={(event) => upVote(id, event)}><FontAwesome name="angle-up"/></span>
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
            dispatch(handleVoteOnCommentById(id, {option: 'downVote'}))
        },
        upVote: (id, event) => {
            event.preventDefault()
            dispatch(handleVoteOnCommentById(id, {option: 'upVote'}))
        },
        deleteComment: (event, id) => {
            event.preventDefault()
            dispatch(handleDeleteCommentById(id))
        },
        dispatch
    }
}

export default connect(null, mapDispatchToProps)(Comment)
