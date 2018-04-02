import * as Api from './api'
import * as actionConstants from '../actions/actionConstants'
import * as apiActionConstants from '../actions/apiActionConstants'
import * as loaderUpdates from './loaderUpdates';


function reducer(state = {} , action){

	state = {...state, lastAddedModule : false}

	var returnState;

	switch(action.type){
		case apiActionConstants.SET_OTHER_VALUES:
			returnState = Api.SetOtherValues(state, action);
		break;
        case apiActionConstants.SET_RESTAURANT_LIST:
            returnState = Api.SetRestaurantList(state, action);
        break;
		case actionConstants.API_FETCH_START:
			returnState = loaderUpdates.showLoader(state, action);
			break;

        case actionConstants.API_FETCH_END:
            returnState = loaderUpdates.hideLoader(state, action);
            break;

		default:
			returnState = state;
		break;
	}

	return returnState
}

export default reducer;
