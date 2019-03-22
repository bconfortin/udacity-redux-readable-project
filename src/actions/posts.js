import {hideLoading, showLoading} from 'react-redux-loading'
import {
    apiDeletePostById,
    apiEditPostById,
    apiGetPostById,
    apiGetPosts,
    apiGetPostsByCategory,
    apiNewPost,
    apiVoteOnPostById,
} from "../utils/api/posts";
import {
    DELETE_POST_BY_ID,
    EDIT_POST_BY_ID,
    GET_POST_BY_ID,
    GET_POSTS,
    GET_POSTS_BY_CATEGORY,
    NEW_POST,
    VOTE_ON_POST_BY_ID,
} from "./actionTypes";

function getPosts(posts) {
    return {
        type: GET_POSTS,
        posts,
    }
}

export function handleGetPosts() {
    return (dispatch) => {
        dispatch(showLoading())

        return apiGetPosts()
            .then((response) => {
                dispatch(getPosts(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}

function getPostsByCategory(postsByCategory) {
    return {
        type: GET_POSTS_BY_CATEGORY,
        postsByCategory
    }
}

export function handleGetPostsByCategory(category) {
    return (dispatch) => {
        dispatch(showLoading())

        return apiGetPostsByCategory(category)
            .then((response) => {
                dispatch(getPostsByCategory(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}

function newPost(post) {
    return {
        type: NEW_POST,
        post
    }
}

export function handleNewPost(post) {
    return (dispatch) => {
        dispatch(showLoading())

        return apiNewPost(post)
            .then((response) => {
                dispatch(newPost(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}

function getPostById(postById) {
    return {
        type: GET_POST_BY_ID,
        postById
    }
}

export function handleGetPostById(id) {
    return (dispatch) => {
        dispatch(showLoading())

        return apiGetPostById(id)
            .then((response) => {
                dispatch(getPostById(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}

function voteOnPostById(vote) {
    return {
        type: VOTE_ON_POST_BY_ID,
        vote
    }
}

export function handleVoteOnPostById(id, upOrDown) {
    return (dispatch) => {
        return apiVoteOnPostById(id, upOrDown)
            .then((response) => {
                dispatch(voteOnPostById(response))
            })
    }
}

function editPostById(editedPost) {
    return {
        type: EDIT_POST_BY_ID,
        editedPost
    }
}

export function handleEditPostById(post) {
    return (dispatch) => {
        dispatch(showLoading())

        return apiEditPostById(post)
            .then((response) => {
                dispatch(editPostById(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}

function deletePostById(post) {
    return {
        type: DELETE_POST_BY_ID,
        deletedPost: post
    }
}

export function handleDeletePostById(id) {
    return (dispatch) => {
        dispatch(hideLoading())

        return apiDeletePostById(id)
            .then((response) => {
                dispatch(deletePostById(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}
