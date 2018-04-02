
export function transformCitiesResponseToArray(cities)  {
    let arr = [];
    cities.location_suggestions.forEach((city) => {
        arr.push({id: city.id, name: city.name})
    })
    return arr
}


export function transformRestaurantResponse(restaurants)  {
    let arr = [];
    restaurants.forEach((restaurantObj) => {
        let restaurant = restaurantObj.restaurant
        arr.push({id: restaurant.id, name: restaurant.name, locality: restaurant.location.locality, cuisines: restaurant.cuisines, menu_url: restaurant.featured_image, rating: restaurant.user_rating.aggregate_rating})
    })
    return arr
}


export function transformCategoryResponse(categories)  {
    let arr = [];
    categories.forEach((categoriesObj) => {
        let category = categoriesObj.categories
        arr.push({id: category.id, name: category.name, type: 'category'})
    })
    return arr
}



export function transformCuisineResponse(cuisines)  {
    let arr = [];
    cuisines.forEach((cuisineObj) => {
        let cuisine = cuisineObj.cuisine
        arr.push({id: cuisine.cuisine_id, name: cuisine.cuisine_name, type: 'cuisine'})
    })

    return arr
}

export function transformLocalitiesResponse(localities, city_id)  {
    let arr = [];
    localities.forEach((localityObj) => {
        if(localityObj.city_id === city_id)
            arr.push({id: localityObj.entity_id, entityType: localityObj.entity_type, name: localityObj.title, type: 'locality'})
    })
    return arr
}
