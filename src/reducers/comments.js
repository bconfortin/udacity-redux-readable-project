import {
    DELETE_COMMENT_BY_ID, EDIT_COMMENT_BY_ID,
    GET_COMMENTS_BY_POST_ID,
    NEW_COMMENT,
    VOTE_ON_COMMENT_BY_ID
} from "../actions/actionTypes";
import {rebuildObjectById} from "../utils/api/helpers";

export default function comments (state = {}, action) {
    switch (action.type) {
        case GET_COMMENTS_BY_POST_ID:
            const comments = rebuildObjectById(action.comments)
            return {
                ...state,
                comments
            }
        case NEW_COMMENT:
            let newComment = action.comment
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [newComment.id]: newComment
                }
            }
        case VOTE_ON_COMMENT_BY_ID:
            let {votedComment} = action
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [votedComment.id]: votedComment
                }
            }
        case DELETE_COMMENT_BY_ID:
            let {deletedComment} = action
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [deletedComment.id]: deletedComment
                }
            }
        case EDIT_COMMENT_BY_ID:
            let {editedComment} = action
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [editedComment.id]: editedComment
                }
            }
        default:
            return state
    }
}
