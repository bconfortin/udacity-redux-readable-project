import {
    DELETE_COMMENT_BY_ID,
    EDIT_COMMENT_BY_ID,
    GET_COMMENTS_BY_POST_ID,
    NEW_COMMENT,
    VOTE_ON_COMMENT_BY_ID
} from "./actionTypes";
import {hideLoading, showLoading} from "react-redux-loading";
import {
    apiDeleteCommentById,
    apiEditCommentById,
    apiGetCommentsByPostId,
    apiNewComment,
    apiVoteOnCommentById
} from "../utils/api/comments";

function getCommentsByPostId (comments) {
    return {
        type: GET_COMMENTS_BY_POST_ID,
        comments
    }
}

export function handleGetCommentsByPostId (id) {
    return (dispatch) => {
        dispatch(showLoading())

        return apiGetCommentsByPostId(id)
            .then((response) => {
                dispatch(getCommentsByPostId(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}

function newComment (comment) {
    return {
        type: NEW_COMMENT,
        comment
    }
}

export function handleNewComment (comment) {
    return (dispatch) => {
        dispatch(showLoading())

        return apiNewComment(comment)
            .then((response) => {
                dispatch(newComment(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}

function voteOnCommentById (votedComment) {
    return {
        type: VOTE_ON_COMMENT_BY_ID,
        votedComment
    }
}

export function handleVoteOnCommentById (id, upOrDown) {
    return (dispatch) => {
        dispatch(showLoading())

        return apiVoteOnCommentById(id, upOrDown)
            .then((response) => {
                dispatch(voteOnCommentById(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}

function deleteCommentById (deletedComment) {
    return {
        type: DELETE_COMMENT_BY_ID,
        deletedComment
    }
}

export function handleDeleteCommentById (id) {
    return (dispatch) => {
        dispatch(showLoading())

        return apiDeleteCommentById(id)
            .then((response) => {
                dispatch(deleteCommentById(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}

function editCommentById (editedComment) {
    return {
        type: EDIT_COMMENT_BY_ID,
        editedComment
    }
}

export function handleEditCommentById (comment) {
    return (dispatch) => {
        dispatch(showLoading())

        return apiEditCommentById(comment)
            .then((response) => {
                dispatch(editCommentById(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}
