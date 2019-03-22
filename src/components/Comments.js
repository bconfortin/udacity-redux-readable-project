import React, {Component} from 'react'
import {connect} from 'react-redux'
import Comment from "./Comment";
import {handleGetCommentsByPostId} from "../actions/comments";

class Comments extends Component {
    componentDidMount () {
        const {dispatch, postId} = this.props
        if (postId) {
            dispatch(handleGetCommentsByPostId(postId))
        }
    }

    render () {
        const {comments} = this.props
        console.log(comments)

        return (
            <div className="row">
                {
                    comments &&
                    Object.keys(comments).map((id) => {
                        if (!comments[id].deleted) {
                            return <Comment key={comments[id].id} comment={comments[id]}/>
                        }
                    })
                }
            </div>
        )
    }
}

function mapStateToProps ({comments}) {
    return comments
}

export default connect(mapStateToProps)(Comments)
