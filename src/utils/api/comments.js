import {generateUID, getHeaders} from "./helpers";
import {
    API_ROUTE_GET_COMMENT_BY_ID,
    API_ROUTE_GET_COMMENTS_BY_POST_ID,
    API_ROUTE_DELETE_COMMENT_BY_ID,
    API_ROUTE_EDIT_COMMENT_BY_ID,
    API_ROUTE_VOTE_ON_COMMENT_BY_ID,
    API_ROUTE_NEW_COMMENT,
} from "./apiEndpoints";

export function apiGetCommentsByPostId(id) {
    return fetch(API_ROUTE_GET_COMMENTS_BY_POST_ID(id), getHeaders())
        .then(
            response => response.json(),
            error => 'An error occurred when trying to get the comments by post ID: ' + error
        )
}

export function apiGetCommentById(id) {
    return fetch(API_ROUTE_GET_COMMENT_BY_ID(id), getHeaders())
        .then(
            response => response.json(),
            error => 'An error occurred when trying to get a comment by ID: ' + error
        )
}

export function apiDeleteCommentById(id) {
    return fetch(API_ROUTE_DELETE_COMMENT_BY_ID(id), {
        method: 'DELETE',
        ...getHeaders()
    })
    .then(
        response => response.json(),
        error => 'An error occurred when trying to delete a comment by ID: ' + error
    )
}

export function apiEditCommentById(comment) {
    const data = {
        ...comment
    }
    return fetch(API_ROUTE_EDIT_COMMENT_BY_ID(comment.id), {
        method: 'PUT',
        body: JSON.stringify(data),
        ...getHeaders()
    })
    .then(
        response => response.json(),
        error => 'An error occurred when trying to edit a comment by ID: ' + error
    )
}

export function apiGetVoteOnComment(id) {
    return fetch(API_ROUTE_VOTE_ON_COMMENT_BY_ID(id), getHeaders())
        .then(
            response => response.json(),
            error => 'An error occurred when trying to vote on a comment by ID: ' + error
        )
}

export function apiNewComment(comment) {
    const data = {
        ...comment,
        id: generateUID(),
        timestamp: Date.now(),
    }
    return fetch(API_ROUTE_NEW_COMMENT, {
            method: 'POST',
            ...getHeaders(),
            body: JSON.stringify(data)
        })
        .then(
            response => response.json(),
            error => 'An error occurred when trying to create a new comment: ' + error
        )
}

export function apiVoteOnCommentById(id, upOrDown) {
    return fetch(API_ROUTE_VOTE_ON_COMMENT_BY_ID(id), {
        method: 'POST',
        ...getHeaders(),
        body: JSON.stringify(upOrDown),
    })
    .then(
        response => response.json(),
        error => 'An error occurred when trying to vote on a comment: ' + error
    )
}
