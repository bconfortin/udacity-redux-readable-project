import {getHeaders, generateUID} from "./helpers";
import {
    API_ROUTE_DELETE_POST_BY_ID,
    API_ROUTE_EDIT_POST_BY_ID,
    API_ROUTE_GET_POST_BY_ID,
    API_ROUTE_GET_POSTS,
    API_ROUTE_GET_POSTS_BY_CATEGORY,
    API_ROUTE_NEW_POST, API_ROUTE_VOTE_ON_POST_BY_ID
} from "./apiEndpoints";

export function apiGetPosts() {
    return fetch(API_ROUTE_GET_POSTS, {
        method: 'GET',
        ...getHeaders()
    })
    .then(
        response => response.json(),
        error => 'An error occurred when trying to get the posts: ' + error
    )
}

export function apiGetPostsByCategory(category) {
    return fetch(API_ROUTE_GET_POSTS_BY_CATEGORY(category), {
        method: 'GET',
        ...getHeaders()
    })
    .then(
        response => response.json(),
        error => 'An error occurred when trying to get the posts by category: ' + error
    )
}

/**
 * @description Adds a new post
 * @param post object
 * key {UUID} id - UUID should be fine, but any unique id will work
 * key {timestamp} timestamp - timestamp in whatever format you like, you can use Date.now() if you like
 * key {String} title
 * key {String} body
 * key {String} author
 * key {String} category - Any of the categories listed in categories.js.
 * @returns {Promise<Response | string>}
 */
export function apiNewPost(post) {
    const data = {
        ...post,
        id: generateUID(),
        timestamp: Date.now(),
    }
    return fetch(API_ROUTE_NEW_POST, {
        method: 'POST',
        ...getHeaders(),
        body: JSON.stringify(data),
    }).then(
        response => response.json(),
        error => 'An error occurred when trying to create a new post: ' + error
    )
}

export function apiGetPostById(id) {
    return fetch(API_ROUTE_GET_POST_BY_ID(id), {
        method: 'GET',
        ...getHeaders()
    })
    .then(
        response => response.json(),
        error => 'An error occurred when trying to get a post by ID: ' + error
    )
}

export function apiVoteOnPostById(id, upOrDown) {
    return fetch(API_ROUTE_VOTE_ON_POST_BY_ID(id), {
        method: 'POST',
        ...getHeaders(),
        body: JSON.stringify(upOrDown),
    })
    .then(
        response => response.json(),
        error => 'An error occurred when trying to vote on a post by ID: ' + error
    )
}

export function apiEditPostById(post) {
    const data = {
        ...post
    }
    return fetch(API_ROUTE_EDIT_POST_BY_ID(data.id), {
        method: 'PUT',
        body: JSON.stringify(data),
        ...getHeaders()
    })
    .then(
        response => response.json(),
        error => 'An error occurred when trying to apiEditPostById: ' + error
    )
}

export function apiDeletePostById(id) {
    return fetch(API_ROUTE_DELETE_POST_BY_ID(id), {
        method: 'DELETE',
        ...getHeaders()
    })
    .then(
        response => response.json(),
        error => 'An error occurred when trying to apiDeletePostById: ' + error
    )
}

