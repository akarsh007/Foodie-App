import React, {Component} from 'react'
import Header from '../components/common/HeaderContainer';
import HomeModal from "../components/interface/containers/HomeModal.js"

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            showHomeModal : true,
            header : 'Enter City'
        }
    }

    componentDidMount() {

    }
    render() {
        return (
            <div className="home-landing">
                <Header>
                    <div className='hero is-small is-info'>
                        <div className= 'hero-body'>
                            <div className="container is-fluid">
                                <h1 className="title">
                                    Welcome Foodie
                                </h1>
                            </div>
                        </div>
                    </div>
                </Header>
                <br/>
                <HomeModal
                    active={this.state.showHomeModal}
                    header={this.state.header}
                />

            </div>
        )}}
export default Home
