import { connect } from 'react-redux'
import * as Api from '../../../actions/ApiCalls'
import Home from "../HomeModal"
import {withRouter} from 'react-router-dom'
const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCities: (cityParam, callback) => {
            dispatch(Api.getCities(cityParam, callback))
        },
        getCityRestaurants: (searchParam, cityId, callback) => {
            dispatch(Api.getRestaurants(searchParam, cityId, 'city', callback))
        },
        getOtherValues: (searchParam, cityId, callback) => {
            dispatch(Api.getOtherValues(searchParam, cityId, callback))
        },
        setOtherValues: (otherValues, cityObj) => {
            dispatch(Api.setOtherValues(otherValues, cityObj.id))
        }
    }
}

const HomeModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default withRouter(HomeModal)