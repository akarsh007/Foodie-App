import * as constants from './apiActionConstants';
import * as Responder from "./ApiResponses"
import * as transformer from "./transformers"
import {zomatoServerUrl} from "../config/config"

const baseFetch = (url, verb, body, authToken, noBaseURL) => {
    const request = {
        method: verb,
        headers: {
            'Accept': 'application/json'
        }
    }

    if (authToken){
        request.headers['user-key'] = authToken;
    }

    if (body){
        request.body = JSON.stringify(body);
    }

    if( !noBaseURL ) {
        url = zomatoServerUrl + url;
    }
    return fetch(url, request);
}



export const get = (url, authToken, noBaseURL = false) => {
    window.incrementApiCallsCount();
    return baseFetch(url, 'get', false, authToken, noBaseURL).then(response => {
        window.decrementApiCallsCount();

        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
        }
    }).catch(error => {
        window.decrementApiCallsCount();
        throw error;
    });
}


export function getCities(cityName, callback) {
    return (dispatch, getState) => {
        let url = `cities?q=${cityName}`;
        let state = getState();
        get(url, state.zomatoKey)
            .then( response => {
                let cityList = transformer.transformCitiesResponseToArray(response)
                callback(cityList)
            }).catch(error => {
            console.log('error', error)
        })
    }
}

export function getRestaurants(searchParam, entityId, entityName, callback) {
    return (dispatch, getState) => {
        let url = `search?entity_id=${entityId}&entity_type=${entityName}&q=${searchParam}`;
        let state = getState();
        get(url, state.zomatoKey)
            .then( response => {

                let restaurantList = transformer.transformRestaurantResponse(response.restaurants)
                callback(restaurantList)
            }).catch(error => {
            console.log('error', error)
        })
    }
}


export function searchCategoryRestaurant(otherValues, cityId) {
    return (dispatch, getState) => {
        let url = `search?entity_id=${cityId}&entity_type=city&category=${otherValues.id}`;
        let state = getState();
        get(url, state.zomatoKey)
            .then( response => {
                let restaurantList = transformer.transformRestaurantResponse(response.restaurants)
                dispatch(Responder.setRestaurantList(restaurantList))
            }).catch(error => {
            console.log('error', error)
        })
    }
}


export function searchCuisineRestaurant(otherValues, cityId) {
    return (dispatch, getState) => {
        let url = `search?entity_id=${cityId}&entity_type=city&cuisines=${otherValues.id}`;
        let state = getState();
        get(url, state.zomatoKey)
            .then( response => {
                let restaurantList = transformer.transformRestaurantResponse(response.restaurants)
                dispatch(Responder.setRestaurantList(restaurantList))
            }).catch(error => {
            console.log('error', error)
        })
    }
}


export function searchLocalityRestaurant(otherValues, cityId) {
    return (dispatch, getState) => {
        let url = `search?entity_id=${otherValues.id}&entity_type=${otherValues.entityType}`;
        let state = getState();
        get(url, state.zomatoKey)
            .then( response => {
                let restaurantList = transformer.transformRestaurantResponse(response.restaurants)
                dispatch(Responder.setRestaurantList(restaurantList))
            }).catch(error => {
            console.log('error', error)
        })
    }
}

export function getOtherValues(searchParam, entityId, callback) {
    return (dispatch, getState) => {
        let state = getState();
        let arr=[]
        getCategories(searchParam, entityId, state.zomatoKey, arr, callback)
    }
}


function getCategories(searchParam, entityId, userKey, arr, callback) {
    let url = `categories`;
    get(url, userKey)
        .then(response => {
            let categoryList = transformer.transformCategoryResponse(response.categories)
            arr= arr.concat(categoryList)
            getCuisines(searchParam, entityId, userKey, arr, callback)
        }).catch(error => {
        console.log('error', error)
    })
}

function getCuisines(searchParam, entityId, userKey, arr, callback) {
    let url = `cuisines?city_id=${entityId}`;
    get(url, userKey)
        .then(response => {
            let cuisineList = transformer.transformCuisineResponse(response.cuisines)
            arr= arr.concat(cuisineList)
            getLocalities(searchParam, entityId, userKey, arr, callback)
        }).catch(error => {
        console.log('error', error)
    })
}

function getLocalities(searchParam, entityId, userKey, arr, callback) {
    let url = `locations?query=${searchParam}`;
    get(url, userKey)
        .then(response => {
            let localityList = transformer.transformLocalitiesResponse(response.location_suggestions, entityId)
            arr= arr.concat(localityList)
            setTimeout(() => callback(arr), 500)
        }).catch(error => {
        console.log('error', error)
    })
}

export const setOtherValues = (otherValues, cityId) => {
    return {
        type : constants.SET_OTHER_VALUES,
        otherValues,
        cityId
    }
}