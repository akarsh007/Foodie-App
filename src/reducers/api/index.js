export const SetOtherValues = (state, action) => {
    let otherValues = {...action.otherValues}
    let cityId = action.cityId
    let newState = {...state, otherValues, cityId}

    return newState
}

export const SetRestaurantList = (state, action) => {
    let restaurantList = [...action.restaurantList]
    let newState = {...state, restaurantList}

    return newState
}
