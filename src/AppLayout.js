import React, {Component} from 'react'

import { Route } from 'react-router-dom'

import Restaurants from './pages/containers/Restaurants'
import Home from './pages/containers/Home'
import Loader from './components/Loader'

class AppLayout extends Component {

    constructor(props) {
        super(props)
    }
componentWillMount(){
  }


    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    appLayout = () => {
        let { apiCallsCount } = this.props
        return (
                <div className="dashboard-default">
                    {// <Loader shouldShow={apiCallsCount > 0 ? true: false} />
                    }
                    <Route exact path="/" render={() => <Home/>}/>
                    <Route exact path="/accounts" render={() => <Home/>}/>
                    <Route path="/restaurants" component={Restaurants}/>
                </div>
        )
    };

    render() {
        return (
            this.appLayout()
        )
    }
}

export default AppLayout
