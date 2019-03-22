const BASE_PORT = '3001'
const BASE_URL = 'http://localhost:' + BASE_PORT + '/'

/* GET */
const API_ROUTE_GET_CATEGORIES = BASE_URL + 'categories'
/* GET */
const API_ROUTE_GET_POSTS_BY_CATEGORY = (category) => BASE_URL + category + '/posts'
/* GET */
const API_ROUTE_GET_POSTS = BASE_URL + 'posts'
/* POST */
const API_ROUTE_NEW_POST = BASE_URL + 'posts'
/* GET */
const API_ROUTE_GET_POST_BY_ID = (id) => BASE_URL + 'posts/' + id
/* POST */
const API_ROUTE_VOTE_ON_POST_BY_ID = (id) => BASE_URL + 'posts/' + id
/* PUT */
const API_ROUTE_EDIT_POST_BY_ID = (id) => BASE_URL + 'posts/' + id
/* DELETE */
const API_ROUTE_DELETE_POST_BY_ID = (id) => BASE_URL + 'posts/' + id
/* GET */
const API_ROUTE_GET_COMMENTS_BY_POST_ID = (id) => BASE_URL + 'posts/' + id + '/comments'
/* POST */
const API_ROUTE_NEW_COMMENT = BASE_URL + 'comments'
/* GET */
const API_ROUTE_GET_COMMENT_BY_ID = (id) => BASE_URL + 'comments/' + id
/* POST */
const API_ROUTE_VOTE_ON_COMMENT_BY_ID = (id) => BASE_URL + 'comments/' + id
/* PUT */
const API_ROUTE_EDIT_COMMENT_BY_ID = (id) => BASE_URL + 'comments/' + id
/* DELETE */
const API_ROUTE_DELETE_COMMENT_BY_ID = (id) => BASE_URL + 'comments/' + id

export {
    API_ROUTE_GET_CATEGORIES,
    API_ROUTE_GET_POSTS_BY_CATEGORY,
    API_ROUTE_GET_POSTS,
    API_ROUTE_NEW_POST,
    API_ROUTE_GET_POST_BY_ID,
    API_ROUTE_VOTE_ON_POST_BY_ID,
    API_ROUTE_EDIT_POST_BY_ID,
    API_ROUTE_DELETE_POST_BY_ID,
    API_ROUTE_GET_COMMENTS_BY_POST_ID,
    API_ROUTE_NEW_COMMENT,
    API_ROUTE_GET_COMMENT_BY_ID,
    API_ROUTE_VOTE_ON_COMMENT_BY_ID,
    API_ROUTE_EDIT_COMMENT_BY_ID,
    API_ROUTE_DELETE_COMMENT_BY_ID
}
