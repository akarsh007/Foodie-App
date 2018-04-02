import * as constants from './apiActionConstants';
import * as Responder from "./ApiResponses"
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
    // store.dispatch(commonActions.incrementApiCall());
    window.incrementApiCallsCount();


    return baseFetch(url, 'get', false, authToken, noBaseURL).then(response => {

        // store.dispatch(commonActions.decrementApiCall());
        window.decrementApiCallsCount();

        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
        }
    }).catch(error => {
        // store.dispatch(commonActions.decrementApiCall());
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
                let cityList = transformResponseToArray(response)
                callback(cityList)
               // dispatch(Responder.updateCities(cityDropdown))
            }).catch(error => {
            console.log('error', error)
        })
    }
}

function transformResponseToArray(cities)  {
    let arr = [];
    cities.location_suggestions.forEach((city) => {
        arr.push({id: city.id, name: city.name})
    })
    return arr
}

export function getRestaurants(searchParam, entityId, entityName, callback) {
    return (dispatch, getState) => {
        let url = `search?entity_id=${entityId}&entity_type=${entityName}&q=${searchParam}`;
        let state = getState();
        get(url, state.zomatoKey)
            .then( response => {

                let restaurantList = transformRestaurantResponse(response.restaurants)
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
                let restaurantList = transformRestaurantResponse(response.restaurants)
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
                let restaurantList = transformRestaurantResponse(response.restaurants)
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
                let restaurantList = transformRestaurantResponse(response.restaurants)
                dispatch(Responder.setRestaurantList(restaurantList))
            }).catch(error => {
            console.log('error', error)
        })
    }
}

function transformRestaurantResponse(restaurants)  {
    let arr = [];
    restaurants.forEach((restaurantObj) => {
        let restaurant = restaurantObj.restaurant
        arr.push({id: restaurant.id, name: restaurant.name, locality: restaurant.location.locality, cuisines: restaurant.cuisines, menu_url: restaurant.featured_image, rating: restaurant.user_rating.aggregate_rating})
    })
    return arr
}

export function getOtherValues(searchParam, entityId, callback) {
    return (dispatch, getState) => {
        let state = getState();
        let arr=[]
        getCategories(searchParam, entityId, state.zomatoKey, arr, callback)
        //callback(arr)
    }
}


function getCategories(searchParam, entityId, userKey, arr, callback) {
    let url = `categories`;
    get(url, userKey)
        .then(response => {
            let categoryList = transformCategoryResponse(response.categories)
            arr= arr.concat(categoryList)
            getCuisines(searchParam, entityId, userKey, arr, callback)
            //return categoryList
            // dispatch(Responder.updateCities(cityDropdown))
        }).catch(error => {
        console.log('error', error)
    })
}

function transformCategoryResponse(categories)  {
    let arr = [];
    categories.forEach((categoriesObj) => {
        let category = categoriesObj.categories
        arr.push({id: category.id, name: category.name, type: 'category'})
    })
    return arr
}

function getCuisines(searchParam, entityId, userKey, arr, callback) {
    let url = `cuisines?city_id=${entityId}`;
    get(url, userKey)
        .then(response => {
            let cuisineList = transformCuisineResponse(response.cuisines)
            arr= arr.concat(cuisineList)
            getLocalities(searchParam, entityId, userKey, arr, callback)
            //return cuisineList
            // dispatch(Responder.updateCities(cityDropdown))
        }).catch(error => {
        console.log('error', error)
    })
}


function transformCuisineResponse(cuisines)  {
    let arr = [];
    cuisines.forEach((cuisineObj) => {
        let cuisine = cuisineObj.cuisine
        arr.push({id: cuisine.cuisine_id, name: cuisine.cuisine_name, type: 'cuisine'})
    })

    return arr
}

function getLocalities(searchParam, entityId, userKey, arr, callback) {
    let url = `locations?query=${searchParam}`;
    get(url, userKey)
        .then(response => {
            let localityList = transformLocalitiesResponse(response.location_suggestions, entityId)
            arr= arr.concat(localityList)
            setTimeout(() => callback(arr), 500)
            // dispatch(Responder.updateCities(cityDropdown))
        }).catch(error => {
        console.log('error', error)
    })
}

function transformLocalitiesResponse(localities, city_id)  {
    let arr = [];
    localities.forEach((localityObj) => {
        if(localityObj.city_id === city_id)
            arr.push({id: localityObj.entity_id, entityType: localityObj.entity_type, name: localityObj.title, type: 'locality'})
    })
    return arr
}


export const setOtherValues = (otherValues, cityId) => {
    return {
        type : constants.SET_OTHER_VALUES,
        otherValues,
        cityId
    }
}