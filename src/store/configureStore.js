import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

const logger = createLogger(
    {collapsed: true}
)


const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

export default function configureStore (initialState) {
  return createStore(
        reducers,
        state,
        composeEnhancers(applyMiddleware(thunk, logger))
    )
}

let state = {
    apiCallsCount: 0,
    zomatoKey: 'a424f958edd69a23a51ef9f31ed7a329',
    inProgressApiCalls : []
}
