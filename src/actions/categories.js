import {showLoading, hideLoading} from 'react-redux-loading'
import {apiGetCategories} from "../utils/api/categories";
import {GET_CATEGORIES} from "./actionTypes";

function getCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories,
    }
}

export function handleGetCategories() {
    return (dispatch) => {
        dispatch(showLoading())

        return apiGetCategories()
            .then((response) => {
                dispatch(getCategories(response))
            })
            .then(() => dispatch(hideLoading()))
    }
}
