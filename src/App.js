import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import AppLayout from "./pages/containers/AppLayout"

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'



import 'react-select/dist/react-select.css';

export const store = configureStore();

window.bw = {}

window.bw.apiCallsCount = 0
window.bw.loaderGlobalTimeout = null;


function showLoader(){
    setTimeout(() => {
        if(window.bw.apiCallsCount < 0){
            return;
        }
        var loaderElem = getLoaderElement();
        if(loaderElem){ loaderElem.style.display = 'block'
        window.bw.loaderGlobalTimeout = setTimeout(() => {
            console.log('loader global timeout');
            loaderElem.style.display = 'none' 
        }, 25000)
    }
    },200);
}

function hideLoader(){
    let timeout = window.location.pathname.indexOf('keywords') !== -1 ? 2000 : 500;
    setTimeout(() => {
        var loaderElem = getLoaderElement();
        if(loaderElem) loaderElem.style.display = 'none'                 
        if(window.bw.loaderGlobalTimeout){
            clearTimeout(window.bw.loaderGlobalTimeout);
        }
    },timeout);
}

function getLoaderElement(){
return window.document.getElementById('loader');
}

window.incrementApiCallsCount = () => {
    window.bw.apiCallsCount++
    if(window.bw.apiCallsCount === 1) {
        showLoader()
    }
}

window.decrementApiCallsCount = () => {
    window.bw.apiCallsCount--  
    if(window.bw.apiCallsCount === 0) {
       hideLoader()
    }
}

class App extends Component {

    render() {
        return (
          <Provider store={store}>
              <Router>
                  <Switch>
                    <Route path="*" component={AppLayout} />
                  </Switch>
              </Router>
          </Provider>
        );
    }
}

export default App;
