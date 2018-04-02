export const showLoader = ( state=[], action) => {
    console.log('ShowLoader State ', state);

    let apiCallsCount = state.apiCallsCount;
    apiCallsCount++;
    let newState = {
        ...state,
        apiCallsCount
    };
    return newState;
};

export const hideLoader = ( state=[], action) => {
    console.log('ShowLoader State ', state);

    let apiCallsCount = state.apiCallsCount;
    apiCallsCount--;
    let newState = {
        ...state,
        apiCallsCount
    };
    return newState;
};

