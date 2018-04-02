import * as Actions from './apiActionConstants'

export function setRestaurantList(restaurantList){
    return {
        type : Actions.SET_RESTAURANT_LIST,
        restaurantList
    }
}
