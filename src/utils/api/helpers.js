const generateToken = () => {
    return Math.random().toString(36).substring(2, 26) + Math.random().toString(36).substring(2, 26)
}

const generateUID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const getAuthorization = () => {
    if (localStorage.getItem("token")) {
        return {
            'Authorization': 'Basic ' + localStorage.getItem("token")
        }
    } else {
        let newToken = generateToken()
        localStorage.setItem("token", newToken)
        return {
            'Authorization': 'Basic ' + newToken
        }
    }
}

const getHeaders = () => {
    return {
        headers: {
            ...getAuthorization(),
            'Content-Type': 'application/json'
        },
    }
}

/**
 * Get a collection of objects and returns that same object
 * but with its ID for keys, grouping it by properties.
 *
 * arr.reduce(callback[, initialValue])
 * callback = accumulator, currentValue, currentIndex, array
 *
 * Eg.: posts: {{0}: {key1: 'Lorem', key2: 'Ipsum'}}
 * to
 * posts: {{8xf0y6ziyjabvozdd253nd}: {key1: 'Lorem', key2: 'Ipsum'}}
 *
 * @param  {Object} object   the object to be rebuilt
 * @return {Object}          the rebuilt object with ID for keys
 */
const rebuildObjectById = (object) => {
    if (typeof object === 'object') {
        return object.reduce((accumulator, currentValue) => {
            return {
                ...accumulator,
                [currentValue.id]: {
                    ...currentValue
                }
            }
        }, {})
    } else {
        return {}
    }
}

const upperCaseFirstLetter = (string) => {
    if (string) {
        return string.substring(0, 1).toUpperCase() + string.slice(1);
    } else {
        return false
    }
}

export {
    getAuthorization,
    getHeaders,
    rebuildObjectById,
    generateUID,
    upperCaseFirstLetter,
}
