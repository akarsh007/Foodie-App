import React, {Component} from 'react';

class RestaurantDetails extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
    }

    componentDidUpdate(prevProps){
    }

    closeModal = () => {
        this.props.closeRestaurantDetailsModal();
    }


    render(){
        let activeClass = this.props.active ? 'is-active' : '';
        return (
            <div>
                {activeClass ?
            <div className={"modal " + activeClass}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">

                        <div className="is-clearfix modal-header">
                            <span className="title app-font-color">{this.props.restaurant.name}</span>
                            <button onClick={this.closeModal} className="delete is-large is-pulled-right" aria-label="close"></button>
                        </div>
                        <div>
                            <img src={this.props.restaurant.menu_url} alt="menu" />
                        </div>

                    </div>

                </div>
            </div> : null}
            </div>
        )
    }
}

export default RestaurantDetails