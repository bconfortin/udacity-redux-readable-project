import {
    DELETE_POST_BY_ID, EDIT_POST_BY_ID,
    GET_POST_BY_ID,
    GET_POSTS,
    GET_POSTS_BY_CATEGORY,
    NEW_POST,
    VOTE_ON_POST_BY_ID
} from "../actions/actionTypes";
import {rebuildObjectById} from '../utils/api/helpers'

export default function posts(state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
            const posts = rebuildObjectById(action.posts)
            return {
                ...state,
                posts
            }
        case GET_POSTS_BY_CATEGORY:
            const postsByCategory = rebuildObjectById(action.postsByCategory)
            return {
                ...state,
                posts: postsByCategory
            }
        case GET_POST_BY_ID:
            const {postById} = action
            return {
                ...state,
                postById
            }
        case NEW_POST:
            const { post } = action
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [post.id]: post
                }
            }
        case VOTE_ON_POST_BY_ID:
            const { vote } = action
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [vote.id]: {
                        ...vote
                    },
                },
                postById: {
                    ...vote
                }
            }
        case DELETE_POST_BY_ID:
            const { deletedPost } = action
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [deletedPost.id]: {
                        ...deletedPost
                    },
                },
                postById: {
                    ...deletedPost
                }
            }
        case EDIT_POST_BY_ID:
            const {editedPost} = action
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [editedPost.id]: {
                        ...editedPost
                    },
                },
                postById: {
                    ...editedPost
                }
            }
        default:
            return state
    }
}
