import * as actionConstants from './actionConstants'

export function incrementApiCall() {
    return {
        type : actionConstants.API_FETCH_START
    }
}

export function decrementApiCall() {
    return {
        type : actionConstants.API_FETCH_END
    }
}
