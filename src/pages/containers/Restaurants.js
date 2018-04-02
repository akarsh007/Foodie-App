import { connect } from 'react-redux'
import RestaurantList from '../Restaurants'
import * as Api from '../../actions/ApiCalls'

const mapStateToProps = (state, ownProps) => {
    return {
        otherValues : state.otherValues,
        cityId : state.cityId,
        restaurantList : state.restaurantList
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getCategoryRestaurants: (otherValues, cityId) => {
            dispatch(Api.searchCategoryRestaurant(otherValues, cityId))
        },
        getCuisineRestaurants: (otherValues, cityId) => {
            dispatch(Api.searchCuisineRestaurant(otherValues, cityId))
        },
        getLocalityRestaurants: (otherValues, cityId) => {
           dispatch(Api.searchLocalityRestaurant(otherValues, cityId))
        },
    }
}

const Restaurants = connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantList)

export default Restaurants
