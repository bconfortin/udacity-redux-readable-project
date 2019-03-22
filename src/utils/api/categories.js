import {getHeaders} from "./helpers";
import {API_ROUTE_GET_CATEGORIES} from "./apiEndpoints"

export function apiGetCategories() {
    return fetch(API_ROUTE_GET_CATEGORIES, {...getHeaders()})
        .then(
            response => response.json(),
            error => 'An error occurred when trying to get the categories: ' + error
        )
}
